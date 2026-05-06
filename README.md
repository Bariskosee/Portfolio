# Barış Köse — Portfolio

Personal portfolio site for Barış Köse, a software engineering student focused on distributed systems and AI/ML.

**Live:** [portfolio-three-nu-99.vercel.app](https://portfolio-three-nu-99.vercel.app)

---

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** / TypeScript (strict)
- **Tailwind CSS v4** (CSS-first config via `globals.css`)
- **Framer Motion** — page and section animations
- **Three.js / @react-three/fiber** — 3D particle background
- **Deployed on Vercel**

## Local Setup

```bash
npm install
npm run dev       # http://localhost:3000
```

## Quality Commands

```bash
npm run lint          # ESLint
npm run type-check    # tsc --noEmit
npm run build         # production build
```

## Environment Variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in metadata and sitemap | `https://portfolio-three-nu-99.vercel.app` |

Copy `.env.example` to `.env.local` and fill in any overrides before running locally.

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Single-page home (hero, projects, technologies)
  globals.css         # Tailwind + design tokens (CSS variables)
  components/         # All UI components
lib/
  site.ts             # Shared metadata constants
  social-image.tsx    # OG / Twitter card image generator
public/               # Static assets (sprites, favicon)
```
