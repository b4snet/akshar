"use server";

import { getExamConfig, getAllExamConfigs } from "@/lib/examConfig";
import type { ExamMode, ExamQuestionRow, ExamAttemptRecord } from "@/lib/examTypes";
import { validateUuid, validateNumberRange } from "@/lib/validation";

interface ExamConfigLocal {
  id: string;
  slug?: string;
  name: string;
  examType: ExamMode;
  year: string;
  durationMinutes: number;
  totalQuestions: number;
  questionsPerSubject: Record<string, number>;
  marksPerCorrect: number;
  marksPerIncorrect: number;
  marksPerUnanswered: number;
  negativeMarking: boolean;
  allowedUnanswered: boolean;
  passingScore?: number;
  verificationStatus: "official" | "provisional" | "practice";
  sourceRef: string;
  effectiveYear: string;
  syllabusVersion: string;
  description: string;
  subjectDistribution: Record<string, number>;
}

export interface ExamAttemptResult {
  status: "ready" | "in_progress" | "submitting" | "submitted" | "expired" | "failed";
  message?: string;
  attemptId?: string;
  deadline?: string;
  score?: number;
  maxScore?: number;
  percentage?: number;
  correct?: number;
  incorrect?: number;
  unanswered?: number;
  timeUsedMinutes?: number;
}

export interface ExamAttemptDetail {
  id: string;
  examConfigId: string;
  status: string;
  startedAt: string;
  deadline: string;
  submittedAt: string | null;
  score: number | null;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scoreValue: number;
  maxScore: number;
  scorePercentage: number;
  timeUsedMinutes: number;
  subjectBreakdown: Record<string, { correct: number; incorrect: number; unanswered: number; total: number }> | null;
  questionResults: QuestionResult[] | null;
  examConfigSnapshot: (ExamConfigLocal & { questions?: ExamQuestionRow[] }) | null;
  createdAt: string;
  updatedAt: string;
  examConfig: ExamConfigLocal & { questions: ExamQuestionRow[] };
  questions: ExamQuestionRow[];
  answers: ExamAnswerRow[];
}

export interface QuestionResult {
  questionId: string;
  prompt: string;
  options: string[];
  userAnswer?: number;
  correctAnswer: number;
  isCorrect: boolean;
  isUnanswered: boolean;
  isFlagged?: boolean;
  marksAwarded: number;
  explanation?: string;
  subject: string;
  topic?: string;
}

export interface ExamAnswerRow {
  questionId: string;
  userAnswer: number | null;
  isCorrect: boolean;
  isUnanswered: boolean;
  isFlagged?: boolean;
  marksAwarded: number;
}

function normalizeAttemptDetail(raw: Record<string, unknown>): ExamAttemptDetail {
  const rawQuestions = Array.isArray(raw.questions) ? (raw.questions as Record<string, unknown>[]) : [];
  const rawAnswers = Array.isArray(raw.answers) ? (raw.answers as Record<string, unknown>[]) : [];
  const rawConfig = (raw.exam_config ?? raw.examConfig ?? {}) as Record<string, unknown>;
  const rawSnapshot = (raw.exam_config_snapshot ?? raw.examConfigSnapshot ?? null) as Record<string, unknown> | null;

  const questions: ExamQuestionRow[] = rawQuestions.map((q) => ({
    id: String(q.id ?? ""),
    exam_config_id: String(q.exam_config_id ?? raw.exam_config_id ?? ""),
    prompt: String(q.prompt ?? ""),
    options: Array.isArray(q.options) ? (q.options as string[]) : [],
    answer: typeof q.answer === "number" ? q.answer : 0,
    explanation: typeof q.explanation === "string" ? q.explanation : null,
    subject: String(q.subject ?? "General"),
    topic: typeof q.topic === "string" ? q.topic : null,
    difficulty: typeof q.difficulty === "number" ? q.difficulty : null,
    source_ref: typeof q.source_ref === "string" ? q.source_ref : null,
    verification_status: (q.verification_status as "official" | "school-configured" | "unverified") ?? "school-configured",
    display_order: typeof q.display_order === "number" ? q.display_order : 0,
  }));

  const answers: ExamAnswerRow[] = rawAnswers.map((a) => ({
    questionId: String(a.question_id ?? a.questionId ?? ""),
    userAnswer: typeof a.user_answer === "number" ? a.user_answer : typeof a.userAnswer === "number" ? a.userAnswer : null,
    isCorrect: Boolean(a.is_correct ?? a.isCorrect),
    isUnanswered: a.is_unanswered !== undefined ? Boolean(a.is_unanswered) : a.isUnanswered !== undefined ? Boolean(a.isUnanswered) : true,
    isFlagged: Boolean(a.is_flagged ?? a.isFlagged),
    marksAwarded: Number(a.marks_awarded ?? a.marksAwarded ?? 0),
  }));

  return {
    id: String(raw.id ?? ""),
    examConfigId: String(raw.exam_config_id ?? raw.examConfigId ?? ""),
    status: String(raw.status ?? "in_progress"),
    startedAt: String(raw.started_at ?? raw.startedAt ?? new Date().toISOString()),
    deadline: String(raw.deadline ?? new Date().toISOString()),
    submittedAt: typeof raw.submitted_at === "string" ? raw.submitted_at : typeof raw.submittedAt === "string" ? raw.submittedAt : null,
    score: typeof raw.score === "number" ? raw.score : null,
    totalQuestions: Number(raw.total_questions ?? raw.totalQuestions ?? questions.length),
    correctCount: Number(raw.correct_count ?? raw.correctCount ?? 0),
    incorrectCount: Number(raw.incorrect_count ?? raw.incorrectCount ?? 0),
    unansweredCount: Number(raw.unanswered_count ?? raw.unansweredCount ?? 0),
    scoreValue: Number(raw.score_value ?? raw.scoreValue ?? 0),
    maxScore: Number(raw.max_score ?? raw.maxScore ?? 0),
    scorePercentage: Number(raw.score_percentage ?? raw.scorePercentage ?? 0),
    timeUsedMinutes: Number(raw.time_used_minutes ?? raw.timeUsedMinutes ?? 0),
    subjectBreakdown: (raw.subject_breakdown ?? raw.subjectBreakdown ?? null) as Record<string, { correct: number; incorrect: number; unanswered: number; total: number }> | null,
    questionResults: (raw.question_results ?? raw.questionResults ?? null) as QuestionResult[] | null,
    examConfigSnapshot: (rawSnapshot as unknown as (ExamConfigLocal & { questions?: ExamQuestionRow[] })) ?? null,
    createdAt: String(raw.created_at ?? raw.createdAt ?? new Date().toISOString()),
    updatedAt: String(raw.updated_at ?? raw.updatedAt ?? new Date().toISOString()),
    examConfig: {
      id: String(rawConfig.id ?? ""),
      name: String(rawConfig.name ?? ""),
      examType: (rawConfig.exam_type ?? rawConfig.examType ?? "neb") as ExamMode,
      year: String(rawConfig.year ?? ""),
      durationMinutes: Number(rawConfig.duration_minutes ?? rawConfig.durationMinutes ?? 60),
      totalQuestions: Number(rawConfig.total_questions ?? rawConfig.totalQuestions ?? 0),
      questionsPerSubject: (rawConfig.questions_per_subject ?? rawConfig.questionsPerSubject ?? {}) as Record<string, number>,
      marksPerCorrect: Number(rawConfig.marks_per_correct ?? rawConfig.marksPerCorrect ?? 1),
      marksPerIncorrect: Number(rawConfig.marks_per_incorrect ?? rawConfig.marksPerIncorrect ?? 0),
      marksPerUnanswered: Number(rawConfig.marks_per_unanswered ?? rawConfig.marksPerUnanswered ?? 0),
      negativeMarking: Boolean(rawConfig.negative_marking ?? rawConfig.negativeMarking),
      allowedUnanswered: Boolean(rawConfig.allowed_unanswered ?? rawConfig.allowedUnanswered ?? true),
      verificationStatus: (rawConfig.verification_status ?? rawConfig.verificationStatus ?? "practice") as "official" | "provisional" | "practice",
      sourceRef: String(rawConfig.source_ref ?? rawConfig.sourceRef ?? ""),
      effectiveYear: String(rawConfig.effective_year ?? rawConfig.effectiveYear ?? ""),
      syllabusVersion: String(rawConfig.syllabus_version ?? rawConfig.syllabusVersion ?? ""),
      description: String(rawConfig.description ?? ""),
      subjectDistribution: (rawConfig.subject_distribution ?? rawConfig.subjectDistribution ?? {}) as Record<string, number>,
      questions,
    },
    questions,
    answers,
  };
}

export async function listExamConfigs(examType?: "neb" | "cee" | "ioe"): Promise<ExamConfigLocal[]> {
  return getAllExamConfigs().filter((config) => !examType || config.examType === examType);
}

export async function getExamConfigById(examId: string): Promise<ExamConfigLocal | undefined> {
  return getExamConfig(examId);
}

export async function startExamAttempt(examConfigIdOrSlug: string): Promise<ExamAttemptResult> {
  const { getAuthenticatedContext } = await import("@/lib/supabase/auth-context");
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  // Support resolving either by config UUID or slug (e.g. "neb-practice")
  const config = getExamConfig(examConfigIdOrSlug);
  const targetId = config?.id ?? examConfigIdOrSlug;

  const configIdResult = validateUuid(targetId, "examConfigId");
  if (!configIdResult.ok) {
    return { status: "failed", message: configIdResult.message };
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: "failed", message: "Authentication required" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "failed", message: "Supabase not configured" };
  }

  const { data, error } = await supabase.rpc("start_exam_attempt", { p_exam_config_id: targetId });
  if (error || !data) {
    return { status: "failed", message: error?.message || "Failed to start exam attempt" };
  }

  return { status: "ready", attemptId: data.attempt_id, deadline: data.deadline };
}

export async function getExamAttempt(attemptId: string): Promise<ExamAttemptDetail | null> {
  const { getAuthenticatedContext } = await import("@/lib/supabase/auth-context");
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  const attemptIdResult = validateUuid(attemptId, "attemptId");
  if (!attemptIdResult.ok) {
    return null;
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return null;

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("get_exam_attempt", { p_attempt_id: attemptId });
  if (error || !data || typeof data !== "object") {
    return null;
  }

  return normalizeAttemptDetail(data as Record<string, unknown>);
}

export async function saveExamAnswer(
  attemptId: string,
  questionId: string,
  userAnswer: number | null,
  isFlagged?: boolean
): Promise<{ saved: boolean; isCorrect: boolean; marksAwarded: number; isFlagged?: boolean }> {
  const { getAuthenticatedContext } = await import("@/lib/supabase/auth-context");
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  const attemptIdResult = validateUuid(attemptId, "attemptId");
  if (!attemptIdResult.ok) {
    return { saved: false, isCorrect: false, marksAwarded: 0 };
  }

  const questionIdResult = validateUuid(questionId, "questionId");
  if (!questionIdResult.ok) {
    return { saved: false, isCorrect: false, marksAwarded: 0 };
  }

  if (userAnswer !== null) {
    const answerResult = validateNumberRange(userAnswer, "userAnswer", 0, 100);
    if (!answerResult.ok) {
      return { saved: false, isCorrect: false, marksAwarded: 0 };
    }
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { saved: false, isCorrect: false, marksAwarded: 0 };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { saved: false, isCorrect: false, marksAwarded: 0 };

  // Rate limiting & atomic update are enforced directly inside the PostgreSQL RPC transaction
  const { data, error } = await supabase.rpc("save_exam_answer", {
    p_attempt_id: attemptId,
    p_question_id: questionId,
    p_user_answer: userAnswer,
    p_is_flagged: isFlagged ?? null,
  });

  if (error || !data) {
    return { saved: false, isCorrect: false, marksAwarded: 0 };
  }

  return {
    saved: Boolean(data.saved),
    isCorrect: false,
    marksAwarded: 0,
    isFlagged: Boolean(data.is_flagged ?? isFlagged ?? false),
  };
}

export async function submitExamAttempt(attemptId: string): Promise<ExamAttemptResult> {
  const { getAuthenticatedContext } = await import("@/lib/supabase/auth-context");
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  const attemptIdResult = validateUuid(attemptId, "attemptId");
  if (!attemptIdResult.ok) {
    return { status: "failed", message: attemptIdResult.message };
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: "failed", message: "Authentication required" };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "failed", message: "Supabase not configured" };

  const { data, error } = await supabase.rpc("submit_exam_attempt", { p_attempt_id: attemptId });
  if (error || !data) {
    return { status: "failed", message: error?.message || "Failed to submit exam attempt" };
  }

  if (typeof data.status !== "string") {
    return { status: "failed", message: "Invalid submission response" };
  }

  return data as ExamAttemptResult;
}

export async function getExamAttemptDetail(attemptId: string): Promise<ExamAttemptDetail | null> {
  return getExamAttempt(attemptId);
}

export async function listUserExamAttempts(): Promise<ExamAttemptRecord[]> {
  const { getAuthenticatedContext } = await import("@/lib/supabase/auth-context");
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return [];

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("user_id", context.user.id)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data as ExamAttemptRecord[];
}

export async function getExamQuestionsForConfig(examConfigId: string) {
  const { createSupabaseServerClient } = await import("@/lib/supabase/server");

  const configIdResult = validateUuid(examConfigId, "examConfigId");
  if (!configIdResult.ok) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("exam_questions_public")
    .select("*")
    .eq("exam_config_id", examConfigId)
    .order("display_order");

  if (error) return [];

  return data;
}
