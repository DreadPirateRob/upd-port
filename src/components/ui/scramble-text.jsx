"use client";

import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "motion/react";

const GLITCH_CHARS = "[]{}|_-·░▒▓<>/\\!@#$%^&*";

const DEFAULTS = {
  tickMs: 30,
  staggerMs: 25,
  scrambleRounds: 4,
  ambientMinInterval: 3000,
  ambientMaxInterval: 6000,
  ambientMaxChars: 3,
  ambientFlickerMs: 100,
  ambientFlickerRounds: 3,
};

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function ScrambleText({ text, trigger, config }) {
  const cfg = { ...DEFAULTS, ...config };
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
      if (target === " " || target === "\n") return;
      const charDelay = i * cfg.staggerMs;

      for (let r = 0; r < cfg.scrambleRounds; r++) {
        const timer = setTimeout(() => {
          setDisplay((prev) => {
            const arr = prev.split("");
            arr[i] = getRandomChar();
            return arr.join("");
          });
        }, charDelay + r * cfg.tickMs);
        timers.push(timer);
      }

      const settleTimer = setTimeout(() => {
        setDisplay((prev) => {
          const arr = prev.split("");
          arr[i] = target;
          return arr.join("");
        });
      }, charDelay + cfg.scrambleRounds * cfg.tickMs);
      timers.push(settleTimer);
    });

    const totalDuration =
      (chars.length - 1) * cfg.staggerMs + cfg.scrambleRounds * cfg.tickMs + 50;
    const doneTimer = setTimeout(() => setIsScrambling(false), totalDuration);
    timers.push(doneTimer);

    timersRef.current = timers;
    return clearTimers;
  }, [trigger, text, clearTimers, cfg.staggerMs, cfg.scrambleRounds, cfg.tickMs]);

  // Ambient random glitch
  useEffect(() => {
    if (isScrambling) return undefined;

    const chars = text.split("");
    const nonSpaceIndices = chars
      .map((ch, i) => (ch !== " " && ch !== "\n" ? i : -1))
      .filter((i) => i >= 0);

    if (!nonSpaceIndices.length) return undefined;

    function scheduleGlitch() {
      const interval =
        cfg.ambientMinInterval +
        Math.random() * (cfg.ambientMaxInterval - cfg.ambientMinInterval);
      ambientRef.current = setTimeout(() => {
        const count = 1 + Math.floor(Math.random() * cfg.ambientMaxChars);
        const shuffled = [...nonSpaceIndices].sort(() => Math.random() - 0.5);
        const targets = shuffled.slice(0, count);

        targets.forEach((idx) => {
          for (let r = 0; r < cfg.ambientFlickerRounds; r++) {
            setTimeout(() => {
              setDisplay((prev) => {
                const arr = prev.split("");
                arr[idx] = getRandomChar();
                return arr.join("");
              });
            }, r * cfg.ambientFlickerMs);
          }

          setTimeout(() => {
            setDisplay((prev) => {
              const arr = prev.split("");
              arr[idx] = chars[idx];
              return arr.join("");
            });
          }, cfg.ambientFlickerRounds * cfg.ambientFlickerMs);
        });

        scheduleGlitch();
      }, interval);
    }

    scheduleGlitch();

    return () => {
      clearTimeout(ambientRef.current);
    };
  }, [
    isScrambling,
    text,
    cfg.ambientMinInterval,
    cfg.ambientMaxInterval,
    cfg.ambientMaxChars,
    cfg.ambientFlickerMs,
    cfg.ambientFlickerRounds,
  ]);

  return (
    <>
      {display.split("\n").map((line, i, arr) => (
        <Fragment key={i}>
          {line}
          {i < arr.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}

export function ScrambleHeading({ text, as: Tag = "h2", className, config }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <Tag ref={ref} className={className}>
      <ScrambleText text={text} trigger={inView ? 1 : 0} config={config} />
    </Tag>
  );
}

export default ScrambleText;
