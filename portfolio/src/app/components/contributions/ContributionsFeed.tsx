"use client";

import { useState, useMemo, useCallback } from "react";
import type { FlatContribution } from "@/lib/types";
import FilterBar from "./FilterBar";
import ContributionItem from "./ContributionItem";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PAGE_SIZE = 12;

interface ContributionsFeedProps {
  contributions: FlatContribution[];
  categories: string[];
  techTags: string[];
}

export default function ContributionsFeed({
  contributions,
  categories,
  techTags,
}: ContributionsFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return contributions.filter((c) => {
      if (selectedCategory && c.category !== selectedCategory) return false;
      if (selectedTech && !c.tech.includes(selectedTech)) return false;
      if (
        searchQuery &&
        !c.what.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.theme.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [contributions, selectedCategory, selectedTech, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilterChange = useCallback(
    (setter: (v: string) => void) => (value: string) => {
      setter(value);
      setPage(1);
    },
    []
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <section id="contributions" className="section-padding max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">
        All Contributions{" "}
        <span className="text-lg font-normal text-accent">
          ({filtered.length})
        </span>
      </h2>
      <FilterBar
        categories={categories}
        techTags={techTags}
        selectedCategory={selectedCategory}
        selectedTech={selectedTech}
        searchQuery={searchQuery}
        onCategoryChange={handleFilterChange(setSelectedCategory)}
        onTechChange={handleFilterChange(setSelectedTech)}
        onSearchChange={handleFilterChange(setSearchQuery)}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {paged.map((c, i) => (
          <ContributionItem key={i} contribution={c} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-secondary dark:text-muted py-12">
          No contributions match the current filters.
        </p>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={18} />
          </button>
          {pageNumbers.map((n, i) =>
            n === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-accent">
                ...
              </span>
            ) : (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  n === currentPage
                    ? "bg-primary text-white"
                    : "border border-[var(--border)] hover:bg-[var(--surface)]"
                }`}
              >
                {n}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="p-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
