// AKSHAR local-experience tooling tests (Phase 008) — Node built-in test
// runner. Covers the pure doctor predicates; live host checks stay in
// scripts/doctor.mjs itself (they are environment-dependent by nature).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  missingPhpExtensions,
  nodeSatisfiesEngines,
  parsePhpModules,
  phpVersionAtLeast,
  summarizeDoctorResults,
} from "../lib/doctor-checks.mjs";

test("node engine check accepts current and future majors", () => {
  assert.equal(nodeSatisfiesEngines("v20.11.1"), true);
  assert.equal(nodeSatisfiesEngines("v22.0.0"), true);
  assert.equal(nodeSatisfiesEngines("v26.0.0"), true);
  assert.equal(nodeSatisfiesEngines("v19.9.9"), false);
  assert.equal(nodeSatisfiesEngines("v18.0.0"), false);
});

test("node engine check rejects malformed versions", () => {
  assert.equal(nodeSatisfiesEngines(""), false);
  assert.equal(nodeSatisfiesEngines("not-a-version"), false);
});

test("php version comparison is major-then-minor aware", () => {
  assert.equal(phpVersionAtLeast("8.4.13", 8, 4), true);
  assert.equal(phpVersionAtLeast("8.5.0", 8, 4), true);
  assert.equal(phpVersionAtLeast("9.0.0", 8, 4), true);
  assert.equal(phpVersionAtLeast("8.3.14", 8, 4), false);
  assert.equal(phpVersionAtLeast("7.4.33", 8, 4), false);
  assert.equal(phpVersionAtLeast("garbage", 8, 4), false);
});

test("php module parser ignores banners and keeps real extensions", () => {
  const modules = parsePhpModules(
    "[PHP Modules]\nmbstring\nopenssl\npdo_pgsql\n\nZend OPcache\nbcmath\ncurl\ngarbage-line-with-spaces\n",
  );
  assert.equal(modules.has("mbstring"), true);
  assert.equal(modules.has("pdo_pgsql"), true);
  assert.equal(modules.has("zend opcache"), false);
  assert.equal(modules.has("garbage-line-with-spaces"), false);
});

test("missing extension detection is case-insensitive and complete", () => {
  const missing = missingPhpExtensions(parsePhpModules("MBSTRING\nOpenssl\n"), [
    "mbstring",
    "openssl",
    "pdo_pgsql",
  ]);
  assert.deepEqual(missing, ["pdo_pgsql"]);
});

test("missing extension detection accepts a prebuilt Set", () => {
  const missing = missingPhpExtensions(new Set(["pdo_pgsql"]), ["PDO_PGSQL"]);
  assert.deepEqual(missing, []);
});

function result(name, ok, severity = "error") {
  return { name, ok, severity, detail: "", hint: "" };
}

test("doctor summary fails only on errored results", () => {
  const summary = summarizeDoctorResults([
    result("a", true),
    result("b", false),
    { ...result("c", false, "info"), hint: "start services" },
    result("d", false, "info"),
  ]);
  assert.equal(summary.ok, false);
  assert.deepEqual(summary.failures.map((f) => f.name), ["b"]);
  assert.deepEqual(summary.advisories.map((a) => a.name), ["c"]);
});

test("doctor summary passes when only advisories are unmet", () => {
  const summary = summarizeDoctorResults([
    result("toolchain", true),
    { ...result("redis", false, "info"), hint: "npm run db:up" },
  ]);
  assert.equal(summary.ok, true);
});
