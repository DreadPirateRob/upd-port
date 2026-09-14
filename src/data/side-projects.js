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
// Repository URLs below were supplied directly by the owner. All four were
// private (HTTP 404 anonymously) when they were wired up, so the cards link
// correctly only once each repo is made public.
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
    href: "https://github.com/DreadPirateRob/LazyPrReview",
  },
  {
    id: "aster-dex-tui",
    title: "Terminal Trading Interface",
    // TODO: one or two real sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry will link to its GitHub repository once the repo URL is available.",
    tags: ["DEX", "TUI", "Trading"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/aster-dex-tui",
  },
  {
    id: "cli-trading-bot",
    title: "Terminal Trading Bot",
    // TODO: one or two real sentences — what it does and why it exists.
    description:
      "Placeholder description. This entry will link to its GitHub repository once the repo URL is available.",
    tags: ["CLI", "Trading", "Automation"],
    // TODO: year shipped.
    year: "20XX",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/cli-trading-bot",
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
    href: "https://github.com/DreadPirateRob/backtesting-grounds",
  },
];
