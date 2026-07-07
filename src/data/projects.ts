import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'mixie',
    title: 'Mixie Educational Mobile Game',
    description:
      'An interactive educational mobile game designed to make learning engaging for students through gamified quizzes and progress tracking.',
    features: [
      'Gamified quiz mechanics',
      'Progress tracking dashboard',
      'Offline-first gameplay',
      'Animated UI with sound effects',
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    category: 'mobile',
    image: '/projects/mixie.svg',
    githubUrl: 'https://github.com/jensenmanalo/mixie',
    liveUrl: '#',
  },
  {
    id: 'law-consultation',
    title: 'Law Consultation Mobile App',
    description:
      'A mobile application connecting users with legal consultation services, featuring appointment booking and case management.',
    features: [
      'Appointment scheduling',
      'Lawyer profiles & ratings',
      'Secure messaging',
      'Document upload support',
    ],
    technologies: ['React Native', 'Expo', 'Node.js', 'MySQL'],
    category: 'mobile',
    image: '/projects/law-consultation.svg',
    githubUrl: 'https://github.com/jensenmanalo/law-consultation',
    liveUrl: '#',
  },
  {
    id: 'student-management',
    title: 'Student Management System',
    description:
      'A full-stack web application for managing student records, grades, and enrollment with role-based access control.',
    features: [
      'CRUD student records',
      'Grade management',
      'Role-based authentication',
      'Export reports to PDF',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    category: 'fullstack',
    image: '/projects/student-management.svg',
    githubUrl: 'https://github.com/jensenmanalo/student-management',
    liveUrl: '#',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'A modern, performant portfolio website built with Astro and React, showcasing projects and technical skills.',
    features: [
      'Dark/light mode toggle',
      'Glassmorphism design',
      'SEO optimized',
      'Contact form integration',
    ],
    technologies: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
    category: 'web',
    image: '/projects/portfolio.svg',
    githubUrl: 'https://github.com/jensenmanalo/portfolio',
    liveUrl: '#',
  },
];
