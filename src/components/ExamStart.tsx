"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExamConfig } from "@/lib/examConfig";

interface ExamStartProps {
  examId: string;
}

export default function ExamStart({ examId }: ExamStartProps) {
  const router = useRouter();
  const [exam, setExam] = useState<ExamConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { getExamConfigById } = await import("@/app/actions/examActions");
        const config = await getExamConfigById(examId);
        if (config) setExam(config);
      } catch {
        setError("Failed to load exam configuration");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [examId]);

  async function handleStart() {
    if (!exam) return;
    setStarting(true);
    try {
      const { startExamAttempt } = await import("@/app/actions/examActions");
      const result = await startExamAttempt(examId);
      if ("attemptId" in result && result.attemptId) {
        router.push(`/exam/attempt/${result.attemptId}`);
      } else if ("message" in result) {
        setError(result.message || "Failed to start exam");
      }
    } catch {
      setError("Failed to start exam. Please try again.");
    } finally {
      setStarting(false);
    }
  }

  if (loading) {
    return (
      <section className="exam-start" aria-labelledby="exam-start-title">
        <div className="route-loading" role="status">Loading exam…</div>
      </section>
    );
  }

  if (!exam) {
    return (
      <section className="exam-start" aria-labelledby="exam-start-title">
        <div className="empty-state" role="alert">
          <strong>Exam not found</strong>
          <p>The exam configuration could not be loaded.</p>
          <Link href="/exam" className="button button-secondary">Back to exams</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="exam-start" aria-labelledby="exam-start-title">
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2rem" }}>
          <div className="section-kicker">{exam.examType.toUpperCase()} · {exam.year}</div>
          <h1 id="exam-start-title" style={{ margin: "0.5rem 0 0.5rem", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
            {exam.name}
          </h1>
          <p style={{ marginTop: "0.75rem", color: "var(--secondary)", lineHeight: 1.6, maxWidth: "60ch" }}>
            {exam.description}
          </p>
        </header>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1.125rem", fontWeight: 600 }}>Exam Rules</h2>
          <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            <div>
              <dt style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>Duration</dt>
              <dd style={{ fontWeight: 600, fontSize: "1.125rem" }}>{exam.durationMinutes} minutes</dd>
            </div>
            <div>
              <dt style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>Questions</dt>
              <dd style={{ fontWeight: 600, fontSize: "1.125rem" }}>{exam.totalQuestions}</dd>
            </div>
            <div>
              <dt style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>Marking</dt>
              <dd style={{ fontWeight: 600 }}>
                +{exam.marksPerCorrect} correct
                {exam.negativeMarking ? ` / ${exam.marksPerIncorrect} incorrect` : ""}
              </dd>
            </div>
            <div>
              <dt style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em" }}>Type</dt>
              <dd style={{ fontWeight: 600, textTransform: "capitalize" }}>{exam.verificationStatus}</dd>
            </div>
          </dl>
        </div>

        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--secondary-bg)", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "var(--secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            <strong>Rules:</strong> {exam.negativeMarking ? `+${exam.marksPerCorrect} for correct, ${exam.marksPerIncorrect} for incorrect, 0 for unanswered.` : `+${exam.marksPerCorrect} for correct, 0 for incorrect/unanswered.`}{" "}
            <br />Timer runs on the server. You can navigate away and return before the deadline.
          </p>
        </div>

        {exam.verificationStatus !== "official" && (
          <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "var(--warning-bg)", border: "1px solid var(--warning)", borderRadius: "8px" }}>
            <p style={{ margin: 0, color: "var(--warning)", fontSize: "0.9rem" }}>
              <strong>Practice Mode:</strong> This is a practice simulation. Marking scheme and question distribution may not match the official exam exactly.
            </p>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <button
            type="button"
            onClick={handleStart}
            disabled={starting}
            className="button button-primary"
            style={{ minWidth: "200px", padding: "0.875rem 1.5rem", fontSize: "1rem" }}
          >
            {starting ? "Starting…" : "Start Exam"}
          </button>
          <Link href="/exam" className="button button-secondary" style={{ padding: "0.875rem 1.5rem", fontSize: "1rem" }}>
            Back to Exams
          </Link>
        </div>

        {error && (
          <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "var(--error-bg)", border: "1px solid var(--error)", borderRadius: "8px", color: "var(--error)" }} role="alert">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}