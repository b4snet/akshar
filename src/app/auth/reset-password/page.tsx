"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { isPasswordRecoveryAuthorized, sanitizeRecoveryError } from "@/lib/supabase/passwordRecovery";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const config = getSupabaseConfig();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "notice">("notice");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(false);

  useEffect(() => {
    if (!config) return;
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) return;

    const recoveryCode = searchParams.get("code");
    let active = true;
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (!active) return;
      if (isPasswordRecoveryAuthorized(event)) {
        setHasValidToken(true);
        setMessage("");
      }
    });

    void (async () => {
      if (recoveryCode) {
        const { error } = await supabase.auth.exchangeCodeForSession(recoveryCode);
        if (!active || error) {
          if (!active) return;
          setMessageType("error");
          setMessage(sanitizeRecoveryError(error?.message));
          setHasValidToken(false);
        }
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!active || error || !data.session) {
        setMessageType("error");
        setMessage("Invalid or expired reset link. Please request a new password reset.");
        setHasValidToken(false);
      }
    })();

    const sessionTimeout = window.setTimeout(() => {
      setHasValidToken((valid) => {
        if (!valid) {
          setMessageType("error");
          setMessage("Invalid or expired reset link. Please request a new password reset.");
        }
        return valid;
      });
    }, 1500);

    return () => {
      active = false;
      window.clearTimeout(sessionTimeout);
      subscription.subscription.unsubscribe();
    };
  }, [config, searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!config) {
      setMessageType("error");
      setMessage("Akshar is not fully configured yet. Please try again later.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) {
      setMessageType("error");
      setMessage("Akshar is not fully configured yet. Please try again later.");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessageType("notice");
      setMessage("Your password has been updated successfully. You can now sign in.");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.replace("/auth/login"), 2000);
    } catch (error: unknown) {
      setMessageType("error");
      const msg = error instanceof Error ? error.message : "";
      if (/invalid token|expired|not found/i.test(msg)) {
        setMessage("Invalid or expired reset link. Please request a new password reset.");
      } else if (/network|fetch failed|failed to fetch/i.test(msg)) {
        setMessage("Could not reach Akshar. Check your connection and try again.");
      } else {
        setMessage("Password reset could not be completed. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const isConfigured = config !== null;

  if (!hasValidToken) {
    return (
      <div className="auth-card">
        <p className="auth-eyebrow">Reset your password</p>
        <h1 className="auth-title">Invalid reset link</h1>
        <p className="auth-description">{message || "This password reset link is invalid or has expired."}</p>
        <p className="auth-switch">
          Need a new link?{" "}
          <Link href="/auth/forgot-password">Request password reset</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <p className="auth-eyebrow">Reset your password</p>
      <h1 className="auth-title">Create a new password</h1>
      <p className="auth-description">
        Enter your new password below. It must be at least 8 characters.
      </p>

      {!isConfigured && (
        <div className="auth-message notice" role="status">
          Akshar is not fully configured yet. You can browse the site, but password reset is temporarily unavailable.
        </div>
      )}
      {message && !hasValidToken ? null : message && (
        <div className={`auth-message ${messageType}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit} noValidate={false}>
        <label className="auth-field" htmlFor="reset-password">
          New password
          <input
            id="reset-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={!isConfigured || isSubmitting}
          />
        </label>

        <label className="auth-field" htmlFor="reset-confirm-password">
          Confirm password
          <input
            id="reset-confirm-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={!isConfigured || isSubmitting}
          />
        </label>

        <button className="site-btn auth-submit" type="submit" disabled={!isConfigured || isSubmitting}>
          {isSubmitting ? "Resetting…" : "Reset password"}
        </button>
      </form>

      <p className="auth-switch">
        Remember your password?{" "}
        <Link href="/auth/login">Sign in</Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  const config = getSupabaseConfig();
  return (
    <div className="auth-shell">
      <aside className="auth-brand" aria-label="Akshar">
        <Link href="/" className="auth-brand-mark" aria-label="Back to the Akshar website">
          <span className="site-mark" aria-hidden="true">अ</span>
          <span>akshar<span className="site-mark-period">.</span></span>
        </Link>
        <div className="auth-brand-copy">
          <p className="auth-brand-eyebrow">Reset your password</p>
          <p className="auth-brand-line">Set a new password and get back to learning.</p>
        </div>
        <p className="auth-brand-footnote">A learning platform by Nepluro Private Limited</p>
      </aside>
      <main className="auth-main">
        <div className="auth-top">
          <Link href="/" className="auth-back-link">← Back to website</Link>
        </div>
        <div className="auth-card-wrap"><Suspense fallback={<div className="auth-card"><p>Loading…</p></div>}>{config ? <ResetPasswordForm /> : <div className="auth-card"><p>Supabase is not configured.</p></div>}</Suspense></div>
      </main>
    </div>
  );
}
