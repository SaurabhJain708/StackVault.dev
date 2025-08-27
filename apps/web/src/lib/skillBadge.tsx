import { SKILL_ICONS } from "@/lib/skill-icons";

export default function SkillBadge({ name }: { name: string }) {
  const Icon = SKILL_ICONS[name];

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded bg-gray-800 text-white">
      {Icon ? (
        <Icon className="w-4 h-4" />
      ) : (
        <span className="font-extrabold">{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}
 