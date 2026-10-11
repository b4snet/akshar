import "server-only";
import type { ProviderConfig } from "./env";

// Provider transport layer. Each provider exposes the same contract:
//   generateText(config, request) -> { text, finishReason }
// Failures are classified into a small set of AiErrorCode values so the
// service layer can decide whether to retry, fall back, or surface an error.

export type AiErrorCode =
  | "missing-key"
  | "invalid-key"
  | "rate-limited"
  | "model-unavailable"
  | "timeout"
  | "network"
  | "bad-request"
  | "provider-error"
  | "empty-response";

export class AiError extends Error {
  readonly code: AiErrorCode;
  readonly retryable: boolean;
  readonly provider: string;

  constructor(code: AiErrorCode, provider: string, message: string, retryable: boolean) {
    super(message);
    this.name = "AiError";
    this.code = code;
    this.provider = provider;
    this.retryable = retryable;
  }
}

export type GenerateRequest = {
  systemInstruction?: string;
  prompt: string;
  maxOutputTokens: number;
  temperature?: number;
  timeoutMs?: number;
};

export type GenerateResult = {
  text: string;
  finishReason: string | null;
  model: string;
};

const DEFAULT_TIMEOUT_MS = 30_000;

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (controller.signal.aborted) {
      throw new AiError("timeout", url, `Request timed out after ${timeoutMs}ms`, true);
    }
    throw new AiError("network", url, error instanceof Error ? error.message : "Network request failed", true);
  } finally {
    clearTimeout(timer);
  }
}

function classifyHttpError(provider: string, status: number, body: string): AiError {
  const snippet = body.slice(0, 300);
  if (status === 401 || status === 403) {
    return new AiError("invalid-key", provider, `Provider rejected credentials (HTTP ${status})`, false);
  }
  if (status === 404) {
    return new AiError("model-unavailable", provider, `Model or endpoint not available (HTTP 404): ${snippet}`, false);
  }
  if (status === 429) {
    return new AiError("rate-limited", provider, `Rate limited (HTTP 429)`, true);
  }
  if (status === 400 || status === 422) {
    return new AiError("bad-request", provider, `Request rejected (HTTP ${status}): ${snippet}`, false);
  }
  if (status >= 500) {
    return new AiError("provider-error", provider, `Provider server error (HTTP ${status})`, true);
  }
  return new AiError("provider-error", provider, `Unexpected response (HTTP ${status}): ${snippet}`, false);
}

// ---------------------------------------------------------------------------
// Groq: OpenAI-compatible chat completions.
// Docs: https://console.groq.com/docs/api-reference#chat-create
// JSON mode: response_format { type: "json_object" } is supported on the
// chat-completions models available to this key.
// ---------------------------------------------------------------------------
async function generateWithGroq(config: Extract<ProviderConfig, { name: "groq" }>, request: GenerateRequest): Promise<GenerateResult> {
  const timeoutMs = request.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const messages: { role: "system" | "user"; content: string }[] = [];
  if (request.systemInstruction) messages.push({ role: "system", content: request.systemInstruction });
  messages.push({ role: "user", content: request.prompt });

  let response: Response;
  try {
    response = await fetchWithTimeout(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: request.temperature ?? 0.4,
          max_tokens: request.maxOutputTokens,
          response_format: { type: "json_object" },
        }),
      },
      timeoutMs
    );
  } catch (error) {
    if (error instanceof AiError) throw new AiError(error.code, "groq", error.message, error.retryable);
    throw new AiError("network", "groq", "Groq request failed", true);
  }

  const body = await response.text();
  if (!response.ok) throw classifyHttpError("groq", response.status, body);

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    throw new AiError("provider-error", "groq", "Groq returned a non-JSON envelope", false);
  }

  const choice = (parsed as { choices?: { message?: { content?: string }; finish_reason?: string }[] }).choices?.[0];
  const text = choice?.message?.content?.trim();
  if (!text) throw new AiError("empty-response", "groq", "Groq returned no message content", true);

  return { text, finishReason: choice?.finish_reason ?? null, model: config.model };
}

// ---------------------------------------------------------------------------
// Gemini: native generateContent API.
// Docs: https://ai.google.dev/gemini-api/docs/generate-content
// Uses the x-goog-api-key header (required for AQ-prefixed AI Studio keys;
// the OpenAI-compatible endpoint rejects them). JSON output via
// generationConfig.responseMimeType = "application/json", which the docs
// confirm is supported for structured output on the flash/pro models.
// ---------------------------------------------------------------------------
async function generateWithGemini(config: Extract<ProviderConfig, { name: "gemini" }>, request: GenerateRequest): Promise<GenerateResult> {
  const timeoutMs = request.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const body: Record<string, unknown> = {
    contents: [{ role: "user", parts: [{ text: request.prompt }] }],
    generationConfig: {
      temperature: request.temperature ?? 0.4,
      maxOutputTokens: request.maxOutputTokens,
      responseMimeType: "application/json",
    },
  };
  if (request.systemInstruction) {
    body.systemInstruction = { parts: [{ text: request.systemInstruction }] };
  }

  let response: Response;
  try {
    response = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`,
      {
        method: "POST",
        headers: { "x-goog-api-key": config.apiKey, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      timeoutMs
    );
  } catch (error) {
    if (error instanceof AiError) throw new AiError(error.code, "gemini", error.message, error.retryable);
    throw new AiError("network", "gemini", "Gemini request failed", true);
  }

  const responseText = await response.text();
  if (!response.ok) throw classifyHttpError("gemini", response.status, responseText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new AiError("provider-error", "gemini", "Gemini returned a non-JSON envelope", false);
  }

  const candidate = (parsed as { candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[] }).candidates?.[0];
  const text = candidate?.content?.parts?.map((part) => part.text ?? "").join("").trim();
  if (!text) throw new AiError("empty-response", "gemini", "Gemini returned no candidate content", true);

  return { text, finishReason: candidate?.finishReason ?? null, model: config.model };
}

export async function generateText(config: ProviderConfig, request: GenerateRequest): Promise<GenerateResult> {
  if (config.name === "groq") return generateWithGroq(config, request);
  return generateWithGemini(config, request);
}
