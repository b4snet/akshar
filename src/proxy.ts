import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

// Routes that require a verified Supabase session.
const PROTECTED_PREFIXES = ["/dashboard", "/learn", "/practice", "/progress", "/settings", "/tutor", "/curriculum"];

// Auth pages: authenticated users are sent onward after the session is verified.
const AUTH_PAGE_PATHS = new Set(["/auth/login", "/signup"]);

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

// Only allow same-origin, absolute-path redirect targets.
function safeNextTarget(pathname: string, search: string): string {
  const next = `${pathname}${search}`;
  return next.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : "/dashboard";
}

function safeRequestedNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/dashboard";
}

// Copy any cookies refreshed during session verification onto a redirect response.
function carryRefreshedCookies(target: NextResponse, source: NextResponse): NextResponse {
  for (const cookie of source.cookies.getAll()) target.cookies.set(cookie);
  return target;
}

export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) return NextResponse.next({ request });

  const { pathname, search } = request.nextUrl;
  const needsAuth = isProtectedPath(pathname);
  const isAuthPage = AUTH_PAGE_PATHS.has(pathname);
  if (!needsAuth && !isAuthPage) return NextResponse.next({ request });

  let response = NextResponse.next({ request });
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, cacheHeaders) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(cacheHeaders).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });

  // getClaims() cryptographically verifies the session JWT (refreshing it via
  // cookies when expired). Only verified claims count as authentication.
  let authenticated = false;
  try {
    const { data, error } = await supabase.auth.getClaims();
    authenticated = !error && !!data?.claims;
  } catch {
    authenticated = false;
  }

  if (needsAuth && !authenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", safeNextTarget(pathname, search));
    return carryRefreshedCookies(NextResponse.redirect(loginUrl), response);
  }

  if (isAuthPage && authenticated) {
    const next = safeRequestedNext(request.nextUrl.searchParams.get("next"));
    return carryRefreshedCookies(NextResponse.redirect(new URL(next, request.url)), response);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
