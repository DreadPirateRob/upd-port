"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, HoverEffect } from "@/components/animations/AnimationWrapper";

export default function ProjectCTA() {
  return (
    <section className="py-12 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn direction="up">
          <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-muted-foreground mb-8">
            Let&apos;s discuss your next project and see how I can help bring your ideas to life.
          </p>
        </FadeIn>
        <FadeIn direction="up" delay={0.4}>
          <div className="flex gap-4 justify-center">
            <HoverEffect effect="scale">
              <a href="mailto:adriangarcia9916@gmail.com">
                <Button size="lg">Get In Touch</Button>
              </a>
            </HoverEffect>
            <Link href="/#projects-section">
              <HoverEffect effect="scale">
                <Button variant="outline" size="lg">View More Projects</Button>
              </HoverEffect>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
