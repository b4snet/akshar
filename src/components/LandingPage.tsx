"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const sourceImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f8rh4Cjv8FbnO76CQhYFT8L0k2DPyv.png";
const filters = ["All", "NEB 11", "NEB 12", "CEE", "IOE"] as const;
type Filter = (typeof filters)[number];
const subjects = [
  ["Physics", "42%", "18 lessons", "physics", "Science"], ["Chemistry", "36%", "16 lessons", "chemistry", "Science"],
  ["Mathematics", "58%", "24 lessons", "mathematics", "Mathematics"], ["Biology", "31%", "21 lessons", "biology", "Science"],
  ["English", "64%", "14 lessons", "english", "Language"], ["Computer Science", "48%", "20 lessons", "computer", "Technology"],
] as const;

function Logo() { return <Link href="/" className="ak-logo"><span>अ</span><b>akshar.</b></Link>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function LandingPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => document.documentElement.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="ak-page">
    <header className="ak-nav"><Logo /><nav className={menuOpen ? "ak-nav-links is-open" : "ak-nav-links"}><a href="#learn" onClick={() => setMenuOpen(false)}>Learn</a><a href="#curriculum" onClick={() => setMenuOpen(false)}>Curriculum</a><a href="#entrance" onClick={() => setMenuOpen(false)}>Entrance prep</a><a href="#about" onClick={() => setMenuOpen(false)}>About Akshar</a><Link href="/auth/login" className="nav-login">Log in</Link><Link href="/signup" className="ak-pill">Sign up</Link></nav><button className="ak-menu" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></header>
    <main>
      <section className="ak-hero" id="learn"><div className="ak-hero-image"><Image src={sourceImage} alt="Snow-covered Himalayan peak at sunset above a sea of clouds" fill priority sizes="100vw" /></div><div className="ak-hero-scrim" /><div className="ak-cloud cloud-one" /><div className="ak-cloud cloud-two" /><div className="ak-hero-copy"><p className="ak-eyebrow">LEARN WITHOUT LIMITS</p><h1>Beyond memorising,<br /><em>you build your future.</em></h1><p>Structured lessons, revision resources, practice questions, and exam preparation for students ready to learn with purpose.</p><div className="ak-actions"><Link href="/signup" className="ak-pill">Start Learning <Arrow /></Link><Link href="#curriculum" className="ak-outline">Explore Curriculum</Link></div></div><div className="ak-hero-cards">{subjects.slice(0,4).map(([name, progress, lessons, token]) => <div className={`ak-float-card ${token}`} key={name}><span className="ak-icon">{name[0]}</span><small>{progress}</small><strong>{name}</strong><label>{lessons}</label></div>)}</div><div className="ak-hero-fade" /></section>
      <section className="ak-section" id="curriculum"><div className="ak-section-top"><div><p className="ak-eyebrow">YOUR CURRICULUM</p><h2>Everything you need,<br />subject by subject.</h2></div><p>Choose a pathway and make every study session count.</p></div><div className="ak-filters" role="group" aria-label="Study pathway">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="ak-subject-grid">{subjects.map(([name, progress, lessons, token, category]) => <Link href="/learn" className={`ak-subject ${token}`} key={name}><div className="ak-subject-top"><span className="ak-icon">{name[0]}</span><small>{category}</small><b>{progress}</b></div><h3>{name}</h3><p>{lessons}</p><div className="ak-progress"><i style={{ width: progress }} /></div></Link>)}</div></section>
      <section className="ak-section ak-how" id="how"><div className="ak-section-top"><div><p className="ak-eyebrow">A SIMPLE STUDY RHYTHM</p><h2>Learn it. Remember it.<br />Apply it.</h2></div><p>Three small steps, designed for the way you actually learn.</p></div><div className="ak-steps">{[["01", "Learn", "Structured lessons and AI notes turn complex chapters into clear next steps."], ["02", "Revise", "Flashcards and audio lectures make useful revision possible anywhere."], ["03", "Practice", "Targeted questions and exam prep build confidence before the real test."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><div className="ak-device"><b>{title === "Learn" ? "Newton's laws" : title === "Revise" ? "What is force?" : "QUESTION 08"}</b><i /><i /><i /></div></article>)}</div></section>
      <section className="ak-entrance" id="entrance"><div><p className="ak-eyebrow">ENTRANCE PREPARATION</p><h2>Make the entrance exam feel familiar.</h2><ul><li>Syllabus-aligned lessons</li><li>Timed mock exams</li><li>Practice questions and clear explanations</li><li>Progress tracking that stays visible</li></ul><Link href="/practice" className="ak-light-pill">Start preparing <Arrow /></Link></div><div className="ak-exam-card"><div><span>CEE</span><strong>Mock exam 04</strong><small>48 questions · 60 minutes</small></div><div className="ak-card-line" /><div className="ak-exam-answer"><b>72%</b><span>Ready for review</span></div></div></section>
      <section className="ak-section ak-progress-section"><div><p className="ak-eyebrow">PROGRESS THAT STAYS VISIBLE</p><h2>See your progress grow.</h2><p>{"One focused session at a time. Keep your streak and return to yesterday's revision."}</p><Link href="/progress" className="ak-text-link">View progress <Arrow /></Link></div><div className="ak-activity"><div><small>THIS WEEK</small><strong>3.5h</strong><span>Great result!</span></div><div className="ak-bars">{[38, 62, 48, 82, 57, 76, 66].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="ak-streak"><b>14</b><span>day streak</span></div></div></section>
      <section className="ak-about" id="about"><div className="ak-skyline" aria-hidden="true">⌁　⌁　⌁　⌁　⌁　⌁</div><p className="ak-eyebrow">BUILT IN NEPAL</p><h2>Learning with purpose,<br /><em>made for here.</em></h2><p>Akshar is being built in Nepal for students who want a clearer, more confident way to move forward.</p><div className="ak-quote"><span>Student quote</span><p>Placeholder — student stories will be added after verified testimonials are collected.</p></div><small>Built in Nepal by Nepluro Private Limited</small></section>
      <section className="ak-final"><Image src={sourceImage} alt="Softly masked Himalayan mountain background" fill sizes="100vw" /><div className="ak-final-overlay" /><div><p className="ak-eyebrow">YOUR NEXT LESSON IS WAITING</p><h2>Start learning today.</h2><div className="ak-actions"><Link href="/signup" className="ak-pill">Sign up <Arrow /></Link><Link href="/auth/login" className="ak-outline">Log in</Link></div></div></section>
    </main><footer className="ak-footer"><Logo /><div><a href="#learn">Learn</a><a href="#curriculum">Curriculum</a><a href="#entrance">Entrance prep</a><a href="#about">About Akshar</a></div><p>A learning platform by Nepluro Private Limited.</p></footer>
  </div>;
}
