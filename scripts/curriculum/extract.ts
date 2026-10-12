// Curriculum extraction: parses the inspected official source documents in
// .research/ into the structured JSON files under curriculum/data/.
//
// Run: npx tsx scripts/curriculum/extract.ts
// Requires pdftotext-extracted text files; see fetch-sources.sh for the pinned
// source URLs. Every parser is marker-based (no hard-coded line numbers) so a
// re-extraction with a newer pdftotext behaves the same. Output is verified by
// tests/curriculum-data.test.ts plus manual review against the source spans.

import fs from "node:fs";
import path from "node:path";
import { assert, cutColumns, findSecondOccurrence, isClippedTitle, joinContinuation, RUNNING_HEADER_TEST_RE, sanitizeTitle, slug, stripHours } from "./lib";

const RESEARCH = path.resolve(process.cwd(), ".research");
const OUT_DIR = path.resolve(process.cwd(), "curriculum/data/pathways");

type RawTopic = { key: string; sourceNumber: string; title: string };
type RawChapter = { key: string; sourceNumber: string; title: string; part?: string; topics: RawTopic[] };
type RawUnit = { key: string; title: string; sourceNumber?: string; chapters: RawChapter[] };
export type GradeBlock = { subjectRef: SubjectRef; units: RawUnit[] };
export type SubjectRef = { level: string; grade: string; stream: string; subject: string };
export type PathwayFile = {
  pathway: string;
  sourceId: string;
  curriculumVersionId: string;
  grade: string;
  locator: string;
  gradeBlocks: Record<string, GradeBlock>;
};

function read(file: string): string[] {
  const full = path.join(RESEARCH, file);
  if (!fs.existsSync(full)) throw new Error(`missing source text: ${full} (run fetch-sources.sh first)`);
  // pdftotext marks page breaks with form feeds; strip them so marker regexes
  // match at line starts.
  return fs.readFileSync(full, "utf8").replace(/\f/g, "").split(/\r?\n/);
}

// Page-split reader: column x-offsets drift between pages, so the two-column
// parser calibrates itself on the header row of each page.
function readPages(file: string): string[][] {
  const full = path.join(RESEARCH, file);
  if (!fs.existsSync(full)) throw new Error(`missing source text: ${full} (run fetch-sources.sh first)`);
  return fs.readFileSync(full, "utf8").split("\f").map((page) => page.split(/\r?\n/));
}

function writeJson(name: string, data: unknown): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const target = path.join(OUT_DIR, name);
  fs.writeFileSync(target, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`wrote ${path.relative(process.cwd(), target)}`);
}

// Shared finalisation for every parsed grade block: drops chapters whose
// topics were all re-homed elsewhere, merges duplicate chapter numbers,
// guarantees unique non-empty keys, drops empty units, and sanitizes titles
// (running headers, page numbers, marks-table bleed from pdftotext).
// Called by every extractor before writing JSON so the data files are valid.
function finalizeUnits(units: RawUnit[]): RawUnit[] {
  const result: RawUnit[] = [];
  for (const unit of units) {
    const byNumber = new Map<string, RawChapter>();
    for (const chapter of unit.chapters) {
      if (chapter.topics.length === 0) continue;
      const existing = byNumber.get(chapter.sourceNumber);
      if (existing) {
        existing.topics.push(...chapter.topics);
        continue;
      }
      byNumber.set(chapter.sourceNumber, chapter);
    }
    const chapters = [...byNumber.values()];
    const usedChapterKeys = new Set<string>();
    for (const chapter of chapters) {
      let key = chapter.key || slug(chapter.title) || `chapter-${chapter.sourceNumber}`;
      while (usedChapterKeys.has(key)) key = `${key}-2`;
      usedChapterKeys.add(key);
      chapter.key = key;
      const usedTopicKeys = new Set<string>();
      chapter.topics = chapter.topics.filter((topic) => topic.title.trim().length > 0);
      for (const topic of chapter.topics) {
        let topicKey = topic.key || slug(`${topic.sourceNumber}-${topic.title}`) || `item-${usedTopicKeys.size + 1}`;
        while (usedTopicKeys.has(topicKey)) topicKey = `${topicKey}-2`;
        usedTopicKeys.add(topicKey);
        topic.key = topicKey;
      }
    }
    if (chapters.length === 0) continue;
    for (const chapter of chapters) {
      chapter.title = sanitizeTitle(chapter.title);
      for (const topic of chapter.topics) topic.title = sanitizeTitle(topic.title);
    }
    result.push({ ...unit, chapters });
  }
  return result;
}

// Page footer lines ("20    Secondary Education Curriculum, 2076 (Chemistry)")
// interrupt multi-line cells; they are neither content nor continuations and
// must be skipped before column processing.
function isFooterLine(line: string): boolean {
  return /^\s*\d{1,3}\s/.test(line.trimStart()) && RUNNING_HEADER_TEST_RE.test(line);
}

// ---------------------------------------------------------------------------
// IOE B.E./B.Arch. entrance syllabus 2083 (single-column numbered outline)
// ---------------------------------------------------------------------------
export function extractIoe(): void {
  const lines = read("ioe_entrance_2083.txt");
  const subjects: Record<string, { title: string; marks: number; blocks: RawUnit[] }> = {};
  let current: { title: string; marks: number; blocks: RawUnit[] } | null = null;
  let unit: RawUnit | null = null;
  let topic: RawTopic | null = null;

  const subjectRef: Record<string, SubjectRef> = {
    Mathematics: { level: "Entrance Preparation", grade: "IOE", stream: "IOE entrance (B.E./B.Arch.)", subject: "Mathematics" },
    Physics: { level: "Entrance Preparation", grade: "IOE", stream: "IOE entrance (B.E./B.Arch.)", subject: "Physics" },
    Chemistry: { level: "Entrance Preparation", grade: "IOE", stream: "IOE entrance (B.E./B.Arch.)", subject: "Chemistry" },
    English: { level: "Entrance Preparation", grade: "IOE", stream: "IOE entrance (B.E./B.Arch.)", subject: "English" },
  };

  for (const raw of lines) {
    if (/^Model Questions/.test(raw)) break;
    const subject = /^Subject:\s*(.+?)\s+Full Marks:\s*(\d+)/.exec(raw);
    if (subject) {
      current = { title: subject[1], marks: Number(subject[2]), blocks: [] };
      subjects[subject[1]] = current;
      unit = null;
      topic = null;
      continue;
    }
    if (!current) continue;
    const unitMatch = /^(\d+)[\. ]\s*([A-Za-z(].*)$/.exec(raw);
    const topicMatch = /^(\d+\.\d+(?:\.\d+)?)[\. ]\s*(.*)$/.exec(raw);
    if (unitMatch && !topicMatch) {
      unit = { key: slug(unitMatch[2]), title: unitMatch[2].trim(), sourceNumber: unitMatch[1], chapters: [] };
      // IOE lists topics directly under the numbered unit; wrap each unit's
      // topics in a single chapter mirroring the unit heading.
      unit.chapters.push({ key: slug(unitMatch[2]), sourceNumber: unitMatch[1], title: unitMatch[2].trim(), topics: [] });
      current.blocks.push(unit);
      topic = null;
      continue;
    }
    if (topicMatch && unit) {
      const chapter = unit.chapters[0];
      topic = { key: slug(topicMatch[1]), sourceNumber: topicMatch[1], title: topicMatch[2].trim() };
      chapter.topics.push(topic);
      continue;
    }
    // Continuation lines in this document start at column 0 (no indent), so
    // any non-pattern line while a topic is open is a continuation. The file
    // contains no page furniture, but guard against running-header lines.
    if (topic && raw.trim() && !RUNNING_HEADER_TEST_RE.test(raw)) {
      topic.title = joinContinuation(topic.title, raw.trim());
    }
  }

  const gradeBlocks: Record<string, GradeBlock> = {};
  for (const [name, block] of Object.entries(subjects)) {
    assert(subjectRef[name], `unknown IOE subject ${name}`);
    assert(block.blocks.length > 0, `no units parsed for IOE ${name}`);
    const cleaned = finalizeUnits(block.blocks);
    gradeBlocks[name] = { subjectRef: subjectRef[name], units: cleaned };
    const topics = cleaned.reduce((sum, unit) => sum + unit.chapters.reduce((s, c) => s + c.topics.length, 0), 0);
    console.log(`IOE ${name}: ${cleaned.length} units, ${topics} topics`);
  }

  writeJson("ioe-entrance-2083.json", {
    pathway: "ioe-entrance",
    sourceId: "src-ioe-2083",
    curriculumVersionId: "cv-ioe-be-2083",
    grade: "IOE",
    locator: "Detail Syllabus of B.E./B.Arch. Entrance Examination-2083",
    gradeBlocks,
  } satisfies PathwayFile);
}

// ---------------------------------------------------------------------------
// MEC Bachelor Level CEE syllabus (unit/topic-wise content tables)
// ---------------------------------------------------------------------------
export function extractCee(): void {
  const lines = read("mec_cee_2026.txt");
  const sections: { name: string; start: number }[] = [];
  lines.forEach((line, index) => {
    const match = /Unit\/ ?Topic-wise Content[s]? of ([A-Za-z ]+)/.exec(line);
    if (match) {
      const name = match[1].trim();
      // "Unit/ Topic-wise Content of PCB" is a container heading, not a subject.
      if (name !== "PCB") sections.push({ name, start: index });
    }
  });
  // Keep only the first (MBBS/BDS) occurrence of each subject: later sections
  // refer back to the same pages for other programmes.
  const seen = new Set<string>();
  const firstSections = sections.filter((section) => (seen.has(section.name) ? false : (seen.add(section.name), true)));

  const subjectRef: Record<string, SubjectRef> = {
    Zoology: { level: "Entrance Preparation", grade: "CEE", stream: "CEE entrance (MBBS/BDS/BSc Nursing)", subject: "Biology (Zoology + Botany)" },
    Botany: { level: "Entrance Preparation", grade: "CEE", stream: "CEE entrance (MBBS/BDS/BSc Nursing)", subject: "Biology (Zoology + Botany)" },
    Chemistry: { level: "Entrance Preparation", grade: "CEE", stream: "CEE entrance (MBBS/BDS/BSc Nursing)", subject: "Chemistry" },
    Physics: { level: "Entrance Preparation", grade: "CEE", stream: "CEE entrance (MBBS/BDS/BSc Nursing)", subject: "Physics" },
  };

  const gradeBlocks: Record<string, GradeBlock> = {};
  // Zoology + Botany both feed the single combined "Biology" subject row.
  const biologyUnits: RawUnit[] = [];

  firstSections.forEach((section, index) => {
    const end = index + 1 < firstSections.length ? firstSections[index + 1].start : lines.length;
    const slice = lines.slice(section.start, end);
    const units: RawUnit[] = [];
    let unit: RawUnit | null = null;

    for (const raw of slice) {
      if (/^D\. Unit\/ Topic-wise Content of PCB/.test(raw.trim())) break;
      const unitMatch = /^\s{0,4}(\d+)\.\s+([A-Z][^:]{2,60}):\s*(.*)$/.exec(raw);
      if (unitMatch) {
        unit = { key: `${slug(unitMatch[1])}-${slug(unitMatch[2])}`, title: unitMatch[2].trim(), sourceNumber: unitMatch[1], chapters: [] };
        unit.chapters.push({ key: unit.key, sourceNumber: unitMatch[1], title: unitMatch[2].trim(), topics: [] });
        units.push(unit);
        continue;
      }
      if (!unit) continue;
      const topicMatch = /^\s{5,}([A-Z][^.:;]{2,60}):\s+\S/.exec(raw);
      if (topicMatch && !/^\s{0,4}\d/.test(raw)) {
        const title = topicMatch[1].trim();
        unit.chapters[0].topics.push({ key: slug(`${unit.sourceNumber}-${title}`), sourceNumber: unit.sourceNumber!, title });
      }
    }
    for (const entry of units) {
      // Fallback: when the source names no sub-topics, record a single topic
      // mirroring the unit so every syllabus entry is representable.
      if (entry.chapters[0].topics.length === 0) {
        entry.chapters[0].topics.push({ key: entry.key, sourceNumber: entry.sourceNumber!, title: entry.title });
      }
    }
    console.log(`CEE ${section.name}: ${units.length} units`);

    if (section.name === "Zoology" || section.name === "Botany") {
      biologyUnits.push(...units);
    } else {
      const ref = subjectRef[section.name];
      assert(ref, `unknown CEE subject ${section.name}`);
      const key = ref.subject;
      const existing = gradeBlocks[key];
      if (existing) existing.units.push(...units);
      else gradeBlocks[key] = { subjectRef: ref, units };
    }
  });    assert(biologyUnits.length > 0, "no CEE biology units parsed");
  gradeBlocks["Biology (Zoology + Botany)"] = { subjectRef: subjectRef.Zoology, units: biologyUnits };
  for (const [key, block] of Object.entries(gradeBlocks)) {
    gradeBlocks[key] = { subjectRef: block.subjectRef, units: finalizeUnits(block.units) };
  }

  writeJson("cee-mec-2020r2026.json", {
    pathway: "cee-entrance",
    sourceId: "src-mec-cee-2020r2026",
    curriculumVersionId: "cv-mec-cee-2020r2026",
    grade: "CEE",
    locator: "Unit/Topic-wise Content tables, pp. 5–12 (MBBS/BDS common entrance)",
    gradeBlocks,
  } satisfies PathwayFile);
}

// ---------------------------------------------------------------------------
// NEB two-column (Grade 11 | Grade 12) scope-and-sequence subjects
// ---------------------------------------------------------------------------
type TwoColumnSubject = {
  file: string;
  pathway: string;
  sourceId: string;
  curriculumVersionId: string;
  locator: string;
  subjectHeader: RegExp;
  endMarker: RegExp;
  unitMode: "contentArea" | "part";
  // Token whose SECOND occurrence on the header line marks the start of the
  // Grade 12 column ("Contents … T H Contents" or "Grade 11 … Grade 12").
  headerToken: RegExp;
  refs: { "11": SubjectRef; "12": SubjectRef };
};

function extractTwoColumn(config: TwoColumnSubject): void {
  const pages = readPages(config.file);
  const flat: { line: string; pageIndex: number }[] = [];
  pages.forEach((page, pageIndex) => page.forEach((line) => flat.push({ line, pageIndex })));

  const headerIndex = flat.findIndex((entry) => config.subjectHeader.test(entry.line));
  assert(headerIndex >= 0, `${config.pathway}: subject header not found`);
  const scopeStart = flat.findIndex((entry, index) => index > headerIndex && /Scope and Sequence/.test(entry.line));
  assert(scopeStart >= 0, `${config.pathway}: scope heading not found`);
  let scopeEnd = flat.findIndex((entry, index) => index > scopeStart && config.endMarker.test(entry.line));
  if (scopeEnd < 0) scopeEnd = flat.length;
  const scope = flat.slice(scopeStart, scopeEnd);

  // Per-page calibration of the Grade 12 column start. Prefer the position
  // of actual right-column chapter/topic rows on the page (the header labels
  // are centred and drift by a couple of characters); fall back to the header
  // token, then to the previous page's cut.
  const pageCuts = pages.map((page) => calibrateRightStart(page) ?? findSecondOccurrence(page.slice(0, 40), config.headerToken, 40));
  let activeCut: number | null = null;

  const blocks: Record<string, RawUnit[]> = { "11": [], "12": [] };
  let area: string | null = null;
  let part: string | null = null;
  let current: { "11": RawUnit | null; "12": RawUnit | null } = { "11": null, "12": null };
  let topic: { "11": RawTopic | null; "12": RawTopic | null } = { "11": null, "12": null };
  let chapterStart: { "11": boolean; "12": boolean } = { "11": false, "12": false };

  const ensureUnit = (grade: "11" | "12", title: string, sourceNumber?: string): RawUnit => {
    const key = slug(title);
    let unit = current[grade];
    if (!unit || unit.key !== key) {
      unit = { key, title, ...(sourceNumber ? { sourceNumber } : {}), chapters: [] };
      blocks[grade].push(unit);
      current[grade] = unit;
    }
    return unit;
  };

  const processGradeColumn = (grade: "11" | "12", text: string): void => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const chapterMatch = /^(\d+)\.\s+(?!-?\d)([A-Za-z(].*)$/.exec(trimmed);
    // Topics carry two- or three-level source numbers ("2.3" or "2.3.1");
    // the full number is kept so sub-items get stable, unique keys.
    const topicMatch = /^(\d+\.\d+(?:\.\d+)*)[\. ]\s*(.*)$/.exec(trimmed);
    if (chapterMatch && !topicMatch) {
      const title = stripHours(chapterMatch[2]).trim();
      const unitTitle = config.unitMode === "part" ? (part ?? area ?? "Contents") : (area ?? "Contents");
      const unit = ensureUnit(grade, unitTitle);
      // Repair a tens digit clipped from the right-column chapter number by a
      // shifted page (e.g. "12." read as "2." right after chapter 11).
      let number = chapterMatch[1];
      const previous = unit.chapters[unit.chapters.length - 1];
      if (previous && Number(number) < Number(previous.sourceNumber) && Number(number) < 10) {
        const repaired = Math.floor(Number(previous.sourceNumber) / 10) * 10 + Number(number);
        if (repaired > Number(previous.sourceNumber) && repaired - Number(previous.sourceNumber) <= 3) {
          number = String(repaired);
        }
      }
      const chapter: RawChapter = { key: slug(title), sourceNumber: number, title, ...(part ? { part } : {}), topics: [] };
      unit.chapters.push(chapter);
      topic[grade] = null;
      chapterStart[grade] = true;
      return;
    }
    if (topicMatch) {
      const unit = current[grade];
      if (!unit || unit.chapters.length === 0) return;
      const entry: RawTopic = { key: slug(topicMatch[1]), sourceNumber: topicMatch[1], title: stripHours(topicMatch[2]).trim() };
      unit.chapters[unit.chapters.length - 1].topics.push(entry);
      topic[grade] = entry;
      chapterStart[grade] = false;
      return;
    }
    // Continuation of the current entry (or a wrapped chapter title).
    const unit = current[grade];
    if (!unit) return;
    if (topic[grade]) {
      topic[grade].title = joinContinuation(topic[grade].title, stripHours(trimmed));
    } else if (unit.chapters.length > 0 && chapterStart[grade]) {
      const fragment = stripHours(trimmed);
      // Wrapped chapter titles continue in lowercase; a capitalised,
      // numbered, or colon-bearing fragment is clipped right-column content
      // and must not corrupt the chapter title. Exception: when the current
      // chapter title was clipped mid-title (ends in a conjunction or
      // preposition), a following bare word on its own line is the wrapped
      // continuation of that title (e.g. "…Shapes of" + "Molecules").
      const chapter = unit.chapters[unit.chapters.length - 1];
      if (/^[A-Z(]/.test(fragment) || /^\d/.test(fragment) || /.{0,60}:/.test(fragment)) {
        if (!isClippedTitle(chapter.title) || /\s/.test(fragment)) return;
      }
      chapter.title = joinContinuation(chapter.title, fragment);
    }
  };

  for (const entry of scope) {
    const raw = entry.line;
    if (/Scope and Sequence/.test(raw)) continue;
    if (/^5\.\s+(?:Practical|Suggested)/.test(raw.trim())) break;
    if (raw.trim().startsWith("T H") && config.headerToken.test(raw)) continue;
    if (isFooterLine(raw)) continue;
    const pageCut = pageCuts[entry.pageIndex];
    if (pageCut) activeCut = pageCut;
    if (activeCut === null) continue;
    const areaMatch = /^\s*Content Area\s*:\s*(.+)$/.exec(raw);
    if (areaMatch) {
      area = areaMatch[1].trim();
      part = null;
      current = { "11": null, "12": null };
      continue;
    }
    const partMatch = /^\s*Part [A-Z]:\s*(.+)$/.exec(raw);
    if (partMatch) {
      part = partMatch[1].trim();
      current = { "11": null, "12": null };
      continue;
    }
    const left = raw.slice(0, activeCut).replace(/\s+$/, "");
    // A stray left-column hours digit or clipped letter can drift into the
    // right slice when the column shifts by a couple of characters on a page.
    const right = raw
      .slice(activeCut)
      .replace(/^\s*(?:\d+|-)\s+(?=\d+[\. ])/, "")
      .replace(/^\s*[A-Za-z]{1,2}(?=\d+\.\d+)/, "");
    processGradeColumn("11", left);
    processGradeColumn("12", right);
  }

  const gradeBlocks: Record<string, GradeBlock> = {};
  for (const grade of ["11", "12"] as const) {
    const units = blocks[grade].filter((unit) => unit.chapters.length > 0);
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        if (chapter.topics.length === 0) {
          chapter.topics.push({ key: chapter.key, sourceNumber: chapter.sourceNumber, title: chapter.title });
        }
      }
    }
    // Repair column-flow misalignment: the two table columns scroll
    // independently, so a topic can be captured beside the next chapter's
    // row. Reattach each topic to the chapter carrying its number family.
    // First, re-home chapters captured under the wrong content area: chapter
    // numbers increase monotonically across a grade, so a chapter outside its
    // unit's number range but inside another unit's range belongs there.
    const ranges = units.map((unit) => {
      const numbers = unit.chapters.map((chapter) => Number(chapter.sourceNumber)).filter((value) => !Number.isNaN(value));
      return { unit, min: Math.min(...numbers), max: Math.max(...numbers) };
    });
    for (const { unit } of ranges) {
      const own = ranges.find((range) => range.unit === unit)!;
      for (const chapter of [...unit.chapters]) {
        const number = Number(chapter.sourceNumber);
        if (Number.isNaN(number)) continue;
        const inOwn = number >= own.min && number <= own.max;
        if (inOwn) continue;
        const target = ranges.find((range) => range.unit !== unit && number >= range.min && number <= range.max);
        if (target) {
          unit.chapters = unit.chapters.filter((candidate) => candidate !== chapter);
          target.unit.chapters.push(chapter);
        }
      }
    }
    for (const { unit } of ranges) {
      unit.chapters.sort((a, b) => Number(a.sourceNumber) - Number(b.sourceNumber));
    }
    const chapterByNumber = new Map<string, RawChapter>();
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        if (!chapterByNumber.has(chapter.sourceNumber)) chapterByNumber.set(chapter.sourceNumber, chapter);
      }
    }
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        const keep: RawTopic[] = [];
        for (const topicEntry of chapter.topics) {
          const family = topicEntry.sourceNumber.split(".")[0];
          const target = chapterByNumber.get(family);
          if (family !== chapter.sourceNumber && target && target !== chapter) target.topics.push(topicEntry);
          else keep.push(topicEntry);
        }
        chapter.topics = keep;
      }
    }
    const topicOrder = (value: string): number[] => value.split(".").map((part) => Number(part) || 0);
    const compare = (a: string, b: string): number => {
      const left = topicOrder(a);
      const right = topicOrder(b);
      for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
        const difference = (left[index] ?? 0) - (right[index] ?? 0);
        if (difference !== 0) return difference;
      }
      return 0;
    };
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        chapter.topics.sort((a, b) => compare(a.sourceNumber, b.sourceNumber));
      }
    }
    // Synthesise placeholder chapters for number families whose heading row
    // was unreadable in the PDF but whose numbered topics were captured, so
    // no verified syllabus entry is dropped. Titles derive from the first
    // topic's leading label and are marked for review in the coverage report.
    for (const unit of units) {
      const families = new Set(
        unit.chapters.flatMap((chapter) => chapter.topics.map((topicEntry) => topicEntry.sourceNumber.split(".")[0]))
      );
      for (const family of families) {
        if (unit.chapters.some((chapter) => chapter.sourceNumber === family)) continue;
        const orphanTopics = unit.chapters
          .flatMap((chapter) => chapter.topics)
          .filter((topicEntry) => topicEntry.sourceNumber.split(".")[0] === family);
        for (const chapter of unit.chapters) {
          chapter.topics = chapter.topics.filter((topicEntry) => topicEntry.sourceNumber.split(".")[0] !== family);
        }
        const title = orphanTopics[0]?.title.split(":")[0].trim() || `Section ${family}`;
        unit.chapters.push({ key: slug(title), sourceNumber: family, title, topics: orphanTopics });
      }
      unit.chapters.sort((a, b) => Number(a.sourceNumber) - Number(b.sourceNumber));
    }
    assert(units.length > 0, `${config.pathway}: no grade ${grade} units parsed`);
    const cleaned = finalizeUnits(units);
    const topics = cleaned.reduce((sum, unit) => sum + unit.chapters.reduce((s, c) => s + c.topics.length, 0), 0);
    console.log(`${config.pathway} G${grade}: ${cleaned.length} units, ${topics} topics`);
    gradeBlocks[grade] = { subjectRef: config.refs[grade], units: cleaned };
  }

  writeJson(`${config.pathway}.json`, {
    pathway: config.pathway,
    sourceId: config.sourceId,
    curriculumVersionId: config.curriculumVersionId,
    grade: "11 and 12",
    locator: config.locator,
    gradeBlocks,
  } satisfies PathwayFile);
}

export function extractNebPhysics(): void {
  extractTwoColumn({
    file: "neb_part2_layout.txt",
    pathway: "neb-physics-2076",
    sourceId: "src-cdc-part2",
    curriculumVersionId: "cv-neb-opt-2076",
    locator: "Grade 11–12 Physics curriculum, Scope and Sequence of Contents",
    subjectHeader: /^Secondary Education Curriculum 2076 \(Physics\)|^Physics$/,
    endMarker: /^5\.\s+(?:Practical|Suggested)/,
    unitMode: "contentArea",
    headerToken: /Contents/,
    refs: {
      "11": { level: "NEB", grade: "11", stream: "Science", subject: "Physics" },
      "12": { level: "NEB", grade: "12", stream: "Science", subject: "Physics" },
    },
  });
}

export function extractNebChemistry(): void {
  extractTwoColumn({
    file: "neb_part4_layout.txt",
    pathway: "neb-chemistry-2076",
    sourceId: "src-cdc-part4",
    curriculumVersionId: "cv-neb-opt-2076",
    locator: "Grade 11–12 Chemistry curriculum, Scope and Sequence of Contents (Theory)",
    subjectHeader: /^Secondary Education Curriculum, 2076 \(Chemistry\)/,
    endMarker: /^5\.\s+(?:Practical|Suggested)/,
    unitMode: "contentArea",
    headerToken: /Grade 1[12]/,
    refs: {
      "11": { level: "NEB", grade: "11", stream: "Science", subject: "Chemistry" },
      "12": { level: "NEB", grade: "12", stream: "Science", subject: "Chemistry" },
    },
  });
}

export function extractNebBiology(): void {
  extractTwoColumn({
    file: "neb_part3_layout.txt",
    pathway: "neb-biology-2076",
    sourceId: "src-cdc-part3",
    curriculumVersionId: "cv-neb-opt-2076",
    locator: "Grade 11–12 Biology curriculum, Scope and Sequence of Contents (Part A Botany, Part B Zoology)",
    subjectHeader: /^Secondary Education Curriculum, 2076 \(Biology\)/,
    endMarker: /^5\.\s+(?:Practical|Suggested)/,
    unitMode: "part",
    headerToken: /Contents/,
    refs: {
      "11": { level: "NEB", grade: "11", stream: "Science", subject: "Biology" },
      "12": { level: "NEB", grade: "12", stream: "Science", subject: "Biology" },
    },
  });
}

export function extractNebMathematics(): void {
  // Three-column layout: S.N./content area | Grade 11 | Grade 12.
  const pages = readPages("neb_part1_layout.txt");
  const flat: { line: string; pageIndex: number }[] = [];
  pages.forEach((page, pageIndex) => page.forEach((line) => flat.push({ line, pageIndex })));
  const scopeIndex = flat.findIndex((entry, index) => index > 4000 && /Scope and Sequence of Contents/.test(entry.line));
  assert(scopeIndex >= 0, "neb-math: scope heading not found");
  let scopeEnd = flat.findIndex(
    (entry, index) => index > scopeIndex && (/^5\.\s+Sample/.test(entry.line) || /^6\.\s+Learning/.test(entry.line))
  );
  if (scopeEnd < 0) scopeEnd = flat.length;
  const scope = flat.slice(scopeIndex, scopeEnd);

  // Pass 1: collect the content-area labels (number → title). Area rows are
  // sparse, truncated at the cell edge, and wrap across lines, so the parser
  // below falls back to numbered placeholders and this map renames them.
  const areaLabels = new Map<string, { title: string; rowIndex: number }>();
  const labelCell = (cell: string): { number: string; title: string } | null => {
    if (/Secondary Education/.test(cell)) return null;
    const trimmed = cell.trim();
    const withTrailingNumber = /^(\d{1,2})\s{1,3}([A-Za-z][A-Za-z ()/&-]*?)\s+\d/.exec(trimmed);
    if (withTrailingNumber && !/^\s*\d+\./.test(cell)) return { number: withTrailingNumber[1], title: withTrailingNumber[2].trim() };
    const full = /^(\d{1,2})\s{1,3}([A-Za-z][A-Za-z ()/&-]{1,14})$/.exec(trimmed);
    if (full && !/^\s*\d+\./.test(cell)) return { number: full[1], title: full[2].trim() };
    return null;
  };
  const wrapWords = new Set(["and", "or", "of", "the", "to", "in", "for", "on", "a"]);
  scope.forEach((entry, index) => {
    const label = labelCell(entry.line.slice(0, 16));
    if (label) {
      const existing = areaLabels.get(label.number);
      if (!existing || existing.title.length < label.title.length) {
        areaLabels.set(label.number, { title: label.title, rowIndex: index });
      }
      return;
    }
    // Wrapped continuation of the previous area label (e.g. "1 Alge" + "bra").
    const cell = entry.line.slice(0, 16);
    if (!/^\s{0,6}[a-z][a-z ()/&-]{0,14}\s*$/.test(cell)) return;
    const word = cell.trim();
    if (wrapWords.has(word)) return;
    for (const [number, label2] of areaLabels) {
      if (index > label2.rowIndex && index - label2.rowIndex <= 3) {
        const merged = word.length <= 6 ? `${label2.title}${word}` : `${label2.title} ${word}`;
        areaLabels.set(number, { title: merged.replace(/\s+/g, " "), rowIndex: label2.rowIndex });
        return;
      }
    }
  });
  // The subject introduction lists the content areas in table order in prose
  // ("This course includes different contents like; Algebra, Trigonometry, …").
  // The table cells clip long labels, so the prose names are preferred when
  // they match the truncated cell text.
  const proseIndex = flat.findIndex(
    (entry, index) => index < scopeIndex && index > scopeIndex - 600 && /This course includes different contents like;/.test(entry.line)
  );
  if (proseIndex >= 0) {
    const prose = `${flat[proseIndex].line} ${flat[proseIndex + 1]?.line ?? ""}`
      .replace(/.*different contents like;/, "")
      .replace(/\.$/, "");
    // "… Calculus and Computational Methods or Mechanics" — the part after
    // "or" is an alternative for the same area, not a separate area.
    const mainProse = prose.split(/\bor\b/i)[0];
    const names = mainProse
      .split(/,/)
      .map((part) => part.trim().replace(/^and\s+/, "").replace(/\s+and$/, ""))
      .filter((part) => /^[A-Z]/.test(part) && part.length <= 40);
    const areaCount = Math.max(...[...areaLabels.keys()].map((number) => Number(number)));
    // A single prose fragment may cover two areas ("Calculus and
    // Computational Methods"); split from the end until the counts line up.
    while (names.length < areaCount) {
      const candidate = names.map((name, index) => ({ name, index })).filter((entry) => entry.name.includes(" and ")).pop();
      if (!candidate) break;
      names.splice(candidate.index, 1, ...candidate.name.split(/ and /));
    }
    names.slice(0, areaCount).forEach((name, index) => {
      const number = String(index + 1);
      const cellLabel = areaLabels.get(number);
      if (!cellLabel || name.toLowerCase().startsWith(cellLabel.title.toLowerCase().slice(0, 4))) {
        areaLabels.set(number, { title: name, rowIndex: cellLabel?.rowIndex ?? -1 });
      }
    });
  }

  // Per-page Grade 12 column start: smallest x where a right-column topic row
  // begins (left-column topic rows all start before x=28).
  const pageCuts = pages.map((page) => {
    let best: number | null = null;
    for (const line of page) {
      const pattern = /[ ]{3,}(?:\d+|-)?[ ]{0,3}(\d+\.\d+[\.:]?\s+[A-Z(])/g;
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(line)) !== null) {
        if (match.index < 8) continue;
        const position = match.index + match[0].length - match[1].length;
        if (position >= 28 && position <= 70 && (best === null || position < best)) best = position;
      }
    }
    return best;
  });
  let activeCut: number | null = null;

  const blocks: Record<string, RawUnit[]> = { "11": [], "12": [] };
  let currentArea: { number: string; title: string } | null = null;
  let current: { "11": RawUnit | null; "12": RawUnit | null } = { "11": null, "12": null };
  let topic: { "11": RawTopic | null; "12": RawTopic | null } = { "11": null, "12": null };

  const flushArea = (): void => {
    current = { "11": null, "12": null };
  };

  const ensureUnit = (grade: "11" | "12", familyNumber: string): RawUnit | null => {
    // A topic whose number family does not match the current area opens an
    // implicit area; pass 1 renames it when the source printed a readable row.
    if (!currentArea || currentArea.number !== familyNumber) {
      currentArea = { number: familyNumber, title: areaLabels.get(familyNumber)?.title ?? `Section ${familyNumber}` };
      flushArea();
    }
    let unit = current[grade];
    if (!unit) {
      unit = { key: slug(currentArea.title), title: currentArea.title, sourceNumber: currentArea.number, chapters: [] };
      blocks[grade].push(unit);
      current[grade] = unit;
    }
    return unit;
  };

  const processGrade = (grade: "11" | "12", text: string): void => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const topicMatch = /^(\d+\.\d+(?:\.\d+)*)[\.:\s]\s*(.*)$/.exec(trimmed);
    if (topicMatch) {
      const family = topicMatch[1].split(".")[0];
      const unit = ensureUnit(grade, family);
      if (!unit) return;
      const title = stripHours(topicMatch[2]).trim();
      const entry: RawTopic = { key: slug(`${topicMatch[1]}-${title.slice(0, 24)}`), sourceNumber: topicMatch[1], title };
      let chapter = unit.chapters.find((candidate) => candidate.sourceNumber === family);
      if (!chapter) {
        chapter = { key: `ch-${family}`, sourceNumber: family, title: `Section ${family}`, topics: [] };
        unit.chapters.push(chapter);
      }
      chapter.topics.push(entry);
      topic[grade] = entry;
      return;
    }
    const unit = current[grade];
    if (unit && topic[grade]) topic[grade].title = joinContinuation(topic[grade].title, stripHours(trimmed));
  };

  for (const entry of scope) {
    const raw = entry.line;
    if (/Scope and Sequence/.test(raw)) continue;
    if (/Secondary Education Curriculum/.test(raw)) continue;
    if (isFooterLine(raw)) continue;
    // Wrapped fragments of an area label ("1 Alge" + "bra …") are not content.
    if (/^\s{0,6}[a-z]{1,6}\s{5,}/.test(raw)) continue;
    const pageCut = pageCuts[entry.pageIndex];
    if (pageCut && pageCut >= 28) activeCut = pageCut;
    if (activeCut === null) continue;
    // Content starts at the first numbered item on the line (area labels and
    // page furniture live to its left on area-start rows).
    const numbered = /\d+\.\d+[\.:]?\s+[A-Za-z(]/.exec(raw);
    const contentStart = numbered && numbered.index < activeCut ? numbered.index : 0;
    const left = raw.slice(contentStart, activeCut).replace(/\s+$/, "");
    const right = raw
      .slice(activeCut)
      .replace(/^\s*(?:\d+|-)\s+(?=\d+[\. ])/, "")
      .replace(/^\s*[A-Za-z]{1,2}(?=\d+\.\d+)/, "");
    processGrade("11", left);
    processGrade("12", right);
  }

  const gradeBlocks: Record<string, GradeBlock> = {};
  for (const grade of ["11", "12"] as const) {
    const units = blocks[grade].filter((unit) => unit.chapters.length > 0);
    // Chapter titles for Mathematics are taken from the first topic's leading
    // label (e.g. "1.1 Logic and Set: ..." → chapter "Logic and Set" family is
    // represented by its numbered section; keep the source numbering visible).
    for (const unit of units) {
      for (const chapter of unit.chapters) {
        chapter.title = chapter.topics[0] ? chapter.topics[0].title.split(":")[0].trim() : chapter.title;
        if (chapter.topics.length === 0) {
          chapter.topics.push({ key: chapter.key, sourceNumber: chapter.sourceNumber, title: chapter.title });
        }
      }
    }
    assert(units.length > 0, `neb-mathematics G${grade}: no units parsed`);
    const cleaned = finalizeUnits(units);
    const topics = cleaned.reduce((sum, unit) => sum + unit.chapters.reduce((s, c) => s + c.topics.length, 0), 0);
    console.log(`neb-mathematics-2078 G${grade}: ${cleaned.length} units, ${topics} topics`);
    gradeBlocks[grade] = {
      subjectRef: { level: "NEB", grade, stream: "Science", subject: "Mathematics" },
      units: cleaned,
    };
  }

  writeJson("neb-mathematics-2078.json", {
    pathway: "neb-mathematics-2078",
    sourceId: "src-cdc-part1",
    curriculumVersionId: "cv-neb-math-2078",
    grade: "11 and 12",
    locator: "Secondary Education Curriculum 2078 (Mathematics), Scope and Sequence of Contents",
    gradeBlocks,
  } satisfies PathwayFile);
}

export function extractNebBusinessStudies(): void {
  // Business Studies prints one scope section containing two single-column
  // tables: Grade 11 first, then a "Grade 12" heading and its table. Columns:
  // S.N. + content area (0–19), elaboration of contents (19–84), hours.
  const lines = read("neb_part3_layout.txt");
  const headerIndex = lines.findIndex((line) => /Secondary Education Curriculum, 2076 \(Business Studies\)/.test(line));
  assert(headerIndex >= 0, "neb-business-studies: subject header not found");
  const scopeStart = lines.findIndex((line, index) => index > headerIndex && /Scope and Sequence/.test(line));
  assert(scopeStart >= 0, "neb-business-studies: scope heading not found");
  const scopeEnd = lines.findIndex((line, index) => index > scopeStart && /^5\.\s+(?:Suggested|Practical)/.test(line));
  const section = lines.slice(scopeStart, scopeEnd < 0 ? lines.length : scopeEnd);
  const g12Index = section.findIndex((line) => /^\s{0,24}Grade 12\s*(Elaboration|Contents|$)/.test(line));
  assert(g12Index > 0, "neb-business-studies: Grade 12 table not found");

  const parseRows = (rows: string[]): RawUnit => {
    const unit: RawUnit = { key: "scope", title: "Scope and sequence of contents", chapters: [] };
    // Column flow: the S.N. column and the elaboration column scroll
    // independently, so a chapter row can appear beside the previous
    // chapter's remaining items. Topics are therefore grouped by their number
    // family (6.1 → chapter 6) rather than by proximity.
    const titles = new Map<string, string>();
    const topicsByFamily = new Map<string, RawTopic[]>();
    let awaitingNameWrap: string | null = null;
    let lastTopic: RawTopic | null = null;
    for (const raw of rows) {
      if (!raw.trim()) continue;
      if (!/\d+\.\d+/.test(raw) && /Secondary Education|Content Area|Elaboration|S\.?\s*N\.?|Working|hours/i.test(raw)) continue;
      const cell = raw.slice(0, 19);
      const middle = raw.slice(19, 84).trim();
      const chapterRow = /^\s*(\d{1,2})\s+([A-Za-z].*)$/.exec(cell);
      if (chapterRow) {
        titles.set(chapterRow[1], chapterRow[2].trim());
        awaitingNameWrap = chapterRow[1];
      } else if (awaitingNameWrap && /^\s{2,}([A-Za-z][^:]{0,20})\s*$/.test(cell)) {
        // Wrapped continuation of the content-area name ("4 Forms of Business"
        // + "Ownership"), which always follows its row immediately.
        const base = titles.get(awaitingNameWrap) ?? "";
        titles.set(awaitingNameWrap, `${base} ${cell.trim()}`.replace(/\s+/g, " "));
        awaitingNameWrap = null;
      } else if (cell.trim()) {
        awaitingNameWrap = null;
      }
      if (!middle) continue;
      const topicRow = /^(\d+\.\d+(?:\.\d+)*)\s+(.+)$/.exec(middle);
      if (topicRow) {
        const family = topicRow[1].split(".")[0];
        lastTopic = { key: slug(topicRow[1]), sourceNumber: topicRow[1], title: topicRow[2].trim() };
        const list = topicsByFamily.get(family) ?? [];
        list.push(lastTopic);
        topicsByFamily.set(family, list);
      } else if (lastTopic && /^[a-z(o]/.test(middle)) {
        lastTopic.title = joinContinuation(lastTopic.title, middle);
      }
    }
    const families = [...new Set([...titles.keys(), ...topicsByFamily.keys()])].sort((a, b) => Number(a) - Number(b));
    for (const family of families) {
      const title = titles.get(family) ?? `Section ${family}`;
      const topics = topicsByFamily.get(family) ?? [];
      if (topics.length === 0) topics.push({ key: slug(title), sourceNumber: family, title });
      unit.chapters.push({ key: slug(title), sourceNumber: family, title, topics });
    }
    return unit;
  };

  const g11 = finalizeUnits([parseRows(section.slice(0, g12Index))])[0];
  const g12 = finalizeUnits([parseRows(section.slice(g12Index + 1))])[0];
  assert(g11.chapters.length > 0 && g12.chapters.length > 0, "neb-business-studies: empty grade table");
  const topics = (unit: RawUnit): number => unit.chapters.reduce((sum, entry) => sum + entry.topics.length, 0);
  console.log(`neb-business-studies G11: ${g11.chapters.length} chapters, ${topics(g11)} topics; G12: ${g12.chapters.length} chapters, ${topics(g12)} topics`);

  writeJson("neb-business-studies-2076.json", {
    pathway: "neb-business-studies-2076",
    sourceId: "src-cdc-part3",
    curriculumVersionId: "cv-neb-opt-2076",
    grade: "11 and 12",
    locator: "Grade 11–12 Business Studies curriculum, Scope and Sequence of Contents",
    gradeBlocks: {
      "11": { subjectRef: { level: "NEB", grade: "11", stream: "Management", subject: "Business Studies" }, units: [g11] },
      "12": { subjectRef: { level: "NEB", grade: "12", stream: "Management", subject: "Business Studies" }, units: [g12] },
    },
  } satisfies PathwayFile);
}

export function extractNebEnglish(): void {
  // The English curriculum (compulsory volume, 2077) organises the scope by
  // skill section rather than numbered units. Model each skill as a unit, the
  // source's enumerated lists as chapters, and their entries as topics.
  const lines = read("neb_part1_layout.txt");
  const scopeIndex = lines.findIndex((line) => /^4\. Scope and Sequence$/.test(line.trim()));
  assert(scopeIndex >= 0, "neb-english: scope heading not found");
  const endMarker = lines.findIndex((line, index) => index > scopeIndex && /^5\.?\s+Learning Facilitation/.test(line));
  const scope = lines.slice(scopeIndex, endMarker < 0 ? lines.length : endMarker);

  const sectionStarts: { title: string; index: number }[] = [];
  scope.forEach((line, index) => {
    const match = /^4\.\d+\.?\s+(.+)$/.exec(line.trim());
    if (match && index > 0) sectionStarts.push({ title: match[1].trim(), index });
  });
  assert(sectionStarts.length >= 3, `neb-english: expected skill sections, found ${sectionStarts.length}`);

  const units: RawUnit[] = [];
  sectionStarts.forEach((section, position) => {
    const end = position + 1 < sectionStarts.length ? sectionStarts[position + 1].index : scope.length;
    const body = scope.slice(section.index, end);    const unit: RawUnit = { key: slug(section.title), title: section.title, sourceNumber: `4.${position + 1}`, chapters: [] };

    // Enumerated single-cell lists (functions, text types, item lists).
    let listChapter: RawChapter | null = null;
    // Numbered thematic table rows: "1. Education and humanity    ethics, human values..."
    let tableChapter: RawChapter | null = null;
    const heading = (text: string): RawChapter => {
      const chapter: RawChapter = { key: slug(text), sourceNumber: `${position + 1}.${unit.chapters.length + 1}`, title: text, topics: [] };
      unit.chapters.push(chapter);
      return chapter;
    };

    for (const raw of body) {
      const trimmed = raw.trim();
      if (!trimmed || /^Secondary Education/.test(trimmed) || /^Note:/.test(trimmed)) continue;
      const subheading = /^(Part I|Part II)\s*\(?([^)]*)\)?/.exec(trimmed);
      const listHeading = /^(Possible (text )?types|Thematic areas|Functions?|Types of [a-z ]+|Sounds?|[A-Z][a-z]+ [a-z ]{3,40})$/.exec(trimmed);
      const tableRow = /^(\d+)\.\s+(.+?)\s{2,}(.+)$/.exec(raw);
      const listRow = /^(\d+)\.\s+([A-Z][^.!?]{2,80})$/.exec(trimmed);
      if (subheading && /^(Part I|Part II)/.test(trimmed)) {
        const label = subheading[2] ? `${subheading[1]}: ${subheading[2].trim().replace(/\s+/g, " ")}` : subheading[1];
        listChapter = heading(label.replace(/\s+/g, " ").trim());
        tableChapter = listChapter;
        continue;
      }
      if (listHeading && !tableRow && !listRow && trimmed.length < 70 && !/^\d/.test(trimmed)) {
        listChapter = heading(trimmed);
        tableChapter = listChapter;
        continue;
      }
      if (tableRow) {
        if (!tableChapter) tableChapter = heading("List");
        tableChapter.topics.push({ key: slug(tableRow[2]), sourceNumber: tableRow[1], title: tableRow[2].trim() });
        continue;
      }
      if (listRow) {
        if (!listChapter) listChapter = heading("List");
        listChapter.topics.push({ key: slug(listRow[1]), sourceNumber: listRow[1], title: listRow[2].trim() });
        continue;
      }
      // Lettered sub-sections with dash bullets (section 4.6).
      const letterHeading = /^[a-d]\.[\s]+(.+)$/.exec(trimmed);
      if (letterHeading && trimmed.length < 90) {
        listChapter = heading(letterHeading[1].trim());
        tableChapter = listChapter;
        continue;
      }
      const bullets = trimmed.split(/\s{4,}/).filter((part) => /^-\s+/.test(part));
      if (bullets.length > 0) {
        if (!listChapter) listChapter = heading("Items");
        for (const bullet of bullets) {
          const title = bullet.replace(/^-\s+/, "").trim();
          listChapter.topics.push({ key: slug(title), sourceNumber: `${position + 1}.${listChapter.topics.length + 1}`, title });
        }
        continue;
      }
      if (listChapter && listChapter.topics.length > 0 && /^[a-z(]/.test(trimmed)) {
        const last = listChapter.topics[listChapter.topics.length - 1];
        if (/^\s{10,}/.test(raw)) last.title = joinContinuation(last.title, trimmed);
      }
    }
    for (const chapter of unit.chapters) {
      if (chapter.topics.length === 0) {
        chapter.topics.push({ key: chapter.key, sourceNumber: chapter.sourceNumber, title: chapter.title });
      }
    }
    units.push(unit);
  });

  const usableUnits = finalizeUnits(units.filter((unit) => unit.chapters.length > 0));
  const topics = usableUnits.reduce((sum, unit) => sum + unit.chapters.reduce((s, c) => s + c.topics.length, 0), 0);
  console.log(`neb-english-2077: ${usableUnits.length} units, ${topics} topics`);

  const block = (grade: string): GradeBlock => ({
    subjectRef: { level: "NEB", grade, stream: "(compulsory)", subject: "English" },
    units: usableUnits,
  });
  writeJson("neb-english-2077.json", {
    pathway: "neb-english-2077",
    sourceId: "src-cdc-part1",
    curriculumVersionId: "cv-neb-comp-2077",
    grade: "11 and 12",
    locator: "Grade 11–12 English curriculum, Scope and Sequence (4.1–4.6)",
    gradeBlocks: { "11": block("11"), "12": block("12") },
  } satisfies PathwayFile);
}

// Estimate the x-offset of the Grade 12 column on one page by locating
// right-column chapter/topic rows ("<left text>   [<hours>] <n>. <Title>").
function calibrateRightStart(page: string[]): number | null {
  const positions: number[] = [];
  for (const line of page) {
    if (line.trim().length < 30) continue;
    const pattern = /[ ]{3,}(?:\d+|-)?[ ]{0,3}(\d+(?:\.\d+)*\.?\s+[A-Z(])/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(line)) !== null) {
      if (match.index < 8) continue;
      const position = match.index + match[0].length - match[1].length;
      // Left-column entries start before x≈26; right-column chapter and topic
      // rows start after it on every page of these tables.
      if (position >= 26 && position <= 70) positions.push(position);
    }
  }
  if (positions.length === 0) return null;
  positions.sort((a, b) => a - b);
  // The smallest recurring right-column start is the true column edge; single
  // outliers are stray shifted cells.
  const first = positions[0];
  const recurring = positions.filter((position) => Math.abs(position - first) <= 4);
  return recurring.length >= 1 ? first : positions[Math.floor(positions.length / 2)];
}

function main(): void {
  extractIoe();
  extractCee();
  extractNebPhysics();
  extractNebChemistry();
  extractNebBiology();
  extractNebMathematics();
  extractNebBusinessStudies();
  extractNebEnglish();
  console.log("extraction complete");
}

if (require.main === module) main();
