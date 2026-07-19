"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const PIXELS = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  row: Math.floor(index / 4),
  column: index % 4,
}));

const HIDE_AFTER_MS = 640;
const EXIT_DURATION = 0.22;

export default function PageLoadOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, HIDE_AFTER_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setIsComplete(true)}>
      {isVisible ? (
        <motion.div
          key="page-load-overlay"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              className="grid grid-cols-4 gap-2"
              initial={{ opacity: 0.7, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {PIXELS.map((pixel) => {
                const delay = pixel.row * 0.08 + pixel.column * 0.035;
                const duration = 0.48 + pixel.row * 0.04;
                const isAccent = (pixel.row + pixel.column) % 3 === 0;

                return (
                  <motion.div
                    key={pixel.id}
                    className={`h-3 w-3 rounded-[3px] border border-border/60 ${
                      isAccent ? "bg-primary/35" : "bg-foreground/12"
                    }`}
                    initial={{ opacity: 0.2, scale: 0.82, y: 4 }}
                    animate={{
                      opacity: [0.2, 0.9, 0.35],
                      scale: [0.82, 1, 0.9],
                      y: [4, -2, 0],
                    }}
                    transition={{
                      duration,
                      delay,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                );
              })}
            </motion.div>

            <motion.div
              className="h-px w-20 overflow-hidden rounded-full bg-border/60"
              initial={{ opacity: 0.5, scaleX: 0.8 }}
              animate={{ opacity: [0.35, 0.75, 0.35], scaleX: [0.8, 1, 0.88] }}
              transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity }}
            >
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-transparent via-foreground/70 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.75, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
