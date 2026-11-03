'use client';
import Link from "next/link";
import type { ReactNode } from "react";
import SessionControls from '@/components/SessionControls';
import { getSupabaseConfig } from "@/lib/supabase/config";
import { DashboardIcon, LearnIcon, PracticeIcon, ExamIcon, TutorIcon, ProgressIcon, SettingsIcon } from "@/components/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchIcon } from "@/components/Icon";

const navigation = [
  { label: "Dashboard", Icon: DashboardIcon, href: "/dashboard", key: "dashboard" },
  { label: "My learning", Icon: LearnIcon, href: "/learn", key: "learn" },
  { label: "Practice", Icon: PracticeIcon, href: "/practice", key: "practice" },
  { label: "Mock exams", Icon: ExamIcon, href: "/exam", key: "exam" },
  { label: "AI tutor", Icon: TutorIcon, href: "/tutor", key: "tutor" },
  { label: "Progress", Icon: ProgressIcon, href: "/progress", key: "progress" },
  { label: "Settings", Icon: SettingsIcon, href: "/settings", key: "settings" },
];

type AppShellProps = {
  active: string;
  children: ReactNode;
  rightPanel?: ReactNode;
};

export default function AppShell({ active, children, rightPanel }: AppShellProps) {
  const supabaseConfig = getSupabaseConfig();

  return (
    <div className="app-shell" id="top">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <aside className="sidebar sidebar-reference" aria-label="Main navigation">
        <Link className="rail-logo" href="/dashboard" aria-label="Akshar dashboard">अ</Link>
        <nav className="rail-nav" aria-label="Workspace">
          {navigation.slice(0, 6).map((item) => (
            <Link key={item.key} href={item.href} className={`rail-link${active === item.key ? " active" : ""}`} aria-current={active === item.key ? "page" : undefined} aria-label={item.label} title={item.label}>
              <item.Icon />
            </Link>
          ))}
        </nav>
        <div className="rail-bottom">
          <Link className="rail-link" href="/settings" aria-label="Settings" title="Settings"><SettingsIcon /></Link>
          <div className="rail-avatar" aria-label="Profile">अ</div>
        </div>
      </aside>
      <main className="main-content" id="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-separator">/</span><strong>{navigation.find((item) => item.key === active)?.label ?? "Account"}</strong></div>
          <div className="topbar-actions">
            <label className="app-search" aria-label="Search Akshar">
              <SearchIcon />
              <input type="search" placeholder="Search lessons" />
            </label>
            <ThemeToggle />
            <SessionControls config={supabaseConfig} />
          </div>
        </header>
        <div className={`page-content${rightPanel ? " with-right-panel" : ""}`}>
          <div className="dashboard-main-column">{children}</div>
          {rightPanel && <aside className="dashboard-right-panel" aria-label="Learning summary">{rightPanel}</aside>}
        </div>
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation.slice(0, 5).map((item) => (
          <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""} aria-current={active === item.key ? "page" : undefined}>
            <item.Icon />
            <span>{item.key === "dashboard" ? "Home" : item.key === "exam" ? "Exams" : item.label.replace("My learning", "Learn")}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
