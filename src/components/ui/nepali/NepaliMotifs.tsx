import type { HTMLAttributes } from "react";

export function PatternStrip({ className = "" }: { className?: string }) {
  return <div className={`nepali-pattern-strip ${className}`} aria-hidden="true" />;
}

export function Mandala({ className = "", watermark = false }: { className?: string; watermark?: boolean }) {
  return (
    <svg className={`nepali-mandala ${watermark ? "is-watermark" : ""} ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="100" cy="100" r="84" /><circle cx="100" cy="100" r="62" /><circle cx="100" cy="100" r="38" /><circle cx="100" cy="100" r="14" />
        {Array.from({ length: 12 }, (_, index) => <path key={index} d="M100 16 Q120 38 100 62 Q80 38 100 16" transform={`rotate(${index * 30} 100 100)`} />)}
      </g>
    </svg>
  );
}

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg className={`nepali-skyline ${className}`} viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 86 L110 86 155 55 200 86 282 86 350 35 418 86 488 86 548 58 610 86 705 86 778 31 850 86 944 86 1010 54 1074 86 1200 86" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M0 98H1200M245 86v12m92-12v12m520-12v12m278-12v12" stroke="currentColor" strokeWidth="2" />
      <path d="M700 86V65h30V86m-23-21V49h16v16m0 0 8 7H685l8-7" fill="currentColor" opacity=".85" />
    </svg>
  );
}

export function Bunting({ className = "" }: { className?: string }) {
  return <div className={`nepali-bunting ${className}`} aria-hidden="true" />;
}

export function ArchFrame({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`nepali-arch-frame ${className}`} {...props}>{children}</div>;
}

export function NepaliIllustration({ kind = "mountain", className = "" }: { kind?: "mountain" | "lotus" | "pagoda" | "lamp"; className?: string }) {
  return (
    <svg className={`nepali-illustration ${className}`} viewBox="0 0 180 140" aria-hidden="true">
      {kind === "mountain" && <><circle cx="135" cy="31" r="13" fill="#E8A846" /><path d="M18 112l52-72 34 46 21-29 37 55" fill="#E9E2D4" stroke="currentColor" strokeWidth="3" /><path d="M70 40l15 23-17-5-12 12M125 57l10 15-10-4-7 8" fill="#FFF" /></>}
      {kind === "lotus" && <><path d="M90 111C52 91 51 55 90 34c39 21 38 57 0 77Z" fill="#F1C9D3" stroke="currentColor" strokeWidth="3" /><path d="M90 111C60 113 36 91 43 61c31-1 48 21 47 50Zm0 0c30 2 54-20 47-50-31-1-48 21-47 50Z" fill="#DCE8D0" stroke="currentColor" strokeWidth="3" /></>}
      {kind === "pagoda" && <><path d="M90 25v18M73 43h34l13 14H60l13-14Zm-13 14h60l14 16H46l14-16Zm-14 16h88l16 18H30l16-18Zm0 18h88v35H46Z" fill="#F4D7C1" stroke="currentColor" strokeWidth="3" /><path d="M90 18v7M82 25h16" stroke="#A52A3A" strokeWidth="3" /></>}
      {kind === "lamp" && <><path d="M90 25c13 16 23 32 23 48 0 15-10 27-23 27s-23-12-23-27c0-16 10-32 23-48Z" fill="#E8A846" stroke="currentColor" strokeWidth="3" /><path d="M90 52c5 9 8 15 8 22-8 2-16 2-16 0 0-7 3-13 8-22Z" fill="#FFF8E8" /><path d="M54 104h72l-9 18H63Z" fill="#A52A3A" /><path d="M43 122h94" stroke="currentColor" strokeWidth="4" /></>}
    </svg>
  );
}
