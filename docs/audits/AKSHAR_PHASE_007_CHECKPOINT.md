# AKSHAR — PHASE 007 CHECKPOINT

## Baseline

- Branch: `main`
- HEAD (phase start): `a5d2988373e4236f2113129b91a369db34286228`
- Working tree: clean

## CI Architecture

Workflows:
- `.github/workflows/ci.yml` (only workflow; `name: CI`)

Jobs:
1. **contract** — "Repository & environment contract": `npm run env:check`,
   `npm run test:env`, `composer validate --strict --working-dir=backend`
   (Phase 006 environment contract enforced on every run; composer strict
   validation also fails on manifest/lockfile disagreement → §10 reproducible
   install is a hard gate on both ecosystems).
2. **frontend** — "Frontend (lint · types · tests · build)"
3. **backend** — "Backend quality (PostgreSQL 17 · Redis 7)"
4. **security** — "Secret scan" (gitleaks over full history)

Triggers:
- `push` to `main` and `pull_request` targeting `main`.
- No path filters, by deliberate choice: trivial path rules could let workflow/
  backend/security-relevant changes bypass required checks. Every run runs
  everything; jobs are individually cheap (timeouts 5–15 min).

Concurrency:
- `group: ci-${{ github.ref }}`, `cancel-in-progress: true`.
- Rationale: superseded runs on the SAME ref are cancelled to save resources;
  the newest commit always receives a complete authoritative result including
  the security job. No release/validation pipeline exists yet that must never
  be cancelled; when one lands it gets its own non-cancelling group.

## Frontend CI

- Install: `npm ci` (fails on package.json ↔ package-lock.json disagreement).
- Lint: `npm run lint` (oxlint) and `npm run format:check` (Prettier).
- Typecheck: `npm run typecheck` (tsc strict).
- Tests: `npm run test -- --run` (Vitest, non-watch).
- Build: `npm run build` (Vite production build).

## Backend CI

- Install: `composer validate --strict` then
  `composer install --prefer-dist --no-interaction --no-progress`
  (lockfile-driven; Composer cache archives cached via `actions/cache@v4`
  keyed on `hashFiles('backend/composer.lock')` — downloadable archives only,
  never vendor state or credentials).
- Static analysis: `composer analyse` (PHPStan/Larastan level 6, 0 errors),
  output teed to `/tmp/phpstan.log`; Pint via `composer lint` teed to
  `/tmp/pint.log`.
- Tests: `composer test` (= `config:clear` + PHPUnit) teed to `/tmp/phpunit.log`;
  plus kernel/route smoke (`php artisan route:list --except-vendor`) and an
  HTTP-level health check (see CI Execution notes): `php artisan serve` started
  inside the job, canonical envelope asserted with `jq` against the REAL
  endpoint contract (`data.status == "ok"`, `data.service == "Akshar"`,
  non-empty `data.framework`, `meta.apiVersion == "v1"`), process always
  terminated via EXIT trap. Serve process uses hermetic array stores so the
  HTTP check exercises kernel+HTTP without DB coupling; DB behavior has its
  own dedicated proof below. The `|| true` constructs exist ONLY in serve
  teardown; every quality gate hard-fails the job.

## PostgreSQL

- Version: `postgres:17-alpine` — exact parity with
  `infrastructure/compose.dev.yaml` (contract-mandated version, not
  convenience-chosen).
- Service: job-scoped service container, loopback port 5432,
  `pg_isready -U akshar -d akshar` health gate.
- Initialization: deterministic `CREATE DATABASE akshar_testing` via psql
  (mirrors local init SQL); CI-only credentials (`akshar` / `secret`) set at
  job env, job-lifetime only.
- Migration test: `php artisan migrate --force` against the disposable
  instance — first-ever real execution of committed migrations happened here.
  Framework-baseline migrations only; no invented future Akshar schema.

## Redis

- Version: `redis:7-alpine` — exact compose.dev.yaml parity.
- Service: job-scoped container, loopback 6379, `redis-cli ping` health gate.
- Tests: raw RESP connectivity smoke — `PING` written over `/dev/tcp`,
  answer asserted byte-exact `+PONG`. Reachability/topology proof only;
  application code does not use Redis yet (documented scope boundary).

## Security

Secret scan:
- gitleaks (`gitleaks/gitleaks-action@v2`) over full history
  (`fetch-depth: 0`). Value-based detection distinguishes actual secret values
  from safe variable names. No findings; no suppressions configured; nothing
  disabled. Phase 006's env-contract validator additionally blocks committed
  secret-material patterns on every run.

Dependency scan:
- Evaluated this phase per authorization §9, run as INFORMATIONAL steps with
  documented justification (advisory DBs change continuously; hard-gating them
  would make the baseline non-reproducible day-to-day; enforcement deferred to
  supply-chain hardening phase). Lockfile integrity remains HARD-enforced
  elsewhere (see contract/frontend/backend install steps).
- Results at phase close:
  - `composer audit --locked`: **no security advisories**; 1 abandoned-package
    notice — `nunomaduro/larastan` (successor: `larastan/larastan`). Documented
    and deliberately NOT migrated now: dev-tooling rename would modify the
    lockfile outside this phase's scope ("no broad dependency modernization").
  - `npm audit --omit=dev`: **0 vulnerabilities**.

Workflow permissions:
- Workflow-level least privilege `permissions: contents: read`; security job
  scoped identically. No write scopes anywhere; no untrusted-PR privilege path
  (PR runs get read-only token, no secrets beyond that).
- Line-by-line review (§23): all `run:` blocks are literal commands — no
  `${{ }}` interpolation into any shell except the concurrency group label
  (non-shell context) → no shell-injection surface. Checkout pinned to
  official actions by major tag (@v4); gitleaks/setup-php by @v2. Actions are
  NOT SHA-pinned yet — recorded as known limitation/hardening candidate since
  current project standards do not mandate pinning. Gitleaks needs full
  history checkout (justified). Artifact uploads carry tool outputs only.

Artifact review:
- On backend failure ONLY: `backend-failure-evidence` artifact
  (`actions/upload-artifact@v4`, retention 7 days, `if-no-files-found: ignore`)
  containing pint/phpstan/phpunit logs, serve log, health.json — all
  secret-free structured evidence. Never uploaded: `.env*`, keys, tokens,
  cookies, dumps, student data. Frontend gates emit to the run log only (no
  file-based reporters configured yet — recorded limitation until coverage/
  reporting tooling arrives).

## Environment

CI variables:
- Backend job env: `DB_CONNECTION=pgsql`, `DB_HOST=127.0.0.1`,
  `DB_PORT=5432`, `DB_DATABASE=akshar_testing`, `DB_USERNAME=akshar`,
  `DB_PASSWORD=secret` (disposable, matches phpunit.xml), plus
  `APP_NAME=Akshar`.
- Precedence lesson encoded in workflow comments: the REAL process environment
  outranks `.env` files AND phpunit.xml `<env>` entries (even `force="true"` —
  reproduced locally with hostile values), so test-asserted values are pinned
  at job level where nothing outranks them.
- Health step additionally pins `CACHE_STORE=array`, `SESSION_DRIVER=array`
  (step-scoped hermeticity).

Secret handling:
- Only `secrets.GITHUB_TOKEN` used (read-only, implicit); no repository
  secrets exist. No value ever echoed: logs print gate summaries and the
  secret-free health envelope only. PGPASSWORD passed via step env, not
  command line.

Environment isolation:
- CI clones contain NO `.env` (gitignored since Phase 004); tests proven
  hermetic by running the suite locally without `.env` (9/9 both ways). CI
  services are ephemeral, job-bound, loopback-only; nothing persists.

## CI Execution

Run:
- Real GitHub-hosted execution observed after every push via the public
  GitHub API (runs/jobs endpoints) — YAML validation alone explicitly
  insufficient per authorization.

Commit lineage:
- `1efcadd` baseline → FAILED (incident 1) → `ce1d5d7` hermetic APP_NAME pin →
  FAILED (incident 2 exposed by same run class) → `50b442d` Unit-suite
  restoration → SUCCESS → `0e003c8` job-level APP_NAME precedence fix →
  SUCCESS → `556f26f` compliance hardening → FAILED (incident 3) →
  `365a5a1` Redis smoke CR fix → **SUCCESS — all four jobs green**.

Result:
- All four jobs **success** on GitHub-hosted runners at `365a5a1`, verified via
  the jobs API with step-level conclusions: every backend step ran green,
  including Dependency advisories, Redis connectivity smoke, real migrations,
  PHPUnit, route smoke, and Health endpoint over HTTP.

Live-run incident record (condensed; full narrative in DEVELOPMENT_LOG):
1. Runs at `a5d2988`/`1efcadd` failed: no `.env` in CI clone →
   `config('app.name')` = "Laravel" ≠ asserted "Akshar". Fixed by hermetic
   pinning; later refined: ambient env outranks dotenv AND forced `<env>`, so
   the authoritative pin lives in job env (`APP_NAME: Akshar`).
2. Run at `ce1d5d7` failed (exit 2): `tests/Unit/` empty locally ⇒ never
   git-tracked ⇒ fresh clones lacked the declared testsuite directory
   ("Test directory not found"). Reproduced locally by hiding the directory;
   fixed with real content (`ApiExceptionTest`, 3 pure-unit tests).
3. Run at `556f26f` failed in the new Redis smoke: RESP answers `+PONG\r\n`,
   but command substitution strips trailing LF while RETAINING the CR, so the
   byte comparison `"$(...)" = "+PONG"` compared `+PONG<CR>` and failed.
   Identified from step-level API data; fixed by explicit `tr -d '\r\n'`
   before comparison; no local Redis exists to have caught this pre-push.
All defects were surfaced BY the real pipeline — exactly the failure mode
this phase exists to catch — and were fixed and re-verified to green.

## Local/CI Parity

- Contract gates: identical scripts locally and in CI
  (`npm run env:check`, `npm run test:env`, `composer validate --strict`).
- Frontend: identical commands (`npm ci`, `run lint/format:check/typecheck/
  test/build`) — CI adds `-- --run` to force Vitest non-watch mode.
- Backend: identical composer scripts (`lint`, `analyse`, `test`) and artisan
  invocations (`migrate --force`, `route:list`, `serve`+HTTP check simulated
  locally with equivalent assertions before shipping).
- Unavoidable differences: service containers (PostgreSQL/Redis) exist only in
  CI — authoring host has no Docker; migrations therefore execute in CI while
  local suite stays hermetic (DB-independent by design). OS difference
  (Windows authoring vs ubuntu-latest) is covered by the hermeticity doctrine
  (no ambient-env dependence; proven by the APP_NAME incident).
- Advisory scans run locally with the same commands as CI
  (`composer audit --locked`, `npm audit --omit=dev`).

## Files Changed

- `.github/workflows/ci.yml` — four-job architecture; npm/composer advisory
  evaluation steps (informational, documented); Composer archive cache;
  Redis RESP smoke; teed gate logs; HTTP health-endpoint verification with
  guaranteed teardown; failure-evidence artifact; concurrency; least-
  privilege permissions; job-level `APP_NAME` pin with precedence rationale.
- `backend/phpunit.xml` — `APP_NAME` hermetic pin (local layer).
- `backend/tests/Unit/Support/Api/ApiExceptionTest.php` — new pure-unit suite
  restoring git-tracked existence of declared Unit testsuite dir.
- `infrastructure/README.md` — CI layer row "Defined"; alignment warning
  between compose.dev.yaml and CI service definitions.
- Root `README.md` — CI paragraph describing the actual pipeline.
- `docs/PROJECT_STATUS.md`, `docs/DEVELOPMENT_LOG.md`, this checkpoint.

## Documentation Updated

- `README.md` (CI paragraph) · `infrastructure/README.md` (CI infrastructure
  authority) · `docs/PROJECT_STATUS.md` (evidence line) ·
  `docs/DEVELOPMENT_LOG.md` (Phase 007 entry + incident record) · this
  checkpoint. TESTING_STRATEGY.md reviewed: existing statements remain
  accurate (suite stays DB-independent; CI owns migration execution) — no
  change needed. Environment configuration authority remains solely in
  `/infrastructure/README.md` (no duplication across files).

## Known Limitations

- Authoring host has no Docker: compose.dev.yaml itself remains unexecuted
  locally; CI proves the same topology instead.
- No database-backed PHPUnit suites yet (schema features belong to later
  phases); migrate + HTTP/route smoke are the current database-level proof.
  No future Akshar schema was invented here.
- Dependency-advisory steps are informational (rationale above); enforcement
  deferred to supply-chain hardening phase. Abandoned `nunomaduro/larastan`
  rename deferred for the same scope reason.
- External actions pinned by major tag, not SHA — acceptable under current
  standards; revisit in security hardening.
- Frontend produces no file-based test reports/coverage artifacts yet; failure
  evidence there lives in run logs until reporting tooling lands.
- Branch protection cannot be enabled from this environment (see Owner
  Actions).

## Owner Actions

- **OWNER ACTION REQUIRED — branch protection (§18):** repository
  administration is not possible from the current environment (no admin
  credentials). Required settings once enabled:
  - Require status checks: `Repository & environment contract`,
    `Frontend (lint · types · tests · build)`,
    `Backend quality (PostgreSQL 17 · Redis 7)`, `Secret scan`.
  - Require branches up to date; include administrators.
  Until then, `main` accepts direct pushes and CI results are advisory-only —
  this is honestly recorded rather than claimed as enforced.

## Final Status

PHASE 007 COMPLETE
