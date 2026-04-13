import type { Skills } from "@/lib/types";
import { SKILL_PROFICIENCY } from "@/lib/constants";
import SectionWrapper from "../layout/SectionWrapper";
import SkillRadarChart from "./SkillRadarChart";

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
          <p className="text-secondary dark:text-muted text-lg max-w-2xl mx-auto">
            Proficiency across architecture, security, integrations, and cloud infrastructure. Expertise built on 5+ years of production experience.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
          <SkillRadarChart skills={skills} proficiencyScores={SKILL_PROFICIENCY} />
        </div>
      </div>
    </SectionWrapper>
  );
}
