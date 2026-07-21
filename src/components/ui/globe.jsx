"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

import { cn } from "@/lib/utils";

const DEFAULT_MARKER_SIZE = 0.4;
const DEFAULT_CONFIG = Object.freeze({
  autoRotate: true,
  autoRotateSpeed: 0.35,
  globeColor: "#040404",
  strokeColor: "rgba(255,255,255,0.32)",
  gridColor: "rgba(255,255,255,0.12)",
  dotColor: "rgba(255,255,255,0.42)",
  markerGlow: "rgba(255,255,255,0.8)",
  markerColor: "#ffffff",
  initialPosition: { lat: 20, lng: 110 },
  dotSpacing: 16,
  glowStrength: 0.16,
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeMarkers(markers, fallbackSize) {
  return markers
    .filter((marker) => marker && isFiniteNumber(marker.lat) && isFiniteNumber(marker.lng))
    .map((marker, index) => ({
      ...marker,
      id: marker.id ?? `${marker.label ?? "marker"}-${index}`,
      lat: clamp(marker.lat, -90, 90),
      lng: clamp(marker.lng, -180, 180),
      size: isFiniteNumber(marker.size) ? marker.size : fallbackSize,
    }));
}

function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

function pointInFeature(point, feature) {
  const geometry = feature.geometry;

  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates;
    if (!pointInPolygon(point, coordinates[0])) return false;
    for (let i = 1; i < coordinates.length; i++) {
      if (pointInPolygon(point, coordinates[i])) return false;
    }
    return true;
  }

  if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      if (pointInPolygon(point, polygon[0])) {
        let inHole = false;
        for (let i = 1; i < polygon.length; i++) {
          if (pointInPolygon(point, polygon[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }

  return false;
}

function generateDotsInFeature(feature, dotSpacing = 16) {
  const dots = [];
  const bounds = d3.geoBounds(feature);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const stepSize = dotSpacing * 0.08;

  for (let lng = minLng; lng <= maxLng; lng += stepSize) {
    for (let lat = minLat; lat <= maxLat; lat += stepSize) {
      const point = [lng, lat];
      if (pointInFeature(point, feature)) {
        dots.push(point);
      }
    }
  }

  return dots;
}

function projectMarkers(markers, projection, rotation) {
  const center = [-rotation[0], -rotation[1]];

  return markers.map((marker) => {
    const projected = projection([marker.lng, marker.lat]);
    const distance = d3.geoDistance([marker.lng, marker.lat], center);
    const visible = distance <= Math.PI / 2;
    const visibility = clamp(1 - distance / (Math.PI / 2), 0, 1);

    return {
      ...marker,
      visible,
      visibility,
      x: projected ? projected[0] : 0,
      y: projected ? projected[1] : 0,
      xPercent: projected ? clamp((projected[0] / projection.translate()[0] / 2) * 100, 0, 100) : 50,
      yPercent: projected ? clamp((projected[1] / projection.translate()[1] / 2) * 100, 0, 100) : 50,
      z: visible ? visibility : -visibility,
    };
  });
}

export function Globe({ markers = [], onRenderMarkerPositions, className, config = {}, ...props }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [landFeatures, setLandFeatures] = useState(null);
  const animationRef = useRef(null);
  const rotationRef = useRef([0, 0]);
  const reduceMotionRef = useRef(false);

  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const normalizedMarkers = useMemo(
    () => normalizeMarkers(markers, DEFAULT_MARKER_SIZE),
    [markers],
  );

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const element = containerRef.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      setSize((current) => (current.width === width && current.height === height ? current : { width, height }));
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const response = await fetch("/geo/ne_110m_land.json");
      if (!response.ok) return;
      const json = await response.json();
      if (!cancelled) {
        setLandFeatures(json);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!landFeatures || !size.width || !size.height || !canvasRef.current) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const radius = Math.min(size.width, size.height) / 2.25;
    const rotation = [
      -(mergedConfig.initialPosition?.lng ?? DEFAULT_CONFIG.initialPosition.lng),
      -(mergedConfig.initialPosition?.lat ?? DEFAULT_CONFIG.initialPosition.lat),
    ];
    rotationRef.current = rotation;

    const projection = d3.geoOrthographic().scale(radius).translate([size.width / 2, size.height / 2]).clipAngle(90);
    const path = d3.geoPath().projection(projection).context(context);

    const allDots = [];
    landFeatures.features.forEach((feature) => {
      const dots = generateDotsInFeature(feature, mergedConfig.dotSpacing ?? DEFAULT_CONFIG.dotSpacing);
      dots.forEach(([lng, lat]) => allDots.push({ lng, lat }));
    });

    const render = () => {
      context.clearRect(0, 0, size.width, size.height);
      projection.rotate(rotationRef.current);

      // Globe base
      context.beginPath();
      context.arc(size.width / 2, size.height / 2, radius, 0, 2 * Math.PI);
      context.fillStyle = mergedConfig.globeColor;
      context.fill();
      context.strokeStyle = mergedConfig.strokeColor;
      context.lineWidth = 1.5;
      context.stroke();

      // Glow ring
      const ringGradient = context.createRadialGradient(
        size.width / 2,
        size.height / 2,
        radius * 0.7,
        size.width / 2,
        size.height / 2,
        radius * 1.1,
      );
      ringGradient.addColorStop(0, "rgba(255,255,255,0)");
      ringGradient.addColorStop(1, `rgba(255,255,255,${mergedConfig.glowStrength})`);
      context.beginPath();
      context.arc(size.width / 2, size.height / 2, radius * 1.03, 0, 2 * Math.PI);
      context.strokeStyle = ringGradient;
      context.lineWidth = 16;
      context.stroke();

      // Graticule
      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = mergedConfig.gridColor;
      context.lineWidth = 0.8;
      context.globalAlpha = 0.35;
      context.stroke();
      context.globalAlpha = 1;

      // Land outlines
      context.beginPath();
      landFeatures.features.forEach((feature) => path(feature));
      context.strokeStyle = mergedConfig.strokeColor;
      context.lineWidth = 0.8;
      context.globalAlpha = 0.5;
      context.stroke();
      context.globalAlpha = 1;

      // Dots
      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat]);
        if (projected) {
          context.beginPath();
          context.arc(projected[0], projected[1], 1.1, 0, 2 * Math.PI);
          context.fillStyle = mergedConfig.dotColor;
          context.fill();
        }
      });

      // Marker glow dots
      normalizedMarkers.forEach((marker) => {
        const projected = projection([marker.lng, marker.lat]);
        if (projected) {
          context.beginPath();
          context.arc(projected[0], projected[1], 5, 0, 2 * Math.PI);
          context.fillStyle = "rgba(255,255,255,0.14)";
          context.fill();
          context.beginPath();
          context.arc(projected[0], projected[1], 2.5, 0, 2 * Math.PI);
          context.fillStyle = mergedConfig.markerColor;
          context.fill();
        }
      });

      if (onRenderMarkerPositions) {
        onRenderMarkerPositions(projectMarkers(normalizedMarkers, projection, rotationRef.current));
      }
    };

    const animate = () => {
      if ((mergedConfig.autoRotate ?? DEFAULT_CONFIG.autoRotate) && !reduceMotionRef.current) {
        rotationRef.current[0] += mergedConfig.autoRotateSpeed ?? DEFAULT_CONFIG.autoRotateSpeed;
      }
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    render();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [landFeatures, mergedConfig, normalizedMarkers, onRenderMarkerPositions, size.height, size.width]);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden rounded-full", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-full bg-transparent"
        style={{ maxWidth: "100%", height: "100%" }}
      />
    </div>
  );
}

export default Globe;
