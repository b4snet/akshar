import AppShell from "@/components/AppShell";
import PracticeExperience from "@/components/PracticeExperience";
import { getPublicQuizTracks } from "@/lib/quizData";

export default function PracticePage() {
  const tracks = getPublicQuizTracks();

  return (
    <AppShell active="practice">
      <section className="route-intro" aria-labelledby="practice-title">
        <div className="section-kicker">PRACTICE &amp; REVIEW</div>
        <h1 id="practice-title">Practice makes progress.</h1>
        <p>Choose a sample quiz for NEB study, CEE preparation, or IOE preparation. These are original demonstrations, not official questions or past papers.</p>
      </section>
      <PracticeExperience tracks={tracks} />
      <footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Sample practice questions · not official past papers</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}