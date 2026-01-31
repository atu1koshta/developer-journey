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

  const features = contributions.filter(
    (c) => c.category === "feature"
  ).length;

  return [
    { label: "Contributions", value: contributions.length, suffix: "+" },
    { label: "Systems Built", value: 18, suffix: "" },
    { label: "Features Shipped", value: features, suffix: "+" },
    { label: "Companies", value: companies.size, suffix: "" },
    { label: "Technologies", value: allTech.size, suffix: "+" },
    { label: "Dashboard Speedup", value: 80, suffix: "%" },
  ];
}

export function getKeyProjects(): KeyProject[] {
  return [
    {
      title: "Authentication System",
      description:
        "Designed and owned the entire auth module — OTP login, Keycloak SSO, NGINX/Lua proxy, multi-portal JWT management.",
      tech: ["Node.js", "Keycloak", "NGINX", "Lua", "JWT", "OAuth2"],
      category: "architecture",
    },
    {
      title: "GoHighLevel CRM Integration",
      description:
        "Built end-to-end CRM integration — customer sync, event tracking, tag management, bulk import, webhook automation.",
      tech: ["Node.js", "GoHighLevel API", "Webhooks", "AWS Lambda"],
      category: "integration",
    },
    {
      title: "Zapier Platform",
      description:
        "Sole developer of complete Zapier integration — 9 trigger modules connecting platform to 5000+ apps.",
      tech: ["Node.js", "Zapier Platform", "Webhooks"],
      category: "architecture",
    },
    {
      title: "OCR Receipt Pipeline",
      description:
        "Built AI-powered receipt processing — upload, Textract OCR, data extraction, approval workflow, notifications.",
      tech: ["AWS Textract", "AWS S3", "Node.js", "SendGrid"],
      category: "feature",
    },
    {
      title: "Wallet & Ledger System",
      description:
        "Migrated platform to double-entry bookkeeping, built wallet with credit/debit, auto-recharge, and brand-level config.",
      tech: ["Node.js", "Sequelize", "MySQL", "Stripe"],
      category: "architecture",
    },
    {
      title: "Marketplace Data Platform",
      description:
        "Architected new scraping platform with crawl4ai — parallel scraping, data normalization, S3 storage, restaurant registry.",
      tech: ["Python", "crawl4ai", "AWS S3", "MySQL"],
      category: "architecture",
    },
  ];
}

export function getCategories(): string[] {
  const contributions = getAllContributions();
  return [...new Set(contributions.map((c) => c.category))].sort();
}

export function getAllTechTags(): string[] {
  const contributions = getAllContributions();
  const tags = new Set<string>();
  contributions.forEach((c) => c.tech.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

