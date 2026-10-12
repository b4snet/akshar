// Shared helpers for the curriculum extraction pipeline.
//
// The pipeline turns the inspected official source documents (kept in
// .research/, git-ignored; see fetch-sources.sh for pinned URLs) into the
// validated JSON data files under curriculum/data/. Deterministic UUIDs are
// derived from stable natural keys so re-runs never create duplicate rows.

import { createHash } from "node:crypto";

export const ID_NAMESPACE = "akshar-curriculum-v1";

// UUID-shaped deterministic id (SHA-1, version 5 layout) from a natural key.
export function idFor(...parts: string[]): string {
  const name = `${ID_NAMESPACE}|${parts.join("|")}`;
  const hash = createHash("sha1").update(name).digest();
  const bytes = Array.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x50; // version 5
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Cut a layout-preserved line into columns at the given start offsets.
export function cutColumns(line: string, cuts: number[]): string[] {
  const columns: string[] = [];
  let start = 0;
  for (const cut of cuts) {
    columns.push(line.slice(start, cut));
    start = cut;
  }
  columns.push(line.slice(start));
  return columns.map((column) => column.replace(/\s+$/, ""));
}

// Find the split offsets of the second occurrence of a marker token in the
// header block that follows a "Scope and Sequence" heading.
export function findSecondOccurrence(lines: string[], token: RegExp, searchWindow: number): number | null {
  for (let index = 0; index < searchWindow && index < lines.length; index += 1) {
    const match = token.exec(lines[index]);
    if (!match) continue;
    const second = token.exec(lines[index].slice(match.index + match[0].length));
    if (second) return match.index + match[0].length + second.index;
  }
  return null;
}

// Strip trailing theory/hours markers such as "  3" or "  -" that pdftotext
// merged into the end of a contents line.
export function stripHours(text: string): string {
  // Trailing "theory/hours" cells can merge into the contents text as one or
  // more trailing number tokens (e.g. "… 6" or "… 6 20.").
  return text.replace(/\s+[\d.\- ]*[0-9]\.?\s*$/, "").replace(/\s+$/, "");
}

// Collapse a wrapped multi-line entry into a single line, dropping hyphen
// line-breaks the way the source reads them.
export function joinContinuation(existing: string, next: string): string {
  const addition = next.trim();
  if (!addition) return existing;
  if (!existing) return addition;
  if (existing.endsWith("-") && /^[a-z]/.test(addition)) {
    return existing.slice(0, -1) + addition;
  }
  return `${existing} ${addition}`;
}

export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`extract: ${message}`);
}

// ---------------------------------------------------------------------------
// Title sanitization: pdftotext artifacts that corrupt extracted titles.
// Shared by the extractor (applied before writing JSON) and the coverage
// report (applied when flagging remaining artifacts).
// ---------------------------------------------------------------------------

// Page running headers/footers merged into cell text. The _RE variant has
// the global flag for .replace(); use the _TEST variant for .test() so
// lastIndex state never leaks between checks.
export const RUNNING_HEADER_RE = /\s*Secondary Education Curriculum,? 207[67] \([A-Za-z ]+\)\s*/g;
export const RUNNING_HEADER_TEST_RE = /Secondary Education Curriculum,? 207[67] \([A-Za-z ]+\)/;

// Standalone page numbers merged into cell text (bounded by whitespace so
// chemical formulas like "2H₂" or "C3 and C4" are untouched).
export const PAGE_NUMBER_RE = /(^|\s)\d{1,2}(\s|$)/g;

// Trailing runs of standalone digits: marks-table rows ("1 1 1 1 - 1 1")
// that pdftotext merged into the end of a cell.
export const TRAILING_DIGITS_RE = /(\s+\d{1,2}){3,}\s*$|(\s+-){2,}\s*$/;

// Titles ending in a conjunction/preposition were clipped at the source
// table-cell edge; the wrapped continuation was lost during extraction.
export const CLIPPED_TITLE_RE = /\b(and|or|of|the|to|in|for|on|with|by|from|at|a|an|is|are|was|were|its|their|his|her)$/i;

// Remove running headers and page numbers from an extracted title. Applied
// to every chapter/topic title before it is written to the data files.
export function sanitizeTitle(title: string): string {
  return title
    .replace(RUNNING_HEADER_RE, " ")
    .replace(PAGE_NUMBER_RE, " ")
    .replace(TRAILING_DIGITS_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// True when a title ends in a conjunction/preposition and is therefore
// likely clipped; a following bare word on its own line is its continuation.
export function isClippedTitle(title: string): boolean {
  return CLIPPED_TITLE_RE.test(title.trim());
}
