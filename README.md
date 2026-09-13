# Portfolio — Adrian Garcia

Personal portfolio site. Static, client-rendered, deployed on Vercel.

## Stack

- **Next.js 15** (App Router) with Turbopack
- **JavaScript only** — no TypeScript
- **Tailwind CSS v4** (no `tailwind.config.js`; theme lives in `src/app/globals.css`)
- **motion** (Framer Motion v12) for animation
- **@xyflow/react** for architecture diagrams, **maplibre-gl** for the regional map
- **Geist** Sans / Mono / Pixel Circle

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

There is no test framework. QA is manual: build, then click through `/` and
`/projects/distributed-md-platform`.

## Routes

| Route | Rendering | Source |
|---|---|---|
| `/` | static | `src/app/page.js` → `src/components/home/HomeContent.jsx` |
| `/projects/[slug]` | SSG | `src/app/projects/[slug]/page.js` |
| `/sitemap.xml`, `/robots.txt` | static | `src/app/sitemap.js`, `src/app/robots.js` |
| 404 | static | `src/app/not-found.jsx` |

## How a project page is assembled

`content/projects/*.md` is the project **registry** — only the YAML frontmatter
is read (`src/lib/projects.js`). Case-study bodies are bespoke React, not
markdown.

```
content/projects/<slug>.md          frontmatter: title, description, technologies,
                                    areas, bigImage, order, disabled
        │
        ▼
src/lib/projects.js                 getAllProjects() / getProject(slug)
        │
        ├──────────────► src/app/page.js            (homepage cards)
        │
        ▼
src/app/projects/[slug]/page.js     grid shell + contents rail + footer
        │
        ▼
src/components/project/case-studies/index.js        slug → { Article, contents }
        │
        ▼
src/components/project/case-studies/<Name>.jsx      the article itself
```

A slug renders only if it is **both** non-`disabled` in its frontmatter **and**
present in the case-study registry. Anything else 404s, so an unfinished
project can never ship as an empty page.

### Adding a project

1. Add `content/projects/<slug>.md` with frontmatter (omit `disabled`, or set it
   to `true` while the write-up is in progress).
2. Add `src/components/project/case-studies/<Name>.jsx`. Default-export the
   article and named-export a `contents` array of `{ id, label }` — the ids must
   match the `id` attributes of the article's `<section>` elements, and the
   contents rail numbers them in order.
3. Register the slug in `src/components/project/case-studies/index.js`.

`generateStaticParams` and the sitemap pick it up automatically.

## Deployment

Vercel, zero config. Set `NEXT_PUBLIC_SITE_URL` once a custom domain is
attached — canonical URLs, Open Graph tags and the sitemap read it via
`src/lib/site.js`. Without it, the Vercel production URL is used, falling back
to `http://localhost:3000` locally.
