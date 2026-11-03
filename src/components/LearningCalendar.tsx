"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CalendarChangeHandler = NonNullable<ComponentProps<typeof Calendar>["onChange"]>;
type CalendarChangeValue = Parameters<CalendarChangeHandler>[0];

export default function LearningCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChange: CalendarChangeHandler = (value: CalendarChangeValue) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value)) {
      // pick the first date of range or null
      setDate(value[0] ?? null);
    } else {
      setDate(null);
    }
  };

  return (
    <div className="flex justify-center p-4 bg-card rounded-xl">
      <Calendar
        onChange={handleChange}
        value={date}
        // Minimal styling, relying on Tailwind variables for colors
        tileClassName={() => null}
      />
    </div>
  );
}
