import fs from "fs";
import path from "path";
import yaml from "yaml";
import type {
  ContributionsData,
  Profile,
  Education,
  FlatContribution,
  StatItem,
  KeyProject,
  Skills,
} from "./types";

function readYaml(): ContributionsData {
  // Read from project root's parent (developer-journey/contributions.yaml)
  const filePath = path.join(process.cwd(), "../contributions.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  return yaml.parse(file) as ContributionsData;
}

function readJson<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "src/data", filename);
  const file = fs.readFileSync(filePath, "utf8");
  return JSON.parse(file) as T;
}

export function getProfile(): Profile {
  return readJson<Profile>("profile.json");
}

export function getEducation(): Education[] {
  return readJson<Education[]>("education.json");
}

export function getContributionsData(): ContributionsData {
  return readYaml();
}

export function getSkills(): Skills {
  const data = readYaml();
  return data.skills;
}

// Derive proficiency scores from actual contribution data
export function getDerivedSkillProficiency(): Record<string, number> {
  const contributions = getAllContributions();

  // Count raw contribution frequency by category
  const categoryFrequency: Record<string, number> = {};
  contributions.forEach((contribution) => {
    contribution.categories.forEach((cat) => {
      categoryFrequency[cat] = (categoryFrequency[cat] || 0) + 1;
    });
  });

  // Map contribution categories to skill categories with impact multipliers
  // This reflects how core each contribution type is to the skill
  const categoryToSkills: Record<string, Array<{ skill: string; weight: number }>> = {
    architecture: [
      { skill: "architecture", weight: 3 },
      { skill: "solutions_architecture", weight: 2.5 },
      { skill: "api_design", weight: 1.5 },
      { skill: "backend", weight: 1.5 },
    ],
    security: [
      { skill: "auth_security", weight: 3 },
      { skill: "architecture", weight: 1.5 },
      { skill: "api_design", weight: 1 },
    ],
    integration: [
      { skill: "integrations", weight: 3 },
      { skill: "api_design", weight: 1.5 },
      { skill: "backend", weight: 1 },
    ],
    devops: [
      { skill: "cloud_devops", weight: 3 },
      { skill: "architecture", weight: 1 },
      { skill: "caching_queuing", weight: 1.5 },
    ],
    feature: [
      { skill: "backend", weight: 2 },
      { skill: "frontend", weight: 1.5 },
    ],
    testing: [
      { skill: "testing", weight: 3 },
      { skill: "backend", weight: 1.5 },
    ],
    improvement: [
      { skill: "architecture", weight: 2 },
      { skill: "solutions_architecture", weight: 1.5 },
      { skill: "testing", weight: 1 },
    ],
    performance: [
      { skill: "caching_queuing", weight: 2.5 },
      { skill: "cloud_devops", weight: 1.5 },
    ],
  };

  // Initialize all skill scores
  const skillScores: Record<string, number> = {
    cloud_devops: 0,
    backend: 0,
    frontend: 0,
    auth_security: 0,
    databases: 0,
    caching_queuing: 0,
    testing: 0,
    api_design: 0,
    integrations: 0,
    ai_processing: 0,
    architecture: 0,
    solutions_architecture: 0,
  };

  // Score based on contribution frequency and impact
  Object.entries(categoryFrequency).forEach(([category, frequency]) => {
    const skillMappings = categoryToSkills[category] || [];
    skillMappings.forEach(({ skill, weight }) => {
      skillScores[skill] = (skillScores[skill] || 0) + frequency * weight;
    });
  });

  // Add base scores for core technologies based on usage across contributions
  // Backend is heavily used throughout
  skillScores.backend = Math.max(skillScores.backend, contributions.length * 1.5);

  // Databases used throughout
  skillScores.databases = Math.max(skillScores.databases, contributions.length * 1.2);

  // AI processing appears in some key contributions
  const aiContributions = contributions.filter(c => c.tech?.some(t =>
    t.includes("Textract") || t.includes("crawl4ai") || t.includes("OCR")
  )).length;
  skillScores.ai_processing = Math.max(skillScores.ai_processing, aiContributions * 2);

  // Normalize scores to 1-10 scale with better distribution
  const maxScore = Math.max(...Object.values(skillScores));
  const minScore = Math.min(...Object.values(skillScores).filter(s => s > 0));
  const normalizedScores: Record<string, number> = {};

  Object.entries(skillScores).forEach(([key, score]) => {
    if (score === 0) {
      // Skill with no contributions gets base score
      normalizedScores[key] = 3;
    } else {
      // Scale active skills from 5-10 range with better distribution
      const normalized = 5 + ((score - minScore) / (maxScore - minScore)) * 5;
      normalizedScores[key] = Math.round(normalized);
    }
  });

  return normalizedScores;
}

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

// Parse period string to a sortable date (uses the latest date in a range).
// e.g. "Sep – Nov 2024" → Nov 2024, "Jan 2026" → Jan 2026,
//      "Jun 2023 – Jan 2024" → Jan 2024
function parsePeriodDate(period: string): number {
  // Take the part after " – " if it exists (the end of the range)
  const parts = period.split(/\s*–\s*/);
  const endPart = parts[parts.length - 1].trim();

  // Match "Mon YYYY" or just "Mon" (year inherited from earlier part)
  const match = endPart.match(/([A-Z][a-z]{2})(?:\s+(\d{4}))?/);
  if (!match) return 0;

  const month = MONTH_MAP[match[1]] ?? 0;
  let year = match[2] ? parseInt(match[2], 10) : 0;

  // If end part has no year, grab it from the full string
  if (!year) {
    const yearMatch = period.match(/(\d{4})/);
    year = yearMatch ? parseInt(yearMatch[1], 10) : 0;
  }

  return year * 12 + month;
}

export function getAllContributions(): FlatContribution[] {
  const data = readYaml();
  const flat: FlatContribution[] = [];
  for (const exp of data.experience) {
    for (const period of exp.timeline) {
      for (const c of period.contributions) {
        flat.push({
          ...c,
          company: exp.company,
          period: period.period,
          theme: period.theme,
        });
      }
    }
  }
  // Sort by date, latest first
  flat.sort((a, b) => parsePeriodDate(b.period) - parsePeriodDate(a.period));
  return flat;
}

export function getStats(): StatItem[] {
  const contributions = getAllContributions();
  const allTech = new Set<string>();
  contributions.forEach((c) => c.tech.forEach((t) => allTech.add(t)));

  const companies = new Set(
    readYaml().experience.map((e) => e.company)
  );

  const architected = contributions.filter(
    (c) => c.categories.includes("architecture")
  ).length;

  const securityFocused = contributions.filter(
    (c) => c.categories.includes("security")
  ).length;

  const integrated = contributions.filter(
    (c) => c.categories.includes("integration")
  ).length;

  return [
    { label: "Contributions", value: contributions.length, suffix: "+" },
    { label: "Systems Architected", value: architected, suffix: "" },
    { label: "Security-Focused", value: securityFocused, suffix: "" },
    { label: "Integrations", value: integrated, suffix: "" },
    { label: "Companies", value: companies.size, suffix: "" },
    { label: "Technologies", value: allTech.size, suffix: "+" },
  ];
}

export function getKeyProjects(): KeyProject[] {
  return [
    {
      title: "Authentication System",
      description:
        "Designed and owned the entire auth module — OTP login, Keycloak SSO, NGINX/Lua proxy, multi-portal JWT management.",
      tech: ["Node.js", "Keycloak", "NGINX", "Lua", "JWT", "OAuth2"],
      categories: ["architecture"],
    },
    {
      title: "GoHighLevel CRM Integration",
      description:
        "Built end-to-end CRM integration — customer sync, event tracking, tag management, bulk import, webhook automation.",
      tech: ["Node.js", "GoHighLevel API", "Webhooks", "AWS Lambda"],
      categories: ["integration"],
    },
    {
      title: "Notification & Observability System",
      description:
        "Architected centralized notification service — 47+ events across 6 subsystems, provider-agnostic dispatcher, webhook delivery tracking.",
      tech: ["Node.js", "Event-Driven Architecture", "SNS", "SQS", "React"],
      categories: ["architecture"],
    },
    {
      title: "OCR Receipt Pipeline",
      description:
        "Built AI-powered receipt processing — upload, Textract OCR, data extraction, approval workflow, notifications.",
      tech: ["AWS Textract", "AWS S3", "Node.js", "SendGrid"],
      categories: ["feature"],
    },
    {
      title: "Wallet & Ledger System",
      description:
        "Migrated platform to double-entry bookkeeping, built wallet with credit/debit, auto-recharge, and brand-level config.",
      tech: ["Node.js", "Sequelize", "MySQL", "Stripe"],
      categories: ["architecture"],
    },
    {
      title: "Marketplace Data Platform",
      description:
        "Architected new scraping platform with crawl4ai — parallel scraping, data normalization, S3 storage, restaurant registry.",
      tech: ["Python", "crawl4ai", "AWS S3", "MySQL"],
      categories: ["architecture"],
    },
  ];
}

export function getCategories(): string[] {
  const contributions = getAllContributions();
  const categories = new Set<string>();
  contributions.forEach((c) => c.categories.forEach((cat) => categories.add(cat)));
  return [...categories].sort();
}

export function getAllTechTags(): string[] {
  const contributions = getAllContributions();
  const tags = new Set<string>();
  contributions.forEach((c) => c.tech.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

