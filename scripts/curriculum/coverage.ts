// Curriculum coverage report: what verified content exists per pathway,
// which catalog subjects have no content yet, and which extracted titles
// show known pdftotext artifacts and need manual review.
//
// Run: npm run curriculum:coverage
//
// The report is deliberately conservative: it never claims a subject is
// "complete". A subject counts as "started" when at least one official unit
// exists, and the artifact flags list extraction defects for human review.

import fs from "node:fs";
import path from "node:path";
import { loadAndValidate, refKey } from "./validate";

// Titles ending in a conjunction/preposition were clipped by the source's
// table-cell edge; the wrapped continuation was lost in extraction.
const CLIPPED_TITLE = /\b(and|or|of|the|to|in|for|on|with|by|from|at|a|an|is|are|was|were|its|their|his|her)$/i;
// Page numbers and running-header text that pdftotext merged into cells.
const PAGE_NUMBER = /\b(1[0-9]|[2-9][0-9])\s*$/;
const RUNNING_HEADER = /Secondary Education Curriculum|Curriculum, 2076|Curriculum, 2077/;
// Two-column bleed: a capitalised fragment of the neighbouring column.
const COLUMN_BLEED = /\s{2,}[A-Z][a-z]+\s+[A-Z][a-z]+/;

export type Artifact = {
  pathway: string;
  grade: string;
  kind: "clipped-title" | "page-number" | "running-header" | "column-bleed";
  location: string;
  title: string;
};

function scanTitles(pathways: ReturnType<typeof loadAndValidate>["pathways"]): Artifact[] {
  const artifacts: Artifact[] = [];
  for (const pathway of pathways) {
    for (const [grade, block] of Object.entries(pathway.gradeBlocks)) {
      for (const unit of block.units) {
        for (const chapter of unit.chapters) {
          const gradeLabel = /^\d+$/.test(grade) ? `G${grade}` : grade;
          const where = `${pathway.pathway} ${gradeLabel} unit ${unit.key} chapter ${chapter.sourceNumber}`;
          const check = (title: string, location: string) => {
            if (RUNNING_HEADER.test(title)) artifacts.push({ pathway: pathway.pathway, grade, kind: "running-header", location, title });
            else if (PAGE_NUMBER.test(title)) artifacts.push({ pathway: pathway.pathway, grade, kind: "page-number", location, title });
            else if (CLIPPED_TITLE.test(title)) artifacts.push({ pathway: pathway.pathway, grade, kind: "clipped-title", location, title });
            else if (COLUMN_BLEED.test(title)) artifacts.push({ pathway: pathway.pathway, grade, kind: "column-bleed", location, title });
          };
          check(chapter.title, `${where} (chapter)`);
          for (const topic of chapter.topics) check(topic.title, `${where} topic ${topic.sourceNumber}`);
        }
      }
    }
  }
  return artifacts;
}

function main(): void {
  const { sources, pathways, coverage, issues } = loadAndValidate();
  if (issues.length > 0) {
    console.error("validation issues (run the tests for details):");
    for (const issue of issues) console.error(`  - ${issue}`);
  }

  console.log("=== Curriculum coverage report ===\n");

  console.log("Sources:");
  for (const source of sources) {
    const mark = source.inspectionStatus === "inspected-text-extracted" ? "text extracted" : source.inspectionStatus;
    console.log(`  [${mark}] ${source.organization} — ${source.title} (${source.docYear})`);
  }

  console.log("\nPathway content (official units/chapters/topics):");
  const byPathway = new Map<string, { units: number; chapters: number; topics: number; locator: string }>();
  for (const pathway of pathways) {
    const entries = coverage.filter((entry) => entry.pathway === pathway.pathway);
    const units = entries.reduce((sum, entry) => sum + entry.units, 0);
    const chapters = entries.reduce((sum, entry) => sum + entry.chapters, 0);
    const topics = entries.reduce((sum, entry) => sum + entry.topics, 0);
    byPathway.set(pathway.pathway, { units, chapters, topics, locator: pathway.locator });
    console.log(`  ${pathway.pathway}: ${units} units, ${chapters} chapters, ${topics} topics`);
    for (const entry of entries) {
      console.log(`    ${entry.grade} ${entry.subject}: ${entry.units}u/${entry.chapters}c/${entry.topics}t`);
    }
    console.log(`    source: ${pathway.locator}`);
  }

  // Catalog subjects with no pathway content at all.
  const covered = new Set<string>();
  for (const pathway of pathways) {
    for (const block of Object.values(pathway.gradeBlocks)) covered.add(refKey(block.subjectRef));
  }
  const catalog = [
    "NEB|11|(compulsory)|Nepali",
    "NEB|11|(compulsory)|English",
    "NEB|12|(compulsory)|Nepali",
    "NEB|12|(compulsory)|English",
    "NEB|11|Science|Physics",
    "NEB|11|Science|Chemistry",
    "NEB|11|Science|Biology",
    "NEB|11|Science|Mathematics",
    "NEB|12|Science|Physics",
    "NEB|12|Science|Chemistry",
    "NEB|12|Science|Biology",
    "NEB|12|Science|Mathematics",
    "NEB|11|Management|Accountancy",
    "NEB|11|Management|Economics",
    "NEB|11|Management|Business Studies",
    "NEB|11|Management|Mathematics",
    "NEB|12|Management|Accountancy",
    "NEB|12|Management|Economics",
    "NEB|12|Management|Business Studies",
    "NEB|12|Management|Mathematics",
    "Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Mathematics",
    "Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Physics",
    "Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Chemistry",
    "Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|English",
    "Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Biology (Zoology + Botany)",
    "Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Chemistry",
    "Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Physics",
    "Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Mental Agility Test",
  ];
  const missing = catalog.filter((ref) => !covered.has(ref));
  console.log("\nCatalog subjects with no imported content yet:");
  if (missing.length === 0) console.log("  (none)");
  for (const ref of missing) console.log(`  - ${ref}`);

  const artifacts = scanTitles(pathways);
  console.log(`\nExtraction artifacts needing review: ${artifacts.length}`);
  const byKind = new Map<string, number>();
  for (const artifact of artifacts) byKind.set(artifact.kind, (byKind.get(artifact.kind) ?? 0) + 1);
  for (const [kind, count] of byKind) console.log(`  ${kind}: ${count}`);
  for (const artifact of artifacts.slice(0, 40)) {
    console.log(`  [${artifact.kind}] ${artifact.pathway} G${artifact.grade} ${artifact.location}: ${artifact.title.slice(0, 90)}`);
  }
  if (artifacts.length > 40) console.log(`  … and ${artifacts.length - 40} more`);

  const out = path.resolve(process.cwd(), "curriculum/data/coverage-report.json");
  fs.writeFileSync(
    out,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        pathways: [...byPathway].map(([name, stats]) => ({ name, ...stats })),
        missingSubjects: missing,
        artifacts,
      },
      null,
      2
    )}\n`
  );
  console.log(`\nwrote ${path.relative(process.cwd(), out)}`);
}

if (require.main === module) main();
