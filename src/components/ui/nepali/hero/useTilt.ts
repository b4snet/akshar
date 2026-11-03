"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useRef, useState } from "react";

export function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    setStyle({ transform: `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)` });
  };
  const onPointerLeave = () => setStyle({ transform: "" });
  return { ref, style, onPointerMove, onPointerLeave };
}
