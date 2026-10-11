import { describe, expect, it } from "vitest";
import { validateFlashcards, validateQuestions, validateSummary, validateTutorAnswer } from "@/lib/ai/schemas";

function cards(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    question: `Question ${index + 1}?`,
    answer: `Answer ${index + 1}.`,
  }));
}

describe("validateFlashcards", () => {
  it("accepts a well-formed deck wrapped in an object", () => {
    const result = validateFlashcards({ cards: cards(10) }, 10);
    expect(result).not.toBeNull();
    expect(result).toHaveLength(10);
  });

  it("accepts a bare array payload", () => {
    expect(validateFlashcards(cards(8), 8)).toHaveLength(8);
  });

  it("rejects an empty list", () => {
    expect(validateFlashcards({ cards: [] }, 10)).toBeNull();
    expect(validateFlashcards([], 10)).toBeNull();
  });

  it("rejects cards with a missing or empty field", () => {
    expect(validateFlashcards([{ question: "Q?", answer: "" }], 4)).toBeNull();
    expect(validateFlashcards([{ question: "   ", answer: "A" }], 4)).toBeNull();
    expect(validateFlashcards([{ question: 5, answer: "A" }], 4)).toBeNull();
  });

  it("rejects truncated output that yields too few cards", () => {
    expect(validateFlashcards(cards(2), 12)).toBeNull();
  });

  it("rejects non-object entries (never renders raw JSON)", () => {
    expect(validateFlashcards(["not an object"], 4)).toBeNull();
  });

  it("drops duplicate questions instead of repeating them", () => {
    const duplicated = [cards(6)[0], ...cards(6)];
    const result = validateFlashcards(duplicated, 6);
    expect(result).toHaveLength(6);
  });

  it("caps extremely large decks at 20 cards", () => {
    expect(validateFlashcards(cards(60), 20)).toHaveLength(20);
  });
});

describe("validateSummary", () => {
  const good = { summary: "This lesson explains the key ideas with enough detail to be useful for revision.", keyPoints: ["Point one", "Point two"] };

  it("accepts a well-formed summary", () => {
    const result = validateSummary(good);
    expect(result?.keyPoints).toEqual(["Point one", "Point two"]);
  });

  it("accepts a summary without key points", () => {
    expect(validateSummary({ summary: "A perfectly serviceable summary sentence that clears the minimum length." })).not.toBeNull();
  });

  it("rejects stub or empty summaries", () => {
    expect(validateSummary({ summary: "Too short." })).toBeNull();
    expect(validateSummary({ summary: "" })).toBeNull();
    expect(validateSummary({})).toBeNull();
    expect(validateSummary("plain string")).toBeNull();
  });

  it("rejects runaway summaries", () => {
    expect(validateSummary({ summary: "x".repeat(3000) })).toBeNull();
  });
});

describe("validateQuestions", () => {
  const question = (answerIndex = 1) => ({
    question: "Which statement describes a vector quantity?",
    options: ["Magnitude only", "Magnitude and direction", "Direction only", "No unit"],
    answerIndex,
    explanation: "Vectors have both magnitude and direction.",
  });

  it("accepts a well-formed question set", () => {
    const result = validateQuestions({ questions: [question(), question(0)] }, 5);
    expect(result).toHaveLength(2);
  });

  it("rejects an answer index outside the options list", () => {
    expect(validateQuestions({ questions: [question(4)] }, 3)).toBeNull();
    expect(validateQuestions({ questions: [question(-1)] }, 3)).toBeNull();
    expect(validateQuestions({ questions: [question(1.5)] }, 3)).toBeNull();
  });

  it("rejects questions with too few options", () => {
    expect(
      validateQuestions({ questions: [{ question: "Q?", options: ["only one"], answerIndex: 0 }] }, 3)
    ).toBeNull();
  });

  it("rejects truncated sets below the minimum", () => {
    expect(validateQuestions({ questions: [question()] }, 10)).toBeNull();
  });

  it("rejects non-string options", () => {
    expect(validateQuestions({ questions: [{ ...question(), options: ["a", 2, "c", "d"] }] }, 3)).toBeNull();
  });
});

describe("validateTutorAnswer", () => {
  it("accepts a normal answer", () => {
    expect(validateTutorAnswer({ answer: "A vector has both magnitude and direction." })).toBe("A vector has both magnitude and direction.");
  });

  it("accepts plain string payloads", () => {
    expect(validateTutorAnswer("This is a plain tutor answer string.")).toBeTruthy();
  });

  it("rejects empty or absurdly long answers", () => {
    expect(validateTutorAnswer({ answer: "" })).toBeNull();
    expect(validateTutorAnswer({ answer: "short" })).toBeNull();
    expect(validateTutorAnswer({ answer: "x".repeat(4000) })).toBeNull();
    expect(validateTutorAnswer(undefined)).toBeNull();
  });
});
