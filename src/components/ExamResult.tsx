"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ExamAttemptDetail } from "@/app/actions/examActions";
import { formatTime, formatDate, formatDuration, getScoreLabel } from "@/lib/utils/formatters";

export default function ExamResult({ attemptId }: { attemptId: string }) {
  const [attempt, setAttempt] = useState<ExamAttemptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { getExamAttemptDetail } = await import("@/app/actions/examActions");
        const result = await getExamAttemptDetail(attemptId);
        if (result) {
          setAttempt(result);
          setLoading(false);
        } else {
          setError("Exam attempt not found");
          setLoading(false);
        }
      } catch {
        setError("Failed to load exam results");
        setLoading(false);
      }
    }
    load();
  }, [attemptId]);

  const percentage = attempt?.scorePercentage ?? 0;
  const scoreLabel = getScoreLabel(percentage);

  return (
    <section className="exam-result" aria-labelledby="result-title">
      {loading && (
        <div className="route-loading" role="status">Loading results…</div>
      )}

      {!loading && (error || !attempt) && (
        <div className="empty-state" role="alert">
          <strong>Results not available</strong>
          <p>{error || "Could not load exam results"}</p>
          <Link href="/exam" className="button button-secondary">Back to exams</Link>
        </div>
      )}

      {!loading && attempt && (
        <div className="exam-result-container">
          <header style={{ marginBottom: "2rem" }}>
            <div className="section-kicker">{attempt.examConfigSnapshot?.examType?.toUpperCase()} · {attempt.examConfigSnapshot?.year}</div>
            <h1 id="result-title" style={{ margin: "0.5rem 0 0.5rem", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
              {attempt.examConfigSnapshot?.name || "Exam Results"}
            </h1>
            <p style={{ marginTop: "0.75rem", color: "var(--secondary)", lineHeight: 1.6, maxWidth: "60ch" }}>
              Attempt completed on {formatDate(attempt.submittedAt || attempt.updatedAt)}
            </p>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <article style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                Score
              </div>
              <div style={{ fontSize: "3rem", fontWeight: 700, color: "var(--success)", fontFamily: "ui-monospace, SFMono-Regular, monospace", fontVariantNumeric: "tabular-nums" }}>
                {attempt.scorePercentage?.toFixed(1) || 0}%
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: 600, color: "var(--success)" }}>
                {scoreLabel}
              </div>
              <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
                {attempt.scoreValue?.toFixed(2) || 0} / {attempt.maxScore?.toFixed(2) || 0} marks
              </div>
            </article>

            <article style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                Correct / Incorrect / Unanswered
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.5rem", fontSize: "1.5rem", fontWeight: 700 }}>
                <span style={{ color: "var(--success)" }}>{attempt.correctCount}</span>
                <span style={{ color: "var(--error)" }}>{attempt.incorrectCount}</span>
                <span style={{ color: "var(--secondary)" }}>{attempt.unansweredCount}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "0.25rem", fontSize: "0.8rem", color: "var(--secondary)" }}>
                <span>Correct</span>
                <span>Incorrect</span>
                <span>Unanswered</span>
              </div>
            </article>

            <article style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--secondary)", marginBottom: "0.5rem" }}>
                Time Used
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "ui-monospace, SFMono-Regular, monospace", fontVariantNumeric: "tabular-nums" }}>
                {formatTime(attempt.timeUsedMinutes * 60)}
              </div>
              <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: "var(--secondary)" }}>
                of {formatDuration(attempt.examConfigSnapshot?.durationMinutes || 0)} total
              </div>
            </article>
          </div>

          <footer style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link href={`/exam/attempt/${attemptId}`} className="button button-secondary" style={{ padding: "0.75rem 1.5rem" }}>
              Retry Exam
            </Link>
            <Link href="/exam" className="button button-primary" style={{ padding: "0.75rem 1.5rem" }}>
              Back to Exams
            </Link>
            <Link href="/dashboard" className="button button-secondary" style={{ padding: "0.75rem 1.5rem" }}>
              Dashboard
            </Link>
          </footer>
        </div>
      )}
    </section>
  );
}