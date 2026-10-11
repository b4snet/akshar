"use client";

import { useState } from "react";
import Link from "next/link";

const subjects = [
  { name: "Physics", group: "Science", mark: "P", tint: "violet", grade11: "Motion, forces, energy and matter", grade12: "Fields, waves, current and modern physics" },
  { name: "Chemistry", group: "Science", mark: "C", tint: "green", grade11: "Atomic structure, bonding and reactions", grade12: "Solutions, kinetics and organic chemistry" },
  { name: "Mathematics", group: "Science", mark: "M", tint: "amber", grade11: "Algebra, geometry and introductory calculus", grade12: "Advanced functions, calculus and statistics" },
  { name: "Biology", group: "Science", mark: "B", tint: "rose", grade11: "Cell biology, diversity and life processes", grade12: "Genetics, physiology and ecology" },
  { name: "English", group: "Language", mark: "E", tint: "blue", grade11: "Reading, writing and language practice", grade12: "Literature, communication and composition" },
];

export default function LearnBrowser({ initialGrade }: { initialGrade: "11" | "12" }) {
  const [grade, setGrade] = useState<"11" | "12">(initialGrade);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All subjects");
  const visibleSubjects = subjects.filter((subject) => {
    const matchesSearch = `${subject.name} ${subject.group} ${subject.grade11} ${subject.grade12}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesSearch && (filter === "All subjects" || subject.group === filter);
  });

  return (
    <section className="learn-browser" id="subjects" aria-labelledby="subjects-heading">
      <div className="learn-controls">
        <div className="grade-control" role="group" aria-label="Select NEB grade">
          {(["11", "12"] as const).map((value) => <button type="button" key={value} aria-pressed={grade === value} className={grade === value ? "grade-button active" : "grade-button"} onClick={() => setGrade(value)}>Grade {value}</button>)}
        </div>
        <label className="subject-search"><span aria-hidden="true">⌕</span><span className="visually-hidden">Search subjects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subjects or topics" /></label>
        <label className="subject-filter"><span className="visually-hidden">Filter subjects</span><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All subjects</option><option>Science</option><option>Language</option></select></label>
      </div>
      <div className="learn-results-heading"><div><div className="section-kicker">SAMPLE SUBJECTS · GRADE {grade}</div><h2 id="subjects-heading">Choose a subject</h2></div><span className="sample-tag">SAMPLE CONTENT</span></div>
      {visibleSubjects.length > 0 ? <div className="subject-grid">
        {visibleSubjects.map((subject) => <article className="subject-card" key={subject.name}>
          <div className={`lesson-mark ${subject.tint}`} aria-hidden="true">{subject.mark}</div>
          <div className="subject-card-copy"><span className="lesson-subject">{subject.group} · Grade {grade}</span><h3>{subject.name}</h3><p>{grade === "11" ? subject.grade11 : subject.grade12}</p></div>
          <div className="subject-card-actions"><Link href="/practice#neb">Practice questions <span aria-hidden="true">→</span></Link><Link href="/tutor">Ask the demo tutor <span aria-hidden="true">→</span></Link></div>
        </article>)}
      </div> : <div className="empty-state"><strong>No matching subjects</strong><p>Try a different search or filter.</p><button type="button" className="button button-secondary" onClick={() => { setQuery(""); setFilter("All subjects"); }}>Clear filters</button></div>}
      <p className="curriculum-note"><span aria-hidden="true">i</span> These descriptions are sample content, not a verified statement of NEB syllabus coverage. Check current official curriculum materials for authoritative details.</p>
    </section>
  );
}