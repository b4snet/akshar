import { Suspense } from "react";
import { requireUser } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";
import StudyWorkspace from "@/components/StudyWorkspace";

export const instant = false;

export default async function StudyPage() {
  await requireUser("/study");
  return (
    <AppShell active="study">
      <section className="route-intro" aria-labelledby="study-title">
        <div className="section-kicker">AI STUDY WORKSPACE</div>
        <h1 id="study-title">Upload materials. Generate study aids.</h1>
        <p>Add PDFs, images, text, or URLs. Extract content and create flashcards, summaries, and practice questions with AI.</p>
      </section>
      <Suspense fallback={<div className="route-loading" role="status">Loading workspace…</div>}>
        <StudyWorkspace />
      </Suspense>
      <footer className="page-footer">
        <a className="footer-brand" href="/dashboard">
          <span className="brand-symbol" aria-hidden="true">अ</span>
          akshar<span className="wordmark-period">.</span>
        </a>
        <span>Uploaded sources are private to your account.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </AppShell>
  );
}