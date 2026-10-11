import { requireUser } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";
import LearningProgressPanel from "@/components/LearningProgressPanel";

// Session-gated: renders per request after the proxy + requireUser() verify it.
export const instant = false;

export default async function ProgressPage() {
  await requireUser("/progress");
  return (
    <AppShell active="progress">
      <section className="route-intro" aria-labelledby="progress-title">
        <div className="section-kicker">ACCOUNT DATA WHEN AVAILABLE</div>
        <h1 id="progress-title">Notice your progress.</h1>
        <p>Signed-in accounts can view saved lesson progress, quiz attempts, and activity. Without project setup or a session, the page shows clearly labeled sample data instead.</p>
      </section>
      <LearningProgressPanel />
      <footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Example progress only · not linked to an account</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}