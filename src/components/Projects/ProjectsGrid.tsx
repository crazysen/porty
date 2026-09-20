import { useState } from 'react';
import type { Project, ProjectCategory } from '@/types';
import ScrollReveal from '@/components/UI/ScrollReveal';

const categoryLabels: Record<ProjectCategory, string> = {
  mobile: 'Mobile',
  web: 'Web',
  fullstack: 'Full Stack',
};

const categoryColors: Record<ProjectCategory, string> = {
  mobile: 'bg-accent-purple/20 text-accent-violet border-accent-purple/30',
  web: 'bg-accent-blue/20 text-accent-cyan border-accent-blue/30',
  fullstack: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30',
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <article className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-accent-purple/30 hover:shadow-xl hover:shadow-accent-purple/10">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <span
            className={`absolute top-3 right-3 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.description}
          </p>

          <ul className="mt-4 space-y-1">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-0.5 text-xs text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.pageUrl && (
              <a
                href={project.pageUrl}
                className="focus-ring flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-accent-purple/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
                {project.pageLabel ?? 'Open page'}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-1.5 rounded-lg border border-[var(--glass-border)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-accent-purple/50 hover:text-accent-cyan"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.01.28-2.12 0-3A3.12 3.12 0 0 0 18 4c0-1-.5-2-2-2-1 0-1 0-2 1-1.64 0-3.1.84-4 2-1.32-.28-2.7-.28-4 0C5.5 3.84 4.64 5 4 6c-.28 1.01-.28 2.12 0 3a3.12 3.12 0 0 0-.88 3.5C3 16 6 18 9 18a4.8 4.8 0 0 0-1 3v4" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-2 text-xs font-medium text-white transition-all hover:shadow-lg hover:shadow-accent-purple/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const filters: Array<{ value: ProjectCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'web', label: 'Web' },
    { value: 'fullstack', label: 'Full Stack' },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === f.value
                ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                : 'border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]'
            }`}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
