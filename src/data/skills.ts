import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    skills: [
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Astro', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Bootstrap', level: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 82 },
      { name: 'Express', level: 78 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', level: 88 },
      { name: 'Expo', level: 85 },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'Firebase', level: 75 },
      { name: 'MongoDB', level: 72 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 82 },
      { name: 'Postman', level: 80 },
    ],
  },
];
