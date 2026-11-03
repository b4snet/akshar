"use client";

import { useMemo } from "react";

interface ActivityData {
  day: string; // e.g., 'Mon'
  hours: number;
}

export default function WeeklyActivityChart({ data = [] }: { data?: ActivityData[] }) {
  const hasData = useMemo(() => data && data.length > 0, [data]);

  if (!hasData) {
    return <div className="text-center text-secondary">No activity recorded yet.</div>;
  }

  const maxHours = Math.max(...data.map((d) => d.hours), 1);
  const height = 120;
  const barWidth = 30;
  const barGap = 15;
  const svgWidth = data.length * (barWidth + barGap);

  return (
    <svg width={svgWidth} height={height} className="mx-auto">
      {/* X axis labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={i * (barWidth + barGap) + barWidth / 2}
          y={height - 5}
          textAnchor="middle"
          fontSize="10"
          fill="var(--foreground)"
        >
          {d.day}
        </text>
      ))}
      {/* Bars */}
      {data.map((d, i) => {
        const barHeight = (d.hours / maxHours) * (height - 30);
        return (
          <g key={i}>
            <rect
              x={i * (barWidth + barGap)}
              y={height - barHeight - 20}
              width={barWidth}
              height={barHeight}
              fill="var(--primary)"
            />
            <text
              x={i * (barWidth + barGap) + barWidth / 2}
              y={height - barHeight - 25}
              textAnchor="middle"
              fontSize="9"
              fill="var(--foreground)"
            >
              {d.hours}
            </text>
          </g>
        );
      })}
      {/* Y axis line */}
      <line x1={0} y1={height - 20} x2={svgWidth} y2={height - 20} stroke="var(--border)" />
    </svg>
  );
}