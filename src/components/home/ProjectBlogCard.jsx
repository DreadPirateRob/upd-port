"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ProjectBlogCard({ project }) {
  const isDisabled = project.disabled;

  const inner = (
    <div className="group border border-border rounded-lg overflow-hidden bg-card transition-all duration-300 hover:border-primary/30 h-full">
      {/* Full-bleed image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.bigImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="mb-3">
          {project.areas?.[0] && (
            <Badge variant="outline" className="text-xs uppercase tracking-wider">
              {project.areas[0]}
            </Badge>
          )}
        </div>

        <h3 className="font-bold text-base leading-snug mb-4">
          {project.title}
        </h3>

        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
          {isDisabled ? "COMING SOON" : "READ POST →"}
        </span>
      </div>
    </div>
  );

  if (isDisabled) return inner;

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
