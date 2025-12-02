export const projectTechnologies = ["CCXT", "Redis", "Node", "PM2"];
export const areasInvolved = ["Backend", "Systems", "Infrastructure"];

export const keyTechnicalImplementations = [
  {
    label: "CCXT integration",
    description:
      "providing normalized market data interfaces across 100+ exchanges, handling exchange-specific data formats and WebSocket protocols",
  },
  {
    label: "Redis Cluster",
    description:
      "for sub-millisecond cross-region order book caching, ticker storage, and real-time data distribution across distributed nodes",
  },
  {
    label: "Node.js event-driven architecture",
    description:
      "handling thousands of concurrent WebSocket connections per node with non-blocking I/O",
  },
  {
    label: "PM2 cluster mode",
    description:
      "ensuring zero-downtime deployments and automatic process resurrection on node failures",
  },
  {
    label: "Intelligent data routing",
    description:
      "clients automatically connect to the geographically optimal node for their target exchanges, reducing data latency by 60-80% compared to single-region deployments",
  },
  {
    label: "Connection pooling and keep-alive strategies",
    description:
      "maintaining persistent exchange connections to eliminate handshake overhead and ensure continuous data streams",
  },
];

export const comprehensiveMarketDataCoverage = [
  {
    label: "Ticker Data",
    description:
      "Best bid/ask, 24h volume, price changes, and exchange-specific metrics (open interest for derivatives)",
  },
  {
    label: `Order book depth: `,
    description: `Configurable depth levels (L2 data with 20/50/100 levels or full book), supporting both snapshot and incremental delta updates`,
  },

  {
    label: `Trade streams: `,
    description: `Individual trades with price, volume, side (maker/taker), and microsecond timestamps`,
  },

  {
    label: `Funding rates (perpetuals): `,
    description: `8-hour funding rates for perpetual futures contracts, crucial for derivatives traders managing holding costs`,
  },

  {
    label: `Liquidation feeds: `,
    description: `Real-time liquidation events with position size, liquidation price, and affected symbols—valuable for sentiment analysis and cascade prediction`,
  },

  {
    label: `Index prices and mark prices: `,
    description: `Exchange-calculated fair value prices used for perpetual contract settlement`,
  },
];

export const orderbookManagementChallenge = [
  {
    label: `State Synchronization Logic: `,
    description: `Implemented checksum validation comparing locally computed order book checksums against exchange-provided values (CRC32 for Binance, custom hashing for others). When checksum mismatches occur (indicating state drift), the system automatically triggers re-synchronization without disrupting client connections`,
  },
  {
    label: `Snapshot vs. Delta Updates: `,
    description: `Exchanges like Binance send periodic full order book snapshots (every 1000ms) with delta updates in between, while others like Coinbase send only deltas requiring perfect state reconstruction. The system handles both patterns, automatically requesting fresh snapshots when delta sequences indicate missed messages.`,
  },
  {
    label: `Out-of-order message handling: `,
    description: `Network conditions occasionally deliver WebSocket messages out of sequence. Built a reordering buffer that holds messages with future sequence numbers for up to 500ms, allowing late-arriving messages to slot into correct positions before processing.`,
  },
  {
    label: `Memory management: `,
    description: `Full order book depth for liquid pairs can contain 10,000+ price levels. Implemented configurable depth limits with smart pruning—maintaining full depth internally but streaming only client-requested levels (typically top 20-100) to reduce bandwidth. Redis stores compressed order book snapshots with LRU eviction for less-active pairs.`,
  },
  {
    label: `Performance optimization: `,
    description: `Order book updates are the highest-throughput data type (100-1000 updates/second for major pairs). Used binary search for price level insertion and maintained separate sorted structures for bids/asks, achieving O(log n) update complexity instead of O(n) linear scans.`,
  },
];

export const latencyBreakdown = [
  "A monolithic US-East deployment connecting to Binance (Tokyo) experiences ~180-220ms RTT",
  "An edge node in Tokyo connecting to Binance sees ~2-8ms RTT",
  "For WebSocket streams processing 1,000+ messages/second, this compounds: every reconnection, every ping/pong, every rate limit boundary adds latency",
];

export const regionalExchangeClustering = [
  {
    label: `APAC cluster (Tokyo/Singapore): `,
    description: `Binance, Bybit, OKX, Bitget, HTX - the highest volume venues`,
  },
  {
    label: `Europe cluster (Frankfurt): `,
    description: `Kraken, Bitstamp, Deribit`,
  },
  {
    label: `US cluster (Virginia): `,
    description: `Coinbase, Gemini, Kraken US`,
  },
  {
    label: `South America (São Paulo): `,
    description: `Mercado Bitcoin, regional exchanges`,
  },
];
