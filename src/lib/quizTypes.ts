export type QuizId = "neb" | "cee" | "ioe";

export type PublicQuizQuestion = {
  prompt: string;
  options: string[];
};

export type PublicQuizTrack = {
  id: QuizId;
  title: string;
  subtitle: string;
  mark: string;
  questions: PublicQuizQuestion[];
};