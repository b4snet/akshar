import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import LessonReader from "@/components/LessonReader";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

async function LessonContent({ params }: LessonPageProps) {
  const { lessonId } = await params;
  return <LessonReader lessonId={lessonId} />;
}

export default function LessonPage(props: LessonPageProps) {
  return <AppShell active="learn"><div className="lesson-detail-page"><Suspense fallback={<div className="lesson-reader-state" role="status">Loading lesson…</div>}><LessonContent params={props.params} /></Suspense><footer className="page-footer"><a className="footer-brand" href="/dashboard"><span className="brand-symbol" aria-hidden="true">अ</span> akshar<span className="wordmark-period">.</span></a><span>Sample lesson content · verify official curriculum sources</span><a href="#top">Back to top ↑</a></footer></div></AppShell>;
}