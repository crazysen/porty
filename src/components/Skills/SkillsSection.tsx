import { useState } from 'react';
import type { SkillCategory } from '@/types';
import { SkillBar } from '@/components/Skills/SkillBar';
import ScrollReveal from '@/components/UI/ScrollReveal';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '');

  const active = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-purple/20'
                : 'border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]'
            }`}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <ScrollReveal key={active.id}>
        <div className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-semibold">{active.title}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {active.skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
