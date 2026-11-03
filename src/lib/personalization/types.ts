// Personalization, adaptive study plans, spaced revision, and mastery tracking types

// ============================================================================
// Student Learning Preferences
// ============================================================================

export type ExamType = "neb" | "cee" | "ioe";
export type ReviewIntensity = "light" | "moderate" | "intensive";
export type PreferredDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export interface StudentPreferences {
  userId: string;
  // Academic context
  educationLevel: string;
  grade: string;
  stream: string | null;
  // Selected subjects from eligible subjects
  selectedSubjects: string[];
  // Target examination
  targetExamType: ExamType | null;
  targetExamDate: string | null; // ISO date string
  // Study time preferences
  preferredDays: PreferredDay[];
  dailyMinutes: number;
  weeklyMinutes: number;
  // Prioritization
  prioritySubjects: string[];
  priorityTopics: string[]; // topic IDs
  // Review preferences
  reviewEnabled: boolean;
  reviewIntensity: ReviewIntensity;
  maxDueReviews: number;
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface StudentPreferencesInput {
  educationLevel?: string;
  grade?: string;
  stream?: string | null;
  selectedSubjects?: string[];
  targetExamType?: ExamType | null;
  targetExamDate?: string | null;
  preferredDays?: PreferredDay[];
  dailyMinutes?: number;
  prioritySubjects?: string[];
  priorityTopics?: string[];
  reviewEnabled?: boolean;
  reviewIntensity?: ReviewIntensity;
  maxDueReviews?: number;
}

// ============================================================================
// Study Plan Tasks
// ============================================================================

export type TaskType = "lesson" | "practice" | "review" | "exam_section" | "weak_topic_focus";
export type TaskStatus = "pending" | "in_progress" | "completed" | "deferred" | "skipped";

export interface StudyPlanTask {
  id: string;
  userId: string;
  // Task identification
  topicId: string | null;
  lessonId: string | null;
  examConfigId: string | null;
  questionSetId: string | null;
  taskType: TaskType;
  // Scheduling
  scheduledDate: string; // ISO date string
  scheduledWeekStart: string; // ISO date string (Monday)
  estimatedMinutes: number;
  priority: number; // 1 = highest
  // Status tracking
  status: TaskStatus;
  startedAt: string | null;
  completedAt: string | null;
  actualMinutes: number | null;
  deferCount: number;
  lastDeferredAt: string | null;
  // Metadata
  reason: string;
  algorithmVersion: string;
  sourceEvidence: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface StudyPlanTaskInput {
  topicId?: string | null;
  lessonId?: string | null;
  examConfigId?: string | null;
  questionSetId?: string | null;
  taskType: TaskType;
  scheduledDate: string;
  scheduledWeekStart: string;
  estimatedMinutes: number;
  priority: number;
  reason: string;
  algorithmVersion?: string;
  sourceEvidence?: Record<string, unknown>;
}

export interface TaskCompletionInput {
  actualMinutes?: number;
}

export interface TaskDeferralInput {
  newDate?: string; // ISO date string
}

// ============================================================================
// Spaced Revision Schedule
// ============================================================================

export type RevisionStatus = "active" | "completed" | "overdue" | "suspended";
export type ReviewRating = 1 | 2 | 3 | 4; // 1=again, 2=hard, 3=good, 4=easy

export interface SpacedRevisionSchedule {
  id: string;
  userId: string;
  topicId: string;
  // FSRS-inspired parameters (simplified)
  stability: number; // Days until next review at current retention
  difficulty: number; // Item difficulty (1=easy, 10=hard)
  dueDate: string; // ISO date string
  intervalDays: number;
  // History
  reviewsCount: number;
  successfulReviews: number;
  lastReviewAt: string | null;
  lastRating: ReviewRating | null;
  // Status
  status: RevisionStatus;
  // Algorithm versioning
  algorithmVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpacedRevisionScheduleInput {
  topicId: string;
  stability?: number;
  difficulty?: number;
  dueDate?: string;
  intervalDays?: number;
  algorithmVersion?: string;
}

export interface ReviewCompletionInput {
  rating: ReviewRating;
  responseTimeMs?: number;
  sourceType?: "study_plan" | "manual" | "exam" | "quiz";
  sourceId?: string;
}

// ============================================================================
// Revision History
// ============================================================================

export interface RevisionHistoryEntry {
  id: string;
  userId: string;
  topicId: string;
  revisionScheduleId: string | null;
  // Review details
  rating: ReviewRating;
  responseTimeMs: number | null;
  // State before review
  stabilityBefore: number | null;
  difficultyBefore: number | null;
  intervalBefore: number | null;
  // State after review
  stabilityAfter: number;
  difficultyAfter: number;
  intervalAfter: number;
  nextDueDate: string;
  // Context
  sourceType: "study_plan" | "manual" | "exam" | "quiz" | null;
  sourceId: string | null;
  createdAt: string;
}

// ============================================================================
// Topic Mastery
// ============================================================================

export type MasteryLabel =
  | "insufficient_evidence"
  | "developing"
  | "practising"
  | "consistent"
  | "mastered";

export interface TopicMastery {
  id: string;
  userId: string;
  topicId: string;
  // Mastery metrics
  masteryScore: number; // 0-100
  confidenceLevel: number; // 0-100
  label: MasteryLabel;
  // Evidence aggregation
  totalQuestionsAttempted: number;
  uniqueQuestionsAttempted: number;
  correctCount: number;
  incorrectCount: number;
  examQuestionsCorrect: number;
  examQuestionsTotal: number;
  spacedReviewsCompleted: number;
  spacedReviewsSuccessful: number;
  lessonCompleted: boolean;
  // Recency and decay
  lastEvidenceAt: string | null;
  evidenceHalfLifeDays: number;
  // Algorithm versioning
  algorithmVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface MasteryBreakdown {
  topicId: string;
  topicName: string;
  subject: string;
  mastery: TopicMastery;
  // For UI display
  weakSignals: WeakSignal[];
  recommendedActions: RecommendedAction[];
}

export interface WeakSignal {
  type: "low_accuracy" | "declining_accuracy" | "repeated_errors" | "failed_spaced_review"
    | "unanswered_in_exam" | "stale_mastery" | "prerequisite_gap";
  strength: number;
  description: string;
}

export interface RecommendedAction {
  action: "review" | "practice" | "lesson" | "exam_section";
  sourceId: string | null;
  priority: number;
  reason: string;
}

// ============================================================================
// Weak Topic Recommendations
// ============================================================================

export type WeakSignalType =
  | "low_accuracy"
  | "declining_accuracy"
  | "repeated_errors"
  | "failed_spaced_review"
  | "unanswered_in_exam"
  | "stale_mastery"
  | "prerequisite_gap";

export type RecommendedActionType = "review" | "practice" | "lesson" | "exam_section";
export type RecommendationStatus = "active" | "dismissed" | "completed" | "superseded";

export interface WeakTopicRecommendation {
  id: string;
  userId: string;
  topicId: string;
  // Detection signals
  signalType: WeakSignalType;
  signalStrength: number;
  signalEvidence: Record<string, unknown>;
  // Recommendation
  priority: number;
  reason: string;
  recommendedAction: RecommendedActionType;
  recommendedSourceId: string | null;
  // Status
  status: RecommendationStatus;
  dismissedAt: string | null;
  completedAt: string | null;
  // Algorithm versioning
  algorithmVersion: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Dashboard Aggregated Types
// ============================================================================

export interface TodayTask extends StudyPlanTask {
  topicName?: string;
  subject?: string;
  lessonTitle?: string;
  examName?: string;
}

export interface WeeklyPlanDay {
  date: string; // ISO date string
  tasks: TodayTask[];
  totalEstimatedMinutes: number;
}

export interface DueReview extends SpacedRevisionSchedule {
  topicName: string;
  subject: string;
  daysOverdue: number;
}

export interface MasterySummary {
  topicId: string;
  topicName: string;
  subject: string;
  masteryScore: number;
  confidenceLevel: number;
  label: MasteryLabel;
  lastEvidenceAt: string | null;
}

export interface DashboardData {
  todayTasks: TodayTask[];
  weeklyPlan: WeeklyPlanDay[];
  dueReviews: DueReview[];
  overdueReviews: DueReview[];
  weakTopics: (WeakTopicRecommendation & { topicName: string; subject: string })[];
  masteredTopics: MasterySummary[];
  developingTopics: MasterySummary[];
  preferences: StudentPreferences | null;
  profileComplete: boolean;
}

// ============================================================================
// Study Plan Generation Input/Output
// ============================================================================

export interface StudyPlanGenerationInput {
  weeksAhead?: number; // default 2
  includeReviews?: boolean; // default true
  maxTasksPerDay?: number; // default 5
}

export interface StudyPlanGenerationResult {
  tasksCreated: number;
  tasksSkipped: number;
  weekStartDates: string[];
  warnings: string[];
}

export interface MasteryRecalculationResult {
  topicId: string;
  previousLabel: MasteryLabel;
  newLabel: MasteryLabel;
  previousScore: number;
  newScore: number;
  previousConfidence: number;
  newConfidence: number;
  evidenceChanged: boolean;
}

export interface WeakDetectionResult {
  recommendationsCreated: number;
  recommendationsUpdated: number;
  recommendationsSuperseded: number;
}
