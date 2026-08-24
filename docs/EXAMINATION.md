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

NEB currently publishes separate examination schedule resources, including Grade 10 and Grade 11/12 annual schedules. Akshar should therefore model exam authority, grade/context and effective schedule version independently rather than storing a single global calendar. citeturn508242search3turn508242search5

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
