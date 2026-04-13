"use client";

import { useEffect, useRef, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { BaseTickContentProps, DotItemDotProps } from "recharts/types/util/types";
import type { Skills } from "@/lib/types";
import { SKILL_CATEGORY_LABELS } from "@/lib/constants";

// ─── Colour palette ──────────────────────────────────────────────────────────
// Chosen to be visually distinct and readable on both light (#fff) and dark (#0f0f1a) backgrounds.
const CATEGORY_PALETTE: Record<
  string,
  { stroke: string; fill: string; text: string }
> = {
  cloud_devops:           { stroke: "#38bdf8", fill: "#38bdf8", text: "#0ea5e9" },
  backend:                { stroke: "#4ade80", fill: "#4ade80", text: "#16a34a" },
  frontend:               { stroke: "#f472b6", fill: "#f472b6", text: "#db2777" },
  auth_security:          { stroke: "#fb923c", fill: "#fb923c", text: "#ea580c" },
  databases:              { stroke: "#a78bfa", fill: "#a78bfa", text: "#7c3aed" },
  caching_queuing:        { stroke: "#facc15", fill: "#facc15", text: "#ca8a04" },
  testing:                { stroke: "#34d399", fill: "#34d399", text: "#059669" },
  api_design:             { stroke: "#f87171", fill: "#f87171", text: "#dc2626" },
  integrations:           { stroke: "#60a5fa", fill: "#60a5fa", text: "#2563eb" },
  ai_processing:          { stroke: "#e879f9", fill: "#e879f9", text: "#a21caf" },
  architecture:           { stroke: "#fbbf24", fill: "#fbbf24", text: "#d97706" },
  solutions_architecture: { stroke: "#f97316", fill: "#f97316", text: "#c2410c" },
};

const CATEGORY_ORDER = [
  "cloud_devops",
  "backend",
  "frontend",
  "auth_security",
  "databases",
  "caching_queuing",
  "testing",
  "api_design",
  "integrations",
  "ai_processing",
  "architecture",
  "solutions_architecture",
];

// Skill categories that represent core strengths
const CORE_STRENGTHS = new Set(["architecture", "solutions_architecture"]);

// Reverse-lookup: label string → category key
function labelToKey(label: string): string {
  return (
    Object.entries(SKILL_CATEGORY_LABELS).find(([, v]) => v === label)?.[0] ??
    ""
  );
}

// ─── Custom angle-axis tick ───────────────────────────────────────────────────
interface CustomTickProps extends BaseTickContentProps {
  isDark?: boolean;
  cx?: number;
  cy?: number;
  proficiencyScores?: Record<string, number>;
}

function CustomAngleTick(props: CustomTickProps) {
  const { x, y, cx = 0, cy = 0, payload, textAnchor, isDark, proficiencyScores } = props;

  if (!payload) return null;

  const numX = typeof x === "string" ? parseFloat(x) : x;
  const numY = typeof y === "string" ? parseFloat(y) : y;

  const label = String(payload.value ?? "");
  const categoryKey = labelToKey(label);

  const palette = CATEGORY_PALETTE[categoryKey];
  const proficiency = proficiencyScores?.[categoryKey] ?? 5;
  const isStrength = CORE_STRENGTHS.has(categoryKey);

  // Push labels slightly further out from the polygon edge
  const dx = numX - cx;
  const dy = numY - cy;
  const pushFactor = 1.14;
  const lx = cx + dx * pushFactor;
  const ly = cy + dy * pushFactor;

  const color = palette?.text ?? (isDark ? "#e8e6e3" : "#22223b");
  const badgeBg = palette?.fill ?? "#9a8c98";

  return (
    <g>
      {isStrength && (
        <text
          x={lx}
          y={ly - 14}
          textAnchor="middle"
          fontSize={10}
          fill={badgeBg}
          style={{ userSelect: "none" }}
          aria-hidden="true"
        >
          ★
        </text>
      )}
      <text
        x={lx}
        y={ly}
        textAnchor={textAnchor}
        fontSize={isStrength ? 11.5 : 10.5}
        fontWeight={isStrength ? 700 : 500}
        fill={color}
        style={{ userSelect: "none" }}
      >
        {label}
      </text>
      <text
        x={lx}
        y={ly + 13}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fill={badgeBg}
        style={{ userSelect: "none" }}
        aria-label={`Proficiency ${proficiency} out of 10`}
      >
        {proficiency}/10
      </text>
    </g>
  );
}

// ─── Custom colored dot on the radar polygon vertices ────────────────────────
function ColoredDot(props: DotItemDotProps) {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;

  const categoryKey = labelToKey(String((payload as { subject?: string }).subject ?? ""));
  const color = CATEGORY_PALETTE[categoryKey]?.fill ?? "#9a8c98";
  const isStrength = CORE_STRENGTHS.has(categoryKey);

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isStrength ? 5.5 : 3.5}
      fill={color}
      stroke="var(--background)"
      strokeWidth={1.5}
      style={{ filter: isStrength ? `drop-shadow(0 0 5px ${color})` : "none" }}
      aria-hidden="true"
    />
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend({ isDark, proficiencyScores }: { isDark: boolean; proficiencyScores: Record<string, number> }) {
  const barBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
      {CATEGORY_ORDER.map((key) => {
        const label = SKILL_CATEGORY_LABELS[key] ?? key;
        const proficiency = proficiencyScores[key] ?? 5;
        const palette = CATEGORY_PALETTE[key];
        const isStrength = CORE_STRENGTHS.has(key);
        const pct = (proficiency / 10) * 100;

        return (
          <div
            key={key}
            className="flex items-center gap-2.5"
            title={`${label}: ${proficiency}/10`}
          >
            <span
              className="shrink-0 w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: palette?.fill ?? "#9a8c98",
                boxShadow: isStrength
                  ? `0 0 6px ${palette?.fill ?? "#9a8c98"}`
                  : "none",
              }}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span
                  className="text-xs truncate"
                  style={{
                    color: palette?.text ?? (isDark ? "#e8e6e3" : "#22223b"),
                    fontWeight: isStrength ? 700 : 500,
                  }}
                >
                  {isStrength && (
                    <span aria-hidden="true" className="mr-0.5">
                      ★
                    </span>
                  )}
                  {label}
                </span>
                <span
                  className="text-[10px] font-semibold shrink-0"
                  style={{ color: palette?.text ?? "#9a8c98" }}
                >
                  {proficiency}/10
                </span>
              </div>
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: barBg }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${palette?.fill ?? "#9a8c98"}, ${palette?.stroke ?? "#9a8c98"}bb)`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface SkillRadarChartProps {
  skills: Skills;
  proficiencyScores?: Record<string, number>;
}

export default function SkillRadarChart({ skills, proficiencyScores = {} }: SkillRadarChartProps) {
  // Merged: false = not yet mounted, true = mounted & visible
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectDark = () =>
      document.documentElement.classList.contains("dark");

    // All setState calls are inside RAF callback — not synchronous in effect body
    const raf = requestAnimationFrame(() => {
      setReady(true);
      setIsDark(detectDark());
    });

    const observer = new MutationObserver(() => setIsDark(detectDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Build chart data in canonical order; include a category even when the
  // skills map doesn't list individual technologies (e.g. solutions_architecture).
  const skillKeys = Object.keys(skills);
  const data = CATEGORY_ORDER.filter(
    (key) =>
      skillKeys.includes(key) || proficiencyScores[key] !== undefined
  ).map((key) => ({
    subject: SKILL_CATEGORY_LABELS[key] ?? key,
    value: proficiencyScores[key] ?? 5,
  }));

  const gridColor = isDark
    ? "rgba(255,255,255,0.10)"
    : "rgba(0,0,0,0.08)";
  const radarStroke = isDark
    ? "rgba(154,140,152,0.9)"
    : "rgba(74,78,105,0.8)";
  const radarFill = isDark
    ? "rgba(154,140,152,0.15)"
    : "rgba(74,78,105,0.12)";

  // Prevent hydration mismatch — render nothing until client has mounted
  if (!ready) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Skill proficiency radar chart"
      style={{
        opacity: 1,
        transition: "opacity 0.7s ease",
      }}
    >
      {/* Chart container */}
      <div className="relative">
        {/* Decorative radial glow for depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-56 h-56 rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle, #fbbf24 0%, #a78bfa 40%, #38bdf8 100%)",
            }}
          />
        </div>

        <ResponsiveContainer width="100%" height={440}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid
              stroke={gridColor}
              strokeWidth={1}
              gridType="polygon"
            />

            {/* Scale labels: 2, 4, 6, 8, 10 */}
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tickCount={6}
              tick={{
                fill: isDark
                  ? "rgba(232,230,227,0.35)"
                  : "rgba(34,34,59,0.35)",
                fontSize: 8,
              }}
              axisLine={false}
              tickLine={false}
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={(props: BaseTickContentProps) => (
                <CustomAngleTick
                  {...props}
                  cx={undefined}
                  cy={undefined}
                  isDark={isDark}
                  proficiencyScores={proficiencyScores}
                />
              )}
              tickLine={false}
            />

            <Radar
              dataKey="value"
              stroke={radarStroke}
              strokeWidth={1.5}
              fill={radarFill}
              fillOpacity={1}
              dot={(props: DotItemDotProps) => <ColoredDot {...props} />}
              animationBegin={100}
              animationDuration={1200}
              animationEasing="ease-out"
              isAnimationActive={true}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend below the chart */}
      <Legend isDark={isDark} proficiencyScores={proficiencyScores} />
    </div>
  );
}
