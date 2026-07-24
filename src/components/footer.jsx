"use client";

import { FadeIn } from "@/components/animations/AnimationWrapper";
import { ScrambleHeading } from "@/components/ui/scramble-text";

export default function Footer() {
  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      <FadeIn direction="up">
        <ScrambleHeading
          as="p"
          className="font-pixel text-center text-5xl md:text-9xl lg:text-[12rem] xl:text-[10rem] font-bold inset-x-0"
          contentClassName="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800"
          text="ADRIAN GARCIA"
          config={{ staggerMs: 45, tickMs: 30, scrambleRounds: 4 }}
        />
      </FadeIn>
    </div>
  );
}
