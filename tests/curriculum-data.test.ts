// Data-level tests for the curriculum ingestion pipeline. Complements the
// schema validation in scripts/curriculum/validate.ts (which the migration
// builder runs before generating SQL) with the checks that matter most for
// idempotent imports: referential integrity, duplicate detection, stable
// deterministic IDs, and agreement between the data files and the generated
// migration.
//
// Run: npm run curriculum:check (or npx vitest run tests/curriculum-data.test.ts)

import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadAndValidate, refKey } from "../scripts/curriculum/validate";
import { idFor } from "../scripts/curriculum/lib";
import { lessonsFileSchema } from "../curriculum/schema";

const MIGRATION = path.resolve(process.cwd(), "supabase/migrations/202610120009_curriculum_content.sql");

describe("curriculum data files", () => {
  const result = loadAndValidate();

  it("passes every schema and referential-integrity rule with no issues", () => {
    expect(result.issues).toEqual([]);
  });

  it("registers at least one inspected official source per pathway", () => {
    expect(result.sources.length).toBeGreaterThanOrEqual(5);
    const inspected = result.sources.filter((source) => source.inspectionStatus === "inspected-text-extracted");
    // Every pathway must trace back to a document whose text was actually read.
    for (const pathway of result.pathways) {
      expect(inspected.some((source) => source.id === pathway.sourceId), pathway.pathway).toBe(true);
    }
  });

  it("covers all four pathways with real syllabus content", () => {
    const keys = result.pathways.map((pathway) => pathway.pathway);
    for (const expected of ["neb-physics-2076", "neb-chemistry-2076", "neb-biology-2076", "ioe-entrance", "cee-entrance"]) {
      expect(keys, expected).toContain(expected);
    }
    for (const pathway of result.pathways) {
      const coverage = result.coverage.filter((entry) => entry.pathway === pathway.pathway);
      const units = coverage.reduce((sum, entry) => sum + entry.units, 0);
      const chapters = coverage.reduce((sum, entry) => sum + entry.chapters, 0);
      const topics = coverage.reduce((sum, entry) => sum + entry.topics, 0);
      expect(units, pathway.pathway).toBeGreaterThan(0);
      expect(chapters, pathway.pathway).toBeGreaterThan(0);
      expect(topics, pathway.pathway).toBeGreaterThan(0);
    }
  });

  it("keeps Grade 11 and Grade 12 content in separate grade blocks", () => {
    for (const pathway of result.pathways) {
      if (!pathway.pathway.startsWith("neb-")) continue;
      const grades = Object.keys(pathway.gradeBlocks);
      expect(grades, pathway.pathway).toContain("11");
      expect(grades, pathway.pathway).toContain("12");
      for (const grade of grades) {
        expect(pathway.gradeBlocks[grade].subjectRef.grade).toBe(grade);
      }
    }
  });

  it("keeps entrance tracks separate from NEB school streams", () => {
    for (const pathway of result.pathways) {
      for (const [key, block] of Object.entries(pathway.gradeBlocks)) {
        const ref = refKey(block.subjectRef);
        if (pathway.pathway === "ioe-entrance") {
          expect(ref.startsWith("Entrance Preparation|IOE|"), ref).toBe(true);
          expect(ref).not.toContain("NEB");
        } else if (pathway.pathway === "cee-entrance") {
          expect(ref.startsWith("Entrance Preparation|CEE|"), ref).toBe(true);
          expect(ref).not.toContain("NEB");
        } else {
          expect(ref.startsWith("NEB|"), ref).toBe(true);
          expect(ref).not.toContain("Entrance Preparation");
        }
        void key;
      }
    }
  });

  it("assigns every topic to the chapter matching its number family", () => {
    // Rule also enforced in validate.ts; re-asserted here so a regression in
    // either place cannot silently pass.
    expect(result.issues.filter((issue) => issue.includes("number-family mismatch"))).toEqual([]);
  });
});

describe("deterministic ids (idempotency)", () => {
  const result = loadAndValidate();

  it("derives the same UUID from the same natural key", () => {
    expect(idFor("neb-physics-2076", "11", "unit", "mechanics")).toBe(idFor("neb-physics-2076", "11", "unit", "mechanics"));
  });

  it("derives different UUIDs for different natural keys", () => {
    const a = idFor("neb-physics-2076", "11", "unit", "mechanics");
    const b = idFor("neb-physics-2076", "12", "unit", "mechanics");
    expect(a).not.toBe(b);
  });

  it("matches the UUIDs used in the generated migration", () => {
    const sql = fs.readFileSync(MIGRATION, "utf8");
    // A unit row's id appears both in the units insert and as the chapter
    // parent's unit_id; a deterministic id must be stable across regenerations.
    const unitId = idFor("neb-physics-2076", "11", "unit", "mechanics");
    expect(sql).toContain(`'${unitId}'`);
    // Derive a topic id from a real pathway entry rather than a guessed key.
    const pathway = result.pathways.find((entry) => entry.pathway === "neb-physics-2076")!;
    const unit = pathway.gradeBlocks["11"].units.find((entry) => entry.key === "mechanics")!;
    const chapter = unit.chapters[0];
    const topic = chapter.topics[0];
    const topicId = idFor(pathway.pathway, "11", "unit", unit.key, "chapter", chapter.key, "topic", topic.key);
    expect(sql).toContain(`'${topicId}'`);
  });

  it("generates a migration whose row counts match the data files", () => {
    const sql = fs.readFileSync(MIGRATION, "utf8");
    const result = loadAndValidate();
    const topics = result.coverage.reduce((sum, entry) => sum + entry.topics, 0);
    expect(sql).toContain(`${topics}, '`);
  });
});

describe("lessons data file", () => {
  const raw = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "curriculum/data/lessons.json"), "utf8")) as unknown;

  it("parses against the lesson schema", () => {
    const parsed = lessonsFileSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
  });

  it("only contains original-reviewed lessons tied to a pathway subject", () => {
    const parsed = lessonsFileSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    const { pathways } = loadAndValidate();
    for (const lesson of parsed.data.lessons) {
      expect(lesson.reviewStatus).toBe("original-reviewed");
      const owner = pathways.find((pathway) => pathway.pathway === lesson.pathwayFile);
      expect(owner, lesson.pathwayFile).toBeDefined();
      const ref = refKey(lesson.subjectRef);
      expect(
        pathways.some(
          (pathway) => pathway.pathway === lesson.pathwayFile && Object.values(pathway.gradeBlocks).some((block) => refKey(block.subjectRef) === ref)
        ),
        ref
      ).toBe(true);
    }
  });
});
