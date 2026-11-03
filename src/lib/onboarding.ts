import { z } from "zod";

export const onboardingSchema = z.object({
  country: z.string().trim().min(1).max(80).optional(),
  education_system: z.string().trim().min(1).max(80).optional(),
  curriculum: z.string().trim().min(1).max(120).optional(),
  grade: z.number().int().min(1).max(12).optional(),
  subjects: z.array(z.string().trim().min(1).max(80)).max(20).transform((subjects) => [...new Set(subjects)]).optional(),
  learning_goals: z.string().trim().min(1).max(500).optional(),
}).strict();

export type OnboardingInput = z.infer<typeof onboardingSchema>;
