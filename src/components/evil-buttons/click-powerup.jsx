"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const VARIANTS = {
  primary: {
    bracket: {
      rest:  { borderColor: "rgb(38 38 38)" },
      hover: { borderColor: "rgb(38 38 38)" },
      tap:   { borderColor: "#2CD4BD" },
    },
    arm: {
      rest:  { scaleX: 0, originX: 0, backgroundColor: "#171717" },
      hover: { scaleX: 1, originX: 0, backgroundColor: "#171717" },
      tap:   { scaleX: 1, originX: 0, backgroundColor: "#2CD4BD" },
    },
    text: {
      rest:  { color: "var(--color-foreground)" },
      hover: { color: "#ffffff" },
      tap:   { color: "#0a2926" },
    },
  },
  secondary: {
    bracket: {
      rest:  { borderColor: "rgb(82 82 91)" },
      hover: { borderColor: "rgb(82 82 91)" },
      tap:   { borderColor: "rgb(113 113 122)" },
    },
    arm: {
      rest:  { scaleX: 0, originX: 0, backgroundColor: "#3f3f46" },
      hover: { scaleX: 1, originX: 0, backgroundColor: "#3f3f46" },
      tap:   { scaleX: 1, originX: 0, backgroundColor: "#52525b" },
    },
    text: {
      rest:  { color: "var(--color-muted-foreground)" },
      hover: { color: "#ffffff" },
      tap:   { color: "#ffffff" },
    },
  },
};

export const ClickPowerUp = ({
  children,
  className,
  variant = "primary",
  tapDuration = 500,
}) => {
  const [isTapped, setIsTapped] = useState(false);
  const v = VARIANTS[variant] ?? VARIANTS.primary;

  const handleTap = () => {
    if (isTapped) return;
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), tapDuration);
  };

  const state = isTapped ? "tap" : "rest";

  const corners = [
    { corner: "top-right",    cls: "absolute top-0 right-0 size-2 border-t border-r z-20" },
    { corner: "top-left",     cls: "absolute top-0 left-0 size-2 border-t border-l z-20" },
    { corner: "bottom-left",  cls: "absolute bottom-0 left-0 size-2 border-b border-l z-20" },
    { corner: "bottom-right", cls: "absolute right-0 bottom-0 size-2 border-r border-b z-20" },
  ];

  return (
    <motion.div
      initial="rest"
      animate={state}
      whileHover={isTapped ? "tap" : "hover"}
      onTap={handleTap}
      className="relative inline-block cursor-pointer [--pattern:var(--color-neutral-200)] dark:[--pattern:var(--color-neutral-900)]"
    >
      {corners.map(({ corner, cls }) => (
        <motion.div
          key={corner}
          custom={corner}
          variants={{
            rest:  () => ({ x: 0, y: 0, ...v.bracket.rest }),
            hover: (c) => ({
              x: c.includes("right") ? 3 : -3,
              y: c.includes("bottom") ? 3 : -3,
              ...v.bracket.hover,
            }),
            tap: (c) => ({
              x: c.includes("right") ? -2 : 2,
              y: c.includes("bottom") ? -2 : 2,
              ...v.bracket.tap,
            }),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cls}
        />
      ))}

      <button
        className={cn(
          "relative overflow-hidden bg-background px-10 py-3 font-medium uppercase",
          className,
        )}
      >
        {/* Pattern */}
        <span className="absolute inset-0 z-0 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-size-[7px_7px]" />

        {/* Arm panel */}
        <motion.span
          variants={{
            rest:  v.arm.rest,
            hover: v.arm.hover,
            tap:   v.arm.tap,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="absolute inset-0 z-10 origin-left"
        />

        {/* Text */}
        <motion.span
          variants={{
            rest:  v.text.rest,
            hover: v.text.hover,
            tap:   v.text.tap,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative z-20"
        >
          {children}
        </motion.span>
      </button>
    </motion.div>
  );
};
