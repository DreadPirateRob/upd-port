"use client";

import { motion, useReducedMotion } from "motion/react";
import RegionalServerMap from "@/components/project-v3/RegionalServerMap";

const BEFORE_EXCHANGES = [
  { label: "Frankfurt", x: 722, y: 38 },
  { label: "Singapore", x: 722, y: 128 },
  { label: "Tokyo", x: 722, y: 218 },
];

const AFTER_EDGES = [
  { label: "Virginia", x: 564, y: 28 },
  { label: "Frankfurt", x: 564, y: 108 },
  { label: "Tokyo / Singapore", x: 564, y: 188 },
];

function DiagramNode({ x, y, width = 174, height = 58, label, detail, accent = false }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="var(--background)"
        stroke={accent ? "var(--primary)" : "var(--border)"}
      />
      {accent && <rect x={x} y={y} width="3" height={height} fill="var(--primary)" />}
      <text
        x={x + 16}
        y={y + (detail ? 24 : 34)}
        className="fill-foreground font-pixel text-[12px] uppercase"
      >
        {label}
      </text>
      {detail && (
        <text x={x + 16} y={y + 43} className="fill-muted-foreground text-[10px]">
          {detail}
        </text>
      )}
    </g>
  );
}

function AnimatedPath({ d, tone = "primary", dashed = false, delay = 0, markerEnd }) {
  const reduceMotion = useReducedMotion();
  const color = tone === "destructive" ? "var(--destructive)" : "var(--primary)";

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray={dashed ? "6 6" : undefined}
      markerEnd={markerEnd}
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
    />
  );
}

function ArrowMarkers({ prefix }) {
  return (
    <defs>
      <marker id={`${prefix}-primary`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
      </marker>
      <marker id={`${prefix}-destructive`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--destructive)" />
      </marker>
    </defs>
  );
}

function BeforeDesktop() {
  return (
    <svg viewBox="0 0 920 310" role="img" aria-labelledby="before-desktop-title before-desktop-desc" className="hidden h-auto w-full lg:block">
      <title id="before-desktop-title">Before: single-region market data architecture</title>
      <desc id="before-desktop-desc">Clients connect to one US-East monolith, which maintains long-distance connections to exchanges in Frankfurt, Singapore, and Tokyo.</desc>
      <ArrowMarkers prefix="before-desktop" />

      <DiagramNode x={24} y={126} width={150} label="Clients" detail="Global consumers" />
      <DiagramNode x={290} y={112} width={190} height={86} label="US-East monolith" detail="Routing · sockets · normalization" />
      {BEFORE_EXCHANGES.map((exchange) => (
        <DiagramNode key={exchange.label} {...exchange} label={exchange.label} detail="Exchange cluster" />
      ))}

      <AnimatedPath d="M174 155 H290" tone="destructive" dashed markerEnd="url(#before-desktop-destructive)" />
      {BEFORE_EXCHANGES.map((exchange, index) => (
        <AnimatedPath
          key={exchange.label}
          d={`M480 155 C570 155 620 ${exchange.y + 29} 722 ${exchange.y + 29}`}
          tone="destructive"
          dashed
          delay={0.12 + index * 0.1}
          markerEnd="url(#before-desktop-destructive)"
        />
      ))}

      <text x="526" y="286" className="fill-destructive font-pixel text-[11px] uppercase tracking-[0.14em]">
        150–300ms+ cross-region RTT
      </text>
    </svg>
  );
}

function AfterDesktop() {
  return (
    <svg viewBox="0 0 920 310" role="img" aria-labelledby="after-desktop-title after-desktop-desc" className="hidden h-auto w-full lg:block">
      <title id="after-desktop-title">After: geo-distributed market data architecture</title>
      <desc id="after-desktop-desc">Clients use one unified API that routes market data through regional edge nodes positioned near exchange clusters.</desc>
      <ArrowMarkers prefix="after-desktop" />

      <DiagramNode x={18} y={126} width={132} label="Clients" detail="One interface" />
      <DiagramNode x={218} y={112} width={176} height={86} label="Unified API" detail="Routing · delivery" accent />
      {AFTER_EDGES.map((edge) => (
        <DiagramNode key={edge.label} {...edge} width={174} label={edge.label} detail="Regional edge" accent />
      ))}
      <DiagramNode x={794} y={28} width={108} label="US" detail="Exchanges" />
      <DiagramNode x={794} y={108} width={108} label="EU" detail="Exchanges" />
      <DiagramNode x={794} y={188} width={108} label="APAC" detail="Exchanges" />

      <AnimatedPath d="M150 155 H218" markerEnd="url(#after-desktop-primary)" />
      {AFTER_EDGES.map((edge, index) => (
        <g key={edge.label}>
          <AnimatedPath
            d={`M394 155 C460 155 494 ${edge.y + 29} 564 ${edge.y + 29}`}
            delay={0.12 + index * 0.1}
            markerEnd="url(#after-desktop-primary)"
          />
          <AnimatedPath
            d={`M738 ${edge.y + 29} H794`}
            delay={0.32 + index * 0.1}
            markerEnd="url(#after-desktop-primary)"
          />
        </g>
      ))}

      <text x="566" y="286" className="fill-primary font-pixel text-[11px] uppercase tracking-[0.14em]">
        2–8ms regional edge RTT
      </text>
    </svg>
  );
}

function MobileFlow({ mode }) {
  const after = mode === "after";
  const prefix = `${mode}-mobile`;
  const nodes = after
    ? [
        { label: "Clients", detail: "One interface" },
        { label: "Unified API", detail: "Routing · delivery", accent: true },
        { label: "Nearest regional edge", detail: "Virginia · Frankfurt · APAC", accent: true },
        { label: "Nearby exchange", detail: "Regional connection" },
      ]
    : [
        { label: "Clients", detail: "Global consumers" },
        { label: "US-East monolith", detail: "Routing · sockets · normalization" },
        { label: "Distant exchanges", detail: "Frankfurt · Singapore · Tokyo" },
      ];
  const nodeHeight = 64;
  const startY = 24;
  const step = 110;

  return (
    <svg viewBox={`0 0 360 ${startY + nodes.length * step}`} role="img" aria-labelledby={`${prefix}-title ${prefix}-desc`} className="h-auto w-full lg:hidden">
      <title id={`${prefix}-title`}>{after ? "After: regional edge routing" : "Before: single-region routing"}</title>
      <desc id={`${prefix}-desc`}>{after ? "A unified API routes clients through the nearest regional edge to nearby exchanges." : "Clients route through one US-East monolith before reaching distant exchanges."}</desc>
      <ArrowMarkers prefix={prefix} />

      {nodes.map((node, index) => {
        const y = startY + index * step;
        return (
          <g key={node.label}>
            <DiagramNode x={50} y={y} width={260} height={nodeHeight} {...node} />
            {index < nodes.length - 1 && (
              <AnimatedPath
                d={`M180 ${y + nodeHeight} V${y + step}`}
                tone={after ? "primary" : "destructive"}
                dashed={!after}
                delay={index * 0.12}
                markerEnd={`url(#${prefix}-${after ? "primary" : "destructive"})`}
              />
            )}
          </g>
        );
      })}

      <text x="180" y={startY + nodes.length * step - 18} textAnchor="middle" className={`${after ? "fill-primary" : "fill-destructive"} font-pixel text-[10px] uppercase tracking-[0.12em]`}>
        {after ? "2–8ms regional edge RTT" : "150–300ms+ cross-region RTT"}
      </text>
    </svg>
  );
}

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
        <DiagramPanel index="01 / Before" title="Single-region bottleneck" description={beforeDescription}>
          <BeforeDesktop />
          <MobileFlow mode="before" />
        </DiagramPanel>
        <DiagramPanel index="02 / After" title="Regional edge delivery" description={afterDescription}>
          <AfterDesktop />
          <MobileFlow mode="after" />
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
