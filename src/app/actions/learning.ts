"use server";

import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { demoLessons } from "@/lib/demoLessons";
import { quizTracks } from "@/lib/quizData";
import type { QuizId } from "@/lib/quizTypes";

type LessonContent = {
  introduction: string;
  sections: { heading: string; body: string }[];
  keyIdea: string;
};

type AuthContext =
  | { status: "ready"; supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>; user: User }
  | { status: "unconfigured" | "signed-out" | "auth-error" };

async function getAuthenticatedContext(): Promise<AuthContext> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "unconfigured" };

  const { data, error } = await supabase.auth.getUser();
  if (error && error.name !== "AuthSessionMissingError") return { status: "auth-error" };
  if (!data.user) return { status: "signed-out" };
  return { status: "ready", supabase, user: data.user };
}

function parseLessonContent(value: unknown): LessonContent | null {
  if (!value || typeof value !== "object") return null;
  const content = value as Record<string, unknown>;
  if (typeof content.introduction !== "string" || typeof content.keyIdea !== "string" || !Array.isArray(content.sections)) return null;

  const sections = content.sections.filter((section): section is { heading: string; body: string } => {
    return !!section && typeof section === "object" &&
      typeof (section as Record<string, unknown>).heading === "string" &&
      typeof (section as Record<string, unknown>).body === "string";
  });
  if (sections.length !== content.sections.length) return null;

  return { introduction: content.introduction, sections, keyIdea: content.keyIdea };
}

function mapPublishedLesson(row: {
  id: string;
  subject: string;
  grade: number | null;
  title: string;
  description: string;
  is_sample: boolean;
  content: unknown;
}, progress?: { progress_percent: number; completed_at: string | null }) {
  const bundledLesson = demoLessons.find((lesson) => lesson.id === row.id);
  return {
    id: row.id,
    subject: row.subject,
    grade: row.grade,
    title: row.title,
    description: row.description,
    isSample: row.is_sample,
    content: parseLessonContent(row.content) ?? bundledLesson?.content ?? null,
    progressPercent: progress?.progress_percent ?? 0,
    completedAt: progress?.completed_at ?? null,
  };
}

export async function loadPublishedLessons() {
  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status } as const;

  const [lessonResult, progressResult] = await Promise.all([
    context.supabase.from("lessons").select("id, subject, grade, title, description, is_sample, content").eq("is_published", true).order("grade", { ascending: true }).order("subject", { ascending: true }),
    context.supabase.from("lesson_progress").select("lesson_id, progress_percent, completed_at").eq("user_id", context.user.id),
  ]);

  if (lessonResult.error || progressResult.error) return { status: "database-error" } as const;

  const progressByLesson = new Map((progressResult.data ?? []).map((row) => [row.lesson_id, row]));
  return {
    status: "ready" as const,
    lessons: (lessonResult.data ?? []).map((row) => mapPublishedLesson(row, progressByLesson.get(row.id))),
  };
}

export async function loadPublishedLesson(lessonId: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(lessonId)) {
    return { status: "lesson-unavailable" } as const;
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status } as const;

  const { data: row, error } = await context.supabase.from("lessons").select("id, subject, grade, title, description, is_sample, content").eq("id", lessonId).eq("is_published", true).maybeSingle();
  if (error) return { status: "database-error" } as const;
  if (!row) return { status: "lesson-unavailable" } as const;

  const { data: progress, error: progressError } = await context.supabase.from("lesson_progress").select("progress_percent, completed_at").eq("user_id", context.user.id).eq("lesson_id", row.id).maybeSingle();
  if (progressError) return { status: "database-error" } as const;

  const lesson = mapPublishedLesson(row, progress ?? undefined);
  if (!lesson.content) return { status: "content-unavailable" } as const;
  return { status: "ready" as const, lesson };
}

export async function loadLearningData() {
  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status } as const;

  const [profileResult, progressResult, attemptsResult, activityResult, publishedLessonsResult] = await Promise.all([
    context.supabase.from("profiles").select("display_name").eq("id", context.user.id).maybeSingle(),
    context.supabase.from("lesson_progress").select("lesson_id, progress_percent, completed_at, updated_at, lessons(subject, title, grade)").eq("user_id", context.user.id).order("updated_at", { ascending: false }),
    context.supabase.from("quiz_attempts").select("id, category, quiz_title, score, total_questions, completed_at", { count: "exact" }).eq("user_id", context.user.id).order("completed_at", { ascending: false }).limit(12),
    context.supabase.from("study_activity").select("id, activity_type, details, occurred_at").eq("user_id", context.user.id).order("occurred_at", { ascending: false }).limit(20),
    context.supabase.from("lessons").select("id", { count: "exact", head: true }).eq("is_published", true),
  ]);

  if (profileResult.error || progressResult.error || attemptsResult.error || activityResult.error || publishedLessonsResult.error) {
    return { status: "database-error" } as const;
  }

  const lessons = (progressResult.data ?? []).map((row) => {
    const lesson = Array.isArray(row.lessons) ? row.lessons[0] : row.lessons;
    return {
      lessonId: row.lesson_id,
      subject: lesson?.subject ?? "Subject",
      title: lesson?.title ?? "Lesson",
      grade: lesson?.grade ?? null,
      progressPercent: row.progress_percent,
      completedAt: row.completed_at,
      updatedAt: row.updated_at,
    };
  });

  return {
    status: "ready" as const,
    profile: { email: context.user.email ?? "", displayName: profileResult.data?.display_name ?? "" },
    lessons,
    attempts: attemptsResult.data ?? [],
    attemptCount: attemptsResult.count ?? 0,
    activity: activityResult.data ?? [],
    publishedLessonCount: publishedLessonsResult.count ?? 0,
  };
}

export async function updateMyProfile(displayName: string) {
  const cleanedName = displayName.trim();
  if (!cleanedName || cleanedName.length > 80) return { status: "invalid" } as const;

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status } as const;

  const { data, error } = await context.supabase.from("profiles").update({ display_name: cleanedName }).eq("id", context.user.id).select("id").maybeSingle();
  if (error || !data) return { status: "database-error" } as const;
  return { status: "saved", displayName: cleanedName } as const;
}

export async function saveLessonProgress(lessonId: string, progressPercent: number) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(lessonId) || !Number.isInteger(progressPercent) || progressPercent < 0 || progressPercent > 100) {
    return { status: "invalid" } as const;
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status } as const;

  const { data: publishedLesson, error: lessonError } = await context.supabase.from("lessons").select("id").eq("id", lessonId).eq("is_published", true).maybeSingle();
  if (lessonError) return { status: "database-error" } as const;
  if (!publishedLesson) return { status: "lesson-unavailable" } as const;

  const now = new Date().toISOString();
  const { error } = await context.supabase.from("lesson_progress").upsert({
    user_id: context.user.id,
    lesson_id: lessonId,
    progress_percent: progressPercent,
    completed_at: progressPercent === 100 ? now : null,
    last_viewed_at: now,
    updated_at: now,
  }, { onConflict: "user_id,lesson_id" });
  if (error) return { status: "database-error" } as const;

  const { error: activityError } = await context.supabase.from("study_activity").insert({
    user_id: context.user.id,
    activity_type: progressPercent === 100 ? "lesson_completed" : "lesson_progressed",
    details: { lesson_id: lessonId, progress_percent: progressPercent },
  });

  return { status: "saved", activitySaved: !activityError } as const;
}

export async function submitQuizAttempt(quizId: QuizId, submittedAnswers: Record<number, number>) {
  const quiz = quizTracks.find((item) => item.id === quizId);
  if (!quiz || !submittedAnswers || typeof submittedAnswers !== "object" || Array.isArray(submittedAnswers)) {
    return { status: "invalid" } as const;
  }

  const questionCount = quiz.questions.length;
  const answerKeys = Object.keys(submittedAnswers);
  if (answerKeys.length !== questionCount) return { status: "invalid" } as const;

  const answerValues: number[] = [];
  for (let index = 0; index < questionCount; index += 1) {
    const value = submittedAnswers[index];
    if (!Number.isInteger(value) || value < 0 || value >= quiz.questions[index].options.length) {
      return { status: "invalid" } as const;
    }
    answerValues.push(value);
  }

  const score = quiz.questions.reduce((total, question, index) => total + (answerValues[index] === question.answer ? 1 : 0), 0);
  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status, score, totalQuestions: questionCount } as const;

  const { data, error } = await context.supabase.rpc("submit_quiz_attempt", {
    p_quiz_id: quiz.id,
    p_answers: answerValues,
  });
  if (error || !data || !Number.isInteger(data.score) || !Number.isInteger(data.total_questions)) {
    return { status: "database-error", score, totalQuestions: questionCount } as const;
  }

  return { status: "saved", score: data.score, totalQuestions: data.total_questions, activitySaved: true } as const;
}