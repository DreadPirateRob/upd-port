"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const CHARS = [".", ":", "+", "x"];
const CELL_COUNT = 16;
const INITIAL_GLYPHS = Array.from(
  { length: CELL_COUNT },
  (_, index) => CHARS[(index * 3 + Math.floor(index / 4)) % CHARS.length],
);

export default function MiniTextmodeIcon({ className }) {
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef, { margin: "80px 0px" });
  const [glyphs, setGlyphs] = useState(INITIAL_GLYPHS);

  useEffect(() => {
    if (!isVisible) return undefined;

    const interval = setInterval(() => {
      setGlyphs((current) => {
        const next = [...current];
        const index = Math.floor(Math.random() * CELL_COUNT);
        const currentIndex = CHARS.indexOf(current[index]);
        const offset = 1 + Math.floor(Math.random() * (CHARS.length - 1));
        next[index] = CHARS[(currentIndex + offset) % CHARS.length];
        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <span
      ref={containerRef}
      className={cn(
        "grid size-7 shrink-0 grid-cols-4 grid-rows-4 overflow-hidden rounded border border-white/10 bg-neutral-950 p-[3px]",
        className,
      )}
      aria-hidden="true"
    >
      {glyphs.map((glyph, index) => (
        <span
          key={index}
          className="flex items-center justify-center font-mono text-[5px] leading-none text-neutral-300"
          style={{ opacity: 0.3 + ((index * 3) % 5) * 0.1 }}
        >
          {glyph}
        </span>
      ))}
    </span>
  );
}
