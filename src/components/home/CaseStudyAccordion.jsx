"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import ProjectTextmode from "@/components/ui/project-textmode";
import { getCaseStudyVisual } from "@/components/home/case-study-visuals";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import TechTag from "@/components/ui/tech-tag";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";

const INTERVAL_MS = 10000;

const PANEL_CORNERS = [
  { id: "top-right", className: "absolute top-0 right-0 size-3 border-t border-r z-30" },
  { id: "top-left", className: "absolute top-0 left-0 size-3 border-t border-l z-30" },
  { id: "bottom-left", className: "absolute bottom-0 left-0 size-3 border-b border-l z-30" },
  { id: "bottom-right", className: "absolute right-0 bottom-0 size-3 border-r border-b z-30" },
];

export default function CaseStudyAccordion({ projects, articleMode = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);

  useEffect(() => {
    if (articleMode || isHovered || projects.length < 2) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [articleMode, isHovered, projects.length]);

  useEffect(() => {
    if (!articleMode && !isHovered) setResumeCount((count) => count + 1);
  }, [articleMode, isHovered]);

  const handleSelect = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      className="flex flex-col sm:flex-row gap-2 h-[720px] sm:h-[520px]"
      onMouseEnter={articleMode ? undefined : () => setIsHovered(true)}
      onMouseLeave={articleMode ? undefined : () => setIsHovered(false)}
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;
        const number = String(index + 1).padStart(2, "0");
        const primaryLabel = project.areas?.[0] ?? project.technologies?.[0] ?? "Project";
        const chips = [primaryLabel, ...project.technologies.filter((t) => t !== primaryLabel)]
          .filter(Boolean)
          .slice(0, 3);

        return (
          <motion.div
            key={project.slug}
            variants={{
              rest: { flexGrow: isActive ? 4 : 1 },
              hover: { flexGrow: isActive ? 4 : 1 },
            }}
            initial="rest"
            animate="rest"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 220, damping: 32 }}
            className={`relative min-h-0 min-w-0 flex-1 ${
              articleMode ? "cursor-default" : "cursor-pointer"
            }`}
            onClick={articleMode ? undefined : () => handleSelect(index)}
          >
            {PANEL_CORNERS.map(({ id, className }) => (
              <motion.div
                key={id}
                custom={id}
                variants={{
                  rest: () => ({
                    x: 0,
                    y: 0,
                    width: 12,
                    height: 12,
                    borderColor: "rgba(255,255,255,0.4)",
                  }),
                  hover: (corner) => ({
                    x: corner.includes("right") ? 6 : -6,
                    y: corner.includes("bottom") ? 6 : -6,
                    width: 18,
                    height: 18,
                    borderColor: "rgba(255,255,255,0.75)",
                  }),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={className}
              />
            ))}

            <div className="absolute inset-0 overflow-hidden border border-white/10 bg-black">
              {/* Abstract per-project animation (replaces cover image) */}
              <ProjectTextmode
                variant={getCaseStudyVisual(project.slug, index)}
                active={isActive}
                className="opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
              {!isActive && (
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between pointer-events-none">
                  <div>
                    <div className="flex items-center gap-2 text-white/65">
                      <ArrowDown className="h-4 w-4 shrink-0" />
                      <span className="font-pixel tracking-tight text-2xl sm:text-3xl">
                        {number}
                      </span>
                    </div>
                    <div className="mt-3 h-px w-10 bg-white/10" />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, delay: 0.18 }}
                    className="absolute inset-0 p-5 sm:p-7 flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <ArrowUpRight className="h-5 w-5 text-white/75 mt-1" />
                        <span className="font-pixel text-5xl sm:text-6xl leading-none text-white/70">
                          {number}
                        </span>
                      </div>

                      {/* <div className="text-right shrink-0 pt-1"> */}
                      {/*   <p className="text-xs uppercase tracking-[0.18em] text-white/65"> */}
                      {/*     {primaryLabel} */}
                      {/*   </p> */}
                      {/*   <p className="text-xs text-white/35 mt-1"> */}
                      {/*     {index + 1}/{projects.length} */}
                      {/*   </p> */}
                      {/* </div> */}
                    </div>

                    <div className="mt-6 max-w-sm sm:max-w-md">
                      <h3 className="font-pixel text-3xl sm:text-5xl font-light tracking-tight leading-[0.95] text-white mb-4">
                        <ScrambleText text={project.title} trigger={index + 1} />
                      </h3>
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md line-clamp-3">
                        {project.description}
                      </p>
                    </div>


                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                      <div className={`flex flex-wrap gap-2 ${articleMode ? "max-w-full" : "max-w-[70%]"}`}>
                        {chips.map((chip) => (
                          <TechTag key={chip} className="bg-black [--pattern:var(--color-neutral-900)]">
                            {chip}
                          </TechTag>
                        ))}
                      </div>

                      {!articleMode && (
                        project.disabled ? (
                          <span className="text-xs uppercase tracking-[0.18em] text-white/40 shrink-0">
                            Coming soon
                          </span>
                        ) : (
                          <Link
                            href={`/projects/${project.slug}`}
                            onClick={(event) => event.stopPropagation()}
                            className="shrink-0"
                            aria-label={`View ${project.title} case study`}
                          >
                            <ClickPowerUp
                              as="span"
                              variant="secondary"
                              className="size-10 p-0"
                            >
                              <ArrowUpRight className="size-4" />
                            </ClickPowerUp>
                          </Link>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isActive && !articleMode && (
                <div
                  key={`${activeIndex}-${resumeCount}`}
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-white/60 origin-left"
                  style={{
                    animation: `progress-fill ${INTERVAL_MS}ms ease-out forwards`,
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
