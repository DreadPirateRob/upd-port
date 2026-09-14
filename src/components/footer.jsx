"use client";
import { useState } from "react";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Youtube } from "lucide-react";
import { FadeIn } from "@/components/animations/AnimationWrapper";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { ScrambleHeading } from "@/components/ui/scramble-text";
import ProjectTextmode from "@/components/ui/project-textmode";
import { textmodeHoverVisual } from "@/components/ui/textmode-hover-visual";

const EMAIL = "adriangarcia9916@gmail.com";

const FOOTER_CORNERS = [
  { id: "top-right", className: "absolute top-0 right-0 size-4 border-t border-r z-30" },
  { id: "top-left", className: "absolute top-0 left-0 size-4 border-t border-l z-30" },
  { id: "bottom-left", className: "absolute bottom-0 left-0 size-4 border-b border-l z-30" },
  { id: "bottom-right", className: "absolute right-0 bottom-0 size-4 border-r border-b z-30" },
];

const NAVIGATION = [
  { label: "Projects", href: "/#projects-section" },
  { label: "Experience", href: "/#experience-section" },
];

const FOCUS_AREAS = [
  "High-performance interfaces",
  "Real-time applications",
  "Distributed systems",
  "Financial infrastructure",
];

const SOCIAL_ACTIONS = [
  {
    label: "GitHub",
    detail: "Open source and experiments",
    href: "https://github.com/DreadPirateRob",
    icon: Github,
    external: true,
  },
  {
    label: "Email",
    detail: "Start a conversation",
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    detail: "Experience and background",
    href: "https://www.linkedin.com/in/agarciadev99/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "YouTube",
    detail: "Coming soon",
    icon: Youtube,
  },
];


function FooterSocialAction({ action }) {
  const [active, setActive] = useState(false);
  const Icon = action.icon;
  const Element = action.href ? "a" : "div";

  return (
    <Element
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
      aria-disabled={action.href ? undefined : true}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`group relative isolate flex min-h-36 flex-col justify-between overflow-hidden bg-black px-5 py-5 transition-colors sm:px-6 sm:py-6 ${action.href
        ? "cursor-pointer hover:bg-neutral-950"
        : "cursor-default text-white/45"
        }`}
    >
      <ProjectTextmode
        variant={textmodeHoverVisual}
        active={active}
        className={`z-0 transition-opacity duration-300 ${active ? "opacity-80" : "opacity-0"
          }`}
      />
      <span
        className={`pointer-events-none absolute inset-0 z-[1] bg-black/35 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"
          }`}
      />

      <span className="relative z-10 flex items-start justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <Icon className="size-4 shrink-0" />
          <span className="font-pixel text-xs uppercase tracking-wide sm:text-sm">
            {action.label}
          </span>
        </span>
        {action.href && (
          <ArrowUpRight className="size-4 shrink-0 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        )}
      </span>

      <span className="relative z-10 text-xs leading-5 text-muted-foreground">
        {action.detail}
      </span>
    </Element>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950 px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="relative mx-auto max-w-7xl"
      >
        {FOOTER_CORNERS.map(({ id, className }) => (
          <motion.div
            key={id}
            custom={id}
            variants={{
              rest: () => ({
                x: 0,
                y: 0,
                width: 16,
                height: 16,
                borderColor: "rgba(255,255,255,0.35)",
              }),
              hover: (corner) => ({
                x: corner.includes("right") ? 7 : -7,
                y: corner.includes("bottom") ? 7 : -7,
                width: 22,
                height: 22,
                borderColor: "rgba(255,255,255,0.7)",
              }),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className={className}
          />
        ))}

        <div className="relative overflow-hidden border border-white/10 bg-black [--pattern:rgba(255,255,255,0.035)]">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-size-[8px_8px]" />

          <div className="relative z-10 grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-12 lg:py-12">
            <FadeIn direction="up">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="size-1.5 bg-emerald-300/80 shadow-[0_0_12px_rgba(110,231,183,0.55)]" />
                Available for work
              </div>
              <a
                href={`mailto:${EMAIL}`}
                className="font-pixel text-xl tracking-tight text-white transition-colors hover:text-white/70 sm:text-3xl lg:text-4xl"
              >
                {EMAIL}
              </a>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
              <a href={`mailto:${EMAIL}`}>
                <ClickPowerUp
                  as="span"
                  variant="secondary"
                  className="px-6 py-3 text-xs"
                >
                  Contact Me
                </ClickPowerUp>
              </a>
            </FadeIn>
          </div>

          <div className="relative z-10 mx-6 border-t border-white/10 sm:mx-8 lg:mx-12" />

          {/* <div className="relative z-10 grid gap-10 px-6 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:px-12 lg:py-12"> */}
          {/*   <div> */}
          {/*     <p className="font-pixel text-lg text-white">Adrian Garcia</p> */}
          {/*     <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground"> */}
          {/*       Full stack engineer and architect focused on building high-performance interfaces, real-time data pipelines and low-latency infrastructure for digital financial operations. */}
          {/*     </p> */}
          {/*   </div> */}
          {/**/}
          {/*   <div> */}
          {/*     <p className="font-pixel text-xs uppercase tracking-[0.18em] text-white/80"> */}
          {/*       Navigate */}
          {/*     </p> */}
          {/*     <nav className="mt-4 flex flex-col items-start gap-2.5" aria-label="Footer navigation"> */}
          {/*       {NAVIGATION.map((item) => ( */}
          {/*         <Link */}
          {/*           key={item.href} */}
          {/*           href={item.href} */}
          {/*           className="text-sm text-muted-foreground transition-colors hover:text-white" */}
          {/*         > */}
          {/*           {item.label} */}
          {/*         </Link> */}
          {/*       ))} */}
          {/*     </nav> */}
          {/*   </div> */}
          {/**/}
          {/*   <div> */}
          {/*     <p className="font-pixel text-xs uppercase tracking-[0.18em] text-white/80"> */}
          {/*       Focus */}
          {/*     </p> */}
          {/*     <ul className="mt-4 space-y-2.5"> */}
          {/*       {FOCUS_AREAS.map((area) => ( */}
          {/*         <li key={area} className="text-sm text-muted-foreground"> */}
          {/*           {area} */}
          {/*         </li> */}
          {/*       ))} */}
          {/*     </ul> */}
          {/*   </div> */}
          {/**/}
          {/*   <div> */}
          {/*     <p className="font-pixel text-xs uppercase tracking-[0.18em] text-white/80"> */}
          {/*       Contact */}
          {/*     </p> */}
          {/*     <div className="mt-4 space-y-4"> */}
          {/*       <div className="flex items-center gap-2 text-sm text-white/80"> */}
          {/*         <span className="size-1.5 bg-emerald-300/80 shadow-[0_0_12px_rgba(110,231,183,0.55)]" /> */}
          {/*         Available for work */}
          {/*       </div> */}
          {/*       <a */}
          {/*         href={`mailto:${EMAIL}`} */}
          {/*         className="block break-all text-sm text-muted-foreground transition-colors hover:text-white" */}
          {/*       > */}
          {/*         {EMAIL} */}
          {/*       </a> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}

          {/* <div className="relative z-10 mx-6 flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-muted-foreground sm:mx-8 sm:flex-row sm:items-center sm:justify-between lg:mx-12"> */}
          {/*   <p>© {new Date().getFullYear()} Adrian Garcia</p> */}
          {/*   <p>Designed and built with Next.js</p> */}
          {/* </div> */}

          <div className="relative z-10 grid grid-cols-2 gap-px border-y border-white/10 bg-white/10 lg:grid-cols-4">
            {SOCIAL_ACTIONS.map((action) => (
              <FooterSocialAction key={action.label} action={action} />
            ))}
          </div>

          <div className="relative z-10 flex h-28 items-end justify-center border-t border-white/5 px-4 pt-8 pb-4 sm:h-40 lg:h-48">
            <ScrambleHeading
              as="p"
              className="w-max whitespace-nowrap font-pixel text-[clamp(2.5rem,11.5vw,9.5rem)] font-bold leading-none"
              contentClassName="text-white/20"
              text="ADRIAN GARCIA"
              config={{ staggerMs: 45, tickMs: 30, scrambleRounds: 4 }}
            />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
