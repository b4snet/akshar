import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { generateStructured } from "@/lib/ai/service";
import { validateFlashcards, validateTutorAnswer } from "@/lib/ai/schemas";

// MANUAL LIVE TEST — real provider network calls, real credentials from
// .env.local (git-ignored; never printed). Run explicitly with:
//   npx vitest run --config vitest.live.config.ts
// The regular `npm test` suite never reaches the network.

const envPath = path.join(process.cwd(), ".env.local");
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line.trim());
  if (match && match[2] && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const lessonExcerpt = `Lesson: Vectors and scalars
Subject: Physics - Grade 11
Introduction: Physical quantities can describe an amount alone or an amount together with a direction.
Scalars describe size: A scalar has magnitude only. Time, mass, temperature, and distance are examples.
Vectors include direction: A vector has both magnitude and direction. Displacement, velocity, acceleration, and force are examples.
Key idea: A scalar has magnitude; a vector has magnitude and direction.`;

describe("live provider generation (real network)", () => {
  it("Groq generates flashcards that pass strict validation", async () => {
    expect(process.env.GROQ_API_KEY, "GROQ_API_KEY must be set in .env.local").toBeTruthy();

    const result = await generateStructured(
      {
        systemInstruction: "Return ONLY a JSON object {\"cards\":[{\"question\":\"...\",\"answer\":\"...\"}]} drawn strictly from the lesson.",
        prompt: `Create exactly 4 flashcards from this lesson:\n\n${lessonExcerpt}`,
        maxOutputTokens: 1200,
        temperature: 0.3,
        timeoutMs: 45_000,
      },
      (value) => validateFlashcards(value, 4)
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.provider).toBe("groq");
      expect(result.data.length).toBeGreaterThanOrEqual(3);
      for (const card of result.data) {
        expect(card.question.length).toBeGreaterThan(0);
        expect(card.answer.length).toBeGreaterThan(0);
      }
      console.log(`[live] groq/${result.model} -> ${result.data.length} validated cards`);
    }
  }, 60_000);

  it("Gemini provider behaves consistently (generate or fail with a classified error)", async () => {
    expect(process.env.GEMINI_API_KEY, "GEMINI_API_KEY must be set in .env.local").toBeTruthy();

    const previousPrimary = process.env.AI_PRIMARY_PROVIDER;
    const previousGroq = process.env.GROQ_API_KEY;
    process.env.AI_PRIMARY_PROVIDER = "gemini";
    // Remove the fallback so this probe measures Gemini alone.
    delete process.env.GROQ_API_KEY;
    try {
      const result = await generateStructured(
        {
          systemInstruction: "Return ONLY a JSON object {\"answer\":\"...\"}.",
          prompt: `Explain in two sentences why the sky looks blue:\n\n${lessonExcerpt}`,
          maxOutputTokens: 600,
          timeoutMs: 45_000,
        },
        (value) => validateTutorAnswer(value)
      );

      if (result.ok) {
        expect(result.provider).toBe("gemini");
        expect(result.data.length).toBeGreaterThan(10);
        console.log(`[live] gemini/${result.model} -> answer generated (${result.data.length} chars)`);
      } else {
        console.log(`[live] gemini (no fallback) -> ${result.code}`);
        // Classified application-level failure, never a crash or a leaked secret.
        const allowed = ["invalid-key", "model-unavailable", "bad-request", "provider-error", "rate-limited", "timeout", "network", "json-parse", "invalid-output", "empty-response"];
        expect(allowed).toContain(result.code);
        expect(JSON.stringify(result)).not.toContain(process.env.GEMINI_API_KEY!);
        console.log(`[live] gemini -> classified failure: ${result.code}`);
      }
    } finally {
      if (previousPrimary === undefined) delete process.env.AI_PRIMARY_PROVIDER;
      else process.env.AI_PRIMARY_PROVIDER = previousPrimary;
      if (previousGroq !== undefined) process.env.GROQ_API_KEY = previousGroq;
    }
  }, 60_000);
});
