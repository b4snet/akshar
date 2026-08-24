#!/usr/bin/env node
// AKSHAR canonical quality-gate orchestrator (Phase 009).
//
// One orchestration layer over the repository's established commands; it does
// not reimplement any check. Gate definitions are STATIC (cmd + args constants)
// and executed via spawnSync — no shell string construction, no environment
// interpolation into command lines (injection-safe by construction).
//
// Usage:
//   npm run gates                 full canonical sequence, stop on first failure
//   npm run gates -- --keep-going run every gate, collect all failures
//   npm run gates -- --only a,b   subset by gate id (dev/debug/integration tests)
//   npm run gates -- --list       print the contract
//   npm run gates -- --verbose    stream underlying output even on PASS
//
// Exit codes: 0 = all mandatory gates passed; 1 = at least one failed;
// 2 = usage/launch error. Failures are never converted into warnings.
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import process from "node:process";

export const GATES = [
  { id: "environment", name: "Environment", cmd: "node", args: ["scripts/env-check.mjs"] },
  { id: "dependencies", name: "Dependencies", cmd: "node", args: ["scripts/check-deps.mjs"] },
  { id: "formatting", name: "Formatting", cmd: "npm", args: ["run", "format:check"] },
  { id: "lint", name: "Lint", cmd: "npm", args: ["run", "lint"] },
  { id: "typecheck", name: "Typecheck & Static Analysis", cmd: "npm", args: ["run", "typecheck"] },
  { id: "frontend-tests", name: "Frontend Tests", cmd: "npm", args: ["run", "test:fe"] },
  { id: "backend-tests", name: "Backend Tests", cmd: "node", args: ["scripts/run-backend.mjs", "test"] },
  { id: "build", name: "Build", cmd: "npm", args: ["run", "build"] },
  { id: "secret-scan", name: "Secret Scan", cmd: "node", args: ["scripts/secret-scan.mjs"] },
  { id: "artifact-scan", name: "Artifact Scan", cmd: "node", args: ["scripts/artifact-scan.mjs"] },
  { id: "diff-check", name: "Diff Check", cmd: "git", args: ["diff", "--check"] },
];

const TAIL_LINES = 30;

/**
 * Pure-ish gate runner, separated from CLI parsing so tests can inject a fake
 * runner to prove failure semantics without mocking away the real CLI path
 * (the integration test additionally executes this file for real).
 *
 * @param {{
 *   plan?: typeof GATES,
 *   only?: string[],
 *   keepGoing?: boolean,
 *   verbose?: boolean,
 *   runOne?: (gate: object) => { code: number|null, tail: string[], error?: string },
 * }} options
 */
export function runQualityGates({
  plan = GATES,
  only = [],
  keepGoing = false,
  verbose = false,
  runOne,
} = {}) {
  const selected = selectGates(plan, only);
  const results = [];
  let stoppedEarly = false;

  for (const gate of selected) {
    const outcome = runOne(gate);
    const passed = outcome.code === 0;
    results.push({ ...gate, ...outcome, passed });

    if (verbose || !passed) {
      printGateResult(results[results.length - 1]);
    } else {
      console.log(`[PASS] ${gate.name}`);
    }

    if (!passed && !keepGoing) {
      stoppedEarly = true;
      break;
    }
  }

  const skipped = stoppedEarly ? selected.slice(results.length) : [];
  return { results, skipped };
}

function selectGates(plan, only) {
  if (only.length === 0) return plan;
  const known = new Set(plan.map((g) => g.id));
  const unknown = only.filter((id) => !known.has(id));
  if (unknown.length > 0) {
    throw new Error(
      `unknown gate(s): ${unknown.join(", ")}. Known gates: ${[...known].join(", ")}`,
    );
  }
  return plan.filter((g) => only.includes(g.id));
}

export function summarize(results, skipped) {
  if (skipped.length > 0) {
    console.log("");
    for (const g of skipped) console.log(`[SKIP] ${g.name} (not reached after earlier failure)`);
  }
  const failed = results.filter((r) => !r.passed);
  console.log("");
  if (failed.length === 0) {
    console.log("RESULT: PASS");
    return 0;
  }
  console.log(`RESULT: FAIL (${failed.length} of ${results.length} executed gates failed)`);
  return 1;
}

function printGateResult(result) {
  if (result.passed) {
    console.log(`[PASS] ${result.name}`);
    if (result.tail.length > 0) {
      for (const line of result.tail) console.log(`       ${line}`);
    }
    return;
  }
  console.log(`[FAIL] ${result.name}`);
  console.log("       Command:");
  console.log(`         ${result.cmd} ${result.args.join(" ")}`);
  console.log(`       Exit code: ${result.code ?? "launch error"}`);
  if (result.error) {
    console.log(`       Launch error: ${result.error}`);
  }
  console.log("       Output (tail):");
  if (result.tail.length === 0) {
    console.log("         (no output)");
  } else {
    for (const line of result.tail) console.log(`         ${line}`);
  }
}

function realRunOne(gate) {
  // stdio piped so failure summaries can quote real output; nothing is
  // interpolated into the command line. Output is never echoed wholesale on
  // PASS (use --verbose), which also keeps secrets-prone noise out of logs.
  const res = spawnSync(gate.cmd, gate.args, {
    cwd: process.cwd(),
    encoding: "utf8",
    shell: process.platform === "win32",
    maxBuffer: 32 * 1024 * 1024,
    env: process.env,
  });
  const combined = `${res.stdout ?? ""}${res.stderr ?? ""}`.split(/\r?\n/).filter(Boolean);
  return {
    code: res.error ? null : res.status,
    tail: combined.slice(-TAIL_LINES),
    error: res.error?.message,
  };
}

function main(argv) {
  const only = [];
  let keepGoing = false;
  let verbose = false;

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--keep-going") keepGoing = true;
    else if (a === "--verbose") verbose = true;
    else if (a === "--list") {
      for (const g of GATES) console.log(`${g.id}\t${g.name}\t${g.cmd} ${g.args.join(" ")}`);
      return 0;
    } else if (a === "--only") {
      const value = argv[++i];
      if (!value) {
        console.error("quality-gates: --only requires a comma-separated gate list");
        return 2;
      }
      only.push(...value.split(",").map((s) => s.trim()).filter(Boolean));
    } else {
      console.error(`quality-gates: unknown option '${a}'`);
      return 2;
    }
  }

  console.log("AKSHAR QUALITY GATES");
  console.log("");

  try {
    const { results, skipped } = runQualityGates({
      only,
      keepGoing,
      verbose,
      runOne: realRunOne,
    });
    return summarize(results, skipped);
  } catch (err) {
    console.error(`quality-gates: ${err.message}`);
    return 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(main(process.argv.slice(2)));
}
