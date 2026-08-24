# DEVELOPMENT_LOG — Akshar Permanent Engineering Record

## Purpose

This file records chronological engineering decisions and verified implementation checkpoints. It is not a place for aspirational claims.

## Entry format

```text
Date:
Phase:
Scope:
Baseline commit:
Files changed:
Database changes:
Tests:
Security/RLS evidence:
External integrations tested:
Known limitations:
Decision:
Next approved step:
```

## Initial baseline — 2026-08-24

**Status:** Documentation foundation prepared.

**Scope:** 29-document Akshar engineering contract covering product, architecture, academic model, curriculum, examination, NEB boundary, security, tenancy, RBAC, API, design, testing, migration, documents, finance, notifications, interoperability, AI, operations, DR, deployment, roadmap and status.

**Important:** No application implementation is claimed by this documentation baseline.

**Current external-source posture:** Official CDC and NEB public sources have been checked for current authority structure and public examination/curriculum references. Any deeper compliance claim requires document-level review and evidence.

## Documentation landing & architecture decision — 2026-08-24

```text
Date: 2026-08-24
Phase: 001–003 closeout; owner decisions D1–D3
Scope: Canonical documentation set established in /docs; Firebase declared out of scope.
Baseline commit: 87a5b6e0bd7abd9092f3e9bbc27d5bc1d23c043b ("Initial commit")
Files changed: /docs/{29 canonical foundation documents}; docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md;
  docs/archive/AKSHAR_FOUNDATION_ALL_IN_ONE.md (archival); docs/archive/AKSHAR_MASTER_INITIALIZATION_PROMPT_PHASE_001_003.md (archival);
  docs/audits/{AKSHAR_REPOSITORY_AUDIT, AKSHAR_FIREBASE_AUDIT, AKSHAR_DOCUMENTATION_RECONCILIATION,
  AKSHAR_PHASE_001_003_INITIALIZATION_REPORT}.md; root README.md replaced (was placeholder "# Akshar-").
Database changes: none.
Tests: none applicable (documentation-only change).
Security/RLS evidence: none applicable; no secrets introduced; secret-pattern scan over all added files clean.
External integrations tested: none.
Known limitations: branch protection on origin/main could not be enabled by this session (requires GitHub admin
  credentials); citation glyphs (31 private-use characters across 8 lines) removed from canonical documents — no
  substantive requirement altered; source basis notes retained for traceability.
Decision: D1 — Firebase project akshar-nepal is OUT OF SCOPE/DORMANT; canonical architecture remains React+TypeScript /
  Laravel modular monolith / PostgreSQL+RLS / Redis / S3-compatible storage / server-side auth / RBAC+scope / adapter
  registry. The Phase 002 Firebase audit is retained as historical evidence (docs/audits/).
  D2 — /docs inside this repository is the home of the authoritative documentation set plus the master execution plan;
  root README documents the source-of-truth hierarchy (/docs canonical > audits evidence > archive reference).
  D3 — exactly the 29 listed files are canonical; the all-in-one file remains archival only and must not become a
  competing source of truth.
Next approved step: Phase 004 — Toolchain Bootstrap (owner-approved D4), per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md.
```

## Phase 004 — Toolchain Bootstrap — 2026-08-24

```text
Date: 2026-08-24
Phase: 004 (Toolchain Bootstrap) — per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
Scope: Reproducible install/lint/typecheck/test/build/format/dev/reset/seed commands; environment
  contract example; CI foundation; secret-safe configuration handling. No feature implementation.
Baseline commit: 147b14f (documentation landing)
Files changed: root package.json, scripts/{setup,reset,run-backend,secret-scan}.mjs,
  .gitignore, .gitattributes, .editorconfig, .env.example, .github/workflows/ci.yml;
  frontend/ (Vite 8 + React 19 + TS strict + oxlint + Prettier + Vitest/jsdom + RTL smoke test);
  backend/ (composer manifest, Pint laravel preset, PHPStan L6, PHPUnit smoke tests);
  docs/{README quickstart in root README, PROJECT_STATUS.md, DEVELOPMENT_LOG.md};
  docs/audits/AKSHAR_PHASE_004_CHECKPOINT.md.
Database changes: none (no database provisioned yet — by design at this phase).
Tests: frontend Vitest 1 passed (App shell identity); backend PHPUnit 2 tests / 4 assertions OK
  (runtime contract + autoloading). Exact commands and results recorded in the checkpoint report.
Security/RLS evidence: no RLS applicable yet; secret scan clean (`npm run secrets`); .env gitignored
  with !.env.example exception; CI includes gitleaks job; no secrets committed.
External integrations tested: none (none exist).
Known limitations: Laravel application skeleton intentionally deferred to Phase 005; `seed` is an
  explicit stub until a database exists; branch protection on origin/main requires GitHub admin UI;
  local Node is v26 while CI pins v22 LTS (engines >=20 enforced).
Decision: toolchain vehicle = minimal runnable harnesses per stack; full skeletons belong to Phase 005.
Next approved step: STOP after Phase 004 checkpoint. Phase 005 requires explicit owner instruction.
```

## Logging rule

Every future implementation checkpoint must state exactly what was changed, what was tested and what remains unproven.
