import type { Skills } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import SkillRadarChart from "./SkillRadarChart";

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Core Expertise</h2>
          <p className="text-secondary dark:text-muted text-lg max-w-2xl mx-auto">
            Proficiency across full-stack development, cloud infrastructure, and solutions architecture. Built on 5+ years of production experience.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <SkillRadarChart skills={skills} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
