---
order: 1
title: "Global Distributed Market Data Platform"
description: "High-performance, geographically distributed infrastructure delivering ultra-low latency cryptocurrency market data through a unified API."
challenges: "This project deepened my understanding of distributed systems trade-offs—particularly how to maintain data freshness across geographic regions while handling eventual consistency. Managing WebSocket lifecycle at scale (reconnection storms, exchange maintenance windows, rate limiting) required robust state machines and exponential backoff strategies."
technologies: [CCXT, Redis, Node, PM2]
bigImage: /md-platform/infra.png
areas: [Backend, Systems, Infrastructure]
---

## The Challenge

Cryptocurrency traders, portfolio managers, and algorithmic trading systems require real-time market data with minimal latency to make informed decisions. Accessing exchanges from distant geographical regions introduces 150-300ms+ roundtrip delays—critical when milliseconds determine whether you're reading stale prices or live market conditions. Existing solutions force developers to manage multiple WebSocket connections, handle exchange-specific data formats, and build their own normalization layers.

![Global Distributed Market Data Platform Bad Infrastructure](/md-platform/bad-infra.png)

## Solution Architecture

Built a **globally distributed market data service** with edge nodes strategically positioned near major exchange clusters (Tokyo, Singapore, Frankfurt, Virginia, São Paulo) to minimize network latency. Each node maintains persistent WebSocket connections to regional exchanges and streams normalized data, while a unified API layer abstracts the complexity for clients.

![Global Distributed Market Data Platform Infrastructure](/md-platform/infra.png)

### Key Technical Implementations

- **CCXT integration** providing normalized market data interfaces across 100+ exchanges, handling exchange-specific data formats and WebSocket protocols
- **Redis Cluster** for sub-millisecond cross-region order book caching, ticker storage, and real-time data distribution across distributed nodes
- **Node.js event-driven architecture** handling thousands of concurrent WebSocket connections per node with non-blocking I/O
- **PM2 cluster mode** ensuring zero-downtime deployments and automatic process resurrection on node failures
- **Intelligent data routing** clients automatically connect to the geographically optimal node for their target exchanges, reducing data latency by 60-80% compared to single-region deployments
- **Connection pooling and keep-alive strategies** maintaining persistent exchange connections to eliminate handshake overhead and ensure continuous data streams

### Comprehensive Market Data Coverage

The platform delivers normalized streams for all critical market data types:

- **Ticker Data** Best bid/ask, 24h volume, price changes, and exchange-specific metrics (open interest for derivatives)
- **Order book depth: ** Configurable depth levels (L2 data with 20/50/100 levels or full book), supporting both snapshot and incremental delta updates
- **Trade streams: ** Individual trades with price, volume, side (maker/taker), and microsecond timestamps
- **Funding rates (perpetuals): ** 8-hour funding rates for perpetual futures contracts, crucial for derivatives traders managing holding costs
- **Liquidation feeds: ** Real-time liquidation events with position size, liquidation price, and affected symbols—valuable for sentiment analysis and cascade prediction
- **Index prices and mark prices: ** Exchange-calculated fair value prices used for perpetual contract settlement

## Order Book Management: The Core Challenge

Maintaining accurate, real-time order book state across distributed nodes presented the most complex technical challenge. Different exchanges use vastly different update mechanisms:

- **State Synchronization Logic: ** Implemented checksum validation comparing locally computed order book checksums against exchange-provided values (CRC32 for Binance, custom hashing for others). When checksum mismatches occur (indicating state drift), the system automatically triggers re-synchronization without disrupting client connections
- **Snapshot vs. Delta Updates: ** Exchanges like Binance send periodic full order book snapshots (every 1000ms) with delta updates in between, while others like Coinbase send only deltas requiring perfect state reconstruction. The system handles both patterns, automatically requesting fresh snapshots when delta sequences indicate missed messages.
- **Out-of-order message handling: ** Network conditions occasionally deliver WebSocket messages out of sequence. Built a reordering buffer that holds messages with future sequence numbers for up to 500ms, allowing late-arriving messages to slot into correct positions before processing.
- **Memory management: ** Full order book depth for liquid pairs can contain 10,000+ price levels. Implemented configurable depth limits with smart pruning—maintaining full depth internally but streaming only client-requested levels (typically top 20-100) to reduce bandwidth. Redis stores compressed order book snapshots with LRU eviction for less-active pairs.
- **Performance optimization: ** Order book updates are the highest-throughput data type (100-1000 updates/second for major pairs). Used binary search for price level insertion and maintained separate sorted structures for bids/asks, achieving O(log n) update complexity instead of O(n) linear scans.

![Global Distributed Market Data Platform Order Book Flow](/md-platform/flow.png)

## Deployment Strategy: Edge-Located vs Monolithic

Maintaining accurate, real-time order book state across distributed nodes presented the most complex technical challenge. Different exchanges use vastly different update mechanisms:

### Why geo-distributed edge nodes?

The decision to deploy edge nodes co-located near exchange data centers rather than a single monolithic deployment was driven by the physics of network latency and the economics of data freshness.

### Latency breakdown

The decision to deploy edge nodes co-located near exchange data centers rather than a single monolithic deployment was driven by the physics of network latency and the economics of data freshness.

- A monolithic US-East deployment connecting to Binance (Tokyo) experiences ~180-220ms RTT
- An edge node in Tokyo connecting to Binance sees ~2-8ms RTT
- For WebSocket streams processing 1,000+ messages/second, this compounds: every reconnection, every ping/pong, every rate limit boundary adds latency

### Regional exchange clustering

The decision to deploy edge nodes co-located near exchange data centers rather than a single monolithic deployment was driven by the physics of network latency and the economics of data freshness.

- **APAC cluster (Tokyo/Singapore): ** Binance, Bybit, OKX, Bitget, HTX - the highest volume venues
- **Europe cluster (Frankfurt): ** Kraken, Bitstamp, Deribit
- **US cluster (Virginia): ** Coinbase, Gemini, Kraken US
- **South America (São Paulo): ** Mercado Bitcoin, regional exchanges

Each exchange's WebSocket servers are geographically anchored. Connecting from the wrong continent means fighting both distance and often suboptimal BGP routing.

## What I Learned

This project deepened my understanding of **distributed systems trade-offs**—particularly how to maintain data freshness across geographic regions while handling eventual consistency. Managing WebSocket lifecycle at scale (reconnection storms, exchange maintenance windows, rate limiting) required robust state machines and exponential backoff strategies.

The **order book state management problem** was genuinely challenging—requiring deep understanding of different exchange protocols, careful memory management, and sophisticated error detection. Debugging distributed state drift across regional nodes taught me the value of comprehensive observability: you can't fix what you can't measure.

I also gained appreciation for **exchange API diversity**: what CCXT abstracts well (ticker normalization, basic order book parsing) versus where custom handling proved necessary (handling Bybit's snapshot compression, FTX's checksum algorithm before their closure, Kraken's volume-weighted book levels). Building resilient systems around third-party APIs that can change without notice requires defensive programming and extensive integration testing.

The performance optimization work—particularly the order book update path—reinforced that **algorithmic efficiency matters** even in modern JavaScript. The difference between O(n) and O(log n) operations becomes painfully obvious when processing 1000 updates/second per symbol across hundreds of trading pairs.
