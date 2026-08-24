# Integrations

External-integration artifacts that are NOT backend code:

- Contract fixtures and sandbox payloads (NEB, SMS/email gateways, payment
  providers) used by tests and adapter development.
- Adapter implementation code lives inside the backend modular monolith at
  `backend/app/Domain/Integrations` (see `docs/INTEROPERABILITY.md`).

Every integration must document its contract, retry/idempotency behavior and
failure modes before its adapter phase begins.
