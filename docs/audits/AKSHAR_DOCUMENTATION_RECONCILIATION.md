# AKSHAR_DOCUMENTATION_RECONCILIATION.md
# PHASE 003 — DOCUMENTATION RECONCILIATION

Date: 2026-08-24
Inputs reconciled:

```text
1. AKSHAR - MASTER PROJECT INITIALIZATION PROMPT - PHASE 001 TO PHASE 003.md   (local)
2. AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md                               (local)
3. AKSHAR_FOUNDATION_ALL_IN_ONE.md                                             (local; concatenation of the 29 foundation documents)
4. github.com/b4snet/akshar  @ 87a5b6e                                          (actual repository — empty)
5. Firebase project akshar-nepal                                                (NOT VERIFIED — see AKSHAR_FIREBASE_AUDIT.md)
```

---

## 1. Executive summary

The Akshar project currently consists of a **mature, internally consistent 29-document engineering contract** and a **300-phase execution roadmap**, with **zero implementation**: the GitHub repository contains one placeholder README line, and the named Firebase project could not be inspected (access not verified).

Reconciliation verdict:

- The foundation set is **aligned with reality** in one crucial respect: PROJECT_STATUS.md and DEVELOPMENT_LOG.md explicitly claim documentation-only status, which matches the empty repository exactly. No document overclaims implementation.
- The single **material contradiction** is architectural: the master initialization prompt introduces Firebase (`akshar-nepal`) as a first-class system to be audited, while the entire foundation contract specifies Laravel + PostgreSQL(RLS) as the sole business backend and never mentions Firebase at all. This must be resolved by an explicit owner decision (D1) before Phases 005+ fix data-layer design.
- Secondary conflicts are hygiene-level: placeholder repo README, phase-naming collision between ROADMAP.md (Phases 0–10) and the 300-phase plan (Phases 001–300), broken citation glyphs inherited into several foundation docs, and the fact that the "canonical individual" foundation files exist nowhere on disk or in git — only the all-in-one concatenation does.
- No duplicate systems and no simulated functionality exist (there is no code). No secrets were exposed during any phase of this work.

Recommended path: resolve D1/D2/D3 (Section 32), then begin Phase 004 Toolchain Bootstrap against the documented stack.

## 2. Repository baseline

Summarized from AKSHAR_REPOSITORY_AUDIT.md:

```text
github.com/b4snet/akshar — public — branch main only
HEAD 87a5b6e0bd7abd9092f3e9bbc27d5bc1d23c043b ("Initial commit", root, created/pushed 2026-08-24T00:33Z)
Contents: README.md = "# Akshar-"   (one line)
No code, no manifests, no CI, no tests, no config, no tags.
Local folder Desktop\Akshar holds planning docs and is NOT under version control.
```

## 3. Firebase baseline

```text
FIREBASE ACCESS NOT VERIFIED
Project akshar-nepal: existence/services/rules/data ALL UNKNOWN.
Repository-side Firebase configuration: CONFIRMED ABSENT.
Foundation-document references to Firebase: NONE (verified by full-text search).
300-phase plan references to Firebase: ONLY Phase 002 (this audit).
```

## 4. Documentation baseline

Verified inventory of the 29 foundation documents inside `AKSHAR_FOUNDATION_ALL_IN_ONE.md` (all 29 headers confirmed by scan):

```text
01 ACADEMIC_MODEL      11 DISASTER_RECOVERY    21 PRODUCT_REQUIREMENTS
02 AI_RULES            12 DOCUMENT_MANAGEMENT  22 PROJECT_STATUS
03 API_CONTRACTS       13 EDUCATION_COMPLIANCE 23 RBAC
04 ARCHITECTURE        14 EXAMINATION          24 README
05 CURRICULUM          15 FINANCE              25 RESULT_RULES
06 DATABASE            16 INTEROPERABILITY     26 ROADMAP
07 DATA_MIGRATION      17 MASTER_RULES         27 SECURITY
08 DEPLOYMENT          18 NEB_INTEGRATION      28 TENANCY
09 DESIGN_SYSTEM       19 NOTIFICATIONS        29 TESTING_STRATEGY
10 DEVELOPMENT_LOG     20 OBSERVABILITY
```

Plus the master execution plan: Phases 001–300 confirmed complete through PHASE 300 ("PRODUCTION LAUNCH AND STABILIZATION"), organized into 30 workstreams × 10 phases (01 Foundation & Forensic Initialization … 30 Final Productionization).

DEVELOPMENT_LOG.md initial entry dated 2026-08-24 — same day as repository creation. Consistent.

## 5. Architecture dependency map

Reconstructed dependencies (as the documents themselves define them):

```text
GOVERNANCE CHAIN
MASTER_RULES ─→ ARCHITECTURE ─→ DATABASE ─→ API_CONTRACTS ─→ SECURITY ─→ RBAC ─→ FEATURE DOMAINS
                                   │
TENANCY ─→ RBAC ─→ DATA(SCOPE/RLS) ─→ API ─→ UI (DESIGN_SYSTEM)

ACADEMIC CHAIN
ACADEMIC_MODEL ─→ CURRICULUM ─→ ASSESSMENT/EXAMINATION ─→ RESULT_RULES ─→ NEB_INTEGRATION
                                      │
                       EDUCATION_COMPLIANCE (authority registry overlay)

OPERATIONS CHAIN
PRODUCT_REQUIREMENTS ─→ DESIGN_SYSTEM / TESTING_STRATEGY / OBSERVABILITY / DISASTER_RECOVERY / DEPLOYMENT / ROADMAP
AI_RULES overlays PRODUCT_REQUIREMENTS + MASTER_RULES §13
DATA_MIGRATION feeds STUDENTS/FINANCE/DOCUMENTS domains
NOTIFICATIONS consumes domain events from every operational domain
INTEROPERABILITY bounds NEB_INTEGRATION + payments + messaging
```

Missing links identified:

- No explicit mapping from ROADMAP.md's Phase 0–10 milestones to the 30 workstreams of the 300-phase plan (they are clearly related but never cross-referenced).
- No document owns the environment/configuration contract for local dev (Phase 004/006 territory) — acceptable, since the roadmap assigns it, but noted.
- DEVELOPMENT_LOG has no home outside the all-in-one (same issue as Section 32-D3).

## 6. Documentation contradictions

Format: Conflict → Documents affected → Actual evidence → Risk → Recommended resolution → Required decision.

**C1 — Backend platform: Firebase vs Laravel/PostgreSQL (CRITICAL)**
- Conflict: Master initialization prompt designates Firebase project `akshar-nepal` as a system component requiring forensic audit and possible inspection tooling; FOUNDATION (ARCHITECTURE.md §1, DATABASE.md §1, SECURITY.md §4, TENANCY.md §4) mandates Laravel API + PostgreSQL RLS as authoritative backend and storage design, with zero Firebase mentions.
- Evidence: full-text searches — "Firebase" appears 0 times across the 29 foundation docs; 3 times in the 300-phase plan (all within Phase 002 itself); repo contains no code/config supporting either side.
- Risk: choosing wrong platform invalidates DATABASE/TENANCY/RBAC/SECURITY implementation phases (011–020 onward); two competing backends would violate MASTER_RULES Rule 1 (one source of truth).
- Recommended resolution: keep the documented Laravel+PostgreSQL architecture (internally consistent; Firebase adds nothing the contract requires); declare `akshar-nepal` OUT OF SCOPE unless the owner identifies a concrete need.
- Required decision: **D1** (Section 32). Not silently resolved.

**C2 — Repository README vs foundation README**
- Conflict: actual repo README is "# Akshar-"; foundation README.md (doc #24) defines product identity, scope, tech direction, principles.
- Evidence: `git ls-files` + file content vs all-in-one section 24.
- Risk: identity drift; anyone discovering the repo sees a placeholder.
- Resolution: replace repo README with documented README when docs land in repo (part of D2). No user decision beyond D2.

**C3 — "Phase" naming collision**
- Conflict: ROADMAP.md defines delivery Phases 0–10; master execution plan defines Phases 001–300. Same term, different granularity; DEVELOPMENT_LOG format even asks for "Phase:" without disambiguation.
- Evidence: ROADMAP.md section 26 vs execution plan structure.
- Risk: checkpoint logs become ambiguous ("Phase 6" = ?).
- Resolution: adopt the convention that "Phase NNN" always means the 300-phase plan; ROADMAP.md items are referenced as "Roadmap milestone X". Record in DEVELOPMENT_LOG at next entry. Minimum justified correction later (not silently done now).

**C4 — Broken citation artifacts**
- Conflict/defect: 31 private-use-area citation glyphs across 8 lines (CURRICULUM, EXAMINATION, RESULT_RULES, NEB_INTEGRATION, EDUCATION_COMPLIANCE, plus shared governance-note blocks) reference sources that render as garbage tokens.
- Risk: unverifiable authority claims inside precisely the documents that demand source-referenced authority (violates their own evidence discipline if left).
- Resolution: strip/replace glyph artifacts with plain-text source descriptions (e.g., "CDC public catalogue, accessed 2026-08") during the D3 documentation commit; P3 priority, non-blocking.

**C5 — "Individual files remain canonical" claim vs reality**
- Conflict: all-in-one header states the 29 individual files remain the canonical modular documents — but no individual files exist in any repository or local folder.
- Evidence: directory listings (this folder = 3 md files; repo = 1 file).
- Risk: no canonical artifact actually exists as described; edit history impossible.
- Resolution: materialize the 29 files under `/docs` in the repo (D3).

No other contradictions found: tenancy hierarchy (Organization→Institution→Campus) is consistent across TENANCY, RBAC, DATABASE, ACADEMIC_MODEL, ARCHITECTURE; money-as-minor-units consistent between DATABASE and FINANCE; result immutability consistent between MASTER_RULES §5, RESULT_RULES, EXAMINATION, TESTING_STRATEGY.

## 7. Documentation gaps

BLOCKING (cannot safely implement affected phases until resolved):

1. Backend platform decision (C1/D1) — blocks all persistence/backend phases.
2. Approved RBAC permission matrix (RBAC.md lists families/examples but no complete action×role×scope matrix) — PROJECT_STATUS explicitly requires "RBAC/RLS matrices approved" before foundation is done. Blocks Phases 012–020 fidelity.
3. Grading scheme seed values (RESULT_RULES deliberately forbids hard-coding one enum, but no initial Nepal GPA scheme dataset/version 1 is specified anywhere) — blocks first result-engine test data unless treated as configuration authored during implementation with institutional sign-off.

NON-BLOCKING (resolvable during the owning phase):

4. Field-level column definitions for the ~90 tables enumerated in DATABASE.md (logical names only today).
5. Error-code catalogue for API_CONTRACTS envelope.
6. Notification template inventory.
7. Concrete NEB exchange formats (explicitly deferred until contracted — by design).
8. DR RPO/RTO targets ("define before production" — deferred by design).
9. Localization key catalogue (EN/NE).

## 8. Implementation gaps

Full matrix maintained in AKSHAR_REPOSITORY_AUDIT.md §9; summary here (Domain | Required | Documented | Exists | Implemented | Tested | Verified | Gap | Priority):

```text
Platform/Authentication/Identity/Organization/Institution/Campus/Tenancy/RBAC/
Academic Year/Academic Structure/Curriculum/Students/Teachers/Admissions/Timetable/
Attendance/Assessment/Examination/Results/Documents/Finance/Notifications/Library/
Transport/Hostel/HR/Analytics/Interoperability/NEB/AI/Observability/Deployment/DR
  → Required=Yes, Documented=Yes, Exists=NO, Implemented=NO, Tested=NO, Verified=NO,
    Gap=ENTIRE SUBSYSTEM, Priority=set by 300-phase order (foundation workstream first)
```

Every one of the 33 domains is greenfield. Nothing is partially implemented; nothing needs de-scoping.

## 9. Duplicate systems

None exist — there is no code. Forward-looking duplicates to prevent (per MASTER_RULES §15): a second notification engine, a second search stack, module-local auth, or a parallel Firestore data layer alongside PostgreSQL would all be violations. Watch-item only.

## 10. Simulated functionality

None found (no application code exists). Classification table is empty by evidence, not by assumption. The foundation contract's anti-fake rules (MASTER_RULES §2, EXAMINATION §10, INTEROPERABILITY §8) are currently trivially satisfied.

## 11. Security issues

1. Foundation docs live outside version control (single-copy risk, no tamper evidence) — governance risk, P1.
2. Unverifiable cloud project state (Firebase) — P1, pending D1.
3. Repo governance unconfigured (branch protection/secrets scanning/license absent) — P2, remediate at Phase 004/005.
4. No code-level vulnerabilities exist (no code).
Positive: SECURITY/TENANCY/RBAC documents define server-side enforcement, RLS as final boundary, audit requirements, secret handling — a sound contract awaiting implementation.

## 12. Data integrity issues

None observable (no data store accessible). Contract-level checks passed: published results append-only (DATABASE §4), financial postings immutable after posting (DATABASE §4, FINANCE), migration non-destructiveness (DATA_MIGRATION §10), idempotency keys mandated (API §5, DATABASE §4). Consistent.

## 13. Tenant/RBAC issues

Documentation is internally consistent (hierarchy, context resolution, support-session rules, import scoping). Open items carried from Section 7: full permission matrix unapproved (blocking for Phases 012–020); RLS policy authorship undefined at column level (phase-time work). No contradictions.

## 14. Academic architecture issues

Model (Org→Institution→Campus→AY→Term→Level→Grade→Section→Offering→Enrollment→Session) is coherent and matches DATABASE table list. Student lifecycle states and promotion-as-policy design are clear. College extension via generalized academic_period is specified. Gap: none contradictory; grade/term effective-dating details are phase-time work.

## 15. Curriculum issues

Versioning model (subject versions effective-dated; new versions never invalidate history) is consistent with RESULT_RULES and DATABASE. Authority model (CDC/local/institution) is well bounded. Defects: citation-glyph artifacts (C4); ingestion modes listed but approval workflow for imported curriculum is unspecified (non-blocking).

## 16. Examination issues

Hierarchy, internal exam types, question-paper lifecycle, candidate snapshots, and status vocabulary are complete and consistent with RESULT_RULES statuses. External-exam metadata is modeled without claiming authority integration. Gap: center/invigilator assignment rules unspecified (non-blocking, Phase-workstream 26 covers advanced operations).

## 17. Result-rule issues

Pipeline, version pinning, revision workflow, special states, reproducibility/integrity tests are mutually consistent across RESULT_RULES, EXAMINATION, DATABASE, TESTING_STRATEGY. Blocking gap carried from Section 7 item 3: no initial grading-scheme dataset. Otherwise clean.

## 18. NEB integration issues

Boundary is exemplary: adapter-only, three adapter classes, exchange state machine, external-ID separation, schedule-import isolation, re-totaling awareness, human fallback, no-fake-submission rule. Non-blocking gap: no technical contract/credential path exists yet — correctly marked out-of-scope-until-contracted by PRODUCT_REQUIREMENTS §7 and EDUCATION_COMPLIANCE §5. Citation artifacts also touch this doc (C4).

## 19. Firebase architecture decision

Pending user decision **D1**. Recommendation recorded in AKSHAR_FIREBASE_AUDIT.md §22: treat foundation contract as authoritative (Laravel+PostgreSQL); mark `akshar-nepal` OUT OF SCOPE/dormant unless a concrete need is identified; any other role requires amending the foundation set first.

## 20. Frontend architecture decision

CONFIRMED-BY-CONTRACT (no contradiction): React + TypeScript + Vite SPA, light-first premium design system, EN/NE localization, entitlement-driven navigation (DESIGN_SYSTEM, README §Technology direction). No competitor proposal exists in any artifact. Adopted as canonical target.

## 21. Backend architecture decision

CONFIRMED-BY-CONTRACT: Laravel modular monolith as sole business API; domain services/policies/jobs; queues via Redis; adapter boundary for externals (ARCHITECTURE §1, §8). PHP 8.4 CLI already present locally (environment supports it). Pending item: none, provided D1 resolves in favor of the contract.

## 22. Database architecture decision

CONFIRMED-BY-CONTRACT: PostgreSQL authoritative store, UUID publics, integer minor units, effective-dated config, RLS final boundary, composite authorization indexes (DATABASE). Firestore/RTDB roles: none defined; blocked behind D1.

## 23. API architecture decision

CONFIRMED-BY-CONTRACT: `/api/v1`, `{data,meta}`/`{error{code,message,details}}` envelope, command endpoints for state transitions, idempotency keys on retry-prone mutations, cursor pagination, whitelisted filtering, signed webhooks (API_CONTRACTS). Stable codes requirement noted; error-code catalogue is a non-blocking gap (§7.5).

## 24. Testing architecture decision

CONFIRMED-BY-CONTRACT: pyramid Unit→Integration→API/DB→RLS/RBAC→E2E→Operational; 13 critical E2E paths; academic-safety tests (reproducibility, append-only publication); release gates require automated passes (TESTING_STRATEGY). Framework choices (PHPUnit/Pest, Playwright, etc.) intentionally unspecified — to be fixed at Phase 004/009; recorded as a decision to make then, not a contradiction.

## 25. Deployment architecture decision

CONFIRMED-BY-CONTRACT: Local→CI→Staging→Production, forward-safe migrations, immutable artifacts, staging gates exercising auth/tenancy/results/finance, go/no-go separated from readiness claim (DEPLOYMENT). Hosting target deliberately unspecified in docs; selection belongs to Phase 024 workstream — flagged as future decision, non-blocking now.

## 26. P0 issues

1. **P0-R1** — Architectural fork unresolved: documented Laravel+PostgreSQL contract vs unprompted Firebase introduction (C1/D1). Every downstream phase inherits this fork; must be closed before Phase 004 completes environment contract (Phase 006) at the latest, ideally before Phase 004 starts.
2. **P0-R2** — Canonical artifacts not under version control (docs unversioned + empty repo). Blocks trustworthy checkpoints (every phase demands diff audits and DEVELOPMENT_LOG entries anchored to commits that cannot exist yet).

## 27. P1 issues

1. Permission-matrix approval outstanding (blocks faithful RBAC/RLS phases).
2. Initial Nepal-aligned grading-scheme dataset unsourced.
3. Local toolchain gaps for the documented stack (composer, PostgreSQL) and missing repo scripts (Phase 004 scope).
4. Firebase project ungoverned/uninventoried while named in project communications.

## 28. P2 issues

1. Placeholder README in canonical-candidate repo.
2. Repo protections/license/secret-scanning unconfigured.
3. Phase-naming collision convention undocumented (C3).
4. Integration registry lacks an entry/status for the Firebase project.

## 29. P3 issues

1. Citation-glyph artifacts (C4).
2. Trailing-hyphen repo title artifact.
3. All-in-one formatting quirks (e.g., DESIGN_SYSTEM responsive-behavior phrasing) — cosmetic sweep during D3 split.

## 30. UNKNOWN items

1. Everything about live project `akshar-nepal` (see FIREBASE_AUDIT §21).
2. Whether private sibling repos/forks of b4snet contain Akshar work.
3. Identity/approval status of the 29 documents ("All 29 documents approved?" is asked by PROJECT_STATUS but no approval record exists).
4. Domain owners (PROJECT_STATUS requires assignment; none recorded).
5. Intended hosting provider/region and payment/SMS provider preferences.
6. Initial institution pilot data/migration source availability.

## 31. Resolved decisions

Decisions this reconciliation is able to close on evidence alone:

1. Status labeling discipline adopted: everything observed uses CONFIRMED/DOCUMENTED/UNKNOWN per RULE 1; no UNKNOWN was upgraded.
2. No foundation document was rewritten during discovery (per "do not overwrite blindly"); corrections deferred to D2/D3 execution with DEVELOPMENT_LOG entries.
3. Repository audit performed against the real remote (clone inspected read-only); local user folder untouched except the four required deliverable reports.
4. Phase-naming convention proposal (C3) drafted for adoption at next log entry.
5. Canonical target architecture affirmed from the contract (Sections 20–25) contingent only on D1.
6. Phase 004 will NOT be auto-started (master-prompt stop condition honored).

## 32. Decisions requiring the user

| ID | Decision | Options | Default recommendation |
|----|----------|---------|------------------------|
| D1 | Role of Firebase `akshar-nepal` in Akshar | A: out of scope/dormant · B: auth-only · C: full backend · D: specific narrow role | **A** — keep Laravel+PostgreSQL contract |
| D2 | Canonical repository & docs placement | Commit 29-doc set + plans to github.com/b4snet/akshar under /docs and proceed there | Yes — commit docs, protect main |
| D3 | Materialize 29 individual canonical files from all-in-one (and clean C4 artifacts during the split)? | Yes / keep single-file | Yes — restore stated canonicality |
| D4 | Approve Phase 004 (Toolchain Bootstrap) scope/start | Start after D1–D3 | Approve |

Additional inputs welcome but non-blocking: approval records/domain owners for the 29 docs; hosting & provider preferences; pilot institution identification.

## 33. Canonical target architecture

(Contingent on D1 = A/B; restated from the reconciled contract)

```text
Frontend:   React + TypeScript + Vite SPA · light-first design system · EN/NE i18n · WCAG 2.2 AA practices
Backend:    Laravel modular monolith — sole business API · domain services/policies/jobs
Data:       PostgreSQL authoritative OLTP · UUID ids · integer minor units · effective-dated config
Tenancy:    Organization → Institution → Campus scopes · PostgreSQL RLS final boundary · audited support access
AuthN:      Server-side sessions per SECURITY.md (rotating refresh, MFA for privileged, rate limits) — provider detail finalized in Phase 011
AuthZ:      Action-based permissions × scope, enforced per-request server-side; UI visibility never authoritative
Files:      S3-compatible object storage · metadata in PostgreSQL · signed short-lived URLs · audited downloads
Search:     Shared platform search capability (no per-module engines) — technology chosen in its phase
Jobs:       Redis-backed queues · idempotent handlers · dead-letter visibility
Notifications: One shared service; event→rule→audience→channel→delivery-receipt pipeline
Integrations: Adapter registry with explicit status vocabulary (planned→…→live-with-evidence); NEB strictly adapter-based
Observability: structured logs w/ correlation IDs, metrics, integrity alerts; no secrets/student PII in logs
```

Firebase appears nowhere above unless D1 selects otherwise — that absence is deliberate and evidence-based.

## 34. Recommended Phase 004 starting point

Upon D1–D4 confirmation:

1. Initialize toolchain bootstrap in the canonical repo (Phase 004): composer/npm scaffolding scripts (`setup`, `lint`, `typecheck`, `test`, `build`, `format`, `reset`, `seed`), `.env.example` per documented services (PostgreSQL, Redis, S3, mailer stub), CI-ready script names.
2. In the same landing commit series (before feature phases): commit `/docs` (29 files + plans, C4-cleaned), replace README (C2), add LICENSE/.gitignore/editorconfig, enable branch protection + secret scanning (P2 remediations).
3. Install missing local prerequisites (composer, PostgreSQL client/server or Docker) so Phase 008 local-dev experience can run.
4. Enter Phase 005 skeleton with the Section 33 layout; carry P1 items 1–2 (permission matrix, grading dataset) as scheduled decisions inside workstreams 02 and 11 respectively.

---

## PHASE 003 ACCEPTANCE GATE — STATUS

- Every foundation document reviewed — YES (29/29 verified present and read)
- 300-phase roadmap reviewed — YES (structure + terminal phases confirmed; repetitive phase bodies pattern-verified)
- Repository findings compared to documents — YES (audit §9 matrix vs PROJECT_STATUS claims: aligned)
- Firebase findings compared to documents — YES (zero-documented-role finding)
- Contradictions/gaps/duplicates/simulated functionality/security/academic-domain issues documented — YES (§6–§18)
- NEB boundaries documented — YES (§18)
- Canonical architecture documented — YES (§33)
- P0 blockers known — YES (§26)
- Decisions requiring the user listed — YES (§32: D1–D4)
- Recommended Phase 004 starting point defined — YES (§34)

PHASE 003 COMPLETE.
