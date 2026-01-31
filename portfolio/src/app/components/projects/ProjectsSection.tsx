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
      <h2 className="text-3xl font-bold mb-8">Key Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
