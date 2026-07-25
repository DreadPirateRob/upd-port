"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const CHARS = ["[", "]", "{", "}", "|", "_", "-", ".", "·", "░", "▒", "▓"];
const CELL_SIZE = 16;
const FRAME_INTERVAL = 1000 / 15;

function noise(x, y, t) {
  const a = Math.sin(x * 0.08 + t * 0.4) * Math.cos(y * 0.06 - t * 0.3);
  const b = Math.sin((x + y) * 0.05 + t * 0.2) * 0.5;
  const c = Math.cos(x * 0.12 - y * 0.1 + t * 0.15) * 0.3;
  return (a + b + c + 1) / 2;
}

export default function TextmodeBg({ className }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isVisible = useInView(containerRef, { margin: "120px 0px" });

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
      const cols = Math.ceil(width / CELL_SIZE);
      const rows = Math.ceil(height / CELL_SIZE);
      const t = time * 0.0012;

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);
      context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = noise(x, y, t);
          const charIndex = Math.floor(n * CHARS.length) % CHARS.length;
          const brightness = Math.floor(30 + n * 60);
          context.fillStyle = `rgb(${brightness} ${brightness} ${brightness})`;
          context.fillText(
            CHARS[charIndex],
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
      if (!isVisible) draw();
    });
    observer.observe(canvas);

    if (isVisible) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className,
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {/* Fade overlays so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/95 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_15%,rgba(0,0,0,0.7)_65%)] z-10" />
    </div>
  );
}
