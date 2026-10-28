import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Code2 } from "lucide-react";
import { skillCategories, type Skill } from "../data/skills";

function readableColor(hex: string) {
  const n = parseInt(hex, 16);
  const luminance = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return luminance < 0.35 ? "#E2E8F0" : `#${hex}`;
}

function SkillTile({ skill }: { skill: Skill }) {
  const color = skill.icon ? readableColor(skill.icon.hex) : "#60A5FA";
  return (
    <div className="panel panel-hover group flex flex-col items-center gap-3 px-4 py-6 text-center">
      <div
        className="grid size-14 place-items-center rounded-xl border border-line bg-night/60 transition-transform duration-300 group-hover:scale-110"
        style={{ boxShadow: `0 0 28px -10px ${color}` }}
      >
        {skill.icon ? (
          <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
            <path d={skill.icon.path} fill={color} />
          </svg>
        ) : (
          <Code2 size={28} color={color} />
        )}
      </div>
      <div>
        <p className="font-display font-semibold text-white">{skill.name}</p>
        <p className="mt-0.5 font-mono text-xs text-slate-500">{skill.note}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <>
      <div role="tablist" aria-label="Skill categories" className="mb-8 flex flex-wrap justify-center gap-2">
        {skillCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={activeId === c.id}
            onClick={() => setActiveId(c.id)}
            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeId === c.id ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {activeId === c.id && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 rounded-lg border border-blue-400/40 bg-blue-500/15"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active.id}
          role="tabpanel"
          aria-label={active.label}
          className="flex flex-wrap justify-center gap-4"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {active.skills.map((skill) => (
            <motion.li
              key={skill.name}
              className="w-[calc(50%-0.5rem)] sm:w-44"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <SkillTile skill={skill} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}
