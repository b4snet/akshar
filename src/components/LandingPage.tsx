import Link from "next/link";
import Header from "@/components/Header";

const features = [
  {
    index: "01",
    title: "A structured curriculum to follow",
    body: "Study NEB Class 11 and 12 organised by education level, grade, stream, and subject — so you always know what to open next instead of searching through notes.",
  },
  {
    index: "02",
    title: "Lessons written for understanding",
    body: "Each lesson breaks a topic into a plain introduction, short sections, and one key idea to take away — designed to make difficult concepts feel approachable.",
  },
  {
    index: "03",
    title: "Practice that checks your recall",
    body: "Original practice quizzes for NEB study, plus separate tracks for CEE and IOE entrance preparation. Every quiz is clearly labelled as practice material — not official past papers.",
  },
  {
    index: "04",
    title: "Progress you can actually see",
    body: "Create an account and your lesson progress and quiz attempts are saved, so you can review what you have covered and pick up where you stopped.",
  },
];

const steps = [
  {
    number: "1",
    title: "Create your account",
    body: "Sign up with your email address. Confirmation is handled securely through Supabase — we never see or store your password.",
  },
  {
    number: "2",
    title: "Pick your subjects",
    body: "Choose your grade and stream, then work through lessons at your own pace — a chapter at a time, or one focused session a day.",
  },
  {
    number: "3",
    title: "Practice and review",
    body: "Finish a lesson, test yourself with a practice quiz, and watch your progress build week by week as you prepare for your exams.",
  },
];

export default function LandingPage() {
  return (
    <div className="site-root">
      <Header />

      <main>
        <section className="site-hero" aria-labelledby="hero-title">
          <p className="site-eyebrow">A better way to learn</p>
          <h1 id="hero-title">Your learning journey,<br /> made clearer.</h1>
          <p className="site-hero-sub">
            Akshar helps Nepali students organise their studies, understand difficult
            concepts, and prepare for important examinations with a more focused
            learning experience.
          </p>
          <div className="site-hero-actions">
            <Link href="/signup" className="site-btn">Start learning</Link>
            <a href="#features" className="site-btn site-btn-ghost">Explore Akshar</a>
          </div>
        </section>

        <section className="site-section" id="features" aria-labelledby="features-title">
          <div className="site-section-head">
            <p className="site-eyebrow">What Akshar offers today</p>
            <h2 id="features-title">Built around how you actually study.</h2>
          </div>
          <div className="site-feature-list">
            {features.map((feature) => (
              <article className="site-feature" key={feature.index}>
                <span className="site-feature-index" aria-hidden="true">{feature.index}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="site-note">
            Akshar is under active development. An AI study companion is being explored
            as an early demo inside the app — it is clearly labelled and is not a
            live AI service yet.
          </p>
        </section>

        <section className="site-section site-section-alt" id="how-it-works" aria-labelledby="how-title">
          <div className="site-section-head">
            <p className="site-eyebrow">How it works</p>
            <h2 id="how-title">Three steps to a steadier study habit.</h2>
          </div>
          <ol className="site-steps">
            {steps.map((step) => (
              <li className="site-step" key={step.number}>
                <span className="site-step-number" aria-hidden="true">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="site-section" id="about-akshar" aria-labelledby="about-akshar-title">
          <div className="site-section-head">
            <p className="site-eyebrow">About Akshar</p>
            <h2 id="about-akshar-title">A calm place for serious study.</h2>
          </div>
          <div className="site-prose">
            <p>
              Akshar is a learning platform built to help Nepali students access
              organised study materials and build more consistent study habits. It
              brings lessons, practice questions, and progress tracking together in
              one focused space, so preparation for school and entrance examinations
              feels less scattered and more manageable.
            </p>
            <p>
              The platform currently centres on the NEB Grade 11 and 12 pathway, with
              practice tracks for CEE and IOE preparation. Content and features are
              added carefully as the platform develops.
            </p>
          </div>
        </section>

        <section className="site-section site-section-alt" id="about-nepluro" aria-labelledby="about-nepluro-title">
          <div className="site-section-head">
            <p className="site-eyebrow">About Nepluro</p>
            <h2 id="about-nepluro-title">Developed by Nepluro Private Limited.</h2>
          </div>
          <div className="site-prose">
            <p>
              Akshar is a product developed under Nepluro Private Limited. Nepluro
              builds software with a focus on practical tools for learning and
              everyday use, and Akshar is its education platform for students in
              Nepal.
            </p>
            <p>
              Questions about the platform or the company can be directed to the
              Nepluro team through the channels published on its official channels.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <span className="site-mark" aria-hidden="true">अ</span>
            <div>
              <strong>akshar<span className="site-mark-period">.</span></strong>
              <p>A focused learning space for NEB students and entrance exam preparation.</p>
            </div>
          </div>
          <nav className="site-footer-links" aria-label="Footer">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about-akshar">About Akshar</a>
            <a href="#about-nepluro">About Nepluro</a>
            <Link href="/auth/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </nav>
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 Nepluro Private Limited. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
