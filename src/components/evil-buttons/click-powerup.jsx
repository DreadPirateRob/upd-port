"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { ScrambleText } from "@/components/ui/scramble-text";

const VARIANTS = {
  primary: {
    bracket: {
      rest: { borderColor: "rgba(255,255,255,0.4)" },
      hover: { borderColor: "rgba(255,255,255,0.4)" },
      tap: { borderColor: "#2CD4BD" },
    },
    arm: {
      rest: { scaleX: 0, originX: 0, backgroundColor: "#2a2a2a" },
      hover: { scaleX: 1, originX: 0, backgroundColor: "#2a2a2a" },
      tap: { scaleX: 1, originX: 0, backgroundColor: "#2CD4BD" },
    },
    text: {
      rest: { color: "#ffffff" },
      hover: { color: "#ffffff" },
      tap: { color: "#0a2926" },
    },
    buttonClass: "bg-black [--pattern:rgba(255,255,255,0.07)]",
  },
  secondary: {
    bracket: {
      rest: { borderColor: "rgb(82 82 91)" },
      hover: { borderColor: "rgb(82 82 91)" },
      tap: { borderColor: "rgb(113 113 122)" },
    },
    arm: {
      rest: { scaleX: 0, originX: 0, backgroundColor: "#3f3f46" },
      hover: { scaleX: 1, originX: 0, backgroundColor: "#3f3f46" },
      tap: { scaleX: 1, originX: 0, backgroundColor: "#52525b" },
    },
    text: {
      rest: { color: "var(--color-muted-foreground)" },
      hover: { color: "#ffffff" },
      tap: { color: "#ffffff" },
    },
    buttonClass:
      "bg-background [--pattern:var(--color-neutral-200)] dark:[--pattern:var(--color-neutral-900)]",
  },
};

const SIZES = {
  default: {
    buttonClass: "px-10 py-3",
    cornerClass: "size-2",
    hoverOffset: 3,
    tapOffset: 2,
  },
  chip: {
    buttonClass: "h-6 px-2 text-[0.65rem] leading-none",
    cornerClass: "size-1.5",
    hoverOffset: 2,
    tapOffset: 1,
  },
};

const CORNERS = [
  { id: "top-right", cls: "absolute top-0 right-0 border-t border-r z-20" },
  { id: "top-left", cls: "absolute top-0 left-0 border-t border-l z-20" },
  { id: "bottom-left", cls: "absolute bottom-0 left-0 border-b border-l z-20" },
  { id: "bottom-right", cls: "absolute right-0 bottom-0 border-r border-b z-20" },
];

export const ClickPowerUp = ({
  children,
  as: Element = "button",
  className,
  variant = "primary",
  size = "default",
  tapDuration = 500,
}) => {
  const [isTapped, setIsTapped] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.default;

  const handleTap = () => {
    if (isTapped) return;
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), tapDuration);
  };

  const handleMouseEnter = () => {
    setHoverCount((c) => c + 1);
  };

  const state = isTapped ? "tap" : "rest";
  const childText = typeof children === "string" ? children : null;

  return (
    <motion.div
      initial="rest"
      animate={state}
      whileHover={isTapped ? "tap" : "hover"}
      onTap={handleTap}
      onMouseEnter={handleMouseEnter}
      className="relative inline-block cursor-pointer"
    >
      {CORNERS.map(({ id, cls }) => (
        <motion.div
          key={id}
          custom={id}
          variants={{
            rest: () => ({ x: 0, y: 0, ...v.bracket.rest }),
            hover: (c) => ({
              x: c.includes("right") ? s.hoverOffset : -s.hoverOffset,
              y: c.includes("bottom") ? s.hoverOffset : -s.hoverOffset,
              ...v.bracket.hover,
            }),
            tap: (c) => ({
              x: c.includes("right") ? -s.tapOffset : s.tapOffset,
              y: c.includes("bottom") ? -s.tapOffset : s.tapOffset,
              ...v.bracket.tap,
            }),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(cls, s.cornerClass)}
        />
      ))}

      <Element
        type={Element === "button" ? "button" : undefined}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden font-medium uppercase",
          s.buttonClass,
          v.buttonClass,
          className,
        )}
      >
        <span className="absolute inset-0 z-0 bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_0,transparent_50%)] bg-size-[7px_7px]" />

        <motion.span
          variants={{ rest: v.arm.rest, hover: v.arm.hover, tap: v.arm.tap }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="absolute inset-0 z-10 origin-left"
        />

        <motion.span
          variants={{ rest: v.text.rest, hover: v.text.hover, tap: v.text.tap }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative z-20 font-pixel"
        >
          {childText ? (
            <ScrambleText text={childText} trigger={hoverCount} />
          ) : (
            children
          )}
        </motion.span>
      </Element>
    </motion.div>
  );
};
