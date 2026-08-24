# AKSHAR — Education Operating System for Nepal

Akshar is a Nepal-first, multi-tenant School + College Management System designed to operate the complete student, academic, examination and institutional lifecycle — from early/basic education through secondary education, Grades 11–12 (+2) and college/campus operations.

> **Status:** foundation phase. The engineering contract is complete; implementation begins with toolchain bootstrap (Phase 004) and proceeds through the 300-phase execution plan. Nothing in this repository yet claims production readiness.

## Canonical architecture (decision D1, 2026-08-24)

```text
Frontend:          React + TypeScript
Backend:           Laravel modular monolith
Database:          PostgreSQL (tenant isolation via RLS)
Cache / queues:    Redis
File storage:      S3-compatible object storage
Authentication:    server-side authentication system
Authorization:     RBAC + scope
Integrations:      adapter registry
Firebase:          OUT OF SCOPE / DORMANT (project akshar-nepal is not part of the architecture)
```

## Source-of-truth hierarchy

1. **`/docs/*.md`** — the 29 canonical Akshar foundation documents plus `AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md`. These are **authoritative**. If any other copy disagrees, `/docs` wins.
2. **`/docs/audits/`** — phase checkpoint and audit reports (evidence records; not requirements).
3. **`/docs/archive/`** — historical artifacts (`AKSHAR_FOUNDATION_ALL_IN_ONE.md`, initialization prompts). Reference only; **not** a competing source of truth.
4. Code and configuration implement `/docs`; they never silently contradict it.

## Documentation set

`README` · `MASTER_RULES` · `PRODUCT_REQUIREMENTS` · `ARCHITECTURE` · `DATABASE` · `ACADEMIC_MODEL` · `CURRICULUM` · `EXAMINATION` · `RESULT_RULES` · `NEB_INTEGRATION` · `EDUCATION_COMPLIANCE` · `SECURITY` · `TENANCY` · `RBAC` · `API_CONTRACTS` · `DESIGN_SYSTEM` · `TESTING_STRATEGY` · `DATA_MIGRATION` · `DOCUMENT_MANAGEMENT` · `FINANCE` · `NOTIFICATIONS` · `INTEROPERABILITY` · `AI_RULES` · `OBSERVABILITY` · `DISASTER_RECOVERY` · `DEPLOYMENT` · `ROADMAP` · `DEVELOPMENT_LOG` · `PROJECT_STATUS` — all under [`/docs`](./docs).

## Engineering rules (summary)

The non-negotiables live in [`docs/MASTER_RULES.md`](./docs/MASTER_RULES.md). In brief: one authoritative source of truth per domain; a screen is not a feature; authorization is server-side; tenant isolation is enforced at the data layer; published results are versioned and never silently overwritten; external integrations are adapters with explicit status; analytics use real data; AI is assistive only; every sensitive mutation is auditable.

## Repository layout

```text
/docs/                 canonical documentation set + master execution plan
/docs/audits/          phase audit & checkpoint reports
/docs/archive/         archival artifacts (non-authoritative)
/frontend/             React + TypeScript SPA toolchain        (Phase 004)
/backend/              backend toolchain (PHP 8.4)              (Phase 004)
```

## Quickstart

Prerequisites: Node ≥ 20, PHP ≥ 8.4 (extensions: mbstring, openssl, pdo_pgsql). Composer is fetched automatically to `tools/composer.phar`.

```bash
npm run setup    # installs frontend deps (npm ci) + backend deps (composer install)
npm run dev      # Vite dev server for the frontend
npm run lint         # oxlint (frontend) + Pint (backend)
npm run typecheck    # tsc (frontend) + PHPStan L6 (backend)
npm run format:check # Prettier (frontend) + Pint (backend)
npm run test         # Vitest (frontend) + PHPUnit (backend)
npm run build        # production build of the frontend
npm run secrets      # repository secret scan
npm run reset        # wipe generated artifacts, reinstall from lockfiles
npm run seed         # stub until the database phase provisions seeding
```

CI runs the same gates on every push/PR to `main` (`.github/workflows/ci.yml`). Copy `.env.example` before adding local configuration — real `.env` files are gitignored and must never be committed (`docs/DEPLOYMENT.md` §8).

