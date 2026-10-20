'use client';
import Link from "next/link";
import type { ReactNode } from "react";
import SessionControls from '@/components/SessionControls';
import { getSupabaseConfig } from "@/lib/supabase/config";
import { DashboardIcon, LearnIcon, PracticeIcon, TutorIcon, ProgressIcon, SettingsIcon } from "@/components/Icon";

const navigation = [
  { label: "Dashboard", Icon: DashboardIcon, href: "/dashboard", key: "dashboard" },
  { label: "My learning", Icon: LearnIcon, href: "/learn", key: "learn" },
  { label: "Practice", Icon: PracticeIcon, href: "/practice", key: "practice" },
  { label: "AI tutor", Icon: TutorIcon, href: "/tutor", key: "tutor" },
  { label: "Progress", Icon: ProgressIcon, href: "/progress", key: "progress" },
  { label: "Settings", Icon: SettingsIcon, href: "/settings", key: "settings" },
];

type AppShellProps = {
  active: string;
  children: ReactNode;
};

export default function AppShell({ active, children }: AppShellProps) {
  const supabaseConfig = getSupabaseConfig();

  return (
    <div className="app-shell" id="top">
      <aside className="sidebar" aria-label="Main navigation">
        <Link className="wordmark" href="/dashboard" aria-label="Akshar dashboard">
          <span className="brand-symbol" aria-hidden="true">अ</span>
          <span>akshar<span className="wordmark-period">.</span></span>
        </Link>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="nav-list">
          {navigation.map((item) => (
            <Link key={item.key} href={item.href} className={`nav-link${active === item.key ? " nav-link-active" : ""}`} aria-current={active === item.key ? "page" : undefined}>
              <span className="nav-icon" aria-hidden="true"><item.Icon /></span>
              <span>{item.label}</span>
              {item.key === "tutor" && <span className="nav-new">DEMO</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link className="week-card" href="/progress">
            <div className="week-card-top"><span>YOUR PROGRESS</span></div>
            <div className="week-count">Review your saved activity and quiz attempts.</div>
            <div className="sample-note">Open the progress overview <span aria-hidden="true">→</span></div>
          </Link>
          <div className="profile-row"><div className="avatar" aria-hidden="true">अ</div><div className="profile-copy"><strong>Akshar learning</strong><span>Learning workspace</span></div></div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-separator">/</span><strong>{navigation.find((item) => item.key === active)?.label ?? "Account"}</strong></div>
          <SessionControls config={supabaseConfig} />
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}