"use client";

import { useCallback, useMemo, useState } from "react";
import { Server } from "lucide-react";

import WorldMap from "@/components/ui/world-map";
import { cn } from "@/lib/utils";


function getPlacementClasses(placement, xPercent, label) {
  if (label === "Frankfurt") {
    return "bottom-3 left-1/2 -translate-x-1/2 origin-bottom sm:bottom-auto sm:top-3 sm:origin-top";
  }

  if (placement === "right" || (!placement && xPercent >= 70)) {
    return "right-3 top-1/2 -translate-y-1/2 origin-right";
  }

  if (placement === "left" || (!placement && xPercent <= 30)) {
    return "left-3 top-1/2 -translate-y-1/2 origin-left";
  }

  return "left-1/2 top-3 -translate-x-1/2 origin-top";
}


function RegionMarker({ marker, position }) {

  return (
    <div
      className="pointer-events-none absolute size-0"
      style={{ left: `${position.xPercent}%`, top: `${position.yPercent}%` }}
    >
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-primary shadow-[0_0_14px_var(--primary)]" />
      <div
        className={cn(
          "absolute w-max border border-border bg-background/95 px-1.5 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-2 sm:py-1.5",
          getPlacementClasses(marker.placement, position.xPercent, marker.label),
        )}
      >
        <div className="flex items-center gap-1 sm:gap-1.5">
          <Server aria-hidden="true" className="size-2.5 text-primary sm:size-3" />
          <span className="font-pixel text-[0.45rem] uppercase tracking-[0.1em] text-foreground sm:text-[0.55rem] sm:tracking-[0.12em]">
            {marker.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RegionalServerMap({ markers = [] }) {
  const normalizedMarkers = useMemo(
    () =>
      markers.map((marker) => ({
        ...marker,
        id: marker.id ?? marker.label,
      })),
    [markers],
  );
  const markersById = useMemo(
    () => new Map(normalizedMarkers.map((marker) => [marker.id, marker])),
    [normalizedMarkers],
  );
  const [positions, setPositions] = useState([]);

  const handleMarkerPositions = useCallback(
    (nextPositions) => {
      setPositions(
        nextPositions.filter((position) => markersById.has(position.id)),
      );
    },
    [markersById],
  );

  return (
    <div className="relative aspect-[1.45/1] w-full overflow-hidden sm:aspect-[2.15/1]">
      <WorldMap
        markers={normalizedMarkers}
        onRenderMarkerPositions={handleMarkerPositions}
        className="rounded-none border-0 shadow-none"
        mapClassName="p-0 sm:p-0"
      />
      <div className="pointer-events-none absolute inset-0" aria-label="Regional server locations">
        {positions.map((position) => {
          const marker = markersById.get(position.id);
          if (!marker) return null;

          return <RegionMarker key={position.id} marker={marker} position={position} />;
        })}
      </div>
    </div>
  );
}
