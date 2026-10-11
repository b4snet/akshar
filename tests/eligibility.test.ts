import { describe, expect, it } from "vitest";
import {
  buildCatalog,
  defaultSelection,
  eligibleSubjects,
  normalizeSelection,
  type RawCatalogRows,
} from "@/lib/curriculum/eligibility";

// Fixture mirrors the shape produced by fetchCurriculumCatalog(): two NEB
// grades with Science/Management streams plus an entrance level with single
// streams, and grade-level compulsory subjects.
function fixtureRows(): RawCatalogRows {
  return {
    educationLevels: [
      { name: "NEB", display_order: 1 },
      { name: "Entrance Preparation", display_order: 2 },
    ],
    grades: [
      { name: "11", education_level_name: "NEB", display_order: 1 },
      { name: "12", education_level_name: "NEB", display_order: 2 },
      { name: "IOE", education_level_name: "Entrance Preparation", display_order: 1 },
      { name: "CEE", education_level_name: "Entrance Preparation", display_order: 2 },
    ],
    streams: [
      { name: "Science", grade_name: "11", education_level_name: "NEB", display_order: 1 },
      { name: "Management", grade_name: "11", education_level_name: "NEB", display_order: 2 },
      { name: "Science", grade_name: "12", education_level_name: "NEB", display_order: 1 },
      { name: "Management", grade_name: "12", education_level_name: "NEB", display_order: 2 },
      { name: "IOE entrance", grade_name: "IOE", education_level_name: "Entrance Preparation", display_order: 1 },
      { name: "CEE entrance", grade_name: "CEE", education_level_name: "Entrance Preparation", display_order: 1 },
    ],
    subjects: [
      // Grade-level compulsory subjects (stream_id null).
      subject("nep11", "Nepali", null, "11", "NEB", true),
      subject("eng11", "English", null, "11", "NEB", true),
      subject("nep12", "Nepali", null, "12", "NEB", true),
      // Grade 11 Science.
      subject("phy11", "Physics", "Science", "11", "NEB", false),
      subject("math11", "Mathematics", "Science", "11", "NEB", false),
      // Grade 11 Management.
      subject("acc11", "Accountancy", "Management", "11", "NEB", false),
      subject("econ11", "Economics", "Management", "11", "NEB", false),
      // Entrance tracks.
      { ...subject("ioe-math", "Mathematics", "IOE entrance", "IOE", "Entrance Preparation", false), marks: 50, code: "IOE-Math" },
      { ...subject("ioe-phy", "Physics", "IOE entrance", "IOE", "Entrance Preparation", false), marks: 40, code: "IOE-Phy" },
      { ...subject("cee-bio", "Biology (Zoology + Botany)", "CEE entrance", "CEE", "Entrance Preparation", false), marks: 80, code: "CEE-Bio" },
    ],
  };
}

function subject(
  id: string,
  name: string,
  streamName: string | null,
  gradeName: string,
  educationLevel: string,
  compulsory: boolean,
  marks: number | null = null,
  code: string | null = null
): RawCatalogRows["subjects"][number] {
  return {
    id,
    name,
    code,
    compulsory,
    optional: !compulsory,
    marks,
    verification_status: compulsory ? "official" : "school-configured",
    display_order: 1,
    grade_name: gradeName,
    stream_name: streamName,
    subject_education_level: educationLevel,
  };
}

const catalog = buildCatalog(fixtureRows());

describe("eligibleSubjects", () => {
  it("returns compulsory subjects plus only the selected stream's subjects", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "NEB", grade: "11", stream: "Science" });
    expect(result.status).toBe("ok");
    const names = result.subjects.map((s) => s.name);
    expect(names).toContain("Nepali");
    expect(names).toContain("English");
    expect(names).toContain("Physics");
    expect(names).toContain("Mathematics");
    // Management subjects must never leak into a Science selection.
    expect(names).not.toContain("Accountancy");
    expect(names).not.toContain("Economics");
  });

  it("shows only Management subjects when the stream changes", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "NEB", grade: "11", stream: "Management" });
    expect(result.status).toBe("ok");
    const names = result.subjects.map((s) => s.name);
    expect(names).toContain("Accountancy");
    expect(names).not.toContain("Physics");
    expect(names).not.toContain("Mathematics"); // Science-stream Mathematics absent
  });

  it("returns only grade-level compulsory subjects while no stream is chosen", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "NEB", grade: "11", stream: null });
    expect(result.status).toBe("stream-required");
    expect(result.subjects.length).toBeGreaterThan(0);
    expect(result.subjects.every((s) => s.compulsory)).toBe(true);
    expect([...result.subjects.map((s) => s.name)].sort()).toEqual(["English", "Nepali"]);
    // No stream subjects (Physics etc.) leak in before a stream is chosen.
    expect(result.subjects.some((s) => s.streamName !== null)).toBe(false);
  });

  it("never falls back to showing everything for an unknown stream", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "NEB", grade: "11", stream: "Law" });
    expect(result.status).toBe("unknown-stream");
    expect(result.subjects).toEqual([]);
  });

  it("returns an empty list for an unknown grade", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "NEB", grade: "13", stream: "Science" });
    expect(result.status).toBe("unknown-grade");
    expect(result.subjects).toEqual([]);
  });

  it("returns an empty list for an unknown education level", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "A-Level", grade: "11", stream: null });
    expect(result.status).toBe("unknown-grade");
    expect(result.subjects).toEqual([]);
  });

  it("keeps entrance-preparation subjects distinct from NEB subjects", () => {
    const result = eligibleSubjects(catalog, { educationLevel: "Entrance Preparation", grade: "IOE", stream: "IOE entrance" });
    expect(result.status).toBe("ok");
    const names = result.subjects.map((s) => s.name);
    expect(names).toContain("Mathematics");
    expect(names).toContain("Physics");
    expect(names).not.toContain("Nepali"); // NEB compulsorys do not apply
    expect(result.subjects.find((s) => s.name === "Mathematics")?.marks).toBe(50);
  });

  it("does not mix IOE and CEE tracks", () => {
    const cee = eligibleSubjects(catalog, { educationLevel: "Entrance Preparation", grade: "CEE", stream: "CEE entrance" });
    expect(cee.subjects.map((s) => s.name)).toEqual(["Biology (Zoology + Botany)"]);
  });
});

describe("normalizeSelection", () => {
  it("auto-selects the only stream for entrance grades", () => {
    const selection = normalizeSelection(catalog, { educationLevel: "Entrance Preparation", grade: "IOE", stream: null });
    expect(selection.stream).toBe("IOE entrance");
  });

  it("drops an unknown stream when other streams exist", () => {
    const selection = normalizeSelection(catalog, { educationLevel: "NEB", grade: "11", stream: "Nonexistent" });
    expect(selection.stream).toBeNull();
  });

  it("falls back to the first grade when the saved grade no longer exists", () => {
    const selection = normalizeSelection(catalog, { educationLevel: "NEB", grade: "99", stream: null });
    expect(selection.grade).toBe("11");
  });

  it("falls back to the default selection for an unknown level", () => {
    const selection = normalizeSelection(catalog, { educationLevel: "Unknown", grade: "11", stream: "Science" });
    const fallback = defaultSelection(catalog);
    expect(fallback).not.toBeNull();
    expect(selection.educationLevel).toBe(fallback!.educationLevel);
  });

  it("defaults to the first level and grade with no stream until one exists", () => {
    const fallback = defaultSelection(catalog);
    expect(fallback).toEqual({ educationLevel: "NEB", grade: "11", stream: null });
  });
});
