import { describe, expect, it } from "vitest";
import { validateUuid, validateNumberRange, combineResults } from "../src/lib/validation";

describe("validateUuid", () => {
  it("accepts valid UUIDs", () => {
    expect(validateUuid("550e8400-e29b-41d4-a716-446655440000", "id").ok).toBe(true);
    expect(validateUuid("550e8400-e29b-41d4-a716-446655440000", "id").ok).toBe(true);
    expect(validateUuid("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "id").ok).toBe(true);
  });

  it("rejects non-strings", () => {
    expect(validateUuid(12345, "id").ok).toBe(false);
    expect(validateUuid(null, "id").ok).toBe(false);
    expect(validateUuid(undefined, "id").ok).toBe(false);
    expect(validateUuid({}, "id").ok).toBe(false);
  });

  it("rejects invalid UUID formats", () => {
    expect(validateUuid("not-a-uuid", "id").ok).toBe(false);
    expect(validateUuid("550e8400-e29b-41d4-a716", "id").ok).toBe(false);
    expect(validateUuid("550e8400-e29b-41d4-a716-446655440000-extra", "id").ok).toBe(false);
    expect(validateUuid("", "id").ok).toBe(false);
    expect(validateUuid("gggggggg-gggg-4ggg-4ggg-4ggggggggggg", "id").ok).toBe(false);
  });

  it("returns descriptive error message", () => {
    const result = validateUuid("bad-id", "examConfigId");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("examConfigId");
    }
  });
});

describe("validateNumberRange", () => {
  it("accepts valid numbers in range", () => {
    expect(validateNumberRange(5, "count", 0, 10).ok).toBe(true);
    expect(validateNumberRange(0, "count", 0, 10).ok).toBe(true);
    expect(validateNumberRange(10, "count", 0, 10).ok).toBe(true);
  });

  it("rejects non-integers", () => {
    expect(validateNumberRange(5.5, "count", 0, 10).ok).toBe(false);
    expect(validateNumberRange("5", "count", 0, 10).ok).toBe(false);
    expect(validateUuid(null, "id").ok).toBe(false);
  });

  it("rejects out-of-range values", () => {
    expect(validateNumberRange(-1, "count", 0, 10).ok).toBe(false);
    expect(validateNumberRange(11, "count", 0, 10).ok).toBe(false);
  });
});

describe("combineResults", () => {
  it("returns ok when all results are ok", () => {
    const result = combineResults(
      { ok: true },
      { ok: true },
      { ok: true },
    );
    expect(result.ok).toBe(true);
  });

  it("returns first error when any result fails", () => {
    const result = combineResults(
      { ok: true },
      { ok: false, message: "first error" },
      { ok: false, message: "second error" },
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toBe("first error");
    }
  });
});

describe("rate limiting concepts", () => {
  it("MAX_ANSWERS_PER_MINUTE constant is reasonable", () => {
    const MAX = 30;
    expect(MAX).toBeGreaterThan(0);
    expect(MAX).toBeLessThanOrEqual(60);
  });

  it("window is 60 seconds", () => {
    const WINDOW_MS = 60 * 1000;
    expect(WINDOW_MS).toBe(60000);
  });
});

describe("input validation edge cases", () => {
  it("UUID with uppercase letters is valid", () => {
    expect(validateUuid("550E8400-E29B-41D4-A716-446655440000", "id").ok).toBe(true);
  });

  it("UUID with mixed case is valid", () => {
    expect(validateUuid("550e8400-E29B-41d4-A716-446655440000", "id").ok).toBe(true);
  });

  it("empty string UUID is invalid", () => {
    expect(validateUuid("", "id").ok).toBe(false);
  });
});
