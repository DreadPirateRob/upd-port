const LEARNING_AREAS = [
  {
    index: "01",
    title: "What worked",
    markerClassName: "bg-primary",
    points: [
      {
        title: "Regional ingestion",
        detail:
          "Keeping persistent exchange connections near venue infrastructure removed geography from the consumer's critical path.",
      },
      {
        title: "Strong adapter boundaries",
        detail:
          "A normalized adapter contract contained most protocol differences without leaking them into delivery.",
      },
      {
        title: "Central ownership of book correctness",
        detail:
          "One owner for sequencing, checksum validation, and resynchronization decisions kept order-book truth explicit.",
      },
      {
        title: "A consistent consumer contract",
        detail:
          "Clients consumed one stable API regardless of the venue protocol or the edge region serving it.",
      },
    ],
  },
  {
    index: "02",
    title: "What was harder than expected",
    markerClassName: "bg-destructive",
    points: [
      {
        title: "Exchange-specific recovery",
        detail:
          "CCXT reduced surface area, but reconnects, maintenance windows, and sequence gaps still required venue-specific recovery paths.",
      },
      {
        title: "Measuring meaningful latency",
        detail:
          "Roundtrip time was not enough; useful freshness included ingestion, normalization, queueing, and delivery.",
      },
      {
        title: "Stale but technically connected feeds",
        detail:
          "An open WebSocket could still carry delayed or incomplete data, so connection health and feed health had to remain separate.",
      },
      {
        title: "Deployment and schema compatibility",
        detail:
          "Rolling nodes safely required compatibility between normalized event versions and the state already held in regional caches.",
      },
    ],
  },
  {
    index: "03",
    title: "What I would change",
    markerClassName: "bg-muted-foreground",
    points: [
      {
        title: "Fewer early components",
        detail:
          "I separated parts of connection management before their behavior stabilized; fewer boundaries first would have reduced churn.",
      },
      {
        title: "Untangle the remaining coupling",
        detail:
          "Adapter recovery and order-book reconstruction still shared too much knowledge about each other's lifecycle.",
      },
      {
        title: "Replace process-level deployment tooling",
        detail:
          "PM2 was effective for process recovery, but a larger deployment should move supervision and rollout control into an orchestrated runtime.",
      },
      {
        title: "Design explicitly for the next scale",
        detail:
          "I would start with versioned event contracts, replayable logs, and per-feed freshness objectives rather than add them later.",
      },
    ],
  },
];

const NEXT_ARTICLE_BRIDGE =
  "Reliable market data solves only the first part of the trading lifecycle. The next problem is turning that data into safe, deterministic exchange actions through the execution and order-management layers.";

function LearningArea({ area }) {
  return (
    <article className="bg-background px-6 py-8 sm:px-8 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-pixel text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          {area.index}
        </span>
        <span aria-hidden="true" className={`size-2 ${area.markerClassName}`} />
      </div>
      <h3 className="mt-5 min-h-12 font-pixel text-lg uppercase leading-tight tracking-tight text-foreground">
        {area.title}
      </h3>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {area.points.map((point) => (
          <li key={point.title} className="py-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
              {point.title}
            </h4>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {point.detail}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function MarketDataLearnings() {
  return (
    <section id="learnings" className="mt-12 scroll-mt-28 border border-border">
      <header className="grid gap-px bg-border sm:grid-cols-2">
        <div className="bg-foreground px-6 py-8 text-background sm:px-8">
          <h2 className="font-pixel text-xl uppercase tracking-tight sm:text-2xl">
            What I learned
          </h2>
        </div>
        <div
          aria-hidden="true"
          className="min-h-20 bg-background bg-size-[10px_10px] bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"
        />
      </header>

      <div className="grid gap-px bg-border lg:grid-cols-3">
        {LEARNING_AREAS.map((area) => (
          <LearningArea key={area.title} area={area} />
        ))}
      </div>

      <div className="grid gap-px border-t border-border bg-border lg:grid-cols-4">
        <div className="bg-muted/30 px-6 py-6 lg:px-5">
          <p className="font-pixel text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            Next case study
          </p>
        </div>
        <div className="bg-background px-6 py-6 sm:px-8 lg:col-span-3">
          <p className="max-w-4xl text-base font-medium leading-7 text-foreground sm:text-lg sm:leading-8">
            {NEXT_ARTICLE_BRIDGE}
          </p>
        </div>
      </div>
    </section>
  );
}
