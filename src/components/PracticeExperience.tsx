"use client";

import { useState } from "react";
import Link from "next/link";
import type { PublicQuizTrack, QuizId } from "@/lib/quizTypes";
import { submitQuizAttempt } from "@/app/actions/learning";

type QuizAttemptResult = Awaited<ReturnType<typeof submitQuizAttempt>>;

export default function PracticeExperience({ tracks }: { tracks: PublicQuizTrack[] }) {
  const [activeTrack, setActiveTrack] = useState<PublicQuizTrack | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizAttemptResult | null>(null);
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function startQuiz(track: PublicQuizTrack) {
    setActiveTrack(track);
    setQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setQuizResult(null);
    setSubmissionError("");
  }

  async function goNext() {
    if (!activeTrack || answers[questionIndex] === undefined) return;
    if (questionIndex === activeTrack.questions.length - 1) {
      setIsSubmitting(true);
      setSubmissionError("");
      try {
        const result = await submitQuizAttempt(activeTrack.id as QuizId, answers);
        if (result.status === "invalid") {
          setSubmissionError("Answers could not be validated. Please review the quiz and try again.");
        } else {
          setQuizResult(result);
          setShowResult(true);
        }
      } catch {
        setSubmissionError("The quiz could not be checked. Your answers have not been saved; please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setQuestionIndex((index) => index + 1);
    }
  }

  function chooseAnotherQuiz() {
    setActiveTrack(null);
    setShowResult(false);
    setAnswers({});
    setQuestionIndex(0);
    setQuizResult(null);
    setSubmissionError("");
  }

  const currentQuestion = activeTrack?.questions[questionIndex];

  return (
    <section className="practice-experience" aria-label="Sample quizzes">
      {!activeTrack ? <>
        <div className="learn-results-heading" id="practice-options"><div><div className="section-kicker">PICK A PRACTICE SET</div><h2>Choose your path</h2></div><span className="sample-tag">SAMPLE QUESTIONS</span></div>
        <div className="practice-track-grid">
          {tracks.map((track) => <article className="practice-track-card" id={track.id} key={track.id}>
            <div className={`track-mark ${track.id === "neb" ? "lavender" : track.id === "cee" ? "peach" : "blue"}`}>{track.mark}</div>
            <span className="lesson-subject">3 SAMPLE QUESTIONS</span><h3>{track.title}</h3><p>{track.subtitle}</p>
            <button type="button" className="track-link practice-start" onClick={() => startQuiz(track)}>Start sample quiz <span aria-hidden="true">→</span></button>
          </article>)}
        </div>
        <p className="curriculum-note"><span aria-hidden="true">i</span> All questions here are sample practice questions written for this demo. They are not official NEB, CEE, or IOE past-paper questions.</p>
      </> : <div className="quiz-runner" aria-live="polite">
        <div className="quiz-runner-heading"><div><div className="section-kicker">{activeTrack.title.toUpperCase()} · SAMPLE QUIZ</div><h2>{showResult ? "Your results" : activeTrack.title}</h2></div><span className="sample-tag">NOT OFFICIAL QUESTIONS</span></div>
        {!showResult && currentQuestion && <>
          <div className="quiz-runner-progress"><span>Question {questionIndex + 1} of {activeTrack.questions.length}</span><div className="progress-track"><span style={{ width: `${((questionIndex + 1) / activeTrack.questions.length) * 100}%` }} /></div></div>
          <fieldset className="quiz-question-panel"><legend>{currentQuestion.prompt}</legend><div className="quiz-answer-list">{currentQuestion.options.map((option, index) => <label className={answers[questionIndex] === index ? "quiz-answer-option selected" : "quiz-answer-option"} key={option}><input type="radio" name={`question-${questionIndex}`} checked={answers[questionIndex] === index} onChange={() => setAnswers((previous) => ({ ...previous, [questionIndex]: index }))} /><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span></label>)}</div></fieldset>
          <div className="quiz-controls"><button type="button" className="button button-secondary" onClick={() => setQuestionIndex((index) => Math.max(0, index - 1))} disabled={questionIndex === 0 || isSubmitting}>← Previous</button><span className="quiz-answer-hint">{isSubmitting ? "Checking answers securely…" : answers[questionIndex] === undefined ? "Choose an answer to continue" : "Answer selected"}</span><button type="button" className="button button-primary" onClick={goNext} disabled={answers[questionIndex] === undefined || isSubmitting}>{isSubmitting ? "Checking…" : questionIndex === activeTrack.questions.length - 1 ? "See results" : "Next question"} <span aria-hidden="true">→</span></button></div>
          {submissionError && <p className="answer-feedback" role="alert">{submissionError}</p>}
        </>}
        {showResult && <div className="quiz-results">
          <div className="result-score"><strong>{quizResult?.status === "saved" || quizResult?.status === "database-error" || quizResult?.status === "signed-out" || quizResult?.status === "auth-error" || quizResult?.status === "unconfigured" ? quizResult.score : "–"}<span> / {quizResult?.status === "invalid" ? "–" : quizResult?.totalQuestions ?? activeTrack.questions.length}</span></strong><span>server-checked sample score</span></div>
          <div className={`quiz-save-status ${quizResult?.status === "saved" ? "success" : "warning"}`} role="status">
            {quizResult?.status === "saved" ? quizResult.activitySaved ? "Attempt and study activity saved to your account." : "Attempt saved. The activity timeline could not be updated." : quizResult?.status === "unconfigured" ? <>Score checked, not saved. <Link href="/login">Set up Supabase</Link> to enable account progress.</> : quizResult?.status === "signed-out" ? <>Score checked, not saved. <Link href="/login">Log in</Link> to save attempts to your account.</> : quizResult?.status === "database-error" ? "Score checked, but the database rejected the save. Verify the migration and RLS policies; nothing is reported as saved." : quizResult?.status === "auth-error" ? "Score checked, but the session could not be verified. No attempt was saved." : "Quiz result is not available."}
          </div>
          <p>Answers were checked against the server-side sample key. Results are not official exam scores.</p>
          <div className="quiz-controls result-controls"><button type="button" className="button button-secondary" onClick={chooseAnotherQuiz}>Choose another quiz</button><button type="button" className="button button-primary" onClick={() => startQuiz(activeTrack)}>Restart quiz <span aria-hidden="true">↻</span></button></div>
        </div>}
      </div>}
    </section>
  );
}