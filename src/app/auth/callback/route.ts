import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next") ?? "/dashboard";
  const supabase = await createSupabaseServerClient();

  if (!supabase) return NextResponse.redirect(new URL("/login", request.url));
  if (!code) return NextResponse.redirect(new URL("/login?reason=confirmation", request.url));

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?reason=confirmation", request.url));

  const safe = next.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : "/dashboard";
  return NextResponse.redirect(new URL(safe, request.url));
}