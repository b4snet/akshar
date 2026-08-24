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
