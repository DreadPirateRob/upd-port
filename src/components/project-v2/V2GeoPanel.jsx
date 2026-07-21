"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import WorldMap from "@/components/ui/world-map";
import { cn } from "@/lib/utils";

function clampPercent(value, fallback) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.max(0, Math.min(100, value));
}

function getMarkerPlacement(placement, x) {
  if (placement === "right") {
    return {
      alignClassName: "items-end text-right",
      labelClassName: "origin-right -translate-x-[calc(100%+0.9rem)] -translate-y-1/2",
    };
  }

  if (placement === "left") {
    return {
      alignClassName: "items-start text-left",
      labelClassName: "origin-left translate-x-4 -translate-y-1/2",
    };
  }

  if (placement === "center") {
    return {
      alignClassName: "items-center text-center",
      labelClassName: "origin-center -translate-x-1/2 translate-y-4",
    };
  }

  if (x >= 70) {
    return {
      alignClassName: "items-end text-right",
      labelClassName: "origin-right -translate-x-[calc(100%+0.9rem)] -translate-y-1/2",
    };
  }

  if (x <= 30) {
    return {
      alignClassName: "items-start text-left",
      labelClassName: "origin-left translate-x-4 -translate-y-1/2",
    };
  }

  return {
    alignClassName: "items-center text-center",
    labelClassName: "origin-center -translate-x-1/2 translate-y-4",
  };
}

function getMarkerKey(marker, index = 0) {
  return marker?.id ?? `${marker?.label ?? "marker"}-${index}`;
}

function getGeoMarkers(markers = []) {
  return markers
    .filter(
      (marker) =>
        marker?.label &&
        typeof marker?.lat === "number" &&
        !Number.isNaN(marker.lat) &&
        typeof marker?.lng === "number" &&
        !Number.isNaN(marker.lng),
    )
    .map((marker, index) => ({ ...marker, id: getMarkerKey(marker, index) }));
}

function GeoMarker({ label, meta, placement, xPercent, yPercent }) {
  const safeX = clampPercent(xPercent, 50);
  const safeY = clampPercent(yPercent, 50);
  const resolvedPlacement = getMarkerPlacement(placement, safeX);

  return (
    <div
      className={cn(
        "pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2",
        resolvedPlacement.alignClassName,
      )}
      style={{ left: `${safeX}%`, top: `${safeY}%` }}
    >
      <div className="relative flex h-3 w-3 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/15 blur-[5px]" />
        <span className="relative h-2 w-2 rounded-full border border-white/80 bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
      </div>
      <div
        className={cn(
          "absolute top-1/2 flex min-w-[9.5rem] max-w-[12rem] flex-col rounded-2xl border border-white/12 bg-zinc-950/90 px-3 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-sm",
          resolvedPlacement.labelClassName,
        )}
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-100">
          {label}
        </span>
        {meta ? <span className="mt-1 text-xs leading-5 text-zinc-400">{meta}</span> : null}
      </div>
    </div>
  );
}

function GlobeFallbackLegend({ markers }) {
  if (!markers.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-100">
            {marker.label}
          </span>
          {marker.meta ? <p className="mt-1 text-sm leading-6 text-zinc-400">{marker.meta}</p> : null}
        </div>
      ))}
    </div>
  );
}

function MapVisual({ globe }) {
  const markers = useMemo(() => getGeoMarkers(globe?.markers), [globe?.markers]);
  const markersById = useMemo(() => new Map(markers.map((marker) => [marker.id, marker])), [markers]);
  const [projectedMarkers, setProjectedMarkers] = useState([]);
  const [showFallbackLegend, setShowFallbackLegend] = useState(false);
  const projectedMarkerMap = useMemo(
    () => new Map(projectedMarkers.map((marker) => [marker.id, marker])),
    [projectedMarkers],
  );

  const handleRenderMarkerPositions = useCallback(
    (positions = []) => {
      setProjectedMarkers(
        positions
          .filter((position) => position && (position.id ?? position.label))
          .map((position) => {
            const id = position.id ?? position.label;
            const marker = markersById.get(id);
            if (!marker) return null;
            return { ...marker, ...position, id };
          })
          .filter(Boolean),
      );
    },
    [markersById],
  );

  useEffect(() => {
    if (projectedMarkers.length || !markers.length) {
      setShowFallbackLegend(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowFallbackLegend(true);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [projectedMarkers.length, markers.length]);

  return (
    <div className="space-y-6">
      <div className="relative mx-auto aspect-[2.15/1] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/92 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <WorldMap className="h-full w-full" markers={markers} onRenderMarkerPositions={handleRenderMarkerPositions} />
        {projectedMarkers.length ? (
          <div className="pointer-events-none absolute inset-0">
            {markers.map((marker) => {
              const projectedMarker = projectedMarkerMap.get(marker.id);
              if (!projectedMarker) return null;
              return (
                <GeoMarker
                  key={marker.id}
                  {...projectedMarker}
                  placement={marker.placement ?? projectedMarker.placement}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      {globe?.caption ? (
        <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-zinc-400">
          {globe.caption}
        </p>
      ) : null}
      {showFallbackLegend ? <GlobeFallbackLegend markers={markers} /> : null}
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
          <div className="space-y-5 max-w-4xl">
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
                <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
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
                <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
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
                <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50">
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
