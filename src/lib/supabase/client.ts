import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseConfig } from "./config";

export function createSupabaseBrowserClient(config: SupabaseConfig | null = null) {
  if (!config) return null;

  return createBrowserClient(config.url, config.publishableKey);
}