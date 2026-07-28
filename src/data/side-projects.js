// Secondary, smaller-scale projects rendered beneath the main case studies.
//
// Destination contract:
//   linkType "live"       -> deployed build, opens in a new tab
//   linkType "source"     -> repository, opens in a new tab
//   linkType "case-study" -> dedicated page on this site, internal navigation
//
// `href: null` means the destination is not published yet. The card renders as
// a non-interactive "Soon" tile instead of linking somewhere broken, so an
// entry can sit here until its destination exists and then go live purely by
// filling in the href.
//
// ─────────────────────────────────────────────────────────────────────────────
// ALL FOUR ENTRIES BELOW ARE PLACEHOLDERS. No real project, URL, or repository
// is referenced. Replace every field marked TODO before this section ships.
// ─────────────────────────────────────────────────────────────────────────────

export const sideProjects = [
  {
    id: "side-project-01",
    // TODO: real project name.
    title: "Side Project 01",
    // TODO: one or two sentences — what it does and why it exists.
    description:
      "Placeholder description. Two sentences of copy sit here so the card height and text wrapping match the real content once it lands.",
    // TODO: real stack, max 3 tags (they render as chips).
    tags: ["Tag One", "Tag Two", "Tag Three"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "live",
    // TODO: paste the deployed URL, e.g. "https://example.com". Until then this
    // card stays non-clickable and shows a "Soon" badge.
    href: null,
  },
  {
    id: "side-project-02",
    // TODO: real project name.
    title: "Side Project 02",
    // TODO: one or two sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry demonstrates the repository variant, where the card links straight out to source instead of a write-up.",
    // TODO: real stack, max 3 tags (they render as chips).
    tags: ["Tag One", "Tag Two", "Tag Three"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    // TODO: paste the repository URL. Do not guess the repo name — copy it from
    // GitHub so the link cannot 404 under a real account handle.
    href: null,
  },
  {
    id: "side-project-03",
    // TODO: real project name.
    title: "Side Project 03",
    // TODO: one or two sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry demonstrates the internal variant, for a project that earns its own page on this site rather than an outbound link.",
    // TODO: real stack, max 3 tags (they render as chips).
    tags: ["Tag One", "Tag Two", "Tag Three"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "case-study",
    // TODO: internal path once the page exists, e.g. "/projects/<slug>". Leave
    // null until that route actually renders.
    href: null,
  },
  {
    id: "side-project-04",
    // TODO: real project name.
    title: "Side Project 04",
    // TODO: one or two sentences — what it does and why it exists.
    description:
      "Placeholder description. Four entries fill the two-column grid evenly; add or remove entries freely, the layout reflows.",
    // TODO: real stack, max 3 tags (they render as chips).
    tags: ["Tag One", "Tag Two", "Tag Three"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "case-study",
    // TODO: internal path once the page exists, e.g. "/projects/<slug>".
    href: null,
  },
];
