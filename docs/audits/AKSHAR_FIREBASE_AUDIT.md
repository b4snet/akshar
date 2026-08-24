# AKSHAR_FIREBASE_AUDIT.md
# PHASE 002 — FIREBASE FORENSIC AUDIT

Audit date: 2026-08-24
Target project: `akshar-nepal`
Console reference given in master prompt: `https://console.firebase.google.com/u/1/project/akshar-nepal/overview`

---

## 1. Firebase access status

```text
FIREBASE ACCESS NOT VERIFIED
```

No authorized mechanism to inspect the Firebase project exists in this environment. Per the master initialization rules, findings are NOT fabricated, and the user was NOT asked for passwords or private keys.

Evidence of attempted verification (all commands executed this audit):

| Check | Command / Method | Result |
|---|---|---|
| Firebase CLI on PATH | `firebase --version` | NOT INSTALLED |
| Firebase CLI via npm global tree | `npm ls -g --depth=0` | absent (only unrelated packages) |
| gcloud CLI | `gcloud --version` | NOT INSTALLED |
| gsutil | `gsutil --version` | NOT INSTALLED |
| Credential env vars (presence only, values never read) | GOOGLE_APPLICATION_CREDENTIALS, FIREBASE_TOKEN, FIREBASE_SERVICE_ACCOUNT, GCLOUD_PROJECT, GOOGLE_CLOUD_PROJECT, FIREBASE_CONFIG | all NOT SET |
| Local project config in user profile (depth 3) | search for `.firebaserc`, `firebase.json` | none found |
| Repository Firebase config | exhaustive `git ls-files` of b4snet/akshar | none found (repo = README only) |
| Firebase MCP/connector tooling in this agent environment | available-tools review | none available |

Consequence: every actual-state question about `akshar-nepal` is UNKNOWN. Per RULE 1, UNKNOWN is not converted into CONFIRMED or into "absent".

## 2. Project identity

```text
Project ID (claimed):     akshar-nepal          — DOCUMENTED (master prompt only)
Project existence:        UNKNOWN               — cannot query without credentials
Region/location:          UNKNOWN
Billing state:            UNKNOWN
Owner/administrators:     UNKNOWN
```

A Firebase console URL existing in a prompt is not evidence that the project, its services, or any data exist. No inference was drawn from the URL.

## 3. Authentication state

UNKNOWN.

- Enabled providers: UNKNOWN
- Sign-in methods configured: UNKNOWN
- Authorized domains: UNKNOWN (not safely inspectable without access)
- Existing users: UNKNOWN (not dumped; nothing to dump)
- MFA capability in use: UNKNOWN

Foundation-document expectation for comparison: SECURITY.md specifies secure password hashing, rotating refresh sessions, MFA for privileged roles, rate limiting, session revocation — against a Laravel-style backend, with no mention of Firebase Auth. Whether Firebase Auth is intended as an identity provider is an open architecture decision (see reconciliation report, D1).

## 4. Firestore state

UNKNOWN.

- Existence: UNKNOWN
- Mode (Native/Compat): UNKNOWN
- Region: UNKNOWN
- Collections/documents: UNKNOWN — no structures reported, none invented
- Indexes: UNKNOWN
- Security rules deployed: UNKNOWN

No tenant/student/academic data structures are described anywhere because none could be observed.

## 5. Realtime Database state

UNKNOWN. Cannot be assumed present or absent without evidence; recorded per protocol as `NOT VERIFIED`.

## 6. Storage state

UNKNOWN.

- Bucket existence/config: UNKNOWN
- Rules: UNKNOWN
- Public-access risk posture: UNASSESSABLE

## 7. Functions state

UNKNOWN. No function inventory can be taken without CLI/API access. Classification REAL/MOCK/UNUSED/PARTIAL is therefore not applicable yet.

Note: the repository contains no `functions/` directory and no Firebase SDK references, so there is also no repository-side Functions codebase. That part is CONFIRMED ABSENT IN REPOSITORY.

## 8. Hosting state

UNKNOWN. No hosting/deploy configuration exists in the repository (CONFIRMED), and cloud-side sites cannot be listed without access.

## 9. App Check state

UNKNOWN. Not assessable. No production security settings were changed or enabled (nothing was touched).

## 10. Security rules findings

None possible — no rules were readable. No rule text is quoted because no rule text exists in this environment. This is itself a governance finding: **the project's data-layer security posture is unverifiable**, which conflicts with MASTER_RULES.md §10 (evidence discipline) if Firebase ever carries production data.

## 11. Current application usage

CONFIRMED NONE in repository: there is no application code of any kind, hence zero application usage of Firebase from the repo side. Any cloud-side usage would be invisible to this audit.

## 12. Existing data-model findings

UNKNOWN (no Firestore/RTDB inspection possible). The only Akshar data model that exists today is the DOCUMENTED PostgreSQL logical model in DATABASE.md.

## 13. Duplicate sources of truth

Cannot be confirmed or excluded. Risk flagged: if `akshar-nepal` has been used manually/experimentally to hold academic data, it would constitute a second source of truth competing with the documented PostgreSQL design. This must be resolved by the user decision D1 before Phase 005+ modeling.

## 14. External integrations

None verifiable. Foundation docs require adapter-based integrations with explicit status vocabulary (INTEROPERABILITY.md); no integration status for anything Firebase-related can be recorded beyond UNKNOWN.

## 15. Security findings

1. **UNVERIFIABLE-BACKEND RISK (P1)** — A named cloud project exists in project communications but its security state cannot be evidenced. If any credentials for it exist on developer machines, they are unmanaged from this audit's perspective.
2. **NO SECRET EXPOSURE** — this audit printed no keys, tokens, or service-account material, and found none in the repository or environment.
3. **RULES GOVERNANCE GAP (P2)** — until either access is granted for inspection or the project is explicitly declared out of scope, security-rule review (master prompt Phase 002 Step 9) cannot be satisfied.

## 16. Architecture implications

- The authoritative foundation documents (29-doc contract) specify Laravel + PostgreSQL + Redis + S3 and contain **zero** references to Firebase. CONFIRMED by full-text review of the all-in-one foundation document.
- The 300-phase execution plan mentions Firebase **only** in Phase 002 (this audit) — never again across Phases 003–300. CONFIRMED by full-text search (3 matches total: execution rule 3, Phase 002 objective, Phase 002 deliverable).
- Therefore, on documentation evidence alone, Firebase currently has NO defined architectural role in Akshar. Its role can only be established by user decision (D1) — e.g., "not used", "auth-only", "hosting-only", or "full backend" (which would contradict the documented architecture).

## 17. P0 issues

None attributable to Firebase itself at this time (no verified exposure, no verified data). The blocking item is decisional, recorded as reconciliation D1.

## 18. P1 issues

1. **P1-F1** — Cloud project state unverifiable while project communications treat it as real; if it hosts anything, it is ungoverned.

## 19. P2 issues

1. **P2-F1** — No inventory/ownership record for `akshar-nepal` exists in the documentation set (INTEROPERABILITY.md integration registry has no entry for it).

## 20. P3 issues

1. **P3-F1** — Console URL embeds a `/u/1` account-switcher segment; harmless, but indicates personal-account usage rather than organization-managed access.

## 21. UNKNOWN items

Everything material about the live project:

- existence, ownership, billing, region
- Authentication providers/users
- Firestore existence/mode/data/rules/indexes
- Realtime Database presence/rules/data
- Storage buckets/rules/files
- Functions inventory/triggers/env config
- Hosting sites/domains/deploy history
- App Check enforcement state
- Any IAM members / service accounts / API keys issued

Each remains UNKNOWN until one of: (a) Firebase CLI installed + authenticated login with authorized Google account, (b) a service account with viewer/inspector role provided through the environment's secret mechanism, or (c) manual console export shared by the owner.

## 22. Recommended architecture decision

Recommendation (evidence-based, not familiarity-based):

1. Treat the 29-document contract as authoritative: Laravel API + PostgreSQL(RLS) is the business backend; do NOT introduce Firebase as a parallel backend unless the owner explicitly decides otherwise.
2. For `akshar-nepal`, choose ONE explicit status and record it in DEVELOPMENT_LOG.md:
   - **Option A (default recommendation): OUT OF SCOPE** — mark the project unused/dormant until a concrete need (e.g., push notifications, hosting previews) is justified; re-audit then.
   - **Option B: AUTH-ONLY** — requires amending SECURITY.md/RBAC.md to define the identity boundary; significant contract change.
   - **Option C: FULL BACKEND** — contradicts ARCHITECTURE.md/DATABASE.md/TENANCY.md (PostgreSQL RLS tenancy, Laravel domain services); would require rewriting most of the foundation set; not recommended.
3. If Option A/B is chosen and any real configuration exists in the project, grant time-boxed viewer access (CLI or console export) so a future audit can replace UNKNOWN with evidence.

Do not recommend migrations based on technology preference — none recommended here.

---

## PHASE 002 ACCEPTANCE GATE — STATUS

- Firebase access status explicit — YES (`NOT VERIFIED`, with method-level evidence)
- Actual services identified — IMPOSSIBLE without access; documented as UNKNOWN rather than fabricated
- Auth/database/storage/functions/hosting inspected — BLOCKED (access), each recorded UNKNOWN
- Rules inspected — BLOCKED (access)
- Security findings documented — YES (verifiability gaps only; no invented vulnerabilities)
- No secrets exposed — CONFIRMED
- No production deployment changed — CONFIRMED (nothing accessed, nothing modified)
- AKSHAR_FIREBASE_AUDIT.md exists — YES (this file)

PHASE 002 COMPLETE (with access limitation honestly recorded).
