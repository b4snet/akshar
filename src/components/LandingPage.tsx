import Link from "next/link";
import Header from "@/components/Header";

const features = [
  ["01", "A structured curriculum to follow", "Study NEB Class 11 and 12 by level, grade, stream, and subject—so you always know what to open next."],
  ["02", "Lessons written for understanding", "Clear introductions, focused sections, and one key idea at a time make difficult concepts approachable."],
  ["03", "Practice that checks your recall", "Work through original practice questions and dedicated CEE and IOE preparation tracks."],
  ["04", "Progress you can actually see", "Save your lesson progress and quiz attempts, then pick up exactly where you left off."],
] as const;

interface FooterLink {
  label: string;
  href: string;
}

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

const footerGroups: FooterGroup[] = [
  {
    title: "LEARN",
    links: [
      { label: "Class 11", href: "/learn" },
      { label: "Class 12", href: "/learn" },
      { label: "Study Resources", href: "/learn" },
      { label: "Practice Questions", href: "/practice" },
    ],
  },
  {
    title: "EXAM PREPARATION",
    links: [
      { label: "IOE Engineering Entrance", href: "/practice" },
      { label: "Medical CEE Preparation", href: "/practice" },
      { label: "Mock Practice", href: "/practice" },
      { label: "Revision", href: "/learn" },
    ],
  },
  {
    title: "AKSHAR",
    links: [
      { label: "About Akshar", href: "#about-akshar" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

export default function LandingPage() {
  return (
    <div className="site-root">
      <Header />
      <main>
        <section className="site-hero" aria-labelledby="hero-title">
          <p className="site-eyebrow">LEARN WITHOUT LIMITS</p>
          <h1 id="hero-title">Beyond memorising, you build your future.</h1>
          <p className="site-hero-sub">
            Structured lessons, revision resources, practice questions, and exam preparation for students ready to learn with purpose.
          </p>
          <div className="site-hero-actions">
            <Link href="/signup" className="site-btn">Start Learning</Link>
            <Link href="/learn" className="site-btn site-btn-ghost">Explore Curriculum</Link>
          </div>
        </section>

        <section className="site-section" id="features" aria-labelledby="features-title">
          <div className="site-section-head">
            <p className="site-eyebrow">DESIGNED FOR THE WAY YOU STUDY</p>
            <h2 id="features-title">Clarity for every step forward.</h2>
          </div>
          <div className="site-feature-list">
            {features.map(([index, title, body]) => (
              <article className="site-feature" key={index}>
                <span className="site-feature-index" aria-hidden="true">{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-section" id="about-akshar" aria-labelledby="about-title">
          <div className="site-section-head">
            <p className="site-eyebrow">ABOUT AKSHAR</p>
            <h2 id="about-title">A calm place for serious study.</h2>
          </div>
          <div className="site-prose">
            <p>
              Akshar brings lessons, practice questions, and progress tracking into one focused learning space for Nepali students preparing for school and entrance examinations.
            </p>
            <p>
              Everything is organised by pathway, grade, subject, chapter, and lesson, so you always know what to open next.
            </p>
          </div>
          <Link href="/learn" className="site-text-link">Explore the curriculum</Link>
        </section>

        <section className="site-section" id="contact" aria-labelledby="contact-title">
          <div className="site-section-head">
            <p className="site-eyebrow">AKSHAR BY NEPLURO PRIVATE LIMITED</p>
            <h2 id="contact-title">Learn with clarity. Prepare with confidence.</h2>
          </div>
          <Link href="/signup" className="site-btn">Create your account</Link>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <span className="site-mark" aria-hidden="true">अ</span>
            <div>
              <strong>akshar</strong>
              <p>Learn with clarity. Prepare with confidence. Build your future.</p>
            </div>
          </div>
          <div className="site-footer-links">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="site-footer-heading">{group.title}</p>
                {group.links.map((link) => (
                  link.href.startsWith("#") ? (
                    <a key={link.label} href={link.href}>{link.label}</a>
                  ) : (
                    <Link key={link.label} href={link.href}>{link.label}</Link>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 Nepluro Private Limited. Akshar. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
