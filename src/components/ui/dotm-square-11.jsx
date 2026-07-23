"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

// Deterministic pseudo-random from seed so server/client match
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function DotmSquare11({
  dotSize = 2,
  cellPadding = 1,
  boxSize = 21,
  minSize = 16,
  className,
  ...props
}) {
  const cols = 4;
  const rows = 4;
  const cellSize = (boxSize - cellPadding * (cols - 1)) / cols;
  const dotRadius = dotSize;
  const visibleSize = Math.max(boxSize, minSize);

  const dotConfigs = useMemo(() => {
    const configs = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        const seed = idx * 7.3;
        const duration = 0.6 + seededRandom(seed) * 1.1;
        const delay = seededRandom(seed + 1) * 1.4;
        const lo = 0.08 + seededRandom(seed + 2) * 0.18;
        const hi = 0.72 + seededRandom(seed + 3) * 0.28;
        configs.push({
          idx,
          cx: col * (cellSize + cellPadding) + cellSize / 2,
          cy: row * (cellSize + cellPadding) + cellSize / 2,
          duration,
          delay,
          lo,
          hi,
        });
      }
    }
    return configs;
  }, [cellSize, cellPadding]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={visibleSize}
      height={visibleSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      className={cn(className)}
      {...props}
    >
      {dotConfigs.map(({ idx, cx, cy, duration, delay, lo, hi }) => (
        <motion.circle
          key={idx}
          cx={cx}
          cy={cy}
          r={dotRadius}
          fill="currentColor"
          initial={{ opacity: lo }}
          animate={{ opacity: [lo, hi, lo] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
