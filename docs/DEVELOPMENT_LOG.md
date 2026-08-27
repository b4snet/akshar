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

## Phase 008 — Local Development Experience — 2026-08-24

```
Phase: 008 (Local Development Experience) — per docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
Scope: The developer-facing local workflow only: environment preflight, one-command
  parallel dev stack, actionable migration preflight, and honest setup failure
  semantics. No feature code; no schema; no CI changes; identity model explicitly
  remains Phase 012.
GOVERNANCE NOTE: the phase authorization message titled this phase "IDENTITY MODEL",
  which conflicts with the canonical plan (line 289: PHASE 008 = LOCAL DEVELOPMENT
  EXPERIENCE; line 439: PHASE 012 = IDENTITY MODEL). Owner adjudication: plan wins;
  this entry records that decision as the binding interpretation for the audit trail.
Files changed: scripts/lib/doctor-checks.mjs + scripts/doctor.mjs (`npm run doctor`:
  Node>=20 engines check, PHP>=8.4 + mandated extension detection via php -m,
  composer phar/global availability, advisory Docker/.env/service-reachability
  hints with hard failure ONLY on toolchain gaps); scripts/dev.mjs (`npm run
  dev:stack`: parallel Laravel API + Vite with tagged interleaved output, real
  process-tree teardown on Ctrl-C or first child failure, exit-code propagation;
  Vite launched via process.execPath — .cmd shims are blocked without a shell on
  modern Node and an earlier draft orphaned children because of it); scripts/
  db-migrate.mjs (`db:migrate` now fails fast with `npm run db:up` guidance when
  PostgreSQL is unreachable instead of surfacing a raw driver error); setup.mjs
  fixed to exit non-zero when composer download/install fails (was warn+exit(0),
  violating MASTER_RULES §10 evidence discipline); package.json wires doctor,
  dev:stack, db:migrate wrapper, test:tooling into the root test chain; README
  quickstart updated; scripts/test/doctor.test.mjs adds 8 unit tests for the pure
  predicates (16 total tooling tests together with env-contract).
Database changes: none. API changes: none. UI changes: none.
Security impact: no new secrets or network exposure beyond loopback servers that
  already existed individually; doctor prints variable NAMES and states, never values.
Verification evidence (all run live on the authoring host): doctor exit 0 with
  correct advisories (Docker absent, PG/Redis down) and green toolchain; hostile
  simulation not needed — missing-extension path covered by unit tests;
  db:migrate preflight exits 1 with remediation text when nothing listens on 5432;
  dev:stack launched both servers live, [api]/[web]-tagged output observed, GET
  /api/v1/health returned HTTP 200 canonical envelope through the orchestrated API
  instance, teardown verified zero remaining listeners on 8000/5173/5174; full gate
  suite green (env:check, oxlint/Pint, Prettier, tsc, PHPStan L6 0 errors, Vitest,
  PHPUnit 9/9 56 assertions, env-contract 8/8, tooling 16/16, Vite build, secret
  scan clean); git diff --check clean; debug-artifact scan of the diff clean.
Known limitations: Docker still unavailable on the authoring host so db:up itself
  remains unexecuted locally (unchanged from Phase 007 record); dev.mjs lifecycle
  was verified manually rather than via automated cross-platform process test —
  signal semantics differ too much between CI Linux runners and developer hosts to
  make such a test honest at this stage; doctor service probes are point-in-time
  TCP reachability checks, not authentication checks (by design, no credentials used).
Next approved step: STOP after Phase 008 checkpoint. Phase 009 requires explicit owner instruction.
```

## Phase 012 (executed out of sequence) — Identity Model — 2026-08-24

```
Phase: 012 (Identity Model) per canonical plan line 439; executed early under
  explicit owner authorization. The authorization message arrived titled
  "PHASE 008 - IDENTITY MODEL" while Phase 008 (Local Development Experience)
  was already complete and checkpointed; owner adjudicated: build now as
  out-of-sequence Phase 012, preserving the Phase 008 record, with Phases
  009-011 remaining pending. This entry is the governance record of that
  deviation.
Scope honored: canonical identity RELATIONSHIP model only - no authentication
  workflows (Phase 011 owns login/sessions), no RBAC/scopes (Phases 016-018),
  no organization/institution tenancy (Phase 013), no student/guardian business
  logic (their owning modules). No identity API endpoints were exposed.
Schema: users rewritten in place (fresh-clone doctrine; decision documented in
  the migration): UUID PK, unique person_id FK RESTRICT to people, unique email,
  nullable hash-only password (Phase 011 fills credentials), status CHECK +
  default active, last_login_at, sessions.user_id converted to foreignUuid;
  people added: display/legal/Nepali names (name_ne), contact boundary
  (nullable non-unique email/phone), optional date_of_birth, status CHECK,
  jsonb metadata, NO invented national identifiers; domain_identities added:
  unique (person_id, type), type + status CHECK constraints. All deletions
  RESTRICTed; ARCHIVED is terminal; ordinary deactivation is a status change.
Code: App\Domain\Identity\{Enums\RecordStatus,Enums\IdentityType,
  Concerns\GuardsLifecycle,Models\Person,Models\User,Models\DomainIdentity,
  Actions\RegisterDomainIdentity}; legacy App\Models\User and its factory
  removed; config/auth.php provider repointed to the domain User; domain
  registry Identity row marked In progress. ApiException reused for CONFLICT
  envelopes (shared-service rule; no duplicate error engine).
Tests: backend suite grew 9 -> 24 tests (107 assertions), all passing against
  REAL PostgreSQL 17.10 on the authoring host AND in CI's postgres:17-alpine:
  RecordStatus transition-matrix unit tests; adversarial feature tests covering
  duplicate account email (unique violation), one-account-per-person, duplicate
  domain identity (CONFLICT envelope), invalid identity type rejected by schema
  CHECK, ARCHIVED terminality via lifecycle guard, person deletion RESTRICTed,
  explicit deactivation-not-deletion, sensitive-field serialization (password/
  remember_token hidden, hash never plaintext), and absence of any identity API
  surface (404 + NOT_FOUND envelope, no data leakage).
LOCAL PARITY MILESTONE: portable PostgreSQL 17.10 (zonky binaries unpacked to
  %TEMP%\opencode\pgsql17, outside the repository) was initialized UTF8,
  provisioned with the CI-shaped role/database, and used to run migrations plus
  the full DB-backed suite locally for the first time - closing the Docker-
  unavailability gap recorded since Phase 007/008; local engine major version
  now matches the contract exactly.
Defects caught by local verification: (1) initdb defaulted to WIN1252 encoding,
  breaking Nepali text storage - cluster recreated with UTF8; (2) users
  migration originally declared its people FK inline but runs before the people
  table exists - FK moved into the relationship-layer migration; (3) new models
  lacked in-memory status defaults, making lifecycle guards null-safe failures -
  $attributes defaults added.
Docs: DATABASE.md People section implementation note; PROJECT_STATUS updated;
  app/Domain README registry updated; this entry; checkpoint at
  docs/audits/AKSHAR_PHASE_012_CHECKPOINT.md.
Known limitations: password nullable until Phase 011 wires credentials; no
  audit event emission yet (platform audit phase owns emission; requirements
  for identity events are recorded in the phase checkpoint); person-level
  deduplication beyond account email awaits the identifier policy owned by
  People/Student Lifecycle phases.
Gates at close: env:check OK x2; oxlint/Prettier/tsc clean; Pint clean;
  PHPStan L6 0 errors; Vitest 10/10; PHPUnit 24/24 (107 assertions) vs real
  PG 17.10 local and CI PG17 service; env-contract 8/8; tooling 16/16; Vite
  build OK; secret scan clean; git diff --check clean.
Next approved step: STOP after Phase 012 checkpoint. Phases 009-011 require
  explicit owner instruction.
```

## Phase 009 — Initial Quality Gates — 2026-08-24

```
Phase: 009 (Initial Quality Gates) per canonical plan; authorized after the
  completed out-of-sequence Phase 012, with the explicit instruction to build
  only quality-gate infrastructure and not touch identity/feature work.
Scope honored: one orchestrated quality gate over EXISTING commands; no second
  quality system; no feature development of any kind.
Canonical command: npm run gates -> scripts/quality-gates.mjs. Gate contract
  (authoritative description in docs/TESTING_STRATEGY.md §12): environment
  (env-check) -> dependencies (NEW scripts/check-deps.mjs: local install
  presence, no network) -> formatting -> lint -> typecheck+PHPStan ->
  frontend tests -> backend tests -> build -> secret scan -> artifact scan
  (NEW scripts/artifact-scan.mjs: tracked-file debug/temp sweep formalizing
  the per-phase manual scans) -> git diff --check.
Semantics: exit 0 all pass / 1 any mandatory gate failed / 2 usage-launch
  error; stop-on-first-failure default with [SKIP] reporting, --keep-going
  collects all failures and still exits non-zero; failures never downgraded
  to warnings; failing gate prints command + real exit code + last 30 output
  lines (never environment values); options --only/--list/--verbose.
Security posture: gate table is STATIC constants executed via spawnSync
  (shell only on win32 for npm resolution) - no shell string construction,
  no env interpolation into command lines, no elevated permissions, no
  credentials introduced. Artifact-scan rules are deliberately narrow
  (.env tracked but .example allowed; dd( only with literal argument;
  console.log in tooling NOT flagged as it is legitimate CLI output).
Tests: NEW scripts/test/quality-gates.test.mjs - 8 tests (all-green,
  fail-fast + SKIP marking, failure output shape incl. command/exit/tail,
  keep-going collection still non-zero, subset selection + unknown-gate
  rejection, launch-error counts as failure, canonical order pinned,
  INTEGRATION: real orchestrator executing real repository commands).
  Tooling suite grew 16 -> 24 tests.
NEGATIVE VERIFICATION (§15): trailing whitespace injected into README.md;
  `npm run gates -- --only diff-check` exited 1 with RESULT: FAIL; file
  reverted via git checkout; re-run PASS. Repository left unmodified.
Incident record (honesty discipline): while adding the "gates" script via a
  PowerShell ConvertFrom-Json/ConvertTo-Json round-trip, package.json was
  rewritten with a UTF-8 BOM and mojibake in the description field; detected
  immediately by JSON parse check, restored via git checkout, change applied
  surgically with a text edit instead. Verified: JSON parses, description
  intact, gates script present. No commit ever contained the damaged file.
Full local gate run: 11/11 PASS (exit 0) on the authoring host including the
  two new validators; CI observed green post-push (schema-bearing backend job
  unchanged from Phase 012 state).
Known limitations: orchestrator runs gates sequentially by design
  (deterministic, honest output ordering; parallelization deferred until a
  need is proven); dependency gate checks presence, not freshness (npm ci /
  composer install integrity is setup's concern); artifact scan covers
  tracked files only (untracked local junk is out of scope by definition);
  CI keeps provider-specific steps (service containers, npm audit) as
  workflow steps for infrastructure reasons, documented in TESTING_STRATEGY.
Docs: TESTING_STRATEGY §12 authoritative contract; README quickstart line;
  PROJECT_STATUS stage/priority; this entry; checkpoint at
  docs/audits/AKSHAR_PHASE_009_CHECKPOINT.md.
Next approved step: STOP after Phase 009 checkpoint. Phase 010 requires
  explicit owner instruction.
```

## Phase 010 — Foundation Checkpoint — 2026-08-24

```
Phase: 010 (Foundation Checkpoint) — verification-only phase; no feature code,
  no schema changes, no new infrastructure.
Scope: comprehensive audit proving all foundation phases (001-009) are genuinely
  complete, internally consistent, and ready for Workstream 02 (Identity,
  Tenancy, RBAC). Plus the out-of-sequence Phase 012 Identity Model.
Verification performed: full quality gate (npm run gates) 11/11 green; full
  test suite (PHPUnit 24/24, Vitest passing, tooling 24/24, env-contract 8/8);
  CI observed green on the Phase 010 commits (d1a15c4, dd8b954, a380cba; all
  four jobs success each); checkpoint file inventory (all foundation phases
  004-012 have checkpoint files in docs/audits/; phases 001-003 are pre-code
  forensic/documentation work with evidence in docs/archive/); documentation
  consistency check (DEVELOPMENT_LOG entries match checkpoints, PROJECT_STATUS
  reflects actual state, domain registry Identity row accurate).
Self-healing fix (corrected at phase close): artifact-scan.mjs content rules
  initially matched their own pattern strings (var_dump(, dd(' patterns) and
  any documentation mentioning the rule names. The interim CONTENT_SKIP_FILES
  file-skip approach proved fragile (every new documentation mention would
  require a new exclusion). Final fix: content rules scoped to source-code
  extensions only (SOURCE_CODE_EXTENSIONS: .php/.js/.mjs/.ts/.tsx/.jsx/.vue),
  with a single-file skip for the rules file itself. Documentation no longer
  triggers content rules. Verified clean; full gate 11/11 PASS; committed at
  dd8b954.
Infrastructure: portable PostgreSQL 17.10 cluster re-established from zonky
  binaries (previous temp cleaned); UTF8 encoding; migrations applied; full
  DB-backed suite passing locally.
Docs: this entry; checkpoint at docs/audits/AKSHAR_PHASE_010_CHECKPOINT.md;
  executive summary report at docs/audits/AKSHAR_PHASE_010_FOUNDATION_REPORT.md.
Next approved step: STOP after Phase 010 checkpoint. Phase 011 requires
  explicit owner instruction.
```

## Logging rule

Every future implementation checkpoint must state exactly what was changed, what was tested and what remains unproven.
