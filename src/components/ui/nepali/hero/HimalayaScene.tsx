"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { CloudLayer } from "./CloudLayer";
import { PrayerFlags } from "./PrayerFlags";

export function HimalayaScene({ compact = false, children }: { compact?: boolean; children?: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const connection = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const staticOnly = connection.connection?.saveData || /2g/.test(connection.connection?.effectiveType ?? "") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scene.classList.toggle("himalaya-static", Boolean(staticOnly));
    const observer = new IntersectionObserver(([entry]) => scene.classList.toggle("himalaya-offscreen", !entry.isIntersecting), { threshold: 0.08 });
    observer.observe(scene);
    const visibility = () => scene.classList.toggle("himalaya-hidden", document.hidden);
    const parallax = () => {
      if (document.hidden || staticOnly) return;
      const rect = scene.getBoundingClientRect();
      scene.style.setProperty("--scroll-shift", `${Math.max(-12, Math.min(12, (window.innerHeight * .5 - rect.top) * .018))}px`);
    };
    window.addEventListener("scroll", parallax, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    visibility();
    parallax();
    return () => { observer.disconnect(); window.removeEventListener("scroll", parallax); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return (
    <div ref={sceneRef} className={`himalaya-scene${compact ? " himalaya-scene--compact" : ""}`}>
      <div className="himalaya-photo" aria-hidden="true">
        <picture>
          <source media="(max-width: 640px)" srcSet="/hero/himalaya-prayer-flags-640.avif" type="image/avif" />
          <source media="(max-width: 1280px)" srcSet="/hero/himalaya-prayer-flags-1280.avif" type="image/avif" />
          <source srcSet="/hero/himalaya-prayer-flags-1920.avif" type="image/avif" />
          <Image src="/hero/himalaya-prayer-flags-1920.jpg" alt="" fill priority={!compact} sizes={compact ? "100vw" : "(max-width: 768px) 100vw, 50vw"} />
        </picture>
      </div>
      <CloudLayer />
      <PrayerFlags />
      {children ? <div className="himalaya-scene-content">{children}</div> : null}
    </div>
  );
}
