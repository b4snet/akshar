import { Suspense } from "react";
import { requireUser } from "@/lib/supabase/server";
import AppShell from "@/components/AppShell";
import LearnBrowser from "@/components/LearnBrowser";

// Session-gated: renders per request after the proxy + requireUser() verify it.
export const instant = false;

type LearnPageProps = {
  searchParams: Promise<{ grade?: string; level?: string }>;
};

async function LearnContent({ searchParams }: LearnPageProps) {
  const { grade, level } = await searchParams;
  const initialGrade = grade === "12" ? "12" : "11";
  const initialLevel = typeof level === "string" && level.length <= 120 ? level : undefined;

  return (
    <>
      <section className="route-intro" aria-labelledby="learn-title">
        <div className="section-kicker">SUBJECTS &amp; ENTRANCE</div>
        <h1 id="learn-title">Find your next subject.</h1>
        <p>Browse the subjects that match your saved grade, stream, and curriculum selection. Compulsory subjects follow the CDC Grade 11–12 curriculum; entrance tracks follow the official IOE and MEC syllabi.</p>
      </section>
      <LearnBrowser initialGrade={initialGrade} initialLevel={initialLevel} />
    </>
  );
}

export default async function LearnPage(props: LearnPageProps) {
  await requireUser("/learn");
  return (
    <AppShell active="learn">
      <Suspense fallback={<div className="route-loading" role="status">Loading subjects…</div>}>
        <LearnContent searchParams={props.searchParams} />
      </Suspense>
      <footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Sample curriculum content · verify with official sources</span><a href="#top">Back to top ↑</a></footer>
    </AppShell>
  );
}