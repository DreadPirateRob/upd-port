"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*()~`";
const TICK_MS = 40;
const STAGGER_MS = 35;
const SCRAMBLE_ROUNDS = 5;

// Ambient glitch config
const AMBIENT_MIN_INTERVAL = 2000;
const AMBIENT_MAX_INTERVAL = 5000;
const AMBIENT_MAX_CHARS = 3;
const AMBIENT_FLICKER_MS = 120;
const AMBIENT_FLICKER_ROUNDS = 3;

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function getRandomInterval() {
  return AMBIENT_MIN_INTERVAL + Math.random() * (AMBIENT_MAX_INTERVAL - AMBIENT_MIN_INTERVAL);
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
  const [initialDone, setInitialDone] = useState(false);
  const ambientTimerRef = useRef(null);

  const stableOnComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  // Delay before scramble begins
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Initial reveal animation
  useEffect(() => {
    if (!started) return undefined;

    const timers = [];
    const totalChars = initial.length;

    initial.forEach((entry, i) => {
      if (entry.target === " ") return;

      const charDelay = i * STAGGER_MS;

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

      const settleTimer = setTimeout(() => {
        setChars((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], display: entry.target, done: true };
          return next;
        });
      }, charDelay + SCRAMBLE_ROUNDS * TICK_MS);
      timers.push(settleTimer);
    });

    const totalDuration =
      (totalChars - 1) * STAGGER_MS + SCRAMBLE_ROUNDS * TICK_MS + 80;
    const completeTimer = setTimeout(() => {
      stableOnComplete();
      setInitialDone(true);
    }, totalDuration);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started, initial, stableOnComplete]);

  // Ambient random glitch artifacts after initial reveal
  useEffect(() => {
    if (!initialDone) return undefined;

    const nonSpaceIndices = initial
      .map((e, i) => (e.target !== " " ? i : -1))
      .filter((i) => i >= 0);

    if (!nonSpaceIndices.length) return undefined;

    function scheduleGlitch() {
      ambientTimerRef.current = setTimeout(() => {
        const count = 1 + Math.floor(Math.random() * AMBIENT_MAX_CHARS);
        const shuffled = [...nonSpaceIndices].sort(() => Math.random() - 0.5);
        const targets = shuffled.slice(0, count);

        targets.forEach((idx) => {
          for (let r = 0; r < AMBIENT_FLICKER_ROUNDS; r++) {
            setTimeout(() => {
              setChars((prev) => {
                const next = [...prev];
                next[idx] = { ...next[idx], display: getRandomChar(), done: false };
                return next;
              });
            }, r * AMBIENT_FLICKER_MS);
          }

          // Settle back
          setTimeout(() => {
            setChars((prev) => {
              const next = [...prev];
              next[idx] = { ...next[idx], display: initial[idx].target, done: true };
              return next;
            });
          }, AMBIENT_FLICKER_ROUNDS * AMBIENT_FLICKER_MS);
        });

        scheduleGlitch();
      }, getRandomInterval());
    }

    scheduleGlitch();

    return () => {
      if (ambientTimerRef.current) clearTimeout(ambientTimerRef.current);
    };
  }, [initialDone, initial]);

  return (
    <span className={cn(className)} aria-label={text}>
      {chars.map((entry, i) =>
        entry.target === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className={cn(
              "inline-block transition-colors duration-150",
              entry.done ? "text-foreground" : "text-muted-foreground/50",
            )}
          >
            {entry.display}
          </span>
        ),
      )}
    </span>
  );
}
