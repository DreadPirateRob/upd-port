"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { DotmSquare11 } from "@/components/ui/dotm-square-11";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*";
const TICK_MS = 28;
const STAGGER_MS = 22;
const SCRAMBLE_ROUNDS = 3;

const AMBIENT_MIN_INTERVAL = 3000;
const AMBIENT_MAX_INTERVAL = 7000;
const AMBIENT_MAX_CHARS = 2;
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

function GridIcon() {
  return (
    <div className="bg-foreground/90 size-7 rounded flex items-center justify-center flex-shrink-0">
      <DotmSquare11 dotSize={2} cellPadding={1} className="text-background" boxSize={21} minSize={16} />
    </div>
  );
}

export default function GridButton({ children, className, ...props }) {
  const [hoverCount, setHoverCount] = useState(0);
  const childText = typeof children === "string" ? children : null;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border border-border bg-background p-1 rounded transition-all duration-75 active:translate-y-0.5 active:scale-[0.98] hover:bg-muted text-xs font-semibold uppercase tracking-widest pr-3 font-pixel",
        className,
      )}
      onMouseEnter={() => setHoverCount((c) => c + 1)}
      {...props}
    >
      <GridIcon />
      {childText ? (
        <ScrambleText text={childText} trigger={hoverCount} />
      ) : (
        children
      )}
    </button>
  );
}
