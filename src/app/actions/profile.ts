'use server';

import { getAuthenticatedContext } from '@/lib/supabase/auth-context';
import { onboardingSchema } from '@/lib/onboarding';

/**
 * Server action to create or update the authenticated user's profile with onboarding data.
 * It validates input, ensures the caller is authenticated, and updates only their own row.
 */
export async function upsertOnboarding(data: unknown) {
  const parsed = onboardingSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid onboarding data');
  }

  const context = await getAuthenticatedContext();
  if (context.status === 'signed-out') throw new Error('Unauthenticated');
  if (context.status !== 'ready') throw new Error('Unable to verify authentication');

  const { error } = await context.supabase.rpc('upsert_my_onboarding', {
    p_country: parsed.data.country ?? null,
    p_education_system: parsed.data.education_system ?? null,
    p_curriculum: parsed.data.curriculum ?? null,
    p_grade: parsed.data.grade ?? null,
    p_subjects: parsed.data.subjects ?? [],
    p_learning_goals: parsed.data.learning_goals ?? null,
  });

  if (error) throw new Error('Failed to save onboarding data');
  return { success: true };
}