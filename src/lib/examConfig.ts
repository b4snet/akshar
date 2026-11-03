export type ExamType = "neb" | "cee" | "ioe";
export type ExamMode = "neb" | "cee" | "ioe";

export interface ExamConfig {
  id: string;
  slug?: string;
  name: string;
  examType: ExamMode;
  year: string;
  durationMinutes: number;
  totalQuestions: number;
  questionsPerSubject: Record<string, number>;
  marksPerCorrect: number;
  marksPerIncorrect: number;
  marksPerUnanswered: number;
  negativeMarking: boolean;
  allowedUnanswered: boolean;
  passingScore?: number;
  verificationStatus: "official" | "provisional" | "practice";
  sourceRef: string;
  effectiveYear: string;
  syllabusVersion: string;
  description: string;
  subjectDistribution: Record<string, number>;
}

export const examConfigs: Record<string, ExamConfig> = {
  "neb-practice": {
    id: "2a6f283a-8964-5e56-9510-f53bb60f7e5b",
    slug: "neb-practice",
    name: "NEB Practice Exam (Sample)",
    examType: "neb",
    year: "2077 (Practice)",
    durationMinutes: 60,
    totalQuestions: 30,
    questionsPerSubject: {
      physics: 10,
      chemistry: 10,
      biology: 10,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: 0,
    marksPerUnanswered: 0,
    negativeMarking: false,
    allowedUnanswered: true,
    verificationStatus: "practice",
    sourceRef: "NEB Practice Questions (Sample)",
    effectiveYear: "2077",
    syllabusVersion: "practice",
    description: "NEB practice exam with 30 sample questions across Physics, Chemistry, Biology. No negative marking.",
    subjectDistribution: {
      physics: 10,
      chemistry: 10,
      biology: 10,
    },
  },
  "cee-practice": {
    id: "5ed637f8-c99d-501b-890e-5381a6c8588f",
    slug: "cee-practice",
    name: "CEE Practice Exam (Sample)",
    examType: "cee",
    year: "2020r2026 (Practice)",
    durationMinutes: 60,
    totalQuestions: 45,
    questionsPerSubject: {
      biology: 20,
      chemistry: 15,
      physics: 10,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: 0,
    marksPerUnanswered: 0,
    negativeMarking: false,
    allowedUnanswered: true,
    verificationStatus: "practice",
    sourceRef: "CEE Practice Questions (Sample)",
    effectiveYear: "2026",
    syllabusVersion: "practice",
    description: "CEE practice exam with sample questions across Biology, Chemistry, Physics. No negative marking.",
    subjectDistribution: {
      biology: 20,
      chemistry: 15,
      physics: 10,
    },
  },
  "ioe-practice": {
    id: "4cf1ba0a-7084-51fe-9f8e-ee06777df251",
    slug: "ioe-practice",
    name: "IOE Practice Exam (Sample)",
    examType: "ioe",
    year: "2083 (Practice)",
    durationMinutes: 45,
    totalQuestions: 35,
    questionsPerSubject: {
      mathematics: 15,
      physics: 10,
      chemistry: 10,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: 0,
    marksPerUnanswered: 0,
    negativeMarking: false,
    allowedUnanswered: true,
    verificationStatus: "practice",
    sourceRef: "IOE Practice Questions (Sample)",
    effectiveYear: "2083",
    syllabusVersion: "practice",
    description: "IOE practice exam with 35 sample questions across Mathematics, Physics, Chemistry. No negative marking.",
    subjectDistribution: {
      mathematics: 15,
      physics: 10,
      chemistry: 10,
    },
  },
  "neb-2077": {
    id: "85021d2f-e0ee-53b2-9f82-b72e9f719b98",
    slug: "neb-2077",
    name: "NEB Grade 11-12 Examination 2077 (Updated)",
    examType: "neb",
    year: "2077",
    durationMinutes: 180,
    totalQuestions: 60,
    questionsPerSubject: {
      physics: 25,
      chemistry: 20,
      biology: 15,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: -0.25,
    marksPerUnanswered: 0,
    negativeMarking: true,
    allowedUnanswered: true,
    verificationStatus: "official",
    sourceRef: "CDC Secondary Education Curriculum 2077, Grade 11-12 Part 1 & 2",
    effectiveYear: "2077",
    syllabusVersion: "2077 updated",
    description: "Official NEB Grade 11-12 examination following CDC 2077 curriculum (compulsory and optional subjects)",
    subjectDistribution: {
      physics: 25,
      chemistry: 20,
      biology: 15,
    },
  },
  "cee-2020r2026": {
    id: "71930ba5-3595-59a3-a24b-996dfac52450",
    slug: "cee-2020r2026",
    name: "MEC CEE Medical Entrance 2020 (Revised 2026)",
    examType: "cee",
    year: "2020 (revised 2026)",
    durationMinutes: 180,
    totalQuestions: 60,
    questionsPerSubject: {
      biology: 25,
      chemistry: 20,
      physics: 15,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: -0.25,
    marksPerUnanswered: 0,
    negativeMarking: true,
    allowedUnanswered: true,
    verificationStatus: "official",
    sourceRef: "MEC Bachelor Level Common Entrance Examination Syllabus 2020 (revised 2026)",
    effectiveYear: "2026",
    syllabusVersion: "2020 revised 2026",
    description: "MEC CEE medical entrance exam with 60 questions: Biology 25, Chemistry 20, Physics 15",
    subjectDistribution: {
      biology: 25,
      chemistry: 20,
      physics: 15,
    },
  },
  "ioe-2083": {
    id: "7e4c1988-c1f7-5c7d-abfe-fa6f058635a4",
    slug: "ioe-2083",
    name: "IOE B.E./B.Arch. Entrance 2083 (Updated 2026)",
    examType: "ioe",
    year: "2083 (updated 2026-07-07)",
    durationMinutes: 120,
    totalQuestions: 50,
    questionsPerSubject: {
      mathematics: 20,
      physics: 15,
      chemistry: 15,
    },
    marksPerCorrect: 1,
    marksPerIncorrect: -0.25,
    marksPerUnanswered: 0,
    negativeMarking: true,
    allowedUnanswered: true,
    verificationStatus: "official",
    sourceRef: "IOE B.E./B.Arch. Entrance Syllabus 2083 (updated 2026-07-07)",
    effectiveYear: "2083",
    syllabusVersion: "2083 updated",
    description: "IOE Engineering Entrance exam with 50 questions: Mathematics 20, Physics 15, Chemistry 15",
    subjectDistribution: {
      mathematics: 20,
      physics: 15,
      chemistry: 15,
    },
  },
};

export function getExamConfig(examId: string): ExamConfig | undefined {
  if (!examId) return undefined;
  if (examConfigs[examId]) return examConfigs[examId];
  return Object.values(examConfigs).find(
    (config) => config.id === examId || config.slug === examId
  );
}

export function getExamConfigsByType(examType: ExamMode): ExamConfig[] {
  return Object.values(examConfigs).filter((config) => config.examType === examType);
}

export function getAllExamConfigs(): ExamConfig[] {
  return Object.values(examConfigs);
}
