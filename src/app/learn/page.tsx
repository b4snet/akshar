import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import LearnBrowser from "@/components/LearnBrowser";
import LessonLibrary from "@/components/LessonLibrary";

type LearnPageProps = {
  searchParams: Promise<{ grade?: string }>;
};

async function LearnContent({ searchParams }: LearnPageProps) {
  const { grade } = await searchParams;
  const initialGrade = grade === "12" ? "12" : "11";

  return (
    <>
      <section className="route-intro" aria-labelledby="learn-title">
        <div className="section-kicker">NEB LEARNING</div>
        <h1 id="learn-title">Find your next subject.</h1>
        <p>Browse sample subject descriptions for Grade 11 and Grade 12. Content is illustrative and has not been verified against the official curriculum.</p>
      </section>
      <LearnBrowser initialGrade={initialGrade} />
      <LessonLibrary />
    </>
  );
}

export default function LearnPage(props: LearnPageProps) {
  return (
    <AppShell active="learn">
      <Suspense fallback={<div className="route-loading" role="status">Loading subjects…</div>}>
        <LearnContent searchParams={props.searchParams} />
      </Suspense>
      <footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Sample curriculum content · verify with official sources</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}