import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'legallink',
    title: 'LegalLink',
    description:
      'Capstone project: a law firm online consultation system. Served as project manager and full-stack developer, and prepared the technical paper.',
    features: [
      'Project management from planning through documentation',
      'Front-end and back-end development',
      'Technical paper',
      'Online consultation and legal services for a law firm in Silang, Cavite',
    ],
    technologies: ['Full-Stack', 'Mobile', 'Web', 'Database'],
    category: 'fullstack',
    image: '/projects/law-consultation.svg',
  },
  {
    id: 'amora-flora',
    title: 'Amora Flora',
    description:
      'Freelance full-stack work on an e-commerce mobile and web application, covering the customer-facing store and the logic behind products and orders.',
    features: [
      'Front-end and back-end development',
      'Product browsing and ordering',
      'Application logic and database connection',
      'Client revisions through final delivery',
    ],
    technologies: ['Full-Stack', 'Mobile', 'Web', 'E-commerce'],
    category: 'fullstack',
    image: '/projects/portfolio.svg',
  },
];
