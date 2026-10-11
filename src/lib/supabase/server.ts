import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "./config";

export async function createSupabaseServerClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });
}

// Verify the session with Supabase's Auth server before rendering protected
// data. getUser() round-trips the JWT to Supabase (unlike a local decode), so an
// unverified or forged cookie cannot grant access. Redirects to login carrying
// a safe same-origin `next` target when there is no valid user.
export async function requireUser(nextPath: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/auth/login");

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    const safe = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/dashboard";
    redirect(`/auth/login?next=${encodeURIComponent(safe)}`);
  }

  return { supabase, user: data.user };
}
