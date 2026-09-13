"use client";

import WorldMap from "@/components/ui/world-map";

// Virginia (US-East) anchors the arcs: the case study establishes it as the
// platform's primary region, so the spokes read as each regional edge
// publishing normalized market data into the unified API layer.
const HUB_ID = "Virginia";

export default function RegionalServerMap({ markers = [] }) {
  return (
    <div
      aria-label="Regional server locations connected to the US-East delivery layer"
      className="aspect-[1.45/1] w-full overflow-hidden sm:aspect-[2.15/1]"
      role="img"
    >
      <WorldMap className="h-full w-full" hubId={HUB_ID} markers={markers} showArcs />
    </div>
  );
}
