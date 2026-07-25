"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CHARS = [".", ":", "+", "x"];

export default function MiniTextmodeIcon({ className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let destroyed = false;
    let tm;

    (async () => {
      const { textmode } = await import("textmode.js");
      if (destroyed || !container) return;

      tm = textmode.create({
        width: 28,
        height: 28,
        fontSize: 6,
        frameRate: 10,
      });

      if (destroyed) {
        tm.destroy?.();
        return;
      }

      const canvas = tm.canvas;
      if (canvas && canvas.parentNode !== container) {
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
        container.appendChild(canvas);
      }

      const glyphs = new Map();

      tm.draw(() => {
        tm.background(10, 10, 10, 255);

        const cols = tm.grid.cols;
        const rows = tm.grid.rows;
        const t = tm.frameCount * 0.12;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const pulse = (Math.sin(t - x * 0.65 - y * 0.5) + 1) * 0.5;
            const tone = Math.floor(62 + pulse * 76);
            const key = `${x}:${y}`;
            let glyph = glyphs.get(key) ?? CHARS[(x + y) % CHARS.length];

            if (Math.random() < 0.008) {
              const currentIndex = CHARS.indexOf(glyph);
              const offset = 1 + Math.floor(Math.random() * (CHARS.length - 1));
              glyph = CHARS[(currentIndex + offset) % CHARS.length];
              glyphs.set(key, glyph);
            }

            tm.push();
            tm.translate(x - cols / 2, y - rows / 2, 0);
            tm.char(glyph);
            tm.charColor(tone, tone, tone);
            tm.point();
            tm.pop();
          }
        }
      });
    })();

    return () => {
      destroyed = true;
      if (tm) {
        try {
          tm.destroy?.() ?? tm.remove?.();
        } catch (_) {
          /* noop */
        }
      }
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative size-7 shrink-0 overflow-hidden rounded border border-white/10 bg-neutral-950",
      )}
      aria-hidden="true"
    />
  );
}
