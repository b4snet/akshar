import { Suspense } from "react";
import { redirect } from "next/navigation";

type LoginRedirectProps = {
  searchParams: Promise<{ reason?: string; next?: string }>;
};

async function LoginRedirect({ searchParams }: LoginRedirectProps): Promise<never> {
  const { reason, next } = await searchParams;
  const params = new URLSearchParams();
  if (reason) params.set("reason", reason);
  if (next) params.set("next", next);
  const query = params.toString();
  redirect(`/auth/login${query ? `?${query}` : ""}`);
}

export default function LoginPage({ searchParams }: LoginRedirectProps) {
  return <Suspense fallback={null}><LoginRedirect searchParams={searchParams} /></Suspense>;
}
