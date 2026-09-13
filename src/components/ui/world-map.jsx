"use client";

import { useEffect, useMemo } from "react";

import useIsDarkMode from "@/hooks/useIsDarkMode";
import {
  Map,
  MapControls,
  MapGeoJSON,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";

const MAP_COLORS = {
  light: {
    arc: "#343434",
    landFill: "#252525",
    landFillOpacity: 0.04,
    landLine: "#e5e5e5",
  },
  dark: {
    arc: "#e5e5e5",
    landFill: "#fafafa",
    landFillOpacity: 0.07,
    landLine: "#3d3d3d",
  },
};

function isFiniteCoordinate(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeMarkers(markers = []) {
  return markers
    .filter(
      (marker) =>
        marker?.label &&
        isFiniteCoordinate(marker.lat) &&
        isFiniteCoordinate(marker.lng),
    )
    .map((marker) => ({
      ...marker,
      id: marker.id ?? marker.label,
    }));
}

function MarkerChip({ label, side = "right" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 -translate-y-1/2 border border-border bg-background/95 px-1.5 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm",
        side === "left"
          ? "right-[calc(100%+0.5rem)]"
          : "left-[calc(100%+0.5rem)]",
      )}
    >
      <span className="font-pixel text-[0.45rem] uppercase tracking-[0.16em] text-foreground sm:text-[0.55rem] sm:tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}

function MarkerTooltipContent({ label, meta }) {
  return (
    <div className="space-y-1">
      <p className="font-pixel text-[0.5rem] uppercase tracking-[0.18em] text-foreground">
        {label}
      </p>
      {meta ? <p className="text-xs leading-5 text-muted-foreground">{meta}</p> : null}
    </div>
  );
}

// mapcn's <MapArc> always unwraps spans wider than 180° so the curve bows the
// short way around the globe. That pushes longitudes outside [-180, 180], which
// only renders correctly with world copies enabled — and world copies leave
// stray half-arcs bleeding off both edges of a single-world map like this one.
// Virginia -> Tokyo spans 218°, so build the curve here instead and keep every
// longitude in range: the arc simply takes the long way across the Atlantic.
const ARC_CURVATURE = 0.18;
const ARC_SAMPLES = 64;

function buildArcPath(from, to, curvature = ARC_CURVATURE, samples = ARC_SAMPLES) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) return [from, to];

  // Control point offset perpendicular to the chord; sign is normalized so
  // every spoke bows the same way regardless of travel direction.
  const offset = distance * curvature * (dx < 0 ? -1 : 1);
  const cx = (x0 + x1) / 2 + (-dy / distance) * offset;
  const cy = (y0 + y1) / 2 + (dx / distance) * offset;

  const points = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const inv = 1 - t;
    points.push([
      inv * inv * x0 + 2 * inv * t * cx + t * t * x1,
      inv * inv * y0 + 2 * inv * t * cy + t * t * y1,
    ]);
  }
  return points;
}

// A fixed `zoom` shows a fixed geographic span regardless of container size, so
// a narrow viewport crops the map to whichever region sits under the centre.
// Fit the viewport to the actual content instead, and re-fit whenever MapLibre
// reports a resize so the framing survives breakpoint and orientation changes.
function FitToContent({ points }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded || points.length === 0) return undefined;

    const bounds = points.reduce(
      (acc, [lng, lat]) => [
        [Math.min(acc[0][0], lng), Math.min(acc[0][1], lat)],
        [Math.max(acc[1][0], lng), Math.max(acc[1][1], lat)],
      ],
      [
        [Infinity, Infinity],
        [-Infinity, -Infinity],
      ],
    );

    const fit = () => {
      // Label chips flank their dot on both edges, so reserve matching room on
      // each side, scaled to the container and capped so wide maps don't waste
      // space.
      const width = map.getContainer().clientWidth || 0;
      const horizontal = Math.round(Math.min(72, Math.max(46, width * 0.12)));

      map.fitBounds(bounds, {
        padding: { top: 20, bottom: 20, left: horizontal, right: horizontal },
        duration: 0,
      });
    };

    fit();
    map.on("resize", fit);
    return () => map.off("resize", fit);
  }, [map, isLoaded, points]);

  return null;
}

export default function WorldMap({
  markers = [],
  className,
  interactive = true,
  showArcs = false,
  hubId,
}) {
  // Chips render beside their dot; flip the easternmost ones inward so they
  // never collide with the right edge on narrow containers.
  const normalizedMarkers = useMemo(() => {
    const base = normalizeMarkers(markers);
    if (base.length === 0) return base;

    const lngs = base.map((marker) => marker.lng);
    const min = Math.min(...lngs);
    const max = Math.max(...lngs);
    const flipFrom = max - (max - min) * 0.3;

    return base.map((marker) => ({
      ...marker,
      chipSide: marker.lng >= flipFrom ? "left" : "right",
    }));
  }, [markers]);
  const isDark = useIsDarkMode();
  const palette = isDark ? MAP_COLORS.dark : MAP_COLORS.light;

  const fillPaint = useMemo(
    () => ({
      "fill-color": palette.landFill,
      "fill-opacity": palette.landFillOpacity,
    }),
    [palette.landFill, palette.landFillOpacity],
  );

  const linePaint = useMemo(
    () => ({
      "line-color": palette.landLine,
      "line-width": 0.75,
      "line-opacity": 1,
    }),
    [palette.landLine],
  );

  const { arcs, hubMarkerId } = useMemo(() => {
    if (!showArcs || normalizedMarkers.length < 2) {
      return { arcs: [], hubMarkerId: null };
    }

    // Match on id OR label: callers may supply synthetic ids, and the hub is
    // most naturally addressed by its human label. Never fall back to a
    // positional guess — a silent wrong hub is worse than no arcs at all.
    const hub = normalizedMarkers.find(
      (marker) => marker.id === hubId || marker.label === hubId,
    );
    if (!hub) return { arcs: [], hubMarkerId: null };

    return {
      hubMarkerId: hub.id,
      arcs: normalizedMarkers
        .filter((marker) => marker.id !== hub.id)
        .map((marker) => ({
          id: `${hub.id}-${marker.id}`,
          path: buildArcPath([hub.lng, hub.lat], [marker.lng, marker.lat]),
        })),
    };
  }, [hubId, normalizedMarkers, showArcs]);

  // Include the arc curves, not just the markers: a bowed spoke reaches well
  // beyond its endpoints and would otherwise be clipped.
  const fitPoints = useMemo(
    () => [
      ...normalizedMarkers.map((marker) => [marker.lng, marker.lat]),
      ...arcs.flatMap((arc) => arc.path),
    ],
    [arcs, normalizedMarkers],
  );

  return (
    <div className={cn("h-full w-full", className)}>
      <Map
        blank
        attributionControl={false}
        center={[10, 20]}
        className="h-full w-full bg-transparent"
        dragRotate={false}
        interactive={interactive}
        pitch={0}
        pitchWithRotate={false}
        scrollZoom={false}
        touchPitch={false}
        renderWorldCopies={false}
        zoom={0.65}
      >
        <FitToContent points={fitPoints} />
        <MapGeoJSON
          data="/geo/world-countries.geojson"
          fillPaint={fillPaint}
          linePaint={linePaint}
        />
        {arcs.map((arc) => (
          <MapRoute
            key={arc.id}
            id={arc.id}
            color={palette.arc}
            coordinates={arc.path}
            dashArray={[2, 2]}
            interactive={false}
            opacity={isDark ? 0.6 : 0.45}
            width={1.25}
          />
        ))}
        {normalizedMarkers.map((marker) => (
          <MapMarker
            key={marker.id}
            anchor="center"
            latitude={marker.lat}
            longitude={marker.lng}
          >
            <MarkerContent className="pointer-events-auto">
              <div className="relative size-2">
                <span className="absolute inset-0 bg-primary shadow-[0_0_14px_var(--primary)]" />
                {marker.id === hubMarkerId ? (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 border border-primary/60"
                  />
                ) : null}
                <MarkerChip label={marker.label} side={marker.chipSide} />
              </div>
            </MarkerContent>
            <MarkerTooltip
              className="max-w-56 rounded-none border border-border bg-background/95 px-2.5 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm"
              closeOnClick={false}
              offset={14}
            >
              <MarkerTooltipContent label={marker.label} meta={marker.meta} />
            </MarkerTooltip>
          </MapMarker>
        ))}
        {interactive ? <MapControls position="bottom-right" showZoom /> : null}
      </Map>
    </div>
  );
}
