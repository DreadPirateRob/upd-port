export const projectTechnologies = ["React", "Websocket", "Express", "AgGrid"];

export const areasInvolved = ["Frontend", "Backend"];

export const coreFunctionality = [
  {
    label: `Instrument-level aggregation: `,
    description: `Each cryptocurrency displays a primary price with visual indicators for price dispersion`,
  },
  {
    label: `Expandable exchange breakdown: `,
    description: `Click any instrument to reveal real-time prices from all connected exchanges, sorted by volume or price`,
  },
  {
    label: `Live WebSocket updates: `,
    description: `Prices update in real-time without page refreshes, with visual flash indicators showing price movements`,
  },
  {
    label: `Clean, scannable interface: `,
    description: `Minimalist design focused on information density—see 20+ instruments simultaneously with instant access to deeper data`,
  },
];

export const frontendStack = [
  {
    label: "React",
    description: `with functional components and hooks for state management`,
  },
  {
    label: "WebSocket client",
    description: `maintaining persistent connection to the distributed market data API`,
  },
  {
    label: "Real-time data handling:",
    description: `Implemented efficient state updates to process hundreds of price ticks per second without UI jank`,
  },
  {
    label: "Expandable row pattern:",
    description: `Smooth animations and lazy-loaded exchange data when expanding instruments`,
  },
  {
    label: "Responsive grid layout",
    description: `optimized for both wide trading monitors and mobile devices`,
  },
];

export const performanceConsiderations = [
  {
    label: `Virtualized rendering:`,
    description: `for watchlists exceeding 50 instruments, only rendering visible rows`,
  },
  {
    label: `Debounced price updates:`,
    description: `(60fps throttle) to prevent excessive re-renders during high-volatility periods`,
  },
  {
    label: `Memoized calculations:`,
    description: `for aggregated prices and spread computations`,
  },
  {
    label: `WebSocket message batching:`,
    description: `to process multiple ticker updates in a single render cycle`,
  },
];

export const userExperience = [
  {
    label: `Arbitrage opportunities:`,
    description: `When prices diverge significantly across exchanges`,
  },
  {
    label: `Liquidity concentration:`,
    description: `Which exchanges have the deepest markets`,
  },
  {
    label: `Exchange health:`,
    description: `Detecting stale data or connectivity issues on specific exchanges`,
  },
];

export const businessValue = [
  {
    label: `Price discovery:`,
    description: `Users gain complete market visibility without juggling multiple exchange interfaces`,
  },
  {
    label: `Efficiency:`,
    description: `Monitor 50+ instruments with exchange-level detail through a single lightweight application`,
  },
  {
    label: `Speed:`,
    description: `Real-time updates with <5ms frontend processing latency from WebSocket message receipt to DOM update`,
  },
  {
    label: `Simplicity:`,
    description: `Zero configuration required—add instruments to watchlist and immediately see aggregated + detailed pricing`,
  },
];
