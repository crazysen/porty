import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'technical',
    title: 'Technical',
    skills: [
      { name: 'Flutter', level: 0 },
      { name: 'Java', level: 0 },
      { name: 'Python', level: 0 },
      { name: 'MySQL', level: 0 },
      { name: 'Database Management', level: 0 },
      { name: 'React', level: 0 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Microsoft Word', level: 0 },
      { name: 'Microsoft Excel', level: 0 },
      { name: 'Figma', level: 0 },
    ],
  },
  {
    id: 'language',
    title: 'Language',
    skills: [
      { name: 'Filipino', level: 0 },
      { name: 'English', level: 0 },
    ],
  },
  {
    id: 'personal',
    title: 'Personal Skills',
    skills: [
      { name: 'Fast Learner', level: 0 },
      { name: 'Active Listener', level: 0 },
      { name: 'Goal-Driven', level: 0 },
      { name: 'Determined', level: 0 },
      { name: 'Eager to Learn', level: 0 },
    ],
  },
];
