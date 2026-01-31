"use client";

interface FilterBarProps {
  categories: string[];
  techTags: string[];
  selectedCategory: string;
  selectedTech: string;
  searchQuery: string;
  onCategoryChange: (value: string) => void;
  onTechChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export default function FilterBar({
  categories,
  techTags,
  selectedCategory,
  selectedTech,
  searchQuery,
  onCategoryChange,
  onTechChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search contributions..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={selectedTech}
        onChange={(e) => onTechChange(e.target.value)}
        className="px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-accent/50"
      >
        <option value="">All Technologies</option>
        {techTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
