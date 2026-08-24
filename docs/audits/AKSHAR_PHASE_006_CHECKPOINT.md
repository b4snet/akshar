# PHASE 006 CHECKPOINT REPORT — Environment Contract

## 1. Phase number and title

Phase 006 — Environment Contract (Workstream 01: Foundation & Forensic Initialization).

Objective as scoped by the master execution plan: implement the environment
contract capability per the Akshar foundation documents (DEPLOYMENT.md §1/§8,
TESTING_STRATEGY.md, ARCHITECTURE.md), preserving existing architecture and
boundaries — environment definitions and enforcement only; no features.

## 2. Files changed

- `infrastructure/compose.dev.yaml` — local development topology: PostgreSQL 17
  (`postgres:17-alpine`) + Redis 7 (`redis:7-alpine`), bound to 127.0.0.1 only,
  healthchecks, named volume for pgdata, dev-only credentials overridable via
  `POSTGRES_*`/`REDIS_PORT` environment variables.
- `infrastructure/postgres/init/01-databases.sql` — first-init provisioning of the
  `akshar_testing` database so PHPUnit can target real PostgreSQL.
- `infrastructure/README.md` — rewritten as the single authoritative environment
  contract home: layer table (local→CI→staging→production), service topology,
  variable-contract rules, known constraints.
- `scripts/env-contract.mjs` — machine-readable contract (required/pinned/forbidden
  variables per template) + pure validator functions.
- `scripts/env-check.mjs` — CLI gate; prints variable names only, never values.
- `scripts/test/env-contract.test.mjs` — Node built-in test-runner suite: parser
  rules, missing-required reporting, value-drift reporting, forbidden-variable and
  committed-secret-pattern detection, empty `APP_KEY=` acceptance, plus live
  assertions that both real templates satisfy the contract right now.
- `.env.example` — rewritten as the annotated stack-wide reference template;
  removed stale Phase 004 text ("nothing reads them yet") and fixed DB password
  drift vs `backend/.env.example` (now aligned at dev default `secret`, matching compose).
- `package.json` — new scripts `env:check`, `test:env`, `db:up`, `db:down`,
  `db:migrate`; root `npm run test` now includes the contract suite.

## 3. Database/data-model changes

- No schema or data changes. `akshar_testing` provisioning is *defined* (init SQL)
  but was not executed on the authoring host — no Docker/psql available (verified).
- Convention made concrete: development database `akshar`, testing database
  `akshar_testing`, both PostgreSQL-only.

## 4. API changes

None. The API surface is unchanged from Phase 005.

## 5. UI changes

None.

## 6. Security/authorization impact

- Validator actively rejects committed secret material patterns
  (`APP_KEY=base64:`) and any contract-listed forbidden variables.
- `env-check.mjs` never prints values — variable names only (DEPLOYMENT §8).
- Compose services bind to loopback exclusively; credentials are documented as
  dev-only defaults that must be replaced by external configuration in
  CI/staging/production.
- No authn/authz behavior exists yet (unchanged from Phase 005); no secrets
  introduced; `npm run secrets` clean; `.env` files remain gitignored.

## 7. Tests and exact results

- `npm run env:check`: **both committed templates OK** (`.env.example`,
  `backend/.env.example`).
- `npm run test:env` (node:test): **8/8 passed**
  (parser rules · missing-required · value-drift · forbidden-variable ·
  committed-secret-pattern · APP_KEY-empty acceptance · live contract check ×2).
- Full gate re-run, all green: oxlint 0 warnings/0 errors · Pint passed ·
  `tsc -b` clean · PHPStan L6 (Larastan) 0 errors · Prettier clean · Vitest 10/10 ·
  PHPUnit 6 tests / 33 assertions OK · Vite build OK · `npm run secrets` clean ·
  `git diff --check` clean at staging.

## 8. Documentation updated

- `infrastructure/README.md` — authoritative environment contract (layers,
  topology, rules, constraints).
- Root `README.md` — quickstart now includes env:check/db workflow; points to
  the infrastructure contract.
- `docs/PROJECT_STATUS.md` — Phase 006 completion + evidence; next action Phase 007.
- `docs/DEVELOPMENT_LOG.md` — Phase 006 entry with evidence.
- This checkpoint report.

## 9. Known limitations

- Docker is unavailable on the authoring host: the compose topology is defined
  and reviewed but has not been executed locally. Execution instructions are
  provided (`npm run db:up`) and fail with a clear hint when Docker is absent.
- CI does not yet include postgres/redis service containers — Phase 007 (CI
  Baseline) owns CI wiring; current suites do not require a database.
- Object storage intentionally absent from local topology until its owning phase.
- `npm run seed` remains an explicit stub until the database phase provisions seeding.

## 10. Git branch/commit/tree state

- Branch: `main`
- Baseline commit at phase start: `cfa154f`
- This phase: single focused commit pushed to origin (see git log)
- Working tree after push: clean

## 11. Status

**COMPLETE** — scoped environment contract implemented and enforced, gates green,
documentation reflects actual behavior including honest limitations, diff contains
only this phase and its required tests/docs. Stopping here per the execution
protocol; Phase 007 requires explicit owner instruction.
