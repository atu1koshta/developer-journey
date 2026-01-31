import type { Skills } from "@/lib/types";
import { SKILL_CATEGORY_LABELS } from "@/lib/constants";
import SectionWrapper from "../layout/SectionWrapper";
import SkillRadarChart from "./SkillRadarChart";
import SkillCategoryGroup from "./SkillCategoryGroup";

export default function SkillsSection({ skills }: { skills: Skills }) {
  return (
    <SectionWrapper id="skills">
      <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <SkillRadarChart skills={skills} />
        </div>
        <div>
          {Object.entries(skills).map(([key, items]) => (
            <SkillCategoryGroup
              key={key}
              label={SKILL_CATEGORY_LABELS[key] || key}
              skills={items}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
