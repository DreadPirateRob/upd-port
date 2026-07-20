const distributedMdPlatform = {
  slug: "distributed-md-platform",
  eyebrow: "Market Data Infrastructure",
  title: "Global Distributed Market Data Platform",
  heroSummary:
    "A geo-distributed market data platform that moved exchange connectivity to regional edge nodes, normalized live feeds behind a single API, and kept order books trustworthy under high-frequency, exchange-specific failure modes.",
  intro:
    "The project began with a practical latency problem: when market data travels across continents and every exchange speaks a different protocol, traders and downstream systems end up reacting to stale, fragmented information. I built the platform as a regional edge service so clients could consume one consistent interface instead of owning WebSocket lifecycle, normalization, and freshness trade-offs themselves.",
  metrics: [
    {
      label: "Edge latency",
      value: "2–8ms",
      note: "Tokyo edge node to Binance, versus roughly 180–220ms from a US-East deployment",
    },
    {
      label: "Latency reduction",
      value: "60–80%",
      note: "Lower client data latency versus single-region routing",
    },
    {
      label: "Exchange coverage",
      value: "100+",
      note: "Normalized exchange interfaces through CCXT",
    },
    {
      label: "Order book rate",
      value: "100–1000/s",
      note: "Update volume for major pairs on the hottest feeds",
    },
    {
      label: "Book depth",
      value: "10,000+",
      note: "Price levels possible on liquid pairs before selective client streaming",
    },
  ],
  sections: [
    {
      eyebrow: "The gap",
      title: "Single-region market data stacks lose freshness before the data is useful",
      body: [
        "Cryptocurrency traders, portfolio managers, and algorithmic systems all depend on live market data, but distance alone can turn that data stale. A client or server reaching across regions to talk to exchange infrastructure can absorb 150–300ms or more in roundtrip delay before any application logic even begins.",
        "The operational burden compounds the latency problem. Existing integrations force teams to manage multiple WebSocket connections, reconcile exchange-specific payloads, and build their own normalization layer before they can deliver a reliable stream to internal consumers or end users.",
      ],
      figure: {
        src: "/md-platform/bad-infra.png",
        alt: "Single-region market data architecture introducing unnecessary cross-region latency",
        caption:
          "A monolithic deployment keeps the software simple on paper, but it pushes exchange traffic across the wrong geographies and degrades data freshness at the source.",
      },
    },
    {
      eyebrow: "System design",
      title: "Regional edge nodes were the core architectural bet",
      body: [
        "The platform was designed as a globally distributed service with edge nodes positioned near major exchange clusters in Tokyo, Singapore, Frankfurt, Virginia, and São Paulo. Each node maintained persistent WebSocket connections to the exchanges nearest to it, then published normalized market data into a unified API layer for clients.",
        "That choice turned geography into part of the system design. Instead of asking every client to negotiate exchange protocols and network distance for itself, the platform concentrated exchange connectivity at the edge and routed consumers toward the most appropriate regional node.",
      ],
      bullets: [
        "Persistent regional exchange connections reduced handshake overhead and improved continuity during live streaming.",
        "Intelligent routing connected clients to the geographically optimal node for their target venues.",
        "Node.js handled thousands of concurrent exchange connections per node through an event-driven, non-blocking model.",
      ],
      figure: {
        src: "/md-platform/infra.png",
        alt: "Distributed market data platform with regional edge nodes feeding a unified API",
        caption:
          "Edge collection, normalization, and unified delivery were treated as one system rather than separate concerns bolted together later.",
      },
    },
    {
      eyebrow: "Normalization scope",
      title: "The platform standardized far more than ticker data",
      body: [
        "CCXT provided the starting point for a broad normalization layer, but the real value was in turning inconsistent exchange feeds into a coherent market data surface. The system exposed the core streams traders actually use, while preserving the exchange-level nuance required for derivatives and depth-sensitive strategies.",
      ],
      bullets: [
        "Ticker data including best bid and ask, 24-hour volume, price changes, and exchange-specific fields such as open interest for derivatives venues.",
        "Order book depth with configurable L2 views at 20, 50, 100, or full-book depth, supporting both snapshot and incremental delta models.",
        "Trade streams with price, size, maker or taker side, and microsecond timestamps.",
        "Funding rates, liquidation feeds, and index or mark prices needed for perpetuals and other derivatives workflows.",
      ],
    },
    {
      eyebrow: "Hard problem",
      title: "Order book synchronization had to survive real exchange behavior",
      body: [
        "Maintaining accurate order book state across distributed nodes was the most demanding part of the build. Exchanges differ sharply in how they emit state, how they sequence updates, and how much recovery logic they expect clients to implement for themselves.",
      ],
      bullets: [
        "Checksum validation compared locally computed books with exchange-provided values and triggered re-synchronization when drift was detected, including CRC32-based validation for Binance and custom handling elsewhere.",
        "Snapshot and delta logic handled both periodic full-book refresh patterns and exchanges that emit deltas only, requesting new snapshots whenever sequence gaps suggested missed messages.",
        "A reordering buffer held future-sequence messages for up to 500ms so late arrivals could be applied in the correct order instead of corrupting state.",
        "Configurable depth limits kept full internal books available while streaming only the client-requested top levels, reducing bandwidth without discarding fidelity.",
        "The update path used binary search with separate sorted bid and ask structures, improving hot-path book mutations from linear scans to O(log n) behavior.",
      ],
      figure: {
        src: "/md-platform/flow.png",
        alt: "Order book synchronization flow for snapshots, deltas, validation, and recovery",
        caption:
          "Order book reliability depended on disciplined recovery paths, not just fast update throughput.",
      },
    },
    {
      eyebrow: "Operational logic",
      title: "Latency math shaped clustering, caching, and deployment strategy",
      body: [
        "The edge-versus-monolith decision was ultimately grounded in latency physics. A US-East deployment talking to Binance in Tokyo might see roughly 180–220ms RTT, while a Tokyo edge node could operate in the 2–8ms range. At WebSocket rates above 1,000 messages per second, those differences compound across reconnections, keep-alives, and rate-limit windows.",
        "Regional clustering followed actual exchange geography: APAC nodes served venues such as Binance, Bybit, OKX, Bitget, and HTX; Frankfurt covered European venues including Kraken, Bitstamp, and Deribit; Virginia handled US venues such as Coinbase and Gemini; and São Paulo covered regional exchanges. Redis Cluster supported sub-millisecond cross-region caching and distribution, while PM2 cluster mode provided zero-downtime deployments and automatic recovery on node failures.",
      ],
      bullets: [
        "Redis Cluster stored order books and tickers for fast cross-region access and real-time distribution.",
        "PM2 cluster mode kept node processes resilient during deploys and failures.",
        "Connection pooling and keep-alive strategies reduced exchange handshake churn and stabilized long-lived streams.",
      ],
    },
    {
      eyebrow: "Takeaways",
      title: "The project sharpened my thinking on distributed reliability",
      body: [
        "This work deepened my understanding of distributed-systems trade-offs: data freshness improves when you move closer to exchanges, but consistency and recovery become harder the moment state is spread across regions. It also forced stronger operational thinking around WebSocket lifecycle management, including reconnection storms, exchange maintenance windows, rate limits, and defensive backoff behavior.",
        "It clarified where abstractions help and where they stop. CCXT handled a meaningful portion of normalization, but resilient production behavior still required exchange-specific logic for checksum validation, snapshot compression, and edge-case protocol differences. The project also reinforced that algorithmic efficiency matters in JavaScript when the hot path is processing hundreds or thousands of updates per second across many symbols.",
      ],
    },
  ],
};

export default distributedMdPlatform;
