"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";

import { cn } from "@/lib/utils";

const SUPPORTED_PROJECTIONS = new Set([
  "mercator",
  "equirectangular",
  "robinson",
  "equalEarth",
  "mollweide",
  "miller",
  "sinusoidal",
  "orthographic",
  "gallPeters",
  "vanDerGrinten",
]);

const DEFAULT_PROJECTION = Object.freeze({ name: "robinson" });
const DEFAULT_MAP_HEIGHT = 72;
const DEFAULT_MAP_GRID = "diagonal";
const DEFAULT_MAP_DOT_COLOR = "#27272a";
const DEFAULT_MAP_BACKGROUND = "#05070b";
const DEFAULT_MAP_DOT_RADIUS = 0.48;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeProjection(projection) {
  if (!projection || !SUPPORTED_PROJECTIONS.has(projection.name)) {
    return DEFAULT_PROJECTION;
  }

  const center =
    projection.center && isFiniteNumber(projection.center.lat) && isFiniteNumber(projection.center.lng)
      ? {
          lat: clamp(projection.center.lat, -90, 90),
          lng: clamp(projection.center.lng, -180, 180),
        }
      : undefined;

  return center ? { name: projection.name, center } : { name: projection.name };
}

function normalizeMarkers(markers, idBase) {
  return markers
    .filter((marker) => marker && isFiniteNumber(marker.lat) && isFiniteNumber(marker.lng))
    .map((marker, index) => ({
      ...marker,
      id: marker.id ?? `${idBase}-${index}`,
      label: marker.label ?? marker.id ?? `Marker ${index + 1}`,
      lat: clamp(marker.lat, -90, 90),
      lng: clamp(marker.lng, -180, 180),
    }));
}

function getRenderedMapRect(containerWidth, containerHeight, mapWidth, mapHeight) {
  if (!containerWidth || !containerHeight || !mapWidth || !mapHeight) {
    return null;
  }

  const mapAspect = mapWidth / mapHeight;
  const containerAspect = containerWidth / containerHeight;

  if (containerAspect > mapAspect) {
    const height = containerHeight;
    const width = height * mapAspect;

    return {
      width,
      height,
      offsetX: (containerWidth - width) / 2,
      offsetY: 0,
    };
  }

  const width = containerWidth;
  const height = width / mapAspect;

  return {
    width,
    height,
    offsetX: 0,
    offsetY: (containerHeight - height) / 2,
  };
}

export default function WorldMap({
  markers = [],
  className,
  mapClassName,
  onRenderMarkerPositions,
  projection = DEFAULT_PROJECTION,
}) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const idBase = useId().replace(/:/g, "");

  const normalizedProjection = useMemo(() => normalizeProjection(projection), [projection]);
  const normalizedMarkers = useMemo(() => normalizeMarkers(markers, idBase), [markers, idBase]);
  const { image, projectedMarkers, svgMarkup } = useMemo(() => {
    const map = new DottedMap({
      height: DEFAULT_MAP_HEIGHT,
      grid: DEFAULT_MAP_GRID,
      projection: normalizedProjection,
    });

    const nextProjectedMarkers = normalizedMarkers
      .map((marker) => {
        const point = map.getPin({
          lat: marker.lat,
          lng: marker.lng,
        });

        if (!point) {
          return null;
        }

        return {
          id: marker.id,
          label: marker.label,
          x: point.x,
          y: point.y,
        };
      })
      .filter(Boolean);

    return {
      image: map.image,
      projectedMarkers: nextProjectedMarkers,
      svgMarkup: map.getSVG({
        shape: "circle",
        backgroundColor: DEFAULT_MAP_BACKGROUND,
        color: DEFAULT_MAP_DOT_COLOR,
        radius: DEFAULT_MAP_DOT_RADIUS,
      }),
    };
  }, [normalizedMarkers, normalizedProjection]);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const element = containerRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width;
      const nextHeight = entry.contentRect.height;

      setSize((current) => {
        if (current.width === nextWidth && current.height === nextHeight) {
          return current;
        }

        return { width: nextWidth, height: nextHeight };
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof onRenderMarkerPositions !== "function") {
      return;
    }

    if (!projectedMarkers.length) {
      onRenderMarkerPositions([]);
      return;
    }

    const renderedMapRect = getRenderedMapRect(size.width, size.height, image?.width, image?.height);
    if (!renderedMapRect) {
      return;
    }

    onRenderMarkerPositions(
      projectedMarkers.map((marker) => ({
        id: marker.id,
        label: marker.label,
        xPercent: clamp(
          ((renderedMapRect.offsetX + (marker.x / image.width) * renderedMapRect.width) / size.width) * 100,
          0,
          100,
        ),
        yPercent: clamp(
          ((renderedMapRect.offsetY + (marker.y / image.height) * renderedMapRect.height) / size.height) * 100,
          0,
          100,
        ),
        visible: true,
      })),
    );
  }, [image?.height, image?.width, onRenderMarkerPositions, projectedMarkers, size.height, size.width]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate h-full w-full overflow-hidden rounded-[1.75rem] border border-white/8 bg-zinc-950/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_56px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_30%,rgba(3,7,18,0.22)_100%)]" />
      <div className={cn("absolute inset-0 p-[7%] sm:p-[8%]", mapClassName)}>
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-[10%] bottom-[12%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}
