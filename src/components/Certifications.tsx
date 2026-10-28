import { useCallback, useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from "lucide-react";
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

export default function Certifications() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Certification | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const go = (step: number) => setActive((a) => (a + step + count) % count);

  return (
    <>
      <div className="relative overflow-hidden py-4">
        <div className="grid justify-items-center">
          {certifications.map((cert, i) => {
            const offset = offsetFrom(active, i);
            const isActive = offset === 0;
            const accent = accentClasses[cert.accent];
            return (
              <motion.article
                key={cert.title}
                className={`panel col-start-1 row-start-1 w-[80%] max-w-sm overflow-hidden select-none ${
                  isActive ? "cursor-grab border-blue-400/40 active:cursor-grabbing" : "cursor-pointer"
                }`}
                animate={{
                  x: `${offset * 92}%`,
                  scale: isActive ? 1 : 0.84,
                  opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.45,
                  zIndex: isActive ? 2 : 1,
                }}
                style={{
                  boxShadow: isActive ? "0 30px 60px -20px rgb(59 130 246 / 0.45)" : undefined,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                onClick={() => (isActive ? undefined : setActive(i))}
                aria-hidden={!isActive}
              >
                <button
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => isActive && setSelected(cert)}
                  aria-label={`View ${cert.title} certificate`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-white/[0.03]"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    draggable={false}
                    className="pointer-events-none size-full object-contain p-4"
                  />
                  {isActive && (
                    <span className="absolute inset-0 grid place-items-center bg-night/0 opacity-0 transition-all duration-300 group-hover:bg-night/50 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-navy px-4 py-2 text-sm font-medium text-white">
                        <ZoomIn size={16} /> View full size
                      </span>
                    </span>
                  )}
                </button>

                <div className="border-t border-line p-5 text-center">
                  <span className={`mx-auto mb-3 grid size-9 place-items-center rounded-lg border ${accent.ring} ${accent.soft} ${accent.text}`}>
                    <BadgeCheck size={18} />
                  </span>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{cert.issuer}</p>
                  <p className="mt-2 font-mono text-xs text-slate-500">
                    {cert.date}
                    {cert.expires && <> · Expires {cert.expires}</>}
                  </p>
                  {isActive && cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                    >
                      Verify on Credly <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} className="icon-btn" aria-label="Previous certificate">
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {certifications.map((cert, i) => (
            <button
              key={cert.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${cert.title}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-linear-to-r from-blue-500 to-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="icon-btn" aria-label="Next certificate">
          <ChevronRight size={18} />
        </button>
      </div>

      <Modal open={selected !== null} onClose={close} label={selected?.title ?? "Certificate"} className="max-w-3xl p-4 sm:p-6">
        {selected && (
          <>
            <img
              src={selected.image}
              alt={`${selected.title} certificate`}
              className="max-h-[75vh] w-full rounded-xl bg-white/[0.03] object-contain"
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
