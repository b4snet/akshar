import AppShell from "@/components/AppShell";
import TutorDemo from "@/components/TutorDemo";

export default function TutorPage() {
  return (
    <AppShell active="tutor">
      <section className="route-intro" aria-labelledby="tutor-title">
        <div className="section-kicker">A STUDY COMPANION</div>
        <h1 id="tutor-title">Start with a question.</h1>
        <p>Write what you are wondering about and get a simple starting point. Try an example prompt or ask in your own words.</p>
      </section>
      <TutorDemo />
      <footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Demo responses only · no AI provider connected</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}