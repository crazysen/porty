import { useEffect, useRef, useState } from 'react';
import type { Skill } from '@/types';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(skill.level);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level]);

  if (skill.level <= 0) {
    return (
      <div className="rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-2 text-sm font-medium text-[var(--text-primary)]">
        {skill.name}
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-2" style={{ transitionDelay: `${index * 50}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-primary)]">{skill.name}</span>
        <span className="text-xs text-[var(--text-muted)]">{skill.level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name} proficiency`}
        />
      </div>
    </div>
  );
}

export { SkillBar };
