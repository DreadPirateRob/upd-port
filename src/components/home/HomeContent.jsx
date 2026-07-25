"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverEffect,
  TextReveal,
  AnimatedCounter,
} from "@/components/animations/AnimationWrapper";
import Footer from "@/components/footer";
import TextmodeBg from "@/components/ui/textmode-bg";
import AsciiTextReveal from "@/components/ui/ascii-text-reveal";
import { AnimatePresence, motion } from "motion/react";
import ProjectListRow from "@/components/home/ProjectListRow";
import GridButton from "@/components/evil-buttons/grid-button";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import CaseStudyAccordion from "@/components/home/CaseStudyAccordion";
import SkillCard from "@/components/home/SkillCard";
import { ScrambleHeading } from "@/components/ui/scramble-text";

const HEADING_SCRAMBLE = { staggerMs: 11, tickMs: 22, scrambleRounds: 3 };

export default function HomeContent({ projects }) {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    {
      slug: "high-performance-interfaces",
      title: "High-Performance Interfaces",
      description:
        "Building responsive, data-intensive interfaces for real-time financial applications, with a focus on performance, usability and maintainable architecture.",
      tags: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "AG Grid"],
      colSpan: "col-span-16 lg:col-span-14",
    },
    {
      slug: "real-time-applications",
      title: "Real-Time Applications",
      description:
        "Creating end-to-end applications that stream, process and present continuously changing data with minimal delay.",
      tags: ["WebSockets", "Server-Sent Events", "Web Workers", "NATS", "JetStream", "Redis"],
      colSpan: "col-span-16 lg:col-span-10",
    },
    {
      slug: "distributed-systems",
      title: "Distributed Systems",
      description:
        "Designing scalable and fault-tolerant services with clear communication patterns, consistency guarantees and failure boundaries.",
      tags: [
        "Rust",
        "Node.js",
        "gRPC",
        "Protobuf",
        "Event-Driven Architecture",
        "Distributed Messaging",
      ],
      colSpan: "col-span-16 lg:col-span-12",
    },
    {
      slug: "trading-infrastructure",
      title: "Trading Infrastructure",
      description:
        "Building systems that support market-data distribution, order management, execution, risk controls and real-time portfolio monitoring.",
      tags: [
        "Market Data",
        "OMS/EMS",
        "Smart Order Routing",
        "FIX",
        "Risk Controls",
        "Reconciliation",
      ],
      colSpan: "col-span-16 lg:col-span-12",
    },
    {
      slug: "data-pipelines-and-storage",
      title: "Data Pipelines and Storage",
      description:
        "Developing high-throughput pipelines for ingesting, normalizing, distributing and storing financial and operational data.",
      tags: ["Kafka", "NATS", "ClickHouse", "PostgreSQL", "Redis", "Stream Processing"],
      colSpan: "col-span-16 lg:col-span-14",
    },
    {
      slug: "backend-and-api-engineering",
      title: "Backend and API Engineering",
      description:
        "Developing secure and performant APIs that connect interfaces, internal services and external financial infrastructure.",
      tags: ["REST", "GraphQL", "gRPC", "Express", "Authentication", "Authorization"],
      colSpan: "col-span-16 lg:col-span-10",
    },
    {
      slug: "reliability-and-observability",
      title: "Reliability and Observability",
      description:
        "Ensuring distributed applications remain measurable, recoverable and reliable during failures and periods of elevated activity.",
      tags: [
        "OpenTelemetry",
        "Prometheus",
        "Grafana",
        "Distributed Tracing",
        "SLOs",
        "Alerting",
      ],
      colSpan: "col-span-16 lg:col-span-12",
    },
    {
      slug: "infrastructure-and-delivery",
      title: "Infrastructure and Delivery",
      description:
        "Deploying and operating applications through reproducible environments, automated pipelines and production-grade infrastructure.",
      tags: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "AWS", "systemd"],
      colSpan: "col-span-16 lg:col-span-12",
    },
  ];

  const events = [
    {
      year: "Jan 2026 - Present",
      company: "CoinRoutes",
      title: "OEMS & AI Tooling — Full Stack Engineer",
      description: "Continuing at CoinRoutes, now focused on expanding the platform's exchange connectivity and custom liquidity provider support. Responsible for building out the integrations layer that powers execution across venues, while driving architecture and infrastructure improvements in direct response to evolving business and product requirements. Alongside core product work, building internal developer tooling designed to enhance team workflows and accelerate delivery in an era where AI-assisted development is becoming central to how modern engineering teams operate. Emphasis on scalability, reliability, and long-term maintainability across the full stack.",
    },
    {
      year: "Feb 2025 - Jan 2026",
      company: "CoinRoutes",
      title: "Trading Platform — Front-End Engineering Lead",
      description: "Led front-end architecture and development for a high-performance trading platform, managing a team of five engineers. Steered the team's technical direction while continuing as a hands-on IC — spearheading performance optimization, maintaining design system integrity, and driving collaboration across design, product, and backend engineering to deliver scalable, real-time interfaces for professional traders and institutions.",
    },
    {
      year: "Apr 2023 - Feb 2025",
      company: "CoinRoutes",
      title: "OEMS — Product Lead & UX Architect",
      description:
        "As a cross-functional leader at CoinRoutes, I operated at the intersection of product, design, and engineering, leading initiatives across the full product lifecycle of our OEMS (Order and Execution Management System) for crypto trading. I drove product strategy from ideation to deployment, collaborated closely with institutional clients, and translated complex trading workflows into performant, intuitive interfaces — directing UX/UI initiatives that improved trader efficiency across multi-venue execution environments, building reusable UI systems that cut feature delivery time by 40%, and serving as the primary bridge between engineering and executive stakeholders to keep technical execution aligned with product vision.",
    },
    {
      year: "Jan 2022 - Apr 2023",
      company: "CoinRoutes",
      title: "Trading Platform — Front-End Engineer",
      description:
        "Contributed to the design and development of CoinRoutes' enterprise-grade crypto trading platform, handling real-time data visualization, state management, and cross-browser performance optimization for professional trading clients. Led major UI refactors for responsiveness and modularity, integrated WebSockets and streaming APIs for live execution and market data, contributed to a shared component library used across internal and client-facing tools, and worked closely with backend engineers to optimize data flow for low-latency environments.",
    },
    {
      year: "April - Jul 2021",
      company: "Udemy",
      title: "Blockchain & DeFi — Solidity Certification",
      description:
        "Completed a formal Solidity development program to deepen my understanding of Ethereum-based smart contracts and DeFi protocols. Gained practical experience in building and securing decentralized applications (dApps), with hands-on work in Solidity, Truffle, and Web3.js. This training gave me the technical versatility to bridge front-end engineering with on-chain logic and contributed to my ability to build secure, full-stack decentralized systems.",
    },
    {
      year: "May 2020 - Mar 2021",
      company: "Miami Dev Shop",
      title: "Web Applications — Front-End Intern",
      description:
        "Joined a fast-paced development team during my academic tenure, contributing to web application features while gaining firsthand experience with agile processes, version control, and design-to-dev handoff workflows. Translated mockups into responsive, accessible interfaces, participated in sprint planning and retrospectives, and collaborated with senior developers on production-grade codebases.",
    },
    {
      year: "Jan - Apr 2020",
      company: "BrainStation",
      title: "Full Stack Web Development Bootcamp",
      description:
        "Completed an intensive coding bootcamp focused on modern JavaScript development (React, Node.js, Express, MongoDB). Built and deployed multiple full-stack applications in team environments, gaining hands-on experience with REST APIs, component-based design, server-side logic, and best practices in Git workflows, testing, and deployment pipelines.",
    },
    {
      year: "Aug 2017 - Jul 2019",
      company: "Miami Dade College",
      title: "BA: Computer Science",
      description:
        "Developed a foundational understanding of computer science principles, including algorithms, data structures, and low-level system design. This academic background continues to inform my architectural and problem-solving decisions as a developer.",
    },
  ];
  const visibleEvents = showAllExperience ? events : events.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          {/* Hero Section */}
          <section className="h-[90vh] flex items-center justify-center py-20 px-4 text-center relative">
            <TextmodeBg />
            <div className="max-w-4xl mx-auto z-1">
              <div>
                <GridButton className="mb-4">Available for work</GridButton>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                  <AsciiTextReveal text="Hi, I'm Adrian Garcia" delay={300} />
                </h1>
              </div>
              <FadeIn direction="up" delay={0.4}>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Distributed systems engineer and architect focused on building high-performance interfaces, real-time data pipelines and low-latency infrastructure for digital financial operations.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.6}>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="#projects-section">
                    <ClickPowerUp>View Projects</ClickPowerUp>
                  </Link>
                  <HoverEffect effect="scale">
                    <a href="mailto:adriangarcia9916@gmail.com">
                      <ClickPowerUp variant="secondary">Contact Me</ClickPowerUp>
                    </a>
                  </HoverEffect>
                </div>
              </FadeIn>
            </div>
          </section>

          <Separator />

          {/* Skills Section */}
          <section id="skills-section" className="py-16 px-4 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl text-left mb-16">
                <FadeIn direction="left">
                  <GridButton className="mb-4">Skills</GridButton>
                </FadeIn>
                <FadeIn direction="left" delay={0.2}>
                  <ScrambleHeading
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
                    text={"Languages, \nLibraries and Frameworks"}
                    config={HEADING_SCRAMBLE}
                  />
                </FadeIn>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-24 gap-6"
                staggerDelay={0.2}
              >
                {skills.map((skill) => (
                  <StaggerItem key={skill.slug} className={skill.colSpan}>
                    <SkillCard
                      skill={skill}
                      dimmed={hoveredSkill !== null && hoveredSkill !== skill.slug}
                      onHover={setHoveredSkill}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* About Section */}
          <section id="about-section" className="py-16 px-4 bg-muted/50 scroll-mt-24">
            <div className="max-w-4xl mx-auto text-right">
              <FadeIn direction="right">
                <GridButton className="mb-6">About Me</GridButton>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <ScrambleHeading
                  className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
                  text={"Distributed systems engineer building high-performance, low-latency financial infrastructure."}
                  config={HEADING_SCRAMBLE}
                />
              </FadeIn>
            </div>
          </section>

          <Separator />

          {/* Projects — Curated List */}

          <section className="py-16 px-4 scroll-mt-24" id="projects-section">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-end justify-between gap-6 mb-10">
                <div className="max-w-xl text-left">
                  <FadeIn direction="left">
                    <GridButton className="mb-4">Projects</GridButton>
                  </FadeIn>
                  <FadeIn direction="left" delay={0.2}>
                    <ScrambleHeading
                      className="text-4xl sm:text-5xl font-bold tracking-tight mb-0"
                      text={"Crafted with strategy, \nengineered with precision"}
                      config={HEADING_SCRAMBLE}
                    />
                  </FadeIn>
                </div>
                <p className="hidden sm:block text-sm italic text-muted-foreground/60 whitespace-nowrap">
                  {String(projects.length).padStart(2, "0")} entries
                </p>
              </div>
              <div className="space-y-10">
                <CaseStudyAccordion projects={projects} />

                <StaggerContainer className="border-t border-border pt-10" staggerDelay={0.2}>
                  {projects.map((project, index) => (
                    <StaggerItem key={project.slug}>
                      <ProjectListRow project={project} index={index} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </section>

          <Separator />

          {/* Experience Section */}
          <section>
            <div className="container mx-auto max-w-5xl px-4 py-24">
              <div className="mx-4 grid gap-4 sm:grid-cols-12">
                <div className="relative col-span-12 space-y-6">
                  <div className="max-w-2xl text-left mb-16">
                    <FadeIn direction="left">
                      <GridButton className="mb-4">Experience</GridButton>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                      <ScrambleHeading
                        className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
                        text={"Expanding knowledge \nthrough years of dedication"}
                        config={HEADING_SCRAMBLE}
                      />
                    </FadeIn>
                  </div>
                  <StaggerContainer
                    key={showAllExperience ? "experience-all" : "experience-preview"}
                    className="before:bg-neutral-content relative col-span-12 space-y-12 px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:-left-3 sm:before:w-0.5"
                    staggerDelay={0.2}
                  >
                    {visibleEvents.map((i) => (
                      <StaggerItem
                        key={i.year}
                        className="before:bg-neutral flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:left-[-35px] sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full"
                      >
                        <div className="flex items-baseline gap-2 mb-1">
                          <Badge variant="outline">
                            {i.year}
                          </Badge>
                          {i.company && (
                            <span className="text-sm italic text-muted-foreground/60">
                              — {i.company}
                            </span>
                          )}
                        </div>

                        <ScrambleHeading
                          as="p"
                          className="font-pixel font-display text-xl font-semibold tracking-wide"
                          text={i.title}
                          config={HEADING_SCRAMBLE}
                        />

                        <div className="font-display mt-3 text-base tracking-tight text-pretty">
                          {i.description}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  {!showAllExperience && events.length > 4 && (
                    <div className="mt-8 pl-4 sm:pl-0">
                      <Button
                        variant="ghost"
                        className="w-fit gap-2 text-muted-foreground hover:text-primary"
                        onClick={() => setShowAllExperience(true)}
                      >
                        Expand to see more
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
