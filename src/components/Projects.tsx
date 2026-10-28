import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, ExternalLink, LayoutGrid, Monitor, Scale, Search, Smartphone, Store } from "lucide-react";
import Modal from "./Modal";
import { GithubIcon } from "./icons/BrandIcons";
import { projects, type Project, type ProjectIcon } from "../data/projects";
import { accentClasses } from "../data/accents";

const filters = [
  { id: "all", label: "Featured", icon: LayoutGrid },
  { id: "web", label: "Web", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone },
] as const;

type Filter = (typeof filters)[number]["id"];

const icons: Record<ProjectIcon, typeof Smartphone> = {
  smartphone: Smartphone,
  store: Store,
  scale: Scale,
};

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn btn-secondary py-2"
        >
          <GithubIcon size={16} /> Code
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn btn-primary py-2"
        >
          <ExternalLink size={16} /> Live site
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!q) return true;
      return [p.title, p.summary, p.label, ...p.tech].some((s) => s.toLowerCase().includes(q));
    });
  }, [filter, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  filter === f.id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-lg border border-blue-400/40 bg-blue-500/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={15} className="relative" />
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="field py-2.5 pl-10"
          />
        </label>
      </div>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => {
            const Icon = icons[project.icon];
            const accent = accentClasses[project.accent];
            return (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 260, damping: 26, delay: i * 0.05 }}
              >
                <article
                  className="panel panel-hover group relative flex h-full cursor-pointer flex-col overflow-hidden p-6"
                  onClick={() => setSelected(project)}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex items-start justify-between gap-3">
                    <span className={`grid size-11 place-items-center rounded-xl border ${accent.ring} ${accent.soft} ${accent.text}`}>
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {project.label} · {project.year}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-1 text-sm text-cyan-300/90">{project.role}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                    {project.tech.length > 3 && <li className="chip">+{project.tech.length - 3}</li>}
                  </ul>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{project.summary}</p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(project);
                    }}
                    aria-label={`View details for ${project.title}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-slate-200 transition-colors group-hover:text-cyan-300"
                  >
                    View Project <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="panel mt-2 p-8 text-center text-ink-soft">
          No projects match "<span className="text-white">{query}</span>".
        </p>
      )}

      <Modal open={selected !== null} onClose={close} label={selected?.title ?? "Project details"} className="max-w-2xl">
        {selected && (
          <div className="p-6 sm:p-8">
            <span className="font-mono text-xs text-slate-500">
              {selected.label} · {selected.year}
            </span>
            <h3 className="mt-2 pr-12 text-2xl font-bold">{selected.title}</h3>
            <p className="mt-1 text-cyan-300/90">{selected.role}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{selected.summary}</p>

            <h4 className="mt-7 font-mono text-xs tracking-widest text-slate-500 uppercase">Highlights</h4>
            <ul className="mt-3 space-y-2.5">
              {selected.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-slate-300">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-blue-500/15 text-cyan-300">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <h4 className="mt-7 font-mono text-xs tracking-widest text-slate-500 uppercase">Built with</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {selected.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-line pt-6">
              <ProjectLinks project={selected} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
