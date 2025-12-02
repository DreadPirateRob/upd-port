import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverEffect,
  PageTransition,
} from "@/components/animations/AnimationWrapper";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  projectTechnologies,
  areasInvolved,
  coreFunctionality,
  frontendStack,
  performanceConsiderations,
  userExperience,
  businessValue,
} from "./page-data";
import { technologiesData } from "@/data/projects";

function PriceExplorerPage() {
  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="left">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
                >
                  ← Back to Home
                </Link>
              </FadeIn>

              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <StaggerContainer
                    className="flex flex-wrap gap-2 mb-4"
                    staggerDelay={0.05}
                  >
                    {areasInvolved.map((skill) => (
                      <StaggerItem key={skill}>
                        <Badge>{skill}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <FadeIn direction="up" delay={0.3}>
                    <h1 className="text-4xl font-bold mb-4">
                      Multi-Exchange Cryptocurrency Watchlist
                    </h1>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4}>
                    <p className="text-xl text-muted-foreground mb-6">
                      Real-time price monitoring application providing
                      aggregated market data across exchanges with granular
                      exchange-level breakdown for comprehensive price
                      discovery.
                    </p>
                  </FadeIn>

                  <StaggerContainer
                    className="flex flex-wrap gap-2"
                    staggerDelay={0.05}
                  >
                    {projectTechnologies.map((tag) => (
                      <StaggerItem key={tag}>
                        <Badge variant="secondary">{tag}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              <div className="col-span-24 aspect-video mb-8 border border-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]">
                <div className="relative h-full">
                  <Image
                    src={"/streaming-watchlist.png"}
                    alt="Multi-Exchange Cryptocurrency Watchlist"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pt-0 py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
              </FadeIn>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                staggerDelay={0.1}
              >
                {projectTechnologies.map((tech, index) => (
                  <StaggerItem key={index}>
                    <HoverEffect effect="lift">
                      <Card className="h-full transition-all duration-300 hover:border-primary/20">
                        <CardHeader>
                          <div className="flex items-center gap-6">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{tech.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">{tech}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {technologiesData[tech].description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </HoverEffect>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">The Problem</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground">
                    Cryptocurrency traders monitoring assets listed on multiple
                    exchanges face a fragmented view of the market. Checking
                    Bitcoin prices requires opening separate tabs for Binance,
                    Coinbase, Kraken, and others—making it difficult to spot
                    arbitrage opportunities, compare liquidity, or understand
                    true market depth. Existing portfolio trackers show single
                    price points without revealing the exchange-level variations
                    that impact trading decisions.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">Solution Overview</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Built a{" "}
                    <strong className="text-primary">
                      real-time watchlist application
                    </strong>{" "}
                    that aggregates cryptocurrency prices by instrument while
                    maintaining full transparency into per-exchange pricing.
                    Users see unified views of their monitored assets (BTC, ETH,
                    SOL, etc.) with the ability to expand any row and view live
                    prices, spreads, and volume across every exchange where that
                    asset trades.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {coreFunctionality.map((functionality) => (
                      <li key={functionality.label}>
                        <strong className="text-primary">
                          {functionality.label}
                        </strong>{" "}
                        {functionality.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <div className="col-span-24 aspect-video mb-8 border border-border bg-size-[10px_10px] ">
                    <div className="relative h-full">
                      <Image
                        src={"/streaming-watchlist.png"}
                        alt="Global Distributed Market Data Platform Order Book Management"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">
                    Technical Implementation
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl mb-6">Frontend Stack</p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {frontendStack.map((stack) => (
                      <li key={stack.label}>
                        <strong className="text-primary">{stack.label}</strong>{" "}
                        {stack.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    <strong className="text-primary">Data Flow: </strong>The
                    application subscribes to ticker streams for selected
                    instruments via WebSocket, receiving normalized price data
                    from the backend's distributed edge nodes. On the frontend,
                    a price aggregation layer calculates volume-weighted
                    averages and spread metrics in real-time. When users expand
                    an instrument, the component fetches (or reveals cached)
                    per-exchange ticker data and maintains individual WebSocket
                    subscriptions for those price streams.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl mb-6">Performance Considerations</p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {performanceConsiderations.map((consid) => (
                      <li key={consid.label}>
                        <strong className="text-primary">{consid.label}</strong>{" "}
                        {consid.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">User Experience</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    The interface prioritizes{" "}
                    <strong className="text-primary">speed and clarity</strong>.
                    The default collapsed view shows essential information:
                    instrument name, aggregated price, 24h change, and a spread
                    indicator (tight/wide/extreme). Visual flash effects provide
                    immediate feedback on price movements—green for upticks, red
                    for downticks.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Expanding an instrument reveals a sub-table with
                    exchange-specific data: individual prices, bid-ask spreads,
                    24h volume, and last update timestamp. This allows users to
                    quickly identify:
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {userExperience.map((experience) => (
                      <li key={experience.label}>
                        <strong className="text-primary">
                          {experience.label}
                        </strong>{" "}
                        {experience.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">
                    Technical Highlights
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    <strong className="text-primary">
                      State management complexity:
                    </strong>{" "}
                    Managing nested WebSocket subscriptions (instrument-level vs
                    exchange-level) required careful consideration of
                    subscription lifecycle. When expanding/collapsing rows, the
                    application intelligently subscribes/unsubscribes to avoid
                    unnecessary data transfer while maintaining smooth
                    transitions.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    <strong className="text-primary">
                      Real-time aggregation:
                    </strong>{" "}
                    Implemented a sliding window algorithm for volume-weighted
                    price calculation that efficiently updates as new exchange
                    data arrives, without recalculating the entire aggregation
                    on every tick.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    <strong className="text-primary">
                      Connection resilience:
                    </strong>{" "}
                    The WebSocket client includes automatic reconnection logic
                    with exponential backoff, visual connection status
                    indicators, and graceful degradation to cached prices during
                    temporary disconnections.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Business Value
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {businessValue.map((value) => (
                      <li key={value.label}>
                        <strong className="text-primary">{value.label}</strong>{" "}
                        {value.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6">What I Learned</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    This project reinforced the importance of{" "}
                    <strong className="text-primary">
                      performance budgets in real-time applications.
                    </strong>
                    Early iterations suffered from excessive re-renders when
                    processing high-frequency ticker updates. Profiling revealed
                    that naive state updates were triggering full component tree
                    re-renders. Implementing React.memo, useMemo for expensive
                    calculations, and batching WebSocket messages improved
                    render performance by 10x.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    I also gained deeper appreciation for{" "}
                    <strong className="text-primary">
                      UX in financial interfaces
                    </strong>{" "}
                    —the balance between information density and cognitive load.
                    Initial designs crammed too much data into the default view,
                    overwhelming users. The expandable pattern emerged as the
                    optimal solution: present critical information upfront,
                    provide depth on demand.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    The biggest challenge was{" "}
                    <strong className="text-primary">
                      WebSocket subscription management at scale
                    </strong>{" "}
                    . With users potentially expanding/collapsing dozens of
                    instruments, subscription churn could overwhelm the
                    connection. Implementing a subscription pooling strategy
                    (reusing exchange-level subscriptions across multiple
                    expanded instruments) reduced WebSocket traffic by 60% while
                    maintaining real-time responsiveness.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          <section className="py-12 px-4 bg-muted/50">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-4">
                  Interested in Working Together?
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-muted-foreground mb-8">
                  Let&apos;s discuss your next project and see how I can help
                  bring your ideas to life.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <div className="flex gap-4 justify-center">
                  <HoverEffect effect="scale">
                    <a href="mailto:adriangarcia9916@gmail.com">
                      <Button size="lg">Get In Touch</Button>
                    </a>
                  </HoverEffect>
                  <Link href="/#projects-section">
                    <HoverEffect effect="scale">
                      <Button variant="outline" size="lg">
                        View More Projects
                      </Button>
                    </HoverEffect>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default PriceExplorerPage;

export async function generateMetadata() {
  return {
    title: `Multi-Exchange Cryptocurrency Watchlist - Adrian Garcia`,
    description: `Real-time price monitoring application providing aggregated market data across exchanges with granular exchange-level breakdown for comprehensive price discovery.`,
  };
}
