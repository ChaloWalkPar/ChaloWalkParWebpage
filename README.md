# Chalo Walk Par

Landing page for **Chalo Walk Par** — हर दिन 30 मिनट · Step Towards Health. An everyday Indian walking, activity-tracking, and community wellness platform.

Live app: [Google Play](https://play.google.com/store/apps/details?id=com.chalowalkpar.app)

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger for scroll animation
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling

## Getting started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check-free production build (output in `dist/`) |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
  components/   Page sections and shared UI (Navbar, HeroSection, PhoneMockup, ...)
  data/         Static content and copy (content.ts)
  index.css     Global styles and design tokens
public/
  assets/       Images, video, and app screenshots served as static files
```

No backend, no API keys, no environment variables are required to run or build this site — it's a static landing page.
