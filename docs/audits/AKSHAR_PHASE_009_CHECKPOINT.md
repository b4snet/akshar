# AKSHAR — PHASE 009 CHECKPOINT

## Phase
Phase: 009
Title: Initial Quality Gates

## Baseline
Branch: `main`
HEAD: `bfcc28b` (Phase 012 close — identity model, executed out of sequence under prior owner authorization)
Working tree: clean at start; verified before any edit (scripts inventory, CI workflow, package.json command surface, test orchestration re-inspected directly rather than trusting prior reports)

## Quality Gate Architecture
- Canonical command: `npm run gates` → `scripts/quality-gates.mjs`
- Underlying commands (reused verbatim; no check reimplemented):
  - Environment: `node scripts/env-check.mjs`
  - Dependencies: `node scripts/check-deps.mjs` (NEW — local install presence only, no network)
  - Formatting: `npm run format:check` (Prettier + Pint)
  - Lint: `npm run lint` (oxlint + Pint)
  - Typecheck & Static Analysis: `npm run typecheck` (tsc + PHPStan L6/Larastan)
  - Frontend Tests: `npm run test:fe` (Vitest)
  - Backend Tests: `node scripts/run-backend.mjs test` (PHPUnit, PostgreSQL target)
  - Build: `npm run build` (Vite production build)
  - Secret Scan: `node scripts/secret-scan.mjs`
  - Artifact Scan: `node scripts/artifact-scan.mjs` (NEW — tracked-file debug/temp sweep)
  - Diff Check: `git diff --check`
- Local usage: `npm run gates` (full), `--keep-going`, `--only <ids>`, `--list`, `--verbose`
- CI usage: CI already executes the same logical gates as discrete workflow steps over the same underlying commands; provider-specific steps (PostgreSQL/Redis service containers, `npm audit`) remain CI-only for infrastructure reasons and are documented in TESTING_STRATEGY §12. The orchestrator is CI-reusable as-is.

## Gates
- Environment: mandatory — env templates validated against the contract
- Dependencies: mandatory — backend vendor/autoload + Pint binary + frontend node_modules presence with remediation hints
- Formatting: mandatory — Prettier + Pint
- Lint: mandatory — oxlint + Pint
- Typecheck: mandatory — tsc + PHPStan level 6
- Static analysis: covered by the typecheck gate via PHPStan L6 (single underlying invocation, not duplicated)
- Frontend tests: mandatory — Vitest
- Backend tests: mandatory — PHPUnit against PostgreSQL
- Build: mandatory — Vite production build
- Secret scan: mandatory — existing pattern scanner unchanged (no suppression rules added or weakened)
- Artifact/debug scan: mandatory — NEW narrow-rule sweep over git-tracked files (probe/temp files, stray real `.env` while `.example` allowed, editor leftovers, dumps, OS metadata, logs, var_dump/print_r/console.debug/debugger/dd-literal); untracked local junk intentionally out of scope for determinism
- Diff check: mandatory — `git diff --check`

All eleven gates are mandatory. No informational-only gates exist; nothing can be skipped silently.

## Failure Semantics
- Exit 0 = all executed gates passed. Exit 1 = at least one mandatory gate failed. Exit 2 = usage error or unknown option/gate id.
- Default policy: stop on first failure; unreached gates reported `[SKIP]`. `--keep-going` runs every gate, collects all failures, and still exits non-zero.
- Failures are never converted into warnings to obtain green output.
- A failing gate prints its exact command, its real exit code (launch errors surfaced explicitly), and the last 30 lines of combined output.

## Security
- Gate table consists of static command constants executed via `spawnSync`; shell use only on win32 for npm resolution; no shell string construction, no environment interpolation into command lines (injection-safe by construction).
- No elevated permissions, no credentials introduced, no network access in new scripts.
- Output discipline: orchestrator prints only gate results, commands (static), exit codes and captured output tails; it never prints environment values. Underlying commands were already secret-safe.
- Secret scanning untouched: distinction between variable names and values preserved; checklist entries like DATABASE_PASSWORD remain non-findings; no suppressions added.
- Temporary files: none created by the orchestrator; negative verification used only a working-tree edit reverted via `git checkout`.

## Tests
- Exact test count/results:
  - New: `scripts/test/quality-gates.test.mjs` — 8 tests, all passing (all-green run; fail-fast stops at first failure and marks remaining `[SKIP]`; failure output contains command/exit-code/output-tail; keep-going collects independent failures and still exits 1; subset selection plus unknown-gate rejection; launch-error counts as failure; canonical gate order pinned by assertion; INTEGRATION test executing the real orchestrator against real repository commands — environment + diff-check subset — asserting PASS output).
  - Tooling suite total: 16 → **24 tests / 0 failures** (`npm run test:tooling`).
  - Full local gate run after wiring: **11/11 gates PASS, exit 0** on the authoring host.
- Negative/failure-path verification (authorization §15): trailing whitespace injected into README.md → `npm run gates -- --only diff-check` → `[FAIL] Diff Check`, `RESULT: FAIL (1 of 1 executed gates failed)`, process exit 1 → file restored via `git checkout -- README.md` → re-run `RESULT: PASS`. Repository left unmodified. Additional failure semantics proven by the injected-runner unit tests above rather than by faking production defects.

## Documentation Updated
- `docs/TESTING_STRATEGY.md` §12 — authoritative quality-gate contract (command, order, mandatory semantics, options, failure codes, local/CI parity, orchestrator self-tests). Other documents reference this section instead of duplicating definitions.
- Root `README.md` — quickstart line for `npm run gates` + pointer to the contract.
- `docs/PROJECT_STATUS.md` — stage and priority-next-action updated.
- `docs/DEVELOPMENT_LOG.md` — Phase 009 entry including incident record (below) and known limitations.
- `infrastructure/README.md` — unchanged (no environment-contract surface changed).

## Files Changed
- `scripts/quality-gates.mjs` (new) — canonical orchestrator (static spawn table, DI-friendly runner, output formatting, CLI flags)
- `scripts/check-deps.mjs` (new) — dependency-presence validator
- `scripts/artifact-scan.mjs` (new) — tracked-file artifact/debug sweep with narrowly-scoped rules and documented rationale in-header
- `scripts/test/quality-gates.test.mjs` (new) — 8 orchestrator tests incl. one real integration execution
- `package.json` — added `gates` script (single-line edit)
- `docs/TESTING_STRATEGY.md`, `README.md`, `docs/PROJECT_STATUS.md`, `docs/DEVELOPMENT_LOG.md` — documentation updates
- `docs/audits/AKSHAR_PHASE_009_CHECKPOINT.md` (new) — this checkpoint

## Database/Data Model Changes
- NONE. (Backend tests consume the existing schema; no migrations touched.)

## API Changes
- NONE.

## UI Changes
- NONE.

## Known Limitations
- Gates execute sequentially by design: deterministic ordering and honest output outweigh wall-clock gains until parallelization is proven necessary.
- Dependency gate validates presence, not cryptographic freshness; lockfile-faithful installation remains `setup`'s responsibility (and CI's `npm ci`/composer validate).
- Artifact scan covers git-tracked files only; untracked developer-machine junk is deliberately out of scope (documented in-file).
- CI retains provider-specific steps (service containers, `npm audit`) outside the orchestrator for infrastructure reasons; parity is logical, not byte-for-byte, and the divergence is documented.
- The orchestrator's integration test uses a fast deterministic subset (environment + diff-check); the FULL sequence is exercised manually per phase and by CI's discrete steps.

## Git
Branch: `main`
Commit: see final state below (single focused Phase 009 checkpoint commit)
Working tree: clean
Origin synchronization: pushed; CI observed green on the final commit via GitHub API (all four jobs success)

## Status
PHASE 009 COMPLETE
