import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import ExamRunner from "@/components/ExamRunner";

interface ExamAttemptPageProps {
  params: Promise<{ attemptId: string }>;
}

export const instant = false;

async function ExamAttemptContent({ params }: ExamAttemptPageProps) {
  const { attemptId } = await params;
  return (
    <AppShell active="exam">
      <Suspense fallback={<div className="route-loading" role="status">Loading exam…</div>}>
        <ExamRunner attemptId={attemptId} />
      </Suspense>
    </AppShell>
  );
}

export default async function ExamAttemptPage({ params }: ExamAttemptPageProps) {
  return <ExamAttemptContent params={params} />;
}