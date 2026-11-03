"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ExamAttemptDetail } from "@/app/actions/examActions";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function calculateTimeRemaining(deadline: string): number {
  const now = new Date().getTime();
  const deadlineTime = new Date(deadline).getTime();
  return Math.max(0, Math.floor((deadlineTime - now) / 1000));
}

function getTimerStatusText(seconds: number): string {
  if (seconds <= 60) return "Critical - less than one minute remaining";
  if (seconds <= 300) return "Warning - five minutes or less remaining";
  return "Time active";
}

interface ExamRunnerProps {
  attemptId: string;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  answeredCount: number;
  totalCount: number;
}

function ConfirmDialog({ isOpen, onClose, onConfirm, isSubmitting, answeredCount, totalCount }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "1.75rem",
          maxWidth: "440px",
          width: "90%",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" style={{ margin: "0 0 0.75rem", fontSize: "1.25rem", fontWeight: 600 }}>
          Submit this exam?
        </h2>
        <p id="confirm-description" style={{ margin: "0 0 1rem", color: "var(--secondary)", lineHeight: 1.6 }}>
          You have answered <strong>{answeredCount}</strong> of <strong>{totalCount}</strong> questions. Answers cannot be modified after submission.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
            disabled={isSubmitting}
            style={{ padding: "0.625rem 1.25rem" }}
          >
            Review answers
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isSubmitting}
            style={{ padding: "0.625rem 1.25rem" }}
          >
            {isSubmitting ? "Submitting…" : "Yes, submit exam"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExamRunner({ attemptId }: ExamRunnerProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<ExamAttemptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const deadlineRef = useRef<string | null>(null);
  const timerAnnouncementRef = useRef<string>("");
  const hasAutoSubmittedRef = useRef(false);

  useEffect(() => {
    async function load() {
      try {
        const { getExamAttemptDetail } = await import("@/app/actions/examActions");
        const result = await getExamAttemptDetail(attemptId);
        if (result) {
          setAttempt(result);
          setTimeRemaining(calculateTimeRemaining(result.deadline));

          // Examination recovery: Restore saved answers and flagged status from database
          const questionsList = result.questions || [];
          const restoredAnswers: Record<number, number> = {};
          const restoredFlagged = new Set<number>();

          questionsList.forEach((q, idx) => {
            const matching = (result.answers || []).find((a) => a.questionId === q.id);
            if (matching && matching.userAnswer !== null && matching.userAnswer !== undefined) {
              restoredAnswers[idx] = matching.userAnswer;
            }
            if (matching?.isFlagged) {
              restoredFlagged.add(idx);
            }
          });

          setAnswers(restoredAnswers);
          setFlaggedQuestions(restoredFlagged);
        } else {
          setError("Exam attempt not found");
        }
      } catch {
        setError("Failed to load exam attempt");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [attemptId]);

  useEffect(() => {
    if (!attempt) return;
    deadlineRef.current = attempt.deadline;
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadlineRef.current!));
    }, 1000);
    return () => clearInterval(interval);
  }, [attempt]);

  // Screen reader announcements for timer status
  useEffect(() => {
    const statusText = getTimerStatusText(timeRemaining);
    if (statusText !== timerAnnouncementRef.current) {
      timerAnnouncementRef.current = statusText;
    }
  }, [timeRemaining]);

  const questions = attempt?.questions?.length ? attempt.questions : attempt?.examConfigSnapshot?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const examConfigSnapshot = attempt?.examConfigSnapshot ?? attempt?.examConfig;

  const confirmSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const { submitExamAttempt } = await import("@/app/actions/examActions");
      const result = await submitExamAttempt(attemptId);
      if (result.status === "submitted" || result.status === "expired") {
        router.push(`/exam/attempt/${attemptId}/result`);
      } else {
        setError(result.message || "Failed to submit exam");
      }
    } catch {
      setError("Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  }, [attemptId, router]);

  // Auto-submit on exam expiration
  useEffect(() => {
    if (attempt && attempt.status === "in_progress" && timeRemaining <= 0 && !submitting && !hasAutoSubmittedRef.current) {
      hasAutoSubmittedRef.current = true;
      confirmSubmit();
    }
  }, [timeRemaining, attempt, submitting, confirmSubmit]);

  async function handleAnswer(questionId: string, answerIndex: number) {
    // 1. Update component state immediately for responsive feedback
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answerIndex }));
    setSavingStatus("Saving…");

    // 2. Persist answer to PostgreSQL
    try {
      const { saveExamAnswer } = await import("@/app/actions/examActions");
      const isFlagged = flaggedQuestions.has(currentQuestionIndex);
      const res = await saveExamAnswer(attemptId, questionId, answerIndex, isFlagged);
      if (res.saved) {
        setSavingStatus("Saved");
      } else {
        setSavingStatus("Save failed");
      }
    } catch {
      setSavingStatus("Connection error");
    }
  }

  async function toggleFlag() {
    const isCurrentlyFlagged = flaggedQuestions.has(currentQuestionIndex);
    const nextFlagged = !isCurrentlyFlagged;

    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (nextFlagged) next.add(currentQuestionIndex);
      else next.delete(currentQuestionIndex);
      return next;
    });

    if (currentQuestion) {
      try {
        const { saveExamAnswer } = await import("@/app/actions/examActions");
        const currentAns = answers[currentQuestionIndex] ?? null;
        await saveExamAnswer(attemptId, currentQuestion.id, currentAns, nextFlagged);
      } catch {
        // Best effort persistence
      }
    }
  }

  function goToQuestion(index: number) {
    setCurrentQuestionIndex(index);
    setSavingStatus(null);
  }

  function handleSubmit() {
    setShowConfirmDialog(true);
  }

  const questionNavButtons = Array.from({ length: attempt?.totalQuestions || questions.length || 0 }, (_, i) => {
    const isAnswered = answers[i] !== undefined;
    const isFlagged = flaggedQuestions.has(i);
    const isCurrent = i === currentQuestionIndex;

    let bg = "var(--background)";
    let color = "var(--foreground)";
    let border = "1px solid var(--border)";

    if (isCurrent) {
      border = "2px solid var(--primary)";
    }
    if (isAnswered) {
      bg = "var(--primary)";
      color = "#fff";
    }

    return (
      <button
        key={i}
        type="button"
        role="tab"
        aria-selected={isCurrent}
        aria-label={`Question ${i + 1}: ${isAnswered ? "Answered" : "Unanswered"}${isFlagged ? ", Flagged for review" : ""}`}
        onClick={() => goToQuestion(i)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToQuestion(i);
          }
        }}
        tabIndex={isCurrent ? 0 : -1}
        style={{
          position: "relative",
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          border,
          background: bg,
          color,
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        {i + 1}
        {isFlagged && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--warning)",
              boxShadow: "0 0 2px rgba(0,0,0,0.5)",
            }}
          />
        )}
      </button>
    );
  });

  const subjectBreakdown = examConfigSnapshot?.subjectDistribution
    ? Object.entries(examConfigSnapshot.subjectDistribution as Record<string, number>).map(([subject, count]): ReactNode => (
        <div
          key={subject}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.375rem 0.5rem",
            background: "var(--secondary-bg)",
            borderRadius: "6px",
          }}
        >
          <span style={{ fontSize: "0.8rem" }}>{subject}</span>
          <span style={{ fontWeight: 600, color: "var(--secondary)" }}>{count} questions</span>
        </div>
      ))
    : null;

  const timerStatusText = getTimerStatusText(timeRemaining);
  const isUrgent = timeRemaining <= 300;
  const isCritical = timeRemaining <= 60;

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmSubmit}
        isSubmitting={submitting}
        answeredCount={Object.keys(answers).length}
        totalCount={attempt?.totalQuestions || questions.length || 0}
      />
      <section className="exam-runner" aria-label="Exam in progress">
        {loading && <div className="route-loading" role="status">Loading exam attempt…</div>}

        {!loading && !attempt && (
          <div className="empty-state" role="alert">
            <strong>Exam not found</strong>
            <p>{error || "Could not load exam attempt"}</p>
            <Link href="/exam" className="button button-secondary" style={{ marginTop: "1rem" }}>
              Back to exams
            </Link>
          </div>
        )}

        {!loading && attempt && (attempt.status === "submitted" || attempt.status === "expired") && (
          <div className="exam-completed" style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem", textAlign: "center", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px" }}>
            <h2>{attempt.status === "submitted" ? "Exam Submitted" : "Time Expired"}</h2>
            <p style={{ color: "var(--secondary)", margin: "1rem 0" }}>
              This attempt has been finalized and evaluated.
            </p>
            <Link href={`/exam/attempt/${attemptId}/result`} className="button button-primary">
              View Results
            </Link>
          </div>
        )}

        {!loading && attempt && attempt.status !== "submitted" && attempt.status !== "expired" && (
          <>
            <header
              className="exam-header"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "var(--background)",
                borderBottom: "1px solid var(--border)",
                padding: "0.75rem 1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto", flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Link href="/exam" className="button button-ghost" style={{ padding: "0.5rem 1rem" }}>
                    ← Exit
                  </Link>
                  <div>
                    <h1 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
                      {examConfigSnapshot?.name || "Exam"}
                    </h1>
                    <p style={{ margin: "0", fontSize: "0.8rem", color: "var(--secondary)" }}>
                      Question {currentQuestionIndex + 1} of {attempt.totalQuestions || questions.length}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {savingStatus && (
                    <span role="status" style={{ fontSize: "0.8rem", color: "var(--secondary)", fontStyle: "italic" }}>
                      {savingStatus}
                    </span>
                  )}

                  {/* Accessible timer with explicit text indicator satisfying WCAG 1.4.1 */}
                  <div
                    className="exam-timer"
                    role="timer"
                    aria-live="polite"
                    aria-label={`Time remaining: ${formatTime(timeRemaining)}. ${timerStatusText}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      padding: "0.5rem 0.875rem",
                      borderRadius: "8px",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      color: isCritical ? "var(--error)" : isUrgent ? "var(--warning)" : "var(--foreground)",
                    }}
                  >
                    <span>{formatTime(timeRemaining)}</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "4px",
                        background: isCritical ? "rgba(239, 68, 68, 0.15)" : isUrgent ? "rgba(245, 158, 11, 0.15)" : "var(--secondary-bg)",
                        color: isCritical ? "var(--error)" : isUrgent ? "var(--warning)" : "var(--secondary)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {isCritical ? "Critical" : isUrgent ? "Urgent" : "Active"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="button button-primary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : "Finish"}
                  </button>
                </div>
              </div>
            </header>

            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem" }}>
              {examConfigSnapshot && (
                <div style={{ marginBottom: "1.5rem", padding: "0.75rem 1rem", background: "var(--secondary-bg)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "0.85rem" }}>
                  <strong>Exam:</strong> {examConfigSnapshot.name} | <strong>Duration:</strong> {formatDuration(examConfigSnapshot.durationMinutes)} | <strong>Marking:</strong> +{examConfigSnapshot.marksPerCorrect} correct {examConfigSnapshot.negativeMarking ? `/ ${examConfigSnapshot.marksPerIncorrect} incorrect` : ""} / 0 unanswered
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem" }}>
                <article style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.75rem" }}>
                  {currentQuestion ? (
                    <>
                      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span className="section-kicker">{currentQuestion.subject || "Question"}</span>
                          <span className="sample-tag">{currentQuestionIndex + 1}/{attempt.totalQuestions || questions.length}</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <button
                            type="button"
                            onClick={toggleFlag}
                            className={`button ${flaggedQuestions.has(currentQuestionIndex) ? "button-primary" : "button-secondary"}`}
                            style={{ padding: "0.375rem 0.75rem", fontSize: "0.8rem", gap: "0.35rem" }}
                            aria-pressed={flaggedQuestions.has(currentQuestionIndex)}
                          >
                            <span aria-hidden="true">{flaggedQuestions.has(currentQuestionIndex) ? "⚑" : "⚐"}</span>
                            <span>{flaggedQuestions.has(currentQuestionIndex) ? "Flagged for review" : "Flag for review"}</span>
                          </button>

                          <span style={{ color: answers[currentQuestionIndex] !== undefined ? "var(--success)" : "var(--secondary)", fontSize: "0.85rem", fontWeight: 500 }}>
                            {answers[currentQuestionIndex] !== undefined ? "Answered" : "Unanswered"}
                          </span>
                        </div>
                      </div>

                      <div className="exam-question" style={{ marginBottom: "1.5rem" }}>
                        <p style={{ margin: 0, fontSize: "1.125rem", lineHeight: 1.7, fontWeight: 500 }}>
                          {currentQuestion.prompt}
                        </p>
                      </div>

                      <fieldset className="exam-options" style={{ display: "grid", gap: "0.75rem", border: "none", padding: 0, margin: 0 }}>
                        <legend className="visually-hidden">Answer options for question {currentQuestionIndex + 1}</legend>
                        {currentQuestion.options.map((option: string, i: number) => {
                          const isSelected = answers[currentQuestionIndex] === i;
                          return (
                            <label
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "1rem",
                                border: "2px solid",
                                borderColor: isSelected ? "var(--primary)" : "var(--border)",
                                borderRadius: "8px",
                                background: isSelected ? "var(--secondary-bg)" : "var(--card)",
                                cursor: "pointer",
                                transition: "all .15s ease",
                              }}
                            >
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={i}
                                checked={isSelected}
                                onChange={() => handleAnswer(currentQuestion.id, i)}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  accentColor: "var(--primary)",
                                  flexShrink: 0,
                                  marginTop: "0.15rem",
                                }}
                              />
                              <div style={{ flex: 1, fontSize: "1rem", lineHeight: 1.6 }}>
                                <span style={{ display: "inline-flex", width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--border)", alignItems: "center", justifyContent: "center", fontWeight: 600, marginRight: "0.5rem", flexShrink: 0 }}>
                                  {String.fromCharCode(65 + i)}
                                </span>
                                {option}
                              </div>
                            </label>
                          );
                        })}
                      </fieldset>

                      <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", justifyContent: "space-between" }}>
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
                          disabled={currentQuestionIndex === 0}
                        >
                          ← Previous
                        </button>
                        <div style={{ flex: 1 }} />
                        <button
                          type="button"
                          className="button button-primary"
                          onClick={() => goToQuestion(Math.min((attempt.totalQuestions || questions.length) - 1, currentQuestionIndex + 1))}
                          disabled={currentQuestionIndex === (attempt.totalQuestions || questions.length) - 1}
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <strong>No questions loaded</strong>
                      <p>Questions for this attempt could not be retrieved.</p>
                    </div>
                  )}
                </article>

                <aside style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600 }}>Question Navigator</h3>
                      <span style={{ fontSize: "0.75rem", color: "var(--secondary)" }}>
                        {Object.keys(answers).length} of {attempt.totalQuestions || questions.length} done
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(32px, 1fr))",
                        gap: "0.35rem",
                        maxHeight: "260px",
                        overflowY: "auto",
                        padding: "0.25rem 0",
                      }}
                      role="tablist"
                      aria-label="Questions list"
                    >
                      {questionNavButtons}
                    </div>

                    <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "var(--secondary)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "var(--primary)" }} /> Answered
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ width: "12px", height: "12px", borderRadius: "3px", border: "1px solid var(--border)", background: "var(--background)" }} /> Unanswered
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--warning)" }} /> Flagged
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem" }}>
                    <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.875rem", fontWeight: 600 }}>Subject Distribution</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {subjectBreakdown}
                    </div>
                  </div>

                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", textAlign: "center" }}>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="button button-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Submit Examination"}
                    </button>
                    <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: "var(--secondary)" }}>
                      Once submitted, scores are computed immediately.
                    </p>
                  </div>
                </aside>
              </div>
            </main>
          </>
        )}
      </section>
    </>
  );
}
