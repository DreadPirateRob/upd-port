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
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverEffect,
  TextReveal,
  AnimatedCounter,
} from "@/components/animations/AnimationWrapper";
import Footer from "@/components/footer";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "motion/react";
import projects from "@/data/projects";

const ListRender = ({ items }) => {
  return (
    <ul className="mt-3 ml-3 flex list-inside list-disc flex-col gap-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default function Home() {
  // const projects = [
  //   {
  //     slug: "market-data-system",
  //     title: "High-Frequency System for Real-Time Data Streaming",
  //     description: "A fully automated market data plant for UI or bot trading.",
  //     tags: ["Node", "Express", "PostgreSQL", "Redis"],
  //     challenges:
  //       "One of the most challenging projects I've worked on. It's a fully automated market data plant for UI or bot trading. It's a complex project that requires a lot of knowledge of the crypto market and the trading bots.",
  //     colSpan: "col-span-24",
  //   },
  //   {
  //     slug: "order-and-execution-management-system",
  //     title: "Order and Execution Management System",
  //     description:
  //       "A fully automated order and execution management system for UI or bot trading.",
  //     tags: ["React Native", "TypeScript", "Expo", "React Native Paper"],
  //     challenges:
  //       "This project is a complex project that requires a lot of knowledge of the crypto market and the trading bots.",
  //     colSpan: "col-span-24",
  //   },
  //   {
  //     slug: "cross-network-balances",
  //     title: "Cross-Network Digital Assets Tracker",
  //     description:
  //       "A fully automated cross-network balances for UI or bot trading.",
  //     tags: ["Node", "Express", "PostgreSQL", "Redis"],
  //     challenges:
  //       "Along the way of building this project I learned a lot about the Node.js ecosystem and how to build a RESTful API with Node.js and Express.",
  //     colSpan: "col-span-24",
  //   },
  //   {
  //     slug: "database-design",
  //     title: "Database Design",
  //     description: "Designing a database for a web application",
  //     tags: ["Database", "SQL", "NoSQL"],
  //     challenges:
  //       "Along the way of building this project I learned a lot about the Database ecosystem and how to design a database for a web application.",
  //     colSpan: "col-span-24",
  //   },
  // ];

  const skills = [
    {
      slug: "frontend-development",
      title: "Frontend Development",
      description:
        "With a strong focus on frontend development I strive to craft seamless and intuitive interfaces that elevate the digital experience for users while maintaining a clean codebase.",
      // tags: ["MUI", "React", "Sass", "Tailwind", "Gastby"],
      tags: ["React", "Next.js", "Tailwind", "TypeScript", "Redux"],
      colSpan: "col-span-14",
    },
    {
      slug: "testing-and-development",
      title: "Testing and Development",
      description:
        "In addition to my core skills, I possess a range of complementary abilities that contribute to my overall proficiency.",
      // tags: ["Github", "Jest", "Webpack"],
      tags: ["Jest", "Playwright", "Storybook"],
      colSpan: "col-span-10",
    },
    {
      slug: "server-side-development",
      title: "Server-Side Development",
      description:
        "Specializing in creating robust APIs and ensuring seamless interaction between frontend and backend services.",
      tags: ["Express", "GraphQL", "OAuth"],
      colSpan: "col-span-8",
    },
    {
      slug: "blockchain-development",
      title: "Blockchain Development",
      description:
        "Creating secure and efficient smart contracts for decentralized applications (dApps) with a focus on security and efficiency.",
      tags: ["Solidty", "IPFS", "Ganache"],
      colSpan: "col-span-8",
    },
    {
      slug: "ux-ui-design",
      title: "UX/UI Design",
      description:
        "Ensuring that the applications I design meet the needs of users and provide a seamless and engaging interaction.",
      tags: ["Figma", "Framer"],
      colSpan: "col-span-8",
    },
    {
      slug: "collaboration",
      title: "Collaboration",
      description:
        "With a strong focus on collaboration, I strive to create a positive and productive work environment that fosters innovation.",
      tags: ["Github", "Jira", "Confluence"],
      colSpan: "col-span-10",
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description:
        "I prioritize data security, authentication and authorization mechanisms to deliver secure and efficient server-side solutions while maintaining a clean codebase.",
      tags: ["PostgreSQL", "PM2", "Docker", "OAuth", "JWT"],
      colSpan: "col-span-14",
    },
  ];

  const events = [
    {
      year: "Feb 2025 - Present",
      title: "Senior Frontend Engineer • Engineering Lead",
      description: `In my current role, I lead the frontend architecture and development efforts for a high-performance trading platform, managing a team of five engineers. While steering the team’s strategic direction and enforcing development standards, I continue to contribute as a hands-on individual contributor (IC). I spearhead initiatives around performance optimization, maintain design system integrity, and ensure seamless collaboration between design, product, and backend engineering. My focus is on building scalable, real-time interfaces with robust UX for professional traders and institutions operating in fast-moving markets.`,
    },
    {
      year: "Apr 2023 - Feb 2025",
      title: "Product Lead • UX/UI Architect",
      description: (
        <>
          As a cross-functional leader at CoinRoutes, I operated at the
          intersection of product, design, and engineering, leading initiatives
          across the full product lifecycle of our OEMS (Order and Execution
          Management System) for crypto trading. I drove product strategy from
          ideation to deployment, collaborated closely with institutional
          clients, and translated complex trading workflows into performant,
          intuitive interfaces.
          <ListRender
            items={[
              "Directed UX/UI initiatives to improve usability and trader efficiency across multi-venue execution environments",
              "Designed and implemented reusable UI systems that reduced feature delivery time by 40%",
              "Championed data-driven decision-making, integrating advanced user behavior analytics into product feedback loops",
              "Served as the primary interface between engineering and executive stakeholders to align technical execution with product vision",
            ]}
          />
        </>
      ),
    },
    {
      year: "Jan 2022 - Apr 2023",
      title: "Front End Engineer",
      description: (
        <>
          Contributed to the design and development of CoinRoutes&apos;
          enterprise-grade crypto trading platform, handling real-time data
          visualization, state management, and cross-browser performance
          optimization for professional trading clients.
          <ListRender
            items={[
              "Led major UI refactors for responsiveness and modularity across key application modules",
              "Integrated WebSockets and streaming APIs to display real-time execution and market data",
              "Contributed to a custom component library used across multiple internal and client-facing tools",
              "Worked closely with backend engineers to optimize frontend-backend data flow for low-latency environments",
            ]}
          />
        </>
      ),
    },
    {
      year: "April - Jul 2021",
      title: "Solidity Developer Certification",
      description:
        "Completed a formal Solidity development program to deepen my understanding of Ethereum-based smart contracts and DeFi protocols. Gained practical experience in building and securing decentralized applications (dApps), with hands-on work in Solidity, Truffle, and Web3.js. This training gave me the technical versatility to bridge frontend engineering with on-chain logic and contributed to my ability to build secure, full-stack decentralized systems.",
    },
    {
      year: "May 2020 - Mar 2021",
      title: "Frontend Developer Intern",
      description: (
        <>
          Joined a fast-paced development team during my academic tenure, where
          I contributed to web application features and gained firsthand
          experience with agile processes, version control, and design-to-dev
          handoff workflows.
          <ListRender
            items={[
              "Translated mockups into responsive, accessible user interfaces",
              "Participated in sprint planning, retrospectives, and daily stand-ups",
              "Gained experience working collaboratively with senior developers on production-grade codebases",
            ]}
          />
        </>
      ),
    },
    {
      year: "Jan - Apr 2020",
      title: "Full Stack Web Development Bootcamp",
      description: (
        <>
          Completed an intensive coding bootcamp focused on modern JavaScript
          development (React, Node.js, Express, MongoDB). Built and deployed
          multiple full-stack applications, working in teams to simulate
          professional software development environments.
          <ListRender
            items={[
              "Gained hands-on experience with REST APIs, component-based design, and server-side logic",
              "Learned best practices in Git workflows, testing, and deployment pipelines",
            ]}
          />
        </>
      ),
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
                  Available for hire
                </Badge>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                  Hi, I'm Adrian Garcia
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I'm a professional software developer with over 5+ years of
                  demonstrated experience, focusing on delivering integrated,
                  reliable, resilient and cost-effective solutions
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.6}>
                <div className="flex gap-4 justify-center">
                  <HoverEffect effect="scale">
                    <Button size="lg">View Projects</Button>
                  </HoverEffect>
                  <HoverEffect effect="scale">
                    <Button variant="outline" size="lg">
                      Contact Me
                    </Button>
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
          <section className="py-16 px-4">
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
                            <div className="grid grid-cols-24 gap-8">
                              <div className="col-span-24 h-96 border border-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
                              <div className="col-span-10 flex flex-col">
                                <h2 className="text-2xl font-bold">
                                  {project.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                  {project.description}
                                </p>
                                <div className="flex flex-grow items-end gap-2">
                                  <Link
                                    href={`/project/${project.slug}`}
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
                                  <Link
                                    href={`/project/${project.slug}`}
                                    className="h-fit"
                                  >
                                    <HoverEffect
                                      effect="scale"
                                      className="mt-8"
                                    >
                                      <Button
                                        variant="secondary"
                                        className="w-fit ml-2"
                                      >
                                        Learn More
                                      </Button>
                                    </HoverEffect>
                                  </Link>
                                </div>
                              </div>
                              <div className="col-span-14">
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
                <div className="relative col-span-12 space-y-6 px-4">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
