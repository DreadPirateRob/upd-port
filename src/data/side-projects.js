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
// Titles are real. All four items are intended to link to source repositories,
// but no repo URLs have been provided yet, so every href stays null and each row
// still renders as "Soon" until the real GitHub links are pasted in.
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
    id: "aster-dex-tui",
    title: "Aster Dex TUI",
    // TODO: one or two real sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry will link to its GitHub repository once the repo URL is available.",
    tags: ["DEX", "TUI", "Trading"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    // TODO: paste the repository URL once it is public. Do not guess the repo
    // name — copy it from GitHub so the link cannot 404 under a real handle.
    href: null,
  },
  {
    id: "cli-trading-bot",
    title: "CLI Trading Bot",
    // TODO: one or two real sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry will link to its GitHub repository once the repo URL is available.",
    tags: ["CLI", "Trading", "Automation"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    // TODO: paste the repository URL once it is public. Do not guess the repo
    // name — copy it from GitHub so the link cannot 404 under a real handle.
    href: null,
  },
  {
    id: "backtesting-grounds",
    title: "Backtesting Grounds",
    // TODO: expand into one or two full sentences — what it does and why it
    // exists. Current text is your own note, kept verbatim.
    description:
      "Collection of strategies for backtesting",
    tags: ["Backtesting", "Strategies", "Research"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    // TODO: paste the repository URL once it is public. Do not guess the repo
    // name — copy it from GitHub so the link cannot 404 under a real handle.
    href: null,
  },
];
