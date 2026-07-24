"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Renders an abstract textmode.js animation into an absolutely-positioned layer.
// `active` gates the full render — when false the panel just clears to black, so
// several instances (one per accordion panel) can stay mounted without churning
// WebGL contexts on every auto-cycle.
export default function ProjectTextmode({ variant, active = true, className }) {
  const containerRef = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let destroyed = false;
    let tm;
    let ro;

    (async () => {
      const { textmode } = await import("textmode.js");
      if (destroyed || !container) return;

      const rect = container.getBoundingClientRect();
      tm = textmode.create({
        width: Math.max(1, Math.round(rect.width)),
        height: Math.max(1, Math.round(rect.height)),
        fontSize: 16,
        frameRate: 30,
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

      const { chars, field, color } = variant;

      tm.draw(() => {
        tm.background(0, 0, 0, 255);
        if (!activeRef.current) return;

        const cols = tm.grid.cols;
        const rows = tm.grid.rows;
        const t = tm.frameCount * 0.03;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const n = field(x, y, t, cols, rows);
            const idx = Math.min(
              chars.length - 1,
              Math.max(0, Math.floor(n * chars.length)),
            );
            const [r, g, b] = color(n);

            tm.push();
            tm.translate(x - cols / 2, y - rows / 2, 0);
            tm.char(chars[idx]);
            tm.charColor(r, g, b);
            tm.point();
            tm.pop();
          }
        }
      });

      ro = new ResizeObserver(() => {
        const r = container.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          tm.resizeCanvas?.(Math.round(r.width), Math.round(r.height));
        }
      });
      ro.observe(container);
    })();

    return () => {
      destroyed = true;
      ro?.disconnect();
      if (tm) {
        try {
          tm.destroy?.() ?? tm.remove?.();
        } catch (_) {
          /* noop */
        }
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    />
  );
}
