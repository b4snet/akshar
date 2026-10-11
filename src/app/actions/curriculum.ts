"use server";

import { getAuthenticatedContext } from "@/lib/supabase/auth-context";
import { fetchCurriculumCatalog } from "@/lib/curriculum/catalog";
import {
  availableGrades,
  availableStreams,
  defaultSelection,
  eligibleSubjects,
  normalizeSelection,
  type CatalogSubject,
  type CurriculumSelection,
  type EligibilityStatus,
} from "@/lib/curriculum/eligibility";

// Server actions for the student's grade/stream selection and the eligible
// subject list. Filtering happens HERE, server-side: the client only ever
// receives subjects that passed eligibleSubjects() for a catalog-validated
// selection. Client-supplied names are matched against the catalog, never
// trusted as-is.

export type CurriculumView =
  | { status: "unconfigured" | "signed-out" | "auth-error" | "database-error" }
  | {
      status: "ready";
      selection: CurriculumSelection;
      levels: string[];
      grades: string[];
      streams: string[];
      subjects: CatalogSubject[];
      eligibility: EligibilityStatus;
      hasSavedSelection: boolean;
    };

function isSafeName(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 120;
}

async function buildView(
  supabase: NonNullable<Awaited<ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>>>,
  userId: string,
  requested: CurriculumSelection | null
): Promise<CurriculumView> {
  const catalog = await fetchCurriculumCatalog(supabase);
  if (!catalog) return { status: "database-error" };

  let hasSavedSelection = false;
  let selection: CurriculumSelection;

  if (requested) {
    selection = normalizeSelection(catalog, requested);
  } else {
    const { data, error } = await supabase
      .from("student_selections")
      .select("education_level, grade, stream")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) return { status: "database-error" };

    if (data && isSafeName(data.education_level) && isSafeName(data.grade)) {
      hasSavedSelection = true;
      selection = normalizeSelection(catalog, { educationLevel: data.education_level, grade: data.grade, stream: data.stream });
    } else {
      const fallback = defaultSelection(catalog);
      if (!fallback) return { status: "database-error" };
      selection = fallback;
    }
  }

  const eligibility = eligibleSubjects(catalog, selection);

  return {
    status: "ready",
    selection,
    levels: catalog.levels,
    grades: availableGrades(catalog, selection.educationLevel),
    streams: availableStreams(catalog, selection.educationLevel, selection.grade),
    subjects: eligibility.subjects,
    eligibility: eligibility.status,
    hasSavedSelection,
  };
}

// Load the saved (or default) selection and the subjects eligible for it.
export async function loadCurriculumView(): Promise<CurriculumView> {
  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status };
  return buildView(context.supabase, context.user.id, null);
}

// Persist a new selection and return the subjects eligible for it. The
// selection is validated against the catalog before any subjects are returned.
export async function setCurriculumSelection(input: {
  educationLevel: string;
  grade: string;
  stream: string | null;
}): Promise<CurriculumView> {
  if (!input || !isSafeName(input.educationLevel) || !isSafeName(input.grade) || (input.stream !== null && !isSafeName(input.stream))) {
    return { status: "database-error" };
  }

  const context = await getAuthenticatedContext();
  if (context.status !== "ready") return { status: context.status };

  const catalog = await fetchCurriculumCatalog(context.supabase);
  if (!catalog) return { status: "database-error" };

  const selection = normalizeSelection(catalog, { educationLevel: input.educationLevel, grade: input.grade, stream: input.stream });

  const { error } = await context.supabase.from("student_selections").upsert(
    {
      user_id: context.user.id,
      education_level: selection.educationLevel,
      grade: selection.grade,
      stream: selection.stream,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) return { status: "database-error" };

  const eligibility = eligibleSubjects(catalog, selection);
  return {
    status: "ready",
    selection,
    levels: catalog.levels,
    grades: availableGrades(catalog, selection.educationLevel),
    streams: availableStreams(catalog, selection.educationLevel, selection.grade),
    subjects: eligibility.subjects,
    eligibility: eligibility.status,
    hasSavedSelection: true,
  };
}
