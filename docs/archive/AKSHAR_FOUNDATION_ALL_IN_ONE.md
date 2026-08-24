# AKSHAR — COMPLETE FOUNDATION DOCUMENTATION

This all-in-one file concatenates the 29 foundation documents. The individual files remain the canonical modular documents.

---

# 01 — ACADEMIC_MODEL.md

# ACADEMIC_MODEL — Akshar Academic Domain

## 1. Core model

```text
Organization
 → Institution
 → Campus
 → Academic Year
 → Term / Semester
 → Level / Program
 → Grade / Year
 → Section / Cohort
 → Subject Offering
 → Student Enrollment
 → Class Session
```

## 2. Academic year

Academic years are configurable and may contain terms/semesters, working-day rules, holidays, examination periods and publication windows.

## 3. Education levels

Initial model should support:

- Early / ECD
- Basic education
- Secondary education
- Grades 9–10
- Grades 11–12
- +2 / campus-style higher secondary management
- College programs with configurable year/semester structures

The model must not assume every institution uses every level.

## 4. Program and stream

Programs define educational pathways. A stream is a configurable program specialization; it is not hard-coded as a global enum.

## 5. Sections

Sections are operational cohorts within a grade/program. Students are enrolled into sections for a defined academic context.

## 6. Subject offerings

The master `subject` is separate from a contextual `subject_offering`. An offering binds a subject/version to an academic year, class/section, teacher allocation and assessment scheme.

## 7. Student lifecycle

```text
Prospect → Applicant → Admitted → Enrolled → Active
       → Promoted / Transferred / Withdrawn / Graduated → Alumni
```

## 8. Promotion

Promotion is a policy decision derived from a versioned promotion rule. The rule may consider marks, GPA, attendance, failed subjects, practical requirements and institutional policy.

## 9. Attendance eligibility

Attendance is not inherently a promotion decision. It feeds configurable policies that may determine exam eligibility, warnings or other institutional outcomes.

## 10. College extension

College support should use a generalized `academic_period` model capable of term/semester/annual structures without rewriting school-grade tables.

## 11. Academic record philosophy

Historical enrollment and academic results remain tied to the exact academic context and rule versions used to calculate them.

## 12. Parent/guardian relationship

Parents/guardians are people linked to one or more students through explicit relationships and scopes; they are not duplicated student accounts.

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


---

# 02 — AI_RULES.md

# AI_RULES — Akshar Governed AI

## 1. Purpose

Use AI only where it meaningfully assists educators or administrators and where governance controls can be maintained.

## 2. Suitable uses

- Lesson-plan drafting
- Question generation
- Question variation
- Feedback drafts
- Report narrative drafts
- Search assistance
- Document summarization
- Trend explanation
- Administrative drafting

## 3. Restricted uses

AI must not autonomously:

- publish marks/results
- determine pass/fail
- change student identity data
- approve financial refunds
- submit official examination data
- make disciplinary decisions
- override curriculum or institutional policy

## 4. AI registry

Every production AI feature has:

- purpose
- model/provider
- model/version
- input class
- output class
- evaluation evidence
- feature flag
- kill switch
- owner
- data residency/processing notes
- audit strategy

## 5. Data minimization

Only necessary data reaches an approved model. Secrets and full student records are not sent merely because they are available.

## 6. Deterministic boundary

GPA, marks, fees, timetable constraints, attendance calculations, eligibility and result status are deterministic application logic.

## 7. Human review

Academic-facing AI drafts require human review before becoming authoritative records.

## 8. Failure behavior

AI degradation should not block core school operations. The system degrades to deterministic/manual workflows.


---

# 03 — API_CONTRACTS.md

# API_CONTRACTS — Akshar API Standards

## 1. Base path

`/api/v1`

## 2. Envelope

Successful response:

```json
{
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "details": []
  }
}
```

Exact public message wording may evolve, but error codes remain stable for clients.

## 3. Resource examples

```text
GET    /students
POST   /students
GET    /students/{student}
PATCH  /students/{student}

GET    /enrollments
POST   /enrollments

GET    /subjects
GET    /curricula
GET    /assessments
POST   /marks
POST   /results/{result}/verify
POST   /results/{result}/publish
POST   /results/{result}/revise

GET    /fees/invoices
POST   /payments
```

## 4. Commands

Use explicit command endpoints when the operation changes an authoritative state or invokes workflow rules.

## 5. Idempotency

Payment, imports, external exchange, bulk notifications and other retry-prone mutation endpoints accept idempotency keys.

## 6. Authorization

Every endpoint resolves identity, organization/institution/campus context and permission before loading sensitive resources where feasible.

## 7. Pagination

Use cursor or deterministic page pagination. The API returns total/count metadata only where operationally justified.

## 8. Filtering and sorting

Whitelist supported fields. Do not build raw SQL from user-supplied sort or filter strings.

## 9. Versioning

Breaking changes require a version boundary or compatible migration plan.

## 10. Bulk operations

Bulk endpoints report item-level success/failure and use safe asynchronous processing where volume is material.

## 11. Webhooks

Webhooks are signed, replay-aware and idempotent. Receivers verify signature and timestamp before processing.


---

# 04 — ARCHITECTURE.md

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


---

# 05 — CURRICULUM.md

# CURRICULUM — Nepal Curriculum Architecture

## 1. Purpose

Model national, local and institution-specific curriculum without hard-coding one year's policy into software.

## 2. Authority model

```text
Education Authority
  ├── CDC / national curriculum references
  ├── Local curriculum authority / configured local content
  └── Institution curriculum extensions
```

CDC currently describes its role as developing, revising and updating school curriculum, textbooks and related materials, and as supporting student-assessment frameworks. Its current catalogue spans general and technical/vocational curriculum materials. citeturn257100search1turn257100search2

## 3. Curriculum entities

- Curriculum framework
- Curriculum version
- Grade/level applicability
- Subject
- Subject version
- Learning outcome
- Unit/chapter/topic
- Teaching hour / workload
- Assessment component
- Specification table reference
- Sample question reference
- Source document

## 4. Versioning

```text
Subject
 ├── Version A — effective 2081
 ├── Version B — effective 2083
 └── Version C — effective future date
```

A new version never invalidates historical result calculations that used the old version.

## 5. Local curriculum

Local curriculum must be represented as a first-class authority/source rather than being appended as an untyped “extra subject”. CDC currently publishes guidance for local curriculum development and implementation, reinforcing the need for a configurable local-curriculum layer. citeturn257100search9

## 6. Subject combination

Grades/programs with compulsory and optional subject groups use a subject-combination engine with validation rules. No stream should be encoded as an irreversible list of subjects.

## 7. Technical/vocational curriculum

Curriculum records must support practical hours, labs, modules and competency-linked assessment so technical/vocational curriculum can be represented without a separate academic engine.

## 8. Curriculum ingestion

Supported authoritative ingestion modes:

1. Manual configuration
2. Approved structured import
3. Document-assisted data entry
4. Future official data/API adapters where contracted

Every imported curriculum should retain source metadata and effective date.

## 9. No content laundering rule

Akshar may link to official curriculum documents and preserve source references; it should not imply that a third-party transcription is the official authority document.

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.  

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.  

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.


---

# 06 — DATABASE.md

# DATABASE — Akshar PostgreSQL Data Design

## 1. Database principles

- PostgreSQL is the authoritative transactional store.
- UUIDs are used for public entity identifiers where appropriate.
- Money uses integer minor units.
- Effective-dated configuration supports academic policy change.
- Historical records are never destroyed merely to make current screens simpler.
- Tenant/institution/campus-owned tables have explicit scope keys and RLS policies where applicable.

## 2. Core tables

### Organization
`organizations`, `institutions`, `campuses`, `institution_settings`

### Academic
`academic_years`, `academic_terms`, `education_levels`, `grades`, `programs`, `streams`, `sections`, `rooms`, `labs`

### Curriculum
`curricula`, `curriculum_versions`, `curriculum_subjects`, `subjects`, `subject_versions`, `subject_offerings`, `learning_outcomes`, `assessment_schemes`

### People
`users`, `people`, `students`, `guardians`, `staff`, `teachers`, `student_guardians`

### Lifecycle
`applications`, `admissions`, `enrollments`, `transfers`, `promotions`, `withdrawals`, `graduations`

### Operations
`timetables`, `timetable_entries`, `class_sessions`, `attendance_records`, `leave_requests`, `assignments`, `assignment_submissions`

### Assessment / exam
`assessments`, `assessment_components`, `marks`, `gradebooks`, `question_banks`, `questions`, `question_papers`, `exam_sessions`, `exam_schedules`, `exam_candidates`, `exam_attendance`

### Results
`results`, `result_subjects`, `result_versions`, `grading_schemes`, `grading_scheme_versions`, `certificates`, `certificate_verifications`

### Finance
`fee_structures`, `fee_heads`, `student_charges`, `invoices`, `invoice_lines`, `payments`, `payment_allocations`, `refunds`, `scholarships`, `discounts`, `ledger_entries`

### Platform
`documents`, `document_versions`, `notifications`, `notification_deliveries`, `messages`, `audit_events`, `integration_connections`, `integration_events`, `outbox_events`

## 3. Key relationships

```text
student
  └── enrollment
        ├── academic_year
        ├── program / grade
        ├── section
        └── subject_offerings
```

```text
subject
  └── subject_version
        └── subject_offering
              ├── class/section
              └── teacher assignments
```

```text
assessment
  └── assessment_component
        └── mark
              └── result subject
```

## 4. Constraints

- A student may not have two active enrollments for the same incompatible academic context.
- A timetable entry cannot create an impossible teacher/room/session collision unless the institution explicitly allows it.
- Published result versions are append-only.
- Financial postings cannot be edited in place after posting.
- External integration events use idempotency keys.

## 5. RLS

Every tenant-scoped query must evaluate authorized organization/institution/campus context. Support sessions, migrations and database bootstrap roles must have explicitly documented privileged paths and must not silently become application bypasses.

## 6. Indexing

Use composite indexes around common authorization and workflow keys such as `(organization_id, institution_id, campus_id, academic_year_id)` and domain-specific lookup keys. Search-heavy fields may use dedicated indexes or search infrastructure where justified.

## 7. Audit

Critical mutations write audit facts with actor, action, entity, entity ID, scope, timestamp, request ID and structured metadata that avoids secrets.

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.  

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.  

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.


---

# 07 — DATA_MIGRATION.md

# DATA_MIGRATION — Legacy and Spreadsheet Migration

## 1. Goal

Provide controlled migration from Excel/CSV and legacy school software into Akshar.

## 2. Migration stages

```text
Inventory
 → Upload
 → Detect schema
 → Field mapping
 → Validation
 → Preview
 → Error resolution
 → Dry run
 → Import
 → Reconciliation
 → Sign-off
```

## 3. Supported data

Students, guardians, staff, subjects, classes, sections, enrollment, attendance summaries, fee balances, historical results and documents where mapping is safe.

## 4. Identity matching

Student matching uses multiple fields, not name alone. Potential duplicates enter a review queue.

## 5. Historical result migration

Historical results should preserve source year, source document/reference, original grades/marks and confidence/provenance. Do not fabricate missing calculation inputs.

## 6. Files

Legacy documents are scanned for file type, size, malware and target ownership before storage.

## 7. Dry run

Every material migration executes a dry run producing counts by created, matched, skipped, rejected and ambiguous records.

## 8. Rollback

Batch IDs allow imported records to be isolated and rolled back when an import fails before final reconciliation.

## 9. Audit

Record operator, source file hash, mapping version, execution time and outcome.

## 10. No destructive migration

Legacy source data is never destroyed by Akshar migration scripts.


---

# 08 — DEPLOYMENT.md

# DEPLOYMENT — Akshar Delivery Architecture

## 1. Environments

```text
Local
 ↓
CI
 ↓
Staging
 ↓
Production
```

## 2. Preconditions

- Tests green
- Migration review complete
- Secrets configured externally
- Backup checkpoint
- Rollback plan
- Monitoring enabled
- Responsible approvers identified

## 3. Database deployment

Migrations must be forward-safe. Destructive changes require staged compatibility and explicit review.

## 4. Application deployment

Use immutable build artifacts where supported. Record commit/build metadata.

## 5. Staging gates

Exercise authentication, tenant isolation, enrollment, attendance, marks, result publication, finance and critical portal flows.

## 6. Production go/no-go

A “ready to deploy” decision is separate from a “safe to claim production readiness” decision.

## 7. Rollback

Application rollback must preserve database compatibility. Prefer forward-fix for irreversible migrations.

## 8. Secrets

Never print or commit secret values.

## 9. External integrations

Each integration has environment-specific endpoints and credentials. Sandbox/test evidence must not be presented as production evidence.

## 10. Release notes

Every release documents changed domains, migrations, flags, known limitations and operational checks.


---

# 09 — DESIGN_SYSTEM.md

# DESIGN_SYSTEM — Akshar Product Interface

## 1. Design direction

Akshar should feel like a premium education operating system: calm, professional, information-dense without being cramped, and clearly different from generic AI-generated admin templates.

## 2. Theme

Light-first:

- White primary surfaces
- Very light neutral page backgrounds
- Dark text
- One Akshar accent color
- Restrained semantic status colors

No dark mode is required for the initial product unless a future accessibility/product study justifies it.

## 3. Application shell

```text
Top bar
 ├── Akshar
 ├── Global search
 ├── Current organization/institution/campus
 ├── Notifications
 ├── Language
 ├── Help
 └── Profile

Sidebar
 └── Module → Submodule → Workflow
```

## 4. Navigation

Do not flatten every feature into one list. Only display modules enabled for the institution and authorized for the user.

## 5. Dashboard

`/dashboard` is a real operational dashboard, not a feature-grid page.

## 6. Component system

Shared components:

- Button
- Input
- Select
- Combobox
- Date picker
- Dialog
- Drawer
- Tabs
- Badge
- Toast
- Table
- Pagination
- Empty state
- Loading state
- Error state
- Permission state
- Timeline
- Stat card
- Chart

## 7. Tables

One global data-table system supports sorting, filtering, pagination, row actions, empty/error/loading states and responsive behavior.

## 8. Forms

Forms have clear labels, help text, validation, server-error mapping and accessible semantics. Native semantics remain; browser-default visual styling does not.

## 9. Academic data visualization

Use restrained visualization for attendance, academic trends, finance and enrollment. No chart should exist without real data.

## 10. Responsive behavior

Teachers and parents should be able to complete priority workflows on phone-sized screens. Dense administration views may remain optimized for tablet/desktop.

## 11. Localization

All user-facing labels are translation keys. Support English and Nepali, including Devanagari rendering.

## 12. Accessibility

Target WCAG 2.2 AA practices where feasible: keyboard access, visible focus, contrast, labels, semantic hierarchy, reduced motion considerations and non-color-only status communication.

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


---

# 10 — DEVELOPMENT_LOG.md

# DEVELOPMENT_LOG — Akshar Permanent Engineering Record

## Purpose

This file records chronological engineering decisions and verified implementation checkpoints. It is not a place for aspirational claims.

## Entry format

```text
Date:
Phase:
Scope:
Baseline commit:
Files changed:
Database changes:
Tests:
Security/RLS evidence:
External integrations tested:
Known limitations:
Decision:
Next approved step:
```

## Initial baseline — 2026-08-24

**Status:** Documentation foundation prepared.

**Scope:** 29-document Akshar engineering contract covering product, architecture, academic model, curriculum, examination, NEB boundary, security, tenancy, RBAC, API, design, testing, migration, documents, finance, notifications, interoperability, AI, operations, DR, deployment, roadmap and status.

**Important:** No application implementation is claimed by this documentation baseline.

**Current external-source posture:** Official CDC and NEB public sources have been checked for current authority structure and public examination/curriculum references. Any deeper compliance claim requires document-level review and evidence.

## Logging rule

Every future implementation checkpoint must state exactly what was changed, what was tested and what remains unproven.


---

# 11 — DISASTER_RECOVERY.md

# DISASTER_RECOVERY — Akshar Resilience

## 1. Recovery objectives

Define target RPO/RTO per environment before production. Do not invent availability guarantees.

## 2. Backups

- PostgreSQL backups
- Point-in-time recovery where supported
- Object storage backup/versioning
- Configuration backup
- Integration metadata backup where safe

## 3. Restore drill

A restore drill is required before claiming recovery readiness.

```text
Backup
 → Restore
 → Integrity check
 → Application smoke test
 → RLS/authorization check
 → Evidence capture
```

## 4. Failure domains

Plan for:

- Application failure
- Database failure
- Storage failure
- Queue failure
- Provider/integration outage
- Regional/cloud outage

## 5. Recovery safeguards

Never restore production data into an unsafe environment without access controls and data handling procedures.

## 6. Academic integrity after recovery

Verify counts and checksums for results, certificates, student records and financial ledgers.

## 7. Communication

Maintain incident roles for technical owner, institution/customer contact, security owner and academic operations owner.

## 8. Evidence

Record drill date, source backup, restore environment, duration, result counts, anomalies and sign-off.


---

# 12 — DOCUMENT_MANAGEMENT.md

# DOCUMENT_MANAGEMENT — Akshar Documents and Records

## 1. Scope

Student documents, staff documents, certificates, institutional files, curriculum references, examination evidence, receipts and report documents.

## 2. Storage

Use S3-compatible object storage with metadata in PostgreSQL.

## 3. Access

```text
Authorization
 → signed short-lived URL
 → download
 → audit
```

## 4. Document metadata

- document type
- owner/entity
- version
- source
- issue date
- expiry date where applicable
- checksum
- storage key
- access classification

## 5. Generated documents

Templates are versioned. Generated certificates/report cards record template version and data snapshot version.

## 6. Certificate verification

Public verification exposes minimal data and verifies status, document number and integrity without revealing private student information.

## 7. Versioning

Documents that are formally revised are appended as versions; previous versions remain traceable according to retention policy.

## 8. Security

Reject executable uploads, scan supported uploads, restrict content types and avoid serving uploaded HTML in the application origin.

## 9. Retention

Retention rules are configurable and require institutional/legal review. Deletion should be controlled and auditable.


---

# 13 — EDUCATION_COMPLIANCE.md

# EDUCATION_COMPLIANCE — Nepal Education Governance and Compliance Boundary

## 1. Purpose

This document defines how Akshar represents education-sector requirements without making unsupported legal or regulatory claims.

## 2. Authority references

CDC is under the Government of Nepal's education ministry structure and describes responsibilities including school curriculum development, curriculum materials, student assessment frameworks, standards, equivalence-related work and local curriculum guidance. citeturn257100search1turn257100search8turn257100search9

NEB currently publishes examination-related annual schedules, results, policies, model questions and other official resources for the national examination system. citeturn508242search0turn508242search4

## 3. Compliance model

```text
Requirement
 → Source Authority
 → Source Document
 → Effective Date
 → Akshar Interpretation
 → Implementation Status
 → Evidence
 → Review Date
```

## 4. Status vocabulary

- Not Assessed
- Under Review
- Configured
- Implemented
- Evidence Pending
- Verified by Test
- Verified by Authority/Operator
- Superseded

## 5. No unsupported certification

Akshar documentation must not state “government approved”, “NEB certified”, “fully compliant”, or similar claims unless a valid external approval/certification exists and is documented.

## 6. Privacy

Student, guardian, employee, financial and academic data are confidential. Retention, consent and disclosure policies must be institutionally and legally reviewed before production rollout.

## 7. Education records

Academic records, examination records, certificates and historical documents must have defined retention and correction policies.

## 8. Accessibility and inclusion

Support inclusive education workflows, disability-related accommodations and multilingual/local curriculum records without exposing sensitive data beyond authorized users.

## 9. Compliance registry

The product should maintain an internal source registry tracking the applicable policy/instruction/document, version/date, scope and last verification.

## 10. Human governance

Institution leadership remains responsible for policy interpretation. Akshar implements configured rules but does not replace legal/academic authority.


---

# 14 — EXAMINATION.md

# EXAMINATION — Akshar Examination Management

## 1. Scope

Support internal institutional exams and structured preparation for external examination authorities without claiming to replace an authority's official system.

## 2. Exam hierarchy

```text
Exam Session
 → Examination
 → Subject Paper
 → Candidate
 → Center / Room
 → Invigilation
 → Attendance
 → Assessment / Evaluation
 → Marks
 → Verification
 → Result
```

## 3. Internal examination types

Unit test, class test, terminal, mid-term, pre-board, practical, project, internal assessment, annual/final, supplementary and custom institutional assessments.

## 4. External examination readiness

The model supports external examination metadata such as authority, exam year/session, registration identifier, subject registration, candidate status, schedule, attempt type and official document references.

## 5. Question paper system

Question Bank → Blueprint → Draft Paper → Moderation → Approval → Secure Distribution → Exam → Evaluation.

## 6. Candidate management

Candidate records are derived from authoritative student/enrollment data and frozen for a defined submission snapshot where an external process requires a stable dataset.

## 7. Examination schedules

NEB currently publishes separate examination schedule resources, including Grade 10 and Grade 11/12 annual schedules. Akshar should therefore model exam authority, grade/context and effective schedule version independently rather than storing a single global calendar. citeturn508242search3turn508242search5

## 8. Examination status

```text
Draft
Scheduled
Registration Open
Registration Closed
In Progress
Completed
Marking
Verified
Published
Revised
Cancelled
```

## 9. Secure operations

Question papers and candidate data are sensitive. Access is time-bounded, role-restricted and fully audited.

## 10. No fake submission rule

A “Submit to NEB” action must not appear as successful unless an actual supported integration or documented human verification path produced evidence.

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


---

# 15 — FINANCE.md

# FINANCE — Akshar Education Finance

## 1. Scope

Student fees, institutional finance, payments, refunds, discounts, scholarships, receivables and management reporting.

## 2. Fee architecture

```text
Fee Structure
 → Fee Head
 → Student Charge
 → Invoice
 → Payment
 → Allocation
 → Receipt
```

## 3. Fee heads

Tuition, admission, examination, library, transport, hostel, laboratory, computer, sports, events, uniform, ID card and configured institutional fees.

## 4. Discounts and scholarships

Discounts, scholarships and waivers are explicit allocation rules with approval and effective dates.

## 5. Payments

Provider-agnostic payment service with adapters for cash, bank, and supported digital providers.

## 6. Reconciliation

Provider/bank references are matched against internal payments. Duplicate or uncertain transactions enter reconciliation rather than silently creating extra receipts.

## 7. Refunds

Refunds require authorization, reason and controlled financial reversal. Posted financial records are not silently deleted.

## 8. Fiscal period

Financial configuration references a fiscal period and institution policy. Calendar conversions are display concerns.

## 9. Nepal rules

Tax/VAT and other Nepal-specific rules must be effective-dated and source-referenced where applicable. Do not hard-code assumptions into generic fee calculation.

## 10. Reports

Collection, outstanding, aging, scholarships, payment methods, refunds and reconciliation reports use real transactional data or controlled reporting projections.

## 11. Security

Financial roles are separate from academic roles; every adjustment, refund and privilege change is audited.


---

# 16 — INTEROPERABILITY.md

# INTEROPERABILITY — Akshar External-System Architecture

## 1. Principle

External systems connect through explicit adapters. The core academic domain never becomes dependent on one provider's payload shape.

## 2. Integration registry

Each connection stores:

- system name
- authority/provider
- scope
- connection type
- status
- owner
- credential reference
- last successful exchange
- last failure
- data classification

## 3. Adapter types

- NEB
- Payment
- SMS
- Email
- WhatsApp
- Identity/SSO
- Learning/content systems
- Government reporting
- Future standards-based educational exchange

## 4. Data contracts

Map external fields to canonical Akshar objects. External terminology must not become the database schema unless it is genuinely authoritative.

## 5. Events

Use signed, idempotent event exchange where supported.

## 6. Retry

Retries use exponential backoff, dead-letter handling and operator visibility.

## 7. Consent/privacy

Only required data crosses boundaries. Export scope is authorized and logged.

## 8. Integration truthfulness

Status categories:

```text
Planned
Designed
Fixture-tested
Sandbox-tested
Pilot
Live-with-evidence
Suspended
Retired
```

Never label a designed adapter “integrated”.


---

# 17 — MASTER_RULES.md

# MASTER_RULES — Akshar Engineering Constitution

## 1. Purpose

This document defines the non-negotiable engineering rules for Akshar. Product requirements may evolve; these rules govern how changes are designed and verified.

## 2. Product integrity

Akshar must represent real institutional and academic workflows. A UI prototype, seeded dataset, fake metric, simulated payment, or named integration is not evidence of implementation.

## 3. Domain ownership

Each domain has one authoritative model and service boundary. Student identity, enrollment, curriculum, timetable, attendance, assessment, examination, results, fees, documents, notifications, search and audit must not be independently reimplemented by modules.

## 4. Authority boundaries

The platform must distinguish:

- Curriculum authority
- Institution/local curriculum configuration
- Examination authority
- Institution examinations
- External credential/result sources

Authority records must be versioned and source-referenced.

## 5. Academic immutability

Published results, transcripts and certificates are authoritative records. Corrections require an explicit revision workflow, reason, approver and audit trail.

## 6. Security

Security controls include authentication, authorization, tenant scoping, database isolation, encryption where appropriate, secure documents, rate limits, audit logging, privileged-operation controls and recovery mechanisms.

## 7. Financial integrity

Money is stored as integer minor units where appropriate. Posted financial records are not silently mutated or deleted. Corrections use void/reversal/refund workflows with approvals and audit.

## 8. Configuration over hard-coding

Curriculum versions, grading schemes, promotion rules, fee structures, academic calendars, attendance thresholds and examination schemes must be effective-dated configuration.

## 9. Observability

Every important workflow must produce sufficient structured telemetry to identify failure without exposing secrets or unnecessary personal data.

## 10. Evidence discipline

Any claim of compliance, integration, capacity, availability or production readiness must be supported by recorded evidence.

## 11. Localization

Nepali and English are presentation concerns over shared domain models. BS/AD formatting is a localization concern, not a second date-storage system.

## 12. Accessibility

Core workflows must be keyboard usable, semantically structured and compatible with assistive technology. Color must not be the sole carrier of meaning.

## 13. AI

AI may assist drafting, summarization, question generation and analytics exploration where governed. It may not silently change grades, publish results, decide eligibility, alter official records or bypass deterministic policy.

## 14. Testing gate

No release may be called production-ready unless relevant unit, integration, API, database/RLS, RBAC, E2E, accessibility, security and operational gates pass.

## 15. Scope control

A feature may not introduce a duplicate identity, notification, search, document, payment, rule or audit engine solely for convenience.

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


---

# 18 — NEB_INTEGRATION.md

# NEB_INTEGRATION — National Examination Board Boundary

## 1. Purpose

Define how Akshar should interact with National Examination Board (NEB) processes while avoiding fabricated integration claims.

## 2. Current source-of-truth principle

NEB's official site currently exposes examination schedules, results, policies, Grade 10/SEE-related resources, Grade 11/12 materials and online services. Akshar must treat official NEB publications and approved interfaces as external authorities, not copy them into permanent logic without source/version metadata. citeturn508242search0turn508242search5

## 3. Adapter architecture

```text
Akshar Examination Domain
        ↓
NEB Adapter Interface
        ├── Manual Verification Adapter
        ├── File Exchange Adapter
        └── Official API Adapter (only when contracted/available)
```

## 4. Candidate integration model

```text
Student
 → Eligibility Evaluation
 → Candidate Snapshot
 → Registration Dataset
 → Submission/Exchange
 → External Reference
 → Status Reconciliation
```

## 5. Data exchange states

```text
Prepared
Validated
Queued
Submitted
Acknowledged
Rejected
Partially Accepted
Reconciled
```

## 6. External identifiers

Store external identifiers separately from Akshar IDs.

## 7. Schedule ingestion

Official schedule documents can be imported as reference records with source URL/document hash/publication date. A schedule import must not silently modify institution classes or staff availability.

## 8. Results reconciliation

Imported authority results must retain:

- source
- import timestamp
- source reference
- external candidate ID
- external result version
- reconciliation status
- operator

## 9. Re-totaling / correction awareness

NEB currently publishes result/re-totaling related notices. Akshar therefore needs a workflow for imported result changes rather than assuming the first import is permanently final. citeturn508242search0

## 10. Integration evidence

A live integration is considered established only when real endpoint/provider credentials, successful exchange evidence, error handling and operational ownership have been documented.

## 11. Human fallback

Until a live approved integration exists, Akshar can support export, controlled manual submission and reconciliation workflows.

## 12. Security

No external token, credential, student data export or integration payload may be logged in plaintext.


---

# 19 — NOTIFICATIONS.md

# NOTIFICATIONS — Akshar Communication and Alerts

## 1. Channels

- In-app
- Email
- SMS
- Push
- WhatsApp adapter where approved

## 2. Shared notification service

No module creates its own delivery engine. All events flow through one notification service.

## 3. Event model

```text
Domain Event
 → Notification Rule
 → Audience Resolver
 → Channel Selection
 → Delivery Job
 → Provider
 → Delivery Receipt
```

## 4. Examples

- Student absent
- Fee due
- Payment received
- Result published
- Assignment due
- Examination notice
- Admission status
- Transport update
- Leave decision

## 5. Templates

Templates are versioned and localized.

## 6. Delivery safety

Idempotency keys prevent duplicate notifications when jobs retry.

## 7. Privacy

Messages contain only the minimum necessary information. Sensitive records should require authenticated portal access rather than embedding full details in SMS.

## 8. Preferences

Users may have configurable channel preferences subject to institution rules and mandatory operational notices.

## 9. Monitoring

Track queued, sent, delivered, failed and permanently rejected states.


---

# 20 — OBSERVABILITY.md

# OBSERVABILITY — Akshar Operations

## 1. Goals

Know whether Akshar is healthy, which workflow failed, which tenant/scope was affected and whether data integrity remains intact, without exposing secrets or unnecessary student information.

## 2. Signals

- Metrics
- Structured logs
- Traces where useful
- Audit events
- Queue metrics
- Integration status
- Database health

## 3. Request context

Each request receives a request/correlation ID. Logs include safe actor/scope identifiers where justified.

## 4. Core metrics

- API latency/error rate
- DB latency
- queue depth
- job failure rate
- notification delivery rate
- payment reconciliation backlog
- integration failures
- result publication duration
- export volume

## 5. Academic integrity alerts

Detect unusual spikes in:

- mark edits
- result revisions
- privilege changes
- bulk exports
- repeated login failures

## 6. Dashboards

Operational dashboards distinguish:

- zero
- no data
- delayed data
- data load error

## 7. Privacy

No passwords, tokens, full payment credentials or raw student documents in normal logs.

## 8. Retention

Log retention is configured by operational need and legal/privacy review.

## 9. Alerting

Alert only on actionable conditions; define severity, owner, acknowledgement and escalation.


---

# 21 — PRODUCT_REQUIREMENTS.md

# PRODUCT_REQUIREMENTS — Akshar

## 1. Vision

Build a premium, Nepal-first education platform that lets an institution manage the student lifecycle and academic operating model from one system while remaining compatible with government curriculum and examination structures.

## 2. Users

- Platform operator
- Organization owner
- Institution administrator
- Campus administrator
- Principal / vice principal
- Academic director/coordinator
- Examination coordinator
- Teacher / subject teacher / class teacher
- Accountant / finance manager
- Admissions staff
- HR staff
- Librarian
- Transport manager
- Hostel warden
- Student
- Parent/guardian

## 3. Functional domains

### Foundation
Identity, tenancy, users, roles, permissions, institution setup, settings, audit.

### Academic
Academic years, terms, grades, programs, streams, sections, rooms, subjects, curriculum, teacher allocation, timetable.

### Student lifecycle
Lead/prospect, application, admission, enrollment, transfer, promotion, withdrawal, graduation, alumni.

### Daily operations
Attendance, leave, class sessions, assignments, notices, events, communication.

### Assessment
Assessment schemes, components, gradebook, question bank, examinations, practical assessment, results, transcripts and certificates.

### Nepal examination
SEE/Grade 10 support, Grade 11/12 examination workflows, candidate data, registration-ready data, schedule tracking, result reconciliation and official document references.

### Administration
Finance, HR/payroll-ready exports, library, transport, hostel, inventory, assets and documents.

### Portals
Admin web, teacher workspace, student portal, parent portal.

### Intelligence
MIS, academic analytics, attendance analytics, financial reporting and governed AI assistance.

## 4. Non-functional requirements

- Multi-tenant isolation
- High integrity academic records
- Auditability
- Mobile-responsive workflows
- Nepali/English localization
- Low-bandwidth awareness
- Backup and restore capability
- Observable background jobs
- Secure document access
- API-first business workflows

## 5. MVP definition

MVP should include foundation, students, admissions, academic structure, teachers, subjects, timetable, attendance, assessments, exams, results, fees and student/parent portals. Advanced transport, hostel, inventory, library, AI and national integrations can follow the core academic spine.

## 6. Product success criteria

- A student exists once and accumulates enrollment history.
- Curriculum can change without rewriting historical records.
- Teachers see only authorized classes/students.
- Results are reproducible and versioned.
- Institutions can run an academic year without spreadsheet-only operational dependencies.
- External authority integrations never rely on fabricated behavior.

## 7. Out of scope until separately contracted

- Legal certification of institutional compliance
- Government API integrations without approved technical contracts
- Automatic government submission where no supported interface exists
- Autonomous academic decision making by AI

## Source basis and governance note

This document set is derived from the supplied SWASTHYA reference material, especially its engineering-contract structure, domain-boundary approach, tenancy/RLS philosophy, RBAC separation, real-data dashboard rules, auditability, interoperability boundaries, AI governance and evidence-based roadmap discipline. The supplied material explicitly structures the foundation around documents such as MASTER_RULES, PRODUCT_REQUIREMENTS, ARCHITECTURE, DATABASE, DESIGN_SYSTEM, SECURITY, TENANCY, API_CONTRACTS, TESTING_STRATEGY, DEPLOYMENT, DISASTER_RECOVERY, OBSERVABILITY, INTEROPERABILITY, AI_RULES and ROADMAP.  

Nepal-specific education-domain assumptions are aligned to current official public sources from the Curriculum Development Center (CDC) and National Examination Board (NEB). CDC describes its responsibilities around school curriculum, curriculum materials and student-assessment frameworks, and its current catalogue includes curriculum materials across school grades and technical/vocational streams. NEB currently publishes examination schedules, results, policies, Grade 10 materials and Grade 11/12 materials/services.  

External authority integration must remain adapter-based. No live API, automated government submission, compliance certification or official equivalence claim is considered implemented merely because an interface exists in Akshar.


---

# 22 — PROJECT_STATUS.md

# PROJECT_STATUS — Akshar

## Current status

**Stage:** Foundation architecture / documentation baseline.

**Implementation status:** Not claimed by this document set.

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

Conduct an architecture review against this documentation set, then create executable Phase 0/1 engineering tasks and acceptance tests before feature implementation.

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


---

# 23 — RBAC.md

# RBAC — Akshar Roles, Permissions and Scope

## 1. Identity model

```text
Person
 ↓
User Identity
 ↓
Role Assignment
 ↓
Permission Set
 ↓
Scope
```

## 2. Role families

- Platform Super Admin
- Organization Admin
- Institution Admin
- Campus Admin
- Principal / Vice Principal
- Academic Coordinator
- Examination Coordinator
- Teacher / Subject Teacher / Class Teacher
- Accountant / Finance Manager
- Admission Officer
- HR Manager
- Librarian
- Transport Manager
- Hostel Warden
- Inventory/Asset Officer
- Student
- Parent/Guardian

## 3. Permissions

Use action-oriented permissions such as:

```text
student.read
student.write
attendance.write
assessment.mark.write
assessment.mark.approve
result.verify
result.publish
result.revise
certificate.issue
certificate.revoke
fee.post
fee.adjust
payment.refund
user.manage
role.assign
```

## 4. Scope

Permissions may be scoped to organization, institution, campus, grade, section, subject or explicit assigned students.

## 5. Separation of duties

Examples:

- Marker should not be able to approve their own high-risk result revision.
- Finance clerk should not approve their own refund.
- Teacher should not automatically see payroll.
- Administrator should not automatically gain examination-authority permissions merely because they are an administrator.

## 6. UI behavior

Navigation is generated from entitlements and role scope, but every API action performs authorization again.

## 7. Privileged actions

Require re-authentication or step-up verification for sensitive operations where appropriate.

## 8. Audit

Role assignment, permission changes and support access are always audited.


---

# 24 — README.md

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


---

# 25 — RESULT_RULES.md

# RESULT_RULES — Academic Result and Grading Engine

## 1. Principle

Result computation is deterministic, versioned and reproducible.

## 2. Calculation pipeline

```text
Raw marks
 → Component normalization
 → Weighting
 → Subject score
 → Grade boundary
 → Grade point
 → Credit weighting
 → GPA / aggregate
 → Eligibility / pass rule
 → Result status
```

## 3. Versioned inputs

A published result stores references to:

- grading scheme version
- assessment scheme version
- curriculum/subject version
- promotion/eligibility rule version
- calculation version

## 4. Grading scheme

Never hard-code one permanent grading enum. A scheme contains boundaries, labels, points and special states such as absent or not graded where applicable.

NEB currently publishes result-related materials and notices, including re-totaling and result processes; Akshar must therefore support post-publication result states and reconciliation rather than a single immutable “final number” without history. citeturn508242search0turn508242search23

## 5. Result statuses

```text
Draft
Computed
Verified
Published
Superseded
Withdrawn / Revoked where formally authorized
```

## 6. Revision workflow

```text
Published
 → Correction Request
 → Evidence
 → Reviewer
 → Approval
 → New Result Version
 → Audit
```

## 7. GPA

GPA is derived from a configured grading and credit scheme. The system must retain subject-level inputs so GPA can be reproduced after rule changes.

## 8. Pass/fail

Pass decisions are driven by a rule engine. Rules may consider minimum grade, required subjects, practical completion, attendance or external authority conditions.

## 9. Special states

Support configurable states such as absent, not graded, incomplete, withheld, pending verification and supplementary/retake where the governing assessment policy permits them.

## 10. Reporting

Result reports must show whether a value is official/published, provisional, imported from an authority or institution-calculated.

## 11. Integrity tests

- Re-running a result must yield the same outcome for the same versions.
- A published result cannot change without revision metadata.
- A subject mark cannot appear in a result unless its provenance is known.
- Manual overrides require authorization and audit.


---

# 26 — ROADMAP.md

# ROADMAP — Akshar Delivery Plan

## Phase 0 — Discovery

- Nepal education authority mapping
- Curriculum/assessment source mapping
- NEB workflow mapping
- Institution workflow interviews
- Data model discovery

## Phase 1 — Architecture Baseline

- Finalize MASTER_RULES
- Product requirements
- Architecture
- Database
- Security
- Tenancy
- RBAC
- API
- Design system
- Testing
- Deployment/DR

## Phase 2 — Foundation

Identity, organizations, institutions, campuses, users, roles, permissions, audit, settings and onboarding.

## Phase 3 — Academic Core

Academic year, terms, grades, programs, sections, subjects, curricula, teacher assignments, students and enrollments.

## Phase 4 — Daily Operations

Timetable, class sessions, attendance, leave, assignments, notifications, teacher and parent/student portals.

## Phase 5 — Assessment

Assessment schemes, gradebook, question bank, examinations, practical assessment, result engine and report cards.

## Phase 6 — Nepal Examination

SEE/Grade 10, Grade 11/12 exam workflows, external candidate datasets, schedule ingestion, result reconciliation and NEB adapters.

## Phase 7 — Administration

Fees, payments, scholarships, finance, HR/payroll-ready flows, library, transport, hostel, inventory and assets.

## Phase 8 — Analytics

Academic MIS, attendance, finance, enrollment, teacher workload and executive dashboards.

## Phase 9 — Integrations

Payments, communications, approved external systems and standards-based interoperability.

## Phase 10 — National Scale

Load, resilience, DR, migration automation, localization, operational hardening and multi-region readiness where justified.

## Delivery rule

Do not automatically begin the next phase because the previous phase has a code commit. A phase closes only when documented acceptance, security and operational gates have evidence.


---

# 27 — SECURITY.md

# SECURITY — Akshar Security Architecture

## 1. Threat model

Protect against unauthorized student access, cross-institution data leakage, account takeover, privilege escalation, malicious document access, financial fraud, exam content leakage, integration abuse and insider misuse.

## 2. Authentication

- Secure password hashing
- Rotating refresh sessions
- MFA for privileged roles
- Rate limiting
- Session revocation
- Password reset controls
- Device/session visibility where justified

## 3. Authorization

Server-side authorization must evaluate role, permission, scope and resource ownership. A hidden navigation item is never sufficient.

## 4. Data isolation

PostgreSQL RLS is the final database boundary for tenant-owned records. Application authorization remains required for domain semantics.

## 5. Sensitive domains

Special protection should apply to:

- Student identity documents
- Guardian information
- Academic results
- Exam papers
- Exam candidate data
- Payments
- HR data
- Audit information
- Integration credentials

## 6. Documents

Use short-lived signed URLs, explicit access checks and audit events.

## 7. Secrets

Secrets are environment-managed. They are never committed, displayed in UI, written to normal logs or included in support screenshots.

## 8. Audit

Audit security-sensitive actions, particularly role changes, support access, result revisions, certificate revocations, financial adjustments and external exchanges.

## 9. Security headers

Use secure browser headers including HSTS where appropriate, CSP, X-Content-Type-Options, X-Frame-Options / frame-ancestors policy, referrer policy and safe cookie settings.

## 10. Abuse controls

Rate-limit login, password reset, public certificate verification, bulk exports and integration endpoints.

## 11. Security tests

Include cross-tenant access tests, direct-route authorization tests, privilege escalation attempts, object-level authorization tests, secret scans and dependency vulnerability scans.

## 12. Incident response

Maintain playbooks for account compromise, cross-tenant leak, exam-paper exposure, payment anomaly, integration credential exposure and availability incidents.


---

# 28 — TENANCY.md

# TENANCY — Akshar Multi-Tenant Architecture

## 1. Hierarchy

```text
Platform
 └── Organization
      └── Institution
           └── Campus
                └── Department / Unit / Scope
```

## 2. Tenant isolation

Every organization must be isolated from every other organization. Institution and campus boundaries are additional authorization scopes.

## 3. Context resolution

```text
Authenticated identity
 → organization memberships
 → institution memberships
 → campus scope
 → active context
```

A user with one authorized campus should have it selected automatically. A multi-campus user receives an explicit context selector. An unauthorized campus must not become selectable by URL manipulation.

## 4. RLS

Tenant-owned tables use PostgreSQL RLS. Application-role database access is non-owner/non-bypass wherever possible so policies are exercised in real operation.

## 5. Support sessions

Platform support access is explicit, time-bounded, purpose-recorded and audited. Support must not silently grant organization-admin rights.

## 6. Data imports

Imports must execute within the target tenant context and validate every referenced campus/institution ID.

## 7. Public resources

Public certificate verification and public institution pages are handled through narrowly scoped public-safe queries rather than bypassing the tenant model.

## 8. Tests

For every tenant-owned domain prove:

- tenant A cannot read tenant B;
- institution A cannot read institution B where cross-institution access is not allowed;
- campus-scoped roles cannot escalate to organization-wide access;
- imports and jobs preserve scope;
- exports cannot cross scope.


---

# 29 — TESTING_STRATEGY.md

# TESTING_STRATEGY — Akshar Quality System

## 1. Testing pyramid

```text
Unit
 ↓
Domain / Integration
 ↓
API / Database
 ↓
RLS / RBAC
 ↓
Browser E2E
 ↓
Operational / Load / DR
```

## 2. Unit tests

Rules engine, GPA, grading, promotion, fee calculation, timetable conflict detection, validation and notification selection.

## 3. Integration tests

Laravel service + PostgreSQL behavior, jobs, imports, document generation and integration adapters.

## 4. RLS tests

Attempt cross-organization, cross-institution and cross-campus access for every major tenant-owned domain.

## 5. RBAC tests

Verify role/scope matrices independently from the UI.

## 6. Academic safety tests

- Published result cannot be changed in place.
- Revision creates a new version.
- Calculation is reproducible.
- Curriculum version is honored.
- Promotion uses configured rules.
- Subject combinations obey configuration.

## 7. API tests

Test validation, authorization, idempotency, pagination, optimistic/concurrency behavior and error contracts.

## 8. E2E critical paths

1. Organization setup
2. Admission
3. Enrollment
4. Timetable
5. Attendance
6. Teacher gradebook
7. Exam setup
8. Mark verification
9. Result publication
10. Fee payment
11. Parent portal
12. Student portal
13. Certificate verification

## 9. Security tests

Secret scan, dependency scan, direct route authorization, object-level authorization, upload validation, rate-limit tests.

## 10. Accessibility

Keyboard navigation, semantic forms, focus management, screen-reader labels and contrast checks.

## 11. Load tests

Test peak attendance submission, result publication, fee collection, parent portal spikes and notification jobs.

## 12. Release gates

A release candidate is not complete until relevant automated gates pass and remaining limitations are explicitly recorded.


