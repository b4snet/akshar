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
    <div className="site-root video-site">
      <Header />
      <main>
        <section
          className="hero-section"
          aria-labelledby="hero-title"
          style={{
            position: "relative",
            overflow: "hidden",
            color: "var(--foreground)",
            padding: "80px 20px 40px",
            maxWidth: "1200px",
            margin: "0 auto",
            background: "var(--background)",
          }}
        >
          <div
            className="hero-bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "var(--primary)",
              zIndex: 0,
            }}
          />
          <div
            className="hero-content"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <h1
              id="hero-title"
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 900,
                lineHeight: "1.1",
                letterSpacing: "-.05em",
                marginBottom: "24px",
              }}
            >
              Beyond memorising, you build your future.
            </h1>
            <p
              id="hero-subtitle"
              style={{
                color: "var(--secondary)",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(18px, 4vw, 20px)",
                lineHeight: "1.6",
                marginBottom: "32px",
              }}
            >
              Learn smarter with structured lessons, revision resources, practice questions, and exam preparation designed around your learning journey.
            </p>
            <div
              className="hero-actions"
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "32px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Link
                href="/signup"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  background: "var(--foreground)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  transition: "background .2s ease",
                  textDecoration: "none",
                }}
              >
                Start Learning
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/learn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  background: "transparent",
                  color: "var(--foreground)",
                  border: "1px solid var(--silver)",
                  fontSize: "14px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  transition: "all .2s ease",
                  textDecoration: "none",
                }}
              >
                Explore Curriculum
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section
          className="motion-section"
          id="features"
          aria-labelledby="features-title"
          style={{
            padding: "60px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            color: "var(--foreground)",
          }}
        >
          <div
            className="motion-section-intro"
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <p
              className="motion-eyebrow"
              style={{
                color: "var(--silver)",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: ".2em",
                marginBottom: "16px",
              }}
            >
              DESIGNED FOR THE WAY YOU STUDY
            </p>
            <h2
              id="features-title"
              style={{
                color: "var(--foreground)",
                fontSize: "clamp(32px, 6vw, 48px)",
                fontWeight: 900,
                lineHeight: "1.2",
                letterSpacing: "-.02em",
              }}
            >
              Clarity for every step forward.
            </h2>
          </div>
          <div
            className="motion-feature-list"
            style={{
              display: "grid",
              gap: "24px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {features.map(([index, title, body]) => (
              <article
                key={index}
                className="motion-feature"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "32px 24px",
                  transition: "all .2s ease",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    background: "var(--primary)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "20px",
                    marginBottom: "16px",
                    flexShrink: "0",
                  }}
                >
                  {index}
                </span>
                <h3
                  style={{
                    color: "var(--foreground)",
                    fontSize: "clamp(20px, 3vw, 24px)",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "var(--secondary)",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    lineHeight: "1.6",
                  }}
                >
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="motion-section motion-statement"
          id="about-akshar"
          aria-labelledby="about-title"
          style={{
            padding: "60px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            color: "var(--foreground)",
          }}
        >
          <p
            className="motion-eyebrow"
            style={{
              color: "var(--silver)",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: ".2em",
              marginBottom: "16px",
            }}
          >
            ABOUT AKSHAR
          </p>
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <h2
              id="about-title"
              style={{
                color: "var(--foreground)",
                fontSize: "clamp(32px, 6vw, 48px)",
                fontWeight: 900,
                lineHeight: "1.2",
                letterSpacing: "-.02em",
              }}
            >
              A calm place for serious study.
            </h2>
          </div>
          <p
            style={{
              color: "var(--secondary)",
              fontSize: "clamp(16px, 4vw, 18px)",
              lineHeight: "1.6",
              marginBottom: "24px",
            }}
          >
            Akshar brings lessons, practice questions, and progress tracking into one focused learning space for Nepali students preparing for school and entrance examinations.
          </p>
          <Link
            href="/learn"
            className="motion-text-link"
            style={{
              color: "var(--foreground)",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              textDecoration: "none",
              borderBottom: "1px solid currentColor",
              paddingBottom: "4px",
            }}
          >
            Explore curriculum
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section
          className="motion-section motion-contact"
          id="contact"
          aria-labelledby="contact-title"
          style={{
            padding: "60px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            color: "var(--foreground)",
          }}
        >
          <p
            className="motion-eyebrow"
            style={{
              color: "var(--silver)",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: ".2em",
              marginBottom: "16px",
            }}
          >
            AKSHAR BY NEPLURO PRIVATE LIMITED
          </p>
          <h2
            id="contact-title"
            style={{
              color: "var(--foreground)",
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 900,
              lineHeight: "1.2",
              letterSpacing: "-.02em",
            }}
          >
            Learn with clarity.<br />Prepare with confidence.
          </h2>
          <Link
            href="/signup"
            className="motion-button motion-button-dark"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "6px",
              background: "var(--foreground)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              transition: "all .2s ease",
              textDecoration: "none",
            }}
          >
            Create your account
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
      <footer
        className="motion-footer"
        style={{
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          color: "var(--secondary)",
        }}
      >
        <div
          className="motion-footer-grid"
          style={{
            display: "grid",
            gridTemplateAreas:
              "'brand links1 links2'",
            gap: "40px",
          }}
        >
          <div
            className="motion-footer-brand"
            style={{
              gridArea: "brand",
              textAlign: "center",
            }}
          >
            <span
              className="motion-footer-mark"
              aria-hidden="true"
              style={{
                display: "block",
                width: "48px",
                height: "48px",
                background: "var(--primary)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <div>
              <strong
                style={{ color: "var(--foreground)", fontSize: "18px" }}
              >
                akshar
              </strong>
              <span
                style={{ opacity: 0.5, margin: "0 4px" }}
              >
                .
              </span>
              <p
                style={{
                  fontSize: "13px",
                  margin: "8px 0 0",
                  color: "var(--secondary)",
                }}
              >
                Learn with clarity. Prepare with confidence. Build your future.
              </p>
            </div>
          </div>
          {footerGroups.map((group) => (
            <nav
              key={group.title}
              className="motion-footer-group"
              aria-label={group.title}
              style={{
                gridArea: group.title.toLowerCase().replace(/\s/g, "-"),
              }}
            >
              <p
                style={{
                  color: "var(--silver)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginBottom: "16px",
                }}
              >
                {group.title}
              </p>
              {group.links.map((link) => {
                const { label, href } = link;
                if (href.startsWith("#")) {
                  return <a
                    key={label}
                    href={href}
                    style={{
                      color: "var(--secondary)",
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                }
                return (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      color: "var(--secondary)",
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>
          ))}
        </div>
        <div
          className="motion-footer-bottom"
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            color: "var(--secondary)",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          © 2026 Nepluro Private Limited. Akshar. All rights reserved.
        </div>
        <div
          className="video-socials"
          aria-label="Akshar social profiles"
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <a
            href="https://www.instagram.com/b4snet/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "var(--secondary)",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/dipsonbasnettt/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "var(--secondary)",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}