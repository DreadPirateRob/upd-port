"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "motion/react";
import { tools } from "@/data/tools";
import ToolModal from "@/components/home/ToolModal";
import Image from "next/image";

export default function HomeContent({ projects }) {
  const [selectedTool, setSelectedTool] = useState(null);

  const skills = [
    {
      slug: "frontend-development",
      title: "Front-End Development",
      description:
        "With a strong focus on front-end development I strive to craft seamless and intuitive interfaces that elevate the digital experience for users while maintaining a clean codebase.",
      // tags: ["MUI", "React", "Sass", "Tailwind", "Gastby"],
      tags: ["React", "Next.js", "Tailwind", "TypeScript", "Redux"],
      colSpan: "col-span-16 lg:col-span-14",
    },
    {
      slug: "testing-and-development",
      title: "Testing and Development",
      description:
        "In addition to my core skills, I possess a range of complementary abilities that contribute to my overall proficiency.",
      // tags: ["Github", "Jest", "Webpack"],
      tags: ["Jest", "Playwright", "Storybook"],
      colSpan: "col-span-16 lg:col-span-10",
    },
    {
      slug: "server-side-development",
      title: "Server-Side Development",
      description:
        "Specializing in creating robust APIs and ensuring seamless interaction between front-end and backend services.",
      tags: ["Express", "GraphQL", "OAuth"],
      colSpan: "col-span-16 lg:col-span-12",
    },
    // {
    //   slug: "blockchain-development",
    //   title: "Blockchain Development",
    //   description:
    //     "Creating secure and efficient smart contracts for decentralized applications (dApps) with a focus on security and efficiency.",
    //   tags: ["Solidty", "IPFS", "Ganache"],
    //   colSpan: "col-span-8",
    // },
    {
      slug: "ux-ui-design",
      title: "UX/UI Design",
      description:
        "Ensuring that the applications I design meet the needs of users and provide a seamless and engaging interaction.",
      tags: ["Figma", "Framer"],
      colSpan: "col-span-16 lg:col-span-12",
    },
    {
      slug: "collaboration",
      title: "Collaboration",
      description:
        "With a strong focus on collaboration, I strive to create a positive and productive work environment that fosters innovation.",
      tags: ["Github", "Jira", "Confluence"],
      colSpan: "col-span-16 lg:col-span-10",
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description:
        "I prioritize data security, authentication and authorization mechanisms to deliver secure and efficient server-side solutions while maintaining a clean codebase.",
      tags: ["PostgreSQL", "PM2", "Docker", "JWT"],
      colSpan: "col-span-16 lg:col-span-14",
    },
  ];

  const events = [
    {
      year: "Jan 2026 - Present",
      title: "Exchange Integrations & Architecture — Full Stack Engineer",
      description: "Continuing at CoinRoutes, now focused on expanding the platform's exchange connectivity and custom liquidity provider support. Responsible for building out the integrations layer that powers execution across venues, while driving architecture and infrastructure improvements in direct response to evolving business and product requirements. Alongside core product work, building internal developer tooling designed to enhance team workflows and accelerate delivery in an era where AI-assisted development is becoming central to how modern engineering teams operate. Emphasis on scalability, reliability, and long-term maintainability across the full stack.",
    },
    {
      year: "Feb 2025 - Jan 2026",
      title: "Trading Platform — Front-End Engineering Lead",
      description: `In my current role, I lead the front-end architecture and development efforts for a high-performance trading platform, managing a team of five engineers. While steering the team’s strategic direction and enforcing development standards, I continue to contribute as a hands-on individual contributor (IC). I spearhead initiatives around performance optimization, maintain design system integrity, and ensure seamless collaboration between design, product, and backend engineering. My focus is on building scalable, real-time interfaces with robust UX for professional traders and institutions operating in fast-moving markets.`,
    },
    {
      year: "Apr 2023 - Feb 2025",
      title: "OEMS — Product Lead & UX Architect",
      description:
        "As a cross-functional leader at CoinRoutes, I operated at the intersection of product, design, and engineering, leading initiatives across the full product lifecycle of our OEMS (Order and Execution Management System) for crypto trading. I drove product strategy from ideation to deployment, collaborated closely with institutional clients, and translated complex trading workflows into performant, intuitive interfaces — directing UX/UI initiatives that improved trader efficiency across multi-venue execution environments, building reusable UI systems that cut feature delivery time by 40%, and serving as the primary bridge between engineering and executive stakeholders to keep technical execution aligned with product vision.",
    },
    {
      year: "Jan 2022 - Apr 2023",
      title: "Trading Platform — Front-End Engineer",
      description:
        "Contributed to the design and development of CoinRoutes' enterprise-grade crypto trading platform, handling real-time data visualization, state management, and cross-browser performance optimization for professional trading clients. Led major UI refactors for responsiveness and modularity, integrated WebSockets and streaming APIs for live execution and market data, contributed to a shared component library used across internal and client-facing tools, and worked closely with backend engineers to optimize data flow for low-latency environments.",
    },
    {
      year: "April - Jul 2021",
      title: "Blockchain & DeFi — Solidity Certification",
      description:
        "Completed a formal Solidity development program to deepen my understanding of Ethereum-based smart contracts and DeFi protocols. Gained practical experience in building and securing decentralized applications (dApps), with hands-on work in Solidity, Truffle, and Web3.js. This training gave me the technical versatility to bridge front-end engineering with on-chain logic and contributed to my ability to build secure, full-stack decentralized systems.",
    },
    {
      year: "May 2020 - Mar 2021",
      title: "Web Applications — Front-End Intern",
      description:
        "Joined a fast-paced development team during my academic tenure, contributing to web application features while gaining firsthand experience with agile processes, version control, and design-to-dev handoff workflows. Translated mockups into responsive, accessible interfaces, participated in sprint planning and retrospectives, and collaborated with senior developers on production-grade codebases.",
    },
    {
      year: "Jan - Apr 2020",
      title: "Full Stack Web Development Bootcamp",
      description:
        "Completed an intensive coding bootcamp focused on modern JavaScript development (React, Node.js, Express, MongoDB). Built and deployed multiple full-stack applications in team environments, gaining hands-on experience with REST APIs, component-based design, server-side logic, and best practices in Git workflows, testing, and deployment pipelines.",
    },
    {
      year: "Aug 2017 - Jul 2019",
      title: "BA: Computer Science",
      description:
        "Developed a foundational understanding of computer science principles, including algorithms, data structures, and low-level system design. This academic background continues to inform my architectural and problem-solving decisions as a developer.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          {/* Hero Section */}
          <section className="h-[90vh] flex items-center justify-center py-20 px-4 text-center relative">
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-primary-foreground opacity-10 absolute left z-0"
            />
            <div className="max-w-4xl mx-auto z-1">
              <FadeIn direction="down" delay={0.2}>
                <Badge variant="outline" className="text-sm mb-4">
                  Available for work
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                  Hi, I&apos;m Adrian Garcia
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I&apos;m a professional software developer with over 5+ years
                  of demonstrated experience, focusing on delivering integrated,
                  reliable, resilient and cost-effective solutions
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.6}>
                <div className="flex gap-4 justify-center">
                  <HoverEffect effect="scale">
                    <Button size="lg" asChild>
                      <Link href="#projects-section">View Projects</Link>
                    </Button>
                  </HoverEffect>
                  <HoverEffect effect="scale">
                    <a href="mailto:adriangarcia9916@gmail.com">
                      <Button variant="outline" size="lg">
                        Contact Me
                      </Button>
                    </a>
                  </HoverEffect>
                </div>
              </FadeIn>
            </div>
          </section>

          <Separator />

          {/* Skills Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl text-left mb-16">
                <FadeIn direction="left">
                  <Badge variant="outline" className="text-lg mb-4">
                    Skills
                  </Badge>
                </FadeIn>
                <FadeIn direction="left" delay={0.2}>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                    Languages, <br /> Libraries and Frameworks
                  </h2>
                </FadeIn>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-24 gap-6"
                staggerDelay={0.2}
              >
                {skills.map((skill, index) => {
                  return (
                    <StaggerItem
                      key={skill.slug}
                      // className={skill.isEven ? "col-span-8" : "col-span-16"}
                      className={skill.colSpan}
                    >
                      <HoverEffect effect="lift">
                        <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20">
                          <CardHeader>
                            <CardTitle>{skill.title}</CardTitle>
                            <CardDescription>
                              {skill.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {skill.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </HoverEffect>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* About Section */}
          <section className="py-16 px-4 bg-muted/50">
            <div className="max-w-4xl mx-auto text-right">
              <FadeIn direction="right">
                <Badge variant="outline" className="text-lg mb-6">
                  About Me
                </Badge>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                  I&apos;m a professional software developer with over 5+ years
                  of demonstrated experience, focusing on delivering integrated,
                  reliable, resilient and cost-effective solutions
                </h2>
              </FadeIn>
            </div>
          </section>

          <Separator />
          {/* Projects Section */}
          <section className="py-16 px-4" id="projects-section">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl text-left mb-16">
                <FadeIn direction="right">
                  <Badge variant="outline" className="text-lg mb-4">
                    Projects
                  </Badge>
                </FadeIn>
                <FadeIn direction="left" delay={0.2}>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                    Crafted with strategy, <br /> engineered with precision
                  </h2>
                </FadeIn>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 gap-6"
                staggerDelay={0.2}
              >
                {projects.map((project) => {
                  return (
                    <StaggerItem key={project.slug} className="col-span-1">
                      <HoverEffect effect="lift">
                        <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20">
                          <CardContent>
                            <div className="grid grid-cols-24 lg:gap-8">
                              <div className="relative col-span-24 h-96 border border-border bg-background">
                                <Image
                                  src={project.bigImage}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="col-span-24 mt-4 lg:col-span-10 flex flex-col">
                                <h2 className="text-2xl font-bold">
                                  {project.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  {project.description}
                                </p>
                                <div className="flex flex-grow items-end gap-2 pb-4">
                                  {project?.slug && !project.disabled && (
                                    <Link
                                      href={`/projects/${project.slug}`}
                                      className="h-fit"
                                    >
                                      <HoverEffect
                                        effect="scale"
                                        className="mt-8"
                                      >
                                        <Button className="w-fit">
                                          View Project
                                        </Button>
                                      </HoverEffect>
                                    </Link>
                                  )}
                                  {project.disabled && (
                                    <Button disabled className="w-fit">
                                      Coming Soon
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="col-span-24 lg:col-span-14">
                                <p className="text-sm text-muted-foreground mb-2">
                                  Technologies used:
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                  {project.technologies.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Challenges:
                                </p>
                                <p className="text-sm text-primary">
                                  {project.challenges}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </HoverEffect>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          <section>
            <div className="container mx-auto max-w-5xl px-4 py-24">
              <div className="mx-4 grid gap-4 sm:grid-cols-12">
                <div className="relative col-span-12 space-y-6">
                  <div className="max-w-2xl text-left mb-16">
                    <FadeIn direction="left">
                      <Badge variant="outline" className="text-lg mb-4">
                        Experience
                      </Badge>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Expanding knowledge <br /> through years of dedication
                      </h2>
                    </FadeIn>
                  </div>
                  <StaggerContainer
                    className="before:bg-neutral-content relative col-span-12 space-y-12 px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:-left-3 sm:before:w-0.5"
                    staggerDelay={0.2}
                  >
                    {events.map((i) => (
                      <StaggerItem
                        key={i.year}
                        className="before:bg-neutral flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:left-[-35px] sm:before:z-[1] sm:before:h-4 sm:before:w-4 sm:before:rounded-full"
                      >
                        <Badge className="mb-1" variant="outline">
                          {i.year}
                        </Badge>

                        <p className="font-display text-xl font-semibold tracking-wide">
                          {i.title}
                        </p>

                        <div className="font-display mt-3 text-base tracking-tight text-pretty">
                          {i.description}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Setup Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="max-w-xl text-left mb-16">
                <FadeIn direction="left">
                  <Badge variant="outline" className="text-lg mb-4">
                    Setup
                  </Badge>
                </FadeIn>
                <FadeIn direction="left" delay={0.2}>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                    Every tool earns its place; <br /> tuned for flow, built for depth
                  </h2>
                </FadeIn>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-24 gap-6"
                staggerDelay={0.15}
              >
                {tools.map((tool) => (
                  <StaggerItem key={tool.name} className={tool.colSpan}>
                    <HoverEffect effect="lift">
                      <Card
                        className="h-full border-2 transition-all duration-300 hover:border-primary/20 cursor-pointer"
                        onClick={() => setSelectedTool(tool)}
                      >
                        <CardHeader>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            {tool.category}
                          </p>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </HoverEffect>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}
