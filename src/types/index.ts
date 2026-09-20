export type ProjectCategory = 'mobile' | 'web' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  category: ProjectCategory;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  pageUrl?: string;
  pageLabel?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  type: 'internship' | 'ojt' | 'freelance' | 'volunteer' | 'leadership';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface Education {
  university: string;
  degree: string;
  location: string;
  startYear: string;
  expectedGraduation: string;
  gpa?: string;
  coursework: string[];
  achievements: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
