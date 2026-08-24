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
