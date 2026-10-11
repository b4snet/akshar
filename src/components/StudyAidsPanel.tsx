"use client";

import { useEffect, useRef, useState } from "react";
import {
  generateLessonFlashcards,
  generateLessonSummary,
  generatePracticeQuestions,
  loadStudyAids,
  type StudyAidsSnapshot,
} from "@/app/actions/studyAids";

// Study aids panel for a single stored lesson.
// - Saved results load first and are always reviewable without any AI call.
// - Generation is explicit, bounded, and guarded against double clicks.
// - Failures never discard saved material: the error appears with a retry.
// - Every generated item is labelled as an unreviewed AI study aid with its
//   provider/model provenance, distinct from published curriculum.

type Tab = "flashcards" | "summary" | "practice";

const CARD_OPTIONS = [5, 10, 15, 20];
const QUESTION_OPTIONS = [3, 5, 10];

type ProvenanceProps = { provider: string; model: string; generatedAt?: string };

function Provenance({ provider, model, generatedAt }: ProvenanceProps) {
  const when = generatedAt ? new Date(generatedAt) : null;
  return (
    <p className="ai-provenance">
      AI-generated study aid · {provider}/{model}
      {when && !Number.isNaN(when.getTime()) ? ` · saved ${when.toLocaleDateString()}` : ""} · not reviewed against the official syllabus.
    </p>
  );
}

export default function StudyAidsPanel({ lessonId }: { lessonId: string }) {
  const [tab, setTab] = useState<Tab>("flashcards");
  const [snapshot, setSnapshot] = useState<StudyAidsSnapshot | null>(null);
  const [loadStatus, setLoadStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [loadMessage, setLoadMessage] = useState("");
  const [pending, setPending] = useState<Tab | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Tab, string>>>({});
  const [cardCount, setCardCount] = useState(10);
  const [questionCount, setQuestionCount] = useState(5);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [answerPicks, setAnswerPicks] = useState<Record<number, number>>({});
  const busyRef = useRef(false);

  async function loadSaved() {
    try {
      const result = await loadStudyAids(lessonId);
      if (result.status === "ready") {
        setSnapshot(result);
        setLoadStatus("ready");
      } else {
        setLoadMessage(result.message ?? "Saved study aids could not be loaded.");
        setLoadStatus("failed");
      }
    } catch {
      setLoadMessage("The request failed. Check your connection and try again.");
      setLoadStatus("failed");
    }
  }

  useEffect(() => {
    let isMounted = true;
    void loadStudyAids(lessonId)
      .then((result) => {
        if (!isMounted) return;
        if (result.status === "ready") {
          setSnapshot(result);
          setLoadStatus("ready");
        } else {
          setLoadMessage(result.message ?? "Saved study aids could not be loaded.");
          setLoadStatus("failed");
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setLoadMessage("The request failed. Check your connection and try again.");
        setLoadStatus("failed");
      });
    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  async function generate(kind: Tab) {
    if (busyRef.current) return; // duplicate-click guard
    busyRef.current = true;
    setPending(kind);
    setErrors((previous) => ({ ...previous, [kind]: undefined }));
    try {
      const result =
        kind === "flashcards"
          ? await generateLessonFlashcards(lessonId, cardCount)
          : kind === "summary"
            ? await generateLessonSummary(lessonId)
            : await generatePracticeQuestions(lessonId, questionCount);

      if (result.status === "ready") {
        setRevealed({});
        setAnswerPicks({});
        setSnapshot((previous) => {
          const base = previous ?? { status: "ready" as const, flashcards: null, summary: null, practiceQuestions: null };
          if (kind === "flashcards" && "cards" in result) {
            return { ...base, flashcards: { cards: result.cards, provider: result.provider, model: result.model, generatedAt: result.generatedAt } };
          }
          if (kind === "summary" && "summary" in result && "keyPoints" in result) {
            return { ...base, summary: { summary: result.summary, keyPoints: result.keyPoints, provider: result.provider, model: result.model, generatedAt: result.generatedAt } };
          }
          if (kind === "practice" && "questions" in result) {
            return { ...base, practiceQuestions: { questions: result.questions, provider: result.provider, model: result.model, generatedAt: result.generatedAt } };
          }
          return base;
        });
      } else {
        setErrors((previous) => ({ ...previous, [kind]: result.message ?? "Generation failed. Your saved study aids are unchanged." }));
      }
    } catch {
      setErrors((previous) => ({ ...previous, [kind]: "The request failed. Nothing was lost — your saved study aids are unchanged." }));
    } finally {
      busyRef.current = false;
      setPending(null);
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "flashcards", label: "Flashcards" },
    { id: "summary", label: "Summary" },
    { id: "practice", label: "Practice questions" },
  ];

  const deck = snapshot?.flashcards ?? null;
  const summary = snapshot?.summary ?? null;
  const practice = snapshot?.practiceQuestions ?? null;
  const activeError = errors[tab];
  const busy = pending !== null;

  return (
    <section className="study-aids" aria-labelledby="study-aids-heading">
      <div className="study-aids-top">
        <div>
          <div className="section-kicker">STUDY AIDS</div>
          <h2 id="study-aids-heading">Study this lesson</h2>
        </div>
        <span className="sample-tag ai-tag">AI-GENERATED · NOT CURRICULUM</span>
      </div>

      <div className="study-aids-tabs" role="tablist" aria-label="Study aid type">
        {tabs.map((item) => (
          <button
            type="button"
            key={item.id}
            role="tab"
            id={`study-tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`study-panel-${item.id}`}
            className={tab === item.id ? "study-tab active" : "study-tab"}
            onClick={() => setTab(item.id)}
          >
            {item.label}
            {item.id === "flashcards" && deck ? <span className="study-tab-count">{deck.cards.length}</span> : null}
            {item.id === "summary" && summary ? <span className="study-tab-count">1</span> : null}
            {item.id === "practice" && practice ? <span className="study-tab-count">{practice.questions.length}</span> : null}
          </button>
        ))}
      </div>

      {loadStatus === "loading" && <p className="study-aids-state" role="status">Loading your saved study aids…</p>}
      {loadStatus === "failed" && (
        <div className="study-aids-state error" role="alert">
          <strong>Saved study aids could not be loaded.</strong>
          <p>{loadMessage}</p>
          <button type="button" className="button button-secondary" onClick={() => { setLoadStatus("loading"); void loadSaved(); }}>Try again</button>
        </div>
      )}

      {loadStatus === "ready" && snapshot && (
        <div id={`study-panel-${tab}`} role="tabpanel" aria-labelledby={`study-tab-${tab}`} className="study-aids-body">
          {activeError && (
            <p className="answer-feedback" role="alert">
              {activeError} <span className="answer-feedback-hint">Try again when you are ready — nothing was overwritten.</span>
            </p>
          )}

          {tab === "flashcards" && (
            <div className="study-aid-panel">
              <div className="study-aid-controls">
                <label className="study-aid-select">
                  <span>Cards</span>
                  <select value={cardCount} disabled={busy} onChange={(event) => setCardCount(Number(event.target.value))}>
                    {CARD_OPTIONS.map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </label>
                <button type="button" className="button button-primary" disabled={busy} onClick={() => void generate("flashcards")}>
                  {pending === "flashcards" ? "Generating…" : deck ? "Regenerate deck" : "Generate flashcards"}
                </button>
                {deck && <span className="study-aid-status">{deck.cards.length} cards saved · review any time without AI</span>}
              </div>

              {deck ? (
                <>
                  <Provenance provider={deck.provider} model={deck.model} generatedAt={deck.generatedAt} />
                  <div className="flashcard-grid">
                    {deck.cards.map((card, index) => {
                      const isRevealed = !!revealed[index];
                      return (
                        <button
                          type="button"
                          key={`${card.question}-${index}`}
                          className={isRevealed ? "flashcard revealed" : "flashcard"}
                          onClick={() => setRevealed((previous) => ({ ...previous, [index]: !previous[index] }))}
                          aria-label={isRevealed ? `Card ${index + 1} answer: ${card.answer}. Activate to show the question.` : `Card ${index + 1} question: ${card.question}. Activate to reveal the answer.`}
                        >
                          <span className="flashcard-label">{isRevealed ? `CARD ${index + 1} · ANSWER` : `CARD ${index + 1} · QUESTION`}</span>
                          <span className="flashcard-text">{isRevealed ? card.answer : card.question}</span>
                          <span className="flashcard-hint">{isRevealed ? "Tap to see the question" : "Tap to reveal the answer"}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <strong>No saved flashcards yet</strong>
                  <p>Generate a deck from this lesson&apos;s content. The saved deck stays here for review even if AI is offline later.</p>
                </div>
              )}
            </div>
          )}

          {tab === "summary" && (
            <div className="study-aid-panel">
              <div className="study-aid-controls">
                <button type="button" className="button button-primary" disabled={busy} onClick={() => void generate("summary")}>
                  {pending === "summary" ? "Generating…" : summary ? "Regenerate summary" : "Generate summary"}
                </button>
                {summary && <span className="study-aid-status">Saved · the original lesson above stays fully readable</span>}
              </div>

              {summary ? (
                <>
                  <Provenance provider={summary.provider} model={summary.model} generatedAt={summary.generatedAt} />
                  <div className="study-summary">
                    <p className="study-summary-text">{summary.summary}</p>
                    {summary.keyPoints.length > 0 && (
                      <div className="study-key-points">
                        <span className="section-kicker">KEY POINTS</span>
                        <ul>
                          {summary.keyPoints.map((point, index) => (
                            <li key={`${point}-${index}`}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <strong>No saved summary yet</strong>
                  <p>Generate a short revision summary of this lesson. Your original lesson content is never replaced.</p>
                </div>
              )}
            </div>
          )}

          {tab === "practice" && (
            <div className="study-aid-panel">
              <div className="study-aid-controls">
                <label className="study-aid-select">
                  <span>Questions</span>
                  <select value={questionCount} disabled={busy} onChange={(event) => setQuestionCount(Number(event.target.value))}>
                    {QUESTION_OPTIONS.map((count) => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </select>
                </label>
                <button type="button" className="button button-primary" disabled={busy} onClick={() => void generate("practice")}>
                  {pending === "practice" ? "Generating…" : practice ? "Regenerate questions" : "Generate practice questions"}
                </button>
                {practice && <span className="study-aid-status">{practice.questions.length} questions saved</span>}
              </div>

              {practice ? (
                <>
                  <Provenance provider={practice.provider} model={practice.model} generatedAt={practice.generatedAt} />
                  <div className="study-practice-list">
                    {practice.questions.map((question, questionIndex) => {
                      const pick = answerPicks[questionIndex];
                      const answered = pick !== undefined;
                      return (
                        <fieldset className="study-practice-item" key={`${question.question}-${questionIndex}`}>
                          <legend>
                            <span className="study-practice-number">Q{questionIndex + 1}</span> {question.question}
                          </legend>
                          <div className="quiz-answer-list">
                            {question.options.map((option, optionIndex) => {
                              const isCorrect = optionIndex === question.answerIndex;
                              const isPicked = pick === optionIndex;
                              const className = !answered
                                ? "quiz-answer-option"
                                : isCorrect
                                  ? "quiz-answer-option selected correct"
                                  : isPicked
                                    ? "quiz-answer-option selected wrong"
                                    : "quiz-answer-option";
                              return (
                                <label className={className} key={`${option}-${optionIndex}`}>
                                  <input
                                    type="radio"
                                    name={`study-question-${questionIndex}`}
                                    disabled={answered}
                                    checked={isPicked}
                                    onChange={() => setAnswerPicks((previous) => ({ ...previous, [questionIndex]: optionIndex }))}
                                  />
                                  <span className="answer-letter">{String.fromCharCode(65 + optionIndex)}</span>
                                  <span>{option}</span>
                                </label>
                              );
                            })}
                          </div>
                          {answered && (
                            <p className="answer-feedback" role="status">
                              {pick === question.answerIndex ? "Correct." : "Not quite."}
                              {question.explanation ? ` ${question.explanation}` : ""}
                            </p>
                          )}
                        </fieldset>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <strong>No saved practice questions yet</strong>
                  <p>Generate questions from this lesson&apos;s content. Saved questions stay available for review without another AI request.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <p className="curriculum-note">
        <span aria-hidden="true">i</span> Study aids are generated from this lesson&apos;s stored content and are not official curriculum.
        Your lessons, notes, quizzes, and progress never depend on an AI provider.
      </p>
    </section>
  );
}
