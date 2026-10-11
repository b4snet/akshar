// Subject eligibility: the single source of truth for deciding which subjects
// a student is allowed to see for a given education level, grade, and stream.
//
// This module is deliberately pure (no I/O, no server-only imports) so the
// server actions can filter before any data leaves the API *and* so tests can
// exercise every branch directly.
//
// Policy notes:
// - A selection whose grade or stream does not exist in the catalog yields an
//   empty subject list. We never fall back to "show everything".
// - Grade-level compulsory subjects (Nepali/English) are visible for the grade
//   regardless of stream; optional/stream subjects appear only for the exact
//   selected stream.
// - When no stream has been chosen yet the status is "stream-required": the
//   caller may show the compulsory subjects together with a prompt to choose.

export type VerificationStatus = "official" | "school-configured" | "unverified";

export type CatalogSubject = {
  id: string;
  name: string;
  code: string | null;
  compulsory: boolean;
  optional: boolean;
  marks: number | null;
  verification: VerificationStatus;
  displayOrder: number;
  gradeName: string;
  streamName: string | null;
  educationLevel: string;
};

export type CurriculumSelection = {
  educationLevel: string;
  grade: string;
  stream: string | null;
};

export type Catalog = {
  levels: string[];
  gradesByLevel: Map<string, string[]>;
  streamsByGrade: Map<string, string[]>;
  subjects: CatalogSubject[];
};

export type EligibilityStatus = "ok" | "stream-required" | "unknown-grade" | "unknown-stream" | "no-subjects";

export type EligibilityResult = {
  status: EligibilityStatus;
  subjects: CatalogSubject[];
};

export type RawCatalogRows = {
  educationLevels: { name: string; display_order: number | null }[];
  grades: { name: string; education_level_name: string; display_order: number | null }[];
  streams: { name: string; grade_name: string; education_level_name: string; display_order: number | null }[];
  subjects: {
    id: string;
    name: string;
    code: string | null;
    compulsory: boolean;
    optional: boolean | null;
    marks: number | null;
    verification_status: VerificationStatus | null;
    display_order: number | null;
    grade_name: string | null;
    stream_name: string | null;
    subject_education_level: string | null;
  }[];
};

function uniqueOrdered(values: { value: string; order: number | null }[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of [...values].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))) {
    if (seen.has(item.value)) continue;
    seen.add(item.value);
    result.push(item.value);
  }
  return result;
}

export function buildCatalog(rows: RawCatalogRows): Catalog {
  const levels = uniqueOrdered(rows.educationLevels.map((level) => ({ value: level.name, order: level.display_order })));

  const gradesByLevel = new Map<string, string[]>();
  for (const level of levels) gradesByLevel.set(level, []);
  for (const grade of rows.grades) {
    const list = gradesByLevel.get(grade.education_level_name);
    if (list) list.push(grade.name);
  }
  for (const [level, list] of gradesByLevel) {
    const ordered = uniqueOrdered(
      rows.grades.filter((grade) => grade.education_level_name === level).map((grade) => ({ value: grade.name, order: grade.display_order }))
    );
    gradesByLevel.set(level, ordered.length ? ordered : list);
  }

  const streamsByGrade = new Map<string, string[]>();
  const gradeLevelKey = new Map<string, string>();
  for (const grade of rows.grades) gradeLevelKey.set(`${grade.education_level_name}||${grade.name}`, grade.education_level_name);
  for (const stream of rows.streams) {
    const key = `${stream.education_level_name}||${stream.grade_name}`;
    const list = streamsByGrade.get(key) ?? [];
    list.push(stream.name);
    streamsByGrade.set(key, list);
  }
  for (const [key, list] of streamsByGrade) {
    const [level, gradeName] = key.split("||");
    const ordered = uniqueOrdered(
      rows.streams
        .filter((stream) => stream.education_level_name === level && stream.grade_name === gradeName)
        .map((stream) => ({ value: stream.name, order: stream.display_order }))
    );
    streamsByGrade.set(key, ordered.length ? ordered : list);
  }
  void gradeLevelKey;

  const subjects: CatalogSubject[] = rows.subjects.map((subject) => ({
    id: subject.id,
    name: subject.name,
    code: subject.code,
    compulsory: subject.compulsory,
    optional: subject.optional ?? false,
    marks: subject.marks,
    verification: subject.verification_status ?? "unverified",
    displayOrder: subject.display_order ?? 1,
    gradeName: subject.grade_name ?? "",
    streamName: subject.stream_name,
    educationLevel: subject.subject_education_level ?? "",
  }));

  return { levels, gradesByLevel, streamsByGrade, subjects };
}

export function selectionKey(educationLevel: string, grade: string): string {
  return `${educationLevel}||${grade}`;
}

export function availableGrades(catalog: Catalog, educationLevel: string): string[] {
  return catalog.gradesByLevel.get(educationLevel) ?? [];
}

export function availableStreams(catalog: Catalog, educationLevel: string, grade: string): string[] {
  return catalog.streamsByGrade.get(selectionKey(educationLevel, grade)) ?? [];
}

// Default selection for a student who has not chosen yet: first level, first
// grade, and — when the grade has exactly one configured stream (the entrance
// tracks) — that stream, otherwise none.
export function defaultSelection(catalog: Catalog): CurriculumSelection | null {
  const educationLevel = catalog.levels[0];
  if (!educationLevel) return null;
  const grade = availableGrades(catalog, educationLevel)[0];
  if (!grade) return null;
  const streams = availableStreams(catalog, educationLevel, grade);
  return { educationLevel, grade, stream: streams.length === 1 ? streams[0] : null };
}

// Normalize a (possibly stale or client-supplied) selection against the real
// catalog. Unknown names are dropped instead of trusted: an unknown level or
// grade falls back to the default selection, an unknown stream becomes null.
export function normalizeSelection(catalog: Catalog, selection: CurriculumSelection): CurriculumSelection {
  const fallback = defaultSelection(catalog);
  if (!catalog.levels.includes(selection.educationLevel)) return fallback ?? { educationLevel: "", grade: "", stream: null };

  const grades = availableGrades(catalog, selection.educationLevel);
  const grade = grades.includes(selection.grade) ? selection.grade : grades[0];
  if (!grade) return { educationLevel: selection.educationLevel, grade: "", stream: null };

  const streams = availableStreams(catalog, selection.educationLevel, grade);
  const stream = selection.stream && streams.includes(selection.stream) ? selection.stream : streams.length === 1 ? streams[0] : null;
  return { educationLevel: selection.educationLevel, grade, stream };
}

// The core rule. Never returns subjects outside the selection.
export function eligibleSubjects(catalog: Catalog, selection: CurriculumSelection): EligibilityResult {
  if (!catalog.levels.includes(selection.educationLevel)) return { status: "unknown-grade", subjects: [] };

  const grades = availableGrades(catalog, selection.educationLevel);
  if (!selection.grade || !grades.includes(selection.grade)) return { status: "unknown-grade", subjects: [] };

  const streams = availableStreams(catalog, selection.educationLevel, selection.grade);
  const gradeSubjects = catalog.subjects.filter(
    (subject) => subject.educationLevel === selection.educationLevel && subject.gradeName === selection.grade
  );
  const compulsory = gradeSubjects.filter((subject) => subject.compulsory);

  const sortSubjects = (list: CatalogSubject[]) =>
    [...list].sort((a, b) => Number(b.compulsory) - Number(a.compulsory) || a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));

  if (selection.stream === null) {
    if (streams.length === 0) return { status: "no-subjects", subjects: [] };
    return { status: "stream-required", subjects: sortSubjects(compulsory) };
  }

  if (!streams.includes(selection.stream)) return { status: "unknown-stream", subjects: [] };

  const streamSubjects = gradeSubjects.filter((subject) => subject.streamName === selection.stream);
  if (streamSubjects.length === 0) return { status: "no-subjects", subjects: sortSubjects(compulsory) };

  return { status: "ok", subjects: sortSubjects([...compulsory, ...streamSubjects]) };
}
