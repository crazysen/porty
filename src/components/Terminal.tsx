import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { skillCategories } from "../data/skills";

type Line = { kind: "cmd"; text: string } | { kind: "out"; content: ReactNode };

const skillDirs: [string, string][] = [
  ["frontend/", "react  tailwind  html-css"],
  ["mobile/", "flutter  dart  react-native"],
  ["backend/", "mysql  supabase  firebase"],
  ["tools/", "git  github  vscode"],
];

const commands: [string, string][] = [
  ["help", "show this list"],
  ["about", "who I am"],
  ["skills", "my tech stack"],
  ["projects", "things I've built"],
  ["certs", "my certifications"],
  ["contact", "how to reach me"],
  ["resume", "download my resume"],
  ["clear", "clear the screen"],
];

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        goTo(id);
      }}
      className="text-cyan-300 underline-offset-4 hover:underline"
    >
      {children}
    </button>
  );
}

const status = (
  <span>
    <span className="text-emerald-400">●</span> Open to internships & OJT ·{" "}
    <span className="text-slate-300">{profile.role}</span>
  </span>
);

const skillTree = (
  <span className="block">
    {skillDirs.map(([dir, items]) => (
      <span key={dir} className="block whitespace-pre">
        <span className="text-slate-600">drwxr-xr-x </span>
        <span className="text-blue-400">{dir.padEnd(11)}</span>
        <span className="text-emerald-300">{items}</span>
      </span>
    ))}
  </span>
);

const intro: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", content: <span className="text-slate-300">jensen-manalo</span> },
  { kind: "cmd", text: "cat status.txt" },
  { kind: "out", content: status },
  { kind: "cmd", text: "ls -la skills/" },
  { kind: "out", content: skillTree },
];

function run(raw: string): { output?: ReactNode; clear?: boolean } {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case "":
      return {};
    case "help":
      return {
        output: (
          <span className="block">
            {commands.map(([name, desc]) => (
              <span key={name} className="block whitespace-pre">
                <span className="text-cyan-300">{name.padEnd(10)}</span>
                <span className="text-slate-400">{desc}</span>
              </span>
            ))}
          </span>
        ),
      };
    case "about":
    case "whoami":
      return {
        output: (
          <span className="text-slate-300">
            {profile.name}, {profile.education.degree} student at {profile.education.school}. I build web and mobile
            apps with a focus on {profile.focus.join(", ")}.
          </span>
        ),
      };
    case "status":
    case "cat status.txt":
      return { output: status };
    case "skills":
    case "ls skills":
    case "ls -la skills/":
      return {
        output: (
          <span className="block">
            {skillCategories.map((c) => (
              <span key={c.id} className="block">
                <span className="text-blue-400">{c.label}: </span>
                <span className="text-emerald-300">{c.skills.map((s) => s.name).join(", ")}</span>
              </span>
            ))}
          </span>
        ),
      };
    case "projects":
    case "ls projects":
    case "ls projects/":
      return {
        output: (
          <span className="block">
            {projects.map((p) => (
              <span key={p.slug} className="block">
                <SectionLink id="projects">{p.title}</SectionLink>
                <span className="text-slate-500"> · {p.role}</span>
              </span>
            ))}
            <span className="block text-slate-500">Click a name to jump to Projects.</span>
          </span>
        ),
      };
    case "certs":
    case "certifications":
    case "ls certifications/":
      return {
        output: (
          <span className="block">
            {certifications.map((c) => (
              <span key={c.title} className="block">
                <SectionLink id="certifications">{c.title}</SectionLink>
                <span className="text-slate-500"> · {c.issuer}</span>
              </span>
            ))}
          </span>
        ),
      };
    case "contact":
      return {
        output: (
          <span className="block">
            <span className="block">
              <span className="text-blue-400">email    </span>
              <a href={`mailto:${profile.email}`} className="text-cyan-300 hover:underline">
                {profile.email}
              </a>
            </span>
            <span className="block">
              <span className="text-blue-400">phone    </span>
              <a href={profile.phoneHref} className="text-cyan-300 hover:underline">
                {profile.phone}
              </a>
            </span>
            <span className="block">
              <span className="text-blue-400">linkedin </span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                in/{profile.linkedinHandle}
              </a>
            </span>
            <span className="block">
              <span className="text-blue-400">github   </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
                {profile.githubHandle}
              </a>
            </span>
          </span>
        ),
      };
    case "resume": {
      const link = document.createElement("a");
      link.href = profile.resume;
      link.download = "";
      link.click();
      return { output: <span className="text-emerald-300">Downloading Jensen_Manalo_Resume.pdf...</span> };
    }
    case "ls":
      return {
        output: (
          <span className="whitespace-pre">
            <span className="text-blue-400">skills/  projects/  certifications/  </span>
            <span className="text-slate-300">resume.pdf  status.txt</span>
          </span>
        ),
      };
    case "clear":
      return { clear: true };
    default:
      return {
        output: (
          <span className="text-rose-300">
            command not found: {raw.trim()}. Type <span className="text-cyan-300">help</span> to see commands.
          </span>
        ),
      };
  }
}

function Prompt() {
  return <span className="text-cyan-300">$</span>;
}

export default function Terminal() {
  const reduceMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [entries, setEntries] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const done = lineIndex >= intro.length;

  useEffect(() => {
    if (reduceMotion) {
      setLineIndex(intro.length);
      return;
    }
    if (done) return;

    const line = intro[lineIndex];
    if (line.kind === "out") {
      const id = window.setTimeout(() => setLineIndex((i) => i + 1), 180);
      return () => window.clearTimeout(id);
    }
    if (charIndex < line.text.length) {
      const id = window.setTimeout(() => setCharIndex((c) => c + 1), 50);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 300);
    return () => window.clearTimeout(id);
  }, [lineIndex, charIndex, done, reduceMotion]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lineIndex, charIndex, entries]);

  const focusInput = () => {
    if (!done) setLineIndex(intro.length);
    inputRef.current?.focus({ preventScroll: true });
  };

  const submit = () => {
    const raw = input;
    const result = run(raw);
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setHistoryIndex(-1);
    setInput("");

    if (result.clear) {
      setShowIntro(false);
      setEntries([]);
      return;
    }
    setEntries((e) => [
      ...e,
      { kind: "cmd", text: raw },
      ...(result.output ? [{ kind: "out" as const, content: result.output }] : []),
    ]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (event.key === "Tab") {
      const matches = commands.map(([name]) => name).filter((name) => name.startsWith(input.trim().toLowerCase()));
      if (input.trim() && matches.length === 1) {
        event.preventDefault();
        setInput(matches[0]);
      }
    }
  };

  const typing = !done && intro[lineIndex].kind === "cmd";
  const visibleIntro = showIntro ? intro.slice(0, lineIndex) : [];

  const renderLine = (line: Line, key: string) =>
    line.kind === "cmd" ? (
      <p key={key} className="text-slate-100">
        <Prompt /> {line.text}
      </p>
    ) : (
      <div key={key} className="mb-1 text-slate-400">
        {line.content}
      </div>
    );

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-night/90 shadow-2xl shadow-blue-900/40 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/90" />
          <span className="size-3 rounded-full bg-amber-400/90" />
          <span className="size-3 rounded-full bg-emerald-400/90" />
          <span className="ml-3 font-mono text-xs text-slate-400">jensen@portfolio: ~</span>
        </div>
        <div
          ref={bodyRef}
          onClick={focusInput}
          role="log"
          aria-label="Interactive terminal. Type help to see commands."
          className="h-[23.5rem] cursor-text overflow-y-auto p-5 font-mono text-[13px] leading-relaxed [scrollbar-color:rgb(51_65_85)_transparent] [scrollbar-width:thin]"
        >
          {visibleIntro.map((line, i) => renderLine(line, `intro-${i}`))}
          {typing && showIntro && (
            <p className="text-slate-100">
              <Prompt /> {(intro[lineIndex] as { text: string }).text.slice(0, charIndex)}
              <span className="animate-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-300" />
            </p>
          )}
          {entries.map((line, i) => renderLine(line, `entry-${i}`))}
          {done && (
            <label className="flex items-center gap-2 text-slate-100">
              <Prompt />
              <span className="relative flex-1">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Type a terminal command"
                  className="w-full bg-transparent text-slate-100 caret-cyan-300 outline-none"
                />
                {!focused && !input && (
                  <span className="animate-blink pointer-events-none absolute top-1/2 left-0 h-4 w-2 -translate-y-1/2 bg-cyan-300" />
                )}
              </span>
            </label>
          )}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-xs text-slate-500">
        Click the terminal and type <span className="text-cyan-300">help</span> to explore
      </p>
    </div>
  );
}
