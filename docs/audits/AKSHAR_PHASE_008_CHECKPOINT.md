# PHASE 008 CHECKPOINT REPORT — Local Development Experience

## 1. Phase number and title

Phase 008 — Local Development Experience (Workstream 01: Foundation & Forensic
Initialization), per `docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md` line 289.

**Governance record:** the phase authorization message was titled "IDENTITY
MODEL", which contradicts the canonical plan it designates as the exact
definition source (plan line 289: Phase 008 = Local Development Experience;
line 439: Identity Model = Phase 012, after Authentication Foundation).
Owner adjudicated: **the plan wins.** This checkpoint therefore implements the
canonical Phase 008 scope only; no identity schema, tables, or domain code was
created.

Objective implemented: make `git clone → running dev environment` a guided,
honest experience — preflight verification of the toolchain contract, one-command
parallel API+web startup with clean teardown, actionable database-preflight for
migrations, and failure semantics that never report success falsely.

## 2. Files changed

- `scripts/lib/doctor-checks.mjs` (new) — pure predicates: Node engines check,
  PHP version comparison, `php -m` module parsing, missing-extension detection,
  doctor result summarization (error vs advisory separation). No I/O by design.
- `scripts/doctor.mjs` (new) — `npm run doctor`: checks Node ≥ 20 (engines),
  PHP ≥ 8.4 + required extensions (`mbstring`, `openssl`, `pdo_pgsql`),
  Composer availability (phar preferred, global fallback); advisory-only checks
  for Docker, `backend/.env` presence, PostgreSQL/Redis reachability on loopback.
  Toolchain gaps exit 1 with remediation hints; advisories never fail the run.
- `scripts/dev.mjs` (new) — `npm run dev:stack`: spawns Laravel API
  (`php artisan serve`, backend/) and Vite (directly via `process.execPath`
  through `frontend/node_modules/vite/bin/vite.js`) in parallel with `[api]`/
  `[web]` tagged interleaved output; first child failure or SIGINT/SIGTERM tears
  down BOTH process trees (taskkill /t on Windows, detached group kill on
  POSIX) and propagates a meaningful exit code.
- `scripts/db-migrate.mjs` (new) — wraps `db:migrate`: TCP preflight on
  127.0.0.1:5432; unreachable → exit 1 with "run npm run db:up" guidance
  instead of a raw PDO driver error; reachable → delegates to
  `php artisan migrate --force`.
- `scripts/setup.mjs` — composer download failure now exits 1 with remediation
  text (previously warned and exited 0 while the backend stayed uninstalled —
  a false-success path violating MASTER_RULES §10 evidence discipline);
  install failures print an explicit remediation line before propagating the
  real exit code.
- `package.json` — adds `doctor`, `dev:stack`, `test:tooling`; `db:migrate`
  now routes through the preflight wrapper; root `test` chain appends
  `test:tooling` (`node --test "scripts/test/*.test.mjs"`).
- `scripts/test/doctor.test.mjs` (new) — 8 unit tests over the pure doctor
  predicates (version boundaries, malformed input rejection, banner-tolerant
  module parsing, case-insensitive extension matching, error/advisory summary
  semantics including advisory-only pass).
- `README.md` — quickstart updated with `doctor`, `dev:stack`, preflight note
  on `db:migrate`.

## 3. Database/data-model changes

None. No migrations, no schema, no seeders (seed remains an explicit stub).
Identity model explicitly untouched — it is Phase 012 per the plan.

## 4. API changes

None. The health endpoint was consumed as-is during dev-stack verification.

## 5. UI changes

None.

## 6. Security/authorization impact

- No new credentials, secrets, or network exposure: both dev servers are the
  same loopback processes developers already ran individually; the orchestrator
  adds no listeners. Doctor probes are unauthenticated TCP reachability checks
  that print states and variable names, never values.
- Removed a false-success path in setup (silent skip of backend install).
- No authentication/authorization logic touched (none exists yet — Phases 011+).

## 7. Tests and exact results

Unit (node:test, new): **16 tests / 0 failures** total tooling suite —
8 env-contract (unchanged) + 8 new doctor tests.

Live host verification (authoring machine, Windows):
- `npm run doctor` → exit 0; report: Node v26.7.0 ok · PHP 8.4.24 ok ·
  extensions all present · composer.phar usable · Docker absent (advisory) ·
  backend/.env found (advisory ok) · PostgreSQL/Redis not listening (advisory
  + hint). A DEP0190 warning from an early draft was eliminated by using
  string-form shell probes.
- `npm run db:migrate` with services down → exit 1, three-line remediation
  naming `npm run db:up` and infrastructure/README.md.
- `npm run dev:stack` live smoke → both servers started; `[api]`/`[web]`
  prefixed output observed (Vite ready banner, artisan serve banner);
  `GET http://127.0.0.1:8000/api/v1/health` returned HTTP 200 canonical
  envelope through the orchestrated instance; teardown verified zero remaining
  listeners on ports 8000/5173/5174.
- Full gate suite re-run green after changes: env:check OK ×2 · oxlint +
  Pint passed · Prettier clean · tsc clean · PHPStan L6 0 errors · Vitest
  10/10 · PHPUnit 9 tests / 56 assertions OK · env-contract 8/8 · tooling
  16/16 · Vite production build OK · secret scan clean · `git diff --check`
  clean · debug-artifact scan of diff clean.

## 8. Documentation updated

Root README quickstart · this checkpoint · DEVELOPMENT_LOG Phase 008 entry
including the governance adjudication record. infrastructure/README.md
unchanged (no environment-contract surface changed).

## 9. Known limitations

- Docker remains unavailable on the authoring host, so `db:up` itself stays
  locally unexecuted (recorded since Phase 006/007; CI proves the topology).
- dev.mjs lifecycle is verified by live manual evidence rather than an
  automated cross-platform process test; signal/job-control semantics differ
  too much between hosts to assert them honestly in CI at this stage.
- Doctor's service probes are point-in-time reachability checks, not
  authenticated service checks (deliberately credential-free).
- Windows-specific spawn hardening discovered here (Node blocks `.cmd` shims
  without a shell; an early draft orphaned children) is documented in code
  comments so later contributors do not regress it.

## 10. Git branch/commit/tree state

- Branch: `main`
- Working tree at close: clean; origin synchronized (commit pushed; CI run on
  the final commit observed green via the GitHub API — all four jobs success).

## 11. Status

**COMPLETE** — scoped behavior implemented, unit + live verification recorded,
all quality gates pass, documentation reflects actual behavior, and the diff
contains only this phase plus its tests/docs. Stopping per protocol; Phase 009
(Initial Quality Gates) requires explicit owner instruction.
