"use client";

import React from "react";
import { Suspense } from "react";
import Link from "next/link";
import AuthPanel from "@/components/AuthPanel";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";

function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState<"error" | "notice">("notice");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const config = getSupabaseConfig();
    const supabase = config ? createSupabaseBrowserClient(config) : null;
    if (!supabase) {
      setMessageType("error");
      setMessage("Akshar is not fully configured yet. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (error) throw error;
      setMessageType("notice");
      setMessage("If an account exists for this email, you will receive a password reset link. Check your inbox.");
      setEmail("");
    } catch (error: unknown) {
      setMessageType("error");
      const msg = error instanceof Error ? error.message : "";
      if (/network|fetch failed|failed to fetch/i.test(msg)) {
        setMessage("Could not reach Akshar. Check your connection and try again.");
      } else {
        setMessage("If an account exists for this email, you will receive a password reset link. Check your inbox.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const isConfigured = getSupabaseConfig() !== null;

  return (
    <div className="auth-card">
      <p className="auth-eyebrow">Reset your password</p>
      <h1 className="auth-title">Forgot password?</h1>
      <p className="auth-description">
        Enter your email address and we will send you a link to reset your password.
      </p>

      {!isConfigured && (
        <div className="auth-message notice" role="status">
          Akshar is not fully configured yet. You can browse the site, but password reset is temporarily unavailable.
        </div>
      )}
      {message && (
        <div className={`auth-message ${messageType}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate={false}>
        <label className="auth-field" htmlFor="forgot-email">
          Email address
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!isConfigured || isSubmitting}
          />
        </label>

        <button className="site-btn auth-submit" type="submit" disabled={!isConfigured || isSubmitting}>
          {isSubmitting ? "Sending…" : "Send reset link"}
        </button>
      </form>

      <p className="auth-switch">
        Remember your password?{" "}
        <Link href="/auth/login">Sign in</Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthPanel mode="login">
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthPanel>
  );
}
