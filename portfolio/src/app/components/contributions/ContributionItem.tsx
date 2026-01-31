import type { FlatContribution } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/constants";

export default function ContributionItem({
  contribution,
}: {
  contribution: FlatContribution;
}) {
  const badgeClass =
    CATEGORY_COLORS[contribution.category] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";

  return (
    <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex flex-wrap items-start gap-2 mb-2">
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${badgeClass}`}
        >
          {contribution.category}
        </span>
        <span className="text-xs text-accent">
          {contribution.company} &middot; {contribution.period}
        </span>
      </div>
      <p className="text-sm mb-2">{contribution.what}</p>
      {contribution.tech.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {contribution.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--border)] text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
