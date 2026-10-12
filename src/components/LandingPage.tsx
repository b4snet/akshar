import Link from "next/link";
import Header from "@/components/Header";

const features = [
  ["01", "A structured curriculum to follow", "Study NEB Class 11 and 12 by level, grade, stream, and subject—so you always know what to open next."],
  ["02", "Lessons written for understanding", "Clear introductions, focused sections, and one key idea at a time make difficult concepts approachable."],
  ["03", "Practice that checks your recall", "Work through original practice questions and dedicated CEE and IOE preparation tracks."],
  ["04", "Progress you can actually see", "Save your lesson progress and quiz attempts, then pick up exactly where you left off."],
] as const;

const footerGroups = [
  { title: "LEARN", links: [["Class 11", "/curriculum"], ["Class 12", "/curriculum"], ["Study Resources", "/learn"], ["Practice Questions", "/practice"]] },
  { title: "EXAM PREPARATION", links: [["IOE Engineering Entrance", "/practice"], ["Medical CEE Preparation", "/practice"], ["Mock Practice", "/practice"], ["Revision", "/learn"]] },
  { title: "AKSHAR", links: [["About Akshar", "#about-akshar"], ["Contact", "#contact"], ["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] },
] as const;

export default function LandingPage() {
  return (
    <div className="site-root motion-site">
      <Header />
      <main>
        <section className="motion-hero" aria-labelledby="hero-title">
          <div className="motion-hero-media" role="img" aria-label="Student studying with books and notes" />
          <div className="motion-hero-shade" aria-hidden="true" />
          <div className="motion-hero-content">
            <p className="motion-eyebrow motion-enter">LEARN WITHOUT LIMITS</p>
            <h1 id="hero-title" className="motion-enter motion-enter-delay-1">Your future begins with<br />what you learn.</h1>
            <p className="motion-hero-copy motion-enter motion-enter-delay-2">Learn smarter with structured lessons, revision resources, practice questions, and exam preparation designed around your learning journey.</p>
            <div className="motion-hero-actions motion-enter motion-enter-delay-3">
              <Link href="/signup" className="motion-button motion-button-light">Start Learning <span aria-hidden="true">↗</span></Link>
              <Link href="/curriculum" className="motion-button motion-button-outline">Explore Curriculum</Link>
            </div>
          </div>
          <p className="motion-hero-caption" aria-hidden="true">AKSHAR / NEPAL</p>
        </section>

        <section className="motion-section" id="features" aria-labelledby="features-title">
          <div className="motion-section-intro"><p className="motion-eyebrow">DESIGNED FOR THE WAY YOU STUDY</p><h2 id="features-title">Clarity for every<br />step forward.</h2></div>
          <div className="motion-feature-list">{features.map(([index, title, body]) => <article className="motion-feature" key={index}><span>{index}</span><div><h3>{title}</h3><p>{body}</p></div><span className="motion-arrow" aria-hidden="true">↗</span></article>)}</div>
        </section>

        <section className="motion-section motion-statement" id="about-akshar" aria-labelledby="about-title">
          <p className="motion-eyebrow">ABOUT AKSHAR</p>
          <div><h2 id="about-title">A calm place for<br />serious study.</h2><p>Akshar brings lessons, practice questions, and progress tracking into one focused learning space for Nepali students preparing for school and entrance examinations.</p><Link className="motion-text-link" href="/curriculum">Explore the curriculum <span aria-hidden="true">→</span></Link></div>
        </section>

        <section className="motion-contact" id="contact" aria-labelledby="contact-title"><p className="motion-eyebrow">AKSHAR BY NEPLURO PRIVATE LIMITED</p><h2 id="contact-title">Learn with clarity.<br />Prepare with confidence.</h2><Link href="/signup" className="motion-button motion-button-dark">Create your account <span aria-hidden="true">↗</span></Link></section>
      </main>
      <footer className="motion-footer">
        <div className="motion-footer-grid">
          <div className="motion-footer-brand"><span className="motion-footer-mark" aria-hidden="true">अ</span><div><strong>akshar<span>.</span></strong><p>Learn with clarity. Prepare with confidence. Build your future.</p></div></div>
          {footerGroups.map((group) => <nav key={group.title} className="motion-footer-group" aria-label={group.title}><p>{group.title}</p>{group.links.map(([label, href]) => href.startsWith("#") ? <a href={href} key={label}>{label}</a> : <Link href={href} key={label}>{label}</Link>)}</nav>)}
        </div>
        <div className="motion-footer-bottom">© 2026 Nepluro Private Limited. Akshar. All rights reserved.</div>
      </footer>
    </div>
  );
}
