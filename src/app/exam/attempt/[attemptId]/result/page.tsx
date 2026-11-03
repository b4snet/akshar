import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import ExamResult from "@/components/ExamResult";

interface ExamResultPageProps {
  params: Promise<{ attemptId: string }>;
}

export const instant = false;

async function ExamResultContent({ params }: ExamResultPageProps) {
  const { attemptId } = await params;
  return (
    <AppShell active="exam">
      <Suspense fallback={<div className="route-loading" role="status">Loading results…</div>}>
        <ExamResult attemptId={attemptId} />
      </Suspense>
    </AppShell>
  );
}

export default async function ExamResultPage({ params }: ExamResultPageProps) {
  return <ExamResultContent params={params} />;
}