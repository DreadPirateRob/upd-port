import { Badge } from "@/components/ui/badge";
import DottedGlowBackground from "@/components/ui/dotted-glow-background";
import { cn } from "@/lib/utils";

import V2StatGrid from "./V2StatGrid";

export default function V2Hero({
  eyebrow,
  title,
  heroSummary,
  intro,
  metrics = [],
  className,
}) {
  return (
    <section className={cn("px-4 py-14 sm:px-6 sm:py-18 lg:py-24", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/85 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="relative overflow-hidden grid gap-12 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            <DottedGlowBackground
              className="pointer-events-none absolute inset-0"
              opacity={0.72}
              gap={14}
              radius={1.2}
              speedMin={0.25}
              speedMax={0.85}
              speedScale={0.8}
            />
            <div className="relative z-10 space-y-6">
              {eyebrow ? (
                <Badge
                  variant="outline"
                  className="border-white/15 bg-white/[0.03] px-3 py-1 text-[0.68rem] tracking-[0.26em] text-zinc-300"
                >
                  {eyebrow}
                </Badge>
              ) : null}
              {title ? (
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
              ) : null}
              {heroSummary ? (
                <p className="max-w-3xl text-xl leading-9 text-zinc-200 sm:text-2xl sm:leading-10">
                  {heroSummary}
                </p>
              ) : null}
            </div>

            {intro ? (
              <div className="relative z-10 flex items-end lg:pl-6">
                <p className="max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  {intro}
                </p>
              </div>
            ) : (
              <div className="relative z-10" />
            )}
          </div>

          <div className="border-t border-white/10 px-6 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12">
            <V2StatGrid metrics={metrics} />
          </div>
        </div>
      </div>
    </section>
  );
}
