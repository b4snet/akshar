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
