import "server-only";

// AI provider configuration. Both keys are server-side only: this module is
// marked `server-only`, so any accidental client import fails the build.
//
// Provider identification (verified 2026-10-11):
// - GROQ_API_KEY: Groq (https://api.groq.com/openai/v1, OpenAI-compatible chat
//   completions). Verified live: /models list and a JSON-mode generation with
//   `qwen/qwen3.8-27b` both succeeded.
// - GEMINI_API_KEY: Google AI Studio / Gemini native API. Keys with the `AQ.`
//   prefix are AI Studio "authentication keys" (Google's own forum + docs
//   confirm the AIza -> AQ transition). They authenticate against
//   https://generativelanguage.googleapis.com with the `x-goog-api-key`
//   header. Known caveat: AQ keys can fail on the OpenAI-compatible endpoint
//   with "Multiple authentication credentials received", so we always use the
//   native generateContent API for Gemini.

export type AiProviderName = "groq" | "gemini";

export type ProviderConfig =
  | { name: "groq"; apiKey: string; model: string }
  | { name: "gemini"; apiKey: string; model: string };

export type AiEnv = {
  providers: ProviderConfig[];
  primary: AiProviderName;
  fallbackEnabled: boolean;
};

function readTrimmed(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

// Model defaults are only fallbacks; configure via env so a renamed or
// retired model never requires a code change.
// - Groq default verified live (2026-10-11): JSON-mode generation with
//   qwen/qwen3.8-27b succeeds.
// - Gemini default follows Google's own 404 guidance ("use models/gemini-3.8-
//   flash"). NOTE: this key's project currently returns HTTP 403 "Your project
//   has been denied access" on every generateContent call, so Gemini stays a
//   classified-failure fallback until the key/project is restored or rotated.
const DEFAULT_GROQ_MODEL = "qwen/qwen3.8-27b";
const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";

export function getAiEnv(): AiEnv {
  const groqKey = readTrimmed(process.env.GROQ_API_KEY);
  const geminiKey = readTrimmed(process.env.GEMINI_API_KEY);

  const providers: ProviderConfig[] = [];
  if (groqKey) {
    providers.push({ name: "groq", apiKey: groqKey, model: readTrimmed(process.env.GROQ_MODEL) ?? DEFAULT_GROQ_MODEL });
  }
  if (geminiKey) {
    providers.push({ name: "gemini", apiKey: geminiKey, model: readTrimmed(process.env.GEMINI_MODEL) ?? DEFAULT_GEMINI_MODEL });
  }

  // Explicit, documented usage policy: Groq is the primary provider; Gemini
  // is used only as a fallback when the primary fails in a retryable way
  // (rate limit, network, timeout, 5xx). We never switch to a provider that
  // is not configured here, and never silently change models.
  const primary: AiProviderName = process.env.AI_PRIMARY_PROVIDER === "gemini" && geminiKey ? "gemini" : "groq";
  const fallbackEnabled = process.env.AI_FALLBACK_ENABLED !== "off";

  return { providers, primary, fallbackEnabled };
}
