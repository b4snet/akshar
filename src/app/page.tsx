"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function HomePage() {
  const router = useRouter();
  const config = getSupabaseConfig();

  useEffect(() => {
    if (!config) return;
    const supabase = createSupabaseBrowserClient(config);
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // User is authenticated, redirect to dashboard or intended page
        router.replace("/dashboard");
      }
    });
    // No else: unauthenticated users stay on landing page
  }, [config, router]);

  return <LandingPage />;
}






