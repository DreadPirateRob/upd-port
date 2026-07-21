import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_LEGEND = [
  { label: "Lower bound", accent: "solid" },
  { label: "Observed variability", accent: "striped" },
];

const STRIPED_FILL =
  "repeating-linear-gradient(135deg, rgba(244,244,245,0.68) 0 8px, rgba(244,244,245,0.26) 8px 16px)";

function getNumericValue(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, value);
}

function getRowTotal(row) {
  return getNumericValue(row?.base) + getNumericValue(row?.range);
}

function getMaxTotal(rows) {
  const totals = rows.map(getRowTotal).filter((value) => value > 0);

  return totals.length ? Math.max(...totals) : 1;
}

function formatMeasurement(value, unit, withPlus = false) {
  const numericValue = getNumericValue(value);

  if (!numericValue) {
    return withPlus ? `+0${unit ?? ""}` : `0${unit ?? ""}`;
  }

  return `${withPlus ? "+" : ""}${numericValue}${unit ?? ""}`;
}

function getLegendSwatch(accent) {
  if (accent === "striped") {
    return {
      className: "border-white/10 bg-transparent",
      style: { backgroundImage: STRIPED_FILL },
    };
  }

  return {
    className: "border-cyan-200/15 bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(34,211,238,0.75))] shadow-[0_0_18px_rgba(103,232,249,0.18)]",
    style: undefined,
  };
}

export default function V2StackedRangePanel({
  eyebrow,
  title,
  intro,
  legend = DEFAULT_LEGEND,
  rows = [],
  takeaway,
  stats = [],
  className,
}) {
  const safeRows = (Array.isArray(rows) ? rows : []).filter((row) => row?.label && getRowTotal(row) > 0);
  const legendItems = Array.isArray(legend) && legend.length ? legend : DEFAULT_LEGEND;
  const safeLegend = legendItems.filter((item) => item?.label);
  const statCards = (Array.isArray(stats) ? stats : []).filter(
    (stat) => stat?.value !== undefined || stat?.label,
  );
  const maxTotal = getMaxTotal(safeRows);

  if (!eyebrow && !title && !intro && !safeRows.length && !takeaway && !statCards.length) {
    return null;
  }

  return (
    <section className={cn("border-t border-white/10 px-4 py-14 sm:px-6 sm:py-18", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/88 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div
            className={cn(
              "grid gap-px bg-white/10",
              statCards.length && "lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.72fr)]",
            )}
          >
            <div className="bg-zinc-950/92 px-6 py-8 sm:px-8 sm:py-9 lg:px-10 xl:px-12">
              <div className="space-y-8">
                <div className="space-y-5 border-b border-white/10 pb-6 sm:pb-7">
                  {eyebrow ? (
                    <Badge
                      variant="outline"
                      className="border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] tracking-[0.26em] text-zinc-300"
                    >
                      {eyebrow}
                    </Badge>
                  ) : null}
                  {title ? (
                    <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem]">
                      {title}
                    </h2>
                  ) : null}
                  {intro ? <p className="max-w-3xl text-base leading-8 text-zinc-300 sm:text-lg">{intro}</p> : null}
                  {safeLegend.length ? (
                    <ul className="flex flex-wrap gap-3" aria-label="Range legend">
                      {safeLegend.map((item, index) => {
                        const swatch = getLegendSwatch(item.accent);

                        return (
                          <li
                            key={`${item.label}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-zinc-300"
                          >
                            <span
                              className={cn("h-2.5 w-8 rounded-full border", swatch.className)}
                              style={swatch.style}
                              aria-hidden="true"
                            />
                            <span>{item.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>

                {safeRows.length ? (
                  <div className="space-y-5">
                    {safeRows.map((row, index) => {
                      const base = getNumericValue(row.base);
                      const range = getNumericValue(row.range);
                      const total = base + range;
                      const totalWidth = `${(total / maxTotal) * 100}%`;
                      const baseWidth = total ? `${(base / total) * 100}%` : "0%";
                      const rangeWidth = total ? `${(range / total) * 100}%` : "0%";
                      const measurement = row.display ?? formatMeasurement(total, row.unit);

                      return (
                        <article
                          key={`${row.label}-${row.display ?? index}`}
                          className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="space-y-1 pr-4">
                              <h3 className="text-sm font-medium leading-6 text-zinc-100 sm:text-base">{row.label}</h3>
                              {row.note ? (
                                <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">
                                  {row.note}
                                </p>
                              ) : null}
                            </div>
                            <span className="shrink-0 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                              {measurement}
                            </span>
                          </div>

                          <div className="mt-4 h-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] p-[2px]">
                            <div className="flex h-full overflow-hidden rounded-full" style={{ width: totalWidth }}>
                              <div
                                className="h-full rounded-l-full bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(34,211,238,0.75))] shadow-[0_0_20px_rgba(34,211,238,0.16)]"
                                style={{ width: baseWidth }}
                                aria-label={`${row.label} lower bound ${formatMeasurement(base, row.unit)}`}
                              />
                              <div
                                className="h-full rounded-r-full border-l border-white/8 bg-transparent"
                                style={{ width: rangeWidth, backgroundImage: STRIPED_FILL }}
                                aria-label={`${row.label} variability ${formatMeasurement(range, row.unit, true)}`}
                              />
                            </div>
                          </div>

                          <dl className="mt-4 grid gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-zinc-500 sm:grid-cols-2">
                            <div className="space-y-1">
                              <dt>Lower bound</dt>
                              <dd className="text-sm font-medium tracking-normal text-zinc-200">
                                {formatMeasurement(base, row.unit)}
                              </dd>
                            </div>
                            <div className="space-y-1 sm:text-right">
                              <dt>Observed variability</dt>
                              <dd className="text-sm font-medium tracking-normal text-zinc-200">
                                {formatMeasurement(range, row.unit, true)}
                              </dd>
                            </div>
                          </dl>
                        </article>
                      );
                    })}
                  </div>
                ) : null}

                {takeaway ? (
                  <p className="max-w-3xl rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-zinc-400 sm:px-5 sm:text-base sm:leading-8">
                    {takeaway}
                  </p>
                ) : null}
              </div>
            </div>

            {statCards.length ? (
              <aside className="bg-zinc-950/96 px-6 py-8 sm:px-8 sm:py-9 lg:px-8 xl:px-9">
                <div className="space-y-3">
                  {statCards.map((stat, index) => (
                    <article
                      key={`${stat.label ?? "stat"}-${stat.value ?? index}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                    >
                      <div className="space-y-4">
                        {stat.value ? (
                          <span className="block text-3xl font-semibold tracking-tight text-zinc-50 sm:text-[2.15rem]">
                            {stat.value}
                          </span>
                        ) : null}
                        {stat.label ? <p className="text-sm leading-6 text-zinc-200">{stat.label}</p> : null}
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
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
