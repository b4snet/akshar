"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadLearningData, saveLessonProgress } from "@/app/actions/learning";

type LessonCard = {
  id: string;
  subject: string;
  title: string;
  unit: string;
  progress: number;
  minutes: number;
  tint: string;
  mark: string;
};

type LearningSnapshot = Awaited<ReturnType<typeof loadLearningData>>;
type ReadySnapshot = Extract<LearningSnapshot, { status: "ready" }>;

function getStudyStreak(activity: ReadySnapshot["activity"]) {
  const activeDays = new Set(activity.map((item) => new Date(item.occurred_at).toLocaleDateString("en-CA")));
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  if (!activeDays.has(day.toLocaleDateString("en-CA"))) day.setDate(day.getDate() - 1);

  let streak = 0;
  while (activeDays.has(day.toLocaleDateString("en-CA"))) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

function DataNotice({ status }: { status: LearningSnapshot["status"] | "loading" }) {
  if (status === "ready") return null;
  const message = status === "loading"
    ? "Loading account progress…"
    : status === "unconfigured"
      ? "Supabase is not configured. Add the project API URL and publishable key to the root .env.local, then restart the app."
      : status === "signed-out"
        ? "Sign in to load or save account progress. The example values below are not saved."
        : status === "auth-error"
          ? "The session could not be verified. No account data was loaded."
          : "Saved data could not be loaded. Apply the migration in the Supabase SQL Editor and verify RLS policies. No save is being claimed.";

  return <div className={`learning-data-notice ${status === "loading" ? "loading" : ""}`} role={status === "loading" ? "status" : "alert"}>{message}{status === "signed-out" && <> <Link href="/login">Log in</Link></>}</div>;
}

function LessonCompletionButton({ lessonId, alreadyComplete, onSaved }: { lessonId: string; alreadyComplete: boolean; onSaved: () => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);

  async function markComplete() {
    setIsSaving(true);
    setFeedback("");
    setNeedsLogin(false);
    try {
      const result = await saveLessonProgress(lessonId, 100);
      if (result.status === "saved") {
        setFeedback(result.activitySaved ? "Saved to your account." : "Lesson saved; activity could not be recorded.");
        onSaved();
      } else if (result.status === "signed-out") {
        setNeedsLogin(true);
      } else if (result.status === "unconfigured") {
        setFeedback("Not saved: configure Supabase first.");
      } else if (result.status === "lesson-unavailable") {
        setFeedback("Not saved: the sample lesson is not published in the database.");
      } else {
        setFeedback("Not saved. Check the database migration and RLS policies.");
      }
    } catch {
      setFeedback("The save request failed. Nothing is confirmed as saved.");
    } finally {
      setIsSaving(false);
    }
  }

  return <div className="lesson-save-control"><button className="lesson-save-button" type="button" onClick={markComplete} disabled={isSaving || alreadyComplete}>{isSaving ? "Saving…" : alreadyComplete ? "Completed" : "Mark complete"}</button>{needsLogin ? <span className="lesson-save-feedback" role="status"><Link href="/login">Log in to save</Link></span> : feedback && <span className="lesson-save-feedback" role="status">{feedback}</span>}</div>;
}

export default function DashboardLearning({ lessons }: { lessons: LessonCard[] }) {
  const [snapshot, setSnapshot] = useState<LearningSnapshot | null>(null);

  async function refreshData() {
    try {
      setSnapshot(await loadLearningData());
    } catch {
      setSnapshot({ status: "database-error" });
    }
  }

  useEffect(() => {
    let isMounted = true;
    void loadLearningData().then((result) => {
      if (isMounted) setSnapshot(result);
    }).catch(() => {
      if (isMounted) setSnapshot({ status: "database-error" });
    });
    return () => { isMounted = false; };
  }, []);

  const isReady = snapshot?.status === "ready";
  const readySnapshot = isReady ? snapshot : null;
  const completedCount = readySnapshot ? readySnapshot.lessons.filter((item) => item.progressPercent === 100).length : 8;
  const totalLessons = readySnapshot ? readySnapshot.publishedLessonCount : 12;
  const quizCount = readySnapshot ? readySnapshot.attemptCount : 4;
  const streak = readySnapshot ? getStudyStreak(readySnapshot.activity) : 3;

  return <>
    <section className="section-block learning-section" id="learning" aria-labelledby="learning-heading">
      <div className="section-heading"><div><div className="section-kicker">PICK UP THE THREAD</div><h2 id="learning-heading">Continue learning</h2></div><Link className="text-link" href="/learn">All learning paths <span aria-hidden="true">→</span></Link></div>
      <DataNotice status={snapshot?.status ?? "loading"} />
      <div className="lesson-list">
        {lessons.map((lesson) => {
          const savedLesson = readySnapshot?.lessons.find((item) => item.lessonId === lesson.id);
          const progress = readySnapshot ? savedLesson?.progressPercent ?? 0 : lesson.progress;
          return <article className="lesson-row" key={lesson.id}>
            <div className={`lesson-mark ${lesson.tint}`} aria-hidden="true">{lesson.mark}</div>
            <div className="lesson-info"><span className="lesson-subject">{lesson.subject}</span><h3>{lesson.title}</h3><p>{lesson.unit}</p><LessonCompletionButton lessonId={lesson.id} alreadyComplete={progress === 100} onSaved={() => { void refreshData(); }} /></div>
            <div className="lesson-progress"><div className="lesson-progress-top"><span>{isReady ? "Saved progress" : "Sample progress"}</span><span>{isReady ? `${progress}%` : `${lesson.minutes} min sample`}</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>
            <Link className="lesson-button" href={`/learn/${lesson.id}`} aria-label={`Continue ${lesson.title}`}>Continue <span aria-hidden="true">→</span></Link>
          </article>;
        })}
      </div>
    </section>

    <section className="progress-section" id="progress" aria-labelledby="progress-heading">
      <div className="progress-intro"><div className="section-kicker">SMALL STEPS, REAL MOMENTUM</div><h2 id="progress-heading">Progress, at a glance.</h2><p>{readySnapshot ? "Your account's saved learning activity." : "A sample snapshot until account data is configured."}</p><span className="sample-tag">{readySnapshot ? "ACCOUNT DATA" : "EXAMPLE ONLY · NOT SAVED TO AN ACCOUNT"}</span><Link className="text-link progress-link" href="/progress">View the activity overview <span aria-hidden="true">→</span></Link></div>
      <div className="progress-stats"><div className="stat-block"><div className="stat-number">{String(completedCount).padStart(2, "0")}<span>/{totalLessons}</span></div><div className="stat-label">{readySnapshot ? "Lessons completed" : "Sample lessons completed"}</div><div className="stat-note">{readySnapshot ? "Saved to your account" : "Across example courses"}</div></div><div className="stat-block"><div className="stat-number">{String(quizCount).padStart(2, "0")}</div><div className="stat-label">{readySnapshot ? "Quiz attempts" : "Sample quiz attempts"}</div><div className="stat-note">{readySnapshot ? "Saved attempts" : "Across NEB, CEE, and IOE"}</div></div><div className="stat-block stat-subject"><div className="stat-subject-top"><span>{readySnapshot ? "LATEST SAVED ACTIVITY" : "SAMPLE SNAPSHOT"}</span><span>{readySnapshot ? "ACCOUNT" : "EXAMPLE"}</span></div>{readySnapshot && readySnapshot.activity.length > 0 ? readySnapshot.activity.slice(0, 3).map((item) => <div className="subject-line" key={item.id}><span>{item.activity_type.replaceAll("_", " ")}</span><span className="activity-time">{new Date(item.occurred_at).toLocaleDateString()}</span></div>) : readySnapshot ? <p className="no-saved-activity">No saved activity yet.</p> : <><div className="subject-line"><span>Study streak</span><b>{streak} days</b></div><div className="subject-line"><span>Physics</span><b>68% sample</b></div><div className="subject-line"><span>Chemistry</span><b>45% sample</b></div></>}</div></div>
    </section>
  </>;
}