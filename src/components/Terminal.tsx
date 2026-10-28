import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Line = { kind: "cmd" | "out"; text: string };

const script: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "jensen-manalo" },
  { kind: "cmd", text: "cat role.txt" },
  { kind: "out", text: "Web & Mobile Developer · BSIT @ NU Dasmariñas" },
  { kind: "cmd", text: "ls -la skills/" },
  { kind: "out", text: "drwxr-xr-x  frontend/   react  tailwind  html-css" },
  { kind: "out", text: "drwxr-xr-x  mobile/     flutter  dart  react-native" },
  { kind: "out", text: "drwxr-xr-x  backend/    mysql  supabase  firebase" },
  { kind: "out", text: "drwxr-xr-x  tools/      git  github  figma" },
  { kind: "cmd", text: "ls projects/" },
  { kind: "out", text: "saddle-ranch-mobile  saddle-ranch-web  legallink" },
];

export default function Terminal() {
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const done = lineIndex >= script.length;

  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(script.length);
      return;
    }
    if (done) return;

    const line = script[lineIndex];
    if (line.kind === "out") {
      const id = window.setTimeout(() => setLineIndex((i) => i + 1), 180);
      return () => window.clearTimeout(id);
    }
    if (charIndex < line.text.length) {
      const id = window.setTimeout(() => setCharIndex((c) => c + 1), 55);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 350);
    return () => window.clearTimeout(id);
  }, [lineIndex, charIndex, done, reduceMotion]);

  const typing = !done && script[lineIndex].kind === "cmd";

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-night/90 shadow-2xl shadow-blue-900/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/90" />
        <span className="size-3 rounded-full bg-amber-400/90" />
        <span className="size-3 rounded-full bg-emerald-400/90" />
        <span className="ml-3 font-mono text-xs text-slate-400">jensen@portfolio: ~</span>
      </div>
      <div
        className="min-h-[19rem] p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
        aria-label="Terminal introducing Jensen's skills and projects"
        role="img"
      >
        {script.slice(0, lineIndex).map((line, i) =>
          line.kind === "cmd" ? (
            <p key={i} className="text-slate-100">
              <span className="text-cyan-300">$</span> {line.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-slate-400">
              {line.text}
            </p>
          ),
        )}
        {typing && (
          <p className="text-slate-100">
            <span className="text-cyan-300">$</span> {script[lineIndex].text.slice(0, charIndex)}
            <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-300" />
          </p>
        )}
        {done && (
          <p className="text-slate-100">
            <span className="text-cyan-300">$</span>{" "}
            <span className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-cyan-300" />
          </p>
        )}
      </div>
    </div>
  );
}
