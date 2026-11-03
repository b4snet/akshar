"use client";

import { useEffect, useRef, useState } from "react";

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const shift = Math.max(-16, Math.min(16, (window.innerHeight / 2 - rect.top) * 0.018));
      ref.current.style.setProperty("--scroll-shift", `${shift}px`);
    };
    const handleVisibility = () => { if (!document.hidden) update(); };
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    update();
    return () => { window.removeEventListener("scroll", update); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [active]);
  return ref;
}
