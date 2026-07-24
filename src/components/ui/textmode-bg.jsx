"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = ["[", "]", "{", "}", "|", "_", "-", ".", "·", "░", "▒", "▓"];

function noise(x, y, t) {
  const a = Math.sin(x * 0.08 + t * 0.4) * Math.cos(y * 0.06 - t * 0.3);
  const b = Math.sin((x + y) * 0.05 + t * 0.2) * 0.5;
  const c = Math.cos(x * 0.12 - y * 0.1 + t * 0.15) * 0.3;
  return (a + b + c + 1) / 2;
}

export default function TextmodeBg({ className }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const container = containerRef.current;
    let destroyed = false;
    let tm;

    (async () => {
      const { textmode } = await import("textmode.js");
      if (destroyed || !container) return;

      const rect = container.getBoundingClientRect();

      tm = textmode.create({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        fontSize: 14,
        frameRate: 30,
      });

      if (destroyed) {
        tm.remove?.();
        return;
      }

      instanceRef.current = tm;

      // Move the canvas textmode created into our container
      const canvas = tm.canvas ?? document.querySelector("canvas:last-of-type");
      if (canvas && canvas.parentNode !== container) {
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
        container.appendChild(canvas);
      }

      tm.draw(() => {
        tm.background(0, 0, 0, 255);

        const cols = tm.grid.cols;
        const rows = tm.grid.rows;
        const t = tm.frameCount * 0.04;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const n = noise(x, y, t);
            const charIdx = Math.floor(n * CHARS.length) % CHARS.length;
            const brightness = Math.floor(30 + n * 60);

            tm.push();
            tm.translate(x - cols / 2, y - rows / 2, 0);
            tm.char(CHARS[charIdx]);
            tm.charColor(brightness, brightness, brightness);
            tm.point();
            tm.pop();
          }
        }
      });

      setReady(true);
    })();

    return () => {
      destroyed = true;
      if (tm) {
        try { tm.remove?.(); } catch (_) { /* noop */ }
      }
      instanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className,
      )}
      aria-hidden="true"
    >
      {/* Fade overlays so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/95 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_15%,rgba(0,0,0,0.7)_65%)] z-10" />
    </div>
  );
}
