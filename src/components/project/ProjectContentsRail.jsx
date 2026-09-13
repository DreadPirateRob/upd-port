"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { cn } from "@/lib/utils";

// Distance from the top of the viewport that counts as "what you are reading".
const READING_LINE = 140;

// Tracked with IntersectionObserver rather than a scroll handler: Lenis smooth
// scrolling drives a scroll event every frame, and measuring each section with
// getBoundingClientRect() on every one of those forces a layout read on the
// main thread. The observer reports the same crossings without that cost.
export default function ProjectContentsRail({ items }) {
  const [activeId, setActiveId] = useState(items[0].id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    let observer;

    // A 1px band pinned at the reading line: a section is active while it
    // straddles that line. Gaps between sections leave the last one active.
    const observe = () => {
      observer?.disconnect();

      const below = Math.max(window.innerHeight - READING_LINE - 1, 0);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveId(entry.target.id);
          }
        },
        { rootMargin: `-${READING_LINE}px 0px -${below}px 0px` },
      );

      sections.forEach((section) => observer.observe(section));
    };

    observe();
    window.addEventListener("resize", observe);

    return () => {
      window.removeEventListener("resize", observe);
      observer?.disconnect();
    };
  }, [items]);

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
          {items.map((item, index) => {
            const isActive = item.id === activeId;
            const number = String(index + 1).padStart(2, "0");

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
                    {number}
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
