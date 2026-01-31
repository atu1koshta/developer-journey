export default function SkillTag({ name }: { name: string }) {
  return (
    <span className="inline-block px-3 py-1 text-sm rounded-full border border-[var(--border)] bg-[var(--surface)] text-secondary dark:text-muted hover:border-accent transition-colors">
      {name}
    </span>
  );
}
