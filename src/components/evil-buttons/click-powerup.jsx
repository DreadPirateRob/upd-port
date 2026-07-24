"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*";
const TICK_MS = 30;
const STAGGER_MS = 25;
const SCRAMBLE_ROUNDS = 4;

// Ambient glitch config
const AMBIENT_MIN_INTERVAL = 3000;
const AMBIENT_MAX_INTERVAL = 6000;
const AMBIENT_MAX_CHARS = 3;
const AMBIENT_FLICKER_MS = 100;
const AMBIENT_FLICKER_ROUNDS = 3;

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function getRandomInterval() {
  return AMBIENT_MIN_INTERVAL + Math.random() * (AMBIENT_MAX_INTERVAL - AMBIENT_MIN_INTERVAL);
}

function ScrambleText({ text, trigger }) {
  const [display, setDisplay] = useState(text);
  const timersRef = useRef([]);
  const ambientRef = useRef(null);
  const [isScrambling, setIsScrambling] = useState(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Hover-triggered scramble
  useEffect(() => {
    if (!trigger) {
      clearTimers();
      setDisplay(text);
      setIsScrambling(false);
      return;
    }

    clearTimers();
    setIsScrambling(true);
    const chars = text.split("");
    const timers = [];

    chars.forEach((target, i) => {
      if (target === " ") return;
      const charDelay = i * STAGGER_MS;

      for (let r = 0; r < SCRAMBLE_ROUNDS; r++) {
        const timer = setTimeout(() => {
          setDisplay((prev) => {
            const arr = prev.split("");
            arr[i] = getRandomChar();
            return arr.join("");
          });
        }, charDelay + r * TICK_MS);
        timers.push(timer);
      }

      const settleTimer = setTimeout(() => {
        setDisplay((prev) => {
          const arr = prev.split("");
          arr[i] = target;
          return arr.join("");
        });
      }, charDelay + SCRAMBLE_ROUNDS * TICK_MS);
      timers.push(settleTimer);
    });

    const totalDuration = (chars.length - 1) * STAGGER_MS + SCRAMBLE_ROUNDS * TICK_MS + 50;
    const doneTimer = setTimeout(() => setIsScrambling(false), totalDuration);
    timers.push(doneTimer);

    timersRef.current = timers;
    return clearTimers;
  }, [trigger, text, clearTimers]);

  // Ambient random glitch
  useEffect(() => {
    if (isScrambling) return undefined;

    const chars = text.split("");
    const nonSpaceIndices = chars
      .map((ch, i) => (ch !== " " ? i : -1))
      .filter((i) => i >= 0);

    if (!nonSpaceIndices.length) return undefined;

    function scheduleGlitch() {
      ambientRef.current = setTimeout(() => {
        const count = 1 + Math.floor(Math.random() * AMBIENT_MAX_CHARS);
        const shuffled = [...nonSpaceIndices].sort(() => Math.random() - 0.5);
        const targets = shuffled.slice(0, count);

        targets.forEach((idx) => {
          for (let r = 0; r < AMBIENT_FLICKER_ROUNDS; r++) {
            setTimeout(() => {
              setDisplay((prev) => {
                const arr = prev.split("");
                arr[idx] = getRandomChar();
                return arr.join("");
              });
            }, r * AMBIENT_FLICKER_MS);
          }

          setTimeout(() => {
            setDisplay((prev) => {
              const arr = prev.split("");
              arr[idx] = chars[idx];
              return arr.join("");
            });
          }, AMBIENT_FLICKER_ROUNDS * AMBIENT_FLICKER_MS);
        });

        scheduleGlitch();
      }, getRandomInterval());
    }

    scheduleGlitch();

    return () => {
      clearTimeout(ambientRef.current);
    };
  }, [isScrambling, text]);

  return <>{display}</>;
}

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

const CORNERS = [
  { id: "top-right", cls: "absolute top-0 right-0 size-2 border-t border-r z-20" },
  { id: "top-left", cls: "absolute top-0 left-0 size-2 border-t border-l z-20" },
  { id: "bottom-left", cls: "absolute bottom-0 left-0 size-2 border-b border-l z-20" },
  { id: "bottom-right", cls: "absolute right-0 bottom-0 size-2 border-r border-b z-20" },
];

export const ClickPowerUp = ({
  children,
  className,
  variant = "primary",
  tapDuration = 500,
}) => {
  const [isTapped, setIsTapped] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const v = VARIANTS[variant] ?? VARIANTS.primary;

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
          "relative overflow-hidden px-10 py-3 font-medium uppercase",
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
      </button>
    </motion.div>
  );
};
