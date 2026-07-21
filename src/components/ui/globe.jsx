"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_MARKER_SIZE = 0.06;
const DEFAULT_CONFIG = Object.freeze({
  autoRotate: true,
  autoRotateSpeed: 0.0032,
  baseColor: [0.09, 0.13, 0.2],
  dark: 1,
  diffuse: 1.1,
  glowColor: [0.25, 0.82, 0.95],
  mapBaseBrightness: 0.04,
  mapBrightness: 1.1,
  mapSamples: 16000,
  markerColor: [0.53, 0.94, 0.98],
  markerElevation: 0.04,
  offset: [0, 0],
  phi: 0.4,
  projectionScale: 0.92,
  scale: 1,
  theta: 0.22,
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeColor(color, fallback) {
  if (
    Array.isArray(color) &&
    color.length === 3 &&
    color.every((channel) => isFiniteNumber(channel) && channel >= 0 && channel <= 1)
  ) {
    return color;
  }

  return fallback;
}

function normalizeMarkers(markers, fallbackColor, fallbackSize, idBase) {
  return markers
    .filter((marker) => marker && isFiniteNumber(marker.lat) && isFiniteNumber(marker.lng))
    .map((marker, index) => ({
      ...marker,
      color: normalizeColor(marker.color, fallbackColor),
      id: marker.id ?? `${idBase}-${index}`,
      lat: clamp(marker.lat, -90, 90),
      lng: clamp(marker.lng, -180, 180),
      size: isFiniteNumber(marker.size) ? marker.size : fallbackSize,
    }));
}

function buildGlobeOptions(size, config, markers, devicePixelRatio) {
  return {
    baseColor: normalizeColor(config.baseColor, DEFAULT_CONFIG.baseColor),
    dark: isFiniteNumber(config.dark) ? config.dark : DEFAULT_CONFIG.dark,
    devicePixelRatio,
    diffuse: isFiniteNumber(config.diffuse) ? config.diffuse : DEFAULT_CONFIG.diffuse,
    glowColor: normalizeColor(config.glowColor, DEFAULT_CONFIG.glowColor),
    height: Math.round(size.height * devicePixelRatio),
    mapBaseBrightness: isFiniteNumber(config.mapBaseBrightness)
      ? config.mapBaseBrightness
      : DEFAULT_CONFIG.mapBaseBrightness,
    mapBrightness: isFiniteNumber(config.mapBrightness) ? config.mapBrightness : DEFAULT_CONFIG.mapBrightness,
    mapSamples: isFiniteNumber(config.mapSamples) ? config.mapSamples : DEFAULT_CONFIG.mapSamples,
    markerColor: normalizeColor(config.markerColor, DEFAULT_CONFIG.markerColor),
    markerElevation: isFiniteNumber(config.markerElevation)
      ? config.markerElevation
      : DEFAULT_CONFIG.markerElevation,
    markers: markers.map((marker) => ({
      color: marker.color,
      id: marker.id,
      location: [marker.lat, marker.lng],
      size: marker.size,
    })),
    offset:
      Array.isArray(config.offset) &&
      config.offset.length === 2 &&
      config.offset.every((value) => isFiniteNumber(value))
        ? config.offset
        : DEFAULT_CONFIG.offset,
    phi: isFiniteNumber(config.phi) ? config.phi : DEFAULT_CONFIG.phi,
    scale: isFiniteNumber(config.scale) ? config.scale : DEFAULT_CONFIG.scale,
    theta: isFiniteNumber(config.theta) ? config.theta : DEFAULT_CONFIG.theta,
    width: Math.round(size.width * devicePixelRatio),
  };
}

function projectMarker(marker, size, config, phi, theta) {
  const lat = (marker.lat * Math.PI) / 180;
  const lng = (marker.lng * Math.PI) / 180;

  const x = Math.cos(lat) * Math.sin(lng);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lng);

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const xAfterPhi = x * cosPhi + z * sinPhi;
  const zAfterPhi = z * cosPhi - x * sinPhi;
  const yAfterTheta = y * cosTheta - zAfterPhi * sinTheta;
  const zAfterTheta = y * sinTheta + zAfterPhi * cosTheta;

  const [offsetX = 0, offsetY = 0] = Array.isArray(config.offset) ? config.offset : DEFAULT_CONFIG.offset;
  const scale = isFiniteNumber(config.scale) ? config.scale : DEFAULT_CONFIG.scale;
  const projectionScale = isFiniteNumber(config.projectionScale)
    ? config.projectionScale
    : DEFAULT_CONFIG.projectionScale;
  const elevation = 1 + (isFiniteNumber(config.markerElevation) ? config.markerElevation : DEFAULT_CONFIG.markerElevation);

  const radius = (Math.min(size.width, size.height) * 0.5 * scale * projectionScale) / 1.05;
  const centerX = size.width * (0.5 + offsetX * 0.5);
  const centerY = size.height * (0.5 + offsetY * 0.5);
  const projectedX = centerX + xAfterPhi * radius * elevation;
  const projectedY = centerY - yAfterTheta * radius * elevation;
  const visibility = clamp((zAfterTheta + 0.18) / 1.18, 0, 1);

  return {
    ...marker,
    visible: zAfterTheta > 0,
    visibility,
    x: projectedX,
    xPercent: clamp((projectedX / size.width) * 100, 0, 100),
    y: projectedY,
    yPercent: clamp((projectedY / size.height) * 100, 0, 100),
    z: zAfterTheta,
  };
}

function getDevicePixelRatio() {
  if (typeof window === "undefined") {
    return 1;
  }

  return clamp(window.devicePixelRatio || 1, 1, 2);
}

export function Globe({
  markers = [],
  onRenderMarkerPositions,
  className,
  config = {},
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const configRef = useRef({ ...DEFAULT_CONFIG, ...config });
  const markersRef = useRef([]);
  const callbackRef = useRef(onRenderMarkerPositions);
  const phiRef = useRef(isFiniteNumber(config.phi) ? config.phi : DEFAULT_CONFIG.phi);
  const reduceMotionRef = useRef(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const idBase = useId().replace(/:/g, "");

  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const normalizedMarkers = useMemo(
    () =>
      normalizeMarkers(
        markers,
        normalizeColor(mergedConfig.markerColor, DEFAULT_CONFIG.markerColor),
        isFiniteNumber(mergedConfig.defaultMarkerSize)
          ? mergedConfig.defaultMarkerSize
          : DEFAULT_MARKER_SIZE,
        idBase,
      ),
    [markers, mergedConfig.markerColor, mergedConfig.defaultMarkerSize, idBase],
  );

  configRef.current = mergedConfig;
  markersRef.current = normalizedMarkers;
  callbackRef.current = onRenderMarkerPositions;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (!isFiniteNumber(config.phi)) {
      return;
    }

    phiRef.current = config.phi;
  }, [config.phi]);

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
    if (!size.width || !size.height || !canvasRef.current) {
      return undefined;
    }

    let destroyed = false;
    let globe;

    (async () => {
      const { default: createGlobe } = await import("cobe");
      if (destroyed || !canvasRef.current) {
        return;
      }

      const devicePixelRatio = getDevicePixelRatio();
      const initialOptions = buildGlobeOptions(size, configRef.current, markersRef.current, devicePixelRatio);

      globe = createGlobe(canvasRef.current, {
        ...initialOptions,
        onRender: (state) => {
          const currentConfig = configRef.current;
          const autoRotate = currentConfig.autoRotate ?? DEFAULT_CONFIG.autoRotate;
          const autoRotateSpeed = isFiniteNumber(currentConfig.autoRotateSpeed)
            ? currentConfig.autoRotateSpeed
            : DEFAULT_CONFIG.autoRotateSpeed;
          const theta = isFiniteNumber(currentConfig.theta) ? currentConfig.theta : DEFAULT_CONFIG.theta;

          state.phi = phiRef.current;
          state.theta = theta;

          if (autoRotate && !reduceMotionRef.current) {
            phiRef.current += autoRotateSpeed;
          }

          if (callbackRef.current) {
            callbackRef.current(
              markersRef.current.map((marker) => projectMarker(marker, size, currentConfig, state.phi, state.theta)),
            );
          }
        },
      });

      globeRef.current = globe;
    })();

    return () => {
      destroyed = true;
      globeRef.current = null;
      if (globe) {
        globe.destroy();
      }
    };
  }, [size.height, size.width]);

  useEffect(() => {
    if (!globeRef.current || !size.width || !size.height) {
      return;
    }

    globeRef.current.update(buildGlobeOptions(size, mergedConfig, normalizedMarkers, getDevicePixelRatio()));
  }, [mergedConfig, normalizedMarkers, size.height, size.width]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate aspect-square w-full overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(103,232,249,0.16),transparent_34%),radial-gradient(circle_at_52%_62%,rgba(255,255,255,0.08),transparent_48%),linear-gradient(180deg,rgba(7,10,17,0.98),rgba(3,5,10,0.98))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_90px_rgba(34,211,238,0.12)]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-[-16%] rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[1.5%] rounded-full border border-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-cyan-300/10 blur-[1px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-[18%] rounded-full border border-white/5" aria-hidden="true" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export default Globe;
