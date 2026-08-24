# PHASE 005 CHECKPOINT REPORT — Project Skeleton

## 1. Phase number and title

Phase 005 — Project Skeleton (Workstream 01: Foundation & Forensic Initialization).

Objective as scoped by the master execution plan: create the canonical project
layout for frontend, backend/domain services, persistence, integrations,
tests, scripts, documentation and operations **without adding unnecessary
infrastructure** — architecture and skeleton only; no features.

## 2. Files changed

**Backend (`/backend`) — replaced Phase 004 harness with the real Laravel skeleton**

- Laravel 13.26.1 application installed via `composer create-project laravel/laravel`
  (slim skeleton: `app/`, `bootstrap/`, `config/`, `database/`, `public/`, `routes/`,
  `storage/`, `tests/`, `artisan`), with the Phase 004 toolchain merged on top:
  Pint laravel preset (`pint.json`), PHPStan level 6 now Laravel-aware via
  `nunomaduro/larastan ^3.10` (`phpstan.neon` paths: app/config/database/routes/tests),
  PHPUnit 12 via `composer test`.
- Modular-monolith scaffolding (structure + contracts, no business logic):
  - `app/Domain/README.md` — authoritative registry of all 26 anticipated domain
    modules with namespace convention and module layout rules.
  - `app/Support/README.md` — shared-infrastructure layer rules.
  - `app/Support/Api/{ApiResponse,ApiException,ApiErrorMapper}.php` — canonical
    `{data,meta}` / `{error:{code,message,details}}` envelopes per API_CONTRACTS §2.
  - `app/Http/Api/V1/Controllers/HealthController.php`, `routes/api.php` (v1 prefix),
    `bootstrap/app.php` registering API routing plus consistent JSON error rendering
    for every exception under `api/*`; stable codes documented in API_CONTRACTS §12.
  - `routes/web.php` reduced to a redirect to `/api/v1/health`; default welcome view removed.
  - `config/cors.php` (explicit env-driven origins, default `http://localhost:5173`);
    `.env.example` aligned to the PostgreSQL contract (`DB_CONNECTION=pgsql`,
    akshar database/user) + `CORS_ALLOWED_ORIGINS`.
  - `composer.json` renamed to `akshar/backend` with preserved `lint`/`lint:fix`/
    `analyse` scripts (PHPStan memory limit raised for parallel workers).
- Removed: Phase 004 placeholder harness (`src/AksharBackend/*`, toolchain smoke tests).
- Retained untouched as framework baseline: default `users`/`cache`/`jobs`
  migrations, `User` model/factory, `DatabaseSeeder` (identity redesign belongs to its phase).

**Frontend (`/frontend`) — canonical structure**

- Added dependency: `react-router ^8.3.0`.
- Restructured `src/`: `main.tsx` mounts a router provider;
  `app/router.tsx` (single URL map), `app/AppShell.tsx` (brand shell),
  `app/pages/{HomePage,NotFoundPage}.tsx`;
  `components/states/{LoadingState,EmptyState,ErrorState,index}` shared state
  primitives; `services/api/{client,envelope,errors,index}.ts` typed fetch client
  enforcing the envelope/error contract (network failures → `NETWORK_ERROR`,
  unknown wire codes normalized to `SERVER_ERROR`); `services/config.ts` typed env
  access; `design-system/tokens.css` + README (light-first tokens, Devanagari-capable stack);
  `types/env.d.ts`; `features/README.md` bounded-module convention.
- Removed flat `App.tsx`, `App.test.tsx`, unused assets.

**Operations boundaries (purpose-documented, deliberately minimal)**

- `database/README.md` — cross-stack DB artifacts home (future RLS SQL, migration
  runbooks); schema evolution itself stays in `backend/database/migrations`.
- `integrations/README.md` — external-integration contracts/fixtures; adapter code
  stays in `App\Domain\Integrations`.
- `infrastructure/README.md` — environment/deployment definitions arrive with their phases.
- `tests/README.md` — cross-stack E2E home; per-stack suites stay in their apps.
- `.github/dependabot.yml` — weekly npm/composer/github-actions updates with grouped minor/patch.
- Root `package.json`: added `dev:api` (`php backend/artisan serve`).

**Documentation**: root `README.md` (status, layout, quickstart incl. backend env setup),
`docs/API_CONTRACTS.md` (§12 health endpoint + stable error-code list),
`docs/TESTING_STRATEGY.md` (§13 test locations & PostgreSQL-only rule),
`docs/PROJECT_STATUS.md`, `docs/DEVELOPMENT_LOG.md`, this checkpoint.

## 3. Database/data-model changes

- No database provisioned; no schema changes beyond the untouched Laravel baseline
  migrations (not yet executed against any environment).
- Conventions established: migrations owned by Laravel under `backend/database`;
  tests target PostgreSQL (`akshar_testing`) for production/RLS parity; SQLite is
  explicitly not an accepted test target (phpunit.xml + TESTING_STRATEGY §13).

## 4. API changes

- New: `GET /api/v1/health` returning the standard success envelope
  (`data.service/status/environment/framework/time`, `meta.apiVersion=v1`).
- New: all `/api/v1/*` errors render the canonical error envelope with stable codes:
  `BAD_REQUEST, UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, CONFLICT, VALIDATION_ERROR,
  RATE_LIMITED, METHOD_NOT_ALLOWED, SERVER_ERROR` (+ client-side `NETWORK_ERROR`).
- Framework `/up` health route remains available unchanged.

## 5. UI changes

- App shell (header brand/tagline + main region) served at `/`; unknown frontend
  routes render a not-found state with a return-home link.
- Shared loading/empty/error state primitives introduced (used by NotFoundPage);
  design tokens defined. No product feature screens added.

## 6. Security/authorization impact

- No authentication/authorization implemented (belongs to later phases); no
  privileged surface exists beyond the public health probe.
- Error responses never leak exception internals: mapper emits fixed messages or
  developer-provided `ApiException` payloads; unmapped exceptions fall through to
  framework handling outside `api/*`.
- CORS restricted to explicit origins from env; credentials allowed only against
  explicit origins (no wildcard).
- `.env` files remain gitignored; `backend/.env` created locally from example with a
  locally generated `APP_KEY` (verified untracked). Secret scan clean.
- Dependabot enabled (dependency-security posture); CI secret-scan job unchanged.

## 7. Tests and exact results

- Backend (PHPUnit via `php artisan test`): **6 tests, 33 assertions, passed**
  - `Tests\Feature\HealthTest`: health endpoint returns canonical success envelope;
    unknown API route returns exact NOT_FOUND error envelope over HTTP.
  - `Tests\Feature\Support\ApiErrorMapperTest`: ApiException passthrough w/ details;
    ValidationException → VALIDATION_ERROR + field details; AuthenticationException →
    UNAUTHENTICATED/401; AuthorizationException → FORBIDDEN/403; ModelNotFound →
    NOT_FOUND/404; unmapped → null.
- Frontend (Vitest): **10 tests passed across 3 files**
  - `services/api/client.test.ts` (5): envelope parsing + base-url targeting; error
    envelope → typed ApiClientError; unknown code normalization; network failure →
    NETWORK_ERROR; non-envelope failure body → SERVER_ERROR fallback.
  - `components/states/states.test.tsx` (3): loading live-region, empty copy, error
    code/retry interaction.
  - `app/router.test.tsx` (2): shell+home at `/`; not-found page on unknown path.
- Gates (all green): oxlint 0 warnings/0 errors · Pint passed · `tsc -b` clean ·
  PHPStan level 6 (Larastan) 0 errors · Prettier clean · Vite build OK ·
  `npm run secrets` clean · `git diff --check` clean.

## 8. Documentation updated

Root README (layout/quickstart/status) · API_CONTRACTS §12 · TESTING_STRATEGY §13 ·
PROJECT_STATUS · DEVELOPMENT_LOG · backend `app/Domain/README.md` +
`app/Support/README.md` · frontend `features|services|design-system` READMEs ·
top-level `database|integrations|infrastructure|tests` READMEs.

## 9. Known limitations

- PostgreSQL is not yet provisioned locally or in CI; current suites do not touch the
  DB, so this blocks nothing today. The environment contract (Phase 006) owns local
  provisioning; a CI postgres service will be added with the first DB-backed suite.
- No authentication/authorization/tenancy behavior exists yet (later phases own these).
- E2E suites not yet introduced; `tests/` is a documented placeholder until its phase.
- Larastan resolved to `^3.10` (composer-selected compatible line for Laravel 13).
- The 26-domain registry anticipates homes but contains no implementations, by design.

## 10. Git branch/commit/tree state

- Branch: `main` (direct commits per established workflow)
- Baseline commit at phase start: `900d3081098d8079e38875f13d6c4998e187cf3d`
- Working tree before commit: clean except this phase's changes
- This phase: single focused commit (see git log after push)

## 11. Status

**COMPLETE** — scoped skeleton implemented, gates green, documentation reflects actual
behavior, diff contains only this phase and its required tests/docs. Stopping here per
the execution protocol; Phase 006 requires explicit owner instruction.
