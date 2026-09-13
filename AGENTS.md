# Repository Guidelines

## Project Overview

Adrian Garcia's personal portfolio website. Showcases full-stack engineering work with rich animations and an interactive case study. No backend — entirely static, client-side rendered data.

## Architecture & Data Flow

**Next.js 15 App Router, JavaScript only (no TypeScript).** Nearly every component is `"use client"`. No server actions, no API routes, no external data fetching.

`content/projects/*.md` is the project **registry**. Only YAML frontmatter is read; the markdown body is not rendered. Case-study bodies are bespoke React components.

```
content/projects/<slug>.md          ← registry entry (frontmatter only)
       │
       ▼
src/lib/projects.js                 ← getAllProjects() / getProject(slug)
       │
       ├──────────────► src/app/page.js                    (homepage)
       │
       ▼
src/app/projects/[slug]/page.js     ← grid shell + contents rail + footer
       │
       ▼
src/components/project/case-studies/index.js   ← slug → { Article, contents }
       │
       ▼
src/components/project/case-studies/<Name>.jsx ← the article
```

A slug renders only if it is **both** non-`disabled` in frontmatter **and** registered in `case-studies/index.js`. Everything else `notFound()`s. `generateStaticParams` and `src/app/sitemap.js` both filter on that intersection, so an unfinished project can never ship as an empty page.

Frontmatter shape:
```yaml
order: 1                # homepage sort key
title: "..."
description: "..."      # used for meta description and card copy
technologies: [CCXT, Redis, Node, PM2]
areas: [Backend, Systems, Infrastructure]
bigImage: /md-platform/infra.png
disabled: true          # optional → "Coming Soon" on homepage, no route
metaTitle: "..."        # optional overrides
metaDescription: "..."
```

Rich case-study data (metrics, comparison panels, geo markers, section copy) lives in `src/data/projects/<slug>.js` and is imported directly by that project's article component.

**There is no theme context.** The site is dark-only: `<html className="dark">` is hardcoded in `src/app/layout.js`. Canvas-based widgets that need to know the palette use `useIsDarkMode()` from `@/hooks/useIsDarkMode`, which reads the `dark` class off `documentElement` — the single source of truth.

## Key Directories

|Path|Purpose|
|---|---|
|`src/app/`|App Router pages, `sitemap.js`, `robots.js`, `not-found.jsx`|
|`src/app/projects/[slug]/`|Shell that renders a registered case study|
|`src/components/project/`|Case-study building blocks (architecture flow, impact, learnings, map, contents rail)|
|`src/components/project/case-studies/`|One file per published project + the slug registry|
|`src/components/home/`|Homepage sections (accordion, project rows, visuals)|
|`src/components/ui/`|shadcn/ui base components and bespoke visual primitives|
|`src/components/animations/`|Motion wrappers (FadeIn, StaggerContainer, HoverEffect)|
|`src/components/evil-buttons/`|Interactive button treatments|
|`src/data/projects/`|Per-project rich case-study data|
|`src/hooks/`|`useAnimations.js`, `useIsDarkMode.js`|
|`src/lib/`|`utils.js` (`cn()`), `projects.js` (registry), `site.js` (base URL)|
|`content/projects/`|Project registry markdown (frontmatter only)|
|`public/`|Screenshots, architecture diagrams, geo data, MapLibre worker|

## Development Commands

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build with Turbopack
npm run start    # Serve production build
npm run lint     # ESLint (flat config, extends next/core-web-vitals)
```

No test command — there is no test framework in this project.

## Code Conventions & Common Patterns

**Files:** `.js` or `.jsx` only. Pages use `.js`; components use `.jsx`.

**Imports:** Use the `@/*` alias (maps to `src/*`) for all internal imports.

**Exports:**
- Pages (`src/app/**/page.js`, `layout.js`) → default export
- shadcn/ui components in `src/components/ui/` → named exports
- Layout/project/case-study components → default export
- Animation wrappers → named exports from a single file

**Client components:** Add `"use client"` to any component using hooks, browser APIs, or Motion. The route shell in `src/app/projects/[slug]/page.js` and the article components are server components; the interactive pieces they render are not.

**Class merging:** Always use `cn()` for conditional or composed Tailwind classes.

**Animations:** Two patterns:
1. Declarative wrappers from `AnimationWrapper.jsx` — `<FadeIn>`, `<StaggerContainer>`/`<StaggerItem>`, `<HoverEffect>`.
2. Hook-based — `useScrollAnimation(variant)` / `useInViewAnimation()` from `src/hooks/useAnimations.js`.

All animations import from `motion/react` (never `framer-motion` — the duplicate package is not installed) and use `whileInView`/`useInView` with `once: true`.

**Smooth scrolling:** Lenis is mounted globally in `src/components/smooth-scroll.jsx`. Prefer `IntersectionObserver` over `scroll` listeners for scroll-position UI — during smooth scroll a handler runs every frame, and measuring elements there forces a layout read on the main thread.

## Adding a New Project

1. Create `content/projects/<slug>.md` with frontmatter. Set `disabled: true` while the write-up is in progress.
2. Add rich data at `src/data/projects/<slug>.js` if the article needs metrics, panels, or map markers.
3. Create `src/components/project/case-studies/<Name>.jsx`. Default-export the article; named-export a `contents` array of `{ id, label }` whose ids match the article's `<section id>` values. The rail numbers them in order — never hardcode numbers.
4. Register the slug in `src/components/project/case-studies/index.js`.
5. Drop a cover image in `public/` and reference it as `bigImage`.
6. Remove `disabled` to publish.

No new page files needed — the dynamic route, `generateStaticParams` and the sitemap pick it up.

## Important Files

|File|Role|
|---|---|
|`src/app/layout.js`|Root layout — fonts, metadata, `metadataBase`, Navigation, Lenis|
|`src/app/page.js`|Homepage entry — hands the registry to `HomeContent`|
|`src/app/projects/[slug]/page.js`|Case-study shell, metadata, `generateStaticParams`|
|`src/app/globals.css`|Tailwind v4 theme, CSS custom properties, MapLibre overrides|
|`src/lib/projects.js`|Frontmatter registry reader|
|`src/lib/site.js`|`siteUrl` for canonicals, OG and sitemap|
|`src/components/project/case-studies/index.js`|Slug → article registry|
|`src/components/project/ProjectContentsRail.jsx`|Sticky TOC + IntersectionObserver scrollspy|
|`src/components/project/ArchitectureFlow.jsx`|React Flow architecture diagrams|
|`src/components/ui/world-map.jsx`|MapLibre regional map with arcs|
|`src/hooks/useIsDarkMode.js`|Palette source of truth for canvas widgets|
|`src/lib/utils.js`|`cn()`|
|`components.json`|shadcn/ui config (new-york style, neutral base, CSS vars)|
|`jsconfig.json`|Path alias: `@/*` → `./src/*`|

## Runtime / Tooling Preferences

- **Runtime:** Node.js with npm (`package-lock.json` v3 — not Bun or Yarn)
- **Next.js:** 15.5.x, App Router only
- **React:** 19.1.0
- **Tailwind:** v4 with `@tailwindcss/postcss` (no `tailwind.config.js`)
- **Bundler:** Turbopack
- **Linter:** ESLint 9 flat config (`eslint.config.mjs`). `react/no-unescaped-entities` is off.
- **Adding shadcn/ui components:** `npx shadcn@latest add <component>`
- Keep `package.json` free of unused dependencies; the dependency list is deliberately minimal.

## Testing & QA

No test framework is configured. QA is manual:
1. `npm run build` — must succeed
2. `npm run lint` — must pass
3. `npm run start` — click through `/` and `/projects/distributed-md-platform`, confirm the architecture diagrams and regional map render dark and the contents rail tracks while scrolling

Deployment target is **Vercel**. Set `NEXT_PUBLIC_SITE_URL` when a custom domain is attached.
