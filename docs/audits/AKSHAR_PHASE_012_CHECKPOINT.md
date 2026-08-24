# PHASE 012 CHECKPOINT REPORT — Identity Model

## 1. Phase number and title

Phase 012 — Identity Model (Workstream 02: Identity, Tenancy & RBAC), per
`docs/AKSHAR_PHASE_001_300_MASTER_EXECUTION_PLAN.md` line 439.

**Governance record:** the authorization arrived titled "PHASE 008 — IDENTITY
MODEL" while Phase 008 (Local Development Experience) was already complete and
checkpointed. Owner adjudication: **execute now as out-of-sequence Phase 012**,
preserving the Phase 008 record untouched; Phases 009–011 remain pending. This
checkpoint is the honest numbering of that execution.

Objective implemented: the canonical identity RELATIONSHIP model — one Person,
one account, distinct domain identities per role, enforced lifecycles with a
terminal ARCHIVED state — with NO authentication workflows (Phase 011), NO
RBAC/scopes (Phases 016–018), NO tenancy (Phase 013), and NO exposed endpoints.

## 2. Files changed

- `backend/database/migrations/0001_01_01_000000_create_users_table.php` —
  rewritten in place (fresh-clone doctrine; decision documented in-file): UUID
  PK, unique `person_id`, unique `email`, nullable hash-only `password`,
  status CHECK + default active, `last_login_at`; sessions.user_id → foreignUuid.
- `backend/database/migrations/2026_08_24_120001_create_people_table.php` (new)
  — canonical human row: display/legal/Nepali names, nullable non-unique
  contact boundary, optional date_of_birth, status CHECK, jsonb metadata;
  adds the users→people RESTRICT FK here because migration order runs users
  before people.
- `backend/database/migrations/2026_08_24_120002_create_domain_identities_table.php`
  (new) — unique `(person_id, type)` registry over staff/teacher/student/
  guardian; type + status CHECK constraints.
- `backend/app/Domain/Identity/Enums/RecordStatus.php` (new) — ACTIVE /
  INACTIVE / SUSPENDED / ARCHIVED with `canTransitionTo()` state machine;
  ARCHIVED is terminal.
- `backend/app/Domain/Identity/Enums/IdentityType.php` (new).
- `backend/app/Domain/Identity/Concerns/GuardsLifecycle.php` (new) — shared
  lifecycle guard translating illegal transitions into CONFLICT envelopes;
  used by both Person and DomainIdentity.
- `backend/app/Domain/Identity/Models/Person.php`, `User.php`,
  `DomainIdentity.php` (new/relocated) — typed relations, enum casts, hidden
  sensitive fields, hashed password cast, `$attributes` status defaults.
- `backend/app/Domain/Identity/Actions/RegisterDomainIdentity.php` (new) —
  attaches a domain identity; DB-level uniqueness translated into the canonical
  CONFLICT envelope via ApiException (shared service; no duplicate error engine).
- `backend/app/Models/User.php` + factory — REMOVED (legacy baseline).
- `backend/config/auth.php` — provider repointed to the domain User.
- Tests: `tests/Unit/Domain/Identity/RecordStatusTest.php` (new),
  `tests/Feature/Identity/IdentityModelTest.php` (new).

## 3. Database/data-model changes

As above: users rewritten, people + domain_identities added, all deletions
RESTRICTed, ordinary deactivation is a status change, ARCHIVED terminal.
No national identifiers invented. Rich profile tables (staff/teachers/students/
guardians/student_guardians) deliberately NOT created — owned by their future
modules; DATABASE.md carries the implementation note.

## 4. API changes

None — by design. A test asserts `/api/v1/people|users|domain-identities`
return 404 with the NOT_FOUND envelope and leak no data until an authentication
foundation exists.

## 5. UI changes

None. Current-user representation requires session context (Phase 011+).

## 6. Security/authorization impact

- Passwords hashed via cast; plaintext never persisted; password +
  remember_token excluded from arrays/JSON (test-enforced).
- Account enumeration surface: none (no endpoints).
- Duplicate protection at database level (unique email, unique person_id,
  unique person+type) surfaced as CONFLICT envelopes through the action.
- IDs are UUIDs; no sequential enumeration risk.
- No credentials or network exposure added; no auth logic touched.

## 7. Tests and exact results

Backend suite: **24 tests / 107 assertions / 0 failures**, executed against
REAL PostgreSQL 17.10 on the authoring host AND against CI's postgres:17-alpine
service:

- Unit: RecordStatus matrix (active fan-out; recovery paths from inactive/
  suspended incl. suspended→inactive; archived terminality incl. self; no
  self-transition anywhere).
- Feature (RefreshDatabase): person↔account↔multiple distinct identities graph;
  duplicate login email rejected (unique violation); second account per person
  rejected; duplicate domain identity → ApiException CONFLICT 409; invalid type
  rejected by schema CHECK; archived terminality via guard with exact details
  envelope (`from`/`to`); suspended→active recovery then archived refusal for
  Person; person deletion RESTRICTed with linked records; deactivation persists
  as status not deletion; sensitive fields never serialize and stored hash ≠
  submitted plaintext; identity endpoints absent (404 NOT_FOUND, no leakage).

Local infrastructure evidence: portable PostgreSQL 17.10 cluster (zonky
binaries under %TEMP%\opencode\pgsql17, outside the repo), initialized UTF8,
provisioned with the CI-shaped role/database, ran migrations + full DB-backed
suite locally for the first time in project history — closing the Docker-
unavailability parity gap recorded since Phases 006–008. Defects caught by
this local run and fixed: WIN1252 default encoding (recreated UTF8), FK-ordering
crash (users migration constrained people before it existed), null status on
fresh models (added $attributes defaults). Full gate suite green: env:check ×2 ·
oxlint/Pint/Prettier clean · tsc clean · PHPStan L6 0 errors · Vitest 10/10 ·
env-contract 8/8 · tooling 16/16 · Vite build OK · secret scan clean ·
git diff --check clean.

## 8. Documentation updated

DATABASE.md People implementation note · DEVELOPMENT_LOG Phase 012 entry with
the governance deviation record · PROJECT_STATUS stage/priority updated ·
app/Domain README registry (Identity → In progress) · this checkpoint.

## 9. Known limitations

- Authentication workflows absent (Phase 011); password column nullable until
  credentials land.
- Audit EVENT EMISSION deferred to the platform audit phase (single audit
  subsystem rule); required identity events are recorded here so the owning
  phase implements without redesign: identity.created, identity.linked,
  identity.unlinked, account.status_changed, person.status_changed.
- Person deduplication beyond account email awaits identifier policy in the
  People/Student Lifecycle phases.
- Local portable cluster lives outside the repo; reproducibility steps are in
  DEVELOPMENT_LOG (initdb -E UTF8 --locale=C; role akshar; db akshar_testing;
  port 5432 matching phpunit.xml pins).

## 10. Git branch/commit/tree state

- Branch: `main`
- Working tree at close: clean; origin synchronized (commit pushed; CI observed
  green via GitHub API on the final commit — schema migrations + DB-backed
  suite executing in the PG17 service).

## 11. Status

**COMPLETE (executed out of sequence under explicit owner authorization)** —
scoped behavior implemented, adversarial tests green against real PostgreSQL
locally and in CI, documentation reflects actual behavior, scope boundaries
(no auth/RBAC/tenancy/endpoints) honored. Stopping per protocol; Phases 009–011
require explicit owner instruction.
