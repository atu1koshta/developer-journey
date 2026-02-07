"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { Skills } from "@/lib/types";
import { SKILL_CATEGORY_LABELS, SKILL_PROFICIENCY } from "@/lib/constants";

export default function SkillRadarChart({ skills }: { skills: Skills }) {
  const data = Object.entries(skills).map(([key]) => ({
    subject: SKILL_CATEGORY_LABELS[key] || key,
    value: SKILL_PROFICIENCY[key] ?? 5,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "var(--foreground)", fontSize: 11 }}
        />
        <Radar
          dataKey="value"
          stroke="#9a8c98"
          fill="#9a8c98"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
