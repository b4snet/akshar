import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akshar | Your learning space",
  description: "A thoughtful learning space for NEB students and CEE and IOE exam preparation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
