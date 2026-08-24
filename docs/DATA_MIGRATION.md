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
