import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'internship-1',
    type: 'internship',
    title: 'Software Development Intern',
    organization: 'Tech Solutions Inc.',
    location: 'Makati City, Philippines',
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    description:
      'Assisted in developing and maintaining web applications using React and Node.js in an agile team environment.',
    achievements: [
      'Built responsive UI components used across 3 client projects',
      'Participated in code reviews and sprint planning sessions',
      'Reduced page load time by 20% through image optimization',
    ],
  },
  {
    id: 'ojt-1',
    type: 'ojt',
    title: 'On-the-Job Training — IT Support',
    organization: 'Metro University IT Department',
    location: 'Quezon City, Philippines',
    startDate: 'Jan 2025',
    endDate: 'Mar 2025',
    description:
      'Provided technical support and assisted in maintaining university IT infrastructure and student portal systems.',
    achievements: [
      'Resolved 50+ student and faculty support tickets',
      'Documented troubleshooting procedures for common issues',
      'Assisted in deploying system updates during maintenance windows',
    ],
  },
  {
    id: 'freelance-1',
    type: 'freelance',
    title: 'Freelance Web Developer',
    organization: 'Self-employed',
    location: 'Remote',
    startDate: '2024',
    endDate: 'Present',
    description:
      'Designed and developed websites for small businesses and student organizations.',
    achievements: [
      'Delivered 4 client websites on time and within budget',
      'Implemented responsive designs with modern CSS frameworks',
      'Maintained ongoing support and feature updates for clients',
    ],
  },
  {
    id: 'volunteer-1',
    type: 'volunteer',
    title: 'Tech Workshop Facilitator',
    organization: 'CS/IT Student Organization',
    location: 'University Campus',
    startDate: 'Sep 2024',
    endDate: 'Present',
    description:
      'Led peer-led workshops on web development basics, Git, and mobile app prototyping.',
    achievements: [
      'Conducted 6 workshops with 30+ participants each',
      'Created open-source learning materials for beginners',
      'Mentored juniors on their first programming projects',
    ],
  },
  {
    id: 'leadership-1',
    type: 'leadership',
    title: 'Project Team Lead',
    organization: 'Capstone Development Team',
    location: 'University',
    startDate: 'Jan 2026',
    endDate: 'Present',
    description:
      'Leading a team of 4 developers in building the Mixie educational mobile game as a capstone project.',
    achievements: [
      'Coordinated sprint planning and task delegation',
      'Established Git workflow and coding standards for the team',
      'Presented project milestones to faculty advisors',
    ],
  },
];
