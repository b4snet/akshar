import "server-only";
import { getAiEnv, type AiProviderName, type ProviderConfig } from "./env";
import { AiError, generateText, type AiErrorCode } from "./providers";

// Service layer: one consistent interface for all AI generation in the app.
// - validates and bounds inputs (prompt length, output token budget)
// - applies per-attempt timeout and a small bounded retry
// - falls back from the primary provider to the secondary one only when the
//   failure is retryable AND fallback is enabled (see env.ts for policy)
// - extracts JSON with a small bounded repair pass
// - returns consistent application-level results; provider internals and
//   credentials never leave this module.

export type AiFailureCode =
  | "not-configured"
  | AiErrorCode
  | "json-parse"
  | "invalid-output";

export type AiGeneration<T> =
  | { ok: true; data: T; provider: AiProviderName; model: string; reusedFallback: boolean }
  | { ok: false; code: AiFailureCode; message: string };

export type GenerationOptions = {
  systemInstruction: string;
  prompt: string;
  maxOutputTokens: number;
  temperature?: number;
  timeoutMs?: number;
  maxPromptChars?: number;
};

const MAX_PROMPT_CHARS = 12_000;
const MAX_ATTEMPTS_PER_PROVIDER = 2;
const RETRY_BACKOFF_MS = 700;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function friendlyAiFailure(code: AiFailureCode): string {
  switch (code) {
    case "not-configured":
      return "AI generation is not configured on this server yet. Everything already saved in your account stays available.";
    case "invalid-key":
      return "The AI provider rejected this server's credentials. Generation is paused until the key is fixed.";
    case "rate-limited":
      return "The AI provider is rate limiting requests right now. Please wait a minute and try again.";
    case "model-unavailable":
      return "The configured AI model is not available. Generation will work again once a valid model is configured.";
    case "timeout":
      return "The AI provider took too long to respond. Please try again.";
    case "network":
      return "The AI provider could not be reached. Check the server's network access and try again.";
    case "bad-request":
      return "The AI provider rejected the request. This is usually temporary; try again in a moment.";
    case "provider-error":
      return "The AI provider had a temporary problem. Please try again shortly.";
    case "empty-response":
      return "The AI provider returned an empty response. Please try again.";
    case "json-parse":
      return "The AI response could not be read as valid study material after a retry. Please try again.";
    case "invalid-output":
      return "The AI response did not contain valid study material and was not saved. Please try again.";
    default:
      return "AI generation is temporarily unavailable. Your saved lessons, flashcards, and progress are unaffected.";
  }
}

function boundPrompt(prompt: string, maxChars: number): string {
  if (prompt.length <= maxChars) return prompt;
  return `${prompt.slice(0, maxChars)}\n\n[Note: the source material was truncated to fit the request limit.]`;
}

// Extract the first balanced JSON object/array from text that may contain
// markdown fences or surrounding prose. Returns null when nothing parses.
function extractJsonCandidate(text: string): unknown | null {
  const stripped = text
    .replace(/^\s*```(?:json)?/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const tries: string[] = [stripped];
  const start = stripped.search(/[[{]/);
  if (start > 0) {
    const opener = stripped[start];
    const closer = opener === "{" ? "}" : "]";
    const end = stripped.lastIndexOf(closer);
    if (end > start) tries.push(stripped.slice(start, end + 1));
  }

  for (const candidate of tries) {
    try {
      return JSON.parse(candidate);
    } catch {
      // try the next candidate
    }
  }
  return null;
}

export type RawJsonResult =
  | { ok: true; value: unknown; provider: AiProviderName; model: string; reusedFallback: boolean }
  | { ok: false; code: AiFailureCode; message: string };

// Generate and parse JSON. One bounded repair pass: if the model returns
// unparseable output we re-ask once (per provider) with a stricter reminder.
export async function generateJson(options: GenerationOptions): Promise<RawJsonResult> {
  const env = getAiEnv();
  if (env.providers.length === 0) {
    return { ok: false, code: "not-configured", message: friendlyAiFailure("not-configured") };
  }

  const ordered: ProviderConfig[] = [
    ...env.providers.filter((provider) => provider.name === env.primary),
    ...(env.fallbackEnabled ? env.providers.filter((provider) => provider.name !== env.primary) : []),
  ];

  const prompt = boundPrompt(options.prompt, options.maxPromptChars ?? MAX_PROMPT_CHARS);
  let lastFailure: { code: AiFailureCode; message: string } | null = null;
  // The primary provider's reason for failing is the headline error: a denied
  // or unconfigured fallback must never mask, e.g., a Groq rate limit.
  let primaryFailure: { code: AiFailureCode; message: string } | null = null;

  for (let index = 0; index < ordered.length; index += 1) {
    const config = ordered[index];
    const isFallback = config.name !== env.primary;

    for (let attempt = 0; attempt < MAX_ATTEMPTS_PER_PROVIDER; attempt += 1) {
      try {
        const result = await generateText(config, {
          systemInstruction: attempt === 0 ? options.systemInstruction : `${options.systemInstruction}\nReturn ONLY valid JSON. No prose, no markdown fences.`,
          prompt: attempt === 0 ? prompt : `${prompt}\n\nYour previous reply could not be parsed as JSON. Reply with ONLY the JSON value.`,
          maxOutputTokens: options.maxOutputTokens,
          temperature: options.temperature,
          timeoutMs: options.timeoutMs,
        });

        const value = extractJsonCandidate(result.text);
        if (value !== null) {
          return { ok: true, value, provider: config.name, model: result.model, reusedFallback: isFallback };
        }
        lastFailure = { code: "json-parse", message: friendlyAiFailure("json-parse") };
        if (!isFallback) primaryFailure = lastFailure;
        // fall through to the repair attempt within this provider
      } catch (error) {
        const aiError = error instanceof AiError ? error : null;
        const code: AiFailureCode = aiError ? aiError.code : "network";
        lastFailure = { code, message: friendlyAiFailure(code) };
        if (!isFallback) primaryFailure = lastFailure;

        if (aiError && !aiError.retryable) break; // bad key/model: try next provider
        if (attempt + 1 < MAX_ATTEMPTS_PER_PROVIDER && aiError?.retryable) {
          await sleep(RETRY_BACKOFF_MS * (attempt + 1));
          continue;
        }
        break; // retryable but exhausted: fall through to next provider
      }
    }

    // If this was the last provider, surface the failure below.
    void isFallback;
  }

  const headline = primaryFailure ?? lastFailure;
  return { ok: false, code: headline?.code ?? "provider-error", message: headline?.message ?? friendlyAiFailure("provider-error") };
}

// Validate an application-level shape on top of generateJson. The validator
// returns null when the payload is unusable; we then map to invalid-output.
export async function generateStructured<T>(
  options: GenerationOptions,
  validate: (value: unknown) => T | null
): Promise<AiGeneration<T>> {
  const raw = await generateJson(options);
  if (!raw.ok) return { ok: false, code: raw.code, message: raw.message };

  const data = validate(raw.value);
  if (data === null) {
    return { ok: false, code: "invalid-output", message: friendlyAiFailure("invalid-output") };
  }
  return { ok: true, data, provider: raw.provider, model: raw.model, reusedFallback: raw.reusedFallback };
}
