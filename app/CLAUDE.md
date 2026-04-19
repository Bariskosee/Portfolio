# Barış Köse — Personal Portfolio Website

## Project Overview

This is a personal portfolio website for **Barış Köse**, a third-year Software Engineering student at Istanbul Aydın University (currently on Erasmus+ exchange at Universidad de Alicante, Spain). The long-term goal is a funded master's in Germany (TU Darmstadt primary, TU Berlin reach, KIT safety) around 2027–2028, followed by an international career in distributed systems and AI/ML.

The website is inspired by beyzadoguc.com — a minimal, warm, pixel-art-meets-modern-serif aesthetic — but is **not a direct copy**. We want the same spirit (cream background, pixel art character as the hero visual, elegant serif display typography, popup-style About modal) with our own identity (dark forest green accent color instead of pink, modern Fraunces serif instead of decorative serif, developer/engineer framing instead of musician/artist).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (with `@theme inline` config in `globals.css`)
- **Fonts:** Fraunces (serif, via `next/font/google`), Geist (sans)
- **Deployment target:** Vercel (future)
- **Node:** v22.15.0 (user's local)

## Project Structure (expected)

```
baris-portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page (hero + projects + collabs)
│   ├── globals.css         # Tailwind + CSS variables + animations
│   └── components/
│       └── AboutModal.tsx  # About popup
├── public/
│   ├── baris-idle.png      # Full-body pixel art character sprite
│   ├── baris-portrait.png  # Framed dialog-box style portrait
│   └── favicon.png         # Space invader style pixel icon
├── package.json
├── tsconfig.json
├── next.config.ts
└── CLAUDE.md               # This file
```

## Design System

### Color Palette (Warm Terminal)

All colors are defined as CSS variables in `app/globals.css` under `:root`, then exposed to Tailwind via `@theme inline`.

```css
/* Backgrounds */
--bg-primary:   #F4EEE0   /* Main cream — matches character's pullover */
--bg-secondary: #EBE3D1   /* Darker cream — card surfaces */
--bg-modal:     #FBF8F1   /* Lightest cream — modal inner background */

/* Text */
--text-primary:   #1A1D2E   /* Soft dark navy */
--text-secondary: #5A6077   /* Blue-grey body text */
--text-muted:     #8A8FA0   /* Light grey for labels/dates */

/* Accent — Deep Forest Green (signature color) */
--accent:      #2D5F4C   /* Primary — buttons, links, highlights */
--accent-hover:#3A7A62   /* Hover state */
--accent-soft: #D4E4DC   /* Soft tinted backgrounds */

/* Special */
--highlight: #C8935F     /* Warm rust — rare accent for special details */
```

Tailwind class mappings (via `@theme inline`):
- `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-modal`
- `text-text-primary`, `text-text-secondary`, `text-text-muted`
- `text-accent`, `bg-accent`, `border-accent`, `bg-accent-soft`

### Typography

- **Display / headings:** `font-serif` → Fraunces (variable font; use `font-light` for hero, `italic` for section labels like "Projects")
- **Body / UI:** `font-sans` → Geist
- **Hero sizing:** `text-7xl md:text-8xl lg:text-9xl` with `leading-[0.9]`
- **Section headings:** `text-5xl md:text-6xl italic`
- **Body:** `text-base` to `text-lg`, line-height relaxed

### Motion / Animation

- Character sprite has a gentle `character-float` CSS animation (`translateY(0 → -8px → 0)` on a 4s loop) — subtle life, not distracting.
- Modal opens with `modalFadeIn` (scale 0.95 → 1, opacity 0 → 1, 0.3s).
- Backdrop fades in with `backdropFadeIn` (0.3s).
- Project cards on hover: `-translate-y-1` + border color transition to `accent`.
- **Pixel art images must use `.pixel-art` class** — sets `image-rendering: pixelated` to preserve crisp pixel edges. Never let pixel art get smoothed/blurred.

## Content (Canonical Copy)

### Hero

- Eyebrow: `SOFTWARE ENGINEER · ISTANBUL` (uppercase, tracking-widest, muted)
- Title: **Barış** / *Köse* (italic on "Köse", colored `text-accent`)
- Subtitle: "Building distributed systems and exploring the intersection of AI/ML and scalable infrastructure."

### About Modal

Title: **Hi, I'm Barış.**

Paragraphs (three):

> I'm a software engineering student based in Istanbul with a fascination for systems that scale and machines that learn. I'm currently in my third year at Istanbul Aydın University, fresh off an Erasmus semester at Universidad de Alicante.

> My work lives at the intersection of **distributed systems** and **AI/ML** — I've built event-driven microservices handling thousands of events per second, and NLP chatbots that actually understand Turkish. When I'm not debugging production code, I'm probably solving LeetCode problems, playing tennis, or rewatching Mindhunter for the fourth time.

> I've spent two summers working in the US, one semester in Spain, and I'm aiming for a master's in Germany next. I believe great engineering comes from curiosity, long walks, and occasional time zone changes.

Highlight "distributed systems" and "AI/ML" inline with `text-accent font-medium`.

Social links at the bottom (separated by ` · ` or flex gap):
- Email: `kosebaris279@gmail.com`
- LinkedIn: `https://linkedin.com/in/barisskose/`
- GitHub: `https://github.com/Bariskosee`

### Projects (3 cards, 3-column grid on desktop)

1. **ev-charging-simulation**
   - Description: "19-microservice event-driven EV charging platform. 10k+ events/sec with Kafka."
   - Stack: `Python` · `FastAPI` · `Kafka` · `Docker` · `Redis`
   - Link: `https://github.com/Bariskosee/ev-charging-simulation`

2. **MefapexChatBox**
   - Description: "Turkish NLP chatbot with BERT intent classification. 85%+ accuracy, production-ready."
   - Stack: `PyTorch` · `BERT` · `FastAPI` · `Redis` · `WebSocket`
   - Link: `https://github.com/Bariskosee/MefapexChatBox`

3. **DataFelix**
   - Description: "Full-stack movie catalog showcasing Spring Boot backend architecture."
   - Stack: `Java 17` · `Spring Boot` · `Spring Security`
   - Link: `https://github.com/Bariskosee/DataFelix`

Each card: `bg-bg-modal`, rounded-2xl, 1px border, `hover:border-accent hover:-translate-y-1`, shadow-sm → shadow-md on hover, project title in `font-serif text-2xl`, description in `text-text-secondary text-sm`, stack chips in `bg-accent-soft text-accent rounded-md`.

### Collaborations Strip

Single line, centered, muted, separated by `·`:

```
Mefapex Technology · Turkcell · Google YZTA · Istanbul Aydın University · Universidad de Alicante · BTK Akademi
```

Heading above: **"Collaborations I Have Done"** in `font-serif italic text-3xl text-text-secondary`.

### Footer

Single line: `© 2026 Barış Köse · Made with care in Istanbul`

## Layout Conventions

- Header: `fixed top-0`, `z-40`, with ABOUT button (left) and GitHub link (right).
- Hero: `min-h-screen` flex-centered, two-column grid on desktop (`lg:grid-cols-[1fr_auto]`), stacks on mobile.
- Character sprite container: `w-[280px] h-[420px]`, `relative`, uses `next/image` with `fill` + `object-contain`.
- Max content width: `max-w-6xl mx-auto`.
- Section padding: `py-24 px-8`.
- Modal: centered, `max-w-4xl`, 2-column grid `[280px_1fr]` on desktop, stacks on mobile.

## About Modal — Interaction Rules

- Opens via ABOUT button in header (state lifted to `app/page.tsx`).
- Uses `"use client"` directive (needs `useState`).
- ESC key closes the modal.
- Clicking the backdrop closes it (but clicks inside the modal content do NOT close — use `e.stopPropagation()`).
- Body scroll is locked while modal is open (`document.body.style.overflow = "hidden"`).
- Close button (✕) in the top-right of the right-side content panel.

## What NOT to Change Without Asking

- The character sprite's `.pixel-art` class — never remove it, never use `<img>` with smoothing filters on pixel art.
- The color palette values — they're tuned to match the character's cream pullover and navy jeans.
- The "Köse" italic + accent color styling — it's the signature moment of the hero.
- The overall structure (single page, one modal, three sections) — we deliberately chose minimal over elaborate.

## What's Welcome to Improve

- Responsive breakpoints and mobile layout refinement.
- Accessibility: aria labels, focus management inside the modal, keyboard nav for project cards.
- Performance: image optimization, font subsetting, lazy loading for offscreen sections.
- SEO: metadata in `app/layout.tsx`, Open Graph tags (OG image will be added later).
- Nice-to-haves: scroll-triggered fade-ins (Framer Motion ok), 404 page, `/projects/[slug]` detail pages (future).

## Development Workflow

### Commands

```bash
npm run dev      # Start dev server on http://localhost:3000 (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint check
```

### Conventions

- TypeScript strict mode; avoid `any`. Prefer explicit prop interfaces.
- Server Components by default; only add `"use client"` when a component uses state, effects, or browser APIs.
- Use `next/image` for all images (especially the sprite and portrait) — never raw `<img>`.
- Keep components small. If a section grows beyond ~80 lines, consider extracting it.
- Commit messages: imperative, under 72 chars (e.g., "Add About modal close-on-escape").

### When You're Unsure

Ask clarifying questions before making large structural changes. For small fixes (typos, a11y, responsive tweaks, minor styling) just make them.

## Long-Term Roadmap (not this sprint)

- Add a detailed `/resume` or `/cv` page with downloadable PDF.
- Add `/projects/[slug]` detail pages with full case studies.
- Add blog (`/blog`) using MDX — write about distributed systems, Erasmus, job search, grad school prep.
- Add TR/EN language toggle (i18n).
- Add Plausible or Vercel Analytics.
- Add a 404 page featuring the character in a "lost" pose.

## Author & Contact

Barış Köse — kosebaris279@gmail.com — Istanbul, Turkey
