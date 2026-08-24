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

## 13. Test locations (as built, Phase 005)

- Frontend unit/component tests: colocated `*.test.ts(x)` beside the code under `frontend/src/**` (Vitest + Testing Library).
- Backend feature/API tests: `backend/tests/Feature/**` (boot the framework, hit `/api/v1/*`).
- Backend pure-unit tests: `backend/tests/Unit/**` (no framework boot).
- E2E suites: repository-root `tests/` when their phase introduces them.

Backend tests target PostgreSQL (`akshar_testing`) for parity with production; SQLite is not an accepted test target. Until a database-backed suite exists, a running PostgreSQL is not required to run the suite.
