import type { KeyProject } from "@/lib/types";
import SectionWrapper from "../layout/SectionWrapper";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({
  projects,
}: {
  projects: KeyProject[];
}) {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Systems</h2>
          <p className="text-secondary dark:text-muted text-lg">
            Architected solutions delivering measurable business impact across authentication, payments, data processing, and observability.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
