"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*()~`";
const TICK_MS = 35;
const STAGGER_MS = 30;
const SETTLE_SCRAMBLES = 6;

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export default function AsciiTextReveal({
  text,
  className,
  delay = 0,
  onComplete,
}) {
  const chars = useMemo(() => text.split(""), [text]);
  const [revealed, setRevealed] = useState(() => chars.map(() => ({ char: " ", done: false })));
  const [started, setStarted] = useState(false);

  // Delay before starting
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return undefined;

    const timers = [];

    chars.forEach((target, i) => {
      if (target === " ") {
        // Spaces resolve immediately
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = { char: " ", done: true };
          return next;
        });
        return;
      }

      const charDelay = i * STAGGER_MS;

      // Scramble phase: cycle through random glitch chars
      for (let s = 0; s < SETTLE_SCRAMBLES; s++) {
        const timer = setTimeout(() => {
          setRevealed((prev) => {
            const next = [...prev];
            next[i] = { char: getRandomChar(), done: false };
            return next;
          });
        }, charDelay + s * TICK_MS);
        timers.push(timer);
      }

      // Settle: show real character
      const settleTimer = setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = { char: target, done: true };
          return next;
        });
      }, charDelay + SETTLE_SCRAMBLES * TICK_MS);
      timers.push(settleTimer);
    });

    // Fire onComplete after the last character settles
    const totalDuration = (chars.length - 1) * STAGGER_MS + SETTLE_SCRAMBLES * TICK_MS + 50;
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, totalDuration);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started, chars, onComplete]);

  return (
    <span className={cn(className)} aria-label={text}>
      {revealed.map((entry, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-colors duration-150",
            entry.done ? "text-foreground" : "text-muted-foreground/60",
          )}
        >
          {entry.char}
        </span>
      ))}
    </span>
  );
}
