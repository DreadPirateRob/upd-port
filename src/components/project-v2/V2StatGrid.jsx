import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function V2StatGrid({ metrics = [], className }) {
  const items = metrics.filter(Boolean);

  if (!items.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {items.map((metric) => (
        <Card
          key={`${metric.label}-${metric.value}`}
          className="rounded-none border-0 bg-zinc-950/90 py-0 shadow-none"
        >
          <CardContent className="flex h-full flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
              {metric.label}
            </span>
            <span className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              {metric.value}
            </span>
            {metric.note ? (
              <p className="max-w-[20ch] text-sm leading-6 text-zinc-400">{metric.note}</p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
