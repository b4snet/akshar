"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadPublishedLessons } from "@/app/actions/learning";

type LessonListState = Awaited<ReturnType<typeof loadPublishedLessons>>;
type PublishedLessons = Extract<LessonListState, { status: "ready" }>;

function getLessonMark(subject: string) {
  return subject.slice(0, 1).toUpperCase();
}

export default function LessonLibrary() {
  const [result, setResult] = useState<LessonListState | null>(null);

  useEffect(() => {
    let isMounted = true;
    void loadPublishedLessons().then((response) => {
      if (isMounted) setResult(response);
    }).catch(() => {
      if (isMounted) setResult({ status: "database-error" });
    });
    return () => { isMounted = false; };
  }, []);

  let content;
  if (!result) {
    content = <div className="lesson-library-state" role="status">Loading published lessons…</div>;
  } else if (result.status === "unconfigured") {
    content = <div className="lesson-library-state" role="alert"><strong>Supabase is not configured.</strong><p>Add the project API URL and publishable key to `.env.local`, then restart the app. Lessons are loaded from published database records.</p></div>;
  } else if (result.status === "signed-out") {
    content = <div className="lesson-library-state"><strong>Log in to browse available lessons.</strong><p>Your lesson list will show content published for students.</p><Link className="button button-primary" href="/login">Log in <span aria-hidden="true">→</span></Link></div>;
  } else if (result.status === "auth-error") {
    content = <div className="lesson-library-state" role="alert"><strong>Your session could not be verified.</strong><p>Log in again before loading account lessons.</p><Link className="button button-secondary" href="/login">Log in</Link></div>;
  } else if (result.status !== "ready") {
    content = <div className="lesson-library-state" role="alert"><strong>Lessons could not be loaded.</strong><p>Check the Supabase connection, migration, and lesson read policy. No sample lesson list is being presented as database content.</p><button className="button button-secondary" type="button" onClick={() => setResult(null)}>Try again</button></div>;
  } else {
    const published = (result as PublishedLessons).lessons;
    content = published.length ? <div className="published-lesson-grid">
      {published.map((lesson) => <article className="published-lesson-card" key={lesson.id}>
        <div className="published-lesson-top"><span className="lesson-mark violet" aria-hidden="true">{getLessonMark(lesson.subject)}</span><span className="sample-tag">{lesson.isSample ? "SAMPLE LESSON" : "PUBLISHED"}</span></div>
        <span className="lesson-subject">{lesson.subject}{lesson.grade ? ` · Grade ${lesson.grade}` : ""}</span>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
        <div className="published-lesson-progress"><span>{lesson.progressPercent === 100 ? "Completed" : lesson.progressPercent > 0 ? `${lesson.progressPercent}% complete` : "Not started"}</span><div className="progress-track"><span style={{ width: `${lesson.progressPercent}%` }} /></div></div>
        {lesson.content ? <Link className="published-lesson-link" href={`/learn/${lesson.id}`}>Open lesson <span aria-hidden="true">→</span></Link> : <span className="lesson-content-unavailable">Lesson content is not available yet.</span>}
      </article>)}
    </div> : <div className="lesson-library-state"><strong>No published lessons yet.</strong><p>Published lessons will appear here after they are added to the lessons table.</p></div>;
  }

  return <section className="lesson-library" aria-labelledby="published-lessons-heading">
    <div className="section-heading"><div><div className="section-kicker">PUBLISHED LESSONS</div><h2 id="published-lessons-heading">Learn at your own pace</h2></div><span className="sample-tag">DATABASE CONTENT</span></div>
    <p className="lesson-library-intro">Only lessons published in Supabase are listed here. Sample lesson content is illustrative and is not verified against the official NEB syllabus.</p>
    {content}
  </section>;
}