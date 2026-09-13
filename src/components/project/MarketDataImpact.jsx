const IMPACT_ROWS = [
  {
    area: "Observed path RTT",
    before: "180–220ms",
    beforeDetail: "US-East monolith to Binance in Tokyo",
    after: "2–8ms",
    afterDetail: "Tokyo edge node to Binance",
  },
  {
    area: "Client data latency",
    before: "Baseline",
    beforeDetail: "Single-region routing",
    after: "60–80% lower",
    afterDetail: "Intelligent regional routing",
  },
  {
    area: "Integration surface",
    before: "Many sockets",
    beforeDetail: "Exchange-specific connections and payloads",
    after: "1 API",
    afterDetail: "Unified normalized interface",
  },
  {
    area: "Exchange coverage",
    before: "Per venue",
    beforeDetail: "Custom integration behavior",
    after: "100+",
    afterDetail: "Normalized exchange interfaces through CCXT",
  },
  {
    area: "Deployment topology",
    before: "1 region",
    beforeDetail: "Centralized exchange connectivity",
    after: "5 clusters",
    afterDetail: "Virginia · Frankfurt · Tokyo · Singapore · São Paulo",
  },
];

function ComparisonCell({ phase, value, detail }) {
  const after = phase === "after";

  return (
    <div className="relative min-w-0 overflow-hidden bg-background px-5 py-5 sm:px-6">
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 ${after ? "bg-primary" : "bg-destructive"}`}
      />
      {!after && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 bg-size-[10px_10px] bg-[repeating-linear-gradient(315deg,var(--destructive)_0,var(--destructive)_1px,transparent_0,transparent_50%)]"
        />
      )}
      <div className="relative z-10">
        <p className={`font-pixel text-xl tracking-tight sm:text-2xl ${after ? "text-foreground" : "text-muted-foreground"}`}>
          {value}
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

export default function MarketDataImpact({ takeaway }) {
  return (
    <section id="impact" className="mt-12 scroll-mt-28 border border-border">
      <header className="grid gap-px bg-border sm:grid-cols-2">
        <div className="bg-foreground px-6 py-8 text-background sm:px-8">
          <h2 className="font-pixel text-xl uppercase tracking-tight sm:text-2xl">Measured impact</h2>
        </div>
        <div aria-hidden="true" className="min-h-20 bg-background bg-size-[10px_10px] bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />
      </header>

      <div className="bg-background px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-pixel text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">Before / After</p>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What changed across the system
            </h3>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-pixel text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground" aria-label="Comparison legend">
            <span className="flex items-center gap-2"><span className="size-2 bg-destructive" />Before</span>
            <span className="flex items-center gap-2"><span className="size-2 bg-primary" />After</span>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-[11rem_minmax(0,1fr)_2.75rem_minmax(0,1fr)] gap-px border-t border-border bg-border px-0 lg:grid">
        <div className="bg-muted/30 px-5 py-3 font-pixel text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">Area</div>
        <div className="bg-muted/30 px-6 py-3 font-pixel text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">Before</div>
        <div className="bg-muted/30" />
        <div className="bg-muted/30 px-6 py-3 font-pixel text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">After</div>
      </div>

      <div className="grid gap-px bg-border">
        {IMPACT_ROWS.map((row, index) => (
          <div key={row.area} className="grid gap-px bg-border lg:grid-cols-[11rem_minmax(0,1fr)_2.75rem_minmax(0,1fr)]">
            <div className="flex bg-muted/30 px-5 py-4 lg:items-center">
              <div>
                <p className="font-pixel text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                <h4 className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-foreground">{row.area}</h4>
              </div>
            </div>
            <ComparisonCell phase="before" value={row.before} detail={row.beforeDetail} />
            <div aria-hidden="true" className="hidden items-center justify-center bg-background font-pixel text-sm text-muted-foreground lg:flex">→</div>
            <ComparisonCell phase="after" value={row.after} detail={row.afterDetail} />
          </div>
        ))}
      </div>

      <p className="border-t border-border bg-background px-6 py-7 text-sm leading-7 text-muted-foreground sm:px-8 sm:text-base sm:leading-8">
        {takeaway}
      </p>
    </section>
  );
}
