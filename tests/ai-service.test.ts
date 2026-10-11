import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateJson, generateStructured } from "@/lib/ai/service";
import { validateFlashcards } from "@/lib/ai/schemas";

// All provider responses in this file are mocked (no network, no live keys).
// They exercise the service-layer contract: bounded retries, provider
// fallback, safe errors, and JSON repair.

const GROQ_KEY = "gsk_test_key_not_a_real_key";
const GEMINI_KEY = "AQ_test_key_not_a_real_key";

function cards(count: number) {
  return Array.from({ length: count }, (_, index) => ({ question: `Question ${index + 1}?`, answer: `Answer ${index + 1}.` }));
}

function groqOk(payload: unknown): Response {
  return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(payload) }, finish_reason: "stop" }] }), { status: 200 });
}

function geminiOk(payload: unknown): Response {
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify(payload) }] }, finishReason: "STOP" }] }), { status: 200 });
}

type FetchCall = { url: string; body: Record<string, unknown> | null; headers: Record<string, string> };

function stubFetch(handler: (url: string) => Response): FetchCall[] {
  const calls: FetchCall[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      let body: Record<string, unknown> | null = null;
      if (typeof init?.body === "string") {
        try {
          body = JSON.parse(init.body) as Record<string, unknown>;
        } catch {
          body = null;
        }
      }
      const headers: Record<string, string> = {};
      const raw = init?.headers as Record<string, string> | undefined;
      if (raw) Object.assign(headers, raw);
      calls.push({ url, body, headers });
      return handler(url);
    })
  );
  return calls;
}

const baseOptions = {
  systemInstruction: "Return ONLY a JSON object of the form {\"cards\":[]}.",
  prompt: "Make flashcards from this lesson.",
  maxOutputTokens: 1000,
};

beforeEach(() => {
  vi.stubEnv("GROQ_API_KEY", "");
  vi.stubEnv("GEMINI_API_KEY", "");
  vi.stubEnv("GROQ_MODEL", "");
  vi.stubEnv("GEMINI_MODEL", "");
  vi.stubEnv("AI_PRIMARY_PROVIDER", "");
  vi.stubEnv("AI_FALLBACK_ENABLED", "");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("provider configuration", () => {
  it("reports not-configured without contacting any provider when no keys exist", async () => {
    const calls = stubFetch(() => new Response("{}", { status: 200 }));
    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("not-configured");
    expect(calls).toHaveLength(0);
  });
});

describe("primary provider generation (mocked)", () => {
  it("returns validated flashcards from Groq JSON mode", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    const calls = stubFetch(() => groqOk({ cards: cards(6) }));

    const result = await generateStructured(baseOptions, (value) => validateFlashcards(value, 6));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.provider).toBe("groq");
      expect(result.data).toHaveLength(6);
    }

    // OpenAI-compatible request shape with structured output enabled.
    expect(calls[0].url).toContain("api.groq.com/openai/v1/chat/completions");
    expect(calls[0].body?.response_format).toEqual({ type: "json_object" });
    expect((calls[0].headers as Record<string, string>).Authorization).toBe(`Bearer ${GROQ_KEY}`);
  });

  it("sends Gemini requests to the native generateContent endpoint with the key header", async () => {
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    vi.stubEnv("AI_PRIMARY_PROVIDER", "gemini");
    const calls = stubFetch(() => geminiOk({ answer: "A vector has magnitude and direction." }));

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.provider).toBe("gemini");

    expect(calls[0].url).toContain("generativelanguage.googleapis.com/v1beta/models/");
    expect(calls[0].url).toContain(":generateContent");
    expect((calls[0].headers as Record<string, string>)["x-goog-api-key"]).toBe(GEMINI_KEY);
    expect(calls[0].headers.Authorization).toBeUndefined();
  });
});

describe("fallback and retries (mocked)", () => {
  it("falls back to Gemini after bounded Groq rate-limit retries", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    const calls = stubFetch((url) =>
      url.includes("groq") ? new Response("rate limited", { status: 429 }) : geminiOk({ cards: cards(5) })
    );

    const result = await generateStructured(baseOptions, (value) => validateFlashcards(value, 5));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.provider).toBe("gemini");
      expect(result.reusedFallback).toBe(true);
    }

    const groqCalls = calls.filter((call) => call.url.includes("groq")).length;
    const geminiCalls = calls.filter((call) => call.url.includes("googleapis")).length;
    expect(groqCalls).toBe(2); // one bounded retry, no infinite loop
    expect(geminiCalls).toBe(1);
  });

  it("does not retry invalid credentials; it fails over instead", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    const calls = stubFetch((url) => (url.includes("groq") ? new Response("invalid", { status: 401 }) : geminiOk({ cards: cards(5) })));

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(true);
    expect(calls.filter((call) => call.url.includes("groq"))).toHaveLength(1);
  });

  it("surfaces a friendly rate-limit error when every provider is limited — without crashing or leaking keys", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    stubFetch(() => new Response("rate limited", { status: 429 }));

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("rate-limited");
      expect(result.message.toLowerCase()).toContain("rate limit");
      expect(result.message).not.toContain(GROQ_KEY);
      expect(result.message).not.toContain(GEMINI_KEY);
    }
  });

  it("prefers the primary provider's failure over a denied fallback", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    stubFetch((url) =>
      url.includes("groq") ? new Response("rate limited", { status: 429 }) : new Response("project denied", { status: 403 })
    );

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("rate-limited"); // not the fallback's invalid-key
  });

  it("returns a provider-error result when every provider is offline (network failure)", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubEnv("GEMINI_API_KEY", GEMINI_KEY);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("fetch failed");
      })
    );

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe("network");
      expect(result.message.length).toBeGreaterThan(10);
    }
  });

  it("times out a stalled provider instead of hanging", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_input: RequestInfo | URL, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
          })
      )
    );

    const result = await generateJson({ ...baseOptions, timeoutMs: 40 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("timeout");
  }, 15_000);
});

describe("invalid JSON handling (mocked)", () => {
  it("repairs unparseable output with one bounded re-ask", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    let call = 0;
    const calls = stubFetch(() => {
      call += 1;
      return call === 1
        ? new Response(JSON.stringify({ choices: [{ message: { content: "I cannot produce JSON right now." }, finish_reason: "stop" }] }), { status: 200 })
        : groqOk({ cards: cards(4) });
    });

    const result = await generateStructured(baseOptions, (value) => validateFlashcards(value, 4));
    expect(result.ok).toBe(true);
    expect(calls).toHaveLength(2);
  });

  it("fails cleanly with json-parse when the model never returns JSON", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    const calls = stubFetch(
      () => new Response(JSON.stringify({ choices: [{ message: { content: "Sorry, no JSON here." }, finish_reason: "stop" }] }), { status: 200 })
    );

    const result = await generateJson(baseOptions);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe("json-parse");
    expect(calls).toHaveLength(2); // original + one repair attempt, then stop
  });

  it("extracts JSON wrapped in markdown fences", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    const fenced = `\`\`\`json\n${JSON.stringify({ cards: cards(4) })}\n\`\`\``;
    stubFetch(
      () =>
        new Response(
          JSON.stringify({ choices: [{ message: { content: fenced }, finish_reason: "stop" }] }),
          { status: 200 }
        )
    );

    const result = await generateStructured(baseOptions, (value) => validateFlashcards(value, 4));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toHaveLength(4);
  });
});

describe("input bounds", () => {
  it("truncates oversized prompts before sending", async () => {
    vi.stubEnv("GROQ_API_KEY", GROQ_KEY);
    const calls = stubFetch(() => groqOk({ cards: cards(4) }));

    await generateJson({ ...baseOptions, prompt: "x".repeat(50_000) });

    const body = calls[0].body as { messages: { content: string }[] };
    const userContent = body.messages[body.messages.length - 1].content;
    expect(userContent.length).toBeLessThanOrEqual(12_100);
    expect(userContent).toContain("truncated");
  });
});
