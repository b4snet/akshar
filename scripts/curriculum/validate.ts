// Validation for the curriculum data files. Used by the migration builder and
// by tests/curriculum-data.test.ts. Every rule here exists because the source
// documents are extracted automatically: the checks are what turn the JSON
// into data we are willing to publish.

import fs from "node:fs";
import path from "node:path";
import {
  curriculumSourceSchema,
  curriculumVersionSchema,
  pathwayFileSchema,
  type CurriculumSource,
  type CurriculumVersion,
  type PathwayFile,
} from "../../curriculum/schema";

const DATA_DIR = path.resolve(process.cwd(), "curriculum/data");
const PATHWAYS_DIR = path.join(DATA_DIR, "pathways");

// Natural keys of subjects that exist in the database (migrations 0005/0007).
// A pathway file referencing anything else would silently import nothing.
export const KNOWN_SUBJECT_REFS = new Set([
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
]);

export const refKey = (ref: { level: string; grade: string; stream: string; subject: string }): string =>
  `${ref.level}|${ref.grade}|${ref.stream}|${ref.subject}`;

export type CoverageStats = {
  pathway: string;
  grade: string;
  subject: string;
  units: number;
  chapters: number;
  topics: number;
};

export type ValidationResult = {
  sources: CurriculumSource[];
  versions: CurriculumVersion[];
  pathways: PathwayFile[];
  coverage: CoverageStats[];
  issues: string[];
};

export function loadAndValidate(): ValidationResult {
  const issues: string[] = [];
  const registry = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "sources.json"), "utf8")) as {
    sources: unknown;
    versions: unknown;
  };

  const sources: CurriculumSource[] = [];
  for (const raw of registry.sources as unknown[]) {
    const parsed = curriculumSourceSchema.safeParse(raw);
    if (!parsed.success) issues.push(`sources.json: ${parsed.error.issues[0]?.message ?? "invalid"}`);
    else sources.push(parsed.data);
  }
  const versions: CurriculumVersion[] = [];
  for (const raw of registry.versions as unknown[]) {
    const parsed = curriculumVersionSchema.safeParse(raw);
    if (!parsed.success) issues.push(`versions: ${parsed.error.issues[0]?.message ?? "invalid"}`);
    else versions.push(parsed.data);
  }

  const sourceIds = new Set(sources.map((source) => source.id));
  const versionIds = new Set(versions.map((version) => version.id));
  for (const version of versions) {
    if (!sourceIds.has(version.sourceId)) issues.push(`version ${version.id}: unknown source ${version.sourceId}`);
  }

  const pathways: PathwayFile[] = [];
  const coverage: CoverageStats[] = [];
  const refOwners = new Map<string, string>();

  for (const file of fs.readdirSync(PATHWAYS_DIR).sort()) {
    if (!file.endsWith(".json")) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(PATHWAYS_DIR, file), "utf8")) as unknown;
    const parsed = pathwayFileSchema.safeParse(raw);
    if (!parsed.success) {
      issues.push(`${file}: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
      continue;
    }
    const pathway = parsed.data;
    pathways.push(pathway);
    if (!sourceIds.has(pathway.sourceId)) issues.push(`${file}: unknown sourceId ${pathway.sourceId}`);
    if (!versionIds.has(pathway.curriculumVersionId)) issues.push(`${file}: unknown curriculumVersionId ${pathway.curriculumVersionId}`);

    for (const [grade, block] of Object.entries(pathway.gradeBlocks)) {
      const refKeyed = refKey(block.subjectRef);
      if (!KNOWN_SUBJECT_REFS.has(refKeyed)) issues.push(`${file} grade ${grade}: subject ref not in catalog: ${refKeyed}`);
      const owner = refOwners.get(`${pathway.pathway.split("-").slice(0, -1).join("-")}|${refKeyed}`);
      if (owner) issues.push(`${file}: duplicate pathway for same subject (${owner})`);
      refOwners.set(`${pathway.pathway.split("-").slice(0, -1).join("-")}|${refKeyed}`, file);

      const unitKeys = new Set<string>();
      let chapterCount = 0;
      let topicCount = 0;
      for (const unit of block.units) {
        if (unitKeys.has(unit.key)) issues.push(`${file} grade ${grade}: duplicate unit key ${unit.key}`);
        unitKeys.add(unit.key);
        const chapterKeys = new Set<string>();
        for (const chapter of unit.chapters) {
          chapterCount += 1;
          if (chapterKeys.has(chapter.key)) issues.push(`${file} grade ${grade}: duplicate chapter key ${chapter.key} in unit ${unit.key}`);
          chapterKeys.add(chapter.key);
          if (chapter.topics.length === 0) issues.push(`${file} grade ${grade}: chapter ${chapter.sourceNumber} has no topics`);
          const topicKeys = new Set<string>();
          for (const topic of chapter.topics) {
            topicCount += 1;
            if (topicKeys.has(topic.key)) issues.push(`${file} grade ${grade}: duplicate topic key ${topic.key} in chapter ${chapter.sourceNumber}`);
            topicKeys.add(topic.key);
            if (!topic.title.trim()) issues.push(`${file} grade ${grade}: empty topic title under chapter ${chapter.sourceNumber}`);
            if (/^\d+$/.test(chapter.sourceNumber)) {
              const family = topic.sourceNumber.split(".")[0];
              if (family !== chapter.sourceNumber) {
                issues.push(`${file} grade ${grade}: topic ${topic.sourceNumber} under chapter ${chapter.sourceNumber} (number-family mismatch)`);
              }
            }
          }
        }
        if (unit.chapters.length === 0) issues.push(`${file} grade ${grade}: unit ${unit.key} has no chapters`);
      }
      coverage.push({
        pathway: pathway.pathway,
        grade,
        subject: block.subjectRef.subject,
        units: block.units.length,
        chapters: chapterCount,
        topics: topicCount,
      });
    }
  }

  return { sources, versions, pathways, coverage, issues };
}
