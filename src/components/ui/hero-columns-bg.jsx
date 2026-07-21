"use client";

import { motion } from "motion/react";

const COLUMN_LAYERS = [
  {
    opacity: 0.38,
    backgroundImage:
      "repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.04) 0px, rgba(148, 163, 184, 0.04) 1px, transparent 1px, transparent 84px, rgba(255, 255, 255, 0.03) 84px, rgba(255, 255, 255, 0.03) 124px, transparent 124px, transparent 196px)",
  },
  {
    opacity: 0.28,
    backgroundImage:
      "repeating-linear-gradient(90deg, transparent 0px, transparent 24px, rgba(255, 255, 255, 0.024) 24px, rgba(255, 255, 255, 0.024) 78px, transparent 78px, transparent 118px, rgba(99, 102, 241, 0.035) 118px, rgba(99, 102, 241, 0.035) 168px, transparent 168px, transparent 256px)",
  },
  {
    opacity: 0.2,
    backgroundImage:
      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.035) 14%, transparent 24%, transparent 42%, rgba(96, 165, 250, 0.05) 52%, transparent 64%, transparent 100%)",
    backgroundSize: "420px 100%",
    backgroundPosition: "center",
  },
];

export default function HeroColumnsBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#040711]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(2,6,23,0.35)_100%)]" />

      {COLUMN_LAYERS.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: layer.opacity,
            backgroundImage: layer.backgroundImage,
            backgroundSize: layer.backgroundSize,
            backgroundPosition: layer.backgroundPosition,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.28)_18%,rgba(2,6,23,0.08)_34%,rgba(2,6,23,0.08)_66%,rgba(2,6,23,0.28)_82%,rgba(2,6,23,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_44%,rgba(2,6,23,0.16)_68%,rgba(2,6,23,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.72)_0%,transparent_24%,transparent_76%,rgba(2,6,23,0.82)_100%)]" />

      <motion.div
        className="absolute inset-y-[-18%] left-[-32%] w-[46%] min-w-[18rem] bg-[linear-gradient(90deg,transparent_0%,rgba(103,232,249,0.06)_22%,rgba(186,230,253,0.22)_48%,rgba(103,232,249,0.08)_72%,transparent_100%)] opacity-70 blur-3xl"
        animate={{ x: ["0%", "220%"] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute inset-y-[-12%] left-[-24%] w-[28%] min-w-[11rem] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.2)_50%,rgba(125,211,252,0.06)_68%,transparent_100%)] opacity-45 blur-2xl"
        animate={{ x: ["0%", "250%"] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "linear", delay: 1.1 }}
      />

      <div className="absolute inset-x-[18%] inset-y-[20%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(125,211,252,0.035)_28%,transparent_72%)] blur-3xl" />
    </div>
  );
}
