export const QUIZ_SUBMISSION_LIMIT = 20;
export const QUIZ_SUBMISSION_WINDOW_SECONDS = 60;

export type QuizSubmissionPolicyResult =
  | { allowed: true }
  | { allowed: false; message: string; status?: "rate-limited" | "database-error" };

export function quizSubmissionDatabaseError(): Extract<QuizSubmissionPolicyResult, { allowed: false }> {
  return { allowed: false, message: "Quiz submissions are temporarily unavailable. Please try again.", status: "database-error" };
}

export function quizSubmissionRateExceeded(): Extract<QuizSubmissionPolicyResult, { allowed: false }> {
  return { allowed: false, message: "Too many quiz submissions. Please slow down." };
}

export function classifyQuizRpcError(message: string | undefined): QuizSubmissionPolicyResult {
  if (message && /rate limit|too many/i.test(message)) {
    return quizSubmissionRateExceeded();
  }
  return quizSubmissionDatabaseError();
}
