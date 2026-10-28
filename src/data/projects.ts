import type { Accent } from "./accents";

export type ProjectIcon = "smartphone" | "store" | "scale";

export type Project = {
  slug: string;
  title: string;
  category: "web" | "mobile";
  year: string;
  label: string;
  role: string;
  summary: string;
  highlights: string[];
  tech: string[];
  repo?: string;
  live?: string;
  accent: Accent;
  icon: ProjectIcon;
};

export const projects: Project[] = [
  {
    slug: "saddle-ranch-mobile",
    title: "Saddle Ranch Mobile",
    category: "mobile",
    year: "2026",
    label: "Client Project",
    role: "Lead Mobile Engineer",
    summary:
      "A cross-platform ordering companion app for Saddle Ranch Roadhouse, a multi-branch steakhouse chain in Cavite, with 1:1 feature parity with the restaurant's web platform.",
    highlights: [
      "QR and deep-link dine-in ordering with table session locks and unlock requests to the cashier POS",
      "Embedded AI concierge with live menu prices and one-tap promo codes",
      "PayMongo payments (QRPh, GCash, Maya, cards) for delivery orders",
      "Real-time order tracking with 5-second polling and receipt modals",
      "Voucher validation, Cavite delivery cascades, and an Apple-inspired light UI",
    ],
    tech: ["Flutter", "Dart", "Provider", "Laravel REST API", "PayMongo", "Sanctum"],
    repo: "https://github.com/crazysen/saddle-ranch-mobile-",
    accent: "mint",
    icon: "smartphone",
  },
  {
    slug: "saddle-ranch-web",
    title: "Saddle Ranch Web",
    category: "web",
    year: "2026",
    label: "Client Project",
    role: "Contributor - Authentication & Security",
    summary:
      "An enterprise restaurant platform with customer e-commerce, QR table dining, a cashier point-of-sale, a real-time kitchen display system, and an admin analytics hub.",
    highlights: [
      "Contributed the groundwork for the Email OTP verification module",
      "Contributed the Forgot Password and Reset Password workflows",
      "Platform includes POS with Senior/PWD discounts and a live kitchen display system",
      "QR table ordering with a Call Waiter chime and Cavite delivery fee engine",
    ],
    tech: ["Laravel 11", "React 18", "TypeScript", "Inertia.js", "Tailwind CSS v4", "MySQL"],
    repo: "https://github.com/kidlatpogi/Saddle-Ranch-Web",
    live: "https://saddle-ranch-web.onrender.com/",
    accent: "peach",
    icon: "store",
  },
  {
    slug: "legallink",
    title: "LegalLink",
    category: "web",
    year: "2025 - 2026",
    label: "Capstone",
    role: "Developer",
    summary:
      "An AI-powered legal consultation app for attorney booking, availability management, and client scheduling.",
    highlights: [
      "Attorney booking and availability management",
      "Client scheduling flows",
      "AI assistant chatbot that supports bookings and answers user inquiries",
    ],
    tech: ["React Native", "Supabase", "AI Chatbot"],
    repo: "https://github.com/crazysen/LegalLink",
    accent: "lavender",
    icon: "scale",
  },
];
