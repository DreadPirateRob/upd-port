import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STRIPED_FILL =
  "repeating-linear-gradient(135deg, rgba(250,250,250,0.82) 0 10px, rgba(250,250,250,0.42) 10px 20px)";

function clampFill(fill) {
  if (typeof fill !== "number" || Number.isNaN(fill)) {
    return 0;
  }

  return Math.max(0, Math.min(100, fill));
}

function getFillStyle(accent, fill) {
  const width = `${clampFill(fill)}%`;

  if (accent === "striped") {
    return {
      width,
      backgroundImage: STRIPED_FILL,
    };
  }

  return { width };
}

function getFillClassName(accent) {
  return cn(
    "h-full rounded-full border border-white/10 bg-zinc-100/80 shadow-[0_0_18px_rgba(255,255,255,0.08)]",
    accent === "striped" && "bg-transparent",
  );
}

function renderStatValue(stat) {
  if (!stat?.value && !stat?.suffix) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-end gap-2 text-zinc-50">
      {stat.value ? (
        <span className="text-3xl font-semibold tracking-tight sm:text-[2.15rem]">{stat.value}</span>
      ) : null}
      {stat.suffix ? (
        <span className="pb-1 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-zinc-400">
          {stat.suffix}
        </span>
      ) : null}
    </div>
  );
}

export default function V2ComparisonPanel({
  eyebrow,
  title,
  prompt,
  rows = [],
  takeaway,
  stats = [],
  className,
}) {
  const comparisonRows = rows.filter(Boolean);
  const statCards = stats.filter(Boolean);

  if (!eyebrow && !title && !prompt && !comparisonRows.length && !takeaway && !statCards.length) {
    return null;
  }

  return (
    <section className={cn("border-t border-white/10 px-4 py-14 sm:px-6 sm:py-18", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/88 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="border-b border-white/10 px-6 py-5 sm:px-8 lg:px-10 xl:px-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                {eyebrow ? (
                  <Badge
                    variant="outline"
                    className="border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] tracking-[0.26em] text-zinc-300"
                  >
                    {eyebrow}
                  </Badge>
                ) : null}
                {title ? (
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem]">
                    {title}
                  </h2>
                ) : null}
              </div>
              {comparisonRows.length ? (
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">
                  {comparisonRows.length} comparison rows
                </span>
              ) : null}
            </div>
          </div>

          <div className="grid gap-px bg-white/10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
            <div className="bg-zinc-950/90 px-6 py-8 sm:px-8 sm:py-9 lg:px-10 xl:px-12">
              <div className="space-y-8">
                {prompt ? (
                  <p className="max-w-3xl text-xl font-medium leading-9 text-zinc-100 sm:text-[1.65rem] sm:leading-10">
                    {prompt}
                  </p>
                ) : null}

                {comparisonRows.length ? (
                  <div className="space-y-5">
                    {comparisonRows.map((row, index) => (
                      <article
                        key={`${row.label ?? "row"}-${row.value ?? index}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 sm:px-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div className="space-y-1 pr-4">
                            {row.label ? (
                              <h3 className="text-sm font-medium leading-6 text-zinc-100 sm:text-base">
                                {row.label}
                              </h3>
                            ) : null}
                            {row.note ? (
                              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">
                                {row.note}
                              </p>
                            ) : null}
                          </div>
                          {row.value ? (
                            <span className="shrink-0 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                              {row.value}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-4 h-2.5 rounded-full border border-white/10 bg-white/[0.04] p-[2px]">
                          <div
                            className={getFillClassName(row.accent)}
                            style={getFillStyle(row.accent, row.fill)}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}

                {takeaway ? (
                  <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                    {takeaway}
                  </p>
                ) : null}
              </div>
            </div>

            <aside className="bg-zinc-950/96 px-6 py-8 sm:px-8 sm:py-9 lg:px-8 xl:px-9">
              <div className="space-y-3">
                {statCards.map((stat, index) => (
                  <article
                    key={`${stat.label ?? "stat"}-${stat.value ?? stat.suffix ?? index}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                  >
                    <div className="space-y-4">
                      {renderStatValue(stat)}
                      {stat.label ? (
                        <p className="max-w-[24ch] text-sm leading-6 text-zinc-200">{stat.label}</p>
                      ) : null}
                      {stat.note ? (
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-zinc-500">
                          {stat.note}
                        </p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
