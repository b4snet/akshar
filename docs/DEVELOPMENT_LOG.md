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

## Phase 005 — Project Skeleton — 2026-08-24

```text
Date: 2026-08-24
Phase: 005 (Project Skeleton) — per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
Scope: Canonical repository/application layout for frontend, backend/domain services, persistence,
  integrations, tests, scripts, documentation and operations. No feature implementation.
Baseline commit: 900d308 (Phase 004 toolchain bootstrap)
Files changed: backend/ (real Laravel 13.26.1 skeleton via composer create-project; merged toolchain:
  Pint preset + PHPStan L6 via nunomaduro/larastan ^3.10 + PHPUnit 12 composer scripts; modular-monolith
  scaffolding: app/Domain/README.md registry anticipating all 26 planned modules, app/Support/{README.md,
  Api/{ApiResponse,ApiException,ApiErrorMapper}.php}, app/Http/Api/V1/Controllers/HealthController.php,
  routes/api.php with v1 prefix, routes/web.php reduced to health redirect, bootstrap/app.php registering
  API routing + canonical JSON error rendering for api/*, config/cors.php env-driven, .env.example aligned
  to PostgreSQL contract + CORS_ALLOWED_ORIGINS); frontend/ (react-router ^8.3 added; src restructured into
  app/{router,AppShell,pages/HomePage,pages/NotFoundPage}, components/states/{Loading,Empty,Error}State,
  services/api/{client,envelope,errors,index}.ts typed fetch client implementing the API envelope contract,
  services/config.ts, design-system/tokens.css + README, types/env.d.ts, features/README.md convention;
  removed flat App.tsx/App.test.tsx/assets); database/ integrations/ infrastructure/ tests/ README.md each
  documenting purpose only; .github/dependabot.yml (npm+composer+actions weekly); root package.json dev:api
  script; docs/{API_CONTRACTS §12 health endpoint, TESTING_STRATEGY §13 test locations, PROJECT_STATUS,
  DEVELOPMENT_LOG, root README layout/quickstart}; docs/audits/AKSHAR_PHASE_005_CHECKPOINT.md.
Database changes: none provisioned. backend/phpunit.xml targets PostgreSQL (akshar_testing) for parity;
  Laravel default users/cache/jobs migrations retained as framework baseline untouched (identity redesign
  belongs to its phase).
Tests: frontend Vitest 10/10 passed (api client envelope/error mapping/network fallback 5, shared states 3,
  router smoke 2); backend PHPUnit 6 tests / 33 assertions OK (health endpoint success envelope + unknown-route
  NOT_FOUND envelope over HTTP; ApiErrorMapper coverage incl. ApiException passthrough, VALIDATION_ERROR field
  details, UNAUTHENTICATED/FORBIDDEN/NOT_FOUND, unmapped→null). Gates: oxlint clean; Pint passed; tsc clean;
  PHPStan L6 (Larastan) 0 errors; Prettier clean; Vite build OK; npm run secrets clean.
Security/RLS evidence: no authn/authz implemented yet (belongs to later phases); error envelopes never leak
  exception internals (mapped messages are fixed strings or ApiException-provided); CORS restricted to explicit
  origins from env (default http://localhost:5173); .env files gitignored, APP_KEY generated locally only;
  secret scan clean; dependabot enabled for dependency updates.
External integrations tested: none.
Known limitations: PostgreSQL server not yet provisioned locally or in CI (health tests do not touch the DB;
  environment contract is Phase 006); no CI postgres service until a DB-backed suite exists; E2E suites not yet
  introduced (tests/ is a documented placeholder); Laravel default web welcome view removed — web surface is a
  redirect to /api/v1/health; Larastan constraint resolved to ^3.10 by composer (Laravel 13 compatible line).
Decision: top-level dirs /database, /integrations, /infrastructure, /tests exist as purpose-documented
  boundaries rather than empty scaffolding elsewhere; business domains live ONLY in backend/app/Domain per the
  registry; frontend features are bounded slices under src/features with platform concerns centralized in
  src/services; API error codes stabilized in API_CONTRACTS §12 (BAD_REQUEST…SERVER_ERROR) matching
  app/Support/Api.
Next approved step: STOP after Phase 005 checkpoint. Phase 006 requires explicit owner instruction.
```

## Phase 006 — Environment Contract — 2026-08-24

```text
Date: 2026-08-24
Phase: 006 (Environment Contract) — per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
Scope: Canonical environment definitions for local development (services + variables), a
  machine-enforced environment variable contract, and graceful db lifecycle automation.
  No feature implementation; CI service wiring deferred to Phase 007 by scope boundary.
Baseline commit: cfa154f (status-pointer cleanup on top of Phase 005)
Files changed: infrastructure/compose.dev.yaml (PostgreSQL 17 + Redis 7, loopback ports,
  healthchecks, env-overridable dev credentials); infrastructure/postgres/init/01-databases.sql
  (first-init provisioning of akshar_testing); infrastructure/README.md rewritten as THE
  environment-contract home (layer table, topology, variable rules, constraints);
  scripts/env-contract.mjs (machine-readable contract definition + validator),
  scripts/env-check.mjs (CLI, never prints values), scripts/test/env-contract.test.mjs
  (node:test suite incl. live template assertions); root .env.example rewritten as annotated
  stack-wide reference (removed stale "nothing reads them yet" claim from Phase 004, fixed
  DB_PASSWORD drift vs backend template); package.json scripts {env:check, test:env, db:up,
  db:down, db:migrate} + root test chain now includes contract tests; docs/{README quickstart,
  PROJECT_STATUS, DEVELOPMENT_LOG}; docs/audits/AKSHAR_PHASE_006_CHECKPOINT.md.
Database changes: none executed. akshar_testing provisioning DEFINED (init SQL) but not run
  locally — no Docker/psql/Redis present on the authoring host (verified).
Tests: npm run env:check → both committed templates OK; node:test 8/8 passed (parser rules,
  missing-required reporting, value-drift reporting, forbidden-variable reporting, committed
  secret-pattern detection, empty APP_KEY acceptance, plus live assertions that both real
  templates satisfy the contract). Full gates re-run green: oxlint clean; Pint passed;
  tsc clean; PHPStan L6 (Larastan) 0 errors; Prettier clean; Vitest 10/10; PHPUnit 6 tests /
  33 assertions OK; Vite build OK; secret scan clean.
Security/RLS evidence: no secrets introduced; validator actively forbids committed
  "APP_KEY=base64:" material and any listed forbidden variables; env-check prints variable
  names only (DEPLOYMENT.md §8 honored); compose binds services to 127.0.0.1 only with
  dev-only defaults documented as non-production; secret scan clean.
External integrations tested: none.
Known limitations: Docker unavailable on authoring host → compose file validated by
  inspection/YAML review but not executed; CI has no postgres/redis service containers yet
  (Phase 007 owns CI baseline); object storage intentionally absent from local topology until
  its owning phase; `npm run seed` remains an explicit stub.
Decision: /infrastructure is the single authoritative home of the environment contract;
  templates are enforced by machine (scripts/env-contract.mjs) rather than by convention;
  backend keeps database-backed session/cache/queue drivers as safe local defaults with
  Redis available via one-line env switches once containers run.
Next approved step: STOP after Phase 006 checkpoint. Phase 007 requires explicit owner instruction.
```

## Phase 007 — CI Baseline — 2026-08-24

```text
Date: 2026-08-24
Phase: 007 (CI Baseline) — per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
Scope: Executable CI quality contract for every push/PR to main. No feature work; no
  application behavior invented.
Baseline commit: a5d2988 (Phase 006 environment contract)
Files changed: .github/workflows/ci.yml rewritten — four isolated jobs (contract,
  frontend, backend, security) with concurrency cancellation, permissions
  contents:read, per-job timeouts; contract job runs npm run env:check + test:env +
  composer validate --strict on every push/PR; backend job gains job-scoped services
  postgres:17-alpine (exact parity with infrastructure/compose.dev.yaml) and
  redis:7-alpine with healthchecks, CI-only credentials, deterministic CREATE DATABASE
  akshar_testing step mirroring the local init SQL, php artisan migrate --force against
  the disposable instance, and php artisan route:list smoke proving kernel/route boot;
  frontend and gitleaks jobs preserved from the working baseline;
  docs/{README CI paragraph, PROJECT_STATUS, DEVELOPMENT_LOG,
  audits/AKSHAR_PHASE_007_CHECKPOINT.md}; infrastructure/README.md CI layer row +
  alignment warning between compose.dev.yaml and CI service definitions.
Database changes: none in the repository schema; migrations executed for the first time
  against a real PostgreSQL instance — but only inside the disposable CI job.
Tests: static workflow verification via actionlint 1.7.7 (clean); local replication of
  every non-service step before commit: env:check OK both templates, node:test 8/8,
  composer validate --strict valid (root invocation + backend), Pint passed, PHPStan L6
  0 errors, PHPUnit 6 tests / 33 assertions OK, route:list smoke shows exactly the two
  application routes (/ redirect, /api/v1/health), full frontend chain green (npm ci,
  oxlint clean, Prettier clean, tsc clean, Vitest 10/10, Vite build OK), secret scan
  clean. First live CI run observed after push via GitHub API (see checkpoint).
Security/authorization impact: least-privilege workflow (contents: read top-level,
  security job scoped identically); CI database uses only throwaway credentials
  (akshar/akshar_testing/secret inside an ephemeral container) — never production,
  staging or personal values; Redis service has no authentication and no persistence,
  bound to the job only; no new secrets introduced; gitleaks unchanged.
External integrations tested: GitHub Actions runtime (workflow dispatch via push);
  packagist/npm registries used by existing install steps only.
INCIDENT RECORD (live-run verification): the first two CI runs on this phase FAILED,
  which is exactly why the roadmap demands real execution rather than plausible YAML:
  (1) run at a5d2988/1efcadd — PHPUnit failed because CI clones have no backend/.env, so
  config('app.name') defaulted to "Laravel" while HealthTest asserts "Akshar"; local runs
  had passed only due to an ambient local .env. Fix: APP_NAME pinned inside
  backend/phpunit.xml making tests hermetic (suite re-verified locally with .env removed).
  (2) run at ce1d5d7 — migrations against disposable PostgreSQL SUCCEEDED but PHPUnit
  errored again: backend/tests/Unit existed locally yet was not git-tracked (empty dir),
  so fresh clones lacked the declared Unit testsuite directory entirely ("Test directory
  not found", exit code 2). Reproduced locally by hiding the directory; fix: real content
  added — Tests\Unit\Support\Api\ApiExceptionTest (3 pure-unit tests, no framework boot)
  covering stable error-code/status contracts of ApiException named constructors.
  Post-green audit refined the incident-1 root cause: an ambient real-environment
  APP_NAME outranks dotenv files and even forced phpunit.xml <env> entries at
  Laravel's env layer (reproduced locally with a hostile value); the authoritative
  CI pin therefore lives in the workflow job's env block (APP_NAME: Akshar), same
  pattern as DB_*. Final run observed green via GitHub API — all four jobs success.
  Lesson recorded: CI verification must include a pristine-clone perspective; empty
  architectural directories are invisible to git by design, and test-relevant values
  must be pinned at the strongest available precedence layer.
  Compliance re-audit against the full authorization closed remaining gaps:
  dependency advisories now EVALUATED in-CI as documented-informational steps
  (composer audit --locked: 0 security advisories, 1 abandoned-package notice —
  nunomaduro/larastan, rename deferred as out-of-phase lockfile change;
  npm audit --omit=dev: 0 vulnerabilities); Redis service now exercised
  (raw RESP PING→+PONG smoke); health endpoint verified over real HTTP inside
  the job (artisan serve + jq assertions on the actual contract — data.status,
  data.service, data.framework, meta.apiVersion — with guaranteed teardown);
  failure-evidence artifact (gate logs only) added; Composer archive cache
  keyed on lockfile hash; concurrency/permissions rationale and a line-by-line
  workflow security review recorded in the checkpoint; OWNER ACTION REQUIRED
  documented for branch protection (admin not possible from this environment).
  Checkpoint rewritten to the exact mandated template. Third live incident
  during compliance hardening: the new Redis RESP smoke failed in CI because
  command substitution strips trailing LF but not CR ("+PONG\r" ≠ "+PONG");
  diagnosed from step-level job data, fixed with explicit tr -d '\r\n'
  (365a5a1). Final state at 365a5a1: ALL FOUR JOBS GREEN on GitHub-hosted
  runners with step-level verification that every new check (advisories,
  Redis smoke, migrations, HTTP health endpoint) actually executed.
Known limitations: authoring host still has no Docker, so compose.dev.yaml itself
  remains unexecuted locally (CI now proves the same topology); migration step's first
  execution happens in CI, not locally; no DB-backed PHPUnit suites yet — migrations +
  route smoke are the current database proof; dependency-advisory scanning (composer
  audit / npm audit) intentionally deferred to avoid flaky external gates — decision
  recorded for a later hardening phase.
Decision: CI mirrors the approved environment contract versions exactly
  (postgres:17-alpine, redis:7-alpine); infrastructure/README.md now warns that CI
  service definitions must be kept aligned with compose.dev.yaml when versions/ports
  change; reliability prioritized over advisory-scanning breadth in this phase.
Next approved step: STOP after Phase 007 checkpoint. Phase 008 requires explicit owner instruction.
```

## Logging rule

Every future implementation checkpoint must state exactly what was changed, what was tested and what remains unproven.
