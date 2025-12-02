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
import { technologiesData } from "@/data/projects";

function Page() {
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
                    {["Frontend"].map((skill) => (
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
                    {["React"].map((tag) => (
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
                {["React"].map((tech, index) => (
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

export default Page;
