export const technologiesData = {
  Node: {
    description:
      "Node.js is a runtime environment for executing JavaScript code outside of a browser.",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-node-js-icon-svg-png-download-1174925.png?f=webp",
  },
  PM2: {
    description: "PM2 is a process manager for Node.js applications.",
    icon: "https://pm2.keymetrics.io/images/logo.svg",
  },
  Redis: {
    description:
      "Redis is an in-memory data structure store, used as a database, cache and message broker.",
    icon: "https://redis.io/images/redis-white.svg",
  },
  Express: {
    description: "Express is a web application framework for Node.js.",
    icon: "https://expressjs.com/images/express-facebook-share.png",
  },
  CCXT: {
    description:
      "CCXT is a JavaScript library for cryptocurrency trading and is a comprehensive trading API for exchanges and wallets.",
    icon: "https://ccxt.io/images/logo-square.svg",
  },
};

export default [
  {
    slug: "market-data-plant",
    title: "High-Frequency System for Real-Time Data Streaming",
    skills: ["Backend", "Real-Time"],
    technologies: ["Node", "PM2", "Redis", "Express", "CCXT"],
    description:
      "A distributed market data processing system capable of handling high-frequency updates for multiple crypto pairs from different exchanges, simultaneously.",
    challenges: "Key challenges included handling high-volume WebSocket feeds, syncing shared state across processes, ensuring fault tolerance, and balancing API speed with data freshness — all solved with a scalable, resilient architecture.",
    features: [
      "Multi-process, event-driven architecture",
      "Distributed market data processing system",
      "High-frequency updates",
      "Simple to scale",
      "Highly concurrent",
      "Developer-friendly",
    ],
    // Blog data
    blog: {
      overview: (
        <p>
          In the fast-paced world of crypto trading, real-time market data is
          everything. I set out to build a{" "}
          <strong>distributed market data processing system</strong> capable of
          handling high-frequency updates for multiple crypto pairs from
          different data sources, simultaneously, all while keeping data
          retrieval fast, reliable, and API-accessible. <br />
          The goal was to design something simple to scale, highly concurrent,
          and developer-friendly, whether for trading, analytics, or research.
          <br />
          The goal was to design something simple to scale, highly concurrent,
          and developer-friendly, whether for trading, analytics, or research.
        </p>
      ),
      problem: {
        description:
          "Cryptocurrency exchanges generate thousands of updates per second across hundreds of trading pairs. The challenge wasn’t just ingesting this data — it was about:",
        listItems: [
          "Subscribing to real-time WebSocket feeds from multiple exchanges.",
          "Ensuring each data stream was isolated but coordinated.",
          "Handling data spikes without lag or loss.",
          "Storing it in a way that made retrieval blazing fast for downstream APIs.",
        ],
      },
      architecture: {
        description:
          "To meet these goals, I built a multi-process, event-driven architecture:",
        listItems: [
          "Node.js was the core runtime for flexibility and performance.",
          "PM2 managed multiple spawned services, each subscribing to specific exchange feeds.",
          "Redis Pub/Sub and Redis Streams acted as the central communication backbone and temporary data buffer.",
          "Each process handled a dedicated subset of trading pairs, using WebSocket connections to minimize latency and maximize bandwidth.",
          "A lightweight Express.js API layer exposed the data via REST, enabling external clients to fetch the latest price, orderbook depth, or trades efficiently.",
        ],
      },
      solutions: [
        {
          description: "High Volume WebSocket Feeds",
          problem: "Some exchanges have pushed 1000+ msg/sec",
          solution:
            "Isolated WebSocket handlers per exchange/pair using child_process.spawn() for non-blocking ingestion.",
        },
        {
          description: "Shared State Across Processes",
          problem:
            "Processes couldn’t easily share state (e.g., latest price, full orderbook).",
          solution:
            "Centralized Redis cache for all transient data, accessed and updated in real-time.",
        },
        {
          description: "Fault Tolerance",
          problem: "A single process crash could take down multiple streams.",
          solution:
            "Used PM2 process clustering and auto-restart on failure, along with logging to monitor uptime and errors.",
        },
        {
          description: "API Speed vs. Data Freshness",
          problem: "How to return the most up-to-date data without blocking or sacrificing performance.",
          solution:
            "Redis-backed snapshot store updated every X ms, decoupled from the live feed handler.",
        },
      ],
      closing: (
        <p>
          Whether it’s used to feed a trading bot, drive analytics, or power a
          dashboard, this system was designed with one thing in mind: real-time,
          reliable data at scale. I focused on simplicity, fault tolerance, and
          performance — principles I apply to every full-stack system I build.
        </p>
      ),
    },
  },
];
