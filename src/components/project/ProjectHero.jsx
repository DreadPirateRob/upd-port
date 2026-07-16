"use client"

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrapper";

export default function ProjectHero({ title, description, areas, technologies, bigImage }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="left">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
            ← Back to Home
          </Link>
        </FadeIn>
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <StaggerContainer className="flex flex-wrap gap-2 mb-4" staggerDelay={0.05}>
              {areas.map((area) => (
                <StaggerItem key={area}><Badge>{area}</Badge></StaggerItem>
              ))}
            </StaggerContainer>
            <FadeIn direction="up" delay={0.3}>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.4}>
              <p className="text-xl text-muted-foreground mb-6">{description}</p>
            </FadeIn>
            <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.05}>
              {technologies.map((tech) => (
                <StaggerItem key={tech}><Badge variant="secondary">{tech}</Badge></StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
        <div className="col-span-24 aspect-video mb-8 border border-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]">
          <div className="relative h-full">
            <Image src={bigImage} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
