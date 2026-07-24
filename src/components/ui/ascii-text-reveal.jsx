"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*()~`";
const TICK_MS = 40;
const STAGGER_MS = 35;
const SCRAMBLE_ROUNDS = 5;

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function buildInitialState(text) {
  return text.split("").map((ch) => ({
    target: ch,
    display: ch === " " ? " " : getRandomChar(),
    done: ch === " ",
  }));
}

export default function AsciiTextReveal({
  text,
  className,
  delay = 0,
  onComplete,
}) {
  const initial = useMemo(() => buildInitialState(text), [text]);
  const [chars, setChars] = useState(initial);
  const [started, setStarted] = useState(false);

  const stableOnComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  // Delay before scramble begins
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return undefined;

    const timers = [];
    const totalChars = initial.length;

    initial.forEach((entry, i) => {
      // Spaces are already settled
      if (entry.target === " ") return;

      const charDelay = i * STAGGER_MS;

      // Scramble rounds — cycle through random glitch chars
      for (let r = 0; r < SCRAMBLE_ROUNDS; r++) {
        const timer = setTimeout(() => {
          setChars((prev) => {
            const next = [...prev];
            next[i] = { ...next[i], display: getRandomChar(), done: false };
            return next;
          });
        }, charDelay + r * TICK_MS);
        timers.push(timer);
      }

      // Final settle — show real character
      const settleTimer = setTimeout(() => {
        setChars((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], display: entry.target, done: true };
          return next;
        });
      }, charDelay + SCRAMBLE_ROUNDS * TICK_MS);
      timers.push(settleTimer);
    });

    // Fire onComplete after everything settles
    const totalDuration =
      (totalChars - 1) * STAGGER_MS + SCRAMBLE_ROUNDS * TICK_MS + 80;
    const completeTimer = setTimeout(stableOnComplete, totalDuration);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started, initial, stableOnComplete]);

  return (
    <span className={cn(className)} aria-label={text}>
      {chars.map((entry, i) =>
        entry.target === " " ? (
          // Preserve real word spacing
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className={cn(
              "inline-block transition-colors duration-150",
              entry.done
                ? "text-foreground"
                : "text-muted-foreground/50",
            )}
          >
            {entry.display}
          </span>
        ),
      )}
    </span>
  );
}
