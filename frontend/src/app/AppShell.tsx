import { Outlet } from 'react-router'

export function AppShell() {
  return (
    <div className="shell">
      <header className="shell-header">
        <span className="shell-brand">Akshar</span>
        <span className="shell-tagline">Education Operating System for Nepal</span>
      </header>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  )
}
