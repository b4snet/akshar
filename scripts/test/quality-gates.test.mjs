// AKSHAR quality-gate orchestrator tests (Phase 009).
// Unit tests prove failure semantics through an injected runner; the final
// integration test executes the REAL orchestrator against the REAL repository
// commands (environment + diff-check subset) so the mocked path can never
// become a fake quality gate.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { GATES, runQualityGates, summarize } from "../quality-gates.mjs";

const ok = (tail = []) => ({ code: 0, tail });
const bad = (code, tail = ["error line"]) => ({ code, tail });

function capturingConsole(fn) {
  const out = [];
  const original = console.log;
  console.log = (...args) => out.push(args.join(" "));
  try {
    const result = fn();
    return { result, out };
  } finally {
    console.log = original;
  }
}

test("all-green run passes every gate and exits zero", () => {
  const calls = [];
  const { result, out } = capturingConsole(() =>
    runQualityGates({
      plan: [
        { id: "a", name: "Gate A", cmd: "x", args: [] },
        { id: "b", name: "Gate B", cmd: "y", args: [] },
      ],
      runOne: (gate) => {
        calls.push(gate.id);
        return ok();
      },
    }),
  );
  assert.deepEqual(calls, ["a", "b"]);
  assert.equal(result.results.length, 2);
  assert.equal(result.skipped.length, 0);
  assert.ok(out.includes("[PASS] Gate A"));
  assert.equal(summarize(result.results, result.skipped), 0);
});

test("fail-fast stops at first failure and marks remaining gates skipped", () => {
  const { result, out } = capturingConsole(() =>
    runQualityGates({
      plan: [
        { id: "lint", name: "Lint", cmd: "x", args: [] },
        { id: "tests", name: "Tests", cmd: "y", args: [] },
        { id: "build", name: "Build", cmd: "z", args: [] },
      ],
      runOne: (gate) => (gate.id === "tests" ? bad(1) : ok()),
    }),
  );
  // Lint passed before tests failed? No — order is lint(ok), tests(fail): build unreached.
  assert.equal(result.results.length, 2);
  assert.equal(result.passed === false || result.results.at(-1).passed, false);
  assert.deepEqual(result.skipped.map((g) => g.id), ["build"]);
  assert.ok(out.some((l) => l.startsWith("[FAIL] Tests")));
  assert.equal(summarize(result.results, result.skipped), 1);
});

test("failed gate output includes command, exit code and output tail", () => {
  let printed;
  const original = console.log;
  console.log = (...args) => (printed = `${printed ?? ""}${args.join(" ")}\n`);
  try {
    runQualityGates({
      plan: [{ id: "t", name: "Typecheck", cmd: "npm", args: ["run", "typecheck"] }],
      runOne: () => bad(2, ["error TS2304: Cannot find name 'x'."]),
    });
  } finally {
    console.log = original;
  }
  assert.match(printed, /\[FAIL\] Typecheck/);
  assert.match(printed, /npm run typecheck/);
  assert.match(printed, /Exit code: 2/);
  assert.match(printed, /TS2304/);
});

test("keep-going collects every independent failure and still fails overall", () => {
  const { result, out } = capturingConsole(() => {
    const run = runQualityGates({
      plan: [
        { id: "a", name: "A", cmd: "x", args: [] },
        { id: "b", name: "B", cmd: "y", args: [] },
        { id: "c", name: "C", cmd: "z", args: [] },
      ],
      keepGoing: true,
      runOne: (gate) => (gate.id === "b" ? bad(1) : gate.id === "c" ? bad(3) : ok()),
    });
    return { ...run, exit: summarize(run.results, run.skipped) };
  });
  assert.equal(result.results.length, 3);
  assert.equal(result.skipped.length, 0);
  assert.equal(result.exit, 1);
  assert.ok(out.some((l) => l.includes("RESULT: FAIL (2 of 3 executed gates failed)")));
});

test("--only selects a subset and rejects unknown gate ids", () => {
  const seen = [];
  capturingConsole(() =>
    runQualityGates({
      only: ["build"],
      runOne: (gate) => {
        seen.push(gate.id);
        return ok();
      },
    }),
  );
  assert.deepEqual(seen, ["build"]);
  assert.throws(
    () =>
      runQualityGates({
        only: ["nope"],
        runOne: () => ok(),
      }),
    /unknown gate\(s\): nope/,
  );
});

test("launch error (null exit code) counts as failure, not success", () => {
  const { result } = capturingConsole(() =>
    runQualityGates({
      plan: [{ id: "x", name: "X", cmd: "missing-binary", args: [] }],
      runOne: () => ({ code: null, tail: [], error: "spawn ENOENT" }),
    }),
  );
  assert.equal(result.results[0].passed, false);
  assert.equal(summarize(result.results, result.skipped), 1);
});

test("canonical contract contains the mandatory gate sequence in order", () => {
  assert.deepEqual(
    GATES.map((g) => g.id),
    [
      "environment",
      "dependencies",
      "formatting",
      "lint",
      "typecheck",
      "frontend-tests",
      "backend-tests",
      "build",
      "secret-scan",
      "artifact-scan",
      "diff-check",
    ],
  );
});

test("INTEGRATION: real orchestrator runs real project commands to green", () => {
  // Executes this repository's actual orchestrator with a fast deterministic
  // subset (environment validation + git diff check). This proves the CLI
  // entrypoint, spawn handling, exit-code propagation and output format on the
  // real host — not just the injected-runner unit paths above.
  const stdout = execFileSync(
    process.execPath,
    ["scripts/quality-gates.mjs", "--only", "environment,diff-check"],
    { encoding: "utf8" },
  );
  assert.match(stdout, /AKSHAR QUALITY GATES/);
  assert.match(stdout, /\[PASS\] Environment/);
  assert.match(stdout, /\[PASS\] Diff Check/);
  assert.match(stdout, /RESULT: PASS/);
});
