export interface Contribution {
  what: string;
  category: string;
  tech: string[];
  impact: string;
}

export interface TimelinePeriod {
  period: string;
  theme: string;
  contributions: Contribution[];
}

export interface Experience {
  company: string;
  location: string;
  type: string;
  role: string;
  duration: string;
  project?: string;
  project_description?: string;
  timeline: TimelinePeriod[];
}

export interface Skills {
  [category: string]: string[];
}

export interface ContributionsData {
  name: string;
  title: string;
  skills: Skills;
  experience: Experience[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
}

export interface FlatContribution extends Contribution {
  company: string;
  period: string;
  theme: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface KeyProject {
  title: string;
  description: string;
  tech: string[];
  category: string;
}
