import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import ExamStart from "@/components/ExamStart";

interface ExamStartPageProps {
  params: Promise<{ examId: string }>;
}

export const instant = false;

async function ExamStartContent({ params }: ExamStartPageProps) {
  const { examId } = await params;
  return (
    <AppShell active="exam">
      <Suspense fallback={<div className="route-loading" role="status">Loading exam…</div>}>
        <ExamStart examId={examId} />
      </Suspense>
    </AppShell>
  );
}

export default async function ExamStartPage({ params }: ExamStartPageProps) {
  return <ExamStartContent params={params} />;
}