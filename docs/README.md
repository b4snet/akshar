# AKSHAR — Education Operating System for Nepal

**Akshar** is a Nepal-first, multi-tenant School + College Management System designed to operate the complete student, academic, examination and institutional lifecycle from early/basic education through secondary education, Grades 11–12 and college/campus operations.

## Product thesis

Akshar is not a generic school ERP and is not merely an attendance/fee application. It is intended to be an **academic operating system** in which curriculum, teaching, attendance, assessment, examination, results, administration, finance, communication, students, parents and teachers share one coherent academic record.

## Primary institutional scope

- Private schools
- Community schools
- Day schools
- Boarding schools
- Higher secondary schools / +2 institutions
- Colleges / campuses
- Multi-campus education groups
- Institutions using national, local and institution-defined curriculum components

## Nepal-first scope

Akshar treats education authority and examination authority as separate domains. The Curriculum Development Center (CDC) and National Examination Board (NEB) are represented through governed curriculum and examination models rather than being collapsed into a single “NEB curriculum” object.

The current official CDC site describes responsibilities spanning school curriculum development, curriculum materials and student-assessment frameworks. NEB currently publishes examination schedules, results, policies and Grade 10 / Grade 11–12 examination resources. See the authority references in `CURRICULUM.md`, `EXAMINATION.md`, `NEB_INTEGRATION.md` and `EDUCATION_COMPLIANCE.md`.

## Core hierarchy

```text
ORGANIZATION
    ↓
INSTITUTION
    ↓
CAMPUS
    ↓
ACADEMIC YEAR
    ↓
PROGRAM / LEVEL
    ↓
GRADE / YEAR
    ↓
SECTION
    ↓
SUBJECT OFFERING
    ↓
TEACHER / STUDENT ENROLLMENT
    ↓
CLASS SESSION
    ↓
ATTENDANCE / LEARNING
    ↓
ASSESSMENT
    ↓
EXAMINATION
    ↓
RESULT
    ↓
TRANSCRIPT / CERTIFICATE
```

## Documentation set

- `01  README.md`
- `02  MASTER_RULES.md`
- `03  PRODUCT_REQUIREMENTS.md`
- `04  ARCHITECTURE.md`
- `05  DATABASE.md`
- `06  ACADEMIC_MODEL.md`
- `07  CURRICULUM.md`
- `08  EXAMINATION.md`
- `09  RESULT_RULES.md`
- `10  NEB_INTEGRATION.md`
- `11  EDUCATION_COMPLIANCE.md`
- `12  SECURITY.md`
- `13  TENANCY.md`
- `14  RBAC.md`
- `15  API_CONTRACTS.md`
- `16  DESIGN_SYSTEM.md`
- `17  TESTING_STRATEGY.md`
- `18  DATA_MIGRATION.md`
- `19  DOCUMENT_MANAGEMENT.md`
- `20  FINANCE.md`
- `21  NOTIFICATIONS.md`
- `22  INTEROPERABILITY.md`
- `23  AI_RULES.md`
- `24  OBSERVABILITY.md`
- `25  DISASTER_RECOVERY.md`
- `26  DEPLOYMENT.md`
- `27  ROADMAP.md`
- `28  DEVELOPMENT_LOG.md`
- `29  PROJECT_STATUS.md`

## Technology direction

- Frontend: React + TypeScript + Vite
- Backend: Laravel / PHP as the sole business API
- Database: PostgreSQL
- Cache / queues / realtime: Redis
- Object storage: S3-compatible storage
- Optional AI: provider-agnostic Python/FastAPI inference layer
- External systems: adapter-based integration boundary

## Product principles

### Non-negotiable engineering rules
1. One authoritative source of truth per domain.
2. No feature is considered implemented because a route, screen, button or mock exists.
3. Authorization is enforced server-side; UI visibility is not a security boundary.
4. Tenant/institution/campus isolation is enforced at the data layer where applicable.
5. Published academic results are versioned and corrected through controlled revision workflows; never silently overwritten.
6. Curriculum, grading, promotion, fee and examination rules are configuration- and version-driven, not scattered hard-coded constants.
7. External integrations are represented as adapters with explicit status: planned, fixture-tested, sandbox, or live-with-evidence.
8. Analytics must use actual data and distinguish zero from unavailable/error.
9. AI is assistive and governed; authoritative calculations and academic decisions remain deterministic and auditable.
10. Every security-sensitive, academic-authority and financial mutation must be auditable.
11. Nepal calendar display may support BS and AD, while machine dates remain ISO/Gregorian internally.
12. English and Nepali must be first-class localization targets without duplicating domain logic.

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.

## Current status

This documentation set is a **foundation baseline**, not proof that the application is implemented. The initial implementation should begin only after these contracts are reviewed, reconciled, approved and converted into executable technical tasks.
