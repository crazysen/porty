import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, CalendarDays, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from "lucide-react";
import Modal from "./Modal";
import { certifications, type Certification } from "../data/certifications";
import { accentClasses } from "../data/accents";

const count = certifications.length;

function offsetFrom(active: number, i: number) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

function useIsWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

export default function Certifications() {
  const [active, setActive] = useState(0);
  const previous = useRef(0);
  const [selected, setSelected] = useState<Certification | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const wide = useIsWide();

  const show = (index: number) => {
    previous.current = active;
    setActive(((index % count) + count) % count);
  };

  return (
    <>
      <div className="relative overflow-hidden py-6">
        <div className="grid justify-items-center">
          {certifications.map((cert, i) => {
            const offset = offsetFrom(active, i);
            const jumped = Math.abs(offsetFrom(previous.current, i) - offset) > 1;
            const isActive = offset === 0;
            const visible = isActive || (wide && Math.abs(offset) === 1);
            const accent = accentClasses[cert.accent];
            return (
              <motion.article
                key={cert.title}
                className={`panel col-start-1 row-start-1 flex w-[min(21rem,86vw)] flex-col overflow-hidden select-none ${
                  isActive ? "cursor-grab border-blue-400/40 active:cursor-grabbing" : "cursor-pointer"
                } ${visible ? "" : "pointer-events-none"}`}
                initial={false}
                animate={{
                  x: `${offset * 104}%`,
                  scale: isActive ? 1 : 0.88,
                  opacity: visible ? (isActive ? 1 : 0.4) : 0,
                  zIndex: isActive ? 2 : 1,
                }}
                style={{
                  boxShadow: isActive ? "0 30px 60px -20px rgb(59 130 246 / 0.45)" : undefined,
                }}
                transition={jumped ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) show(active + 1);
                  else if (info.offset.x > 60) show(active - 1);
                }}
                onClick={() => (isActive ? undefined : show(i))}
                aria-hidden={!isActive}
              >
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => isActive && setSelected(cert)}
                  aria-label={`View ${cert.title} certificate`}
                  className="group relative flex h-52 w-full shrink-0 items-center justify-center overflow-hidden bg-linear-to-b from-white/[0.06] to-white/[0.02] p-5"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    draggable={false}
                    loading="lazy"
                    className="pointer-events-none size-full object-contain drop-shadow-[0_10px_25px_rgb(0_0_0/0.45)] transition-transform duration-500 group-hover:scale-105"
                  />
                  {isActive && (
                    <span className="absolute inset-0 grid place-items-center bg-night/0 opacity-0 transition-all duration-300 group-hover:bg-night/50 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-navy px-4 py-2 text-sm font-medium text-white">
                        <ZoomIn size={16} /> View full size
                      </span>
                    </span>
                  )}
                </button>

                <div className="flex flex-1 flex-col items-center border-t border-line p-5 text-center">
                  <span className={`mb-3 grid size-9 place-items-center rounded-lg border ${accent.ring} ${accent.soft} ${accent.text}`}>
                    <BadgeCheck size={18} />
                  </span>
                  <h3 className="flex min-h-12 items-center font-semibold leading-6">
                    <span className="line-clamp-2">{cert.title}</span>
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{cert.issuer}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <CalendarDays size={13} /> {cert.date}
                  </p>
                  <p className="mt-1 min-h-4 font-mono text-xs text-slate-500">
                    {cert.expires ? `Valid until ${cert.expires}` : ""}
                  </p>
                  <div className="mt-auto flex h-9 items-end">
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                      >
                        Verify on Credly <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" onClick={() => show(active - 1)} className="icon-btn" aria-label="Previous certificate">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {certifications.map((cert, i) => (
            <button
              key={cert.title}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show ${cert.title}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-linear-to-r from-blue-500 to-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={() => show(active + 1)} className="icon-btn" aria-label="Next certificate">
          <ChevronRight size={18} />
        </button>
      </div>

      <Modal open={selected !== null} onClose={close} label={selected?.title ?? "Certificate"} className="max-w-3xl p-4 sm:p-6">
        {selected && (
          <>
            <img
              src={selected.image}
              alt={`${selected.title} certificate`}
              className="mx-auto max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <div>
                <p className="font-display text-lg font-semibold text-white">{selected.title}</p>
                <p className="text-sm text-ink-soft">
                  {selected.issuer} · {selected.date}
                </p>
              </div>
              {selected.verifyUrl && (
                <a href={selected.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink size={16} /> Verify
                </a>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
