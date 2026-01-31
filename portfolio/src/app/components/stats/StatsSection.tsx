import type { StatItem } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import StatCard from "./StatCard";

export default function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <SectionWrapper id="stats">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>
    </SectionWrapper>
  );
}
