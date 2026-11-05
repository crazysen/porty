import type { Accent } from "./accents";

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  expires?: string;
  image: string;
  verifyUrl?: string;
  accent: Accent;
};

export const certifications: Certification[] = [
  {
    title: "IT Specialist - Databases",
    issuer: "Certiport, a Pearson VUE business",
    date: "September 30, 2026",
    expires: "September 30, 2031",
    image: "/certs/it-specialist-databases.jpg",
    verifyUrl:
      "https://www.credly.com/badges/bfba7d90-77d8-4002-ad77-43832e508d6b/public_url",
    accent: "sky",
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco Networking Academy & JS Institute",
    date: "November 5, 2026",
    image: "/certs/html-essentials.png",
    verifyUrl:
      "https://www.credly.com/badges/c666c890-dabc-4006-8d26-104b2ad1a192/public_url",
    accent: "lavender",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "April 19, 2026",
    image: "/certs/claude-code.jpg",
    accent: "mint",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "April 19, 2026",
    image: "/certs/ai-fluency.jpg",
    accent: "butter",
  },
];
