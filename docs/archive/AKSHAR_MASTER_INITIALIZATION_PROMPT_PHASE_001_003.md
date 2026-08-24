# AKSHAR
# MASTER PROJECT INITIALIZATION & PHASE 001–003 EXECUTION PROMPT

You are now the **primary engineering agent** responsible for initializing and architecting the AKSHAR project.

You are not being asked to immediately build random screens.

You are not being asked to generate a prototype.

You are not being asked to invent a backend.

You are not being asked to fabricate Firebase state.

Your first responsibility is to **forensically understand the project, reconcile the architecture documentation with the actual repository and Firebase state, and establish a verified engineering baseline.**

You must execute:

```text
PHASE 001
REPOSITORY FORENSIC AUDIT

        ↓

PHASE 002
FIREBASE FORENSIC AUDIT

        ↓

PHASE 003
DOCUMENTATION RECONCILIATION
```

Then STOP.

Do NOT begin Phase 004 automatically.

Do NOT begin application-feature development before Phase 003 is complete.

---

# 1. PROJECT IDENTITY

Project:

# AKSHAR

AKSHAR is a Nepal-first:

- School Management System
- Higher Secondary (+2) Management System
- College Management System
- Academic Information System
- Examination Management System
- Student/Parent/Teacher Platform
- Institution Operations Platform

AKSHAR is intended to become a serious commercial education platform for Nepal.

It must not become:

- a generic admin template
- a collection of disconnected CRUD pages
- a mock school ERP
- a demo-only application
- a fake NEB integration
- a fake analytics platform
- a frontend-only system
- a system where security exists only in the UI
- a system with multiple competing sources of truth

---

# 2. AUTHORITATIVE PROJECT SOURCES

The project has an Akshar documentation foundation.

Before making architectural or implementation decisions, read ALL of the following files:

```text
README.md
MASTER_RULES.md
PRODUCT_REQUIREMENTS.md
ARCHITECTURE.md
DATABASE.md
ACADEMIC_MODEL.md
CURRICULUM.md
EXAMINATION.md
RESULT_RULES.md
NEB_INTEGRATION.md
EDUCATION_COMPLIANCE.md
SECURITY.md
TENANCY.md
RBAC.md
API_CONTRACTS.md
DESIGN_SYSTEM.md
TESTING_STRATEGY.md
DATA_MIGRATION.md
DOCUMENT_MANAGEMENT.md
FINANCE.md
NOTIFICATIONS.md
INTEROPERABILITY.md
AI_RULES.md
OBSERVABILITY.md
DISASTER_RECOVERY.md
DEPLOYMENT.md
ROADMAP.md
DEVELOPMENT_LOG.md
PROJECT_STATUS.md
```

Also read:

```text
AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
```

This is the master 300-phase implementation roadmap.

The Phase 001–003 definitions in that roadmap are authoritative for this initialization task.

Do not silently replace them with another phase structure.

---

# 3. GITHUB REPOSITORY

Repository:

```text
https://github.com/b4snet/akshar
```

You must inspect the actual repository.

Do not assume that the repository is already correctly initialized.

Do not assume that a README accurately describes the implementation.

The repository itself is evidence.

Inspect:

```text
Git history
Branches
Tags
Working tree
README
Source files
Configuration
Environment examples
Package manifests
Build scripts
Test scripts
CI/CD
Firebase configuration
Deployment files
Infrastructure files
Documentation
Existing database configuration
Existing API configuration
Existing frontend
Existing backend
Existing functions
Existing security rules
```

If the repository contains very little code, that is valid.

Do NOT fill the repository with speculative implementation merely because it is currently empty.

---

# 4. FIREBASE PROJECT

Firebase project:

```text
akshar-nepal
```

Firebase Console:

```text
https://console.firebase.google.com/u/1/project/akshar-nepal/overview
```

You may inspect Firebase using the authorized tooling available in your environment.

Possible access methods may include:

- Firebase CLI
- authenticated Google/Firebase tooling
- MCP/connector tools
- local Firebase configuration
- emulator configuration
- project files
- authorized environment configuration

Use whatever authorized mechanism is available.

Do NOT ask the user to provide passwords or private keys.

Do NOT print:

- service account private keys
- OAuth secrets
- access tokens
- API secrets
- passwords
- signing keys
- private credentials

Do NOT write secrets to source files.

Do NOT commit secrets.

If Firebase cannot be inspected, record:

```text
FIREBASE ACCESS NOT VERIFIED
```

and clearly state why.

Never infer that Firebase features exist merely because a Firebase project URL exists.

---

# 5. MASTER EXECUTION RULE

The universal execution loop is:

```text
READ
↓
INSPECT
↓
UNDERSTAND
↓
IMPLEMENT ONLY WHAT IS REQUIRED
↓
TEST
↓
SECURITY CHECK
↓
DOCUMENT
↓
VERIFY
↓
CHECKPOINT
↓
NEXT PHASE
```

For this initialization task:

```text
PHASE 001
→ PHASE 002
→ PHASE 003
→ STOP
```

Do not continue to Phase 004.

---

# 6. GLOBAL ENGINEERING RULES

## RULE 1 — EVIDENCE OVER ASSUMPTION

When something is verified from:

- repository
- Firebase
- configuration
- runtime
- tests
- official project files

label it:

```text
CONFIRMED
```

If it exists only in documentation:

```text
DOCUMENTED
```

If partly implemented:

```text
PARTIALLY IMPLEMENTED
```

If it is mocked/fake/fixture behavior:

```text
SIMULATED
```

If it is not implemented:

```text
NOT STARTED
```

If it cannot be determined:

```text
UNKNOWN
```

Do not convert UNKNOWN into CONFIRMED.

---

# 7. DO NOT INVENT

Never invent:

- database structures
- Firebase collections
- APIs
- NEB APIs
- curriculum rules
- examination rules
- government requirements
- user permissions
- authentication providers
- existing features
- existing data
- credentials
- infrastructure
- deployment architecture

If the information is unavailable, document it as unknown.

---

# 8. DO NOT FAKE

Never fabricate:

- student records
- exam results
- GPA
- dashboard numbers
- financial numbers
- Firebase data
- API responses
- NEB synchronization
- deployment status
- security status
- production readiness

A feature is not "implemented" simply because a screen exists.

A service is not "connected" simply because an SDK package exists.

An integration is not "live" simply because an adapter file exists.

---

# 9. NO PREMATURE FEATURE DEVELOPMENT

During Phases 001–003, do NOT start building:

- student management
- teacher management
- admissions
- timetable
- attendance
- examination
- results
- finance
- library
- transport
- hostel
- AI
- analytics
- NEB integration

unless a tiny artifact is strictly required to inspect an existing implementation.

The goal of this task is **forensic discovery and reconciliation**, not broad feature construction.

---

# 10. TENANCY AND SECURITY MINDSET

Even during architecture discovery, evaluate the project through:

```text
Identity
↓
Organization
↓
Institution
↓
Campus
↓
Role
↓
Permission
↓
Scope
↓
Data
```

Security must not depend only on frontend visibility.

The long-term architecture requires actual data-level boundaries and authorization.

---

# PHASE 001
# REPOSITORY FORENSIC AUDIT

## OBJECTIVE

Perform a complete forensic audit of the actual AKSHAR repository.

The purpose is to determine:

```text
WHAT EXISTS
WHAT IS DOCUMENTED
WHAT IS IMPLEMENTED
WHAT IS PARTIALLY IMPLEMENTED
WHAT IS SIMULATED
WHAT IS MISSING
WHAT IS UNKNOWN
```

Do not make broad implementation changes during this phase.

---

## PHASE 001 — STEP 1
## Establish the exact Git baseline

Record:

- current branch
- current commit
- current HEAD
- parent commit if useful
- working-tree status
- tracked files
- ignored files where relevant
- available branches
- available tags
- recent commit history

Record whether the working tree was clean before beginning.

Do not destroy pre-existing uncommitted user work.

If unrelated user changes are present:

DO NOT overwrite them.

---

## PHASE 001 — STEP 2
## Inspect repository structure

Map the full repository.

Identify:

```text
frontend/
backend/
src/
app/
functions/
firebase/
infra/
database/
docs/
scripts/
tests/
.github/
```

or whatever actually exists.

Do not assume those directories exist.

Report the actual structure.

---

## PHASE 001 — STEP 3
## Inspect technology stack

Identify actual technologies from:

- package manifests
- framework configuration
- build files
- source imports
- lockfiles
- CI configuration

Determine:

```text
Frontend framework
Frontend language
Backend framework
Backend language
Database
Firebase products
Authentication
Storage
Queues
Search
Testing
Build tooling
Deployment target
```

Do not infer the stack from filenames alone.

---

## PHASE 001 — STEP 4
## Inspect configuration

Review:

- `.env.example`
- configuration files
- Firebase configuration
- build configuration
- TypeScript configuration
- lint configuration
- testing configuration
- deployment configuration
- CI configuration

Do NOT expose secrets.

If secrets are found:

1. do not print them
2. do not include them in reports
3. identify only that a secret exposure exists
4. classify it as a security issue
5. recommend rotation/remediation

---

## PHASE 001 — STEP 5
## Inspect application implementation

Determine what actually exists.

Inspect:

### Frontend

- routes
- layouts
- components
- pages
- API clients
- state management
- auth logic
- form handling
- design system
- error handling

### Backend

If present:

- routes
- controllers
- services
- domain logic
- models
- migrations
- authentication
- authorization
- validation
- jobs
- integrations

### Firebase

If configuration exists in repository:

- SDK usage
- collections/references
- Functions
- Firestore rules
- Storage rules
- Hosting
- indexes
- emulators

---

## PHASE 001 — STEP 6
## Inspect tests

Determine:

- test framework
- existing tests
- unit tests
- integration tests
- E2E tests
- Firebase emulator tests
- security-rule tests
- accessibility tests
- build checks
- CI checks

Do not simply count test files.

Determine what they actually test.

---

## PHASE 001 — STEP 7
## Inspect implementation maturity

For each major system, classify:

```text
NOT STARTED
DESIGNED
PARTIALLY IMPLEMENTED
IMPLEMENTED
TESTED
VERIFIED
SIMULATED
UNKNOWN
```

Major systems:

```text
Authentication
Identity
Organization
Institution
Campus
RBAC
Tenancy
Academic Year
Academic Structure
Curriculum
Students
Teachers
Admissions
Attendance
Timetable
Assessment
Examination
Results
Documents
Finance
Notifications
Library
Transport
Hostel
HR
Analytics
AI
NEB
Integrations
Deployment
Monitoring
DR
```

Do not claim something is implemented merely because a route exists.

---

## PHASE 001 — STEP 8
## Compare code to documentation

For each documented feature:

```text
Documentation Requirement
        ↓
Actual Repository Evidence
        ↓
Status
        ↓
Gap
```

Find:

- features documented but absent
- features implemented but undocumented
- contradictory behavior
- duplicated implementations
- stale documentation
- mock implementations presented as real
- missing tests
- security gaps

---

## PHASE 001 — REQUIRED DELIVERABLE

Create:

```text
AKSHAR_REPOSITORY_AUDIT.md
```

It must include:

### 1. Exact baseline

```text
Branch
HEAD
Working tree
Repository status
```

### 2. Repository structure

Actual directory/file map.

### 3. Technology stack

Actual technologies discovered.

### 4. Frontend state

Actual evidence.

### 5. Backend state

Actual evidence.

### 6. Firebase-related state

Only repository-observable Firebase configuration.

### 7. Tests

Actual test suites and coverage areas.

### 8. Deployment

Actual deployment configuration.

### 9. Feature matrix

Use:

```text
Feature
Documented
Implemented
Tested
Verified
Status
Evidence
Gap
```

### 10. Security findings

Only evidence-backed findings.

### 11. Data/model findings

### 12. Duplicate systems

### 13. Fake/simulated functionality

### 14. External dependencies

### 15. P0 issues

### 16. P1 issues

### 17. P2 issues

### 18. P3 issues

### 19. Unknowns

### 20. Recommended remediation

---

## PHASE 001 ACCEPTANCE GATE

Do not proceed to Phase 002 until:

- repository baseline is captured
- repository structure is understood
- actual technology stack is documented
- existing application code is inspected
- existing tests are inspected
- configuration is inspected
- repository/documentation gaps are recorded
- secrets are not exposed
- no unrelated code is changed
- `AKSHAR_REPOSITORY_AUDIT.md` exists
- findings are evidence-backed

A mostly empty repository is a valid finding.

Do not artificially add implementation just to make the repository look mature.

---

# PHASE 002
# FIREBASE FORENSIC AUDIT

## OBJECTIVE

Determine the actual state of the Firebase project associated with:

```text
akshar-nepal
```

You must determine what actually exists.

Not what you think should exist.

Not what the documentation says should exist.

Not what the Firebase console URL implies exists.

---

## PHASE 002 — STEP 1
## Verify project access

Determine whether authorized access is available.

Record:

```text
Firebase access:
VERIFIED
or
NOT VERIFIED
```

If not verified:

do not fabricate findings.

---

## PHASE 002 — STEP 2
## Inspect Firebase Authentication

Determine:

- enabled authentication providers
- configured sign-in methods
- authorized domains if safely inspectable
- user-management configuration
- existing application integration
- development/test authentication
- password auth
- Google or other providers
- MFA-related capabilities if actually present

Do not expose individual user credentials.

Do not dump users unnecessarily.

---

## PHASE 002 — STEP 3
## Inspect Firestore

Determine:

- whether Firestore exists
- database mode if observable
- regions if observable
- collections
- document structures
- naming conventions
- indexes
- security rules
- existing application usage
- tenant-related data structures
- student-related data structures
- academic structures
- duplicated/parallel data models

Do not dump sensitive student or user data into the audit report.

Describe structures, not private records.

---

## PHASE 002 — STEP 4
## Inspect Realtime Database

If present:

determine:

- whether it is used
- paths
- security rules
- actual application usage
- duplication with Firestore

If absent:

record:

`NOT CONFIGURED / NOT VERIFIED`

Do not assume absence without evidence.

---

## PHASE 002 — STEP 5
## Inspect Firebase Storage

Determine:

- whether Storage is enabled
- current rules
- bucket configuration if safely available
- usage patterns
- document/image storage
- public access risks
- authenticated access patterns

Do not expose file contents unnecessarily.

---

## PHASE 002 — STEP 6
## Inspect Cloud Functions

If present:

inspect:

- function names
- triggers
- HTTP functions
- scheduled functions
- authentication triggers
- Firestore triggers
- Storage triggers
- external services
- environment configuration

Determine:

```text
REAL
MOCK
UNUSED
PARTIAL
UNKNOWN
```

---

## PHASE 002 — STEP 7
## Inspect Firebase Hosting

Determine:

- hosting sites
- build/deploy configuration
- SPA rewrites
- deployment scripts
- domains
- preview environments if available

Do not deploy anything during this phase.

---

## PHASE 002 — STEP 8
## Inspect App Check

Determine whether App Check is:

```text
Enabled
Disabled
Configured
Partially configured
Unknown
```

Do not enable production security settings blindly.

---

## PHASE 002 — STEP 9
## Inspect Firebase security rules

Review:

```text
Firestore rules
Storage rules
Realtime Database rules
Functions authorization
```

Evaluate whether the rules are:

- permissive
- scoped
- tenant-aware
- authenticated
- role-aware
- vulnerable to cross-organization access
- vulnerable to client-side privilege escalation

Do not modify production rules during forensic discovery unless required for a narrowly defined safety remediation and explicitly permitted by the execution environment.

---

## PHASE 002 — STEP 10
## Determine architectural role of Firebase

This is critical.

Determine whether Firebase is intended to be:

```text
Authentication only

Authentication + Firestore

Authentication + Storage

Full application backend

Realtime/event layer

Hosting layer

Mixed architecture

Unknown
```

Do not assume Firebase must be used for every subsystem.

Do not introduce another database just because you prefer it.

Do not remove Firebase merely because another database is common.

The correct decision must be evidence-based and reconciled with Akshar's architecture documents.

---

## PHASE 002 — REQUIRED DELIVERABLE

Create:

```text
AKSHAR_FIREBASE_AUDIT.md
```

It must contain:

### 1. Firebase access status

### 2. Project identity

### 3. Authentication state

### 4. Firestore state

### 5. Realtime Database state

### 6. Storage state

### 7. Functions state

### 8. Hosting state

### 9. App Check state

### 10. Security rules findings

### 11. Current application usage

### 12. Existing data-model findings

### 13. Duplicate sources of truth

### 14. External integrations

### 15. Security findings

### 16. Architecture implications

### 17. P0 issues

### 18. P1 issues

### 19. P2 issues

### 20. P3 issues

### 21. UNKNOWN items

### 22. Recommended architecture decision

Do not recommend migrations purely because another technology is more familiar.

---

## PHASE 002 ACCEPTANCE GATE

Do not proceed to Phase 003 until:

- Firebase access status is explicit
- actual Firebase services are identified
- authentication state is inspected
- database state is inspected
- storage state is inspected
- functions are inspected if present
- hosting is inspected if present
- rules are inspected
- security findings are documented
- no secrets are exposed
- no production deployment is changed
- `AKSHAR_FIREBASE_AUDIT.md` exists

---

# PHASE 003
# DOCUMENTATION RECONCILIATION

## OBJECTIVE

Now reconcile the **29 Akshar foundation documents + 300-phase roadmap** against:

```text
Actual GitHub repository
+
Actual Firebase state
+
Actual implementation
```

This is the bridge between documentation and implementation.

Do not simply summarize the documents.

Find conflicts.

---

# PHASE 003 — STEP 1
## Read the documentation set together

Read:

```text
README.md
MASTER_RULES.md
PRODUCT_REQUIREMENTS.md
ARCHITECTURE.md
DATABASE.md
ACADEMIC_MODEL.md
CURRICULUM.md
EXAMINATION.md
RESULT_RULES.md
NEB_INTEGRATION.md
EDUCATION_COMPLIANCE.md
SECURITY.md
TENANCY.md
RBAC.md
API_CONTRACTS.md
DESIGN_SYSTEM.md
TESTING_STRATEGY.md
DATA_MIGRATION.md
DOCUMENT_MANAGEMENT.md
FINANCE.md
NOTIFICATIONS.md
INTEROPERABILITY.md
AI_RULES.md
OBSERVABILITY.md
DISASTER_RECOVERY.md
DEPLOYMENT.md
ROADMAP.md
DEVELOPMENT_LOG.md
PROJECT_STATUS.md
```

Also read:

```text
AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md
```

Treat them as one architecture contract.

---

# PHASE 003 — STEP 2
## Build a documentation dependency map

Determine relationships such as:

```text
MASTER_RULES
    ↓
ARCHITECTURE
    ↓
DATABASE
    ↓
API
    ↓
SECURITY
    ↓
RBAC
    ↓
FEATURE DOMAINS
```

And:

```text
ACADEMIC_MODEL
    ↓
CURRICULUM
    ↓
ASSESSMENT
    ↓
EXAMINATION
    ↓
RESULT_RULES
    ↓
NEB_INTEGRATION
```

And:

```text
TENANCY
    ↓
RBAC
    ↓
DATA
    ↓
API
    ↓
UI
```

Identify missing links.

---

# PHASE 003 — STEP 3
## Identify contradictions

Find contradictions such as:

```text
Document A says X
Document B says Y
Actual repository does Z
Firebase does W
```

For each contradiction record:

```text
Conflict
Documents affected
Actual evidence
Risk
Recommended resolution
Required decision
```

Do NOT silently choose one.

---

# PHASE 003 — STEP 4
## Identify documentation gaps

Find requirements that do not contain enough detail to safely implement.

Examples:

- missing field definitions
- undefined lifecycle states
- undefined ownership
- missing permission
- unclear authority
- ambiguous grading rule
- unspecified external integration
- undefined error behavior
- unclear migration behavior

Classify:

```text
BLOCKING
NON-BLOCKING
```

---

# PHASE 003 — STEP 5
## Identify implementation gaps

Compare desired architecture against actual repository/Firebase.

Create a matrix:

```text
Domain
Required
Documented
Exists
Implemented
Tested
Verified
Gap
Priority
```

Domains:

```text
Platform
Authentication
Identity
Organization
Institution
Campus
Tenancy
RBAC
Academic Year
Academic Structure
Curriculum
Students
Teachers
Admissions
Timetable
Attendance
Assessment
Examination
Results
Documents
Finance
Notifications
Library
Transport
Hostel
HR
Analytics
Interoperability
NEB
AI
Observability
Deployment
DR
```

---

# PHASE 003 — STEP 6
## Identify duplicate systems

Look specifically for multiple implementations of:

```text
Authentication
Identity
Student
User
Authorization
Documents
Notifications
Search
Payments
Academic records
Results
Firebase data
Other database data
```

If duplicates exist, document:

```text
System A
System B
Why duplication exists
Which should become canonical
Migration risk
```

Do not automatically delete anything.

---

# PHASE 003 — STEP 7
## Identify simulated functionality

Find:

- mock APIs
- fake dashboard numbers
- hard-coded data
- demo login paths
- fake payment success
- fake result success
- fake NEB sync
- placeholder analytics
- temporary bypass permissions

Classify each as:

```text
DEVELOPMENT FIXTURE
MOCK
SIMULATION
PRODUCTION RISK
```

---

# PHASE 003 — STEP 8
## Determine the canonical architecture

After the reconciliation, define the architecture that should be treated as canonical.

It must explicitly answer:

### Frontend

What framework and architecture are authoritative?

### Backend

Where does business logic live?

### Data

What is the authoritative source of truth?

### Firebase

What responsibility does Firebase have?

### Authentication

Where does identity/session authority live?

### Authorization

Where are permissions enforced?

### Tenancy

Where is tenant isolation enforced?

### Files

Where are documents stored?

### Notifications

Where are notifications orchestrated?

### Search

Where does global search come from?

### Jobs

Where do asynchronous tasks run?

### Integrations

Where do external-system adapters live?

---

# PHASE 003 — REQUIRED DELIVERABLE

Create:

```text
AKSHAR_DOCUMENTATION_RECONCILIATION.md
```

It must contain:

## 1. Executive summary

## 2. Repository baseline

## 3. Firebase baseline

## 4. Documentation baseline

## 5. Architecture dependency map

## 6. Documentation contradictions

## 7. Documentation gaps

## 8. Implementation gaps

## 9. Duplicate systems

## 10. Simulated functionality

## 11. Security issues

## 12. Data integrity issues

## 13. Tenant/RBAC issues

## 14. Academic architecture issues

## 15. Curriculum issues

## 16. Examination issues

## 17. Result-rule issues

## 18. NEB integration issues

## 19. Firebase architecture decision

## 20. Frontend architecture decision

## 21. Backend architecture decision

## 22. Database architecture decision

## 23. API architecture decision

## 24. Testing architecture decision

## 25. Deployment architecture decision

## 26. P0 issues

## 27. P1 issues

## 28. P2 issues

## 29. P3 issues

## 30. UNKNOWN items

## 31. Resolved decisions

## 32. Decisions requiring the user

## 33. Canonical target architecture

## 34. Recommended Phase 004 starting point

---

# PHASE 003 — DO NOT OVERWRITE THE FOUNDATION BLINDLY

If you discover a problem in the original documentation:

Do NOT silently rewrite all 29 documents.

Instead:

1. identify the conflict
2. document the evidence
3. explain the consequence
4. propose the corrected architecture
5. identify affected documents
6. make the minimum justified documentation correction if safe
7. record the change in `DEVELOPMENT_LOG.md`

Preserve traceability.

---

# PHASE 003 — ACCEPTANCE GATE

Phase 003 is complete only when:

- every foundation document has been reviewed
- the 300-phase roadmap has been reviewed
- repository findings have been compared against the documents
- Firebase findings have been compared against the documents
- contradictions are documented
- gaps are documented
- duplicate systems are documented
- simulated functionality is documented
- security issues are documented
- academic-domain issues are documented
- NEB boundaries are documented
- canonical architecture is documented
- P0 blockers are known
- decisions required from the user are explicitly listed
- recommended Phase 004 starting point is defined

---

# PHASE 003 FINAL CHECKPOINT

Create:

```text
AKSHAR_PHASE_001_003_INITIALIZATION_REPORT.md
```

Include:

```text
1. Exact repository baseline

2. Exact Firebase inspection status

3. Repository architecture

4. Firebase architecture

5. Documentation status

6. Technology stack

7. Current implementation matrix

8. Canonical architecture

9. Database strategy

10. Authentication strategy

11. Authorization strategy

12. Tenancy strategy

13. Academic architecture

14. Curriculum architecture

15. Examination architecture

16. Result architecture

17. NEB integration boundary

18. Security findings

19. Data integrity findings

20. Duplicate systems

21. Simulated functionality

22. P0 blockers

23. P1 issues

24. P2 issues

25. P3 issues

26. UNKNOWN items

27. Decisions requiring user input

28. Recommended Phase 004 scope
```

---

# FINAL PHASE 001–003 RELEASE GATE

Before stopping, execute:

```text
Repository integrity check
Git status check
Documentation consistency check
Secret scan
Debug artifact scan
Configuration scan
Dependency scan where applicable
Type check where applicable
Lint where applicable
Test suite where applicable
Build check where applicable
```

Do not claim a check passed unless it actually ran.

Record exact results.

---

# REQUIRED FINAL REPORT

At the end, output:

```text
# AKSHAR — PHASE 001–003 INITIALIZATION CHECKPOINT

## Current Repository

Branch:
HEAD:
Working tree:

## Phase 001

Status:
Repository audit:
P0:
P1:
P2:
P3:

## Phase 002

Status:
Firebase access:
Authentication:
Firestore:
Realtime Database:
Storage:
Functions:
Hosting:
Security Rules:

## Phase 003

Status:
Documentation reconciliation:
Contradictions:
Gaps:
Duplicates:
Simulated features:
Security issues:
P0:
P1:
P2:
P3:

## Canonical Architecture

Frontend:
Backend:
Database:
Firebase:
Authentication:
Authorization:
Tenancy:
Storage:
Notifications:
Search:
Jobs:
Integrations:

## Required User Decisions

- ...
- ...

## Phase 004 Recommendation

- ...

## Evidence

Tests:
Typecheck:
Lint:
Build:
Security scan:
Secret scan:
Artifact scan:
Git diff check:

## Final Status

PHASE 001–003 COMPLETE

or

PHASE 001–003 BLOCKED

or

PHASE 001–003 FAILED
```

---

# ABSOLUTE STOP CONDITION

After producing:

```text
AKSHAR_REPOSITORY_AUDIT.md
AKSHAR_FIREBASE_AUDIT.md
AKSHAR_DOCUMENTATION_RECONCILIATION.md
AKSHAR_PHASE_001_003_INITIALIZATION_REPORT.md
```

STOP.

Do NOT start Phase 004.

Do NOT begin:

- Authentication implementation
- Student implementation
- Academic-year implementation
- Curriculum implementation
- Timetable implementation
- Attendance implementation
- Examination implementation
- Finance implementation
- AI implementation
- NEB implementation

unless Phase 004 is explicitly started under the next execution instruction.

---

# THE MOST IMPORTANT PRINCIPLE

This project must be built as:

```text
EVIDENCE
↓
ARCHITECTURE
↓
DATA MODEL
↓
SECURITY
↓
BUSINESS RULES
↓
IMPLEMENTATION
↓
TESTING
↓
PRODUCTION EVIDENCE
```

Never:

```text
UI
↓
GUESS
↓
PATCH
↓
FAKE
```

You are initializing a long-lived education platform.

The quality of Phase 001–003 determines the quality of the next 297 phases.

Therefore:

# DO NOT RUSH PHASE 001–003.

# DO NOT INVENT WHAT YOU CANNOT VERIFY.

# DO NOT BUILD FEATURES BEFORE THE ARCHITECTURE IS RECONCILED.

# READ THE REPOSITORY.

# INSPECT FIREBASE.

# RECONCILE THE DOCUMENTATION.

# PRODUCE EVIDENCE.

# THEN STOP.

END OF MASTER INITIALIZATION PROMPT.