"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import { Badge, Card, Progress } from "@/components/ui/Primitives";
import { Bunting, Mandala, PatternStrip, Skyline } from "@/components/ui/nepali/NepaliMotifs";
import { FloatingCard, HimalayaScene } from "@/components/ui/nepali/hero";

const filters = ["All", "NEB 11", "NEB 12", "CEE", "IOE"] as const;
type Filter = (typeof filters)[number];

const subjects = [
  { name: "Physics", token: "physics", category: "Science", lessons: "18 lessons", progress: 42, paths: ["All", "NEB 11", "NEB 12"] as Filter[] },
  { name: "Chemistry", token: "chemistry", category: "Science", lessons: "16 lessons", progress: 36, paths: ["All", "NEB 11", "NEB 12"] as Filter[] },
  { name: "Mathematics", token: "mathematics", category: "Mathematics", lessons: "24 lessons", progress: 58, paths: ["All", "NEB 11", "NEB 12", "CEE", "IOE"] as Filter[] },
  { name: "Biology", token: "biology", category: "Science", lessons: "21 lessons", progress: 31, paths: ["All", "NEB 11", "NEB 12", "CEE"] as Filter[] },
  { name: "English", token: "english", category: "Language", lessons: "14 lessons", progress: 64, paths: ["All", "NEB 11", "NEB 12"] as Filter[] },
  { name: "Nepali", token: "nepali", category: "Language", lessons: "15 lessons", progress: 48, paths: ["All", "NEB 11", "NEB 12"] as Filter[] },
  { name: "CEE preparation", token: "cee", category: "Entrance", lessons: "Practice track", progress: 22, paths: ["All", "CEE"] as Filter[] },
  { name: "IOE preparation", token: "ioe", category: "Entrance", lessons: "Practice track", progress: 19, paths: ["All", "IOE"] as Filter[] },
];

const heroSubjects = subjects.slice(0, 4);

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleSubjects = subjects.filter((subject) => activeFilter === "All" || subject.paths.includes(activeFilter));

  return (
    <div className="site-root">
      <Header />
      <main>
        <section className="landing-hero" aria-labelledby="hero-title">
          <HimalayaScene className="landing-hero-background" />
          <div className="landing-hero-copy">
            <p className="site-eyebrow">LEARN WITHOUT LIMITS</p>
            <h1 id="hero-title">Beyond memorising, <span>you build your future.</span></h1>
            <p className="landing-devanagari">Akshar — a learning space with lasting purpose</p>
            <p className="landing-hero-sub">Structured lessons, revision resources, practice questions, and exam preparation for students ready to learn with purpose.</p>
            <div className="landing-actions">
              <Link href="/signup" className="site-btn">Start Learning</Link>
              <Link href="/curriculum" className="site-btn site-btn-ghost">Explore Curriculum</Link>
            </div>
          </div>
          <div className="landing-preview" aria-label="Akshar study preview">
            <div className="landing-preview-grid">
              {heroSubjects.map((subject, index) => (
                <FloatingCard key={subject.name} className="landing-mini-course" delay={index * 90} style={{ "--course-token": `var(--${subject.token})` } as React.CSSProperties}>
                  <div className="landing-mini-head"><span className="landing-course-icon" aria-hidden="true">{subject.name.slice(0, 1)}</span><Badge>{subject.progress}%</Badge></div>
                  <strong>{subject.name}</strong><span>{subject.lessons}</span>
                </FloatingCard>
              ))}
            </div>
            <FloatingCard className="landing-activity-preview" delay={360}>
              <span className="landing-kicker">THIS WEEK</span><strong>3.5h</strong><Badge className="landing-result-badge">Great result!</Badge>
              <div className="landing-mini-chart" aria-label="Stacked subject study time chart">
                {[42, 68, 54, 82, 61, 76].map((height, index) => <span key={index} style={{ height: `${height}%`, "--bar-color": `var(--${heroSubjects[index % heroSubjects.length].token})` } as React.CSSProperties} />)}
              </div>
            </FloatingCard>
          </div>
        </section>

        <Bunting />
        <section className="landing-section site-container" id="curriculum" aria-labelledby="subjects-title">
          <div className="landing-filter-wrap">
            <div className="landing-filters" role="group" aria-label="Study programme">
              {filters.map((filter, index) => (
                <button key={filter} type="button" className={`landing-filter ${activeFilter === filter ? "is-active" : ""}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                  <span aria-hidden="true">{index === 0 ? "A" : filter.replace("NEB ", "N")}</span>{filter}
                </button>
              ))}
            </div>
          </div>
          <div className="landing-section-heading">
            <div><p className="site-eyebrow">YOUR CURRICULUM</p><h2 id="subjects-title">Everything you need, subject by subject.</h2></div>
            <p>Choose a pathway to see the courses organised around what you are preparing for.</p>
          </div>
          <div className="landing-subject-grid">
            {visibleSubjects.map((subject) => (
              <Link href="/curriculum" key={subject.name} className="landing-course-card" style={{ "--course-token": `var(--${subject.token})` } as React.CSSProperties}>
                <div className="landing-course-top"><span className="landing-course-icon" aria-hidden="true">{subject.name.charAt(0)}</span><span className="landing-course-category">{subject.category}</span><Badge>{subject.progress}%</Badge></div>
                <h3>{subject.name}</h3>
                <div className="landing-course-meta"><span>{subject.lessons}</span><Progress value={subject.progress} label={`${subject.name} progress`} /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="landing-section site-container" aria-labelledby="how-title">
          <div className="landing-section-heading"><div><p className="site-eyebrow">A SIMPLE STUDY RHYTHM</p><h2 id="how-title">Learn it. Remember it. Apply it.</h2></div></div>
          <div className="landing-how-grid">
            <Card className="landing-how-card landing-how-learn"><span className="landing-step-number">01</span><h3>Learn</h3><p>Structured lessons and AI notes turn complex chapters into clear next steps.</p><div className="landing-ui-snippet lesson-snippet"><span /><strong>Newton&apos;s laws</strong><i /><i /><i /></div></Card>
            <Card className="landing-how-card landing-how-revise"><span className="landing-step-number">02</span><h3>Revise</h3><p>Flashcards and audio lectures make useful revision possible anywhere.</p><div className="landing-ui-snippet flash-snippet"><span>What is force?</span><strong>Tap to reveal</strong></div></Card>
            <Card className="landing-how-card landing-how-practice"><span className="landing-step-number">03</span><h3>Practice</h3><p>Targeted questions and exam prep build confidence before the real test.</p><div className="landing-ui-snippet quiz-snippet"><span>QUESTION 8</span><strong>Choose the correct answer</strong><i /><i /></div></Card>
          </div>
        </section>

        <section className="landing-section site-container landing-entrance" aria-labelledby="entrance-title">
          <div className="landing-entrance-copy"><p className="site-eyebrow">ENTRANCE PREPARATION</p><h2 id="entrance-title">Make the entrance exam feel familiar.</h2><ul><li>CEE and IOE focused practice tracks</li><li>Timed question sets and clear explanations</li><li>Revision organised around weak areas</li></ul><Link href="/practice" className="site-btn landing-light-button">Explore entrance prep</Link></div>
          <div className="landing-exam-board" aria-label="Entrance exam preparation preview"><div><span>CEE</span><strong>8 chapters ready</strong><Progress value={68} label="CEE preparation progress" /></div><div><span>IOE</span><strong>Physics focus</strong><Progress value={44} label="IOE preparation progress" /></div></div>
        </section>

        <section className="landing-section site-container landing-progress" aria-labelledby="progress-title">
          <div className="landing-progress-copy"><p className="site-eyebrow">PROGRESS THAT STAYS VISIBLE</p><h2 id="progress-title">See your progress grow.</h2><p>One focused session at a time: continue lessons, keep your streak, and return to yesterday&apos;s revision.</p><Link href="/progress" className="site-text-link">View progress</Link></div>
          <div className="landing-progress-panel"><div className="landing-streak"><span aria-hidden="true">✦</span><div><strong>7 day streak</strong><small>Keep going</small></div></div><div className="landing-week"><span className="landing-kicker">WEEKLY ACTIVITY</span><strong>5h 40m</strong><div className="landing-mini-chart" aria-hidden="true">{[35, 58, 46, 82, 68, 54, 74].map((height, index) => <span key={index} style={{ height: `${height}%`, "--bar-color": `var(--${heroSubjects[index % 4].token})` } as React.CSSProperties} />)}</div></div></div>
        </section>

        <section className="landing-proof site-container" aria-labelledby="proof-title">
          <div><p className="site-eyebrow">STUDENT VOICES</p><h2 id="proof-title">Built for real study days.</h2></div><div className="landing-proof-placeholder"><span>Student quote</span><p>Placeholder — student stories can be added after verified testimonials are collected.</p></div><p className="landing-nepal-note"><strong>Built in Nepal by Nepluro</strong><br />Thoughtful tools for Nepal&apos;s next generation of learners.</p>
        </section>

        <section className="landing-final site-container" aria-labelledby="final-title"><Mandala watermark /><p className="site-eyebrow">YOUR NEXT LESSON IS WAITING</p><h2 id="final-title">Start learning today.</h2><Link href="/signup" className="site-btn">Create your free account</Link></section>
      </main>
      <footer className="site-footer"><PatternStrip /><Skyline /><div className="site-footer-top"><div className="site-footer-brand"><span className="site-mark" aria-hidden="true">अ</span><div><strong>akshar.</strong><p>A learning platform by Nepluro Private Limited.</p></div></div><nav className="site-footer-links" aria-label="Footer"><Link href="/learn">Learn</Link><Link href="/curriculum">Curriculum</Link><Link href="/practice">Entrance prep</Link><Link href="/privacy">Privacy</Link></nav></div><div className="site-footer-bottom"><span>© 2026 Nepluro Private Limited. Akshar. All rights reserved.</span></div></footer>
    </div>
  );
}
