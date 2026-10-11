import Link from "next/link";
import type { ReactNode } from "react";

type AuthPanelProps = {
  mode: "login" | "signup";
  children: ReactNode;
};

export default function AuthPanel({ mode, children }: AuthPanelProps) {
  return (
    <div className="auth-shell">
      <aside className="auth-brand" aria-label="Akshar">
        <Link href="/" className="auth-brand-mark" aria-label="Back to the Akshar website">
          <span className="site-mark" aria-hidden="true">अ</span>
          <span>akshar<span className="site-mark-period">.</span></span>
        </Link>

        <div className="auth-brand-copy">
          <p className="auth-brand-eyebrow">{mode === "login" ? "Welcome back" : "Join Akshar"}</p>
          <p className="auth-brand-line">
            {mode === "login"
              ? "Your subjects, lessons, and progress are waiting exactly where you left them."
              : "Organise your NEB studies, practise with clear questions, and see your progress build."}
          </p>
        </div>

        <p className="auth-brand-footnote">A learning platform by Nepluro Private Limited</p>
      </aside>

      <main className="auth-main">
        <div className="auth-top">
          <Link href="/" className="auth-back-link">← Back to website</Link>
        </div>
        <div className="auth-card-wrap">{children}</div>
      </main>
    </div>
  );
}
