// One-off verification: row counts + subject resolution for the imported
// curriculum catalog. Uses the publishable key against PostgREST.
import fs from "node:fs";
import path from "node:path";

const env = fs.readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
for (const line of env.split(/\r?\n/)) {
  const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const base = process.env.NEXT_PUBLIC_SUPABASE_URL + "/rest/v1";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const headers = { apikey: key, Authorization: `Bearer ${key}`, Prefer: "count=exact" };

async function count(table) {
  const res = await fetch(`${base}/${table}?select=id`, { headers });
  const range = res.headers.get("content-range");
  if (!res.ok) return `ERROR ${res.status} ${await res.text()}`;
  return range ?? "?";
}

for (const table of ["curriculum_sources", "curriculum_versions", "units", "chapters", "topics", "curriculum_import_runs", "subjects"]) {
  console.log(`${table}: ${await count(table)}`);
}

// Subject resolution check for every unit row.
const res = await fetch(`${base}/units?select=id,subject_id`, { headers });
const units = await res.json();
const missing = units.filter((u) => !u.subject_id);
console.log(`units with unresolved subject: ${missing.length}`);
if (missing.length) console.log(missing.slice(0, 10));

// Distinct subjects carrying units.
const res2 = await fetch(`${base}/subjects?select=id,name,grade_id,stream_id`, { headers });
const subjects = await res2.json();
const byId = new Map(subjects.map((s) => [s.id, s]));
const used = new Map();
for (const u of units) used.set(u.subject_id, (used.get(u.subject_id) ?? 0) + 1);
for (const [id, n] of used) {
  const s = byId.get(id);
  console.log(`  ${s?.name ?? "?"} (grade ${s?.grade_id ?? "?"}, stream ${s?.stream_id ?? "?"}) — ${n} units`);
}
