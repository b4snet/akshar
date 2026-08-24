# NEB_INTEGRATION — National Examination Board Boundary

## 1. Purpose

Define how Akshar should interact with National Examination Board (NEB) processes while avoiding fabricated integration claims.

## 2. Current source-of-truth principle

NEB's official site currently exposes examination schedules, results, policies, Grade 10/SEE-related resources, Grade 11/12 materials and online services. Akshar must treat official NEB publications and approved interfaces as external authorities, not copy them into permanent logic without source/version metadata. citeturn508242search0turn508242search5

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

NEB currently publishes result/re-totaling related notices. Akshar therefore needs a workflow for imported result changes rather than assuming the first import is permanently final. citeturn508242search0

## 10. Integration evidence

A live integration is considered established only when real endpoint/provider credentials, successful exchange evidence, error handling and operational ownership have been documented.

## 11. Human fallback

Until a live approved integration exists, Akshar can support export, controlled manual submission and reconciliation workflows.

## 12. Security

No external token, credential, student data export or integration payload may be logged in plaintext.
