import { Suspense } from "react";
import { requireUser } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";
import ExamSelection from "@/components/ExamSelection";

export const instant = false;

export default async function ExamPage() {
  await requireUser("/exam");
  return (
    <AppShell active="exam">
      <section className="route-intro" aria-labelledby="exam-title">
        <div className="section-kicker">EXAM SIMULATION</div>
        <h1 id="exam-title">Simulate the real exam.</h1>
        <p>Choose an official or practice exam. Each attempt is timed, scored, and saved to your account.</p>
      </section>
      <Suspense fallback={<div className="route-loading" role="status">Loading exams…</div>}>
        <ExamSelection />
      </Suspense>
      <footer className="page-footer">
        <a className="footer-brand" href="/dashboard">
          <span className="brand-symbol" aria-hidden="true">अ</span>
          akshar<span className="wordmark-period">.</span>
        </a>
        <span>Exam simulations are practice tools. Official rules may differ.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </AppShell>
  );
}