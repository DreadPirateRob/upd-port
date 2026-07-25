"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const CELL_SIZE = 16;
const FRAME_INTERVAL = 1000 / 15;

export default function ProjectTextmode({ variant, active = true, className }) {
  const canvasRef = useRef(null);
  const isVisible = useInView(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return undefined;

    let frameId;
    let lastFrame = 0;

    function resize() {
      const width = Math.max(1, Math.round(canvas.clientWidth));
      const height = Math.max(1, Math.round(canvas.clientHeight));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function draw(time = 0) {
      const width = canvas.width;
      const height = canvas.height;
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      if (!active) return;

      const cols = Math.ceil(width / CELL_SIZE);
      const rows = Math.ceil(height / CELL_SIZE);
      const t = time * 0.0009;
      const { chars, field, color } = variant;

      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = field(x, y, t, cols, rows);
          const index = Math.min(
            chars.length - 1,
            Math.max(0, Math.floor(n * chars.length)),
          );
          const [r, g, b] = color(n);
          context.fillStyle = `rgb(${r} ${g} ${b})`;
          context.fillText(
            chars[index],
            (x + 0.5) * CELL_SIZE,
            (y + 0.5) * CELL_SIZE,
          );
        }
      }
    }

    function animate(time) {
      if (time - lastFrame >= FRAME_INTERVAL) {
        lastFrame = time;
        draw(time);
      }
      frameId = requestAnimationFrame(animate);
    }

    resize();
    draw();

    const observer = new ResizeObserver(() => {
      resize();
      if (!active || !isVisible) draw();
    });
    observer.observe(canvas);

    if (active && isVisible) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [active, isVisible, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 size-full", className)}
      aria-hidden="true"
    />
  );
}
