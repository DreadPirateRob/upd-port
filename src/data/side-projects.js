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
// Titles are real. Only the LazyPR entry is fully written; the remaining three
// still carry placeholder descriptions, tags and years. Every field marked TODO
// needs filling, and no href is set yet, so all four render as "Soon".
// ─────────────────────────────────────────────────────────────────────────────

export const sideProjects = [
  {
    id: "lazypr",
    title: "LazyPR — Terminal Pull Request Reviews",
    description:
      "A keyboard-driven terminal UI for reviewing pull requests, built in the spirit of lazygit. Navigate diffs, leave line-level comments, and approve or request changes without leaving the terminal or losing review context to a browser tab.",
    tags: ["Git", "GitHub API", "TUI"],
    year: "2026",
    linkType: "source",
    // TODO: paste the repository URL once it is public. Do not guess the repo
    // name — copy it from GitHub so the link cannot 404.
    href: null,
  },
  {
    id: "side-project-02",
    // TODO: real project name.
    title: "Aster Dex TUI",
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
    title: "CLI Trading Bot",
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
    title: "Backtesting Grounds",
    // TODO: expand into one or two full sentences — what it does and why it
    // exists. Current text is your own note, kept verbatim.
    description:
      "Collection of strategies for backtesting",
    // TODO: real stack, max 3 tags (they render as chips).
    tags: ["Tag One", "Tag Two", "Tag Three"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "case-study",
    // TODO: internal path once the page exists, e.g. "/projects/<slug>".
    href: null,
  },
];
