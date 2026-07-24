// Abstract per-project textmode visuals for the case-study accordion.
// Each variant = { chars, field(x, y, t, cols, rows) -> 0..1, color(n) -> [r,g,b] }.
// Kept intentionally dark: dim monochrome base, dark-pastel accent on wave crests.

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

// Dim grayscale base + a dark-pastel accent that only blooms on the crests (n -> 1).
function accentColor(n, [ar, ag, ab]) {
  const gray = 10 + n * 30;
  const hi = clamp01((n - 0.7) / 0.3);
  const bloom = hi * hi;
  return [
    Math.floor(gray + bloom * ar),
    Math.floor(gray + bloom * ag),
    Math.floor(gray + bloom * ab),
  ];
}

// Designed first: "signal lattice" — traveling diagonal gratings crossed with a
// slow drifting radial ripple. Dark pastel teal accent.
const teal = {
  chars: ["·", "-", "=", "≡", "+", "/", "\\", "░", "▒", "▓"],
  field(x, y, t, cols, rows) {
    const cx = cols * 0.5 + Math.cos(t * 0.3) * cols * 0.22;
    const cy = rows * 0.5 + Math.sin(t * 0.25) * rows * 0.22;
    const wave = Math.sin(x * 0.55 + y * 0.32 - t * 2.0);
    const cross = Math.sin(x * 0.22 - y * 0.5 + t * 1.2);
    const dx = x - cx;
    const dy = y - cy;
    const ripple = Math.sin(Math.sqrt(dx * dx + dy * dy) * 0.5 - t * 2.4);
    const v = wave * 0.5 + cross * 0.3 + ripple * 0.45;
    return clamp01((v + 1.25) / 2.5);
  },
  color(n) {
    return accentColor(n, [24, 104, 88]);
  },
};

// Placeholder-but-real variants for the other cards (distinct dark-pastel hues).
// Same lattice motion, tuned constants + different accent — refine per project later.
const rose = {
  chars: ["·", ".", ":", "-", "=", "*", "▒", "▓", "█"],
  field(x, y, t) {
    const a = Math.sin(x * 0.4 - y * 0.28 + t * 1.6);
    const b = Math.sin(x * 0.18 + y * 0.46 - t * 1.1);
    const c = Math.cos((x + y) * 0.24 + t * 0.9);
    const v = a * 0.5 + b * 0.35 + c * 0.4;
    return clamp01((v + 1.25) / 2.5);
  },
  color(n) {
    return accentColor(n, [120, 52, 78]);
  },
};

const violet = {
  chars: ["·", "-", "|", "+", "/", "\\", "░", "▒", "▓"],
  field(x, y, t) {
    const a = Math.sin(x * 0.3 + y * 0.3 - t * 1.8);
    const b = Math.sin(x * 0.5 - y * 0.2 + t * 1.0);
    const v = a * 0.6 + b * 0.5;
    return clamp01((v + 1.1) / 2.2);
  },
  color(n) {
    return accentColor(n, [78, 56, 128]);
  },
};

const amber = {
  chars: ["·", ".", "-", "=", "≡", "▪", "░", "▒", "▓"],
  field(x, y, t, cols, rows) {
    const cy = rows * 0.5 + Math.sin(t * 0.4) * rows * 0.3;
    const stream = Math.sin(x * 0.7 - t * 2.6 + Math.sin(y * 0.2 + t) * 1.5);
    const band = Math.cos((y - cy) * 0.4 + t * 0.8);
    const v = stream * 0.55 + band * 0.4;
    return clamp01((v + 1.0) / 2.0);
  },
  color(n) {
    return accentColor(n, [128, 84, 26]);
  },
};

const CASE_STUDY_VISUALS = {
  "distributed-md-platform": teal,
  "multi-exchange-watchlist": rose,
};

const FALLBACK = [teal, rose, violet, amber];

export function getCaseStudyVisual(slug, index = 0) {
  return CASE_STUDY_VISUALS[slug] ?? FALLBACK[index % FALLBACK.length];
}
