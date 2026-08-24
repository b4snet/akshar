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

### Canonical quality-gate contract (Phase 009)

The repository has ONE orchestrated quality gate; it invokes the established project commands and does not reimplement any check. This section is the authoritative description — other documents link here rather than duplicating definitions.

Command: `npm run gates` (implementation: `scripts/quality-gates.mjs`).

Gate sequence (mandatory, in order):

1. Environment — `node scripts/env-check.mjs`
2. Dependencies — `node scripts/check-deps.mjs` (local install presence only; no network)
3. Formatting — `npm run format:check`
4. Lint — `npm run lint`
5. Typecheck & Static Analysis — `npm run typecheck` (frontend tsc + backend PHPStan L6)
6. Frontend Tests — `npm run test:fe`
7. Backend Tests — `npm run test:be` (PostgreSQL target)
8. Build — `npm run build`
9. Secret Scan — `npm run secrets`
10. Artifact Scan — `node scripts/artifact-scan.mjs` (tracked-file debug/temp artifact sweep)
11. Diff Check — `git diff --check`

Failure semantics:

- Exit 0 = all executed gates passed; exit 1 = at least one mandatory gate failed; exit 2 = usage/launch error.
- Default policy is stop-on-first-failure; later gates are reported `[SKIP]`. `--keep-going` executes every gate and still exits non-zero if any failed.
- Failures are never downgraded to warnings; a failing gate always produces a non-zero exit.
- Output quotes each failing gate's command, real exit code and the last 30 output lines; it never prints environment values or secrets (underlying commands are themselves secret-safe).
- Options: `--only <ids>` subset (dev/debug), `--list`, `--verbose`.

Local/CI parity: CI runs the same logical gates as discrete workflow steps over the same underlying commands (plus provider-specific steps such as service containers and `npm audit`, which are CI-only for infrastructure reasons and documented in the workflow). The orchestrator is the local developer experience and can be reused in CI wholesale.

The orchestrator itself is tested (`scripts/test/quality-gates.test.mjs`): injected-runner unit tests prove fail-fast, keep-going collection, launch-error handling, unknown-gate rejection and output shape; one integration test executes the real orchestrator against real repository commands.

## 13. Test locations (as built, Phase 005)

- Frontend unit/component tests: colocated `*.test.ts(x)` beside the code under `frontend/src/**` (Vitest + Testing Library).
- Backend feature/API tests: `backend/tests/Feature/**` (boot the framework, hit `/api/v1/*`).
- Backend pure-unit tests: `backend/tests/Unit/**` (no framework boot).
- E2E suites: repository-root `tests/` when their phase introduces them.

Backend tests target PostgreSQL (`akshar_testing`) for parity with production; SQLite is not an accepted test target. Until a database-backed suite exists, a running PostgreSQL is not required to run the suite.
