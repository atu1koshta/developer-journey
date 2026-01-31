import {
  getProfile,
  getEducation,
  getContributionsData,
  getSkills,
  getStats,
  getKeyProjects,
  getAllContributions,
  getCategories,
  getAllTechTags,
} from "@/lib/data";

import Hero from "./components/hero/Hero";
import StatsSection from "./components/stats/StatsSection";
import SkillsSection from "./components/skills/SkillsSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import TimelineSection from "./components/timeline/TimelineSection";
import ContributionsFeed from "./components/contributions/ContributionsFeed";
import EducationSection from "./components/education/EducationSection";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  const profile = getProfile();
  const education = getEducation();
  const data = getContributionsData();
  const skills = getSkills();
  const stats = getStats();
  const projects = getKeyProjects();
  const contributions = getAllContributions();
  const categories = getCategories();
  const techTags = getAllTechTags();

  return (
    <>
      <Hero profile={profile} />
      <StatsSection stats={stats} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <TimelineSection experience={data.experience} />
      <ContributionsFeed
        contributions={contributions}
        categories={categories}
        techTags={techTags}
      />
      <EducationSection education={education} />
      <ContactSection profile={profile} />
    </>
  );
}
