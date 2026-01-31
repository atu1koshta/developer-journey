"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import type { StatItem } from "@/lib/types";

export default function StatCard({ stat }: { stat: StatItem }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / end), 16);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="text-3xl sm:text-4xl font-bold mb-1">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm text-secondary dark:text-muted">{stat.label}</div>
    </div>
  );
}
