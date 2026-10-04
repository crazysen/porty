import type { ContactInfo, SocialLink, Stat, TimelineItem } from '@/types';

export const profile = {
  name: 'Shaeirra Jae A. Jimenez',
  role: 'BS Information Technology Student',
  tagline: 'Full-stack developer for mobile and web applications.',
  bio: `BS Information Technology student specializing in mobile and web applications, with hands-on experience in full-stack development for both front-end and back-end systems. Skilled in structuring application logic, solving technical problems, and turning requirements into working software.`,
  careerObjective: `To contribute as a full-stack developer on mobile and web systems, applying strong system logic and problem-solving while continuing to learn from real projects.`,
  typewriterStrings: [
    'Full-Stack Development',
    'Mobile Applications',
    'Web Applications',
    'System Logic & Problem Solving',
  ],
  resumeUrl: '/resume.pdf',
  image: '/profile-placeholder.svg',
};

export const contact: ContactInfo = {
  email: 'jimenezshaei13@gmail.com',
  phone: '+63 926 131 5525',
  location: 'Maragondon, Cavite, 4112',
};

export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:jimenezshaei13@gmail.com',
    icon: 'lucide:mail',
  },
  {
    name: 'Phone',
    url: 'tel:+639261315525',
    icon: 'lucide:phone',
  },
];

export const stats: Stat[] = [
  { label: 'Featured Projects', value: 2 },
  { label: 'Certifications', value: 4 },
  { label: 'Technical Skills', value: 9 },
];

export const academicTimeline: TimelineItem[] = [
  {
    year: '2025',
    title: 'Database Management System Certification',
    description: 'Earned a Certiport certification in database management systems.',
  },
  {
    year: '2026',
    title: 'AI and Cybersecurity Certifications',
    description:
      'Completed Anthropic AI Fluency and Claude Code certifications, plus a Certiport Cybersecurity certification.',
  },
  {
    year: '2026',
    title: 'Capstone — LegalLink',
    description:
      'Project manager and full-stack developer for a law firm online consultation system in Silang, Cavite.',
  },
];

export const interests = [
  'Mobile applications',
  'Web applications',
  'Full-stack development',
  'System logic',
  'Problem solving',
];
