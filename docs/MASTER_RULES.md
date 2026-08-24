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
