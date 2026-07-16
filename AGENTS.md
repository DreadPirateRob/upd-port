# Repository Guidelines

## Project Overview

Adrian Garcia's personal portfolio website. Showcases full-stack projects with rich animations, interactive case studies, and a dark/light theme system. No backend — entirely static, client-side rendered data.

## Architecture & Data Flow

**Next.js 15 App Router, JavaScript only (no TypeScript).** All rendering is client-side (`"use client"` on nearly every component). No server actions, no API routes, no external data fetching.

```
src/data/projects/index.js        ← project registry (4 entries, 2 enabled + 2 disabled)
src/data/projects/*.js            ← one file per enabled project (full case study data)
src/data/technologies.js          ← technologiesData lookup object
       │
       ▼
src/app/page.js                   ← homepage: consumes registry array (slug, title, bigImage, etc.)
src/app/projects/[slug]/page.js   ← single dynamic template for ALL project case studies
                                     disabled slugs → notFound()
                                     generateStaticParams → non-disabled slugs only
```

Data shape — project registry entry (`src/data/projects/index.js`):
```js
{
  slug, title, description, challenges,
  technologies,   // string[] — keys into technologiesData
  bigImage,       // URL string — used on homepage card
  disabled?,      // true → "Coming Soon" on homepage, no route
}
```

Full project data file (adds project-page-only fields):
```js
{
  ...registryFields,
  areas,          // string[] — shown as primary Badge chips on project hero
  metadata: { title, description },   // generateMetadata output
  sections: Section[],                // drives the case study body
}
```

Section shape:
```js
{
  heading: string,
  headingAccent?: boolean,        // h2 text-primary
  body?: string | string[],       // **phrase** → <strong className="text-primary">
  image?: { src, alt, aspect? }, // aspect: "video" | "portrait"
  items?: Array<{ label, description } | string>,
  subsections?: Array<{ heading, body?, items? }>,
  footer?: string,
}
```

Theme state flows through `ThemeContext` (React Context), persisted to `localStorage`, applied as a `dark` class on `document.documentElement`.

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages and layouts |
| `src/app/projects/[slug]/` | Single dynamic template for all project case studies |
| `src/components/ui/` | shadcn/ui base components (Button, Card, Badge, Avatar, etc.) |
| `src/components/project/` | Shared project page sections (ProjectLayout, ProjectHero, TechGrid, ContentSection, ProjectCTA) |
| `src/components/animations/` | Framer Motion wrappers (FadeIn, StaggerContainer, HoverEffect, etc.) |
| `src/components/` | Layout components (Navigation, Footer, Timeline, ThemeProvider) |
| `src/data/projects/` | Per-project data files + registry index |
| `src/data/technologies.js` | Shared tech descriptions keyed by name |
| `src/hooks/` | Animation hooks (useAnimations.js) |
| `src/lib/` | Utilities — `cn()` only |
| `public/` | Static assets: project screenshots, SVGs, architecture diagrams |

## Development Commands

```bash
npm run dev      # Next.js dev server with Turbopack (hot reload)
npm run build    # Production build with Turbopack
npm run start    # Serve production build
npm run lint     # ESLint (flat config, extends next/core-web-vitals)
```

No test command — there is no test framework in this project.

## Code Conventions & Common Patterns

**Files:** All source files use `.js` or `.jsx` (no `.ts`/`.tsx`). Pages use `.js`; components use `.jsx`.

**Imports:** Use the `@/*` alias (maps to `src/*`) for all internal imports.
```js
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/AnimationWrapper";
```

**Exports:**
- Pages (`src/app/**/page.js`, layout.js) → default export
- shadcn/ui components in `src/components/ui/` → named exports
- Layout/project components → default export
- Animation wrappers → named exports from a single file

**Client components:** Add `"use client"` at the top of every component that uses hooks, browser APIs, or Framer Motion. This is the norm, not the exception.

**Class merging:** Always use `cn()` for conditional or composed Tailwind classes.
```js
import { cn } from "@/lib/utils";
className={cn("base-class", condition && "conditional-class", className)}
```

**Animations:** Two patterns in use:
1. **Declarative wrappers** — wrap JSX in components from `AnimationWrapper.jsx`:
   ```jsx
   <FadeIn direction="up" delay={0.2}><YourContent /></FadeIn>
   <StaggerContainer><StaggerItem>...</StaggerItem></StaggerContainer>
   <HoverEffect effect="lift"><Card /></HoverEffect>
   ```
2. **Hook-based** — use `useScrollAnimation(variant)` or `useInViewAnimation()` from `src/hooks/useAnimations.js`. Predefined variants: `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `hoverScale`, `hoverLift`, `staggerContainer`, `staggerItem`, `pageTransition`, `buttonPress`, `pulse`, `textReveal`.

All animations use Framer Motion's `whileInView` / `useInView` with `once: true`.

**3D/WebGL:** `src/components/ui/canvas-reveal-effect.jsx` uses React Three Fiber + custom GLSL shaders.

**Theme:** Consume via `useTheme()` from `@/components/theme-provider`. Toggles `"light"` / `"dark"` strings; the `dark` CSS class on `<html>` drives Tailwind dark-mode variants.

**Rich text in data files:** Use `**phrase**` for inline bold in `body` strings — `ContentSection` renders these as `<strong className="text-primary">`.

## Adding a New Project

1. Create `src/data/projects/<slug>.js` exporting a default object matching the full project schema above (registry fields + `areas`, `metadata`, `sections`).
2. Import it in `src/data/projects/index.js` and add it to the default array.
3. Drop a cover image in `public/` and reference it as `bigImage`.
4. The dynamic route (`src/app/projects/[slug]/page.js`) picks it up automatically via `generateStaticParams`.

No new page files needed.

## Important Files

| File | Role |
|------|------|
| `src/app/layout.js` | Root layout — Geist font, ThemeProvider, Navigation |
| `src/app/page.js` | Homepage — hero, skills, projects grid, experience timeline |
| `src/app/globals.css` | Global styles, Tailwind directives, CSS custom properties |
| `src/app/projects/[slug]/page.js` | Dynamic project case study template |
| `src/data/projects/index.js` | Project registry — imports all project data files |
| `src/data/projects/distributed-md-platform.js` | Full case study data for market data project |
| `src/data/projects/multi-exchange-watchlist.js` | Full case study data for watchlist project |
| `src/data/technologies.js` | Tech descriptions used in the TechGrid section |
| `src/components/project/ContentSection.jsx` | Generic section renderer — heading, body, items, subsections, image |
| `src/components/project/ProjectLayout.jsx` | 5-column decorative grid wrapper |
| `src/hooks/useAnimations.js` | Animation hooks and `animationVariants` presets |
| `src/lib/utils.js` | `cn()` — the only shared utility |
| `src/components/theme-provider.jsx` | ThemeContext + `useTheme()` hook |
| `components.json` | shadcn/ui config (new-york style, neutral base, CSS vars, RSC enabled) |
| `jsconfig.json` | Path alias: `@/*` → `./src/*` |

## Runtime / Tooling Preferences

- **Runtime:** Node.js with npm (`package-lock.json` v3 — not Bun or Yarn)
- **Package manager:** `npm` — use `npm install`, not `bun add` or `yarn add`
- **Next.js:** 15.5.0, App Router only (no Pages Router)
- **React:** 19.1.0
- **Tailwind:** v4 with `@tailwindcss/postcss` plugin (no `tailwind.config.js`)
- **Bundler:** Turbopack (via `--turbopack` in all scripts)
- **Linter:** ESLint 9 flat config (`eslint.config.mjs`). Rule override: `react/no-unescaped-entities` is off.
- **Adding shadcn/ui components:** `npx shadcn@latest add <component>` — respects `components.json`.

## Testing & QA

No test framework is configured. QA is manual:
1. `npm run dev` — verify in browser
2. `npm run build` — confirm Turbopack build succeeds
3. `npm run lint` — ESLint must pass

Deployment target is **Vercel**. `next start` works on any Node.js host after `next build`.
