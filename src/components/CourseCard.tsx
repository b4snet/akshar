"use client";

import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  subject: string;
  href: string;
  thumbnailUrl?: string;
}

export default function CourseCard({ title, subject, href, thumbnailUrl }: CourseCardProps) {
  const fallback = "https://via.placeholder.com/160x90?text=Subject";
  const src = thumbnailUrl ?? fallback;
  return (
    <Link href={href} className="block rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] w-full">
        <Image src={src} alt={subject} fill style={{ objectFit: "cover" }} className="rounded-t-xl" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-foreground truncate" title={title}>{title}</h3>
        <p className="text-sm text-secondary truncate" title={subject}>{subject}</p>
      </div>
    </Link>
  );
}