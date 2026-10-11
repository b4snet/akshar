'use client';
import Link from "next/link";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
  const SessionControls = dynamic(() => import('@/components/SessionControls'), {
    ssr: false,
    loading: () => null,
  });
import { getSupabaseConfig } from "@/lib/supabase/config";

const navigation = [
  { label: "Dashboard", icon: "◫", href: "/dashboard", key: "dashboard" },
  { label: "My learning", icon: "▤", href: "/learn", key: "learn" },
  { label: "Practice", icon: "⌁", href: "/practice", key: "practice" },
  { label: "AI tutor", icon: "✳", href: "/tutor", key: "tutor" },
  { label: "Progress", icon: "↗", href: "/progress", key: "progress" },
  { label: "Settings", icon: "⚙", href: "/settings", key: "settings" },
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
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.key === "tutor" && <span className="nav-new">DEMO</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="week-card">
            <div className="week-card-top"><span className="week-spark" aria-hidden="true">✦</span><span>YOUR WEEK</span></div>
            <div className="week-count">3 <span>of 5 study days</span></div>
            <div className="week-dots" aria-label="Three of five sample study days completed">{[true, true, true, false, false].map((done, index) => <span className={done ? "dot done" : "dot"} key={index} />)}</div>
            <div className="sample-note">Sample progress · not saved</div>
          </div>
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