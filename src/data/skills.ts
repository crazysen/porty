import {
  siCss,
  siDart,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMysql,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  type SimpleIcon,
} from "simple-icons";

export type Skill = {
  name: string;
  icon?: SimpleIcon;
  note: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: siJavascript, note: "Web & mobile" },
      { name: "Dart", icon: siDart, note: "Flutter apps" },
      { name: "Python", icon: siPython, note: "Scripting" },
      { name: "HTML", icon: siHtml5, note: "Markup" },
      { name: "CSS", icon: siCss, note: "Styling" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js", icon: siReact, note: "UI library" },
      { name: "Tailwind CSS", icon: siTailwindcss, note: "Styling" },
      { name: "HTML/CSS", icon: siHtml5, note: "Layouts" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "Flutter", icon: siFlutter, note: "Cross-platform" },
      { name: "Dart", icon: siDart, note: "Language" },
      { name: "React Native", icon: siReact, note: "Cross-platform" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    skills: [
      { name: "MySQL", icon: siMysql, note: "Relational DB" },
      { name: "Supabase", icon: siSupabase, note: "Backend as a service" },
      { name: "Firebase", icon: siFirebase, note: "Backend as a service" },
      { name: "Laravel", icon: siLaravel, note: "REST APIs" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", icon: siGit, note: "Version control" },
      { name: "GitHub", icon: siGithub, note: "Collaboration" },
      { name: "VS Code", note: "Editor" },
      { name: "Figma", icon: siFigma, note: "UI design" },
    ],
  },
];
