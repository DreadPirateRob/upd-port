"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function getDuration(speed, speedScale, fallback) {
  const resolvedScale = Math.max(speedScale, 0.05);
  const resolvedSpeed = Math.max(speed * resolvedScale, 0.05);

  return fallback / resolvedSpeed;
}

export default function DottedGlowBackground({
  className,
  opacity = 1,
  gap = 10,
  radius = 1.6,
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}) {
  const resolvedOpacity = clamp(opacity, 0, 1);
  const resolvedGap = clamp(gap, 6, 22);
  const resolvedRadius = clamp(radius, 0.8, resolvedGap / 2);
  const resolvedBackgroundOpacity = clamp(backgroundOpacity, 0, 1);
  const minSpeed = Math.min(speedMin, speedMax);
  const maxSpeed = Math.max(speedMin, speedMax);

  const gridSize = `${resolvedGap}px ${resolvedGap}px`;
  const glowRadius = Math.max(resolvedRadius + 0.35, 1.1);
  const baseDotColor = `rgba(244, 244, 245, ${0.12 * resolvedOpacity})`;
  const glowDotColor = `rgba(244, 244, 245, ${0.26 * resolvedOpacity})`;
  const edgeGlowColor = `rgba(212, 212, 216, ${0.14 * resolvedOpacity})`;
  const basePattern = `radial-gradient(circle at center, ${baseDotColor} 0 ${resolvedRadius}px, transparent ${resolvedRadius + 0.7}px)`;
  const glowPattern = `radial-gradient(circle at center, ${glowDotColor} 0 ${glowRadius}px, transparent ${glowRadius + 1.1}px)`;
  const slowDuration = getDuration(minSpeed, speedScale, 28);
  const fastDuration = getDuration(maxSpeed, speedScale, 18);
  const ambientDuration = (slowDuration + fastDuration) / 2;
  const wideMask =
    "radial-gradient(52% 42% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.84) 34%, transparent 78%)";
  const tightMask =
    "radial-gradient(40% 36% at 50% 50%, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.7) 36%, transparent 72%)";
  const ambientMask =
    "radial-gradient(circle at 24% 26%, rgba(0,0,0,0.8) 0%, transparent 22%), radial-gradient(circle at 76% 68%, rgba(0,0,0,0.75) 0%, transparent 24%)";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity: resolvedOpacity }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(2, 6, 23, ${resolvedBackgroundOpacity})` }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: basePattern,
          backgroundSize: gridSize,
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_30%,rgba(0,0,0,0.22)_100%)]" />

      <motion.div
        className="absolute inset-y-[-28%] left-[-20%] w-[52%] blur-2xl"
        style={{
          backgroundImage: glowPattern,
          backgroundSize: gridSize,
          backgroundPosition: "center",
          WebkitMaskImage: wideMask,
          maskImage: wideMask,
          mixBlendMode: "screen",
        }}
        animate={{
          x: ["0%", "158%"],
          y: ["-3%", "4%", "-2%"],
          opacity: [0.22, 0.56, 0.3],
        }}
        transition={{
          duration: slowDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-y-[-20%] left-[-12%] w-[30%] blur-xl"
        style={{
          backgroundImage: glowPattern,
          backgroundSize: gridSize,
          backgroundPosition: "center",
          WebkitMaskImage: tightMask,
          maskImage: tightMask,
          mixBlendMode: "screen",
        }}
        animate={{
          x: ["0%", "210%"],
          y: ["2%", "-3%", "1%"],
          opacity: [0.16, 0.48, 0.22],
        }}
        transition={{
          duration: fastDuration,
          repeat: Infinity,
          ease: "linear",
          delay: 1.15,
        }}
      />

      <motion.div
        className="absolute inset-0 blur-xl"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${edgeGlowColor} 0 ${glowRadius}px, transparent ${glowRadius + 1.2}px)`,
          backgroundSize: gridSize,
          backgroundPosition: "center",
          WebkitMaskImage: ambientMask,
          maskImage: ambientMask,
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.08, 0.18, 0.1] }}
        transition={{
          duration: ambientDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.08)_0%,transparent_18%,transparent_76%,rgba(3,7,18,0.34)_100%)]" />
    </div>
  );
}
