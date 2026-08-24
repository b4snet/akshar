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

NEB currently publishes result-related materials and notices, including re-totaling and result processes; Akshar must therefore support post-publication result states and reconciliation rather than a single immutable “final number” without history. citeturn508242search0turn508242search23

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
