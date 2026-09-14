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
// Copy below is drawn from each repository's own README. The repos are private
// at the time of writing, so the links resolve only once they are made public.
// Years are the year of first commit.
// ─────────────────────────────────────────────────────────────────────────────

export const sideProjects = [
  {
    id: "lazypr",
    title: "LazyPR — Terminal Pull Request Reviews",
    description:
      "A keyboard-driven terminal UI for reviewing GitHub pull requests, built as the reviewer-side complement to lazygit. Navigate diffs and threads, leave inline, multi-line and file-level comments against a pending review, resolve conversations and submit — all over the gh CLI without losing review context to a browser tab.",
    tags: ["Go", "TUI", "GitHub API"],
    year: "2026",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/LazyPrReview",
  },
  {
    id: "aster-dex-tui",
    title: "Terminal Trading Interface",
    description:
      "A full trading terminal for AsterDEX perpetual futures that runs in the shell: trade-count and time-based candles, volume and cumulative volume delta, order entry down to trailing stops, live position and PnL tracking, and account exposure. Written to replace a TradingView subscription for pattern recognition and active trading.",
    tags: ["Rust", "TUI", "Perpetuals"],
    year: "2026",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/aster-dex-tui",
  },
  {
    id: "cli-trading-bot",
    title: "Terminal Trading Bot",
    description:
      "An automated trading bot for Binance.US spot markets with a pluggable strategy layer, currently RSI-standard-deviation and grid. Risk controls — position limits, stop-loss, daily loss caps and circuit breakers — are enforced in the engine, and every strategy can be run against historical replay or in paper mode before it touches real money.",
    tags: ["Rust", "PostgreSQL", "Backtesting"],
    year: "2026",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/cli-trading-bot",
  },
  {
    id: "backtesting-grounds",
    title: "Backtesting Grounds",
    description:
      "A vectorized backtesting framework for systematic crypto strategies, run over years of one-minute Binance klines. Ships a library of strategies alongside the engine that grades them: walk-forward validation, regime detection and parameter sweeps, plus PineScript ports of the ones worth watching on a chart.",
    tags: ["Python", "Walk-Forward", "Research"],
    year: "2026",
    linkType: "source",
    href: "https://github.com/DreadPirateRob/backtesting-grounds",
  },
];
