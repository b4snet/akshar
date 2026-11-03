import type { Metadata } from "next";
import { Lora, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-akshar-sans", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-akshar-display", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-akshar-devanagari", display: "swap" });

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Akshar | Your learning space",
  description: "A thoughtful learning space for NEB students and CEE and IOE exam preparation.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`h-full antialiased ${manrope.variable} ${lora.variable} ${devanagari.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('akshar-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})();` }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
