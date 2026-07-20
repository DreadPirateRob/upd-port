import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import V2Figure from "./V2Figure";

export default function V2Section({
  eyebrow,
  title,
  body = [],
  bullets = [],
  figure,
  figurePosition = "right",
  className,
}) {
  const paragraphs = body.filter(Boolean);
  const items = bullets.filter(Boolean);
  const hasFigure = figure?.src && figure?.alt;
  const figureFirst = hasFigure && figurePosition === "left";

  return (
    <section className={cn("border-t border-white/10 px-4 py-14 sm:px-6 sm:py-18", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div
            className={cn(
              "space-y-6 lg:col-span-7",
              figureFirst && "lg:order-2",
              hasFigure ? null : "max-w-3xl",
            )}
          >
            <div className="space-y-4">
              {eyebrow ? (
                <Badge
                  variant="outline"
                  className="border-white/15 bg-white/[0.03] px-3 py-1 text-[0.68rem] tracking-[0.26em] text-zinc-300"
                >
                  {eyebrow}
                </Badge>
              ) : null}
              {title ? (
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  {title}
                </h2>
              ) : null}
            </div>

            {paragraphs.length ? (
              <div className="space-y-5 text-base leading-8 text-zinc-300">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {items.length ? (
              <ul className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-7 text-zinc-300 sm:p-6 sm:text-base">
                {items.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {hasFigure ? (
            <div
              className={cn(
                "lg:col-span-5",
                figureFirst ? "lg:order-1" : "lg:order-2",
              )}
            >
              <div className="sticky top-24">
                <V2Figure {...figure} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
