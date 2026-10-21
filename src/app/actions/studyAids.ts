"use server";

import { getAuthenticatedContext } from "@/lib/supabase/auth-context";
import { demoLessons } from "@/lib/demoLessons";
import { lessonContentForPrompt, parseLessonContent, type LessonContent } from "@/lib/lessons/content";
import { friendlyAiFailure, generateStructured, type AiFailureCode } from "@/lib/ai/service";
import { validateFlashcards, validateQuestions, validateSummary, validateTutorAnswer, type Flashcard, type GeneratedQuestion, type LessonSummary } from "@/lib/ai/schemas";

// Server actions for AI-generated study aids.
//
// Guarantees:
// - Authentication is verified on every action; storage is owner-only (RLS).
// - Saved results are loaded and reused without contacting any AI provider,
//   so existing study material works with AI offline or unconfigured.
// - Generation is rate-limited per user via the ai_generations log.
// - Responses are strictly validated before they are stored or rendered.
// - AI output is always returned with provider/model provenance so the UI can
//   label it as an unreviewed study aid, distinct from published curriculum.

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_GENERATIONS = 10;
const LESSON_PROMPT_CHARS = 9_000;

export type StudyAidFailureStatus =
  | "invalid"
  | "unconfigured"
  | "signed-out"
  | "auth-error"
  | "database-error"
  | "lesson-unavailable"
  | "rate-limited"
  | "ai-error";

export type StudyAidFailure = {
  status: StudyAidFailureStatus;
  message: string;
  aiCode?: AiFailureCode;
};

export type FlashcardDeck = {
  cards: Flashcard[];
  provider: string;
  model: string;
  generatedAt: string;
};

export type SavedSummary = LessonSummary & { provider: string; model: string; generatedAt: string };

export type SavedPracticeQuestions = {
  questions: GeneratedQuestion[];
  provider: string;
  model: string;
  generatedAt: string;
};

export type StudyAidsSnapshot = {
  status: "ready";
  flashcards: FlashcardDeck | null;
  summary: SavedSummary | null;
  practiceQuestions: SavedPracticeQuestions | null;
};

function failure(status: StudyAidFailureStatus, message: string, aiCode?: AiFailureCode): { status: StudyAidFailureStatus; message: string; aiCode?: AiFailureCode } {
  return { status, message, ...(aiCode ? { aiCode } : {}) };
}

function authFailure(status: "unconfigured" | "signed-out" | "auth-error"): { status: StudyAidFailureStatus; message: string } {
  const messages = {
    unconfigured: "Supabase is not configured, so study aids cannot be loaded.",
    "signed-out": "Log in to generate and save study aids.",
    "auth-error": "Your session could not be verified. Log in again and retry.",
  } as const;
  return { status, message: messages[status] };
}

type ServerClient = NonNullable<Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>>;

type LessonForAi = { id: string; subject: string; grade: number | null; title: string; description: string; content: LessonContent };

async function loadPublishedLessonForAi(supabase: ServerClient, lessonId: string): Promise<LessonForAi | null> {
  const { data, error } = await supabase
    .from("lessons")
    .select("id, subject, grade, title, description, is_sample, content")
    .eq("id", lessonId)
    .eq("is_published", true)
    .maybeSingle();
  if (error || !rowUsable(data)) return null;

  const row = data;
  const bundled = demoLessons.find((lesson) => lesson.id === row.id);
  const content = parseLessonContent(row.content) ?? (bundled ? parseLessonContent(bundled.content) : null);
  if (!content) return null;

  return { id: row.id, subject: row.subject, grade: row.grade, title: row.title, description: row.description, content };
}

function rowUsable(row: unknown): row is { id: string; subject: string; grade: number | null; title: string; description: string; is_sample: boolean; content: unknown } {
  return !!row && typeof row === "object";
}

// Per-user generation budget. A database error while counting fails closed:
// we do not call an AI provider we cannot account for.
async function checkRateLimit(supabase: ServerClient, userId: string): Promise<{ status: "ok" } | { status: "rate-limited" | "database-error" }> {
  const { count, error } = await supabase
    .from("ai_generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", new Date(Date.now() - RATE_WINDOW_MS).toISOString());
  if (error) return { status: "database-error" };
  if ((count ?? 0) >= RATE_MAX_GENERATIONS) return { status: "rate-limited" };
  return { status: "ok" };
}

async function logGeneration(supabase: ServerClient, userId: string, kind: string, provider: string, model: string): Promise<void> {
  // Best effort: a logging failure must not discard an already-validated
  // result the student is waiting for.
  await supabase.from("ai_generations").insert({ user_id: userId, kind, provider, model });
}

function aiFailure(code: AiFailureCode, message: string): { status: "ai-error"; message: string; aiCode: AiFailureCode } {
  return { status: "ai-error", message: message || friendlyAiFailure(code), aiCode: code };
}

function parseDeck(value: unknown): { cards: Flashcard[]; provider: string; model: string; generatedAt: string } | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const rawCards = Array.isArray(record.cards) ? record.cards : null;
  if (!rawCards) return null;
  const cards: Flashcard[] = [];
  for (const card of rawCards) {
    if (!card || typeof card !== "object") return null;
    const { question, answer } = card as Record<string, unknown>;
    if (typeof question !== "string" || typeof answer !== "string" || !question.trim() || !answer.trim()) return null;
    cards.push({ question, answer });
  }
  if (cards.length === 0) return null;
  return {
    cards,
    provider: typeof record.provider === "string" ? record.provider : "unknown",
    model: typeof record.model === "string" ? record.model : "unknown",
    generatedAt: typeof record.generatedAt === "string" ? record.generatedAt : "",
  };
}

function parseSummaryRow(value: unknown): SavedSummary | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (typeof record.summary !== "string" || !Array.isArray(record.keyPoints)) return null;
  return {
    summary: record.summary,
    keyPoints: record.keyPoints.filter((point): point is string => typeof point === "string"),
    provider: typeof record.provider === "string" ? record.provider : "unknown",
    model: typeof record.model === "string" ? record.model : "unknown",
    generatedAt: typeof record.generatedAt === "string" ? record.generatedAt : "",
  };
}

function parseQuestionsRow(value: unknown): SavedPracticeQuestions | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const raw = Array.isArray(record.questions) ? record.questions : null;
  if (!raw) return null;
  const questions: GeneratedQuestion[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const entry = item as Record<string, unknown>;
    if (typeof entry.question !== "string" || !Array.isArray(entry.options) || typeof entry.answerIndex !== "number") return null;
    questions.push({
      question: entry.question,
      options: entry.options.filter((option): option is string => typeof option === "string"),
      answerIndex: entry.answerIndex,
      explanation: typeof entry.explanation === "string" ? entry.explanation : "",
    });
  }
  if (questions.length === 0) return null;
  return {
    questions,
    provider: typeof record.provider === "string" ? record.provider : "unknown",
    model: typeof record.model === "string" ? record.model : "unknown",
    generatedAt: typeof record.generatedAt === "string" ? record.generatedAt : "",
  };
}

// ---------------------------------------------------------------------------
// Read: reuse whatever is already saved. No AI provider is contacted, so this
// works with AI offline, unconfigured, or rate-limited.
// ---------------------------------------------------------------------------
export async function loadStudyAids(lessonId: string): Promise<{ status: StudyAidFailureStatus; message?: string } | StudyAidsSnapshot> {
  if (!UUID_PATTERN.test(lessonId)) return failure("invalid", "That lesson ID is not valid.");
  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return authFailure(context.status);

  const [flashcardsResult, summaryResult, questionsResult] = await Promise.all([
    context.supabase.from("lesson_flashcards").select("cards, provider, model, updated_at").eq("user_id", context.user.id).eq("lesson_id", lessonId).maybeSingle(),
    context.supabase.from("lesson_summaries").select("summary, provider, model, updated_at").eq("user_id", context.user.id).eq("lesson_id", lessonId).maybeSingle(),
    context.supabase.from("lesson_practice_questions").select("questions, provider, model, updated_at").eq("user_id", context.user.id).eq("lesson_id", lessonId).maybeSingle(),
  ]);
  if (flashcardsResult.error || summaryResult.error || questionsResult.error) return failure("database-error", "Saved study aids could not be loaded. Check the database migration and RLS policies.");

  const deck = flashcardsResult.data
    ? parseDeck({ ...(flashcardsResult.data.cards as object), provider: flashcardsResult.data.provider, model: flashcardsResult.data.model, generatedAt: flashcardsResult.data.updated_at })
    : null;
  const summary = summaryResult.data
    ? parseSummaryRow({ ...(summaryResult.data.summary as object), provider: summaryResult.data.provider, model: summaryResult.data.model, generatedAt: summaryResult.data.updated_at })
    : null;
  const practice = questionsResult.data
    ? parseQuestionsRow({ ...(questionsResult.data.questions as object), provider: questionsResult.data.provider, model: questionsResult.data.model, generatedAt: questionsResult.data.updated_at })
    : null;

  return { status: "ready", flashcards: deck, summary, practiceQuestions: practice };
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------
export async function generateLessonFlashcards(lessonId: string, cardCount: number): Promise<{ status: StudyAidFailureStatus; message?: string; aiCode?: AiFailureCode } | ({ status: "ready" } & FlashcardDeck)> {
  if (!UUID_PATTERN.test(lessonId) || !Number.isInteger(cardCount) || cardCount < 4 || cardCount > 20) {
    return failure("invalid", "Choose between 4 and 20 flashcards.");
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return authFailure(context.status);

  const lesson = await loadPublishedLessonForAi(context.supabase, lessonId);
  if (!lesson) return failure("lesson-unavailable", "This lesson is not available, so flashcards cannot be generated from it.");

  const limit = await checkRateLimit(context.supabase, context.user.id);
  if (limit.status !== "ok") {
    return limit.status === "rate-limited"
      ? failure("rate-limited", "You have reached the generation limit for now. Your saved study aids remain available; try again in a few minutes.")
      : failure("database-error", "Your generation budget could not be verified, so no AI request was sent.");
  }

  const lessonText = lessonContentForPrompt(lesson, LESSON_PROMPT_CHARS);
  const generated = await generateStructured(
    {
      systemInstruction: `You create study flashcards for Nepali secondary students studying ${lesson.subject}${lesson.grade ? ` (Grade ${lesson.grade})` : ""}. Return ONLY a JSON object of the form {"cards":[{"question":"...","answer":"..."}]}. Every card must have a non-empty question and answer drawn strictly from the lesson text — do not invent facts that are not in it. Answer text stays under 600 characters.`,
      prompt: `Create exactly ${cardCount} flashcards from this lesson:\n\n${lessonText}`,
      maxOutputTokens: Math.min(4_000, 400 + cardCount * 110),
      temperature: 0.3,
    },
    (value) => validateFlashcards(value, cardCount)
  );

  if (!generated.ok) return aiFailure(generated.code, generated.message);

  const savedAt = new Date().toISOString();
  const payload = { cards: generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
  const { error } = await context.supabase
    .from("lesson_flashcards")
    .upsert({ user_id: context.user.id, lesson_id: lessonId, cards: payload, provider: generated.provider, model: generated.model, updated_at: savedAt }, { onConflict: "user_id,lesson_id" });
  if (error) return failure("database-error", "The flashcards were generated but could not be saved. They are not shown as saved.");

  await logGeneration(context.supabase, context.user.id, "flashcards", generated.provider, generated.model);
  return { status: "ready", cards: generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
}

// ---------------------------------------------------------------------------
// Lesson summary
// ---------------------------------------------------------------------------
export async function generateLessonSummary(lessonId: string): Promise<{ status: StudyAidFailureStatus; message?: string; aiCode?: AiFailureCode } | ({ status: "ready" } & SavedSummary)> {
  if (!UUID_PATTERN.test(lessonId)) return failure("invalid", "That lesson ID is not valid.");

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return authFailure(context.status);

  const lesson = await loadPublishedLessonForAi(context.supabase, lessonId);
  if (!lesson) return failure("lesson-unavailable", "This lesson is not available, so a summary cannot be generated from it.");

  const limit = await checkRateLimit(context.supabase, context.user.id);
  if (limit.status !== "ok") {
    return limit.status === "rate-limited"
      ? failure("rate-limited", "You have reached the generation limit for now. Your saved study aids remain available; try again in a few minutes.")
      : failure("database-error", "Your generation budget could not be verified, so no AI request was sent.");
  }

  const lessonText = lessonContentForPrompt(lesson, LESSON_PROMPT_CHARS);
  const generated = await generateStructured(
    {
      systemInstruction: `You write a concise revision summary for a Nepali secondary student. Return ONLY a JSON object {"summary":"...","keyPoints":["..."]} with 3-6 key points. Base everything strictly on the lesson text; no invented facts. Summary length 100-900 characters; each key point under 180 characters.`,
      prompt: `Summarize this lesson:\n\n${lessonText}`,
      maxOutputTokens: 1_600,
      temperature: 0.3,
    },
    (value) => validateSummary(value)
  );

  if (!generated.ok) return aiFailure(generated.code, generated.message);

  const savedAt = new Date().toISOString();
  const payload = { ...generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
  const { error } = await context.supabase
    .from("lesson_summaries")
    .upsert({ user_id: context.user.id, lesson_id: lessonId, summary: payload, provider: generated.provider, model: generated.model, updated_at: savedAt }, { onConflict: "user_id,lesson_id" });
  if (error) return failure("database-error", "The summary was generated but could not be saved. It is not shown as saved.");

  await logGeneration(context.supabase, context.user.id, "summary", generated.provider, generated.model);
  return { status: "ready", ...generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
}

// ---------------------------------------------------------------------------
// Practice questions
// ---------------------------------------------------------------------------
export async function generatePracticeQuestions(lessonId: string, questionCount: number): Promise<{ status: StudyAidFailureStatus; message?: string; aiCode?: AiFailureCode } | ({ status: "ready" } & SavedPracticeQuestions)> {
  if (!UUID_PATTERN.test(lessonId) || !Number.isInteger(questionCount) || questionCount < 3 || questionCount > 10) {
    return failure("invalid", "Choose between 3 and 10 practice questions.");
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return authFailure(context.status);

  const lesson = await loadPublishedLessonForAi(context.supabase, lessonId);
  if (!lesson) return failure("lesson-unavailable", "This lesson is not available, so practice questions cannot be generated from it.");

  const limit = await checkRateLimit(context.supabase, context.user.id);
  if (limit.status !== "ok") {
    return limit.status === "rate-limited"
      ? failure("rate-limited", "You have reached the generation limit for now. Your saved study aids remain available; try again in a few minutes.")
      : failure("database-error", "Your generation budget could not be verified, so no AI request was sent.");
  }

  const lessonText = lessonContentForPrompt(lesson, LESSON_PROMPT_CHARS);
  const generated = await generateStructured(
    {
      systemInstruction: `You write multiple-choice practice questions for a Nepali secondary student studying ${lesson.subject}${lesson.grade ? ` (Grade ${lesson.grade})` : ""}. Return ONLY a JSON object {"questions":[{"question":"...","options":["a","b","c","d"],"answerIndex":0,"explanation":"..."}]}. 4 options each, exactly one correct answer (answerIndex is the correct option's 0-based position), explanation under 400 characters. Base every question strictly on the lesson text.`,
      prompt: `Create exactly ${questionCount} practice questions from this lesson:\n\n${lessonText}`,
      maxOutputTokens: Math.min(4_000, 500 + questionCount * 170),
      temperature: 0.3,
    },
    (value) => validateQuestions(value, questionCount)
  );

  if (!generated.ok) return aiFailure(generated.code, generated.message);

  const savedAt = new Date().toISOString();
  const payload = { questions: generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
  const { error } = await context.supabase
    .from("lesson_practice_questions")
    .upsert({ user_id: context.user.id, lesson_id: lessonId, questions: payload, provider: generated.provider, model: generated.model, updated_at: savedAt }, { onConflict: "user_id,lesson_id" });
  if (error) return failure("database-error", "The practice questions were generated but could not be saved. They are not shown as saved.");

  await logGeneration(context.supabase, context.user.id, "practice_questions", generated.provider, generated.model);
  return { status: "ready", questions: generated.data, provider: generated.provider, model: generated.model, generatedAt: savedAt };
}

// ---------------------------------------------------------------------------
// Tutor (stateless; the answer is not stored, only the usage is logged)
// ---------------------------------------------------------------------------
export interface TutorContext {
  grade?: string;
  subject?: string;
  topic?: string;
  lessonId?: string;
}

export async function askTutor(question: string, context?: TutorContext): Promise<
  { status: StudyAidFailureStatus; message?: string; aiCode?: AiFailureCode } | { status: "ready"; answer: string; provider: string; model: string }
> {
  const cleaned = typeof question === "string" ? question.trim() : "";
  if (cleaned.length < 2 || cleaned.length > 600) return failure("invalid", "Ask a question between 2 and 600 characters.");

  const ctx = await getAuthenticatedContext();
  if (ctx.status !== "ready") return authFailure(ctx.status);

  let contextText = "";
  if (context?.lessonId) {
    if (!UUID_PATTERN.test(context.lessonId)) return failure("invalid", "That lesson ID is not valid.");
    const lesson = await loadPublishedLessonForAi(ctx.supabase, context.lessonId);
    if (!lesson) return failure("lesson-unavailable", "The selected lesson is not available for context.");
    contextText = `\n\nLesson context (use it when relevant):\n${lessonContentForPrompt(lesson, 4_000)}`;
  } else if (context?.grade && context?.subject && context?.topic) {
    // Build context from grade/subject/topic without a specific lesson
    contextText = `\n\nStudent context: Grade ${context.grade}, Subject: ${context.subject}, Topic: ${context.topic}. Answer appropriately for this level.`;
  }

  const limit = await checkRateLimit(ctx.supabase, ctx.user.id);
  if (limit.status !== "ok") {
    return limit.status === "rate-limited"
      ? failure("rate-limited", "You have reached the generation limit for now. Try again in a few minutes.")
      : failure("database-error", "Your generation budget could not be verified, so no AI request was sent.");
  }

  const generated = await generateStructured(
    {
      systemInstruction: "You are a patient tutor for Nepali secondary students. Answer in clear, simple English under 600 words. Return ONLY JSON {\"answer\":\"...\"}. Stick to well-established facts; if the question is outside the provided context and you are unsure, say so plainly instead of guessing.",
      prompt: `Question: ${cleaned}${contextText}`,
      maxOutputTokens: 1_200,
      temperature: 0.4,
    },
    (value) => validateTutorAnswer(value)
  );

  if (!generated.ok) return aiFailure(generated.code, generated.message);

  await logGeneration(ctx.supabase, ctx.user.id, "tutor", generated.provider, generated.model);
  return { status: "ready", answer: generated.data, provider: generated.provider, model: generated.model };
}
