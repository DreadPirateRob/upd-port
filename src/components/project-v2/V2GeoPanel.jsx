"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Globe from "@/components/ui/globe";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG = {
  autoRotateSpeed: 0.0034,
  dark: 1,
  diffuse: 1.05,
  glowColor: [0.16, 0.74, 0.9],
  mapBaseBrightness: 0.08,
  mapBrightness: 0.9,
  markerColor: [0.48, 0.94, 1],
  markerElevation: 0.14,
  projectionScale: 1,
};

function clampPercent(value, fallback) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return fallback;
  }

  return Math.max(0, Math.min(100, value));
}

function getMaxValue(bars) {
  const values = bars
    .map((bar) => (typeof bar?.value === "number" && !Number.isNaN(bar.value) ? bar.value : 0))
    .filter((value) => value > 0);

  return values.length ? Math.max(...values) : 1;
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

function getMarkerKey(marker) {
  return marker?.id ?? marker?.label;
}

function GeoMarker({ label, meta, placement, xPercent, yPercent, visible = true, visibility = 1 }) {
  const safeX = clampPercent(xPercent, 50);
  const safeY = clampPercent(yPercent, 50);
  const resolvedPlacement = getMarkerPlacement(placement, safeX);
  const markerOpacity = visible === false ? Math.max(visibility, 0.12) : Math.max(visibility, 0.28);

  return (
    <div
      className={cn(
        "pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 transition-opacity duration-150 ease-linear",
        resolvedPlacement.alignClassName,
      )}
      style={{ left: `${safeX}%`, top: `${safeY}%`, opacity: markerOpacity, zIndex: visible ? 2 : 1 }}
    >
      <div className="relative flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-cyan-400/35 blur-[6px]" />
        <span className="relative h-2.5 w-2.5 rounded-full border border-cyan-100/80 bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.7)]" />
      </div>
      <div
        className={cn(
          "absolute top-1/2 flex min-w-[10rem] max-w-[13rem] flex-col rounded-2xl border border-white/12 bg-zinc-950/88 px-3 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-sm",
          resolvedPlacement.labelClassName,
        )}
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-100">{label}</span>
        {meta ? <span className="mt-1 text-xs leading-5 text-zinc-400">{meta}</span> : null}
      </div>
    </div>
  );
}

function GlobeFallbackLegend({ markers }) {
  if (!markers.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-zinc-100">{marker.label}</span>
          {marker.meta ? <p className="mt-1 text-sm leading-6 text-zinc-400">{marker.meta}</p> : null}
        </div>
      ))}
    </div>
  );
}

function GlobeVisual({ globe }) {
  const markers = useMemo(
    () =>
      globe?.markers
        ?.filter(
          (marker) =>
            marker?.label &&
            typeof marker?.lat === "number" &&
            !Number.isNaN(marker.lat) &&
            typeof marker?.lng === "number" &&
            !Number.isNaN(marker.lng),
        )
        .map((marker) => ({ ...marker, id: getMarkerKey(marker) })) ?? [],
    [globe?.markers],
  );
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

            return { ...marker, ...position, id };
          }),
      );
    },
    [markersById],
  );
  const hasProjectedMarkers = projectedMarkers.length > 0;

  useEffect(() => {
    if (hasProjectedMarkers || !markers.length) {
      setShowFallbackLegend(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowFallbackLegend(true);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasProjectedMarkers, markers.length]);

  return (
    <div className="space-y-5">
      <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
        <Globe className="h-full w-full" markers={markers} config={GLOBE_CONFIG} onRenderMarkerPositions={handleRenderMarkerPositions} />
        {hasProjectedMarkers ? (
          <div className="pointer-events-none absolute inset-0">
            {markers.map((marker) => {
              const projectedMarker = projectedMarkerMap.get(marker.id);

              if (!projectedMarker) {
                return null;
              }

              return <GeoMarker key={marker.id} {...projectedMarker} placement={marker.placement ?? projectedMarker.placement} />;
            })}
          </div>
        ) : null}
      </div>

      {globe?.caption ? <p className="mx-auto max-w-xl text-center text-sm leading-7 text-zinc-400">{globe.caption}</p> : null}
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
  const maxValue = getMaxValue(safeBars);

  return (
    <section className={cn("px-4 py-14 sm:px-6 sm:py-18", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/85 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="grid gap-12 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,1.05fr)] lg:px-10 lg:py-12 xl:px-12 xl:py-14">
            <div className="space-y-8">
              <div className="space-y-5">
                {eyebrow ? (
                  <Badge
                    variant="outline"
                    className="border-white/15 bg-white/[0.03] px-3 py-1 text-[0.68rem] tracking-[0.26em] text-zinc-300"
                  >
                    {eyebrow}
                  </Badge>
                ) : null}
                {title ? (
                  <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                    {title}
                  </h2>
                ) : null}
                {intro ? <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{intro}</p> : null}
              </div>

              {safeBars.length ? (
                <ul className="space-y-4" aria-label="Regional venue clustering">
                  {safeBars.map((bar) => {
                    const numericValue = typeof bar.value === "number" && !Number.isNaN(bar.value) ? bar.value : 0;
                    const fill = `${Math.max((numericValue / maxValue) * 100, numericValue > 0 ? 18 : 0)}%`;

                    return (
                      <li key={`${bar.label}-${bar.detail ?? ""}`} className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:px-5">
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-100">{bar.label}</p>
                            {bar.detail ? <p className="mt-1 text-sm leading-6 text-zinc-400">{bar.detail}</p> : null}
                          </div>
                          <div className="text-right text-2xl font-semibold tracking-tight text-zinc-50">{numericValue}</div>
                        </div>
                        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/6">
                          <div
                            className="h-full rounded-full border border-cyan-200/20 bg-[linear-gradient(90deg,rgba(103,232,249,0.92),rgba(34,197,94,0.72))] shadow-[0_0_24px_rgba(103,232,249,0.25)]"
                            style={{ width: fill }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {note ? (
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm leading-7 text-zinc-400 sm:px-5">
                  {note}
                </div>
              ) : null}
            </div>

            <GlobeVisual globe={globe} />
          </div>
        </div>
      </div>
    </section>
  );
}
