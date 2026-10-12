// Zod schemas for the curriculum data files under curriculum/data/.
// The ingestion pipeline (scripts/curriculum) produces these files from the
// inspected official source documents; tests validate every file against this
// schema plus referential integrity before any migration is generated.

import { z } from "zod";

export const verificationStatusSchema = z.enum(["official", "school-configured", "unverified"]);

export const sourceInspectionStatusSchema = z.enum([
  "inspected-text-extracted",
  "inspected-extraction-failed",
  "discovered-not-inspected",
]);

export const curriculumSourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  organization: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  landingUrl: z.string().url().optional(),
  docYear: z.string().min(1),
  revision: z.string().min(1).optional(),
  retrievedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  language: z.string().min(1),
  licenseNote: z.string().min(1),
  inspectionStatus: sourceInspectionStatusSchema,
  notes: z.string().min(1),
  covers: z.array(z.string()).default([]),
});

export const curriculumVersionSchema = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  sourceId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  name: z.string().min(1),
  authority: z.string().min(1),
  versionLabel: z.string().min(1),
  effectiveCycle: z.string().min(1),
  language: z.string().min(1),
  sourceUrl: z.string().url(),
  verificationStatus: verificationStatusSchema,
  lastVerifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// Identifies an existing subjects row (created by migrations 0005/0007).
// Natural keys only — no raw UUIDs in data files.
export const subjectRefSchema = z.object({
  level: z.string().min(1),
  grade: z.string().min(1),
  stream: z.string().min(1),
  subject: z.string().min(1),
});

export const topicSchema = z.object({
  key: z.string().min(1),
  sourceNumber: z.string().min(1),
  title: z.string().min(1),
});

export const chapterSchema = z.object({
  key: z.string().min(1),
  sourceNumber: z.string().min(1),
  title: z.string().min(1),
  // Optional sub-chapter grouping used by some NEB subjects ("Part A: Botany").
  part: z.string().min(1).optional(),
  topics: z.array(topicSchema).min(1),
});

export const unitSchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  sourceNumber: z.string().min(1).optional(),
  chapters: z.array(chapterSchema).min(1),
});

export const gradeBlockSchema = z.object({
  subjectRef: subjectRefSchema,
  units: z.array(unitSchema).min(1),
});

export const pathwayFileSchema = z.object({
  pathway: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  sourceId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  curriculumVersionId: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  grade: z.string().min(1),
  locator: z.string().min(1),
  gradeBlocks: z.record(z.string(), gradeBlockSchema),
});

export const practiceQuestionSchema = z
  .object({
    question: z.string().min(10),
    options: z.array(z.string().min(1)).min(2),
    answerIndex: z.number().int().min(0),
    explanation: z.string().min(10),
    difficulty: z.number().int().min(1).max(5).optional(),
  })
  .refine((question) => question.answerIndex < question.options.length, {
    message: "answerIndex must point inside options",
  });

export const lessonSchema = z.object({
  idKey: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  pathwayFile: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  grade: z.string().min(1),
  unitSourceNumber: z.string().min(1).optional(),
  chapterSourceNumber: z.string().min(1),
  topicSourceNumber: z.string().min(1).optional(),
  subjectRef: subjectRefSchema,
  title: z.string().min(5),
  description: z.string().min(10),
  reviewStatus: z.literal("original-reviewed"),
  content: z.object({
    introduction: z.string().min(20),
    sections: z.array(z.object({ heading: z.string().min(3), body: z.string().min(20) })).min(2),
    keyIdea: z.string().min(10),
  }),
  practice: z.array(practiceQuestionSchema).min(3),
});

export const lessonsFileSchema = z.object({ lessons: z.array(lessonSchema).min(1) });

export type PracticeQuestion = z.infer<typeof practiceQuestionSchema>;
export type LessonEntry = z.infer<typeof lessonSchema>;

export type CurriculumSource = z.infer<typeof curriculumSourceSchema>;
export type CurriculumVersion = z.infer<typeof curriculumVersionSchema>;
export type SubjectRef = z.infer<typeof subjectRefSchema>;
export type TopicEntry = z.infer<typeof topicSchema>;
export type ChapterEntry = z.infer<typeof chapterSchema>;
export type UnitEntry = z.infer<typeof unitSchema>;
export type GradeBlock = z.infer<typeof gradeBlockSchema>;
export type PathwayFile = z.infer<typeof pathwayFileSchema>;
