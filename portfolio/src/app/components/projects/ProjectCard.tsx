"use client";

import { motion } from "framer-motion";
import type { KeyProject } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/constants";

export default function ProjectCard({ project }: { project: KeyProject }) {
  const badgeClass =
    CATEGORY_COLORS[project.category] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-bold text-lg">{project.title}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${badgeClass}`}
        >
          {project.category}
        </span>
      </div>
      <p className="text-sm text-secondary dark:text-muted mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-accent"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
