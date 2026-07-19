"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudyAccordion({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-[480px] gap-2">
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={project.slug}
            animate={{ flexGrow: isActive ? 4 : 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 32 }}
            className="relative flex-1 min-w-0 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setActiveIndex(index)}
          >
            {/* Background image */}
            <Image
              src={project.bigImage}
              alt={project.title}
              fill
              className="object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Index number */}
            <p className="absolute top-4 left-4 text-sm font-mono text-white/60">
              {String(index + 1).padStart(2, "0")}
            </p>

            {/* Expanded content — fades in after card opens */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.22, delay: 0.18 }}
                  className="absolute bottom-0 left-0 right-0 p-5"
                >
                  <p className="text-sm text-white/70 mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-end justify-between gap-3">
                    <p className="text-white font-semibold text-sm leading-snug">
                      {project.title}
                    </p>

                    {project.disabled ? (
                      <p className="text-xs text-white/40 font-mono uppercase tracking-wider shrink-0">
                        Coming soon
                      </p>
                    ) : (
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 h-8 w-8 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
