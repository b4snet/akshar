import { buildCatalog, type Catalog } from "./eligibility";

// Fetches the full curriculum catalog (levels → grades → streams → subjects)
// with the caller's session client and assembles the pure catalog used by the
// eligibility rules. Returns null on any database error so callers surface an
// explicit database-error state instead of guessing.

type ServerClient = NonNullable<Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>>;

export async function fetchCurriculumCatalog(supabase: ServerClient): Promise<Catalog | null> {
  const [levelsResult, gradesResult, streamsResult, subjectsResult] = await Promise.all([
    supabase.from("education_levels").select("id, name, display_order"),
    supabase.from("grades").select("id, education_level_id, name, display_order"),
    supabase.from("streams").select("id, grade_id, name, display_order"),
    supabase.from("subjects").select("id, stream_id, grade_id, name, code, compulsory, optional, marks, verification_status, display_order"),
  ]);

  if (levelsResult.error || gradesResult.error || streamsResult.error || subjectsResult.error) return null;

  const levelById = new Map((levelsResult.data ?? []).map((row) => [row.id, row.name]));
  const gradeById = new Map((gradesResult.data ?? []).map((row) => [row.id, row]));
  const streamById = new Map((streamsResult.data ?? []).map((row) => [row.id, row]));

  return buildCatalog({
    educationLevels: (levelsResult.data ?? []).map((row) => ({ name: row.name, display_order: row.display_order })),
    grades: (gradesResult.data ?? []).map((row) => ({
      name: row.name,
      education_level_name: levelById.get(row.education_level_id) ?? "",
      display_order: row.display_order,
    })),
    streams: (streamsResult.data ?? []).map((row) => {
      const grade = gradeById.get(row.grade_id);
      return {
        name: row.name,
        grade_name: grade?.name ?? "",
        education_level_name: grade ? levelById.get(grade.education_level_id) ?? "" : "",
        display_order: row.display_order,
      };
    }),
    subjects: (subjectsResult.data ?? []).map((row) => {
      const stream = row.stream_id ? streamById.get(row.stream_id) : undefined;
      const grade = stream ? gradeById.get(stream.grade_id) : row.grade_id ? gradeById.get(row.grade_id) : undefined;
      const levelName = grade ? levelById.get(grade.education_level_id) ?? null : null;
      return {
        id: row.id,
        name: row.name,
        code: row.code,
        compulsory: row.compulsory ?? false,
        optional: row.optional ?? false,
        marks: row.marks,
        verification_status: row.verification_status,
        display_order: row.display_order,
        grade_name: grade?.name ?? null,
        stream_name: stream?.name ?? null,
        subject_education_level: levelName,
      };
    }),
  });
}
