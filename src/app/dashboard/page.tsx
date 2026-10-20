import { requireUser } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";
import DashboardLearning from "@/components/DashboardLearning";
import Link from "next/link";
import { TutorIcon } from "@/components/Icon";

// Session-gated: renders per request after the proxy + requireUser() verify it.
export const instant = false;

const tracks = [
  {
    name: "NEB Grade 11",
    detail: "Build a strong foundation",
    subjects: "Physics · Chemistry · Biology · Math",
    mark: "11",
    href: "/learn#subjects",
  },
  {
    name: "NEB Grade 12",
    detail: "Get ready for board exams",
    subjects: "Core subjects and revision",
    mark: "12",
    href: "/learn#subjects",
  },
  {
    name: "CEE preparation",
    detail: "Prepare for the medical entrance",
    subjects: "Biology · Chemistry · Physics",
    mark: "C",
    href: "/practice#cee",
  },
  {
    name: "IOE preparation",
    detail: "Get set for the engineering entrance",
    subjects: "Mathematics · Physics · Chemistry",
    mark: "I",
    href: "/practice#ioe",
  },
];

const practiceLinks = [
  { type: "NEB · SAMPLE", title: "Subject practice", cta: "Start a sample quiz", href: "/practice#neb" },
  { type: "CEE · SAMPLE", title: "Medical entrance", cta: "Explore CEE practice", href: "/practice#cee" },
  { type: "IOE · SAMPLE", title: "Engineering entrance", cta: "Explore IOE practice", href: "/practice#ioe" },
];

// Lessons are shown as navigation into real content. Progress is loaded
// separately by <DashboardLearning /> from the student's saved data.
const lessons = [
  { id: "10000000-0000-4000-8000-000000000001", subject: "Physics", title: "Vectors and scalars", unit: "Mechanics · Sample lesson 4", progress: 0, minutes: 18, mark: "P", tint: "violet", href: "/learn/10000000-0000-4000-8000-000000000001" },
  { id: "10000000-0000-4000-8000-000000000002", subject: "Chemistry", title: "Periodic classification", unit: "Foundations · Sample lesson 2", progress: 0, minutes: 22, mark: "C", tint: "green", href: "/learn/10000000-0000-4000-8000-000000000002" },
  { id: "10000000-0000-4000-8000-000000000003", subject: "Mathematics", title: "Limits and continuity", unit: "Calculus · Sample lesson 6", progress: 0, minutes: 16, mark: "M", tint: "amber", href: "/learn/10000000-0000-4000-8000-000000000003" },
  { id: "10000000-0000-4000-8000-000000000004", subject: "Biology", title: "Cell structure and function", unit: "Cell biology · Sample lesson 3", progress: 0, minutes: 20, mark: "B", tint: "rose", href: "/learn/10000000-0000-4000-8000-000000000004" },
];

export default async function DashboardPage() {
  await requireUser("/dashboard");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <AppShell active="dashboard">
      <section className="welcome-section" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> {today.toUpperCase()}</div>
          <h1 id="welcome-title">Your next chapter starts here.</h1>
          <p>Pick up where you left off, or find something new to explore.</p>
          <div className="welcome-actions">
            <Link className="button button-primary" href="/learn"><span aria-hidden="true">→</span> Continue learning</Link>
            <Link className="button button-secondary" href="/learn">Explore subjects</Link>
          </div>
        </div>
      </section>

      <section className="section-block" id="tracks" aria-labelledby="tracks-heading">
        <div className="section-heading">
          <div>
            <div className="section-kicker">A PATH THAT FITS</div>
            <h2 id="tracks-heading">Your learning paths</h2>
          </div>
        </div>
        <div className="track-grid">
          {tracks.map((track) => (
            <article className="track-card" key={track.name}>
              <div className="track-card-top">
                <span className="track-mark">{track.mark}</span>
                <span className="track-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{track.name}</h3>
              <p className="track-detail">{track.detail}</p>
              <p className="track-subjects">{track.subjects}</p>
              <Link href={track.href} className="track-link">
                {track.mark === "11" || track.mark === "12" ? "Open the path" : "Open preparation"}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <DashboardLearning lessons={lessons} />

      <section className="tutor-section" id="tutor" aria-labelledby="tutor-heading">
        <div className="tutor-copy">
          <div className="tutor-kicker"><span className="tutor-callout-mark" aria-hidden="true"><TutorIcon /></span> A STUDY COMPANION</div>
          <h2 id="tutor-heading">Big question? Start somewhere.</h2>
          <p>Ask in your own words and explore a simple sample explanation in the dedicated tutor space.</p>
          <div className="tutor-disclaimer">Local demo only · no AI model connected</div>
        </div>
        <div className="tutor-panel dashboard-route-callout">
          <strong>Your tutor space is ready.</strong>
          <p>Example prompts and a clearly labeled local response.</p>
          <Link className="button button-primary" href="/tutor">Open the demo tutor <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section-block practice-section" id="practice" aria-labelledby="practice-heading">
        <div className="section-heading">
          <div>
            <div className="section-kicker">A FEW MINUTES GO A LONG WAY</div>
            <h2 id="practice-heading">Practice &amp; review</h2>
          </div>
        </div>
        <div className="quiz-grid dashboard-practice-links">
          {practiceLinks.map((link) => (
            <Link className="quiz-card" key={link.href} href={link.href}>
              <span className="quiz-type">{link.type}</span>
              <h3>{link.title}</h3>
              <span className="dashboard-card-link">{link.cta} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="page-footer" id="settings">
        <Link className="footer-brand" href="#top">
          <span className="brand-symbol" aria-hidden="true">अ</span>
          akshar<span className="wordmark-period">.</span>
        </Link>
        <span>Made for curious minds, wherever they are.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </AppShell>
  );
}
