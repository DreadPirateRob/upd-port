"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import TechTag from "@/components/ui/tech-tag";
import { ScrambleText } from "@/components/ui/scramble-text";

const CORNERS = [
  { id: "top-right", cls: "absolute top-0 right-0 size-3 border-t border-r z-20" },
  { id: "top-left", cls: "absolute top-0 left-0 size-3 border-t border-l z-20" },
  { id: "bottom-left", cls: "absolute bottom-0 left-0 size-3 border-b border-l z-20" },
  { id: "bottom-right", cls: "absolute right-0 bottom-0 size-3 border-r border-b z-20" },
];

export default function SkillCard({ skill, dimmed = false, onHover }) {
  const [hoverCount, setHoverCount] = useState(0);

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      onMouseEnter={() => {
        setHoverCount((c) => c + 1);
        onHover?.(skill.slug);
      }}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "relative h-full [--pattern:rgba(255,255,255,0.07)] transition-opacity duration-300",
        dimmed ? "opacity-40" : "opacity-100",
      )}
    >
      {CORNERS.map(({ id, cls }) => (
        <motion.div
          key={id}
          custom={id}
          variants={{
            rest: () => ({ x: 0, y: 0, borderColor: "rgba(255,255,255,0.4)" }),
            hover: (c) => ({
              x: c.includes("right") ? 4 : -4,
              y: c.includes("bottom") ? 4 : -4,
              borderColor: "rgba(255,255,255,0.7)",
            }),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cls}
        />
      ))}

      <div
        className={cn(
          "relative h-full overflow-hidden rounded-none border border-border/60 bg-black p-6",
          "transition-colors duration-300",
        )}
      >
        <span className="absolute inset-0 z-0 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-size-[7px_7px]" />

        <div className="relative z-10 flex h-full flex-col">
          <h3 className="font-pixel text-lg uppercase tracking-tight text-foreground">
            <ScrambleText text={skill.title} trigger={hoverCount} />
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {skill.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {skill.tags.map((tag) => (
              <TechTag key={tag}>{tag}</TechTag>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
