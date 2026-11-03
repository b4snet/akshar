export type ExamMode = "neb" | "cee" | "ioe";

export type ExamStatus =
  | "ready"
  | "in_progress"
  | "submitting"
  | "submitted"
  | "expired"
  | "failed";

export interface ExamConfig {
  id: string;
  name: string;
  examType: "neb" | "cee" | "ioe";
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

export type ExamStatusType = ExamStatus;

export interface ExamQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation?: string;
  subject: string;
  topic?: string;
  difficulty?: number;
  sourceRef?: string;
  verificationStatus?: "official" | "school-configured" | "unverified";
}

export interface ExamQuestionMinimal {
  id: string;
  prompt: string;
  options: string[];
}

export interface ExamAttempt {
  id: string;
  userId: string;
  examConfigId: string;
  status: ExamStatus;
  startedAt: string;
  deadline: string;
  submittedAt?: string;
  score?: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scoreValue: number;
  maxScore: number;
  scorePercentage: number;
  timeUsedMinutes: number;
  subjectBreakdown?: Record<string, { correct: number; incorrect: number; unanswered: number; total: number }>;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: string;
  prompt: string;
  options: string[];
  userAnswer?: number;
  correctAnswer: number;
  isCorrect: boolean;
  isUnanswered: boolean;
  marksAwarded: number;
  explanation?: string;
  subject: string;
  topic?: string;
  isFlagged?: boolean;
}

export interface ExamAnswerRow {
  questionId: string;
  userAnswer?: number | null;
  isCorrect?: boolean;
  isUnanswered?: boolean;
  marksAwarded?: number;
  isFlagged?: boolean;
}

export interface ExamAttemptRecord {
  id: string;
  user_id: string;
  exam_config_id: string;
  status: string;
  started_at: string;
  deadline: string;
  submitted_at: string | null;
  score: number | null;
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  score_value: number;
  max_score: number;
  score_percentage: number;
  time_used_minutes: number;
  subject_breakdown: Record<string, { correct: number; incorrect: number; unanswered: number; total: number }> | null;
  question_results: QuestionResult[] | null;
  exam_config_snapshot: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExamConfig {
  id: string;
  name: string;
  exam_type: "neb" | "cee" | "ioe";
  year: string;
  duration_minutes: number;
  total_questions: number;
  questions_per_subject: Record<string, number>;
  marks_per_correct: number;
  marks_per_incorrect: number;
  marks_per_unanswered: number;
  negative_marking: boolean;
  allowed_unanswered: boolean;
  passing_score: number | null;
  verification_status: "official" | "provisional" | "practice";
  source_ref: string;
  effective_year: string;
  syllabus_version: string;
  description: string;
  subject_distribution: Record<string, number>;
}

export interface ExamQuestionRow {
  id: string;
  exam_config_id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string | null;
  subject: string;
  topic: string | null;
  difficulty: number | null;
  source_ref: string | null;
  verification_status: "official" | "school-configured" | "unverified";
  display_order: number;
}

export type ExamAttemptStatus =
  | "ready"
  | "in_progress"
  | "submitting"
  | "submitted"
  | "expired"
  | "failed";
