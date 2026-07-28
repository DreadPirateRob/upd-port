"use client";

import { memo, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const GRAPH_BY_MODE = {
  before: {
    title: "Single-region bottleneck",
    caption: "150–300ms+ cross-region RTT",
    tone: "destructive",
    dashed: true,
    ariaLabel:
      "Clients connect to one US-East monolith, which maintains long-distance connections to exchanges in Frankfurt, Singapore, and Tokyo.",
    nodes: [
      {
        id: "clients",
        data: { label: "Clients", detail: "Global consumers", accent: false, tone: "destructive" },
      },
      {
        id: "monolith",
        data: {
          label: "US-East monolith",
          detail: "Routing · sockets · normalization",
          accent: false,
          tone: "destructive",
        },
      },
      {
        id: "frankfurt",
        data: { label: "Frankfurt", detail: "Exchange cluster", accent: false, tone: "destructive" },
      },
      {
        id: "singapore",
        data: { label: "Singapore", detail: "Exchange cluster", accent: false, tone: "destructive" },
      },
      {
        id: "tokyo",
        data: { label: "Tokyo", detail: "Exchange cluster", accent: false, tone: "destructive" },
      },
    ],
    edges: [
      { id: "clients-monolith", source: "clients", target: "monolith" },
      { id: "monolith-frankfurt", source: "monolith", target: "frankfurt" },
      { id: "monolith-singapore", source: "monolith", target: "singapore" },
      { id: "monolith-tokyo", source: "monolith", target: "tokyo" },
    ],
  },
  after: {
    title: "Regional edge delivery",
    caption: "2–8ms regional edge RTT",
    tone: "primary",
    dashed: false,
    ariaLabel:
      "Clients use one unified API that routes market data through regional edge nodes positioned near exchange clusters.",
    nodes: [
      {
        id: "clients",
        data: { label: "Clients", detail: "One interface", accent: false, tone: "primary" },
      },
      {
        id: "api",
        data: {
          label: "Unified API",
          detail: "Routing · delivery",
          accent: true,
          tone: "primary",
        },
      },
      {
        id: "virginia",
        data: { label: "Virginia", detail: "Regional edge", accent: true, tone: "primary" },
      },
      {
        id: "frankfurt-edge",
        data: { label: "Frankfurt", detail: "Regional edge", accent: true, tone: "primary" },
      },
      {
        id: "tokyo-singapore",
        data: { label: "Tokyo / Singapore", detail: "Regional edge", accent: true, tone: "primary" },
      },
      {
        id: "us",
        data: { label: "US", detail: "Exchanges", accent: false, tone: "primary" },
      },
      {
        id: "eu",
        data: { label: "EU", detail: "Exchanges", accent: false, tone: "primary" },
      },
      {
        id: "apac",
        data: { label: "APAC", detail: "Exchanges", accent: false, tone: "primary" },
      },
    ],
    edges: [
      { id: "clients-api", source: "clients", target: "api" },
      { id: "api-virginia", source: "api", target: "virginia" },
      { id: "api-frankfurt", source: "api", target: "frankfurt-edge" },
      { id: "api-apac-edge", source: "api", target: "tokyo-singapore" },
      { id: "virginia-us", source: "virginia", target: "us" },
      { id: "frankfurt-eu", source: "frankfurt-edge", target: "eu" },
      { id: "tokyo-singapore-apac", source: "tokyo-singapore", target: "apac" },
    ],
  },
};

const DESKTOP_POSITIONS = {
  before: {
    clients: { x: 24, y: 126 },
    monolith: { x: 270, y: 112 },
    frankfurt: { x: 566, y: 28 },
    singapore: { x: 566, y: 126 },
    tokyo: { x: 566, y: 224 },
  },
  after: {
    clients: { x: 18, y: 126 },
    api: { x: 206, y: 112 },
    virginia: { x: 464, y: 28 },
    "frankfurt-edge": { x: 464, y: 126 },
    "tokyo-singapore": { x: 464, y: 224 },
    us: { x: 730, y: 28 },
    eu: { x: 730, y: 126 },
    apac: { x: 730, y: 224 },
  },
};

const MOBILE_POSITIONS = {
  before: {
    clients: { x: 48, y: 24 },
    monolith: { x: 48, y: 132 },
    frankfurt: { x: 48, y: 266 },
    singapore: { x: 48, y: 374 },
    tokyo: { x: 48, y: 482 },
  },
  after: {
    clients: { x: 48, y: 24 },
    api: { x: 48, y: 132 },
    virginia: { x: 48, y: 266 },
    us: { x: 48, y: 374 },
    "frankfurt-edge": { x: 48, y: 510 },
    eu: { x: 48, y: 618 },
    "tokyo-singapore": { x: 48, y: 754 },
    apac: { x: 48, y: 862 },
  },
};

const NODE_DIMENSIONS = {
  desktop: {
    clients: { width: 150, height: 58 },
    monolith: { width: 198, height: 86 },
    frankfurt: { width: 174, height: 58 },
    singapore: { width: 174, height: 58 },
    tokyo: { width: 174, height: 58 },
    api: { width: 182, height: 86 },
    virginia: { width: 182, height: 58 },
    "frankfurt-edge": { width: 182, height: 58 },
    "tokyo-singapore": { width: 182, height: 58 },
    us: { width: 118, height: 58 },
    eu: { width: 118, height: 58 },
    apac: { width: 118, height: 58 },
  },
  vertical: {
    clients: { width: 240, height: 64 },
    monolith: { width: 240, height: 86 },
    frankfurt: { width: 240, height: 64 },
    singapore: { width: 240, height: 64 },
    tokyo: { width: 240, height: 64 },
    api: { width: 240, height: 86 },
    virginia: { width: 240, height: 64 },
    "frankfurt-edge": { width: 240, height: 64 },
    "tokyo-singapore": { width: 240, height: 64 },
    us: { width: 240, height: 64 },
    eu: { width: 240, height: 64 },
    apac: { width: 240, height: 64 },
  },
};

const HIDDEN_HANDLE_STYLE = { opacity: 0, width: 0, height: 0, minWidth: 0, minHeight: 0, border: 0 };

// In the vertical (small-screen) layout every node sits in one column, so the
// three edges leaving a fan-out parent overlap into a single line and the
// siblings read as a serial chain (Frankfurt -> Singapore -> Tokyo) instead of
// a parallel fan-out. Indent fanned siblings and feed them from the left so the
// shared trunk stays visible as a bus with one branch per sibling.
const VERTICAL_BUS_INDENT = 40;

// A node is "fanned" when its parent has more than one outgoing edge. Derived
// from the edge list so it can never drift from the graph definition.
function getFannedTargets(graph) {
  const outDegree = new Map();
  for (const edge of graph.edges) {
    outDegree.set(edge.source, (outDegree.get(edge.source) ?? 0) + 1);
  }

  const fanned = new Set();
  for (const edge of graph.edges) {
    if (outDegree.get(edge.source) > 1) fanned.add(edge.target);
  }
  return fanned;
}

function getStrokeColor(tone) {
  return tone === "destructive" ? "var(--destructive)" : "var(--primary)";
}

function collectReachable(startId, adjacency) {
  const seen = new Set([startId]);
  const queue = [startId];

  while (queue.length > 0) {
    const current = queue.shift();
    const neighbors = adjacency.get(current) || [];

    neighbors.forEach((neighbor) => {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        queue.push(neighbor);
      }
    });
  }

  return seen;
}

function getSubgraph(graph, activeNodeId) {
  if (!activeNodeId) {
    return { nodes: null, edges: null };
  }

  const outgoing = new Map();
  const incoming = new Map();

  graph.edges.forEach((edge) => {
    outgoing.set(edge.source, [...(outgoing.get(edge.source) || []), edge.target]);
    incoming.set(edge.target, [...(incoming.get(edge.target) || []), edge.source]);
  });

  const nodes = new Set([
    ...collectReachable(activeNodeId, outgoing),
    ...collectReachable(activeNodeId, incoming),
  ]);
  const edges = new Set(
    graph.edges
      .filter((edge) => nodes.has(edge.source) && nodes.has(edge.target))
      .map((edge) => edge.id),
  );

  return { nodes, edges };
}

function buildNodes(graph, mode, orientation, reduceMotion, activeNodeId) {
  const layoutKey = orientation === "horizontal" ? "desktop" : "vertical";
  const positions = orientation === "horizontal" ? DESKTOP_POSITIONS[mode] : MOBILE_POSITIONS[mode];
  const dimensions = NODE_DIMENSIONS[layoutKey];
  const activeSubgraph = getSubgraph(graph, activeNodeId);
  const isVertical = orientation === "vertical";

  const fanned = isVertical ? getFannedTargets(graph) : null;

  return graph.nodes.map((node) => {
    const isActive = !activeSubgraph.nodes || activeSubgraph.nodes.has(node.id);
    const isFocused = activeNodeId === node.id;
    const isFanned = fanned?.has(node.id) ?? false;
    const base = positions[node.id];
    const size = dimensions[node.id];

    // Fanned siblings take their edge from the left so the parent's branches
    // stay distinguishable instead of stacking into one vertical line.
    const targetPosition = isFanned
      ? Position.Left
      : isVertical
        ? Position.Top
        : Position.Left;

    return {
      ...node,
      type: "architecture",
      position: isFanned ? { x: base.x + VERTICAL_BUS_INDENT, y: base.y } : base,
      sourcePosition: isVertical ? Position.Bottom : Position.Right,
      targetPosition,
      draggable: false,
      selectable: false,
      style: isFanned ? { ...size, width: size.width - VERTICAL_BUS_INDENT } : size,
      data: {
        ...node.data,
        orientation,
        targetPosition,
        active: isActive,
        focused: isFocused,
        reduceMotion,
      },
    };
  });
}

function buildEdges(graph, reduceMotion, activeNodeId) {
  const activeSubgraph = getSubgraph(graph, activeNodeId);
  const stroke = getStrokeColor(graph.tone);

  // React Flow's `.animated` class hard-sets `stroke-dasharray: 5`, so an
  // animated edge is always dashed. The "before" flow is dashed by design
  // (degraded cross-region hops); the "after" flow must stay solid to carry
  // the contrast, so it opts out of `animated` and pins dasharray to "none".
  const animated = graph.dashed && !reduceMotion;

  return graph.edges.map((edge) => {
    const isActive = !activeSubgraph.edges || activeSubgraph.edges.has(edge.id);

    return {
      ...edge,
      type: "smoothstep",
      animated,
      selectable: false,
      focusable: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: stroke },
      style: {
        stroke,
        strokeWidth: isActive ? 1.5 : 1.25,
        strokeDasharray: graph.dashed ? "6 6" : "none",
        opacity: isActive ? 1 : 0.16,
        transition: reduceMotion ? "none" : "opacity 160ms ease, stroke-width 160ms ease",
      },
    };
  });
}

const ArchitectureNode = memo(function ArchitectureNode({ data }) {
  const isVertical = data.orientation === "vertical";
  const focusColor = data.tone === "destructive" ? "var(--destructive)" : "var(--primary)";

  return (
    <div
      className={cn(
        "relative cursor-default border bg-background text-left",
        data.accent ? "border-primary" : data.focused ? (data.tone === "destructive" ? "border-destructive" : "border-primary") : "border-border",
      )}
      style={{
        opacity: data.active ? 1 : 0.35,
        boxShadow: data.focused ? `0 0 0 1px ${focusColor}` : "none",
        transition: data.reduceMotion ? "none" : "opacity 160ms ease, box-shadow 160ms ease",
      }}
    >
      <Handle
        type="target"
        position={data.targetPosition ?? (isVertical ? Position.Top : Position.Left)}
        style={HIDDEN_HANDLE_STYLE}
      />
      {data.accent && <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-primary" />}
      <div className="px-4 py-3">
        <p className="font-pixel text-xs uppercase tracking-[0.12em] text-foreground">{data.label}</p>
        <p className="mt-2 text-[10px] leading-4 text-muted-foreground">{data.detail}</p>
      </div>
      <Handle type="source" position={isVertical ? Position.Bottom : Position.Right} style={HIDDEN_HANDLE_STYLE} />
    </div>
  );
});

const NODE_TYPES = { architecture: ArchitectureNode };

export default function ArchitectureFlow({ mode }) {
  const graph = GRAPH_BY_MODE[mode] || GRAPH_BY_MODE.before;
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [pinnedNodeId, setPinnedNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateMatch = () => setIsDesktop(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  const orientation = isDesktop ? "horizontal" : "vertical";
  const activeNodeId = hoveredNodeId || pinnedNodeId;

  const nodes = useMemo(
    () => buildNodes(graph, mode, orientation, reduceMotion, activeNodeId),
    [activeNodeId, graph, mode, orientation, reduceMotion],
  );
  const edges = useMemo(
    () => buildEdges(graph, reduceMotion, activeNodeId),
    [activeNodeId, graph, reduceMotion],
  );

  return (
    <div className="bg-background p-4 sm:p-6">
      <div role="img" aria-label={graph.ariaLabel} className="h-[620px] w-full lg:h-[360px]">
        <ReactFlow
          key={`${mode}-${orientation}`}
          className="architecture-flow bg-background"
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          colorMode={theme === "dark" ? "dark" : "light"}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
          zoomOnScroll={false}
          zoomOnPinch
          zoomOnDoubleClick={false}
          preventScrolling={false}
          panOnDrag
          panOnScroll={false}
          minZoom={0.45}
          maxZoom={1.35}
          proOptions={{ hideAttribution: false }}
          onPaneClick={() => setPinnedNodeId(null)}
          onNodeClick={(_, node) => {
            setPinnedNodeId((current) => (current === node.id ? null : node.id));
          }}
          onNodeMouseEnter={(_, node) => setHoveredNodeId(node.id)}
          onNodeMouseLeave={() => setHoveredNodeId(null)}
        >
          <Background variant="cross" gap={20} size={1} color="var(--border)" />
          <Controls position="top-right" showInteractive={false} />
        </ReactFlow>
      </div>
      {/* Rendered below the canvas rather than as an overlay Panel: at small
          viewports the graph fills the full height and an overlaid caption
          collides with the last node. */}
      <p
        className={cn(
          "mt-3 text-center font-pixel text-[10px] uppercase tracking-[0.14em] sm:text-[11px]",
          graph.tone === "destructive" ? "text-destructive" : "text-primary",
        )}
      >
        {graph.caption}
      </p>
      <style jsx global>{`
        .architecture-flow .react-flow__background {
          opacity: 0.6;
        }

        .architecture-flow .react-flow__controls {
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 0;
          background: var(--background);
          box-shadow: none;
        }

        .architecture-flow .react-flow__controls-button {
          width: 32px;
          height: 32px;
          border-color: var(--border);
          border-radius: 0;
          background: var(--background);
          color: var(--foreground);
        }

        .architecture-flow .react-flow__controls-button svg {
          fill: currentColor;
        }

        .architecture-flow .react-flow__attribution {
          background: var(--background);
          padding: 2px 4px;
          color: var(--muted-foreground);
          font-family: var(--font-pixel, monospace);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
      `}</style>
    </div>
  );
}
