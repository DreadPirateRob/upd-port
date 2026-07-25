"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { ScrambleText } from "@/components/ui/scramble-text";
import ProjectTextmode from "@/components/ui/project-textmode";
import { textmodeHoverVisual } from "@/components/ui/textmode-hover-visual";

export default function ProjectListRow({ project, index }) {
  const [hoverCount, setHoverCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setHoverCount((count) => count + 1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  const chips = [project.areas?.[0], ...project.technologies.slice(0, 2)]
    .filter(Boolean)
    .slice(0, 3);

  const cta = project.disabled ? (
    <Badge variant="outline" className="text-muted-foreground/60">
      Soon
    </Badge>
  ) : (
    <span aria-hidden="true">
      <ClickPowerUp
        as="span"
        variant="secondary"
        className="size-10 p-0"
      >
        <ArrowUpRight className="size-4" />
      </ClickPowerUp>
    </span>
  );

  const content = (
    <div className="relative isolate grid grid-cols-[auto_1fr_auto] items-start gap-4 overflow-hidden border-b border-border py-8 md:gap-8">
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
      <p className="relative z-10 pt-2 text-sm tabular-nums text-muted-foreground/60 transition-colors group-hover:text-white/60">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div className="relative z-10">
        <h3 className="font-pixel text-3xl sm:text-4xl font-light tracking-tight mb-3 group-hover:text-primary transition-colors">
          <ScrambleText text={project.title} trigger={hoverCount} />
        </h3>
        <p className="mb-4 max-w-2xl text-pretty text-sm text-muted-foreground transition-colors group-hover:text-white/70">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge key={chip} variant="outline" className="transition-colors group-hover:border-white/20 group-hover:text-white/70">
              {chip}
            </Badge>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-2">{cta}</div>
    </div>
  );

  if (project.disabled) {
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

  return (
    <Link
      href={`/projects/${project.slug}`}
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
