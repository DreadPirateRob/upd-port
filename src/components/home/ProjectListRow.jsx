"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { ScrambleText } from "@/components/ui/scramble-text";
import ProjectTextmode from "@/components/ui/project-textmode";
import { textmodeHoverVisual } from "@/components/ui/textmode-hover-visual";
import TechTag from "@/components/ui/tech-tag";

const LINK_LABEL = {
  live: "Live",
  source: "Source",
  "case-study": "Case study",
};

// Rows render entries from `@/data/side-projects`:
//   { id, title, description, tags, year, linkType, href }
// `href: null` means the destination is not published yet, so the row renders
// as a non-interactive tile rather than linking somewhere broken.
export default function ProjectListRow({ project, index }) {
  const [hoverCount, setHoverCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setHoverCount((count) => count + 1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  const chips = (project.tags ?? []).slice(0, 3);
  const isPublished = Boolean(project.href);
  const isExternal = isPublished && /^https?:/.test(project.href);
  const linkLabel = LINK_LABEL[project.linkType] ?? LINK_LABEL["case-study"];

  const cta = isPublished ? (
    <span aria-hidden="true">
      <ClickPowerUp as="span" variant="secondary" className="size-10 p-0">
        <ArrowUpRight className="size-4" />
      </ClickPowerUp>
    </span>
  ) : (
    <Badge variant="outline" className="text-muted-foreground/60">
      Soon
    </Badge>
  );

  const content = (
    <div className="relative isolate grid grid-cols-[auto_1fr_auto] items-start gap-4 overflow-hidden border-b border-border px-4 py-8 sm:px-6 md:gap-8 lg:px-8">
      <ProjectTextmode
        variant={textmodeHoverVisual}
        active={isHovered}
        className={`pointer-events-none z-0 transition-opacity duration-300 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
      />
      <span
        className={`pointer-events-none absolute inset-0 z-[1] bg-black/35 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <p className="relative z-10 pt-2 text-sm tabular-nums text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="relative z-10">
        <p className="mb-2 font-pixel text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
          {linkLabel}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h3 className="font-pixel text-3xl sm:text-4xl font-light tracking-tight mb-3 text-foreground transition-colors group-hover:text-primary">
          <ScrambleText text={project.title} trigger={hoverCount} />
        </h3>
        <p className="mb-4 max-w-2xl text-pretty text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <TechTag key={chip}>{chip}</TechTag>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-2">{cta}</div>
    </div>
  );

  if (!isPublished) {
    return (
      <div
        className="group block opacity-70"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </div>
    );
  }

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {content}
    </Link>
  );
}
