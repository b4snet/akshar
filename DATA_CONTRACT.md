# AKSHAR Curriculum Data Contract

**Version:** 1.0  
**Last Updated:** 2026-10-13  
**Owners:** Engineering (ingestion pipeline), Freebuff (curriculum research & verification)

---

## Purpose

This document defines the canonical data contract for AKSHAR's curriculum content. It serves as the single source of truth for:
- Field names, types, and constraints
- Identifier formats and generation rules
- Relationship cardinalities and referential integrity
- Verification states and publication workflows
- Validation rules for ingestion

All ingestion tooling, migrations, and application code MUST conform to this contract.

---

## Core Entities

### 1. Curriculum Source (Source Document)

A primary official document from which curriculum content is extracted.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | string | `^[a-z0-9][a-z0-9-]*$` | Stable slug identifier |
| `organization` | string | min 1 | Publishing body (e.g., "CDC", "IOE", "MEC") |
| `title` | string | min 1 | Full document title |
| `url` | string | valid URL | Direct link to PDF/document |
| `landingUrl` | string | valid URL, optional | Landing page for the document |
| `docYear` | string | min 1 | Academic year (e.g., "2077 B.S.") |
| `revision` | string | optional | Revision identifier |
| `retrievedAt` | string | `^\d{4}-\d{2}-\d{2}$` | Date of retrieval |
| `language` | string | min 1 | Document language(s) |
| `licenseNote` | string | min 1 | Usage rights statement |
| `inspectionStatus` | enum | `inspected-text-extracted` \| `inspected-extraction-failed` \| `discovered-not-inspected` | Extraction status |
| `notes` | string | min 1 | Extraction notes |
| `covers` | string[] | default `[]` | Subject codes covered |

**Verification Rule:** Only sources with `inspectionStatus = "inspected-text-extracted"` may feed curriculum content.

---

### 2. Curriculum Version

A specific version of a curriculum/syllabus tied to a source.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | string | `^[a-z0-9][a-z0-9-]*$` | Stable slug |
| `sourceId` | string | FK → `curriculum_sources.id` | Source document |
| `name` | string | min 1 | Human-readable name |
| `authority` | string | min 1 | Issuing authority (CDC, IOE, MEC) |
| `versionLabel` | string | min 1 | Version label (e.g., "2077 updated") |
| `effectiveCycle` | string | min 1 | Academic cycle (e.g., "Grade 11–12...") |
| `language` | string | min 1 | Content language |
| `sourceUrl` | string | valid URL | Source document URL |
| `verificationStatus` | enum | `official` \| `school-configured` \| `unverified` | Content verification |
| `lastVerifiedAt` | string | `^\d{4}-\d{2}-\d{2}$` | Last verification date |

---

### 3. Subject Reference (Natural Key)

Identifies a subject in the catalog using natural keys only.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `level` | string | min 1 | Education level (NEB, Entrance Preparation) |
| `grade` | string | min 1 | Grade (11, 12, IOE, CEE) |
| `stream` | string | min 1 | Stream (Science, Management, IOE entrance, CEE entrance, (compulsory)) |
| `subject` | string | min 1 | Subject name (Physics, Chemistry, etc.) |

**Composite Key:** `(level, grade, stream, subject)` — must exist in catalog migrations.

---

### 4. Pathway File

A curriculum pathway file representing one subject across grades.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `pathway` | string | `^[a-z0-9][a-z0-9-]*$` | Pathway slug (e.g., `neb-physics-2076`) |
| `sourceId` | string | FK → `curriculum_sources.id` | Source document |
| `curriculumVersionId` | string | FK → `curriculum_versions.id` | Curriculum version |
| `grade` | string | min 1 | "11 and 12" or "IOE", "CEE" |
| `locator` | string | min 1 | Source location in document |
| `gradeBlocks` | object | Record<string, GradeBlock> | Grade-specific content |

---

### 5. Grade Block

Content for a specific grade within a pathway.

| Field | Type | Description |
|-------|------|-------------|
| `subjectRef` | SubjectRef | Natural key for the subject |
| `units` | Unit[] | Array of units (min 1) |

---

### 6. Unit

A syllabus grouping (content area, part, or numbered section).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `key` | string | `^[a-z0-9]+(-[a-z0-9]+)*$` | Lowercase hyphenated slug |
| `title` | string | min 1 | Unit title |
| `sourceNumber` | string | optional | Source document section number |
| `chapters` | Chapter[] | min 1 | Chapters in this unit |

---

### 6. Chapter

A chapter within a unit.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `key` | string | `^[a-z0-9]+(-[a-z0-9]+)*$` | Lowercase hyphenated slug |
| `sourceNumber` | string | `^\d+$` | Numeric chapter number (e.g., "1", "2") |
| `title` | string | min 1 | Chapter title |
| `part` | string | optional | Sub-chapter grouping (e.g., "Part A: Botany") |
| `topics` | Topic[] | min 1 | Topics in this chapter |

---

### 7. Topic

The finest verified syllabus entry.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `key` | string | `^[a-z0-9]+(-[a-z0-9]+)*$` | Lowercase hyphenated slug |
| `sourceNumber` | string | `^\d+(\.\d+)+$` | Dotted notation (e.g., "1.1", "2.3") |
| `title` | string | min 1 | Topic title |

---

### 8. Lesson (Student-Facing Content)

Original student-facing lessons linked to topics.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `idKey` | string | `^[a-z0-9][a-z0-9-]*$` | Stable lesson key |
| `pathwayFile` | string | FK → pathway file | Pathway reference |
| `grade` | string | min 1 | Grade |
| `unitSourceNumber` | string | optional | Unit source number |
| `chapterSourceNumber` | string | min 1 | Chapter source number |
| `topicSourceNumber` | string | optional | Topic source number |
| `subjectRef` | SubjectRef | Natural key | Subject reference |
| `title` | string | min 5 | Lesson title |
| `description` | string | min 10 | Lesson description |
| `reviewStatus` | literal | `original-reviewed` | Review status |
| `content` | object | see below | Lesson content |
| `practice` | PracticeQuestion[] | min 3 | Practice questions |

**Content Structure:**
```json
{
  "introduction": "string (min 20)",
  "sections": [
    { "heading": "string (min 3)", "body": "string (min 20)" }
  ],
  "keyIdea": "string (min 10)"
}
```

---

### 9. Practice Question

| Field | Type | Constraints |
|-------|------|-------------|
| `question` | string | min 10 |
| `options` | string[] | min 2 |
| `answerIndex` | int | 0 <= index < options.length |
| `explanation` | string | min 10 |
| `difficulty` | int | 1-5, optional |

---

## Verification States

| State | Applies To | Meaning |
|-------|------------|---------|
| `official` | curriculum_versions, units, chapters, topics | Officially verified from inspected source |
| `school-configured` | units, chapters, topics | School-level placement, not officially verified |
| `unverified` | topics, curriculum_versions | Placeholder, needs review |
| `inspected-text-extracted` | curriculum_sources | Text successfully extracted |
| `inspected-extraction-failed` | curriculum_sources | Extraction failed (e.g., font encoding) |
| `discovered-not-inspected` | curriculum_sources | Found but not yet inspected |
| `original-reviewed` | lessons, topic_practice_questions | Human-reviewed original content |
| `ai-generated` | lessons (if AI-generated) | AI-generated, clearly labeled |
| `draft` | lessons, topic_practice_questions | In progress |
| `sample` | lessons (legacy) | Sample/demo content |

---

## Identifier Generation Rules

### Deterministic UUIDs (SHA-1, Version 5 Layout)

All database IDs are deterministic SHA-1 hashes (version 5 layout) derived from stable natural keys.

**Namespace:** `akshar-curriculum-v1`

**Format:** `idFor(...parts: string[]) → UUID`

Examples:
- Source: `idFor("curriculum-source", "src-cdc-part2")`
- Version: `idFor("curriculum-version", "cv-neb-opt-2076")`
- Unit: `idFor("neb-physics-2076", "11", "unit", "mechanics")`
- Chapter: `idFor("neb-physics-2076", "11", "unit", "mechanics", "chapter", "physical-quantities")`
- Topic: `idFor("neb-physics-2076", "11", "unit", "mechanics", "chapter", "physical-quantities", "topic", "1-1")`
- Lesson: `idFor("lesson", "lesson-id-key")`
- Practice: `idFor("lesson-practice", "lesson-id-key", "0")`

**Stability:** Same natural key → same UUID forever. Re-running ingestion never duplicates rows.

---

## Validation Rules

### Schema Validation (Zod)

All data files MUST pass Zod schema validation before ingestion.

### Referential Integrity

1. **Source IDs** in curriculum_versions must exist in curriculum_sources
2. **Version IDs** in pathway files must exist in curriculum_versions
3. **Source IDs** in pathway files must exist in curriculum_sources
4. **SubjectRefs** in gradeBlocks must exist in KNOWN_SUBJECT_REFS catalog
5. **Pathway duplicates** prohibited for same (base pathway, subjectRef)

### Structural Integrity

1. **Unique keys** within scope: unit.key, chapter.key (per unit), topic.key (per chapter)
2. **Chapter sourceNumber** must be numeric (`^\d+$`)
6. **Topic sourceNumber** must follow dotted notation: `chapterNum.suffix` (e.g., "1.1", "2.3")
7. **Key format**: lowercase with hyphens only (`^[a-z0-9]+(-[a-z0-9]+)*$`)
7. **Topic suffix uniqueness** within chapter (no duplicate numeric suffixes)
8. **Topic keys unique across chapters** within a unit
8. **Number-family rule**: topic sourceNumber must start with chapter sourceNumber

### Content Quality

- No empty topic titles
- Chapter sourceNumber must be present
- Chapter sourceNumber must be numeric
- Topic sourceNumber must be present
- Chapter must have at least 1 topic
- Unit must have at least 1 chapter
- Grade block must have at least 1 unit

---

## Ingestion Pipeline Stages

```
Raw Extraction (Freebuff)
    ↓
[1] Input Discovery & Manifest Reading
[2] File Parsing & Schema Validation (Zod)
[3] Source-Provenance Validation
[4] Curriculum/Topic Mapping Validation
[5] Stable ID Generation/Preservation
[6] Duplicate Detection
[7] Dry-Run Preview
[8] Bounded Batch Ingestion
[9] Idempotent Upserts (ON CONFLICT DO UPDATE)
[10] Error Isolation & Reporting
[11] Checkpointing & Resumption
[12] Post-Ingestion Verification
[13] Coverage Manifest Update
```

### Stage Details

#### [1] Input Discovery
- Read manifest from `curriculum/data/sources.json`
- Discover pathway files in `curriculum/data/pathways/`
- Read lesson data from `curriculum/data/lessons.json`

#### [2] Schema Validation
- Validate all JSON against Zod schemas
- Collect all errors before failing

#### [3] Source-Provenance Validation
- Every pathway MUST reference an `inspected-text-extracted` source
- Every curriculum version MUST reference a valid source
- Missing/invalid provenance → ERROR (not warning)

#### [4] Curriculum/Topic Mapping
- SubjectRefs must exist in KNOWN_SUBJECT_REFS
- No duplicate pathway for same (base pathway, subjectRef)
- Grade blocks must match declared grade

#### [5] Stable IDs
- Generate deterministic UUIDs using `idFor()`
- Preserve existing IDs on re-ingestion
- Never generate random UUIDs

#### [7] Dry-Run Preview
- Show intended inserts/updates/deletes
- Show row counts per table
- Show warnings without failing

#### [8] Bounded Batches
- Process one curriculum version at a time
- Clear version's data before re-import (DELETE → INSERT)
- Lessons are unlinked (not deleted) and re-linked

#### [9] Idempotent Upserts
- `ON CONFLICT (id) DO UPDATE SET ...` for all tables
- Re-running migration never duplicates rows

#### [10] Error Isolation
- Errors collected per-file, per-record
- Actionable error messages with file:line context
- Fail fast on errors, report all warnings

#### [11] Checkpointing
- Each curriculum version imported as atomic unit
- Pre-import: DELETE version's data (cascades)
- Post-import: audit row in `curriculum_import_runs`

#### [12] Post-Ingestion Verification
- Row counts match data files
- ≥90% topics have `verification_status = 'official'`
- All foreign keys resolve

#### [13] Coverage Manifest
- Update `curriculum/data/coverage-report.json`
- List missing catalog subjects
- Flag extraction artifacts for review

---

## Database Schema Mapping

| Data Contract Entity | Database Table | Key Columns |
|---------------------|----------------|-------------|
| Curriculum Source | `curriculum_sources` | id, organization, title, url, inspection_status |
| Curriculum Version | `curriculum_versions` | id, source_id, name, authority, verification_status |
| Unit | `units` | id, subject_id, title, source_number, curriculum_version_id, verification_status, display_order |
| Chapter | `chapters` | id, unit_id, title, source_number, part, curriculum_version_id, verification_status, display_order |
| Topic | `topics` | id, chapter_id, title, source_number, curriculum_version_id, verification_status, display_order |
| Lesson | `lessons` | id, subject, grade, title, content, topic_id, curriculum_version_id, review_status, source_url |
| Practice Question | `topic_practice_questions` | id, topic_id, question, options, answer_index, explanation, difficulty, review_status |
| Import Audit | `curriculum_import_runs` | id, generated_by, unit_count, chapter_count, topic_count, source_files |

---

## RLS & Security

- All new tables: `ENABLE ROW LEVEL SECURITY`
- Read policies: `authenticated` users can SELECT
- Write policies: Service-side only (no direct client writes)
- Service role keys: NEVER exposed to client
- Student data (progress, attempts, AI aids): never touched during curriculum ingestion

---

## Testing Requirements

### Unit Tests (Vitest)

| Test | Description |
|------|-------------|
| Schema validation | Valid/invalid records pass/fail Zod schemas |
| Referential integrity | Invalid refs rejected, valid accepted |
| Duplicate detection | Duplicate IDs/keys detected |
| ID determinism | Same natural key → same UUID |
| ID uniqueness | Different keys → different UUIDs |
| Migration matching | Generated UUIDs match migration SQL |
| Dry-run | Preview shows correct counts |
| Idempotency | Re-running produces same output |
| Partial failure | Errors don't corrupt successful writes |

### Integration Tests

| Test | Description |
|------|-------------|
| Full pipeline | End-to-end: JSON → validation → migration SQL |
| Idempotent import | Run twice, same output |
| Partial failure | One bad file doesn't corrupt others |
| Conflict handling | Conflicting updates detected |

---

## Ingestion Commands

```bash
# Full validation (used by CI)
npx tsx scripts/curriculum/validate.ts

# Coverage report (generates coverage-report.json)
npx tsx scripts/curriculum/coverage.ts

# Generate migration SQL (dry-run = preview only)
npx tsx scripts/curriculum/build-migration.ts

# Full pipeline (validate → build migration)
npm run curriculum:build  # if script exists
```

---

## Coverage Manifest

Generated at `curriculum/data/coverage-report.json`:

```json
{
  "generatedAt": "ISO timestamp",
  "pathways": [
    { "name": "pathway-name", "units": N, "chapters": N, "topics": N, "locator": "..." }
  ],
  "missingSubjects": ["LEVEL|GRADE|STREAM|SUBJECT", ...],
  "artifacts": [
    { "pathway": "...", "grade": "...", "kind": "clipped-title|page-number|...", "location": "...", "title": "..." }
  ]
}
```

---

## Change Control

Any changes to this contract require:
1. Update this document
2. Update Zod schemas in `curriculum/schema.ts`
3. Update validation rules in `scripts/curriculum/validate.ts`
4. Update tests in `tests/curriculum-data.test.ts`
5. Regenerate migration: `npx tsx scripts/curriculum/build-migration.ts`
6. Run full test suite: `npx vitest run`
6. Run build: `npx next build`

---

## Appendix: Known Subject Catalog (KNOWN_SUBJECT_REFS)

```
NEB|11|(compulsory)|Nepali
NEB|11|(compulsory)|English
NEB|12|(compulsory)|Nepali
NEB|12|(compulsory)|English
NEB|11|Science|Physics
NEB|11|Science|Chemistry
NEB|11|Science|Biology
NEB|11|Science|Mathematics
NEB|12|Science|Physics
NEB|12|Science|Chemistry
NEB|12|Science|Biology
NEB|12|Science|Mathematics
NEB|11|Management|Accountancy
NEB|11|Management|Economics
NEB|11|Management|Business Studies
NEB|11|Management|Mathematics
NEB|12|Management|Accountancy
NEB|12|Management|Economics
NEB|12|Management|Business Studies
NEB|12|Management|Mathematics
Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Mathematics
Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Physics
Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|Chemistry
Entrance Preparation|IOE|IOE entrance (B.E./B.Arch.)|English
Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Biology (Zoology + Botany)
Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Chemistry
Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Physics
Entrance Preparation|CEE|CEE entrance (MBBS/BDS/BSc Nursing)|Mental Agility Test
```

---

*End of Data Contract*