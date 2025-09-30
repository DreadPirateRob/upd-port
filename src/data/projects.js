import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
    description: "Redis is an in-memory data structure store.",
    icon: "https://redis.io/images/redis-white.svg",
  },
  Express: {
    description: "Express is a web application framework for Node.js.",
    icon: "https://expressjs.com/images/express-facebook-share.png",
  },
  CCXT: {
    description: "CCXT is a JavaScript library for cryptocurrency trading.",
    icon: "https://ccxt.io/images/logo-square.svg",
  },
  React: {
    description: "React is a JavaScript library for building user interfaces.",
    icon: "https://reactjs.org/logo-og.png",
  },
  Infura: {
    description:
      "Infura is a web3 infrastructure platform for building decentralized applications.",
    icon: "https://infura.io/images/logo-square.svg",
  },
  Alchemy: {
    description:
      "Alchemy is a web3 infrastructure platform for building decentralized applications.",
    icon: "https://alchemy.com/images/logo-square.svg",
  },
  ZeroMQ: {
    description: "ZeroMQ is a message queue system.",
    icon: "https://zeromq.org/images/logo.svg",
  },
  Figma: {
    description: "Figma is a design tool for creating UI/UX designs.",
    icon: "https://www.figma.com/images/logo.svg",
  },
  Framer: {
    description: "Framer is a design tool for creating UI/UX designs.",
    icon: "https://www.framer.com/images/logo.svg",
  },
};

export default [
  {
    slug: "market-data-plant",
    title: "High-Frequency System for Real-Time Data Streaming",
    skills: ["Frontend", "Backend"],
    technologies: ["React", "Node", "PM2", "Redis", "Express", "CCXT"],
    bigImage: "/streaming-watchlist.png",
    description:
      "A distributed market data processing system capable of handling high-frequency updates for multiple crypto pairs from different exchanges, simultaneously.",
    challenges:
      "Key challenges included handling high-volume WebSocket feeds, syncing shared state across processes, ensuring fault tolerance, and balancing API speed with data freshness — all solved with a scalable, resilient architecture.",
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
          handling high-frequency updates for a ton of crypto pairs from
          different data sources, simultaneously, all while keeping data
          retrieval fast, reliable, and API-accessible. <br />
          The goal was to design something simple to scale, highly concurrent,
          and developer-friendly, whether for trading, analytics, or research.
          <br />
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
          solution: (
            <>
              Isolated WebSocket handlers per exchange/pair using separate
              processes for non-blocking ingestion, ensuring that each process
              is isolated and can handle the high volume of data.
            </>
          ),
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
          problem:
            "How to return the most up-to-date data without blocking or sacrificing performance.",
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
  {
    slug: "portfolio-tracking-system",
    title: "Digital Assets Portfolio Tracking System",
    skills: ["Frontend", "Backend"],
    technologies: [
      "React",
      "Node",
      "Redis",
      "Express",
      "CCXT",
      "Infura",
      "Alchemy",
    ],
    bigImage: "/portfolio-tracker.png",
    description:
      "A portfolio tracking system for digital assets, allowing users to track their portfolio across multiple exchanges and wallets.",
    challenges:
      "Some of the challenges included cross-platform data normalization, rate-limiting mitigations and security concerns.",
    features: [
      "Up to date portfolio updates",
      "Multi-exchange & multi-wallet support",
      "Unified asset view",
      "Smart caching with Redis",
      "Secure API integration",
    ],
    blog: {
      overview: (
        <p>
          The rapid growth of digital assets has led to users holding
          cryptocurrencies across a wide range of platforms—centralized
          exchanges, decentralized wallets, and DeFi protocols. However,
          tracking the performance and allocation of these assets in one unified
          interface remains a challenge.
          <div className="my-4" />
          This portfolio tracking system solves that problem by offering a
          multi-source portfolio tracker. It aggregates holdings from various
          centralized exchanges and blockchain wallets, giving users a single
          place to monitor their crypto investments.
        </p>
      ),
      problem: {
        description:
          "Tracking digital assets across multiple exchanges and wallets can be challenging. The challenge wasn’t just ingesting this data — it was about:",
        listItems: [
          "Asset formats and naming conventions vary by platform. The system maps and standardizes assets (e.g., BTC, WBTC, BTCB) into a unified schema.",
          "Frequent polling of external APIs is controlled through caching and queuing with Redis, preserving API limits and maintaining fresh data.",
          "Exchange credentials are never exposed to the frontend. Secure storage and one-way communication between services protect sensitive data.",
        ],
      },
      architecture: {
        description:
          "This full-stack system is powered by a robust and modern technology stack:",
        listItems: [
          <div>
            <Badge variant="outline" className="text-base font-bold">
              Frontend
            </Badge>
            <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
              <li>
                User-friendly dashboard for monitoring asset allocation, total
                value, and performance over time.
              </li>
              <li>
                Visualizations for portfolio distribution (pie charts, line
                graphs).
              </li>
              <li>Up to date sync of balances via a polling strategy.</li>
            </ul>
          </div>,
          <div>
            <Badge variant="outline" className="text-base font-bold">
              Backend
            </Badge>
            <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
              <li>
                CCXT Integration to fetch account balances and trading history
                from centralized exchanges like Binance, Kraken, and Coinbase.
              </li>
              <li>
                Infura & Alchemy Integration to pull on-chain token balances
                from Ethereum wallets and compatible networks.
              </li>
              <li>
                Redis for caching exchange responses and throttling external API
                usage.
              </li>
              <li>
                RESTful endpoints for securely exposing portfolio data to the
                frontend.
              </li>
            </ul>
          </div>,
        ],
      },
      solutions: [
        {
          description: "Cross-platform data normalization",
          problem: "Asset formats and naming conventions vary by platform.",
          solution:
            "The system maps and standardizes assets (e.g., BTC, WBTC, BTCB) into a unified schema.",
        },
        {
          description: "Rate-limiting mitigations",
          problem:
            "Frequent calls to external APIs and services could exceed rate limits especially on the more popular exchanges.",
          solution:
            "The system uses Redis for caching exchange responses and throttling external API usage.",
        },
        {
          description: "Security concerns",
          problem:
            "Exchange credentials should never be exposed to the frontend.",
          solution:
            "The system uses secure storage and one-way communication between services to protect sensitive data.",
        },
      ],
      closing: (
        <p>
          The service bridges the gap between fragmented crypto holdings and the
          need for unified visibility. By integrating CCXT, Infura, Alchemy, and
          Redis in a clean, scalable architecture, this service demonstrates how
          a full-stack application can offer both performance and precision in a
          domain where real-time accuracy matters. It reflects not just
          technical proficiency, but also a deep understanding of the challenges
          crypto users face daily—and solves them with elegance and efficiency.
        </p>
      ),
    },
  },
  {
    slug: "redis-real-time-client",
    title: "Real-Time Client for Redis",
    skills: ["Frontend", "Backend"],
    technologies: ["Node", "Redis", "ZeroMQ"],
    bigImage: "/redis-rt-package.png",
    description:
      "A real-time client for Redis, allowing users to subscribe to redis keys in similar fashion to Firebase Realtime Database.",
    challenges:
      "The challenge was to create a real-time client for Redis that allows users to subscribe to redis keys in similar fashion to Firebase Realtime Database.",
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
          Building real-time applications is no longer a niche need—it’s an
          expectation. However, if you're using Redis as your in-memory data
          store and need real-time updates across client applications, you're
          faced with a problem: Redis alone doesn’t support Firebase-style
          real-time subscriptions to keys out-of-the-box.
          <br />
          <div className="my-4" />
          Today, solving this means cobbling together your own solution—managing
          WebSocket connections, handling Redis pub/sub, keeping state in sync
          across instances, and building both the client and server
          infrastructure from scratch.
          <br />
          <div className="my-4" />
          I’m building{" "}
          <Badge variant="outline" className="text-xs lowercase">
            @npm/redis-rt/server + @npm/redis-rt/client
          </Badge>{" "}
          , a pair of lightweight, production-ready NPM packages designed to
          bridge this gap. It enables real-time key consumption in Redis, with
          minimal setup, using ZeroMQ for fast, reliable interprocess messaging.
          <br />
        </p>
      ),
      problem: {
        description:
          "Unlike Firebase, which offers a seamless client API to listen to real-time changes in specific paths of the database, Redis doesn’t have a native or straightforward equivalent. Developers often face:",
        listItems: [
          "Boilerplate-heavy WebSocket setup",
          "Redis pub/sub complexity",
          "Manual synchronization between processes/clients",
          "Lack of a unified abstraction for consuming key updates",
          "No built-in client tooling to handle reconnections, staleness, or subscription integrity",
        ],
      },
      architecture: {
        description:
          "This project offers a batteries-included, two-part solution:",
        listItems: [
          <div>
            <Badge variant="outline" className="text-base font-bold lowercase">
              @npm/redis-rt/server
            </Badge>
            <p>
              A Node.js middleware package that plugs directly into your
              existing Express server.
            </p>
            <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
              <li>
                ✅ Adds ready-to-use WebSocket endpoints for client
                communication
              </li>

              <li>✅ Manages key subscriptions for connected clients</li>

              <li>
                ✅ Publishes Redis key updates to subscribed clients via ZeroMQ
              </li>

              <li>
                ✅ Supports multiple Redis-backed services with internal channel
                mapping
              </li>

              <li>
                ✅ Isolates per-client updates to prevent over-broadcasting
              </li>
            </ul>
            <Card className="font-mono text-sm text-primary p-2 mt-4 w-[600px] gap-1 mb-8">
              <span>import express from 'express';</span>
              <span className="font-bold">
                import {"{ instantiateRealtimeRedis }"} from '@redis-rt/server';{" "}
                <span className="text-muted-foreground">
                  // import the module
                </span>
              </span>
              <br />
              <span>const app = express();</span>
              <span className="text-muted-foreground">
                // Extra express configuration goes here
              </span>
              <br />
              <span className="text-muted-foreground">
                // Attach Redis real-time sync module
              </span>
              <span className="font-bold">{`instantiateRealtimeRedis(app, {`}</span>
              <span className="ml-4 font-bold">
                redisUrl: process.env.REDIS_URL,
              </span>
              <span className="ml-4 font-bold">
                zmqBind: 'tcp://127.0.0.1:3001',
              </span>
              <span className="font-bold">{`});`}</span>
              <br />
              <span>
                app.listen(3000);{" "}
                <span className="text-muted-foreground">
                  // start the server
                </span>
              </span>
            </Card>
          </div>,
          <div>
            <Badge variant="outline" className="text-base font-bold lowercase">
              @npm/redis-rt/client
            </Badge>

            <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
              <li>✅ WebSocket-based connection to the server</li>
              <li>✅ Handles reconnections and retries</li>
              <li>✅ Ensures you're always in sync with latest key values</li>
              <li>✅ Simple API: subscribe to a key and react to updates</li>
            </ul>

            <Card className="font-mono text-sm text-primary p-2 mt-4 gap-1 w-[600px]">
              <span className="font-bold">
                import {`{ useRedisRealtimeClient }`} from '@redis-rt/client';
              </span>
              <br />
              <span className="font-bold">
                const {`{ watch } = useRedisRealtimeClient({`}
              </span>
              <span className="ml-4 font-bold">
                serverUrl: 'wss://yourdomain.com/realtime',
              </span>
              <span className="font-bold">{`});`}</span>

              <br />
              <span className="font-bold">
                const someValue = watch('someKey');
              </span>
              <span>// Use the value in your component</span>
            </Card>
          </div>,
        ],
      },
      solutions: [
        {
          description: "Efficient pub-sub message routing",
          problem:
            "How to efficiently route pub-sub messages to the correct client",
          solution: "Using ZeroMQ for fast, reliable interprocess messaging.",
        },
        {
          description: "Low-latency delivery",
          problem: "How to ensure low-latency delivery of messages to clients.",
          solution: "Using ZeroMQ for fast, reliable interprocess messaging.",
        },
        {
          description: "Easy scaling between multiple server instances",
          problem: "How to easily scale between multiple server instances.",
          solution: "Using ZeroMQ for fast, reliable interprocess messaging.",
        },
        {
          description: "Flexibility in topology and transport",
          problem: "How to ensure flexibility in topology and transport.",
          solution: "Using ZeroMQ for fast, reliable interprocess messaging.",
        },
      ],
      closing: (
        <p>
          The journey to implement real-time features with Redis has
          traditionally been paved with boilerplate code, manual WebSocket
          management, and fragile state synchronization. With
          <Badge variant="outline" className="lowercase text-sm">
            @redis-rt
          </Badge>
          , the goal is to eliminate that complexity by offering a unified,
          developer-friendly abstraction that just works.
          <br />
          <div className="my-4" />
          By bridging the gap between Redis and modern frontend expectations,
          this library empowers developers to build reactive, scalable systems
          without reinventing core infrastructure. Whether you're building
          collaborative tools, live dashboards, or financial applications,
          <Badge variant="outline" className="lowercase text-sm">
            @redis-rt
          </Badge>{" "}
          aims to bring the speed of Redis and the simplicity of Firebase
          together in one seamless experience.
        </p>
      ),
    },
  },
  // {
  //   slug: "trading-app-design",
  //   title: "Trading App Design",
  //   skills: ["Frontend", "Backend"],
  //   technologies: ["Figma", "Framer"],
  //   bigImage: "/trading-app-design.png",
  //   description:
  //     "A trading app design for UI or bot trading.",
  //   challenges:
  //     "Some of the challenges included designing a trading app for UI or bot trading that is both functional and aesthetically pleasing for either a retail or institutional trader.",
  //   features: [
  //     "Modern UI/UX design",
  //     "Responsive design",
  //     "Cross-platform compatibility",
  //     "Performance optimization",
  //     "Accessibility",
  //     "SEO",
  //   ],
  // },
];
