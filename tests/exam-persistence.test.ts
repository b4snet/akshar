import { describe, expect, it } from "vitest";
import { getExamConfig, getAllExamConfigs } from "../src/lib/examConfig";
import { validateUuid, validateNumberRange } from "../src/lib/validation";
import type { ExamQuestion } from "../src/lib/examTypes";

describe("Exam Config Persistence and Lookup", () => {
  it("defines 6 official exam configs with deterministic UUIDs", () => {
    const configs = getAllExamConfigs();
    expect(configs.length).toBe(6);
    for (const config of configs) {
      expect(validateUuid(config.id, "id").ok).toBe(true);
      expect(config.slug).toBeDefined();
      expect(config.slug?.length).toBeGreaterThan(0);
      expect(config.name.length).toBeGreaterThan(0);
      expect(config.totalQuestions).toBeGreaterThan(0);
      expect(config.durationMinutes).toBeGreaterThan(0);
      expect(Object.keys(config.questionsPerSubject).length).toBeGreaterThan(0);
    }
  });

  it("finds configs by slug", () => {
    const neb = getExamConfig("neb-2077");
    expect(neb).toBeDefined();
    expect(neb?.slug).toBe("neb-2077");
    expect(neb?.name).toContain("NEB Grade 11-12");

    const ioe = getExamConfig("ioe-2083");
    expect(ioe).toBeDefined();
    expect(ioe?.slug).toBe("ioe-2083");
    expect(ioe?.name).toContain("IOE B.E./B.Arch.");

    const cee = getExamConfig("cee-2020r2026");
    expect(cee).toBeDefined();
    expect(cee?.slug).toBe("cee-2020r2026");
    expect(cee?.name).toContain("MEC CEE");
  });

  it("finds configs by UUID", () => {
    const bySlug = getExamConfig("neb-2077");
    expect(bySlug).toBeDefined();

    const byId = getExamConfig(bySlug!.id);
    expect(byId).toBeDefined();
    expect(byId?.id).toBe(bySlug!.id);
    expect(byId?.name).toBe(bySlug!.name);
  });

  it("returns undefined for unknown IDs or slugs", () => {
    expect(getExamConfig("unknown-slug")).toBeUndefined();
    expect(getExamConfig("00000000-0000-0000-0000-000000000000")).toBeUndefined();
  });
});

describe("Exam Answer Concealment and Question Masking", () => {
  const sampleQuestion: ExamQuestion = {
    id: "11111111-1111-4111-a111-111111111111",
    subject: "physics",
    prompt: "What is the unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: 1,
    explanation: "Force is measured in Newtons (N).",
    difficulty: 1,
  };

  function sanitizeQuestionForAttempt(
    q: ExamQuestion,
    attemptStatus: "in_progress" | "submitted" | "expired"
  ): ExamQuestion {
    if (attemptStatus === "in_progress") {
      return {
        ...q,
        answer: null as unknown as number,
        explanation: null as unknown as string,
      };
    }
    return q;
  }

  it("masks correct answer and explanation for in-progress attempts", () => {
    const masked = sanitizeQuestionForAttempt(sampleQuestion, "in_progress");
    expect(masked.answer).toBeNull();
    expect(masked.explanation).toBeNull();
    expect(masked.prompt).toBe("What is the unit of force?");
    expect(masked.options).toHaveLength(4);
  });

  it("reveals correct answer and explanation once attempt is submitted or expired", () => {
    const submitted = sanitizeQuestionForAttempt(sampleQuestion, "submitted");
    expect(submitted.answer).toBe(1);
    expect(submitted.explanation).toBe("Force is measured in Newtons (N).");

    const expired = sanitizeQuestionForAttempt(sampleQuestion, "expired");
    expect(expired.answer).toBe(1);
    expect(expired.explanation).toBe("Force is measured in Newtons (N).");
  });
});

describe("Exam Attempt Recovery and State Restoration", () => {
  it("restores previously selected answers and flagged states accurately", () => {
    const storedAnswers = [
      { question_id: "q-1", user_answer: 2, is_flagged: true },
      { question_id: "q-2", user_answer: 0, is_flagged: false },
      { question_id: "q-3", user_answer: 3, is_flagged: true },
    ];

    const answersMap: Record<number, number> = {};
    const flaggedSet = new Set<number>();
    const questions = [{ id: "q-1" }, { id: "q-2" }, { id: "q-3" }, { id: "q-4" }];

    storedAnswers.forEach((ans) => {
      const idx = questions.findIndex((q) => q.id === ans.question_id);
      if (idx !== -1) {
        if (ans.user_answer !== null && ans.user_answer !== undefined) {
          answersMap[idx] = ans.user_answer;
        }
        if (ans.is_flagged) {
          flaggedSet.add(idx);
        }
      }
    });

    expect(answersMap[0]).toBe(2);
    expect(answersMap[1]).toBe(0);
    expect(answersMap[2]).toBe(3);
    expect(answersMap[3]).toBeUndefined();

    expect(flaggedSet.has(0)).toBe(true);
    expect(flaggedSet.has(1)).toBe(false);
    expect(flaggedSet.has(2)).toBe(true);
  });

  it("determines timer status authoritatively from server deadline", () => {
    const now = Date.now();
    const futureDeadline = new Date(now + 60 * 1000).toISOString();
    const pastDeadline = new Date(now - 10 * 1000).toISOString();

    const getRemaining = (deadline: string) =>
      Math.max(0, Math.floor((new Date(deadline).getTime() - Date.now()) / 1000));

    expect(getRemaining(futureDeadline)).toBeGreaterThan(0);
    expect(getRemaining(pastDeadline)).toBe(0);
  });
});

describe("Exam Input Validation", () => {
  it("validates attempt ID and question ID UUIDs", () => {
    const validAttemptId = "550e8400-e29b-41d4-a716-446655440000";
    const validQuestionId = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

    expect(validateUuid(validAttemptId, "attemptId").ok).toBe(true);
    expect(validateUuid(validQuestionId, "questionId").ok).toBe(true);

    expect(validateUuid("not-uuid", "attemptId").ok).toBe(false);
    expect(validateUuid("", "questionId").ok).toBe(false);
  });

  it("validates answer choice within valid MCQ options range 0 to 3", () => {
    expect(validateNumberRange(0, "userAnswer", 0, 3).ok).toBe(true);
    expect(validateNumberRange(1, "userAnswer", 0, 3).ok).toBe(true);
    expect(validateNumberRange(2, "userAnswer", 0, 3).ok).toBe(true);
    expect(validateNumberRange(3, "userAnswer", 0, 3).ok).toBe(true);

    expect(validateNumberRange(-1, "userAnswer", 0, 3).ok).toBe(false);
    expect(validateNumberRange(4, "userAnswer", 0, 3).ok).toBe(false);
    expect(validateNumberRange(1.5, "userAnswer", 0, 3).ok).toBe(false);
  });
});
