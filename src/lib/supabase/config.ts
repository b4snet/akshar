

export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey || !publishableKey.startsWith("sb_publishable_") || /your-project-ref|replace_with_your_project_key/i.test(`${url} ${publishableKey}`)) return null;

  try {
    const parsedUrl = new URL(url);
    const isLocalhost = parsedUrl.hostname === "localhost" || parsedUrl.hostname === "127.0.0.1";
    const isSupabaseApiHost = parsedUrl.hostname.endsWith(".supabase.co");
    if ((!isLocalhost && (parsedUrl.protocol !== "https:" || !isSupabaseApiHost)) || parsedUrl.pathname.startsWith("/dashboard/")) return null;

    return { url: parsedUrl.origin, publishableKey };
  } catch {
    return null;
  }
}