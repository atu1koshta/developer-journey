import type { Experience } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import TimelineCompany from "./TimelineCompany";

export default function TimelineSection({
  experience,
}: {
  experience: Experience[];
}) {
  return (
    <SectionWrapper id="timeline">
      <h2 className="text-3xl font-bold mb-2">Value Delivered</h2>
      <p className="text-secondary dark:text-muted mb-8">
        Contributions ranked by impact — architecture, security, and performance work first.
      </p>
      <div className="max-w-3xl mx-auto">
        {experience.map((exp, i) => (
          <TimelineCompany key={i} experience={exp} />
        ))}
      </div>
    </SectionWrapper>
  );
}
