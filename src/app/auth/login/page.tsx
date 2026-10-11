"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import AuthPanel from "@/components/AuthPanel";
import { getSupabaseConfig } from "@/lib/supabase/config";

function LoginForm() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") ?? undefined;
  const next = searchParams.get("next") ?? undefined;
  const config = getSupabaseConfig();
  const initialNotice = reason === "confirmation"
    ? "The confirmation link could not be verified. Request a fresh sign-up email and check the allowed redirect URLs in Supabase Auth settings."
    : undefined;
  const redirectTo = next?.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : undefined;
  return <AuthForm mode="login" initialNotice={initialNotice} config={config} redirectTo={redirectTo} />;
}

export default function LoginPage() {
  return (
    <AuthPanel mode="login">
      <Suspense fallback={<div className="auth-loading" role="status">Loading account…</div>}>
        <LoginForm />
      </Suspense>
    </AuthPanel>
  );
}
