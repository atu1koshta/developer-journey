import type { Experience } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/constants";

interface Highlight {
  title: string;
  summary: string;
  category: string;
  tech: string[];
}

function getHighlights(company: string): Highlight[] {
  const map: Record<string, Highlight[]> = {
    "HAR LLC": [
      {
        title: "Auth System — Full Ownership",
        summary:
          "Designed the entire auth module across all portals: OTP login, Keycloak SSO, NGINX/Lua proxy gateway, JWT management.",
        category: "architecture",
        tech: ["Node.js", "Keycloak", "NGINX", "Lua", "OAuth2"],
      },
      {
        title: "Wallet & Double-Entry Ledger",
        summary:
          "Migrated financial system to double-entry bookkeeping. Built wallet with credit/debit, auto-recharge, and brand-level config.",
        category: "architecture",
        tech: ["Node.js", "Sequelize", "MySQL", "Stripe"],
      },
      {
        title: "Zapier Integration — Sole Developer",
        summary:
          "Built 9 trigger modules connecting the platform to 5,000+ apps. Designed the trigger/action model end-to-end.",
        category: "integration",
        tech: ["Node.js", "Zapier Platform", "Webhooks"],
      },
      {
        title: "AI Receipt Pipeline",
        summary:
          "Built receipt-to-rewards pipeline from scratch — upload, AWS Textract OCR, AI parsing, operator approval workflow.",
        category: "feature",
        tech: ["AWS Textract", "AWS S3", "Node.js", "SendGrid"],
      },
      {
        title: "GoHighLevel CRM Integration",
        summary:
          "End-to-end CRM sync — real-time event tracking, customer tagging, bulk import, encrypted API key storage.",
        category: "integration",
        tech: ["Node.js", "GoHighLevel API", "AWS Lambda"],
      },
      {
        title: "Marketplace Data Platform",
        summary:
          "Architected new scraping system with crawl4ai — parallel scraping, data normalization, S3 storage, restaurant registry.",
        category: "architecture",
        tech: ["Python", "crawl4ai", "AWS S3"],
      },
      {
        title: "Brand Hierarchy Architecture",
        summary:
          "Leading Brand-Group-Store restructure — schema migration, Points Tracking Config, Franchise Groups, Brand Mapper facade.",
        category: "architecture",
        tech: ["Node.js", "Sequelize", "MySQL"],
      },
      {
        title: "Scraping Pipeline Decoupling",
        summary:
          "Two iterations of decoupling scraping from DB. Built processors for MonkeyMedia, Olo, and marketplace order ingestion.",
        category: "architecture",
        tech: ["Node.js", "AWS SQS", "Lambda"],
      },
    ],
    "TRGT Digital": [
      {
        title: "80% Dashboard Speedup",
        summary:
          "Optimized dashboard load time through Redis caching, cutting response times by 80%.",
        category: "performance",
        tech: ["Redis", "Python", "Flask"],
      },
      {
        title: "User Activity Tracker",
        summary:
          "Built engagement monitoring system for digital marketing campaigns with scheduled Facebook Graph API integration.",
        category: "feature",
        tech: ["Python", "Flask", "MySQL", "Celery"],
      },
    ],
    "Bluesapling Technologies": [
      {
        title: "50% API Response Improvement",
        summary:
          "Engineered algorithm to batch-update user progress across groups, halving API response times.",
        category: "performance",
        tech: ["Node.js", "MongoDB"],
      },
    ],
    Wipro: [
      {
        title: "Enterprise QA Leadership",
        summary:
          "Collaborated across cross-functional teams on quality assurance for enterprise software products.",
        category: "testing",
        tech: ["QA", "Manual Testing"],
      },
    ],
  };
  return map[company] || [];
}

export default function TimelineCompany({
  experience,
}: {
  experience: Experience;
}) {
  const highlights = getHighlights(experience.company);

  return (
    <div className="relative pl-8 pb-10 border-l-2 border-accent/30 last:border-l-0">
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-[var(--background)]" />

      <div className="mb-5">
        <h3 className="text-xl font-bold">{experience.company}</h3>
        <p className="text-sm text-secondary dark:text-muted">
          {experience.role} &middot; {experience.type} &middot;{" "}
          {experience.location}
        </p>
        <p className="text-sm text-accent">{experience.duration}</p>
        {experience.project && (
          <p className="text-sm text-secondary dark:text-muted mt-1">
            <span className="font-medium">Project:</span> {experience.project}
          </p>
        )}
      </div>

      <div className="ml-2 grid gap-4 sm:grid-cols-2">
        {highlights.map((h, i) => {
          const badgeClass =
            CATEGORY_COLORS[h.category] ||
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

          return (
            <div
              key={i}
              className="group relative p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-accent/60 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${badgeClass}`}
                >
                  {h.category}
                </span>
              </div>
              <h4 className="font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
                {h.title}
              </h4>
              <p className="text-xs text-secondary dark:text-muted leading-relaxed">
                {h.summary}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {h.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
