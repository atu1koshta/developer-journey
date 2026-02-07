export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  cloud_devops: "Cloud & DevOps",
  backend: "Backend",
  frontend: "Frontend",
  auth_security: "Auth & Security",
  databases: "Databases",
  caching_queuing: "Caching & Queuing",
  testing: "Testing",
  api_design: "API Design",
  integrations: "Integrations",
  ai_processing: "AI & Processing",
  architecture: "Architecture",
};

// Skill proficiency levels (1–10) used by the radar chart.
export const SKILL_PROFICIENCY: Record<string, number> = {
  cloud_devops: 7,
  backend: 9,
  frontend: 5,
  auth_security: 8,
  databases: 7,
  caching_queuing: 7,
  testing: 7,
  api_design: 7,
  integrations: 8,
  ai_processing: 5,
  architecture: 10,
};

// Higher number = higher value. Used to sort contributions by impact.
export const CATEGORY_VALUE_WEIGHT: Record<string, number> = {
  architecture: 10,
  security: 9,
  performance: 8,
  feature: 7,
  integration: 6,
  devops: 5,
  improvement: 4,
  research: 4,
  mentorship: 3,
  bugfix: 2,
  testing: 2,
  documentation: 1,
};

export const CATEGORY_COLORS: Record<string, string> = {
  architecture: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  feature: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  bugfix: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  security: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  devops: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
  integration: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  performance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  improvement: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  testing: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
  research: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  documentation: "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300",
  mentorship: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};
