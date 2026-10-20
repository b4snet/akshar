"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/Icon";

const navLinks = [
  { label: "Learn", href: "/learn" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Entrance prep", href: "/practice" },
  { label: "About Akshar", href: "#about-akshar" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="site-header" ref={wrapperRef}>
      <div className="site-header-inner">
        <Link href="/" className="site-wordmark" aria-label="Akshar home" onClick={() => setOpen(false)}>
          <span className="site-mark" aria-hidden="true">अ</span>
          <span>akshar<span className="site-mark-period">.</span></span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            link.href.startsWith("#") ? <a key={link.href} href={link.href} className="site-nav-link">{link.label}</a> : <Link key={link.href} href={link.href} className="site-nav-link">{link.label}</Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <Link href="/auth/login" className="site-nav-link site-header-login">Log in</Link>
          <Link href="/signup" className="site-btn site-btn-sm">Sign up</Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? <CloseIcon /> : <MenuIcon />}</span>
          <span className="site-visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div className="site-mobile-panel" id="site-mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link) => (
            link.href.startsWith("#") ? <a key={link.href} href={link.href} className="site-mobile-link" onClick={() => setOpen(false)}>{link.label}</a> : <Link key={link.href} href={link.href} className="site-mobile-link" onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <div className="site-mobile-actions">
            <Link href="/auth/login" className="site-btn site-btn-ghost" onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/signup" className="site-btn" onClick={() => setOpen(false)}>Sign up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
