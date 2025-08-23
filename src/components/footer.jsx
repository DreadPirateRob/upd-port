import { FadeIn } from "@/components/animations/AnimationWrapper";

export default function Footer() {
  return (
    <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
      <FadeIn direction="up">
        <p className="text-center text-5xl md:text-9xl lg:text-[12rem] xl:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
          ADRIAN GARCIA
        </p>
      </FadeIn>
    </div>
  );
}
