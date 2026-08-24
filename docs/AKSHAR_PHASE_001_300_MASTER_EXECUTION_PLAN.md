# AKSHAR — MASTER CONTINUOUS IMPLEMENTATION PLAN — PHASE 001 TO PHASE 300

> This document is the sequential execution roadmap from project initialization to production launch. It is an implementation plan, not proof that any phase is already complete.

## Execution rules

1. Execute phases strictly in order.
2. Read authoritative documentation before changing code.
3. Never invent external integrations, policies, grading rules, Firebase state, or credentials.
4. Never fake production functionality or metrics.
5. Backend authorization and data boundaries are authoritative.
6. Never silently mutate published academic or financial records.
7. After every phase, test, document, audit the diff, and record the checkpoint.
8. Continue automatically to the next phase unless a genuine blocker requires a product/security/compliance decision.
9. If something cannot be verified, mark it UNKNOWN.
10. Phase 300 is not a production-readiness claim by itself; production readiness requires evidence and human approval.

## Universal phase loop

`READ → INSPECT → IMPLEMENT → TEST → SECURITY CHECK → DOCUMENT → VERIFY → CHECKPOINT → NEXT PHASE`

## Global quality gates

Apply relevant unit, integration, API, RBAC, tenancy, academic-rule, E2E, accessibility, type, lint, format, build, migration, dependency-security, secret, artifact, and diff checks before advancing.

---

## 01 Foundation & Forensic Initialization

### PHASE 001 — REPOSITORY FORENSIC AUDIT

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Inspect the actual repository, Git history, branches, manifests, source tree, scripts, CI, tests, environment examples, and deployment configuration. Classify every relevant artifact as confirmed, documented, implemented, partial, simulated, missing, or unknown.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 001 implementation for Repository forensic audit

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 002 — FIREBASE FORENSIC AUDIT

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Inspect the authenticated Firebase project and only the services actually enabled: Authentication, Firestore, Realtime Database, Storage, Functions, Hosting, App Check, rules, indexes, and configuration. Never print or commit credentials.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 002 implementation for Firebase forensic audit

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 003 — DOCUMENTATION RECONCILIATION

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Read all Akshar foundation Markdown files as one contract. Find contradictions, duplicated rules, missing dependencies, ambiguous requirements, and implementation assumptions before changing code.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 003 implementation for Documentation reconciliation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 004 — TOOLCHAIN BOOTSTRAP

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Create reproducible install, lint, typecheck, test, build, format, reset, seed, and local-development commands. Establish environment examples and CI-ready scripts.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 004 implementation for Toolchain bootstrap

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 005 — PROJECT SKELETON

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Create the canonical project layout for frontend, backend/domain services, persistence, integrations, tests, scripts, documentation, and operations without adding unnecessary infrastructure.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 005 implementation for Project skeleton

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 006 — ENVIRONMENT CONTRACT

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Implement the environment contract capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 006 implementation for Environment contract

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 007 — CI BASELINE

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Implement the ci baseline capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 007 implementation for CI baseline

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 008 — LOCAL DEVELOPMENT EXPERIENCE

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Implement the local development experience capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 008 implementation for Local development experience

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 009 — INITIAL QUALITY GATES

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Implement the initial quality gates capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 009 implementation for Initial quality gates

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 010 — FOUNDATION CHECKPOINT

**Workstream:** 01 Foundation & Forensic Initialization

**Objective:** Implement the foundation checkpoint capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 010 implementation for Foundation checkpoint

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 02 Identity, Tenancy & RBAC

### PHASE 011 — AUTHENTICATION FOUNDATION

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the authentication foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 011 implementation for Authentication foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 012 — IDENTITY MODEL

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the identity model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 012 implementation for Identity model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 013 — ORGANIZATION MODEL

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the organization model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 013 implementation for Organization model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 014 — INSTITUTION MODEL

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the institution model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 014 implementation for Institution model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 015 — CAMPUS MODEL

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the campus model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 015 implementation for Campus model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 016 — TENANCY ENFORCEMENT

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the tenancy enforcement capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 016 implementation for Tenancy enforcement

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 017 — ROLES AND PERMISSIONS

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the roles and permissions capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 017 implementation for Roles and permissions

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 018 — SCOPE-AWARE AUTHORIZATION

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the scope-aware authorization capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 018 implementation for Scope-aware authorization

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 019 — ADMIN CONTEXT RESOLUTION

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the admin context resolution capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 019 implementation for Admin context resolution

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 020 — RBAC AND TENANCY ADVERSARIAL GATE

**Workstream:** 02 Identity, Tenancy & RBAC

**Objective:** Implement the rbac and tenancy adversarial gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 020 implementation for RBAC and tenancy adversarial gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 03 Institution & Academic Structure

### PHASE 021 — ACADEMIC-YEAR DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the academic-year domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 021 implementation for Academic-year domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 022 — TERM AND SEMESTER DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the term and semester domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 022 implementation for Term and semester domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 023 — EDUCATION LEVELS

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the education levels capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 023 implementation for Education levels

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 024 — GRADE DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the grade domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 024 implementation for Grade domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 025 — PROGRAM AND STREAM DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the program and stream domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 025 implementation for Program and stream domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 026 — SECTION DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the section domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 026 implementation for Section domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 027 — CLASSROOM AND ROOM DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the classroom and room domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 027 implementation for Classroom and room domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 028 — DEPARTMENT DOMAIN

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the department domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 028 implementation for Department domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 029 — ACADEMIC CALENDAR

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the academic calendar capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 029 implementation for Academic calendar

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 030 — ACADEMIC STRUCTURE GATE

**Workstream:** 03 Institution & Academic Structure

**Objective:** Implement the academic structure gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 030 implementation for Academic structure gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 04 Curriculum & Subject Engine

### PHASE 031 — AUTHORITY REGISTRY

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the authority registry capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 031 implementation for Authority registry

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 032 — CURRICULUM FRAMEWORK

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the curriculum framework capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 032 implementation for Curriculum framework

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 033 — CURRICULUM VERSIONING

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the curriculum versioning capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 033 implementation for Curriculum versioning

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 034 — SUBJECT MASTER

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the subject master capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 034 implementation for Subject master

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 035 — SUBJECT VERSIONING

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the subject versioning capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 035 implementation for Subject versioning

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 036 — UNITS AND CHAPTERS

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the units and chapters capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 036 implementation for Units and chapters

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 037 — LEARNING OUTCOMES

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the learning outcomes capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 037 implementation for Learning outcomes

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 038 — TEACHING-HOUR MODEL

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the teaching-hour model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 038 implementation for Teaching-hour model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 039 — SUBJECT OFFERING

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the subject offering capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 039 implementation for Subject offering

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 040 — CURRICULUM INTEGRITY GATE

**Workstream:** 04 Curriculum & Subject Engine

**Objective:** Implement the curriculum integrity gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 040 implementation for Curriculum integrity gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 05 People, Students & Admissions

### PHASE 041 — STAFF MASTER

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the staff master capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 041 implementation for Staff master

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 042 — TEACHER PROFILE

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the teacher profile capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 042 implementation for Teacher profile

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 043 — TEACHER ASSIGNMENT

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the teacher assignment capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 043 implementation for Teacher assignment

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 044 — CLASS-TEACHER ASSIGNMENT

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the class-teacher assignment capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 044 implementation for Class-teacher assignment

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 045 — STUDENT MASTER

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the student master capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 045 implementation for Student master

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 046 — GUARDIAN DOMAIN

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the guardian domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 046 implementation for Guardian domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 047 — STUDENT DOCUMENTS

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the student documents capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 047 implementation for Student documents

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 048 — ADMISSION APPLICATION

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the admission application capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 048 implementation for Admission application

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 049 — ADMISSION WORKFLOW

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the admission workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 049 implementation for Admission workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 050 — ADMISSIONS GATE

**Workstream:** 05 People, Students & Admissions

**Objective:** Implement the admissions gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 050 implementation for Admissions gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 06 Enrollment, Timetable & Daily Operations

### PHASE 051 — ENROLLMENT MODEL

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the enrollment model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 051 implementation for Enrollment model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 052 — ENROLLMENT STATE MACHINE

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the enrollment state machine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 052 implementation for Enrollment state machine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 053 — PROMOTION PREPARATION

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the promotion preparation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 053 implementation for Promotion preparation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 054 — TIMETABLE CORE

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the timetable core capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 054 implementation for Timetable core

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 055 — TIMETABLE CONFLICT ENGINE

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the timetable conflict engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 055 implementation for Timetable conflict engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 056 — CLASS-SESSION GENERATION

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the class-session generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 056 implementation for Class-session generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 057 — TEACHER WORKLOAD

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the teacher workload capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 057 implementation for Teacher workload

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 058 — SUBSTITUTION FOUNDATION

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the substitution foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 058 implementation for Substitution foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 059 — OPERATIONS CALENDAR

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the operations calendar capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 059 implementation for Operations calendar

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 060 — DAILY-OPERATIONS GATE

**Workstream:** 06 Enrollment, Timetable & Daily Operations

**Objective:** Implement the daily-operations gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 060 implementation for Daily-operations gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 07 Attendance & Leave

### PHASE 061 — ATTENDANCE CORE

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance core capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 061 implementation for Attendance core

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 062 — ATTENDANCE STATES

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance states capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 062 implementation for Attendance states

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 063 — ATTENDANCE RECORDING

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance recording capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 063 implementation for Attendance recording

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 064 — ATTENDANCE CORRECTION

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance correction capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 064 implementation for Attendance correction

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 065 — ATTENDANCE AGGREGATION

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance aggregation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 065 implementation for Attendance aggregation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 066 — ATTENDANCE POLICY ENGINE

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance policy engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 066 implementation for Attendance policy engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 067 — STUDENT LEAVE

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the student leave capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 067 implementation for Student leave

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 068 — GUARDIAN LEAVE EXPERIENCE

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the guardian leave experience capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 068 implementation for Guardian leave experience

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 069 — TEACHER ATTENDANCE FOUNDATION

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the teacher attendance foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 069 implementation for Teacher attendance foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 070 — ATTENDANCE GATE

**Workstream:** 07 Attendance & Leave

**Objective:** Implement the attendance gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 070 implementation for Attendance gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 08 Learning, Assignments & Resources

### PHASE 071 — ASSIGNMENT CORE

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the assignment core capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 071 implementation for Assignment core

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 072 — SUBMISSION WORKFLOW

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the submission workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 072 implementation for Submission workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 073 — TEACHER FEEDBACK

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the teacher feedback capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 073 implementation for Teacher feedback

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 074 — LEARNING RESOURCE MODEL

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the learning resource model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 074 implementation for Learning resource model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 075 — RESOURCE ACCESS CONTROL

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the resource access control capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 075 implementation for Resource access control

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 076 — LESSON-PLAN FOUNDATION

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the lesson-plan foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 076 implementation for Lesson-plan foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 077 — LESSON EVIDENCE

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the lesson evidence capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 077 implementation for Lesson evidence

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 078 — ASSIGNMENT NOTIFICATIONS

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the assignment notifications capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 078 implementation for Assignment notifications

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 079 — LEARNING PORTAL INTEGRATION

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the learning portal integration capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 079 implementation for Learning portal integration

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 080 — LEARNING GATE

**Workstream:** 08 Learning, Assignments & Resources

**Objective:** Implement the learning gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 080 implementation for Learning gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 09 Assessment & Gradebook

### PHASE 081 — ASSESSMENT MODEL

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 081 implementation for Assessment model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 082 — ASSESSMENT COMPONENTS

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment components capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 082 implementation for Assessment components

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 083 — ASSESSMENT SCHEMES

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment schemes capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 083 implementation for Assessment schemes

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 084 — GRADEBOOK FOUNDATION

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the gradebook foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 084 implementation for Gradebook foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 085 — MARK ENTRY

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the mark entry capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 085 implementation for Mark entry

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 086 — MARK LOCKING

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the mark locking capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 086 implementation for Mark locking

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 087 — MARK CORRECTION

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the mark correction capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 087 implementation for Mark correction

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 088 — ASSESSMENT ELIGIBILITY

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment eligibility capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 088 implementation for Assessment eligibility

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 089 — ASSESSMENT AUDIT

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment audit capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 089 implementation for Assessment audit

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 090 — ASSESSMENT GATE

**Workstream:** 09 Assessment & Gradebook

**Objective:** Implement the assessment gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 090 implementation for Assessment gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 10 Examinations & Question Bank

### PHASE 091 — EXAM SESSION

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the exam session capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 091 implementation for Exam session

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 092 — EXAM SCHEDULE

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the exam schedule capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 092 implementation for Exam schedule

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 093 — EXAM CANDIDATE

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the exam candidate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 093 implementation for Exam candidate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 094 — CANDIDATE ELIGIBILITY

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the candidate eligibility capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 094 implementation for Candidate eligibility

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 095 — EXAM-ROOM ALLOCATION

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the exam-room allocation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 095 implementation for Exam-room allocation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 096 — INVIGILATION

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the invigilation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 096 implementation for Invigilation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 097 — EXAM ATTENDANCE

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the exam attendance capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 097 implementation for Exam attendance

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 098 — QUESTION-BANK FOUNDATION

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the question-bank foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 098 implementation for Question-bank foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 099 — QUESTION BLUEPRINT

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the question blueprint capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 099 implementation for Question blueprint

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 100 — EXAMINATION GATE

**Workstream:** 10 Examinations & Question Bank

**Objective:** Implement the examination gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 100 implementation for Examination gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 11 Results & Academic Documents

### PHASE 101 — GRADING-SCHEME ENGINE

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the grading-scheme engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 101 implementation for Grading-scheme engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 102 — DETERMINISTIC RESULT CALCULATION

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the deterministic result calculation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 102 implementation for Deterministic result calculation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 103 — RESULT SUBJECT RECORD

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the result subject record capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 103 implementation for Result subject record

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 104 — RESULT DRAFT WORKFLOW

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the result draft workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 104 implementation for Result draft workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 105 — RESULT PUBLICATION

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the result publication capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 105 implementation for Result publication

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 106 — RESULT REVISION

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the result revision capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 106 implementation for Result revision

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 107 — ACADEMIC TRANSCRIPT

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the academic transcript capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 107 implementation for Academic transcript

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 108 — REPORT CARD TEMPLATES

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the report card templates capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 108 implementation for Report card templates

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 109 — CERTIFICATE FOUNDATION

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the certificate foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 109 implementation for Certificate foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 110 — RESULTS GATE

**Workstream:** 11 Results & Academic Documents

**Objective:** Implement the results gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 110 implementation for Results gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 12 Student, Teacher & Parent Portals

### PHASE 111 — TEACHER DASHBOARD

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the teacher dashboard capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 111 implementation for Teacher dashboard

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 112 — TEACHER CLASS WORKSPACE

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the teacher class workspace capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 112 implementation for Teacher class workspace

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 113 — STUDENT DASHBOARD

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the student dashboard capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 113 implementation for Student dashboard

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 114 — STUDENT ACADEMIC WORKSPACE

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the student academic workspace capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 114 implementation for Student academic workspace

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 115 — PARENT DASHBOARD

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the parent dashboard capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 115 implementation for Parent dashboard

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 116 — MULTI-CHILD SWITCHER

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the multi-child switcher capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 116 implementation for Multi-child switcher

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 117 — PORTAL NOTIFICATIONS

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the portal notifications capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 117 implementation for Portal notifications

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 118 — PORTAL DOCUMENT ACCESS

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the portal document access capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 118 implementation for Portal document access

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 119 — PORTAL PROFILE CONTROLS

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the portal profile controls capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 119 implementation for Portal profile controls

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 120 — PORTAL SECURITY GATE

**Workstream:** 12 Student, Teacher & Parent Portals

**Objective:** Implement the portal security gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 120 implementation for Portal security gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 13 Core Finance & Fee Management

### PHASE 121 — FEE-HEAD MASTER

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the fee-head master capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 121 implementation for Fee-head master

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 122 — FEE STRUCTURE

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the fee structure capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 122 implementation for Fee structure

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 123 — STUDENT CHARGE GENERATION

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the student charge generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 123 implementation for Student charge generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 124 — INVOICE ENGINE

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the invoice engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 124 implementation for Invoice engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 125 — PAYMENT FOUNDATION

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the payment foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 125 implementation for Payment foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 126 — RECEIPT GENERATION

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the receipt generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 126 implementation for Receipt generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 127 — SCHOLARSHIPS

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the scholarships capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 127 implementation for Scholarships

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 128 — DISCOUNTS AND WAIVERS

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the discounts and waivers capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 128 implementation for Discounts and waivers

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 129 — OUTSTANDING AND AGING

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the outstanding and aging capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 129 implementation for Outstanding and aging

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 130 — FINANCE GATE

**Workstream:** 13 Core Finance & Fee Management

**Objective:** Implement the finance gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 130 implementation for Finance gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 14 Library, Inventory & Assets

### PHASE 131 — LIBRARY CATALOG

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the library catalog capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 131 implementation for Library catalog

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 132 — LIBRARY COPIES

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the library copies capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 132 implementation for Library copies

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 133 — LIBRARY MEMBERS

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the library members capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 133 implementation for Library members

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 134 — ISSUE/RETURN WORKFLOW

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the issue/return workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 134 implementation for Issue/return workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 135 — INVENTORY MASTER

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the inventory master capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 135 implementation for Inventory master

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 136 — STOCK MOVEMENT LEDGER

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the stock movement ledger capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 136 implementation for Stock movement ledger

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 137 — ASSET REGISTER

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the asset register capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 137 implementation for Asset register

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 138 — ASSET MAINTENANCE

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the asset maintenance capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 138 implementation for Asset maintenance

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 139 — PROCUREMENT FOUNDATION

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the procurement foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 139 implementation for Procurement foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 140 — OPERATIONS ASSET GATE

**Workstream:** 14 Library, Inventory & Assets

**Objective:** Implement the operations asset gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 140 implementation for Operations asset gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 15 HR, Payroll & Staff Operations

### PHASE 141 — EMPLOYEE RECORDS

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the employee records capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 141 implementation for Employee records

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 142 — EMPLOYMENT CONTRACTS

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the employment contracts capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 142 implementation for Employment contracts

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 143 — STAFF ATTENDANCE

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the staff attendance capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 143 implementation for Staff attendance

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 144 — STAFF LEAVE

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the staff leave capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 144 implementation for Staff leave

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 145 — TEACHER WORKLOAD REPORTING

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the teacher workload reporting capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 145 implementation for Teacher workload reporting

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 146 — PAYROLL FOUNDATION

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the payroll foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 146 implementation for Payroll foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 147 — PAYROLL CALCULATION

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the payroll calculation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 147 implementation for Payroll calculation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 148 — PAYROLL APPROVALS

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the payroll approvals capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 148 implementation for Payroll approvals

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 149 — PAYSLIP GENERATION

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the payslip generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 149 implementation for Payslip generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 150 — HR GATE

**Workstream:** 15 HR, Payroll & Staff Operations

**Objective:** Implement the hr gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 150 implementation for HR gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 16 Communication & Notifications

### PHASE 151 — ANNOUNCEMENT MODEL

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the announcement model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 151 implementation for Announcement model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 152 — EVENT MANAGEMENT

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the event management capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 152 implementation for Event management

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 153 — NOTIFICATION DOMAIN

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the notification domain capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 153 implementation for Notification domain

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 154 — IN-APP NOTIFICATIONS

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the in-app notifications capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 154 implementation for In-app notifications

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 155 — EMAIL ADAPTER

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the email adapter capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 155 implementation for Email adapter

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 156 — SMS ADAPTER

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the sms adapter capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 156 implementation for SMS adapter

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 157 — PUSH NOTIFICATIONS

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the push notifications capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 157 implementation for Push notifications

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 158 — WHATSAPP BOUNDARY

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the whatsapp boundary capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 158 implementation for WhatsApp boundary

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 159 — NOTIFICATION PREFERENCES

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the notification preferences capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 159 implementation for Notification preferences

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 160 — COMMUNICATION GATE

**Workstream:** 16 Communication & Notifications

**Objective:** Implement the communication gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 160 implementation for Communication gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 17 Documents, Templates & Verification

### PHASE 161 — DOCUMENT SERVICE

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the document service capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 161 implementation for Document service

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 162 — SECURE STORAGE INTEGRATION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the secure storage integration capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 162 implementation for Secure storage integration

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 163 — DOCUMENT VERSIONING

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the document versioning capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 163 implementation for Document versioning

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 164 — TEMPLATE ENGINE

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the template engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 164 implementation for Template engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 165 — PDF GENERATION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the pdf generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 165 implementation for PDF generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 166 — QR VERIFICATION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the qr verification capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 166 implementation for QR verification

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 167 — DOCUMENT REVOCATION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the document revocation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 167 implementation for Document revocation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 168 — BULK DOCUMENT GENERATION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the bulk document generation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 168 implementation for Bulk document generation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 169 — DOCUMENT RETENTION

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the document retention capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 169 implementation for Document retention

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 170 — DOCUMENT GATE

**Workstream:** 17 Documents, Templates & Verification

**Objective:** Implement the document gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 170 implementation for Document gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 18 Nepal Education & NEB Readiness

### PHASE 171 — OFFICIAL SOURCE REGISTRY

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the official source registry capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 171 implementation for Official source registry

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 172 — CDC CURRICULUM MAPPING

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the cdc curriculum mapping capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 172 implementation for CDC curriculum mapping

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 173 — GRADE 9-10 EXAM MODEL

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the grade 9-10 exam model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 173 implementation for Grade 9-10 exam model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 174 — GRADE 11-12 EXAM MODEL

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the grade 11-12 exam model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 174 implementation for Grade 11-12 exam model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 175 — SUBJECT REGISTRATION MODEL

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the subject registration model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 175 implementation for Subject registration model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 176 — CANDIDATE REGISTRATION PACKAGE

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the candidate registration package capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 176 implementation for Candidate registration package

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 177 — NEB ADAPTER INTERFACE

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the neb adapter interface capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 177 implementation for NEB adapter interface

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 178 — EXCHANGE STATUS TRACKING

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the exchange status tracking capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 178 implementation for Exchange status tracking

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 179 — NEB RECONCILIATION

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the neb reconciliation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 179 implementation for NEB reconciliation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 180 — NEB READINESS GATE

**Workstream:** 18 Nepal Education & NEB Readiness

**Objective:** Implement the neb readiness gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 180 implementation for NEB readiness gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 19 Compliance, Audit & Academic Governance

### PHASE 181 — EDUCATION COMPLIANCE MATRIX

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the education compliance matrix capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 181 implementation for Education compliance matrix

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 182 — RECORD-RETENTION POLICY

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the record-retention policy capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 182 implementation for Record-retention policy

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 183 — ACADEMIC AUDIT POLICY

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the academic audit policy capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 183 implementation for Academic audit policy

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 184 — RESULT INTEGRITY POLICY

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the result integrity policy capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 184 implementation for Result integrity policy

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 185 — CERTIFICATE GOVERNANCE

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the certificate governance capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 185 implementation for Certificate governance

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 186 — STUDENT PRIVACY CONTROLS

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the student privacy controls capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 186 implementation for Student privacy controls

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 187 — ADMINISTRATIVE APPROVAL MATRIX

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the administrative approval matrix capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 187 implementation for Administrative approval matrix

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 188 — SUPPORT AND IMPERSONATION CONTROLS

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the support and impersonation controls capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 188 implementation for Support and impersonation controls

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 189 — COMPLIANCE EVIDENCE LEDGER

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the compliance evidence ledger capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 189 implementation for Compliance evidence ledger

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 190 — GOVERNANCE GATE

**Workstream:** 19 Compliance, Audit & Academic Governance

**Objective:** Implement the governance gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 190 implementation for Governance gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 20 API, Search, Imports & Reporting

### PHASE 191 — API RESOURCE CONVENTIONS

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the api resource conventions capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 191 implementation for API resource conventions

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 192 — STUDENT APIS

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the student apis capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 192 implementation for Student APIs

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 193 — ACADEMIC APIS

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the academic apis capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 193 implementation for Academic APIs

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 194 — ASSESSMENT APIS

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the assessment apis capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 194 implementation for Assessment APIs

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 195 — FINANCE APIS

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the finance apis capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 195 implementation for Finance APIs

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 196 — GLOBAL SEARCH

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the global search capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 196 implementation for Global search

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 197 — SEARCH INDEXING

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the search indexing capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 197 implementation for Search indexing

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 198 — IMPORT PIPELINE

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the import pipeline capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 198 implementation for Import pipeline

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 199 — REPORTING PIPELINE

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the reporting pipeline capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 199 implementation for Reporting pipeline

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 200 — API AND REPORTING GATE

**Workstream:** 20 API, Search, Imports & Reporting

**Objective:** Implement the api and reporting gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 200 implementation for API and reporting gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 21 Observability, Performance & Reliability

### PHASE 201 — STRUCTURED LOGGING

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the structured logging capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 201 implementation for Structured logging

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 202 — ERROR MONITORING

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the error monitoring capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 202 implementation for Error monitoring

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 203 — HEALTH ENDPOINTS

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the health endpoints capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 203 implementation for Health endpoints

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 204 — METRICS FOUNDATION

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the metrics foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 204 implementation for Metrics foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 205 — QUEUE FOUNDATION

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the queue foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 205 implementation for Queue foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 206 — RETRY AND IDEMPOTENCY FRAMEWORK

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the retry and idempotency framework capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 206 implementation for Retry and idempotency framework

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 207 — CACHING FOUNDATION

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the caching foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 207 implementation for Caching foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 208 — PERFORMANCE BASELINE

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the performance baseline capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 208 implementation for Performance baseline

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 209 — LOAD-TEST FOUNDATION

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the load-test foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 209 implementation for Load-test foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 210 — RELIABILITY GATE

**Workstream:** 21 Observability, Performance & Reliability

**Objective:** Implement the reliability gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 210 implementation for Reliability gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 22 Security Hardening

### PHASE 211 — DEPENDENCY SECURITY

**Workstream:** 22 Security Hardening

**Objective:** Implement the dependency security capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 211 implementation for Dependency security

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 212 — SECRET DETECTION

**Workstream:** 22 Security Hardening

**Objective:** Implement the secret detection capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 212 implementation for Secret detection

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 213 — HTTP SECURITY

**Workstream:** 22 Security Hardening

**Objective:** Implement the http security capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 213 implementation for HTTP security

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 214 — RATE LIMITING

**Workstream:** 22 Security Hardening

**Objective:** Implement the rate limiting capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 214 implementation for Rate limiting

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 215 — INPUT VALIDATION

**Workstream:** 22 Security Hardening

**Objective:** Implement the input validation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 215 implementation for Input validation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 216 — AUTHORIZATION REVIEW

**Workstream:** 22 Security Hardening

**Objective:** Implement the authorization review capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 216 implementation for Authorization review

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 217 — TENANT-BOUNDARY REVIEW

**Workstream:** 22 Security Hardening

**Objective:** Implement the tenant-boundary review capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 217 implementation for Tenant-boundary review

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 218 — DOCUMENT-SECURITY REVIEW

**Workstream:** 22 Security Hardening

**Objective:** Implement the document-security review capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 218 implementation for Document-security review

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 219 — SECURITY REGRESSION SUITE

**Workstream:** 22 Security Hardening

**Objective:** Implement the security regression suite capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 219 implementation for Security regression suite

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 220 — SECURITY GATE

**Workstream:** 22 Security Hardening

**Objective:** Implement the security gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 220 implementation for Security gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 23 Testing & Quality Engineering

### PHASE 221 — UNIT TEST EXPANSION

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the unit test expansion capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 221 implementation for Unit test expansion

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 222 — INTEGRATION TEST SUITE

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the integration test suite capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 222 implementation for Integration test suite

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 223 — E2E CRITICAL PATHS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the e2e critical paths capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 223 implementation for E2E critical paths

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 224 — ACADEMIC RULE TESTS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the academic rule tests capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 224 implementation for Academic rule tests

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 225 — RESULT PROPERTY TESTS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the result property tests capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 225 implementation for Result property tests

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 226 — MIGRATION TESTS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the migration tests capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 226 implementation for Migration tests

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 227 — ACCESSIBILITY TESTS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the accessibility tests capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 227 implementation for Accessibility tests

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 228 — VISUAL REGRESSION

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the visual regression capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 228 implementation for Visual regression

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 229 — FAILURE AND RESILIENCE TESTS

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the failure and resilience tests capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 229 implementation for Failure and resilience tests

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 230 — QUALITY GATE

**Workstream:** 23 Testing & Quality Engineering

**Objective:** Implement the quality gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 230 implementation for Quality gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 24 Staging, Deployment & Release Engineering

### PHASE 231 — STAGING ARCHITECTURE

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the staging architecture capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 231 implementation for Staging architecture

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 232 — INFRASTRUCTURE AS CODE

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the infrastructure as code capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 232 implementation for Infrastructure as code

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 233 — ENVIRONMENT PROMOTION

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the environment promotion capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 233 implementation for Environment promotion

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 234 — DATABASE MIGRATION DISCIPLINE

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the database migration discipline capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 234 implementation for Database migration discipline

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 235 — BACKUP STRATEGY

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the backup strategy capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 235 implementation for Backup strategy

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 236 — RESTORE VERIFICATION

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the restore verification capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 236 implementation for Restore verification

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 237 — DISASTER RECOVERY RUNBOOK

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the disaster recovery runbook capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 237 implementation for Disaster recovery runbook

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 238 — PRODUCTION OBSERVABILITY

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the production observability capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 238 implementation for Production observability

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 239 — RELEASE CANDIDATE GATE

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the release candidate gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 239 implementation for Release candidate gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 240 — PRODUCTION READINESS ASSESSMENT

**Workstream:** 24 Staging, Deployment & Release Engineering

**Objective:** Implement the production readiness assessment capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 240 implementation for Production readiness assessment

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 25 Advanced Academic Progression

### PHASE 241 — PROMOTION RULE ENGINE

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the promotion rule engine capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 241 implementation for Promotion rule engine

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 242 — PROMOTION WORKFLOW

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the promotion workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 242 implementation for Promotion workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 243 — REPEAT-YEAR WORKFLOW

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the repeat-year workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 243 implementation for Repeat-year workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 244 — TRANSFER WORKFLOW

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the transfer workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 244 implementation for Transfer workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 245 — READMISSION WORKFLOW

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the readmission workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 245 implementation for Readmission workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 246 — GRADUATION ELIGIBILITY

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the graduation eligibility capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 246 implementation for Graduation eligibility

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 247 — ALUMNI TRANSITION

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the alumni transition capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 247 implementation for Alumni transition

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 248 — ACADEMIC STANDING

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the academic standing capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 248 implementation for Academic standing

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 249 — INTERVENTION TRACKING

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the intervention tracking capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 249 implementation for Intervention tracking

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 250 — PROGRESSION GATE

**Workstream:** 25 Advanced Academic Progression

**Objective:** Implement the progression gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 250 implementation for Progression gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 26 Advanced Examination Operations

### PHASE 251 — QUESTION AUTHORING

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the question authoring capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 251 implementation for Question authoring

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 252 — QUESTION MODERATION

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the question moderation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 252 implementation for Question moderation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 253 — PAPER ASSEMBLY

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the paper assembly capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 253 implementation for Paper assembly

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 254 — PAPER APPROVAL

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the paper approval capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 254 implementation for Paper approval

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 255 — EXAM PRINTING PACKAGE

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the exam printing package capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 255 implementation for Exam printing package

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 256 — SECURE EXAM DISTRIBUTION

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the secure exam distribution capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 256 implementation for Secure exam distribution

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 257 — ANSWER-SCRIPT TRACKING

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the answer-script tracking capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 257 implementation for Answer-script tracking

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 258 — EVALUATION WORKFLOW

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the evaluation workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 258 implementation for Evaluation workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 259 — MODERATION AND VERIFICATION

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the moderation and verification capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 259 implementation for Moderation and verification

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 260 — EXAMINATION OPERATIONS GATE

**Workstream:** 26 Advanced Examination Operations

**Objective:** Implement the examination operations gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 260 implementation for Examination operations gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 27 Advanced Results & Certificates

### PHASE 261 — RESULT MODERATION

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the result moderation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 261 implementation for Result moderation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 262 — RESULT EXCEPTION HANDLING

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the result exception handling capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 262 implementation for Result exception handling

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 263 — SUPPLEMENTARY RESULTS

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the supplementary results capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 263 implementation for Supplementary results

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 264 — RECHECK AND RETOTAL WORKFLOW

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the recheck and retotal workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 264 implementation for Recheck and retotal workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 265 — GPA AUDIT TRAIL

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the gpa audit trail capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 265 implementation for GPA audit trail

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 266 — TRANSCRIPT REGENERATION

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the transcript regeneration capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 266 implementation for Transcript regeneration

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 267 — CERTIFICATE SIGNING BOUNDARY

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the certificate signing boundary capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 267 implementation for Certificate signing boundary

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 268 — CERTIFICATE REVOCATION WORKFLOW

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the certificate revocation workflow capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 268 implementation for Certificate revocation workflow

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 269 — PUBLIC VERIFICATION SERVICE

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the public verification service capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 269 implementation for Public verification service

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 270 — CREDENTIAL GATE

**Workstream:** 27 Advanced Results & Certificates

**Objective:** Implement the credential gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 270 implementation for Credential gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 28 Student Support & Welfare

### PHASE 271 — STUDENT PROFILE EXTENSIONS

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the student profile extensions capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 271 implementation for Student profile extensions

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 272 — COUNSELLING RECORDS BOUNDARY

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the counselling records boundary capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 272 implementation for Counselling records boundary

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 273 — SPECIAL-SUPPORT PLANS

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the special-support plans capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 273 implementation for Special-support plans

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 274 — DISCIPLINE FOUNDATION

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the discipline foundation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 274 implementation for Discipline foundation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 275 — INCIDENT MANAGEMENT

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the incident management capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 275 implementation for Incident management

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 276 — STUDENT RISK FLAGS

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the student risk flags capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 276 implementation for Student risk flags

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 277 — GUARDIAN COMMUNICATIONS

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the guardian communications capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 277 implementation for Guardian communications

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 278 — STUDENT SUPPORT REFERRALS

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the student support referrals capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 278 implementation for Student support referrals

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 279 — WELFARE REPORTING

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the welfare reporting capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 279 implementation for Welfare reporting

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 280 — STUDENT-SUPPORT GATE

**Workstream:** 28 Student Support & Welfare

**Objective:** Implement the student-support gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 280 implementation for Student-support gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 29 College and +2 Expansion

### PHASE 281 — COLLEGE DEPARTMENTS

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college departments capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 281 implementation for College departments

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 282 — COLLEGE PROGRAMS

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college programs capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 282 implementation for College programs

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 283 — CREDIT AND WORKLOAD MODEL

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the credit and workload model capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 283 implementation for Credit and workload model

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 284 — SEMESTER ENROLLMENT

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the semester enrollment capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 284 implementation for Semester enrollment

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 285 — COLLEGE COURSE REGISTRATION

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college course registration capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 285 implementation for College course registration

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 286 — COLLEGE TIMETABLE ADAPTATION

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college timetable adaptation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 286 implementation for College timetable adaptation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 287 — COLLEGE GRADING ADAPTATION

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college grading adaptation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 287 implementation for College grading adaptation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 288 — COLLEGE TRANSCRIPT RULES

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college transcript rules capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 288 implementation for College transcript rules

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 289 — COLLEGE FACULTY WORKFLOWS

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college faculty workflows capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 289 implementation for College faculty workflows

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 290 — COLLEGE EXPANSION GATE

**Workstream:** 29 College and +2 Expansion

**Objective:** Implement the college expansion gate capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 290 implementation for College expansion gate

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


## 30 Final Productionization

### PHASE 291 — PRODUCTION INFRASTRUCTURE VALIDATION

**Workstream:** 30 Final Productionization

**Objective:** Implement the production infrastructure validation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 291 implementation for Production infrastructure validation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 292 — PRODUCTION DATABASE VALIDATION

**Workstream:** 30 Final Productionization

**Objective:** Implement the production database validation capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 292 implementation for Production database validation

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 293 — PRODUCTION SECURITY AUDIT

**Workstream:** 30 Final Productionization

**Objective:** Implement the production security audit capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 293 implementation for Production security audit

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 294 — PRODUCTION ACADEMIC AUDIT

**Workstream:** 30 Final Productionization

**Objective:** Implement the production academic audit capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 294 implementation for Production academic audit

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 295 — NEB INTEGRATION EVIDENCE REVIEW

**Workstream:** 30 Final Productionization

**Objective:** Implement the neb integration evidence review capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 295 implementation for NEB integration evidence review

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 296 — DATA MIGRATION REHEARSAL

**Workstream:** 30 Final Productionization

**Objective:** Implement the data migration rehearsal capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 296 implementation for Data migration rehearsal

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 297 — DISASTER RECOVERY REHEARSAL

**Workstream:** 30 Final Productionization

**Objective:** Implement the disaster recovery rehearsal capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 297 implementation for Disaster recovery rehearsal

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 298 — OPERATIONAL ACCEPTANCE TESTING

**Workstream:** 30 Final Productionization

**Objective:** Implement the operational acceptance testing capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 298 implementation for Operational acceptance testing

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 299 — PRODUCTION GO/NO-GO BOARD

**Workstream:** 30 Final Productionization

**Objective:** Implement the production go/no-go board capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 299 implementation for Production go/no-go board

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


### PHASE 300 — PRODUCTION LAUNCH AND STABILIZATION

**Workstream:** 30 Final Productionization

**Objective:** Implement the production launch and stabilization capability as defined by the Akshar foundation documents, preserving existing architecture, authorization boundaries, tenant scope, auditability, and testability.

**Implementation instructions:**

1. Read the relevant authoritative Akshar documentation before modifying code.
2. Inspect the current implementation first; reuse shared services instead of creating duplicate engines.
3. Implement only this phase and its hard dependencies. Do not pull future modules into scope.
4. Preserve authentication, authorization, tenancy, audit, validation, idempotency, concurrency, privacy, and failure behavior applicable to the feature.
5. Add automated tests for the success path and important failure/authorization/duplicate cases.
6. Update relevant documentation and `DEVELOPMENT_LOG.md` with evidence, not assumptions.
7. Run formatting, linting, type checking, tests, build, security/secret/artifact scans, and `git diff --check` as applicable.

**Deliverable:**

- Phase 300 implementation for Production launch and stabilization

**Acceptance gate:** The phase is complete only when the scoped behavior is implemented, relevant tests pass, type/lint/build checks pass, no secrets or debug artifacts are introduced, documentation reflects actual behavior, and the diff contains only this phase and its required tests/docs.

**Required checkpoint report:**

- Phase number and title
- Files changed
- Database/data-model changes
- API changes
- UI changes
- Security/authorization impact
- Tests and exact results
- Documentation updated
- Known limitations
- Git branch/commit/tree state
- Status: COMPLETE / BLOCKED / FAILED


---

# PHASE 300 — FINAL END STATE

At Phase 300, Akshar may be considered production-ready only after the actual evidence demonstrates: secure authentication; enforced tenant isolation; verified RBAC; coherent academic/curriculum/examination/result behavior; controlled documents and certificates; finance integrity; honest NEB integration status; tested migration and recovery; production observability; security review; operational acceptance; approved deployment; verified rollback; and successful stabilization monitoring.

## Final production decision rule

Do not equate '300 phases executed' with 'production ready'. The final decision must be evidence-based, with all P0 blockers closed, accepted residual risks documented, required legal/compliance approvals obtained, and deployment evidence recorded.


**END OF AKSHAR PHASE 001–300 MASTER EXECUTION PLAN**
