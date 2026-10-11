"use client";

import { useRef, useState, type FormEvent } from "react";
import { askTutor } from "@/app/actions/studyAids";

// Tutor UI. Questions go to the server-side AI service (never a client-side
// key). When AI is not configured, the built-in sample answers are shown with
// an explicit note — a fallback, not a fake AI claim. Provider errors surface
// their friendly message instead of silently pretending to answer.

const prompts = ["How do vectors work?", "What is a chemical bond?", "Can you explain cell division simply?"];

function getDemoResponse(question: string) {
  if (/vector/i.test(question)) return "A vector is a quantity with both size and direction. Think of walking 3 metres north: the distance is 3 metres, and north tells you the direction. Speed is a scalar; velocity is a vector.";
  if (/bond|chemical/i.test(question)) return "A chemical bond is the attraction that holds atoms together. Atoms may share electrons or transfer them, helping each reach a more stable arrangement.";
  if (/cell|division/i.test(question)) return "Cell division is how one cell makes new cells. In mitosis, the cell copies its DNA, then separates it so each new cell gets a matching set of instructions.";
  return "A useful first step is to identify the key idea in your question, then connect it to an example you already know. Try breaking it into smaller parts: what changes, what stays the same, and why?";
}

type AnswerState =
  | { source: "ai"; text: string; provider: string; model: string }
  | { source: "demo"; text: string; note: string }
  | { source: "error"; message: string };

export default function TutorDemo() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState<AnswerState | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const busyRef = useRef(false);

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedQuestion = question.trim();
    if (!cleanedQuestion || busyRef.current) return; // duplicate-click guard
    busyRef.current = true;
    setIsAsking(true);
    setSubmittedQuestion(cleanedQuestion);
    setQuestion("");
    setAnswer(null);

    try {
      const result = await askTutor(cleanedQuestion);
      if (result.status === "ready") {
        setAnswer({ source: "ai", text: result.answer, provider: result.provider, model: result.model });
      } else if (result.status === "ai-error" && result.aiCode === "not-configured") {
        setAnswer({ source: "demo", text: getDemoResponse(cleanedQuestion), note: "AI is not configured on this server yet, so this is a built-in sample answer." });
      } else if (result.status === "invalid" || result.status === "signed-out" || result.status === "rate-limited" || result.status === "ai-error") {
        setAnswer({ source: "error", message: result.message ?? "The question could not be answered. Please try again." });
      } else {
        setAnswer({ source: "error", message: "The tutor request failed. Please try again." });
      }
    } catch {
      setAnswer({ source: "error", message: "The tutor request failed. Please try again." });
    } finally {
      busyRef.current = false;
      setIsAsking(false);
    }
  }

  return (
    <section className="tutor-page-layout" aria-label="Tutor">
      <div className="tutor-page-intro">
        <div className="tutor-kicker"><span aria-hidden="true">✳</span> AI TUTOR</div>
        <h2>Big question?<br />Start somewhere.</h2>
        <p>Ask a question and get a simple starting point. Answers are generated server-side by a configured AI provider — your question never carries an API key.</p>
        <div className="provider-note">
          <strong>How answers are produced</strong>
          <span>When an AI provider is configured on the server, answers are generated from your question and labelled with the model that produced them. When it is not, a small set of built-in sample answers is used and clearly marked as such.</span>
        </div>
      </div>
      <div className="tutor-panel tutor-page-panel">
        <form className="tutor-form" onSubmit={submitQuestion}>
          <label htmlFor="tutor-question">What are you curious about?</label>
          <div className="tutor-input-row">
            <input id="tutor-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="e.g. Why does the sky look blue?" />
            <button type="submit" aria-label="Ask the tutor" disabled={!question.trim() || isAsking}>{isAsking ? "Asking…" : "Ask"} <span aria-hidden="true">↗</span></button>
          </div>
        </form>
        <div className="prompt-label">TRY A QUESTION</div>
        <div className="prompt-list">
          {prompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => setQuestion(prompt)}>{prompt}<span aria-hidden="true">↗</span></button>
          ))}
        </div>

        {isAsking && <div className="tutor-empty-answer" role="status"><strong>Thinking…</strong><span>The tutor is preparing an answer.</span></div>}

        {!isAsking && answer?.source === "ai" && (
          <div className="demo-answer tutor-answer" role="status">
            <div className="demo-answer-label">
              <span>AI TUTOR RESPONSE</span>
              <button type="button" onClick={() => { setAnswer(null); setSubmittedQuestion(""); }} aria-label="Dismiss answer">×</button>
            </div>
            <strong>{submittedQuestion}</strong>
            <p>{answer.text}</p>
            <span className="demo-answer-footnote">Generated by {answer.provider}/{answer.model} · review against your lesson before relying on it</span>
          </div>
        )}

        {!isAsking && answer?.source === "demo" && (
          <div className="demo-answer tutor-answer" role="status">
            <div className="demo-answer-label">
              <span>SAMPLE RESPONSE</span>
              <button type="button" onClick={() => { setAnswer(null); setSubmittedQuestion(""); }} aria-label="Dismiss sample response">×</button>
            </div>
            <strong>{submittedQuestion}</strong>
            <p>{answer.text}</p>
            <span className="demo-answer-footnote">{answer.note} · fixed sample content, not generated by a real AI model</span>
          </div>
        )}

        {!isAsking && answer?.source === "error" && (
          <div className="demo-answer tutor-answer" role="alert">
            <div className="demo-answer-label">
              <span>TUTOR UNAVAILABLE</span>
              <button type="button" onClick={() => { setAnswer(null); setSubmittedQuestion(""); }} aria-label="Dismiss error">×</button>
            </div>
            <strong>{submittedQuestion}</strong>
            <p>{answer.message}</p>
            <span className="demo-answer-footnote">Nothing was saved. Ask again when you are ready.</span>
          </div>
        )}

        {!isAsking && !answer && (
          <div className="tutor-empty-answer">
            <span className="empty-answer-mark" aria-hidden="true">✳</span>
            <strong>Your answer will appear here</strong>
            <span>Ask a question or choose an example prompt.</span>
          </div>
        )}
      </div>
    </section>
  );
}
