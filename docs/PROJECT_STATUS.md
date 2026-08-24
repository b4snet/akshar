# PROJECT_STATUS — Akshar

## Current status

**Stage:** Foundation architecture complete; canonical documentation landed in-repo (`/docs`); Phase 001–003 forensic initialization verified; **Phase 004 (Toolchain Bootstrap) COMPLETE — all gates green locally, CI configured.**

**Implementation status:** No application features yet. Toolchain only (Phase 004 scope boundary honored).

## Phase 004 verification evidence

- Reproducible install: `npm run setup` → npm ci from lockfile + composer install from lock ("Nothing to install, update or remove")
- Lint: oxlint 0 warnings/0 errors · Pint laravel preset passed
- Types: `tsc -b` clean (strict) · PHPStan level 6: no errors
- Tests: Vitest 1/1 passed · PHPUnit 2 tests / 4 assertions OK
- Build: Vite production build succeeds
- Formatting: Prettier check + Pint pass
- Secrets: repository scan clean; gitleaks job in CI
- CI: `.github/workflows/ci.yml` — valid YAML, jobs frontend/backend/security on push+PR to main

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

Phase 005 — Project Skeleton (NOT started; requires explicit owner instruction): canonical project layout for frontend, backend/domain services, persistence, integrations, tests, scripts, documentation and operations without adding unnecessary infrastructure.

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
