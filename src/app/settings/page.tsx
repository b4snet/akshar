import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import SettingsForm from "@/components/SettingsForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Session-gated: renders per request after the proxy + requireUser() verify it.
export const instant = false;

async function SettingsContent() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <div className="settings-state" role="alert"><strong>Supabase is not configured.</strong><p>Account settings require a configured Supabase project. Add the API URL and publishable key to `.env.local` and restart the app.</p><Link href="/auth/login">Go to login</Link></div>;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error?.name === "AuthSessionMissingError" || (!error && !data.user)) redirect("/auth/login?next=%2Fsettings");
  if (error || !data.user) {
    return <div className="settings-state" role="alert"><strong>Session could not be verified.</strong><p>Reload the page or log in again to access account settings.</p><Link href="/auth/login?next=%2Fsettings">Log in</Link></div>;
  }

  const { data: profile, error: profileError } = await supabase.from("profiles").select("email, display_name").eq("id", data.user.id).maybeSingle();
  if (profileError) {
    return <div className="settings-state" role="alert"><strong>Account settings could not be loaded.</strong><p>Check the profiles table and its owner-only read policy.</p><Link href="/">Return to dashboard</Link></div>;
  }

  return <SettingsForm email={data.user.email ?? profile?.email ?? ""} initialDisplayName={profile?.display_name ?? ""} profileExists={profile !== null} />;
}

export default function SettingsPage() {
  return <AppShell active="settings"><section className="route-intro" aria-labelledby="settings-title"><div className="section-kicker">YOUR ACCOUNT</div><h1 id="settings-title">Settings</h1><p>Manage your personal Akshar profile and account session.</p></section><div className="settings-content"><Suspense fallback={<div className="settings-state" role="status">Loading account settings…</div>}><SettingsContent /></Suspense></div><footer className="page-footer"><Link className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></Link><span>Account details are private to your session</span><Link href="#top">Back to top ↑</Link></footer></AppShell>;
}