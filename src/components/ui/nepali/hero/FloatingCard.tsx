"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTilt } from "./useTilt";

export function FloatingCard({ children, className = "", delay = 0, style: providedStyle }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const { ref, style, onPointerMove, onPointerLeave } = useTilt();
  return <div ref={ref} className={`floating-hero-card ${className}`} style={{ ...providedStyle, ...style, "--float-delay": `${delay}ms` } as CSSProperties} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>{children}</div>;
}
