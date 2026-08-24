# PROJECT_STATUS — Akshar

## Current status

**Stage:** Foundation architecture complete; canonical documentation landed in-repo (`/docs`); Phases 001–004 verified; Phase 005 (Project Skeleton) complete (`docs/audits/AKSHAR_PHASE_005_CHECKPOINT.md`); Phase 006 (Environment Contract) complete (`docs/audits/AKSHAR_PHASE_006_CHECKPOINT.md`); **Phase 007 (CI Baseline) COMPLETE.**

**Implementation status:** No application features yet. Skeleton, environment contract, and an executable CI quality contract in place (scope boundary honored).

## Phase 007 verification evidence

- Workflow: `.github/workflows/ci.yml` restructured into four isolated jobs with concurrency cancellation, least-privilege `permissions: contents: read`, and per-job timeouts — contract · frontend · backend (PostgreSQL 17 + Redis 7 services) · security
- Contract job: `npm run env:check` + `npm run test:env` + `composer validate --strict` run on every push/PR; strict composer validation makes manifest↔lockfile disagreement a hard failure (reproducible install)
- Backend job: disposable job-scoped `postgres:17-alpine` (exact version parity with `infrastructure/compose.dev.yaml`) + `redis:7-alpine`, test-only credentials (`akshar`/`akshar_testing`/`secret`), deterministic `CREATE DATABASE akshar_testing`, Redis RESP `PING→+PONG` smoke, full gates (Pint, PHPStan L6, PHPUnit), **real migrations against the disposable instance**, route-registration smoke proving kernel boot, and an HTTP-level health check (`artisan serve` inside the job, jq assertions on the real canonical envelope, guaranteed process teardown)
- Supply-chain: `composer audit --locked` + `npm audit --omit=dev` evaluated as documented-informational steps (0 advisories; abandoned-package notice for nunomaduro/larastan recorded); lockfile integrity stays hard-enforced by install/validate steps; failure-evidence artifacts (gate logs only, retention 7d) uploaded on backend failure — never environment files or credentials
- Frontend/security jobs preserved from the working baseline; no competing toolchain introduced
- Static verification: actionlint 1.7.7 clean on the workflow; every locally-runnable step executed locally with green results before commit
- Live execution: real GitHub Actions runs observed via API after every push; three genuine latent defects were caught BY CI (non-hermetic APP_NAME; git-invisible empty Unit testsuite dir; CR-retaining RESP comparison in the Redis smoke), fixed, and re-verified — all four jobs success at `365a5a1` with step-level confirmation that every gate executed
- Gates at close: oxlint clean · Pint passed · tsc clean · PHPStan L6 0 errors · Prettier clean · Vitest 10/10 · PHPUnit 9 tests / 56 assertions OK (hermetic without `.env`) · node:test 8/8 · Vite build OK · secret scan clean

## Architecture decisions recorded

- **D1 (2026-08-24):** Firebase project `akshar-nepal` is OUT OF SCOPE / DORMANT. It is not a source of truth, not an auth provider, not storage, not functions hosting. The Phase 002 audit remains in `docs/audits/` as historical evidence. Canonical stack: React + TypeScript, Laravel modular monolith, PostgreSQL + RLS, Redis, S3-compatible object storage, server-side authentication, RBAC + scope, adapter registry.
- **D2/D3 (2026-08-24):** `/docs` holds the authoritative documentation set: the 29 canonical foundation documents plus `AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md`. Citation artifacts were removed without altering substantive requirements. `docs/archive/` is reference-only.

## Completed in this baseline

- Product vision
- Engineering constitution
- Functional product requirements
- Target architecture
- Initial logical database model
- Academic model
- Curriculum versioning model
- Examination model
- Result rules
- NEB integration boundary
- Education compliance boundary
- Security model
- Tenancy model
- RBAC model
- API contract conventions
- Design system direction
- Testing strategy
- Data migration approach
- Document management
- Finance
- Notifications
- Interoperability
- AI governance
- Observability
- Disaster recovery
- Deployment
- Roadmap
- Development logging

## Not yet proven

- Production code implementation
- Production database schema
- Real RLS policies
- Real RBAC enforcement
- Actual NEB integration
- Official government API connectivity
- Production payment integrations
- Production-scale capacity
- Legal/compliance certification
- Production DR evidence
- Production multi-region failover

## Priority next action

Phase 008 — Local Development Experience (NOT started; requires explicit owner instruction).

## Definition of done for the foundation

The foundation is complete only when:

1. All 29 documents are approved.
2. Conflicting requirements are resolved.
3. Domain owners are assigned.
4. Database entities are reconciled.
5. RBAC/RLS matrices are approved.
6. Curriculum/examination authority boundaries are approved.
7. Initial API contracts are testable.
8. The first MVP scope is frozen.

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.
