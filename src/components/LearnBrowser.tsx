"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { loadCurriculumView, setCurriculumSelection, type CurriculumView } from "@/app/actions/curriculum";
import LessonLibrary from "@/components/LessonLibrary";
import { SearchIcon } from "@/components/Icon";

// The learning workspace. Every subject shown here was filtered server-side
// by eligibleSubjects() for the student's selection — the client only ever
// receives subjects eligible for the validated grade/stream, so a stream
// change can never leave incompatible subjects on screen.

type ReadyView = Extract<CurriculumView, { status: "ready" }>;

const TINTS = ["violet", "green", "amber", "rose", "blue"];

function gradeLabel(grade: string): string {
  if (grade === "11" || grade === "12") return `Grade ${grade}`;
  if (grade === "IOE") return "IOE entrance";
  if (grade === "CEE") return "CEE entrance";
  return grade;
}

function levelLabel(level: string): string {
  if (level === "NEB") return "NEB school (11–12)";
  if (level === "Entrance Preparation") return "Entrance (IOE · CEE)";
  return level;
}

function streamLabel(stream: string): string {
  if (stream.startsWith("IOE entrance")) return "IOE · B.E./B.Arch.";
  if (stream.startsWith("CEE entrance")) return "CEE · MBBS/BDS/Nursing";
  return stream;
}

function failureMessage(status: CurriculumView["status"]): string {
  switch (status) {
    case "unconfigured":
      return "Supabase is not configured, so subjects cannot be loaded.";
    case "signed-out":
      return "Log in to browse subjects for your selection.";
    case "auth-error":
      return "Your session could not be verified. Log in again.";
    default:
      return "Subjects could not be loaded. Check the database connection and migration.";
  }
}

export default function LearnBrowser({ initialGrade, initialLevel }: { initialGrade?: string; initialLevel?: string }) {
  const [view, setView] = useState<ReadyView | null>(null);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [failedMessage, setFailedMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [saveWarning, setSaveWarning] = useState("");
  const [query, setQuery] = useState("");
  const tokenRef = useRef(0);
  const initialGradeRef = useRef(initialGrade);
  const initialLevelRef = useRef(initialLevel);

  useEffect(() => {
    let isMounted = true;
    void (async () => {
      try {
        const result = await loadCurriculumView();
        if (!isMounted) return;
        if (result.status !== "ready") {
          setFailedMessage(failureMessage(result.status));
          setLoadStatus("failed");
          return;
        }

        let next = result;
        const wantsLevel = !!initialLevelRef.current && initialLevelRef.current !== next.selection.educationLevel;
        const wantsGrade = !!initialGradeRef.current && initialGradeRef.current !== next.selection.grade;
        if (!next.hasSavedSelection && (wantsLevel || wantsGrade)) {
          const applied = await setCurriculumSelection({
            educationLevel: wantsLevel ? (initialLevelRef.current as string) : next.selection.educationLevel,
            grade: (initialGradeRef.current as string) ?? next.selection.grade,
            stream: next.selection.stream,
          });
          if (!isMounted) return;
          if (applied.status === "ready") next = applied;
        }

        setView(next);
        setLoadStatus("ready");
      } catch {
        if (!isMounted) return;
        setFailedMessage(failureMessage("database-error"));
        setLoadStatus("failed");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  async function changeSelection(next: { educationLevel?: string; grade?: string; stream?: string | null }) {
    if (!view || updating) return;
    const token = ++tokenRef.current;
    setUpdating(true);
    setSaveWarning("");
    try {
      const base = view.selection;
      const result = await setCurriculumSelection({
        educationLevel: next.educationLevel ?? base.educationLevel,
        grade: next.grade ?? base.grade,
        stream: next.stream !== undefined ? next.stream : base.stream,
      });
      if (token !== tokenRef.current) return; // a newer selection won
      if (result.status === "ready") {
        setView(result);
        setQuery("");
      } else {
        setSaveWarning(failureMessage(result.status));
      }
    } catch {
      if (token === tokenRef.current) setSaveWarning("The selection change failed. Your previous selection still applies.");
    } finally {
      if (token === tokenRef.current) setUpdating(false);
    }
  }

  if (loadStatus === "loading") {
    return (
      <section className="learn-browser" id="subjects" aria-labelledby="subjects-heading">
        <div className="route-loading" role="status">Loading your subjects…</div>
      </section>
    );
  }

  if (loadStatus === "failed" || !view) {
    return (
      <section className="learn-browser" id="subjects" aria-labelledby="subjects-heading">
        <div className="empty-state" role="alert">
          <strong>Subjects could not be loaded</strong>
          <p>{failedMessage}</p>
          <button type="button" className="button button-secondary" onClick={() => window.location.reload()}>Reload page</button>
        </div>
      </section>
    );
  }

  const { selection } = view;
  const isEntrance = selection.educationLevel === "Entrance Preparation";
  const visibleSubjects = view.subjects.filter((subject) => {
    const haystack = `${subject.name} ${subject.code ?? ""} ${subject.streamName ?? ""} ${subject.compulsory ? "compulsory" : "optional"}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  function tagFor(subject: ReadyView["subjects"][number]) {
    if (subject.verification === "official") return <span className="sample-tag tag-official">OFFICIAL SYLLABUS</span>;
    if (subject.verification === "unverified") return <span className="sample-tag tag-unverified">UNVERIFIED</span>;
    return <span className="sample-tag tag-school">SCHOOL-SET SUBJECT</span>;
  }

  return (
    <section className="learn-browser" id="subjects" aria-labelledby="subjects-heading">
      <div className="learn-controls">
        {view.levels.length > 1 && (
          <div className="level-control" role="group" aria-label="Select curriculum">
            {view.levels.map((level) => (
              <button
                type="button"
                key={level}
                aria-pressed={selection.educationLevel === level}
                disabled={updating}
                className={selection.educationLevel === level ? "grade-button active" : "grade-button"}
                onClick={() => void changeSelection({ educationLevel: level })}
              >
                {levelLabel(level)}
              </button>
            ))}
          </div>
        )}

        <div className="grade-control" role="group" aria-label="Select grade or entrance track">
          {view.grades.map((grade) => (
            <button
              type="button"
              key={grade}
              aria-pressed={selection.grade === grade}
              disabled={updating}
              className={selection.grade === grade ? "grade-button active" : "grade-button"}
              onClick={() => void changeSelection({ grade })}
            >
              {gradeLabel(grade)}
            </button>
          ))}
        </div>

        {view.streams.length > 1 && (
          <div className="stream-control" role="group" aria-label={isEntrance ? "Select entrance track" : "Select stream"}>
            <span className="stream-control-label">{isEntrance ? "TRACK" : "STREAM"}</span>
            {view.streams.map((stream) => (
              <button
                type="button"
                key={stream}
                aria-pressed={selection.stream === stream}
                disabled={updating}
                className={selection.stream === stream ? "grade-button active" : "grade-button"}
                onClick={() => void changeSelection({ stream })}
              >
                {streamLabel(stream)}
              </button>
            ))}
          </div>
        )}

        <label className="subject-search">
          <span aria-hidden="true"><SearchIcon /></span>
          <span className="visually-hidden">Search subjects</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your subjects" />
        </label>
      </div>

      <div className="learn-results-heading">
        <div>
          <div className="section-kicker">
            {isEntrance ? `ENTRANCE TRACK · ${selection.grade}` : `SUBJECTS · GRADE ${selection.grade}${selection.stream ? ` · ${selection.stream.toUpperCase()}` : ""}`}
          </div>
          <h2 id="subjects-heading">Choose a subject</h2>
        </div>
        <span className="sample-tag">{view.subjects.length} ELIGIBLE FOR YOU</span>
      </div>

      {saveWarning && <p className="answer-feedback" role="alert">{saveWarning}</p>}

      {view.eligibility === "stream-required" ? (
        <div className="empty-state" role="status">
          <strong>Choose your stream to see optional subjects</strong>
          <p>
            {view.subjects.length > 0
              ? "Your compulsory subjects are shown below. Pick a stream above to add its subjects."
              : "No subjects are configured for this selection yet."}
          </p>
        </div>
      ) : view.eligibility === "no-subjects" || view.subjects.length === 0 ? (
        <div className="empty-state" role="status">
          <strong>No subjects are configured for this selection</strong>
          <p>Try another grade or stream. Nothing outside your selection is ever shown here.</p>
        </div>
      ) : visibleSubjects.length > 0 ? (
        <div className="subject-grid">
          {visibleSubjects.map((subject, index) => (
            <article className="subject-card" key={subject.id}>
              <div className={`lesson-mark ${TINTS[index % TINTS.length]}`} aria-hidden="true">{subject.name.slice(0, 1).toUpperCase()}</div>
              <div className="subject-card-copy">
                <span className="lesson-subject">
                  {gradeLabel(subject.gradeName)}
                  {subject.streamName ? ` · ${streamLabel(subject.streamName)}` : ""}
                  {subject.compulsory ? " · COMPULSORY" : ""}
                </span>
                <h3>{subject.name}</h3>
                <p className="subject-card-meta">
                  {subject.code ?? "Code not assigned"}
                  {subject.marks ? ` · ${subject.marks} marks` : ""}
                  {!subject.marks && subject.optional ? " · optional" : ""}
                </p>
              </div>
              <div className="subject-card-tags">{tagFor(subject)}</div>
              <div className="subject-card-actions">
                <Link href="/practice">Practice questions <span aria-hidden="true">→</span></Link>
                <Link href="/tutor">Ask the tutor <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching subjects</strong>
          <p>Your selection has {view.subjects.length} {view.subjects.length === 1 ? "subject" : "subjects"}; none match the search.</p>
          <button type="button" className="button button-secondary" onClick={() => setQuery("")}>Clear search</button>
        </div>
      )}

      <p className="curriculum-note">
        <span aria-hidden="true">i</span>{" "}
        {isEntrance
          ? "Entrance subject lists and marks follow the official IOE entrance syllabus (2083, updated July 2026) and the MEC common entrance syllabus (revised 2026). These are distinct from the NEB school curriculum."
          : "Nepali and English are compulsory for both grades per the CDC Grade 11–12 curriculum (2077 compulsory volume). Science and Management stream groupings reflect common school practice, not a CDC-defined division; official subject codes are shown where the CDC catalogue verifies them."}
      </p>

      <LessonLibrary selection={selection} />
    </section>
  );
}
