"use client";

import { ReactNode } from 'react';

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  bgColor?: string; // Tailwind bg class e.g. 'bg-blue-100'
}

export default function DashboardStatCard({ title, value, icon, bgColor = 'bg-primary-light' }: DashboardStatCardProps) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl shadow-sm ${bgColor}`}>
      {icon && <div className="text-2xl text-primary-deep">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-primary-deep">{title}</span>
        <span className="text-xl font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}