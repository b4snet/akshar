// Lightweight payload validators for AI-generated study material.
// The project has no schema library installed, and these shapes are simple
// enough that hand-rolled strict validators keep the dependency surface at
// zero (the brief permits adding one only if needed; it is not needed).
// Every validator is strict: malformed, truncated, empty, or out-of-range
// values are rejected so invalid content never reaches the UI or the database.

export type Flashcard = { question: string; answer: string };
export type GeneratedQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};
export type LessonSummary = { summary: string; keyPoints: string[] };

const MAX_CARDS = 20;
const MAX_QUESTIONS = 15;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

// Accepts `{ cards: [...] }`, `{ flashcards: [...] }`, or a bare array.
export function validateFlashcards(value: unknown, expectedCount: number): Flashcard[] | null {
  const record = asRecord(value);
  const list = Array.isArray(value) ? value : Array.isArray(record?.cards) ? record.cards : Array.isArray(record?.flashcards) ? record.flashcards : null;
  if (!list || list.length === 0) return null;

  const cards: Flashcard[] = [];
  const seen = new Set<string>();
  for (const item of list) {
    const card = asRecord(item);
    if (!card) return null;
    const question = cleanText(card.question, 300);
    const answer = cleanText(card.answer, 700);
    if (!question || !answer) return null;
    const key = question.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    cards.push({ question, answer });
    if (cards.length >= MAX_CARDS) break;
  }

  // Reject when too few usable cards survive (e.g. truncated output): ask for
  // at least half of the requested count, minimum 3.
  const minimum = Math.max(3, Math.floor(expectedCount / 2));
  if (cards.length < minimum) return null;
  return cards;
}

// Accepts `{ summary: "...", keyPoints: [...] }` or `{ text: "..." }`.
export function validateSummary(value: unknown): LessonSummary | null {
  const record = asRecord(value);
  if (!record) return null;

  const rawSummary = typeof record.summary === "string" ? record.summary : typeof record.text === "string" ? record.text : null;
  if (!rawSummary) return null;
  const summary = rawSummary.trim();
  // Reject stubs and runaway text alike.
  if (summary.length < 40 || summary.length > 2500) return null;

  const keyPoints: string[] = [];
  if (Array.isArray(record.keyPoints)) {
    for (const point of record.keyPoints) {
      const cleaned = cleanText(point, 180);
      if (cleaned) keyPoints.push(cleaned);
      if (keyPoints.length >= 8) break;
    }
  }

  return { summary, keyPoints };
}

// Accepts `{ questions: [...] }` or a bare array. The model's answerIndex is
// validated against the actual options list — never trusted as given.
export function validateQuestions(value: unknown, expectedCount: number): GeneratedQuestion[] | null {
  const record = asRecord(value);
  const list = Array.isArray(value) ? value : Array.isArray(record?.questions) ? record.questions : null;
  if (!list || list.length === 0) return null;

  const questions: GeneratedQuestion[] = [];
  for (const item of list) {
    const entry = asRecord(item);
    if (!entry) return null;
    const question = cleanText(entry.question, 400);
    if (!question) return null;

    const rawOptions = Array.isArray(entry.options) ? entry.options : null;
    if (!rawOptions || rawOptions.length < 2 || rawOptions.length > 6) return null;
    const options: string[] = [];
    for (const option of rawOptions) {
      const cleaned = cleanText(option, 220);
      if (!cleaned) return null;
      options.push(cleaned);
    }

    const answerIndex = typeof entry.answerIndex === "number" ? entry.answerIndex : typeof entry.answer === "number" ? entry.answer : null;
    if (answerIndex === null || !Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) return null;

    const explanation = cleanText(entry.explanation, 500) ?? "";

    questions.push({ question, options, answerIndex, explanation });
    if (questions.length >= MAX_QUESTIONS) break;
  }

  const minimum = Math.max(2, Math.floor(expectedCount / 2));
  if (questions.length < minimum) return null;
  return questions;
}

// Tutor answers are plain text with a hard cap; reject empty or absurd output.
export function validateTutorAnswer(value: unknown): string | null {
  const record = asRecord(value);
  const raw = typeof value === "string" ? value : typeof record?.answer === "string" ? record.answer : typeof record?.text === "string" ? record.text : null;
  if (!raw) return null;
  const answer = raw.trim();
  if (answer.length < 10 || answer.length > 3000) return null;
  return answer;
}
