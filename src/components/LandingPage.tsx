// src/components/LandingPage.tsx
"use client";

import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";


export default function LandingPage() {


  // If a session is detected, let the parent page handle redirect.

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
  <Header />
      <section className="max-w-2xl w-full space-y-8">
        <div className="relative h-64 w-full">
          <Image
            src="/landing_hero_placeholder.jpg"
            alt="Akshar learning platform hero"
            fill sizes="100vw"
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold text-center" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif" }}>
          Akshar – AI‑Powered Learning for Nepali Students
        </h1>
        <p className="text-center text-lg">
          Welcome to the official Nepluro Private Limited platform, built by Dipson Basnet. Sign in to continue your NEB journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/learn"
            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 font-semibold text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Start Learning
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Log in
          </Link>
        </div>
        <footer className="mt-8 text-center text-xs text-gray-500">
          © 2026 Nepluro Private Limited • Owner: Dipson Basnet
        </footer>
      </section>
    </main>
  );
}
