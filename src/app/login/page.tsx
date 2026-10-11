import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import AuthForm from "@/components/AuthForm";
import { getSupabaseConfig, type SupabaseConfig } from "@/lib/supabase/config";

type LoginContentProps = {
  searchParams: Promise<{ reason?: string; next?: string }>;
  config: SupabaseConfig | null;
};

async function LoginContent({ searchParams, config }: LoginContentProps) {
  const { reason, next } = await searchParams;
  const initialNotice = reason === "confirmation" ? "The confirmation link could not be verified. Request a fresh sign-up email and check the allowed redirect URLs in Supabase Auth settings." : undefined;
  const redirectTo = next?.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : undefined;
  return <AuthForm mode="login" initialNotice={initialNotice} config={config} redirectTo={redirectTo} />;
}

export default function LoginPage({ searchParams }: { searchParams: Promise<{ reason?: string; next?: string }> }) {
  const config = getSupabaseConfig();
  return <AppShell active="account"><div className="auth-page"><Suspense fallback={<div className="route-loading" role="status">Loading account…</div>}><LoginContent searchParams={searchParams} config={config} /></Suspense></div></AppShell>;
}