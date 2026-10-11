"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupabaseConfig } from "@/lib/supabase/config";

type AuthState =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "signed-out" }
  | { status: "signed-in"; email: string }
  | { status: "error" };

export default function SessionControls({ config }: { config: SupabaseConfig | null }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>(() => config ? { status: "loading" } : { status: "unconfigured" });
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) {
      return;
    }

    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setAuthState(session?.user ? { status: "signed-in", email: session.user.email ?? "Account" } : { status: "signed-out" });
    });

    void supabase.auth.getUser().then(({ data, error }) => {
      if (!isMounted) return;
      if (error && error.name !== "AuthSessionMissingError") {
        setAuthState({ status: "error" });
      } else if (data.user) {
        setAuthState({ status: "signed-in", email: data.user.email ?? "Account" });
      } else {
        setAuthState({ status: "signed-out" });
      }
    }).catch(() => {
      if (isMounted) setAuthState({ status: "error" });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [config]);

  async function signOut() {
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) {
      setAuthState({ status: "unconfigured" });
      return;
    }

    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setAuthState({ status: "signed-out" });
      router.refresh();
    } catch {
      setAuthState({ status: "error" });
    } finally {
      setIsSigningOut(false);
    }
  }

  if (authState.status === "loading") return <div className="auth-controls" role="status">Checking session…</div>;
  if (authState.status === "unconfigured") return <div className="auth-controls"><span className="auth-setup-indicator">Supabase not configured</span><Link className="auth-nav-link" href="/login">Account setup</Link></div>;
  if (authState.status === "error") return <div className="auth-controls"><span className="auth-error-indicator" role="status">Auth connection unavailable</span><Link className="auth-nav-link" href="/login">Try again</Link></div>;
  if (authState.status === "signed-out") return <div className="auth-controls"><Link className="auth-nav-link" href="/login">Log in</Link><Link className="auth-nav-primary" href="/signup">Create account</Link></div>;

  return <div className="auth-controls"><span className="auth-email" title={authState.email}>{authState.email}</span><button className="auth-nav-link" type="button" onClick={signOut} disabled={isSigningOut}>{isSigningOut ? "Signing out…" : "Log out"}</button></div>;
}