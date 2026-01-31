import type { Education } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import { FiBookOpen } from "react-icons/fi";

export default function EducationSection({
  education,
}: {
  education: Education[];
}) {
  return (
    <SectionWrapper id="education">
      <h2 className="text-3xl font-bold mb-8">Education</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {education.map((edu, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <FiBookOpen className="mt-1 text-accent shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-lg">{edu.institution}</h3>
                <p className="text-secondary dark:text-muted">
                  {edu.degree} in {edu.field}
                </p>
              </div>
            </div>
            <div className="text-sm text-accent">
              {edu.duration} &middot; {edu.location}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
