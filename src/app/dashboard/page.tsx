import AppShell from '@/components/AppShell';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BookOpenIcon } from '@/components/Icon';
import { requireUser } from '@/lib/supabase/server';

export const instant = false;

const subjects = [
  { name: 'Physics', short: 'PH', count: '16 lessons', progress: 42, tone: 'physics' },
  { name: 'Chemistry', short: 'CH', count: '14 lessons', progress: 28, tone: 'chemistry' },
  { name: 'Mathematics', short: 'MA', count: '18 lessons', progress: 35, tone: 'mathematics' },
  { name: 'Biology', short: 'BI', count: '15 lessons', progress: 20, tone: 'biology' },
  { name: 'English', short: 'EN', count: '12 lessons', progress: 50, tone: 'english' },
  { name: 'Nepali', short: 'ने', count: '12 lessons', progress: 18, tone: 'nepali' },
  { name: 'CEE', short: 'CEE', count: 'Entrance track', progress: 0, tone: 'cee' },
  { name: 'IOE', short: 'IOE', count: 'Entrance track', progress: 0, tone: 'ioe' },
];

const lessons = [
  { id: '10000000-0000-4000-8000-000000000001', title: 'Vectors and scalars', subject: 'Physics', progress: 42, tone: 'physics', count: '8 chapters' },
  { id: '10000000-0000-4000-8000-000000000002', title: 'Periodic classification', subject: 'Chemistry', progress: 28, tone: 'chemistry', count: '6 chapters' },
  { id: '10000000-0000-4000-8000-000000000003', title: 'Limits and continuity', subject: 'Mathematics', progress: 35, tone: 'mathematics', count: '7 chapters' },
];

export default async function DashboardPage() {
  await requireUser('/dashboard');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'आजको शुभ प्रभात' : hour < 17 ? 'आजको शुभ दिउँसो' : 'आजको शुभ साँझ';

  const rightPanel = (
    <>
      <div className="insight-actions"><button className="icon-button" type="button" aria-label="Notifications">◌</button><span className="avatar-mini" aria-hidden="true">अ</span></div>
      <div className="profile-card"><div className="profile-avatar" aria-hidden="true">अ</div><strong>Akshar learner</strong><span>NEB • Grade 11</span></div>
      <div className="streak-pill"><span>🔥</span><strong>7 day streak</strong><span>Keep going</span></div>
      <section className="activity-card" aria-labelledby="activity-title">
        <div className="activity-heading"><div><span>Study time</span><strong>3.5h</strong></div><span className="great-result">Great result!</span></div>
        <h2 id="activity-title">This week</h2>
        <div className="subject-bars" aria-label="Sample subject study-time chart">
          <span className="bar physics" style={{ height: '58%' }} /><span className="bar chemistry" style={{ height: '76%' }} /><span className="bar mathematics selected" style={{ height: '92%' }} /><span className="bar biology" style={{ height: '48%' }} /><span className="bar english" style={{ height: '68%' }} />
        </div>
      </section>
      <section className="continue-panel" aria-labelledby="continue-title"><h2 id="continue-title">Continue learning</h2>{lessons.map((lesson) => (
        <Link key={lesson.id} href={`/learn/${lesson.id}`} className="continue-card"><span className={`continue-icon ${lesson.tone}`}>{lesson.subject.slice(0, 1)}</span><span><strong>{lesson.title}</strong><small>{lesson.progress}% complete</small></span><span aria-hidden="true">→</span></Link>
      ))}</section>
    </>
  );

  return (
    <AppShell active="dashboard" rightPanel={rightPanel}>
      <header className="dashboard-hero"><p>{greeting} <span>• Student workspace</span></p><h1 id="welcome-title">आज के सिक्ने?<br /><em>What will you learn today?</em></h1></header>
      <nav className="subject-filters" aria-label="Programme filters">
        {['All', 'NEB 11', 'NEB 12', 'CEE', 'IOE'].map((label, index) => <button key={label} className={`filter-pill${index === 0 ? ' active' : ''}`} type="button"><span>{index === 0 ? '✦' : index === 1 || index === 2 ? String(index) : label}</span>{label}</button>)}
      </nav>
      <section className="subject-section" aria-labelledby="subjects-heading">
        <div className="section-heading-row"><h2 id="subjects-heading">Explore subjects</h2><Link href="/learn">View all</Link></div>
        <div className="subject-card-grid">{subjects.map((subject) => (
          <Link key={subject.name} href={`/learn#${subject.name.toLowerCase()}`} className={`subject-card ${subject.tone}`}>
            <span className="subject-card-top"><span className="subject-icon-chip">{subject.short}</span><span className="progress-badge">{subject.progress}%</span></span>
            <div className="subject-card-title"><span>{subject.name}</span><strong>{subject.name === 'CEE' || subject.name === 'IOE' ? `${subject.name} prep` : `${subject.name} fundamentals`}</strong></div>
            <span className="subject-card-meta">{subject.count}</span>
          </Link>
        ))}</div>
      </section>
      <section className="lesson-section" aria-labelledby="lessons-heading">
        <div className="section-heading-row"><h2 id="lessons-heading">Continue learning</h2><Link href="/learn">View library</Link></div>
        <div className="lesson-card-grid">{lessons.map((lesson) => (
          <Link key={lesson.id} href={`/learn/${lesson.id}`} className="lesson-card"><span className={`lesson-card-icon ${lesson.tone}`}><BookOpenIcon /></span><span><small>{lesson.subject}</small><strong>{lesson.title}</strong><span>{lesson.count}</span></span><span className="lesson-progress-ring" style={{ '--progress': `${lesson.progress}%` } as CSSProperties}>{lesson.progress}%</span></Link>
        ))}</div>
      </section>
      <details className="dashboard-follow-ups"><summary>Data placeholders</summary><p>Study time, streak history, profile photo, programme counts, and study-buddy avatars require existing Supabase fields and are not asserted as saved data.</p></details>
    </AppShell>
  );
}