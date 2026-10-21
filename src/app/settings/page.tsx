import { Suspense } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import SettingsForm from "@/components/SettingsForm";
import { requireUser } from "@/lib/supabase/server";

// Session-gated: renders per request after the proxy + requireUser() verify it.
export const instant = false;

async function SettingsContent() {
  const { supabase, user } = await requireUser("/settings");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email, display_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return (
      <div className="settings-state" role="alert">
        <strong>Account settings could not be loaded.</strong>
        <p>Check the profiles table and its owner-only read policy.</p>
        <Link href="/">Return to dashboard</Link>
      </div>
    );
  }

  return (
    <SettingsForm
      email={user.email ?? profile?.email ?? ""}
      initialDisplayName={profile?.display_name ?? ""}
      profileExists={profile !== null}
    />
  );
}

export default function SettingsPage() {
  return (
    <AppShell active="settings">
      <section className="route-intro" aria-labelledby="settings-title">
        <div className="section-kicker">YOUR ACCOUNT</div>
        <h1 id="settings-title">Settings</h1>
        <p>Manage your personal Akshar profile and account session.</p>
      </section>
      <div className="settings-content">
        <Suspense fallback={<div className="settings-state" role="status">Loading account settings…</div>}>
          <SettingsContent />
        </Suspense>
      </div>
      <footer className="page-footer">
        <Link className="footer-brand" href="/dashboard">
          <span className="brand-symbol" aria-hidden="true">अ</span>
          akshar<span className="wordmark-period">.</span>
        </Link>
        <span>Account details are private to your session</span>
        <Link href="#top">Back to top ↑</Link>
      </footer>
    </AppShell>
  );
}