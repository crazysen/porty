import { useEffect, useRef, useState } from 'react';
import type { Stat } from '@/types';

interface StatCardProps {
  stat: Stat;
  index: number;
}

function StatCard({ stat, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * stat.value));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="glass rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:border-accent-purple/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <p className="text-3xl font-bold gradient-text sm:text-4xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
    </div>
  );
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
