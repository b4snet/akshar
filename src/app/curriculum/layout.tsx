import { requireUser } from "@/lib/supabase/server";

// The curriculum tables are `authenticated`-only under RLS, so this route is
// gated server-side here (the page itself is a client component). This is
// defence-in-depth on top of the proxy matcher.
export const instant = false;

export default async function CurriculumLayout({ children }: { children: React.ReactNode }) {
  await requireUser("/curriculum");
  return <>{children}</>;
}
