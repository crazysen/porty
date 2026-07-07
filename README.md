# Jensen Manalo — Portfolio

A modern, production-ready portfolio website built with **Astro**, **React**, and **Tailwind CSS**. Designed for IT students showcasing technical skills, projects, and professional experience.

## Tech Stack

- [Astro](https://astro.build/) — Static site generation with islands architecture
- [React](https://react.dev/) — Interactive UI components
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Formspree](https://formspree.io/) — Contact form handling

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example env file and add your Formspree form ID:

```bash
cp .env.example .env
```

Edit `.env`:

```
PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

To get a Formspree ID:
1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Copy the form ID from your form endpoint URL

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

### Production Build

```bash
npm run build
npm run preview
```

## Customizing Content

All portfolio content lives in `src/data/` — no component changes needed:

| File | Contents |
|------|----------|
| `profile.ts` | Name, bio, social links, stats |
| `skills.ts` | Skill categories and proficiency levels |
| `projects.ts` | Featured projects |
| `experience.ts` | Work and leadership experience |
| `education.ts` | University and coursework |
| `certifications.ts` | Certificates |
| `navigation.ts` | Nav and footer links |

### Replacing Placeholder Assets

| Asset | Location |
|-------|----------|
| Profile photo | Replace `public/profile-placeholder.svg` |
| Resume PDF | Replace `public/resume.pdf` |
| Project screenshots | Replace files in `public/projects/` |
| Certificate images | Replace files in `public/certificates/` |

Update image paths in the corresponding data files if filenames change.

## Deployment

### Vercel

```bash
npm run build
npx vercel --prod
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) — Astro is auto-detected.

Set `PUBLIC_FORMSPREE_ID` in Vercel environment variables.

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Or connect your GitHub repo at [netlify.com](https://netlify.com).

Set `PUBLIC_FORMSPREE_ID` in Netlify environment variables.

## Project Structure

```
src/
├── assets/          # Static assets (optional)
├── components/      # UI and section components
├── data/            # Editable content (start here)
├── layouts/         # Page layouts
├── pages/           # Routes
├── styles/          # Global CSS
├── types/           # TypeScript interfaces
└── utils/           # Helper functions
```

## License

MIT
