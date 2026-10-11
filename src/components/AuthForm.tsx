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
  if (/password should be at least/i.test(message)) return "Password must be at least 8 characters.";
  if (/network|fetch failed|failed to fetch/i.test(message)) return "Could not reach Akshar. Check your connection and try again.";
  return "Authentication could not be completed. Check your details and try again.";
}

export default function AuthForm({ mode, initialNotice, config, redirectTo }: AuthFormProps) {
  const isConfigured = config !== null;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(initialNotice ?? "");
  const [messageType, setMessageType] = useState<"error" | "notice">(initialNotice ? "notice" : "error");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) {
      setMessageType("error");
      setMessage("Akshar is not fully configured yet. Please try again later.");
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
        setMessage("Your account was created. Check your email for a confirmation link, then log in.");
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
    <div className="auth-card">
      <p className="auth-eyebrow">{isSignup ? "Get started" : "Welcome back"}</p>
      <h1 className="auth-title">{isSignup ? "Create your account" : "Log in to Akshar"}</h1>
      <p className="auth-description">
        {isSignup
          ? "Start organising your NEB studies today. It only takes a moment."
          : "Continue your learning where you left off."}
      </p>

      {!isConfigured && (
        <div className="auth-message notice" role="status">
          Akshar is not fully configured yet. You can browse the site, but signing in is temporarily unavailable.
        </div>
      )}
      {message && (
        <div className={`auth-message ${messageType}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate={false}>
        {isSignup && (
          <label className="auth-field" htmlFor="auth-display-name">
            Name <span>Optional</span>
            <input
              id="auth-display-name"
              autoComplete="name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              disabled={!isConfigured || isSubmitting}
            />
          </label>
        )}

        <label className="auth-field" htmlFor="auth-email">
          Email address
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!isConfigured || isSubmitting}
          />
        </label>

        <label className="auth-field" htmlFor="auth-password">
          Password
          <span className="auth-input-wrap">
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!isConfigured || isSubmitting}
            />
            <button
              type="button"
              className="auth-visibility-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={!isConfigured || isSubmitting}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>

        <button className="site-btn auth-submit" type="submit" disabled={!isConfigured || isSubmitting}>
          {isSubmitting ? "Please wait…" : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <p className="auth-switch">
        {isSignup ? "Already have an account?" : "New to Akshar?"}{" "}
        <Link href={isSignup ? "/auth/login" : "/signup"}>{isSignup ? "Log in" : "Create an account"}</Link>
      </p>
    </div>
  );
}
