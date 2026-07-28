"use client";

import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";
import { cn } from "@/lib/utils";

function MapVisual({ globe }) {
  return (
    <div className="space-y-6">
      <div className="relative mx-auto aspect-[2.15/1] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/92 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <WorldMap
          className="h-full w-full"
          hubId="Virginia"
          markers={globe?.markers}
          showArcs
        />
      </div>

      {globe?.caption ? (
        <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-zinc-400">
          {globe.caption}
        </p>
      ) : null}
    </div>
  );
}

export default function V2GeoPanel({
  eyebrow,
  title,
  intro,
  bars = [],
  note,
  globe,
  className,
}) {
  const safeBars = bars.filter((bar) => bar?.label);
  const totalVenues = safeBars.reduce((sum, bar) => sum + (typeof bar.value === "number" ? bar.value : 0), 0);
  const largestCluster = safeBars.reduce((max, bar) => {
    const current = typeof bar.value === "number" ? bar.value : 0;
    return current > max ? current : max;
  }, 0);

  return (
    <section className={cn("px-0 py-14 sm:py-18", className)}>
      <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/85 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <div className="border-b border-white/10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14">
          <div className="max-w-4xl space-y-5">
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
            {intro ? <p className="max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">{intro}</p> : null}
          </div>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10">
          <MapVisual globe={globe} />
        </div>

        <div className="border-t border-white/10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 xl:px-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-10">
            <div className="space-y-4">
              {safeBars.map((bar) => (
                <div
                  key={`${bar.label}-${bar.detail ?? ""}`}
                  className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5"
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-100">
                        {bar.label}
                      </p>
                      {bar.detail ? <p className="mt-1 text-sm leading-6 text-zinc-400">{bar.detail}</p> : null}
                    </div>
                    <div className="text-right text-2xl font-semibold tracking-tight text-zinc-50">
                      {bar.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Clusters
                </p>
                <p className="font-pixel mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
                  {safeBars.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Regional node groups positioned nearest to exchange infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Named venues
                </p>
                <p className="font-pixel mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
                  {totalVenues}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Venues grouped into operational clusters to keep feed collection close to the source.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5 sm:col-span-2 lg:col-span-1">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Largest cluster
                </p>
                <p className="font-pixel mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
                  {largestCluster}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Exchanges in the APAC grouping, reflecting where the densest concentration of target venues lived.
                </p>
              </div>

              {note ? (
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 text-sm leading-7 text-zinc-400 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5 sm:col-span-2 lg:col-span-1">
                  {note}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
