"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { cn } from "@/lib/utils";

const CONTENT_ITEMS = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "challenge", number: "02", label: "Challenge" },
  { id: "architecture", number: "03", label: "Architecture" },
  { id: "impact", number: "04", label: "Impact" },
  { id: "learnings", number: "06", label: "Learnings" },
];

const READING_LINE = 140;

function getActiveSection() {
  let activeId = CONTENT_ITEMS[0].id;

  for (const item of CONTENT_ITEMS) {
    const section = document.getElementById(item.id);
    if (!section) continue;

    if (section.getBoundingClientRect().top <= READING_LINE) {
      activeId = item.id;
      continue;
    }

    break;
  }

  return activeId;
}

export default function ProjectContentsRail() {
  const [activeId, setActiveId] = useState(CONTENT_ITEMS[0].id);

  useEffect(() => {
    let frameId = null;

    const updateActiveSection = () => {
      frameId = null;
      const nextActiveId = getActiveSection();
      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId,
      );
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <Link
        href="/"
        aria-label="Back to home"
        className="block [&>div]:block [&>div>span]:w-full"
      >
        <ClickPowerUp
          as="span"
          variant="secondary"
          className="w-full px-3 py-3 text-xs"
        >
          ← Back to home
        </ClickPowerUp>
      </Link>

      <nav
        aria-label="Table of contents"
        className="border border-border bg-background/90 p-4 backdrop-blur-sm"
      >
        <p className="font-pixel text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          Contents
        </p>
        <ol className="mt-3 border-l border-border">
          {CONTENT_ITEMS.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "-ml-px flex items-center gap-3 border-l px-3 py-2 font-pixel text-xs uppercase tracking-wide transition-colors",
                    isActive
                      ? "border-primary bg-muted/30 text-foreground"
                      : "border-transparent text-muted-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.number}
                  </span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
