import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./server";

// One authentication helper shared by every server action so authorization
// behaves identically across learning, curriculum, and AI endpoints.
// getUser() round-trips the JWT to Supabase Auth, so a forged or stale cookie
// never counts as a session.

export type AuthContext =
  | { status: "ready"; supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>; user: User }
  | { status: "unconfigured" | "signed-out" | "auth-error" };

export async function getAuthenticatedContext(): Promise<AuthContext> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "unconfigured" };

  const { data, error } = await supabase.auth.getUser();
  if (error && error.name !== "AuthSessionMissingError") return { status: "auth-error" };
  if (!data.user) return { status: "signed-out" };
  return { status: "ready", supabase, user: data.user };
}
