import type { ContactInfo, SocialLink, Stat, TimelineItem } from '@/types';

export const profile = {
  name: 'Jensen Manalo',
  role: 'Information Technology Student',
  tagline: 'Building thoughtful digital experiences through code and design.',
  bio: `I'm an Information Technology student passionate about mobile application development, web development, and UI/UX design. I enjoy turning complex problems into elegant, user-centered solutions while continuously learning new technologies.`,
  careerObjective: `To secure internships and junior software developer opportunities where I can contribute to meaningful projects, grow under experienced mentors, and apply my skills in mobile and web development.`,
  typewriterStrings: [
    'Mobile Application Development',
    'Web Development',
    'UI/UX Design',
    'Software Development',
  ],
  resumeUrl: '/resume.pdf',
  image: '/profile-placeholder.svg',
};

export const contact: ContactInfo = {
  email: 'jensen.manalo@email.com',
  phone: '+63 912 345 6789',
  location: 'Metro Manila, Philippines',
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/jensenmanalo',
    icon: 'simple-icons:github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/jensenmanalo',
    icon: 'simple-icons:linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:jensen.manalo@email.com',
    icon: 'lucide:mail',
  },
];

export const stats: Stat[] = [
  { label: 'Projects Completed', value: 8, suffix: '+' },
  { label: 'Technologies Learned', value: 20, suffix: '+' },
  { label: 'Certifications', value: 3, suffix: '+' },
  { label: 'Years Learning', value: 3, suffix: '+' },
];

export const academicTimeline: TimelineItem[] = [
  {
    year: '2022',
    title: 'Started BS Information Technology',
    description: 'Began formal IT studies with focus on software development fundamentals.',
  },
  {
    year: '2023',
    title: 'Mobile Development Focus',
    description: 'Dived into React Native and Expo for cross-platform mobile applications.',
  },
  {
    year: '2024',
    title: 'Capstone & Internship Prep',
    description: 'Built full-stack projects and prepared portfolio for industry opportunities.',
  },
  {
    year: '2026',
    title: 'Expected Graduation',
    description: 'Completing degree with capstone project and industry-ready portfolio.',
  },
];

export const interests = [
  'Mobile app architecture',
  'Responsive web design',
  'User experience research',
  'Clean code practices',
  'Open source contribution',
];
