// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full py-4 bg-background/80 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}> 
          <span className="text-2xl font-bold text-primary" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif" }}>
            Akshar
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/learn" className="text-foreground hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/auth/login" className="text-foreground hover:text-primary transition-colors">
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
}
