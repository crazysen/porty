import type { Accent } from "./accents";

export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  accent: Accent;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "IT Helper",
    organization: "Wedding Fare",
    location: "SMX, Manila",
    period: "March 2024 - May 2024",
    accent: "peach",
    points: [
      "Assisted with setting up IT equipment and preparing the event area.",
      "Helped ensure that the equipment was properly arranged and ready for use.",
    ],
  },
  {
    role: "IT Helper / IT Assistant (OJT)",
    organization: "School Office",
    location: "Tagaytay, Cavite",
    period: "June 2023 - July 2023",
    accent: "sky",
    points: [
      "Assisted in creating and preparing student identification cards (IDs).",
      "Organized, updated, and arranged school files and documents.",
    ],
  },
];
