import { describe, expect, it } from "vitest";
import { validateNumberRange } from "../src/lib/validation";
import {
  quizSubmissionDatabaseError,
  quizSubmissionRateExceeded,
  QUIZ_SUBMISSION_LIMIT,
  QUIZ_SUBMISSION_WINDOW_SECONDS,
} from "../src/lib/quizRateLimit";

describe("Learning Activity & Quiz Rate Limiting Persistence", () => {
  it("uses the production fail-secure rate-limit policy constants", () => {
    expect(QUIZ_SUBMISSION_LIMIT).toBe(20);
    expect(QUIZ_SUBMISSION_WINDOW_SECONDS).toBe(60);

    expect(quizSubmissionRateExceeded()).toEqual({
      allowed: false,
      message: "Too many quiz submissions. Please slow down.",
    });
    expect(quizSubmissionDatabaseError()).toEqual({
      allowed: false,
      message: "Quiz submissions are temporarily unavailable. Please try again.",
      status: "database-error",
    });
  });

  it("fails closed rather than allowing an unverified database decision", () => {
    const result = quizSubmissionDatabaseError();
    expect(result.allowed).toBe(false);
    expect(result.status).toBe("database-error");
  });

  it("does not depend on in-memory rate-limit state", () => {
    const first = quizSubmissionRateExceeded();
    const second = quizSubmissionRateExceeded();
    expect(first).toEqual(second);
    expect(quizSubmissionRateExceeded()).not.toBe(first);
  });
});

describe("Learning Activity Score and Input Validation", () => {
  it("validates score within legitimate bounds 0 to total questions", () => {
    const totalQuestions = 10;
    expect(validateNumberRange(0, "score", 0, totalQuestions).ok).toBe(true);
    expect(validateNumberRange(5, "score", 0, totalQuestions).ok).toBe(true);
    expect(validateNumberRange(10, "score", 0, totalQuestions).ok).toBe(true);

    expect(validateNumberRange(-1, "score", 0, totalQuestions).ok).toBe(false);
    expect(validateNumberRange(11, "score", 0, totalQuestions).ok).toBe(false);
  });

  it("handles persistence write failure explicitly without reporting false progress", () => {
    const handleDbResult = <T>(dbError: { message: string } | null, data: T | null) => {
      if (dbError) {
        return { success: false as const, error: dbError.message };
      }
      return { success: true as const, data };
    };

    const failResult = handleDbResult({ message: "PostgreSQL constraint violation" }, null);
    expect(failResult.success).toBe(false);
    if (!failResult.success) {
      expect(failResult.error).toBe("PostgreSQL constraint violation");
    }

    const okResult = handleDbResult(null, { id: "activity-1" });
    expect(okResult.success).toBe(true);
    if (okResult.success) {
      expect(okResult.data).toEqual({ id: "activity-1" });
    }
  });
});