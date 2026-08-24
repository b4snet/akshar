# AKSHAR_REPOSITORY_AUDIT.md
# PHASE 001 — REPOSITORY FORENSIC AUDIT

Audit date: 2026-08-24 (local time, Asia/Kathmandu offset environment)
Audited repository: `https://github.com/b4snet/akshar`
Audit clone used for inspection: `C:\Users\dipso\AppData\Local\Temp\opencode\akshar-repo` (read-only forensic clone; no changes pushed)

Evidence labels used: CONFIRMED / DOCUMENTED / PARTIALLY IMPLEMENTED / SIMULATED / NOT STARTED / UNKNOWN.

---

## 1. Exact baseline

```text
Remote:            https://github.com/b4snet/akshar  (public)
Default branch:    main
Branches:          main only (origin/HEAD -> origin/main)
Tags:              none
HEAD:              87a5b6e0bd7abd9092f3e9bbc27d5bc1d23c043b
Commit message:    "Initial commit"
Commit count:      1 (repository has exactly one commit)
Parents:           none (root commit)
Working tree:      clean (git status --porcelain = empty)
GitHub metadata:   created 2026-08-24T00:33:21Z, last push 2026-08-24T00:33:22Z,
                   size reported as 0 KB, language field empty
```

The repository was created via the GitHub web UI on the same day this audit ran. The single commit contains exactly one file.

Local working folder note: `C:\Users\dipso\OneDrive\Desktop\Akshar` is **not** a git repository. It holds the three planning documents (master initialization prompt, foundation all-in-one, 300-phase execution plan). No pre-existing uncommitted user work was destroyed; nothing in that folder was modified.

---

## 2. Repository structure

Complete tracked file list (`git ls-files`):

```text
README.md
```

Top level of working tree:

```text
.git/          (git metadata)
README.md      (1 line)
```

Actual findings vs. assumed directories:

| Assumed path        | Exists | Evidence            |
|---------------------|--------|---------------------|
| frontend/           | NO     | git ls-files        |
| backend/            | NO     | git ls-files        |
| src/, app/          | NO     | git ls-files        |
| functions/          | NO     | git ls-files        |
| firebase/           | NO     | git ls-files        |
| infra/              | NO     | git ls-files        |
| database/           | NO     | git ls-files        |
| docs/               | NO     | git ls-files        |
| scripts/            | NO     | git ls-files        |
| tests/              | NO     | git ls-files        |
| .github/ (CI)       | NO     | git ls-files + tree |

`README.md` content (entire file):

```text
# Akshar-
```

This is a placeholder heading with a trailing hyphen, consistent with a default repo-name-derived title typed at repository creation.

A mostly empty repository is a valid finding. No speculative implementation was added by this audit.

---

## 3. Technology stack

**CONFIRMED from repository evidence: NONE.**

There are no package manifests, lockfiles, build files, source imports, framework configs, or CI configs from which a stack can be confirmed.

**DOCUMENTED technology direction** (from foundation docs `README.md` §Technology direction and `ARCHITECTURE.md` §1 — present only in the local all-in-one document, NOT in any repository):

```text
Frontend:    React + TypeScript + Vite SPA
Backend:     Laravel / PHP as sole business API
Database:    PostgreSQL (with RLS)
Cache/Queue: Redis
Storage:     S3-compatible object storage
Optional AI: provider-agnostic Python/FastAPI inference layer
Externals:   adapter-based integration boundary (NEB, payments, SMS/email/WhatsApp)
Firebase:    NOT MENTIONED ANYWHERE in the 29 foundation documents
```

Status classification: the documented stack is DOCUMENTED ONLY — NOT STARTED.

Local machine tooling observed (environment fact, not repository evidence): git 2.55.0, Node v26.7.0, npm 11.19.0, PHP 8.4.24 CLI present; psql absent; Firebase CLI absent; gh CLI absent.

---

## 4. Frontend state

NOT STARTED. No routes, layouts, components, pages, API clients, state management, auth logic, forms, design system implementation, or error handling exist anywhere in the repository. CONFIRMED by exhaustive `git ls-files` (single file).

---

## 5. Backend state

NOT STARTED. No routes, controllers, services, domain logic, models, migrations, authentication, authorization, validation, jobs, or integrations exist. No composer.json, no artisan, no app code. CONFIRMED by exhaustive file list.

---

## 6. Firebase-related state (repository-observable)

CONFIRMED ABSENT within the repository:

- no firebase.json, .firebaserc, firestore.rules, storage.rules, firestore.indexes.json
- no functions/ directory
- no Firebase SDK dependency manifests (no manifests exist at all)
- no emulator configuration

Repository-level conclusion: the repository contains zero Firebase configuration. Whether the cloud project `akshar-nepal` exists and what it contains is covered separately in AKSHAR_FIREBASE_AUDIT.md (access not verified).

---

## 7. Tests

NONE. CONFIRMED: no test frameworks, suites, or test files exist. Nothing to count and nothing that tests anything.

---

## 8. Deployment

NONE. CONFIRMED: no CI/CD (.github/workflows absent), no Dockerfile, no IaC, no hosting configuration, no deployment scripts, no release tooling.

---

## 9. Feature matrix

Legend — Documented: described in the 29-foundation-document contract (all-in-one local copy). Implemented/Tested/Verified: evidence found in repository.

| Feature / System        | Documented | Implemented | Tested | Verified | Status               | Evidence                    | Gap                                  |
|-------------------------|------------|-------------|--------|----------|----------------------|-----------------------------|--------------------------------------|
| Authentication          | Yes        | No          | No     | No       | DOCUMENTED           | ARCHITECTURE/RBAC/SECURITY  | Entire subsystem                     |
| Identity                | Yes        | No          | No     | No       | DOCUMENTED           | RBAC.md, DATABASE.md        | Entire subsystem                     |
| Organization            | Yes        | No          | No     | No       | DOCUMENTED           | TENANCY/DATABASE            | Entire subsystem                     |
| Institution             | Yes        | No          | No     | No       | DOCUMENTED           | TENANCY/DATABASE            | Entire subsystem                     |
| Campus                  | Yes        | No          | No     | No       | DOCUMENTED           | TENANCY/DATABASE            | Entire subsystem                     |
| RBAC                    | Yes        | No          | No     | No       | DOCUMENTED           | RBAC.md                     | Entire subsystem                     |
| Tenancy                 | Yes        | No          | No     | No       | DOCUMENTED           | TENANCY.md                  | Entire subsystem incl. RLS           |
| Academic Year           | Yes        | No          | No     | No       | DOCUMENTED           | ACADEMIC_MODEL/DATABASE     | Entire subsystem                     |
| Academic Structure      | Yes        | No          | No     | No       | DOCUMENTED           | ACADEMIC_MODEL              | Entire subsystem                     |
| Curriculum              | Yes        | No          | No     | No       | DOCUMENTED           | CURRICULUM.md               | Entire subsystem                     |
| Students                | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ/DATABASE        | Entire subsystem                     |
| Teachers                | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| Admissions              | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ/DATABASE        | Entire subsystem                     |
| Attendance              | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| Timetable               | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ/DATABASE        | Entire subsystem                     |
| Assessment              | Yes        | No          | No     | No       | DOCUMENTED           | RESULT_RULES/DATABASE       | Entire subsystem                     |
| Examination             | Yes        | No          | No     | No       | DOCUMENTED           | EXAMINATION.md              | Entire subsystem                     |
| Results                 | Yes        | No          | No     | No       | DOCUMENTED           | RESULT_RULES.md             | Entire subsystem                     |
| Documents               | Yes        | No          | No     | No       | DOCUMENTED           | DOCUMENT_MANAGEMENT.md      | Entire subsystem                     |
| Finance                 | Yes        | No          | No     | No       | DOCUMENTED           | FINANCE.md                  | Entire subsystem                     |
| Notifications           | Yes        | No          | No     | No       | DOCUMENTED           | NOTIFICATIONS.md            | Entire subsystem                     |
| Library                 | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| Transport               | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| Hostel                  | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| HR                      | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ                 | Entire subsystem                     |
| Analytics               | Yes        | No          | No     | No       | DOCUMENTED           | PRODUCT_REQ/OBSERVABILITY   | Entire subsystem                     |
| AI                      | Yes        | No          | No     | No       | DOCUMENTED           | AI_RULES.md                 | Entire subsystem                     |
| NEB                     | Yes        | No          | No     | No       | DOCUMENTED           | NEB_INTEGRATION.md          | Entire boundary (by design adapter-only) |
| Integrations            | Yes        | No          | No     | No       | DOCUMENTED           | INTEROPERABILITY.md         | Entire subsystem                     |
| Deployment              | Yes        | No          | No     | No       | DOCUMENTED           | DEPLOYMENT.md               | Entire pipeline                      |
| Monitoring              | Yes        | No          | No     | No       | DOCUMENTED           | OBSERVABILITY.md            | Entire subsystem                     |
| DR                      | Yes        | No          | No     | No       | DOCUMENTED           | DISASTER_RECOVERY.md        | Entire subsystem                     |

This matrix matches PROJECT_STATUS.md's own claim ("documentation baseline prepared; production code implementation not yet proven") — documentation and reality are aligned on emptiness.

---

## 10. Security findings

Evidence-backed findings only:

1. **No secrets exposure in repository** — the repo contains one README line; nothing to leak. CONFIRMED.
2. **No security surface exists** — no auth, no rules, no endpoints to harden yet. CONFIRMED.
3. **Foundation documentation set is outside version control** — the authoritative 29-document engineering contract exists only as `AKSHAR_FOUNDATION_ALL_IN_ONE.md` inside a non-git OneDrive Desktop folder. Single-copy loss/drift risk; no history; no review trail. Classified: process/security governance risk (P1).
4. **Repo identity mismatch** — public repo titled "Akshar-" placeholder while the product contract describes a commercial platform holding sensitive student data. When real data-bearing work begins, repo visibility settings, branch protection, and secret scanning should be configured (P2 recommendation for Phase 004+).

No secrets were printed during this audit.

---

## 11. Data/model findings

- The documented logical model (DATABASE.md: organizations → institutions → campuses → academic_years … audit_events) has zero physical counterpart. All tables are NOT STARTED.
- No migrations, no schema SQL, no ORM models, no seed data exist.
- No duplicate/parallel data models exist (nothing exists).

---

## 12. Duplicate systems

None found — there is no code. CONFIRMED vacuously.

---

## 13. Fake/simulated functionality

None found — there is no application code, therefore no mock dashboards, fake payments, demo logins, or simulated NEB sync. CONFIRMED vacuously.

---

## 14. External dependencies

Repository-declared dependencies: NONE (no manifest).
Documented future external touchpoints (DOCUMENTED only): CDC curriculum sources, NEB publications/exchanges, payment providers, SMS/Email/WhatsApp providers, S3-compatible storage, Redis, PostgreSQL.
Runtime dependencies observed in local environment: git, Node 26, npm 11, PHP 8.4 CLI. Missing locally for the documented stack: composer, PostgreSQL server/client, Firebase CLI, gh CLI.

---

## 15. P0 issues

1. **P0-1 — Canonical home unresolved.** The authoritative engineering contract lives outside version control; the GitHub repository is empty. Until the foundation documents are committed to (or referenced by) the canonical repository and Phase 004 bootstrap begins there, every subsequent phase lacks an anchor. Blocks Phase 004 start quality.

## 16. P1 issues

1. **P1-1 — Zero implementation baseline.** Every subsystem is NOT STARTED; expected at this stage but must be stated: no code, no schema, no CI, no tests.
2. **P1-2 — Backend architecture decision pending (cross-ref Phase 003).** Foundation docs mandate Laravel + PostgreSQL; the master initialization prompt additionally introduces Firebase project `akshar-nepal`. The repository provides no evidence for either direction. This decision gates Phases 005–010 design choices.
3. **P1-3 — Toolchain absent.** No install/lint/typecheck/test/build/reset/seed scripts exist (Phase 004 scope), and several required local tools (PostgreSQL, composer) are missing from the environment.

## 17. P2 issues

1. **P2-1 — Placeholder README** ("# Akshar-") misrepresents project identity; must be replaced with the documented README when the repo becomes canonical.
2. **P2-2 — Repository governance unconfigured**: single unprotected branch, no CODEOWNERS, no branch protection, no secret scanning, no license file.

## 18. P3 issues

1. **P3-1 — Trailing-hyphen repo name artifact** suggests hasty creation; cosmetic.
2. **P3-2 — Citation glyph artifacts** in the local foundation document (31 private-use characters across 8 lines) — documentation hygiene, tracked under Phase 003 report.

## 19. Unknowns

- Whether other branches/forks/PRs exist beyond what anonymous API access shows (branches endpoint returned only `main`; PR list requires no auth for public repos but was not material to an empty repo).
- Whether the owner maintains additional private repositories related to Akshar.
- Anything about the Firebase cloud project (see AKSHAR_FIREBASE_AUDIT.md — access NOT VERIFIED).
- Who/what created the initial commit (web UI inferred from timing/content; not verifiable anonymously).

## 20. Recommended remediation

1. Resolve P0-1: designate `github.com/b4snet/akshar` (main) as the canonical repository; commit the 29 foundation documents (split into individual files per the all-in-one's own claim that "individual files remain canonical"), plus MASTER_EXECUTION_PLAN, under `/docs`.
2. Execute Phase 004 (Toolchain Bootstrap) immediately after user confirms the backend architecture decision (see reconciliation report D1).
3. Replace placeholder README with the documented product README.
4. Enable branch protection on main, add `.gitignore`, LICENSE, and secret scanning before first code push.
5. Install/configure missing local tools required by the documented stack (composer, PostgreSQL client/server or container runtime) as part of Phase 004/008.

---

## PHASE 001 ACCEPTANCE GATE — STATUS

- Repository baseline captured — DONE
- Structure understood — DONE (empty-by-design)
- Technology stack documented — DONE (none confirmed; stack documented-only)
- Existing application code inspected — DONE (none exists)
- Existing tests inspected — DONE (none exist)
- Configuration inspected — DONE (none exists)
- Repository/documentation gaps recorded — DONE (this file + reconciliation)
- Secrets not exposed — CONFIRMED (no secrets encountered)
- No unrelated code changed — CONFIRMED (only read-only operations; new deliverable docs added to local folder)
- AKSHAR_REPOSITORY_AUDIT.md exists — YES (this file)
- Findings evidence-backed — YES (every claim cites a command result above)

PHASE 001 COMPLETE.
