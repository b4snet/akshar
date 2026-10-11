"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { loadLearningData, updateMyProfile } from "@/app/actions/learning";

type LearningSnapshot = Awaited<ReturnType<typeof loadLearningData>>;
type ReadySnapshot = Extract<LearningSnapshot, { status: "ready" }>;

function calculateStreak(activity: ReadySnapshot["activity"]) {
  const days = new Set(activity.map((item) => new Date(item.occurred_at).toLocaleDateString("en-CA")));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!days.has(cursor.toLocaleDateString("en-CA"))) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (days.has(cursor.toLocaleDateString("en-CA"))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getStatusMessage(status: LearningSnapshot["status"]) {
  if (status === "unconfigured") return "Supabase is not configured. Add the project API URL and publishable key to .env.local, then restart the app. Sample values below are not saved.";
  if (status === "signed-out") return "Log in to view account progress. Sample values below are only a preview.";
  if (status === "auth-error") return "The session could not be verified. No account data was loaded.";
  if (status === "database-error") return "Saved data could not be loaded. Apply the migration in Supabase SQL Editor and verify RLS policies. Sample values below are not account data.";
  return "";
}

function activityLabel(activityType: string) {
  const labels: Record<string, string> = {
    lesson_opened: "Opened a lesson",
    lesson_progressed: "Updated lesson progress",
    lesson_completed: "Completed a lesson",
    quiz_completed: "Completed a quiz",
  };
  return labels[activityType] ?? "Learning activity";
}

export default function LearningProgressPanel() {
  const [snapshot, setSnapshot] = useState<LearningSnapshot | null>(null);
  const [profileDraft, setProfileDraft] = useState<string | null>(null);
  const [profileFeedback, setProfileFeedback] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (profileDraft === null) return;
    setIsSavingProfile(true);
    setProfileFeedback("");
    try {
      const result = await updateMyProfile(profileDraft);
      if (result.status === "saved") {
        setProfileFeedback("Profile name updated.");
        await refreshData();
      } else if (result.status === "signed-out") {
        setProfileFeedback("Log in before updating your profile.");
      } else if (result.status === "unconfigured") {
        setProfileFeedback("Not updated: configure Supabase first.");
      } else if (result.status === "invalid") {
        setProfileFeedback("Enter a name between 1 and 80 characters.");
      } else {
        setProfileFeedback("Profile was not updated. Check the migration and RLS policy.");
      }
    } catch {
      setProfileFeedback("The update failed. Your profile was not confirmed as changed.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  const readySnapshot = snapshot?.status === "ready" ? snapshot : null;
  const completedLessons = readySnapshot ? readySnapshot.lessons.filter((lesson) => lesson.progressPercent === 100).length : 8;
  const lessonTotal = readySnapshot ? readySnapshot.publishedLessonCount : 12;
  const quizAttempts = readySnapshot ? readySnapshot.attemptCount : 4;
  const streak = readySnapshot ? calculateStreak(readySnapshot.activity) : 3;

  return <>
    {snapshot === null ? <div className="learning-data-notice loading" role="status">Loading your account data…</div> : snapshot.status !== "ready" && <div className="learning-data-notice" role="alert">{getStatusMessage(snapshot.status)}{snapshot.status === "signed-out" && <> <Link href="/login">Log in</Link>.</>}</div>}
    <section className="progress-demo-panel" aria-label={readySnapshot ? "Saved learning progress" : "Sample learning progress"}>
      <div className="progress-demo-heading"><div><div className="section-kicker">{readySnapshot ? "YOUR ACCOUNT" : "EXAMPLE LEARNING ACTIVITY"}</div><h2>{readySnapshot ? "Your learning overview" : "Sample learning overview"}</h2></div><span className="sample-tag">{readySnapshot ? "SAVED DATA" : "DEMO · NOT PERSISTED"}</span></div>
      <div className="progress-demo-stats">
        <article className="progress-demo-stat"><span className="stat-number">{String(completedLessons).padStart(2, "0")}<span>/{lessonTotal}</span></span><strong>{readySnapshot ? "Lessons completed" : "Sample lessons completed"}</strong><span>{readySnapshot ? "From your saved lesson progress" : "Example subjects only"}</span></article>
        <article className="progress-demo-stat"><span className="stat-number">{String(quizAttempts).padStart(2, "0")}</span><strong>{readySnapshot ? "Quiz attempts" : "Sample quiz attempts"}</strong><span>{readySnapshot ? "Saved attempt records" : "NEB, CEE, and IOE examples"}</span></article>
        <article className="progress-demo-stat"><span className="stat-number">{streak}<span> days</span></span><strong>{readySnapshot ? "Current study streak" : "Example study streak"}</strong><span>{readySnapshot ? "Calculated from saved activity" : "Illustrative weekly activity"}</span></article>
      </div>
    </section>

    {readySnapshot && <section className="profile-editor" aria-labelledby="profile-editor-heading">
      <div className="profile-editor-copy"><div className="section-kicker">YOUR PROFILE</div><h2 id="profile-editor-heading">Account details</h2><p>{readySnapshot.profile.email}</p></div>
      <form className="profile-editor-form" onSubmit={saveProfile}><label htmlFor="profile-display-name">Display name<input id="profile-display-name" maxLength={80} value={profileDraft ?? readySnapshot.profile.displayName} onChange={(event) => setProfileDraft(event.target.value)} placeholder="Add a display name" /></label><button type="submit" className="button button-primary" disabled={isSavingProfile || profileDraft === null || !profileDraft.trim()}>{isSavingProfile ? "Saving…" : "Update profile"}</button>{profileFeedback && <span className="profile-feedback" role="status">{profileFeedback}</span>}</form>
    </section>}

    <section className="activity-section" aria-labelledby="saved-activity-heading">
      <div className="section-heading"><div><div className="section-kicker">{readySnapshot ? "ACCOUNT RECORDS" : "RECENT ACTIVITY"}</div><h2 id="saved-activity-heading">{readySnapshot ? "Saved learning activity" : "A sample week"}</h2></div><span className="sample-tag">{readySnapshot ? "PRIVATE TO YOUR ACCOUNT" : "ILLUSTRATIVE"}</span></div>
      {readySnapshot ? readySnapshot.activity.length > 0 ? <div className="activity-list">{readySnapshot.activity.map((item) => <article className="activity-row" key={item.id}><span className="activity-date">{new Date(item.occurred_at).toLocaleDateString()}</span><span className="lesson-mark violet" aria-hidden="true">A</span><div className="activity-copy"><strong>{activityLabel(item.activity_type)}</strong><span>Saved account activity</span></div><span className="activity-sample">Saved</span></article>)}</div> : <div className="empty-state"><strong>No saved activity yet</strong><p>Complete a sample lesson or quiz while signed in to start your account history.</p><Link className="button button-secondary" href="/practice">Start a sample quiz</Link></div> : <div className="activity-list">{[
        { date: "Today", action: "Reviewed a sample lesson", subject: "Physics · Vectors and scalars", mark: "P", tint: "violet" },
        { date: "Yesterday", action: "Completed a sample quiz", subject: "CEE · Biology practice", mark: "C", tint: "green" },
        { date: "Oct 9", action: "Continued a sample lesson", subject: "Mathematics · Limits and continuity", mark: "M", tint: "amber" },
      ].map((item) => <article className="activity-row" key={item.subject}><span className="activity-date">{item.date}</span><span className={`lesson-mark ${item.tint}`} aria-hidden="true">{item.mark}</span><div className="activity-copy"><strong>{item.action}</strong><span>{item.subject}</span></div><span className="activity-sample">Sample</span></article>)}</div>}
    </section>

    {readySnapshot && <section className="saved-records-grid" aria-label="Saved progress records">
      <article className="saved-records-section"><div className="section-kicker">LESSON PROGRESS</div><h2>Saved lessons</h2>{readySnapshot.lessons.length ? readySnapshot.lessons.map((lesson) => <div className="saved-record-row" key={lesson.lessonId}><strong>{lesson.subject}: {lesson.title}</strong><span>{lesson.progressPercent}%{lesson.completedAt ? " · completed" : ""}</span></div>) : <p>No lesson progress saved yet.</p>}</article>
      <article className="saved-records-section"><div className="section-kicker">QUIZ HISTORY</div><h2>Saved attempts</h2>{readySnapshot.attempts.length ? readySnapshot.attempts.map((attempt) => <div className="saved-record-row" key={attempt.id}><strong>{attempt.category.toUpperCase()}: {attempt.quiz_title}</strong><span>{attempt.score}/{attempt.total_questions}</span></div>) : <p>No quiz attempts saved yet.</p>}</article>
    </section>}
  </>;
}