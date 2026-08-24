// AKSHAR environment contract tests (Phase 006) — Node built-in test runner.
// Unit coverage for the validator plus a live assertion that every committed
// template satisfies the contract right now.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { CONTRACT, parseTemplate, validateTemplate } from "../env-contract.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function templateWith(content, overrides = {}) {
  return {
    file: "test.env.example",
    description: "synthetic template",
    required: [],
    forbidden: [],
    values: {},
    ...overrides,
    content,
  };
}

test("parses keys while ignoring comments, blanks and malformed lines", () => {
  const entries = parseTemplate("# comment\n\nA=1\nB = spaced \nnot-a-var\nC=\n");
  assert.equal(entries.get("A"), "1");
  assert.equal(entries.get("B"), "spaced");
  assert.equal(entries.get("C"), "");
  assert.equal(entries.size, 3);
});

test("reports missing required variables", () => {
  const result = validateTemplate(templateWith("OTHER=1\n", { required: ["MISSING_ONE"] }));
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /missing required variable MISSING_ONE/);
});

test("reports value drift against pinned contract constants", () => {
  const result = validateTemplate(
    templateWith("DB_CONNECTION=sqlite\n", { values: { DB_CONNECTION: "pgsql" } }),
  );
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /must be "pgsql" but is "sqlite"/);
});

test("reports forbidden bare variables", () => {
  const result = validateTemplate(templateWith("SECRET_TOKEN=x\n", { forbidden: ["SECRET_TOKEN"] }));
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /forbidden variable present \(SECRET_TOKEN\)/);
});

test("reports committed secret material by pattern", () => {
  const result = validateTemplate(
    templateWith("APP_KEY=base64:abc123\n", { forbidden: ["APP_KEY=base64:"] }),
  );
  assert.equal(result.ok, false);
  assert.match(result.errors[0], /forbidden pattern present \(APP_KEY\)/);
});

test("accepts an empty-valued required key such as APP_KEY=", () => {
  const result = validateTemplate(
    templateWith("APP_KEY=\n", { required: ["APP_KEY"], forbidden: ["APP_KEY=base64:"] }),
  );
  assert.equal(result.ok, true);
});

for (const template of CONTRACT) {
  test(`committed template satisfies the contract: ${template.file}`, () => {
    const result = validateTemplate({
      ...template,
      content: readFileSync(join(repoRoot, template.file), "utf8"),
    });
    assert.deepEqual(result.errors, []);
  });
}
