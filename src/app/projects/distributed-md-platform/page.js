import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  keyTechnicalImplementations,
  comprehensiveMarketDataCoverage,
  orderbookManagementChallenge,
  latencyBreakdown,
  regionalExchangeClustering,
  areasInvolved,
  projectTechnologies,
} from "./page-data";
import { technologiesData } from "@/data/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DistributedMarketDataPlatform() {
  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] "></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] "></div>
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
                    {areasInvolved.map((area) => (
                      <StaggerItem key={area}>
                        <Badge>{area}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <FadeIn direction="up" delay={0.3}>
                    <h1 className="text-4xl font-bold mb-4">
                      Global Distributed Market Data Platform
                    </h1>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4}>
                    <p className="text-xl text-muted-foreground mb-6">
                      High-performance, geographically distributed
                      infrastructure delivering ultra-low latency cryptocurrency
                      market data through a unified API.
                    </p>
                  </FadeIn>

                  <StaggerContainer
                    className="flex flex-wrap gap-2"
                    staggerDelay={0.05}
                  >
                    {projectTechnologies.map((technology) => (
                      <StaggerItem key={technology}>
                        <Badge variant="secondary">{technology}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              <div className="col-span-24 aspect-video border border-border bg-size-[10px_10px] ">
                <div className="relative h-full">
                  <Image
                    src={"/md-platform/infra.png"}
                    alt="Global Distributed Market Data Platform Infrastructure"
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
                  <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Cryptocurrency traders, portfolio managers, and algorithmic
                    trading systems require real-time market data with minimal
                    latency to make informed decisions. Accessing exchanges from
                    distant geographical regions introduces 150-300ms+ roundtrip
                    delays—critical when milliseconds determine whether you're
                    reading stale prices or live market conditions. Existing
                    solutions force developers to manage multiple WebSocket
                    connections, handle exchange-specific data formats, and
                    build their own normalization layers.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <div className="col-span-24 aspect-video border border-border bg-size-[10px_10px] ">
                    <div className="relative h-full">
                      <Image
                        src={"/md-platform/bad-infra.png"}
                        alt="Global Distributed Market Data Platform Bad Infrastructure"
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
                    Solution Architecture
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Built a{" "}
                    <strong className="text-primary">
                      globally distributed market data service
                    </strong>{" "}
                    with edge nodes strategically positioned near major exchange
                    clusters (Tokyo, Singapore, Frankfurt, Virginia, São Paulo)
                    to minimize network latency. Each node maintains persistent
                    WebSocket connections to regional exchanges and streams
                    normalized data, while a unified API layer abstracts the
                    complexity for clients.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <h2 className="text-lg font-bold mb-2">
                    Key Technical Implementations
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {keyTechnicalImplementations.map((implementation) => (
                      <li key={implementation.label}>
                        <strong className="text-primary">
                          {implementation.label}
                        </strong>{" "}
                        {implementation.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <div className="col-span-24 aspect-video border border-border bg-size-[10px_10px] ">
                    <div className="relative h-full">
                      <Image
                        src={"/md-platform/infra.png"}
                        alt="Global Distributed Market Data Platform Infrastructure"
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
                    Comprehensive Market Data Coverage
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    The platform delivers normalized streams for all critical
                    market data types:
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {comprehensiveMarketDataCoverage.map((implementation) => (
                      <li key={implementation.label}>
                        <strong className="text-primary">
                          {implementation.label}
                        </strong>{" "}
                        {implementation.description}
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
                    Order Book Management: The Core Challenge
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Maintaining accurate, real-time order book state across
                    distributed nodes presented the most complex technical
                    challenge. Different exchanges use vastly different update
                    mechanisms:
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {orderbookManagementChallenge.map((implementation) => (
                      <li key={implementation.label}>
                        <strong className="text-primary">
                          {implementation.label}
                        </strong>{" "}
                        {implementation.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <div className="col-span-24 aspect-[9/10] mb-8 bg-size-[10px_10px] ">
                    <div className="relative h-full">
                      <Image
                        src={"/md-platform/flow.png"}
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
            <div className="max-w-4xl mx-auto text-muted-foreground">
              <StaggerContainer staggerDelay={0.1}>
                <StaggerItem>
                  <h2 className="text-2xl font-bold mb-6 text-primary">
                    Deployment Strategy: Edge-Located vs Monolithic
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    Maintaining accurate, real-time order book state across
                    distributed nodes presented the most complex technical
                    challenge. Different exchanges use vastly different update
                    mechanisms:
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <strong className="text-primary text-xl">
                    Why geo-distributed edge nodes?
                  </strong>
                  <p className="my-4 mb-8 text-lg">
                    The decision to deploy edge nodes co-located near exchange
                    data centers rather than a single monolithic deployment was
                    driven by the physics of network latency and the economics
                    of data freshness.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <strong className="text-primary text-xl">
                    Latency breakdown
                  </strong>
                </StaggerItem>
                <StaggerItem>
                  <p className="my-4 text-lg">
                    The decision to deploy edge nodes co-located near exchange
                    data centers rather than a single monolithic deployment was
                    driven by the physics of network latency and the economics
                    of data freshness.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {latencyBreakdown.map((implementation) => (
                      <li key={implementation}>{implementation}</li>
                    ))}
                  </ul>
                </StaggerItem>

                <StaggerItem>
                  <strong className="text-primary text-xl">
                    Regional exchange clustering
                  </strong>
                  <p className="my-4 text-lg">
                    The decision to deploy edge nodes co-located near exchange
                    data centers rather than a single monolithic deployment was
                    driven by the physics of network latency and the economics
                    of data freshness.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <ul className="list-disc list-inside ml-4 space-y-4 mb-6 text-muted-foreground">
                    {regionalExchangeClustering.map((cluster) => (
                      <li key={cluster.label}>
                        <strong className="text-primary">
                          {cluster.label}
                        </strong>{" "}
                        {cluster.description}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-lg">
                    Each exchange's WebSocket servers are geographically
                    anchored. Connecting from the wrong continent means fighting
                    both distance and often suboptimal BGP routing.
                  </p>
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
                    This project deepened my understanding of{" "}
                    <strong className="text-primary">
                      distributed systems trade-offs
                    </strong>
                    —particularly how to maintain data freshness across
                    geographic regions while handling eventual consistency.
                    Managing WebSocket lifecycle at scale (reconnection storms,
                    exchange maintenance windows, rate limiting) required robust
                    state machines and exponential backoff strategies.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    The{" "}
                    <strong className="text-primary">
                      order book state management problem
                    </strong>{" "}
                    was genuinely challenging—requiring deep understanding of
                    different exchange protocols, careful memory management, and
                    sophisticated error detection. Debugging distributed state
                    drift across regional nodes taught me the value of
                    comprehensive observability: you can't fix what you can't
                    measure.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    I also gained appreciation for{" "}
                    <strong className="text-primary">
                      exchange API diversity
                    </strong>
                    : what CCXT abstracts well (ticker normalization, basic
                    order book parsing) versus where custom handling proved
                    necessary (handling Bybit's snapshot compression, FTX's
                    checksum algorithm before their closure, Kraken's
                    volume-weighted book levels). Building resilient systems
                    around third-party APIs that can change without notice
                    requires defensive programming and extensive integration
                    testing.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-xl text-muted-foreground mb-6">
                    The performance optimization work—particularly the order
                    book update path—reinforced that{" "}
                    <strong className="text-primary">
                      algorithmic efficiency matters
                    </strong>{" "}
                    even in modern JavaScript. The difference between O(n) and
                    O(log n) operations becomes painfully obvious when
                    processing 1000 updates/second per symbol across hundreds of
                    trading pairs.
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

export async function generateMetadata() {
  return {
    title: `Global Distributed Market Data Platform - Adrian Garcia`,
    description: `High-performance, geographically distributed infrastructure delivering ultra-low latency cryptocurrency market data through a unified API.`,
  };
}
