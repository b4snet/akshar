# ARCHITECTURE — Akshar

## 1. Target architecture

```text
React + TypeScript SPA
        ↓
Laravel Application API
        ↓
Domain Services / Policies / Jobs
        ↓
PostgreSQL + RLS
        ├── Redis
        └── S3-compatible object storage

External boundaries
        ├── NEB adapter
        ├── Payment adapters
        ├── SMS / Email / WhatsApp adapters
        └── Future interoperability adapters
```

## 2. Domain map

1. Identity
2. Tenancy
3. Institution
4. Academic Structure
5. Curriculum
6. Student Lifecycle
7. Admissions
8. People / Staff
9. Timetable
10. Attendance
11. Learning
12. Assessment
13. Examination
14. Results
15. Certificates
16. Finance
17. HR / Payroll
18. Library
19. Transport
20. Hostel
21. Inventory / Assets
22. Communication
23. Documents
24. Notifications
25. Analytics/MIS
26. Integrations
27. Audit
28. AI

## 3. Request context

```text
Authentication
 → Organization
 → Institution
 → Campus / authorized scope
 → Role
 → Permission
 → Resource policy
 → Database RLS
```

## 4. Shared platform services

Identity, authorization, document storage, notification delivery, search, audit, rules engine, file generation, payment ledger, job processing and reporting infrastructure are shared platform capabilities.

## 5. Data flow principle

Transactions write to the authoritative OLTP model. Reporting consumes approved reporting projections/read models. External integrations consume explicit adapter contracts rather than directly mutating unrelated tables.

## 6. Background jobs

Use queues for:

- Notifications
- Document generation
- Bulk imports
- Report generation
- Integration synchronization
- Scheduled reminders
- Analytics refresh

Jobs must be idempotent where retries are expected.

## 7. File handling

Documents use object storage. Business records store immutable references and metadata; download authorization is evaluated before signed URLs are issued.

## 8. Scale

Design for many organizations and campuses while avoiding premature microservices. Start with a modular monolith and explicit domain boundaries; split services only when scaling, isolation or team ownership proves the need.

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
