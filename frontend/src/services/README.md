# Platform Services

Cross-cutting browser-side infrastructure shared by all features:

- `api/` — the only place that talks HTTP. Exposes `request<T>()`, the response
  envelope types from `API_CONTRACTS.md`, and `ApiClientError`.
- `config.ts` — typed access to Vite environment variables.

Rules:

- Features import services; services never import features.
- No feature may call `fetch()` directly.
