"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Github, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import TechTag from "@/components/ui/tech-tag";
import { ScrambleText } from "@/components/ui/scramble-text";
import { cn } from "@/lib/utils";

const LINK_META = {
  live: { label: "Live", Icon: Globe },
  source: { label: "Source", Icon: Github },
  "case-study": { label: "Case study", Icon: FileText },
};

export default function SideProjectCard({ project }) {
  const [hoverCount, setHoverCount] = useState(0);

  const meta = LINK_META[project.linkType] ?? LINK_META["case-study"];
  const { Icon } = meta;
  const isExternal = Boolean(project.href) && /^https?:/.test(project.href);
  const isPublished = Boolean(project.href);

  const content = (
    <div className="flex h-full flex-col gap-4 bg-background px-5 py-6 transition-colors group-hover:bg-muted/30">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 font-pixel text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
          <Icon aria-hidden="true" className="size-3" />
          {meta.label}
        </span>
        <span className="font-pixel text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground/60 tabular-nums">
          {project.year}
        </span>
      </div>

      <div className="flex-1">
        <h4 className="font-pixel text-xl font-light tracking-tight transition-colors group-hover:text-primary">
          <ScrambleText text={project.title} trigger={hoverCount} />
        </h4>
        <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>

        {isPublished ? (
          <span
            aria-hidden="true"
            className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          >
            {isExternal ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </span>
        ) : (
          <Badge variant="outline" className="shrink-0 text-muted-foreground/60">
            Soon
          </Badge>
        )}
      </div>
    </div>
  );

  const shellClass = cn("group block h-full", !isPublished && "opacity-70");

  if (!isPublished) {
    return (
      <div className={shellClass} onMouseEnter={() => setHoverCount((n) => n + 1)}>
        {content}
      </div>
    );
  }

  if (isExternal) {
    return (
      <a
        className={shellClass}
        href={project.href}
        rel="noreferrer noopener"
        target="_blank"
        onMouseEnter={() => setHoverCount((n) => n + 1)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={shellClass}
      href={project.href}
      onMouseEnter={() => setHoverCount((n) => n + 1)}
    >
      {content}
    </Link>
  );
}
