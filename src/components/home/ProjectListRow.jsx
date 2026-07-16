"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProjectListRow({ project, index }) {
  const chips = [project.areas?.[0], ...project.technologies.slice(0, 2)]
    .filter(Boolean)
    .slice(0, 3);

  const cta = project.disabled ? (
    <Badge variant="outline" className="text-muted-foreground/60">
      Soon
    </Badge>
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "text-muted-foreground/70 group-hover:text-primary group-hover:border-primary/40"
      )}
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );

  const content = (
    <div className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start py-8 border-b border-border">
      <p className="pt-2 text-sm text-muted-foreground/60 tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </p>

      <div>
        <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl text-pretty">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Badge key={chip} variant="outline">
              {chip}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-2">{cta}</div>
    </div>
  );

  if (project.disabled) {
    return <div className="group block opacity-70">{content}</div>;
  }

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {content}
    </Link>
  );
}
