export type Accent = "lavender" | "mint" | "peach" | "sky" | "butter";

export const accentClasses: Record<Accent, { soft: string; text: string; ring: string }> = {
  lavender: { soft: "bg-violet-500/10", text: "text-violet-300", ring: "border-violet-400/30" },
  mint: { soft: "bg-emerald-500/10", text: "text-emerald-300", ring: "border-emerald-400/30" },
  peach: { soft: "bg-orange-500/10", text: "text-orange-300", ring: "border-orange-400/30" },
  sky: { soft: "bg-sky-500/10", text: "text-sky-300", ring: "border-sky-400/30" },
  butter: { soft: "bg-amber-500/10", text: "text-amber-300", ring: "border-amber-400/30" },
};
