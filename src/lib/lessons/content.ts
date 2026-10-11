// Shared lesson-content shape used by the learning actions and the AI study-aid
// actions. Parsing is strict: malformed stored content yields null so callers
// fall back to the bundled sample or to an explicit "content unavailable" state.

export type LessonContent = {
  introduction: string;
  sections: { heading: string; body: string }[];
  keyIdea: string;
};

export function parseLessonContent(value: unknown): LessonContent | null {
  if (!value || typeof value !== "object") return null;
  const content = value as Record<string, unknown>;
  if (typeof content.introduction !== "string" || typeof content.keyIdea !== "string" || !Array.isArray(content.sections)) return null;

  const sections = content.sections.filter((section): section is { heading: string; body: string } => {
    return !!section && typeof section === "object" &&
      typeof (section as Record<string, unknown>).heading === "string" &&
      typeof (section as Record<string, unknown>).body === "string";
  });
  if (sections.length !== content.sections.length) return null;

  return { introduction: content.introduction, sections, keyIdea: content.keyIdea };
}

export type PromptLesson = {
  title: string;
  subject: string;
  grade: number | null;
  description: string;
  content: LessonContent;
};

// Flatten a stored lesson into bounded plain text for an AI prompt. The result
// always starts with the title/subject/grade so the model knows the context,
// and is hard-capped so a large lesson can never exceed the service limit.
export function lessonContentForPrompt(lesson: PromptLesson, maxChars: number): string {
  const parts = [
    `Lesson: ${lesson.title}`,
    `Subject: ${lesson.subject}${lesson.grade ? ` · Grade ${lesson.grade}` : ""}`,
    lesson.description ? `Description: ${lesson.description}` : "",
    `Introduction: ${lesson.content.introduction}`,
    ...lesson.content.sections.map((section) => `${section.heading}: ${section.body}`),
    `Key idea: ${lesson.content.keyIdea}`,
  ].filter(Boolean);

  const text = parts.join("\n\n");
  return text.length <= maxChars ? text : `${text.slice(0, maxChars)}\n[lesson text truncated]`;
}
