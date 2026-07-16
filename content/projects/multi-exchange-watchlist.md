---
order: 2
title: "Multi-Exchange Cryptocurrency Watchlist"
description: "Real-time price monitoring application providing aggregated market data across exchanges with granular exchange-level breakdown for comprehensive price discovery."
challenges: "This project reinforced the importance of performance budgets in real-time applications. Early iterations suffered from excessive re-renders when processing high-frequency ticker updates. Profiling revealed that naive state updates were triggering full component tree re-renders. Implementing multiple strategies for controlled updates improved render performance by 10x."
technologies: [React, Websocket, Express, AgGrid]
bigImage: /streaming-watchlist.png
areas: [Frontend, Backend]
---

## The Problem

Cryptocurrency traders monitoring assets listed on multiple exchanges face a fragmented view of the market. Checking Bitcoin prices requires opening separate tabs for Binance, Coinbase, Kraken, and others—making it difficult to spot arbitrage opportunities, compare liquidity, or understand true market depth. Existing portfolio trackers show single price points without revealing the exchange-level variations that impact trading decisions.

## Solution Overview

Built a **real-time watchlist application** that aggregates cryptocurrency prices by instrument while maintaining full transparency into per-exchange pricing. Users see unified views of their monitored assets (BTC, ETH, SOL, etc.) with the ability to expand any row and view live prices, spreads, and volume across every exchange where that asset trades.

![Multi-Exchange Cryptocurrency Watchlist](/streaming-watchlist.png)

### Core Functionality

- **Instrument-level aggregation: ** Each cryptocurrency displays a primary price with visual indicators for price dispersion
- **Expandable exchange breakdown: ** Click any instrument to reveal real-time prices from all connected exchanges, sorted by volume or price
- **Live WebSocket updates: ** Prices update in real-time without page refreshes, with visual flash indicators showing price movements
- **Clean, scannable interface: ** Minimalist design focused on information density—see 20+ instruments simultaneously with instant access to deeper data

## Technical Implementation

### Frontend Stack

- **React** with functional components and hooks for state management
- **WebSocket client** maintaining persistent connection to the distributed market data API
- **Real-time data handling:** Implemented efficient state updates to process hundreds of price ticks per second without UI jank
- **Expandable row pattern:** Smooth animations and lazy-loaded exchange data when expanding instruments
- **Responsive grid layout** optimized for both wide trading monitors and mobile devices

### Data Flow

**Data Flow:** The application subscribes to ticker streams for selected instruments via WebSocket, receiving normalized price data from the backend's distributed edge nodes. On the frontend, a price aggregation layer calculates volume-weighted averages and spread metrics in real-time. When users expand an instrument, the component fetches (or reveals cached) per-exchange ticker data and maintains individual WebSocket subscriptions for those price streams.

### Performance Considerations

- **Virtualized rendering:** for watchlists exceeding 50 instruments, only rendering visible rows
- **Debounced price updates:** (60fps throttle) to prevent excessive re-renders during high-volatility periods
- **Memoized calculations:** for aggregated prices and spread computations
- **WebSocket message batching:** to process multiple ticker updates in a single render cycle

## User Experience

The interface prioritizes **speed and clarity**. The default collapsed view shows essential information: instrument name, aggregated price, 24h change, and a spread indicator (tight/wide/extreme). Visual flash effects provide immediate feedback on price movements—green for upticks, red for downticks.

Expanding an instrument reveals a sub-table with exchange-specific data: individual prices, bid-ask spreads, 24h volume, and last update timestamp. This allows users to quickly identify:

- **Arbitrage opportunities:** When prices diverge significantly across exchanges
- **Liquidity concentration:** Which exchanges have the deepest markets
- **Exchange health:** Detecting stale data or connectivity issues on specific exchanges

## Technical Highlights

**State management complexity:** Managing nested WebSocket subscriptions (instrument-level vs exchange-level) required careful consideration of subscription lifecycle. When expanding/collapsing rows, the application intelligently subscribes/unsubscribes to avoid unnecessary data transfer while maintaining smooth transitions.

**Real-time aggregation:** Implemented a sliding window algorithm for volume-weighted price calculation that efficiently updates as new exchange data arrives, without recalculating the entire aggregation on every tick.

**Connection resilience:** The WebSocket client includes automatic reconnection logic with exponential backoff, visual connection status indicators, and graceful degradation to cached prices during temporary disconnections.

### Business Value

- **Price discovery:** Users gain complete market visibility without juggling multiple exchange interfaces
- **Efficiency:** Monitor 50+ instruments with exchange-level detail through a single lightweight application
- **Speed:** Real-time updates with &lt;5ms frontend processing latency from WebSocket message receipt to DOM update
- **Simplicity:** Zero configuration required—add instruments to watchlist and immediately see aggregated + detailed pricing

## What I Learned

This project reinforced the importance of **performance budgets in real-time applications.** Early iterations suffered from excessive re-renders when processing high-frequency ticker updates. Profiling revealed that naive state updates were triggering full component tree re-renders. Implementing React.memo, useMemo for expensive calculations, and batching WebSocket messages improved render performance by 10x.

I also gained deeper appreciation for **UX in financial interfaces**—the balance between information density and cognitive load. Initial designs crammed too much data into the default view, overwhelming users. The expandable pattern emerged as the optimal solution: present critical information upfront, provide depth on demand.

The biggest challenge was **WebSocket subscription management at scale**. With users potentially expanding/collapsing dozens of instruments, subscription churn could overwhelm the connection. Implementing a subscription pooling strategy (reusing exchange-level subscriptions across multiple expanded instruments) reduced WebSocket traffic by 60% while maintaining real-time responsiveness.
