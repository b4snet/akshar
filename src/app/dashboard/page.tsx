import AppShell from "@/components/AppShell";
import DashboardLearning from "@/components/DashboardLearning";
import Link from "next/link";

const tracks = [
  {
    name: "NEB Grade 11",
    detail: "Build a strong foundation",
    subjects: "Physics · Chemistry · Biology · Math",
    progress: 42,
    color: "lavender",
    mark: "11",
    href: "/learn#subjects",
  },
  {
    name: "NEB Grade 12",
    detail: "Get ready for board exams",
    subjects: "Core subjects and revision",
    progress: 18,
    color: "mint",
    mark: "12",
    href: "/learn#subjects",
  },
  {
    name: "CEE preparation",
    detail: "Prepare for medical entrance",
    subjects: "Biology · Chemistry · Physics",
    progress: 27,
    color: "peach",
    mark: "C",
    href: "/practice#cee",
  },
  {
    name: "IOE preparation",
    detail: "Get set for engineering entrance",
    subjects: "Mathematics · Physics · Chemistry",
    progress: 12,
    color: "blue",
    mark: "I",
    href: "/practice#ioe",
  },
];

const lessons = [
  { id: "10000000-0000-4000-8000-000000000001", subject: "Physics", title: "Vectors and scalars", unit: "Mechanics · Sample lesson 4", progress: 68, minutes: 18, tint: "violet", mark: "P" },
  { id: "10000000-0000-4000-8000-000000000002", subject: "Chemistry", title: "Periodic classification", unit: "Foundations · Sample lesson 2", progress: 35, minutes: 22, tint: "green", mark: "C" },
  { id: "10000000-0000-4000-8000-000000000003", subject: "Mathematics", title: "Limits and continuity", unit: "Calculus · Sample lesson 6", progress: 82, minutes: 16, tint: "amber", mark: "M" },
  { id: "10000000-0000-4000-8000-000000000004", subject: "Biology", title: "Cell structure and function", unit: "Cell biology · Sample lesson 3", progress: 14, minutes: 20, tint: "rose", mark: "B" },
];

export default function DashboardPage() {
  return (
    <AppShell active="dashboard">
          <section className="welcome-section" aria-labelledby="welcome-title">
            <div className="welcome-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> SUNDAY, OCTOBER 11</div>
              <h1 id="welcome-title">Your next chapter<br className="desktop-break" /> starts <span>here.</span></h1>
              <p>A little progress each day adds up. Pick up where you left off, or find something new to explore.</p>
              <div className="welcome-actions">
                <Link className="button button-primary" href="/learn"><span aria-hidden="true">→</span> Continue learning</Link>
                <Link className="button button-secondary" href="/learn">Explore subjects</Link>
              </div>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
              <div className="art-page page-back"><span>∫</span><i /><i /><i /></div>
              <div className="art-page page-front"><span className="art-sun">✳</span><strong>Keep<br />going.</strong><i /><i /><b>01 / 04</b></div>
              <span className="art-spark spark-one">✦</span><span className="art-spark spark-two">✳</span>
            </div>
            <div className="welcome-footnote"><span className="tiny-check">✓</span> Your learning space, ready when you are</div>
          </section>

          <section className="section-block" id="tracks" aria-labelledby="tracks-heading">
            <div className="section-heading"><div><div className="section-kicker">A PATH THAT FITS</div><h2 id="tracks-heading">Your learning paths</h2></div><span className="sample-tag">SAMPLE DATA</span></div>
            <div className="track-grid">
              {tracks.map((track) => (
                <article className="track-card" key={track.name}>
                  <div className="track-card-top"><span className={`track-mark ${track.color}`}>{track.mark}</span><span className="track-arrow" aria-hidden="true">↗</span></div>
                  <h3>{track.name}</h3><p className="track-detail">{track.detail}</p><p className="track-subjects">{track.subjects}</p>
                  <div className="track-progress-label"><span>Sample progress</span><strong>{track.progress}%</strong></div>
                  <div className="progress-track"><span style={{ width: `${track.progress}%` }} /></div>
                  <Link href={track.href} className="track-link">{track.progress > 0 ? "Continue path" : "Explore path"}<span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </section>

          <DashboardLearning lessons={lessons} />

          <section className="tutor-section" id="tutor" aria-labelledby="tutor-heading">
            <div className="tutor-copy"><div className="tutor-kicker"><span aria-hidden="true">✳</span> A STUDY COMPANION</div><h2 id="tutor-heading">Big question?<br />Start somewhere.</h2><p>Ask in your own words and explore a simple sample explanation in the dedicated tutor space.</p><div className="tutor-disclaimer">Local demo only · no AI model connected</div></div>
            <div className="tutor-panel dashboard-route-callout"><span className="tutor-callout-mark" aria-hidden="true">✳</span><strong>Your tutor space is ready.</strong><p>Example prompts and a clearly labeled local response.</p><a className="button button-primary" href="/tutor">Open the demo tutor <span aria-hidden="true">→</span></a></div>
          </section>

          <section className="section-block practice-section" id="practice" aria-labelledby="practice-heading">
            <div className="section-heading"><div><div className="section-kicker">A FEW MINUTES GO A LONG WAY</div><h2 id="practice-heading">Practice &amp; review</h2></div><span className="sample-tag">SAMPLE ACTIVITIES</span></div>
            <div className="quiz-grid dashboard-practice-links">
              <a className="quiz-card" href="/practice#neb"><span className="quiz-type">NEB · SAMPLE</span><h3>Subject practice</h3><span className="dashboard-card-link">Start a sample quiz <span aria-hidden="true">→</span></span></a>
              <a className="quiz-card" href="/practice#cee"><span className="quiz-type">CEE · SAMPLE</span><h3>Medical entrance</h3><span className="dashboard-card-link">Explore CEE practice <span aria-hidden="true">→</span></span></a>
              <a className="quiz-card" href="/practice#ioe"><span className="quiz-type">IOE · SAMPLE</span><h3>Engineering entrance</h3><span className="dashboard-card-link">Explore IOE practice <span aria-hidden="true">→</span></span></a>
            </div>
          </section>

          <footer className="page-footer" id="settings"><a className="footer-brand" href="#top"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Made for curious minds, wherever they are.</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}
