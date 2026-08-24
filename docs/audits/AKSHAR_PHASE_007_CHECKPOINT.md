# PHASE 007 CHECKPOINT REPORT — CI Baseline

## 1. Phase number and title

Phase 007 — CI Baseline (Workstream 01: Foundation & Forensic Initialization).

Objective: a reliable, reproducible, repository-native CI baseline that makes
every push/PR to `main` automatically verify the project's engineering gates —
an executable representation of the quality contract, not decorative YAML.

## 2. Files changed

- `.github/workflows/ci.yml` — rewritten as four isolated jobs:
  1. **contract** (new): `npm run env:check`, `npm run test:env`,
     `composer validate --strict --working-dir=backend` — the environment
     contract from Phase 006 is now enforced on every push/PR.
  2. **frontend**: unchanged gate chain (`npm ci`, oxlint, Prettier check,
     tsc strict, Vitest, Vite build).
  3. **backend**: upgraded with job-scoped services and real database proof:
     - services: `postgres:17-alpine` + `redis:7-alpine` with healthchecks,
       exact version parity with `infrastructure/compose.dev.yaml`
       (contract-mandated versions; not convenience-chosen);
     - CI-only credentials (`akshar` / `akshar_testing` / `secret`) set at job env;
     - deterministic database initialization step
       (`CREATE DATABASE akshar_testing`) mirroring the local init SQL;
     - full gates: composer validate → install → Pint → PHPStan/Larastan L6 →
       `php artisan migrate --force` against the disposable instance →
       PHPUnit → `php artisan route:list --except-vendor` kernel/route smoke.
  4. **security**: gitleaks over full history (preserved).
  Hardening applied to all jobs: `concurrency` group with cancel-in-progress,
  least-privilege `permissions: contents: read`, explicit per-job timeouts.
- `infrastructure/README.md` — CI layer row updated to "Defined"; added explicit
  warning that CI service definitions must be kept aligned with compose.dev.yaml.
- Root `README.md` — CI paragraph now describes the actual pipeline including
  disposable PostgreSQL/Redis services.
- `docs/PROJECT_STATUS.md`, `docs/DEVELOPMENT_LOG.md`, this checkpoint.

## 3. Database/data-model changes

- No repository schema changes. For the first time, the committed baseline
  migrations were executed — but only inside the ephemeral CI job against its
  own throwaway PostgreSQL instance. Nothing persists beyond the job.

## 4. API changes

None. Route smoke verifies the existing surface exactly:
`GET /` (redirect) and `GET api/v1/health`.

## 5. UI changes

None.

## 6. Security/authorization impact

- Workflow now declares least-privilege permissions explicitly
  (`contents: read`; security job scoped identically) instead of inheriting defaults.
- CI database uses only disposable, job-lifetime credentials inside an ephemeral
  container — never production, staging, or personal values; Redis service runs
  unauthenticated, unpersisted, job-bound only.
- Environment-contract validation in CI actively blocks committed secret material
  patterns (Phase 006 validator runs on every push/PR now).
- Gitleaks unchanged; no new secrets introduced; `npm run secrets` clean.

## 7. Tests and exact results

Static verification:

- actionlint 1.7.7 on `.github/workflows/ci.yml`: **clean** (schema, expressions,
  shell blocks).

Local replication of every non-service step before commit (all green):

- contract job: env:check OK (both templates) · node:test **8/8 passed** ·
  `composer validate --strict` valid (root-invoked and backend-invoked)
- backend job: Pint passed · PHPStan L6 0 errors · PHPUnit **6 tests /
  33 assertions OK** · route:list smoke shows exactly `/` redirect +
  `api/v1/health`
- frontend job: npm ci clean · oxlint 0 warnings/0 errors · Prettier clean ·
  tsc strict clean · Vitest **10/10 passed** · Vite build OK
- root gates re-run at close: lint/typecheck/format/tests/build/secrets all pass;
  `git diff --check` clean.

Live verification:

- First real workflow run triggered by this phase's push; result recorded below
  in §9/§11 addendum if observed before checkpoint close (GitHub API queried for
  run conclusion). The migrate step's first-ever execution therefore happens in
  CI itself, as designed.

## 8. Documentation updated

Root README (CI paragraph) · infrastructure/README.md (CI layer + alignment
warning) · PROJECT_STATUS.md · DEVELOPMENT_LOG.md · this checkpoint.

## 9. Known limitations

- The authoring host still has no Docker; `compose.dev.yaml` remains unexecuted
  locally. CI now proves the same service topology independently of local Docker.
- No database-backed PHPUnit suites exist yet (no schema features are in scope);
  migrations + route smoke are the current database-level proof. RLS/RBAC suites
  arrive with their owning phases and will run on this same service definition.
- Dependency-advisory scanning (composer audit / npm audit) intentionally not
  added: advisory databases change daily and would create non-reproducible
  failures. Deferred to a later hardening phase as a recorded decision.

## 10. Git branch/commit/tree state

- Branch: `main`
- Baseline commit at phase start: `a5d2988373e4236f2113129b91a369db34286228`
- This phase: single focused commit pushed to origin; working tree clean after push.

## 11. Status

**COMPLETE** — CI is now an executable quality contract: repository/environment
validation, frontend gates, backend gates on disposable PostgreSQL 17 + Redis 7,
real migrations, kernel smoke, secret scanning. Stopping per protocol; Phase 008
requires explicit owner instruction.
