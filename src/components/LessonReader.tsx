"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadPublishedLesson, saveLessonProgress } from "@/app/actions/learning";

type LessonState = Awaited<ReturnType<typeof loadPublishedLesson>>;
type LoadedLesson = Extract<LessonState, { status: "ready" }>;

export default function LessonReader({ lessonId }: { lessonId: string }) {
  const [result, setResult] = useState<LessonState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackIsError, setFeedbackIsError] = useState(false);

  async function refreshLesson() {
    try {
      setResult(await loadPublishedLesson(lessonId));
    } catch {
      setResult({ status: "database-error" });
    }
  }

  useEffect(() => {
    let isMounted = true;
    void loadPublishedLesson(lessonId).then((response) => {
      if (isMounted) setResult(response);
    }).catch(() => {
      if (isMounted) setResult({ status: "database-error" });
    });
    return () => { isMounted = false; };
  }, [lessonId]);

  async function markComplete() {
    if (result?.status !== "ready" || result.lesson.progressPercent === 100) return;
    setIsSaving(true);
    setFeedback("");
    setFeedbackIsError(false);
    try {
      const response = await saveLessonProgress(lessonId, 100);
      if (response.status === "saved") {
        setResult((current) => current?.status === "ready" ? { status: "ready", lesson: { ...current.lesson, progressPercent: 100 } } : current);
        setFeedback(response.activitySaved ? "Lesson completion saved to your account." : "Lesson completion saved; the activity event could not be recorded.");
      } else {
        setFeedback(response.status === "signed-out" ? "Log in to save lesson progress." : response.status === "unconfigured" ? "Not saved: Supabase is not configured." : response.status === "lesson-unavailable" ? "Not saved: this lesson is no longer published." : "Not saved. Check the database migration and RLS policies.");
        setFeedbackIsError(true);
      }
    } catch {
      setFeedback("The save request failed. Completion was not confirmed.");
      setFeedbackIsError(true);
    } finally {
      setIsSaving(false);
    }
  }

  if (!result) return <div className="lesson-reader-state" role="status">Loading lesson…</div>;
  if (result.status === "unconfigured") return <div className="lesson-reader-state" role="alert"><strong>Supabase is not configured.</strong><p>Set up the project URL and publishable key before loading published lessons.</p><Link href="/learn">Back to lessons</Link></div>;
  if (result.status === "signed-out") return <div className="lesson-reader-state"><strong>Log in to open this lesson.</strong><p>Lesson access requires a verified student session.</p><Link className="button button-primary" href="/login">Log in <span aria-hidden="true">→</span></Link></div>;
  if (result.status === "auth-error") return <div className="lesson-reader-state" role="alert"><strong>Your session could not be verified.</strong><p>Log in again before opening this lesson.</p><Link className="button button-secondary" href="/login">Log in</Link></div>;
  if (result.status === "lesson-unavailable") return <div className="lesson-reader-state"><strong>This lesson is unavailable.</strong><p>It may not be published or its ID may be invalid.</p><Link href="/learn">Back to lessons</Link></div>;
  if (result.status === "content-unavailable") return <div className="lesson-reader-state"><strong>Lesson content is not available yet.</strong><p>The lesson is published, but it does not contain readable lesson material.</p><Link href="/learn">Back to lessons</Link></div>;
  if (result.status !== "ready") return <div className="lesson-reader-state" role="alert"><strong>Lesson could not be loaded.</strong><p>Check the database connection and policies, then try again.</p><button className="button button-secondary" type="button" onClick={() => { setResult(null); void refreshLesson(); }}>Try again</button></div>;

  const lesson = (result as LoadedLesson).lesson;
  const content = lesson.content;
  if (!content) return <div className="lesson-reader-state"><strong>Lesson content is not available yet.</strong><p>The lesson is published, but it does not contain readable lesson material.</p><Link href="/learn">Back to lessons</Link></div>;
  return <article className="lesson-reader">
    <Link className="lesson-back-link" href="/learn">← All lessons</Link>
    <div className="lesson-reader-heading"><span className="lesson-subject">{lesson.subject}{lesson.grade ? ` · Grade ${lesson.grade}` : ""}</span>{lesson.isSample && <span className="sample-tag">SAMPLE CONTENT</span>}</div>
    <h1>{lesson.title}</h1>
    {lesson.description && <p className="lesson-reader-description">{lesson.description}</p>}
    {lesson.isSample && <p className="curriculum-note"><span aria-hidden="true">i</span> This lesson is sample content and is not verified against the official NEB syllabus.</p>}
    <div className="lesson-reader-content">
      <p className="lesson-introduction">{content.introduction}</p>
      {content.sections.map((section, index) => <section className="lesson-content-section" key={`${lesson.id}-${index}`}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
      <aside className="lesson-key-idea"><span className="section-kicker">KEY IDEA</span><p>{content.keyIdea}</p></aside>
    </div>
    <div className="lesson-completion-panel"><div><span className="section-kicker">YOUR PROGRESS</span><strong>{lesson.progressPercent === 100 ? "Completed" : lesson.progressPercent > 0 ? `${lesson.progressPercent}% complete` : "Not completed yet"}</strong><span>{lesson.progressPercent === 100 ? "This completion is saved to your account." : "Mark this lesson complete to save your progress."}</span></div><button className="button button-primary" type="button" onClick={markComplete} disabled={isSaving || lesson.progressPercent === 100}>{isSaving ? "Saving…" : lesson.progressPercent === 100 ? "Completed" : "Mark as complete"}{lesson.progressPercent !== 100 && <span aria-hidden="true">✓</span>}</button></div>
    {feedback && <p className={feedbackIsError ? "lesson-feedback error" : "lesson-feedback success"} role={feedbackIsError ? "alert" : "status"}>{feedback}</p>}
  </article>;
}