import SkillTag from "./SkillTag";

export default function SkillCategoryGroup({
  label,
  skills,
}: {
  label: string;
  skills: string[];
}) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}
