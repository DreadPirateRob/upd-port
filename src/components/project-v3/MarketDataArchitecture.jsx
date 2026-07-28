"use client";

import ArchitectureFlow from "@/components/project-v3/ArchitectureFlow";
import RegionalServerMap from "@/components/project-v3/RegionalServerMap";

function DiagramPanel({ index, title, description, children, flush = false }) {
  return (
    <div className="bg-background">
      <div className="grid gap-px border-b border-border bg-border sm:grid-cols-[9rem_minmax(0,1fr)]">
        <div className="bg-muted/40 px-6 py-5 font-pixel text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {index}
        </div>
        <div className="bg-background px-6 py-5 sm:px-8">
          <h3 className="font-pixel text-lg uppercase tracking-tight text-foreground">{title}</h3>
          <p className="mt-2 max-w-3xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{description}</p>
        </div>
      </div>
      <div className={flush ? "overflow-hidden" : "overflow-hidden px-4 py-6 sm:px-6 sm:py-8"}>
        {children}
      </div>
    </div>
  );
}

export default function MarketDataArchitecture({
  beforeDescription,
  afterDescription,
  regionDescription,
  regionMarkers,
}) {
  return (
    <section id="architecture" className="mt-12 scroll-mt-28 border border-border">
      <header className="grid gap-px bg-border sm:grid-cols-2">
        <div className="bg-foreground px-6 py-8 text-background sm:px-8">
          <h2 className="font-pixel text-xl uppercase tracking-tight sm:text-2xl">System architecture</h2>
        </div>
        <div aria-hidden="true" className="min-h-20 bg-background bg-size-[10px_10px] bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />
      </header>

      <div className="grid gap-px bg-border">
        <DiagramPanel
          index="01 / Before"
          title="Single-region bottleneck"
          description={beforeDescription}
          flush
        >
          <ArchitectureFlow mode="before" />
        </DiagramPanel>
        <DiagramPanel
          index="02 / After"
          title="Regional edge delivery"
          description={afterDescription}
          flush
        >
          <ArchitectureFlow mode="after" />
        </DiagramPanel>
        <DiagramPanel
          index="03 / Regions"
          title="Regional server footprint"
          description={regionDescription}
          flush
        >
          <RegionalServerMap markers={regionMarkers} />
        </DiagramPanel>
      </div>
    </section>
  );
}
