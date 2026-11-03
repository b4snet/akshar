import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { onboardingSchema } from "../src/lib/onboarding";
import { classifyQuizRpcError } from "../src/lib/quizRateLimit";
import { isPasswordRecoveryAuthorized, sanitizeRecoveryError } from "../src/lib/supabase/passwordRecovery";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const migrationAvailable = [
  "202610240001_exam_answer_confidentiality.sql",
  "202610240002_profile_onboarding_integrity.sql",
  "202610240003_quiz_atomic_rate_limit.sql",
].every((file) => existsSync(join(root, "supabase/migrations", file)));

describe("Phase 10 static security boundaries", () => {
  it.skipIf(!migrationAvailable)("uses the sanitized public exam question projection", () => {
    const migration = read("supabase/migrations/202610240001_exam_answer_confidentiality.sql");
    const actions = read("src/app/actions/examActions.ts");

    expect(actions).toContain('from("exam_questions_public")');
    expect(migration).toContain("create view public.exam_questions_public");
    const publicView = migration.slice(
      migration.indexOf("create view public.exam_questions_public"),
      migration.indexOf(";", migration.indexOf("create view public.exam_questions_public"))
    );
    expect(publicView).not.toMatch(/\banswer\b|\bexplanation\b|\bis_correct\b/);
  });

  it.skipIf(!migrationAvailable)("removes live exam correctness and marks from save responses", () => {
    const migration = read("supabase/migrations/202610240001_exam_answer_confidentiality.sql");
    const actions = read("src/app/actions/examActions.ts");

    expect(migration).toMatch(/return jsonb_build_object\('saved', true, 'is_flagged'/);
    expect(actions).toContain("isCorrect: false");
    expect(actions).toContain("marksAwarded: 0");
  });

  it.skipIf(!migrationAvailable)("keeps exam attempt ownership server-side", () => {
    const migration = read("supabase/migrations/202610240001_exam_answer_confidentiality.sql");
    expect(migration).toContain("where id = p_attempt_id and user_id = v_user_id");
    expect(migration).toContain("Attempt not found");
    expect(migration).toContain("revoke all privileges on public.exam_answers from public, anon, authenticated");
    expect(migration).toContain("attempt.status in ('submitted', 'expired')");
  });

  it("fails closed and classifies the production quiz RPC errors", () => {
    expect(classifyQuizRpcError("Too many quiz submissions").allowed).toBe(false);
    expect(classifyQuizRpcError("database timeout")).toMatchObject({ status: "database-error", allowed: false });
  });

  it.skipIf(!migrationAvailable)("uses fixed search paths and authenticated ownership in remediation RPCs", () => {
    const exam = read("supabase/migrations/202610240001_exam_answer_confidentiality.sql");
    const profile = read("supabase/migrations/202610240002_profile_onboarding_integrity.sql");
    const quiz = read("supabase/migrations/202610240003_quiz_atomic_rate_limit.sql");

    expect(exam.match(/set search_path = ''/g)?.length).toBeGreaterThanOrEqual(1);
    expect(profile.match(/set search_path = ''/g)?.length).toBeGreaterThanOrEqual(1);
    expect(quiz.match(/set search_path = ''/g)?.length).toBeGreaterThanOrEqual(1);
    expect(profile).toContain("v_user_id uuid := auth.uid()");
    expect(quiz).toContain("v_user_id uuid := auth.uid()");
  });

  it("validates onboarding payloads without trusting a browser identity", () => {
    const profileAction = read("src/app/actions/profile.ts");
    expect(onboardingSchema.safeParse({ grade: 13, subjects: ["Math"] }).success).toBe(false);
    expect(onboardingSchema.safeParse({ grade: 11, subjects: ["Math", "Math"] }).data?.subjects).toEqual(["Math"]);
    expect(profileAction).not.toMatch(/user_id\s*:/);
    expect(profileAction).toContain("auth-context");
  });

  it("accepts only the recovery auth event and gives a generic error", () => {
    expect(isPasswordRecoveryAuthorized("PASSWORD_RECOVERY")).toBe(true);
    expect(isPasswordRecoveryAuthorized("SIGNED_IN")).toBe(false);
    expect(sanitizeRecoveryError("sensitive internal detail")).toBe("This password reset link is invalid or has expired. Please request a new link.");

    const callback = read("src/app/auth/callback/route.ts");
    const reset = read("src/app/auth/reset-password/page.tsx");
    expect(callback).toContain("exchangeCodeForSession(code)");
    expect(reset).toContain('isPasswordRecoveryAuthorized(event)');
  });
});
