"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupabaseConfig } from "@/lib/supabase/config";

type AuthFormProps = {
  mode: "login" | "signup";
  initialNotice?: string;
  config: SupabaseConfig | null;
  redirectTo?: string;
};

function getSafeAuthError(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (/invalid login credentials/i.test(message)) return "Email or password is incorrect.";
  if (/email not confirmed/i.test(message)) return "Confirm your email before logging in.";
  if (/already registered|already exists/i.test(message)) return "An account may already use this email. Try logging in instead.";
  if (/network|fetch failed|failed to fetch/i.test(message)) return "Could not reach Supabase. Check the project URL and your connection.";
  return "Authentication could not be completed. Check your details and the Supabase Auth settings.";
}

export default function AuthForm({ mode, initialNotice, config, redirectTo }: AuthFormProps) {
  const isConfigured = config !== null;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState(initialNotice ?? "");
  const [messageType, setMessageType] = useState<"error" | "notice">(initialNotice ? "notice" : "error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) {
      setMessageType("error");
      setMessage("Supabase is not configured. Set the two public environment variables in the project-root .env.local and restart the app.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName.trim() || null },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        if (data.session) {
          router.replace("/dashboard");
          router.refresh();
          return;
        }

        setMessageType("notice");
        setMessage("Sign-up was accepted by Supabase. Check your email for a confirmation link before logging in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace(redirectTo ?? "/dashboard");
        router.refresh();
        return;
      }
    } catch (error) {
      setMessageType("error");
      setMessage(getSafeAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <section className="auth-card" aria-labelledby="auth-heading">
      <div className="auth-card-heading"><span className="brand-symbol" aria-hidden="true">अ</span><div><div className="section-kicker">AKSHAR ACCOUNT</div><h1 id="auth-heading">{isSignup ? "Create your account" : "Welcome back"}</h1></div></div>
      <p className="auth-card-description">{isSignup ? "Use your email to create a learning account." : "Log in to your learning account."}</p>
      {!isConfigured && <div className="auth-config-alert" role="status"><strong>Supabase is not configured.</strong><span>Add a valid project API URL and publishable key to the root .env.local file. The dashboard and demo learning pages remain available.</span></div>}
      {message && <div className={messageType === "error" ? "auth-message error" : "auth-message notice"} role={messageType === "error" ? "alert" : "status"}>{message}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && <label htmlFor="auth-display-name">Name <span>Optional</span><input id="auth-display-name" autoComplete="name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} disabled={!isConfigured || isSubmitting} /></label>}
        <label htmlFor="auth-email">Email address<input id="auth-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={!isConfigured || isSubmitting} /></label>
        <label htmlFor="auth-password">Password<input id="auth-password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} disabled={!isConfigured || isSubmitting} /></label>
        <button className="button button-primary auth-submit" type="submit" disabled={!isConfigured || isSubmitting}>{isSubmitting ? "Please wait…" : isSignup ? "Create account" : "Log in"}<span aria-hidden="true">→</span></button>
      </form>
      <p className="auth-switch">{isSignup ? "Already have an account?" : "New to Akshar?"} <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Log in" : "Create an account"}</Link></p>
      <p className="auth-security-note">Authentication uses your Supabase project and its publishable key. No service-role key is used in the browser.</p>
    </section>
  );
}