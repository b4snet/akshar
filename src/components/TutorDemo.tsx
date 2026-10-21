"use client";

import { useRef, useState, type FormEvent } from "react";
import { askTutor } from "@/app/actions/studyAids";
import { TutorIcon } from "@/components/Icon";

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

interface TutorContext {
  grade?: string;
  subject?: string;
  topic?: string;
}

const GRADE_OPTIONS = ["11", "12", "IOE", "CEE"];
const SUBJECT_OPTIONS = [
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "nepali", label: "Nepali" },
  { value: "accountancy", label: "Accountancy" },
  { value: "economics", label: "Economics" },
  { value: "business-studies", label: "Business Studies" },
];

export default function TutorDemo() {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState<AnswerState | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [context, setContext] = useState<TutorContext>({});
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
      const result = await askTutor(cleanedQuestion, Object.keys(context).length > 0 ? context : undefined);
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
        <div className="tutor-kicker"><span className="tutor-callout-mark" aria-hidden="true"><TutorIcon /></span> AI TUTOR</div>
        <h2>Big question?<br />Start somewhere.</h2>
        <p>Ask a question and get a simple starting point. Answers are generated server-side by a configured AI provider — your question never carries an API key.</p>
        <div className="provider-note">
          <strong>How answers are produced</strong>
          <span>When an AI provider is configured on the server, answers are generated from your question and labelled with the model that produced them. When it is not, a small set of built-in sample answers is used and clearly marked as such. You can also provide your current learning context (grade, subject, topic) for more relevant answers.</span>
        </div>
      </div>
      <div className="tutor-panel tutor-page-panel">
        <div className="tutor-context-selector" style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid var(--border)", borderRadius: "8px", background: "var(--secondary-bg)" }}>
          <div className="tutor-context-label" style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem", color: "var(--secondary)" }}>
            LEARNING CONTEXT (optional)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 120px", minWidth: "120px" }}>
              <label htmlFor="tutor-grade" style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--secondary)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                Grade
              </label>
              <select
                id="tutor-grade"
                value={context.grade || ""}
                onChange={(e) => setContext({ ...context, grade: e.target.value || undefined })}
                style={{
                  width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--border)", borderRadius: "6px",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                }}
              >
                <option value="">Select grade</option>
                {GRADE_OPTIONS.map((g) => <option key={g} value={g}>{g === "11" || g === "12" ? `Grade ${g}` : g}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 160px", minWidth: "160px" }}>
              <label htmlFor="tutor-subject" style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--secondary)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                Subject
              </label>
              <select
                id="tutor-subject"
                value={context.subject || ""}
                onChange={(e) => setContext({ ...context, subject: e.target.value || undefined })}
                style={{
                  width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--border)", borderRadius: "6px",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                }}
              >
                <option value="">Select subject</option>
                {SUBJECT_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
              <label htmlFor="tutor-topic" style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem", color: "var(--secondary)", textTransform: "uppercase", letterSpacing: ".05em" }}>
                Topic (optional)
              </label>
              <input
                id="tutor-topic"
                type="text"
                value={context.topic || ""}
                onChange={(e) => setContext({ ...context, topic: e.target.value || undefined })}
                placeholder="e.g. Vectors, Chemical bonds, Cell division"
                style={{
                  width: "100%", padding: "0.5rem 0.75rem", border: "1px solid var(--border)", borderRadius: "6px",
                  background: "var(--background)", color: "var(--foreground)", fontSize: "0.9rem"
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setContext({})}
              disabled={!context.grade && !context.subject && !context.topic}
              style={{
                padding: "0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "6px",
                background: "transparent", color: "var(--secondary)", fontSize: "0.8rem", cursor: "pointer"
              }}
            >
              Clear context
            </button>
          </div>
        </div>

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
            <span className="empty-answer-mark" aria-hidden="true"><TutorIcon width={22} height={22} /></span>
            <strong>Your answer will appear here</strong>
            <span>Ask a question or choose an example prompt.</span>
          </div>
        )}
      </div>
    </section>
  );
}