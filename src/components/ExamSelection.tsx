"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExamConfig } from "@/lib/examConfig";

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function getVerificationBadge(status: "official" | "provisional" | "practice") {
  const colors = {
    official: "var(--success)",
    provisional: "var(--warning)",
    practice: "var(--secondary)",
  };
  const labels = {
    official: "OFFICIAL SYLLABUS",
    provisional: "PROVISIONAL",
    practice: "PRACTICE MODE",
  };
  return (
    <span
      className="exam-verification-badge"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.25rem 0.625rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: ".05em",
        textTransform: "uppercase",
        background: colors[status],
        color: status === "official" ? "#fff" : "var(--foreground)",
      }}
    >
      {labels[status]}
    </span>
  );
}

interface ExamCardProps {
  exam: ExamConfig;
}

function ExamCard({ exam }: ExamCardProps) {
  return (
    <article
      className="exam-card"
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "1.5rem",
        background: "var(--card)",
        transition: "all .2s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <span className="section-kicker" style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--secondary)" }}>
            {exam.examType.toUpperCase()} · {exam.year}
          </span>
          <h3 style={{ margin: "0.5rem 0 0", fontSize: "1.125rem", fontWeight: 600, color: "var(--foreground)" }}>
            {exam.name}
          </h3>
        </div>
        {getVerificationBadge(exam.verificationStatus)}
      </div>

      <p style={{ margin: "0 0 1rem", color: "var(--secondary)", fontSize: "0.9rem", lineHeight: "1.6", flex: 1 }}>
        {exam.description}
      </p>

      <dl style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem 1rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
        <div>
          <dt style={{ color: "var(--secondary)", fontWeight: 500 }}>Duration</dt>
          <dd style={{ color: "var(--foreground)", fontWeight: 600 }}>{formatDuration(exam.durationMinutes)}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--secondary)", fontWeight: 500 }}>Questions</dt>
          <dd style={{ color: "var(--foreground)", fontWeight: 600 }}>{exam.totalQuestions}</dd>
        </div>
        <div>
          <dt style={{ color: "var(--secondary)", fontWeight: 500 }}>Marking</dt>
          <dd style={{ color: "var(--foreground)", fontWeight: 600 }}>
            {exam.marksPerCorrect} correct
            {exam.negativeMarking ? ` / ${exam.marksPerIncorrect} incorrect` : ""}
          </dd>
        </div>
        <div>
          <dt style={{ color: "var(--secondary)", fontWeight: 500 }}>Type</dt>
          <dd style={{ color: "var(--foreground)", fontWeight: 600, textTransform: "capitalize" }}>
            {exam.verificationStatus}
          </dd>
        </div>
      </dl>

      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
        <Link
          href={`/exam/start/${exam.id}`}
          className="button button-primary"
          style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
        >
          {exam.verificationStatus === "practice" ? "Start Practice" : "Start Exam"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function ExamSelection() {
  const [configs, setConfigs] = useState<ExamConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isMounted = true;
    async function load() {
      try {
        const { listExamConfigs } = await import("@/app/actions/examActions");
        const result = await listExamConfigs();
        if (isMounted) {
          setConfigs(result);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load exam configurations");
          setLoading(false);
        }
      }
    }
    load();
    return () => { /* cleanup */ };
  }, []);

  if (loading) {
    return (
      <section className="exam-selection" aria-labelledby="exam-selection-title">
        <div className="route-loading" role="status">Loading exam configurations…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="exam-selection" aria-labelledby="exam-selection-title">
        <div className="empty-state" role="alert">
          <strong>Could not load exams</strong>
          <p>{error}</p>
          <button type="button" className="button button-secondary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </section>
    );
  }

  const officialExams = configs.filter(e => e.verificationStatus === "official");
  const practiceExams = configs.filter(e => e.verificationStatus === "practice");

  return (
    <section className="exam-selection" aria-labelledby="exam-selection-title">
      <div className="section-heading" style={{ marginBottom: "2rem" }}>
        <div className="section-kicker">AVAILABLE EXAMS</div>
        <h2 id="exam-selection-title">Choose your exam</h2>
      </div>

      {officialExams.length > 0 && (
        <section style={{ marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)" }}>
            Official Exams
          </h3>
          <div className="exam-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {officialExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </section>
      )}

      {practiceExams.length > 0 && (
        <section>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)" }}>
            Practice Exams
          </h3>
          <div className="exam-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {practiceExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
          </div>
        </section>
      )}
    </section>
  );
}