import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const supabase = await createSupabaseServerClient();

  if (!supabase) return NextResponse.redirect(new URL("/login", request.url));
  if (!code) return NextResponse.redirect(new URL("/login?reason=confirmation", request.url));

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?reason=confirmation", request.url));

  return NextResponse.redirect(new URL("/dashboard", request.url));
}