# PROJECT_STATUS — Akshar

## Current status

**Stage:** Foundation architecture complete; canonical documentation landed in-repo (`/docs`); Phases 001–004 verified; **Phase 005 (Project Skeleton) COMPLETE — all gates green locally.**

**Implementation status:** No application features yet. Canonical skeleton only (Phase 005 scope boundary honored): real Laravel 13 modular-monolith backend, structured React shell frontend, documented ops boundaries.

## Phase 005 verification evidence

- Backend: Laravel 13.26.1 skeleton under `/backend` with domain registry (`app/Domain/README.md`, 26 anticipated modules), `app/Support/Api` envelope + error mapper, `/api/v1/health` endpoint, consistent JSON error envelopes for all API exceptions
- Frontend: restructured `src/` into app shell/routing (`react-router` v8), shared states (`LoadingState`/`EmptyState`/`ErrorState`), platform services (`services/api` typed client implementing the API envelope contract), design tokens (`design-system/tokens.css`)
- Ops boundaries: `/database`, `/integrations`, `/infrastructure`, `/tests` created with documented purpose only; dependabot configured
- Gates: oxlint clean · Pint passed · tsc clean · PHPStan L6 (Larastan) 0 errors · Prettier clean · Vitest 10/10 · PHPUnit 6 tests / 33 assertions OK · Vite build OK · secret scan clean
- Toolchain: Larastan added for Laravel-aware static analysis; composer scripts preserved (`lint`/`analyse`/`test`)

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

Phase 006 — Environment Contract (NOT started; requires explicit owner instruction): canonical environment configuration and provisioning contract for local development (PostgreSQL, Redis) and deployment targets.

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
