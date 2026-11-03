"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function PrimaryButton({ href, onClick, children, className = '' }: PrimaryButtonProps) {
  const base = 'button button-primary rounded-md transition-all duration-200';
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}> {children} </Link>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`}> {children} </button>
  );
}