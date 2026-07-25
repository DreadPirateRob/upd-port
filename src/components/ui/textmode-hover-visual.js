export const textmodeHoverVisual = {
  chars: ["·", ":", "/", "+", "×"],
  field(x, y, time) {
    const diagonal = Math.sin(x * 0.62 - y * 0.48 - time * 5);
    const interference = Math.sin((x + y) * 0.24 + time * 3) * 0.35;
    return Math.max(0, Math.min(1, (diagonal + interference + 1.35) / 2.7));
  },
  color(value) {
    const tone = Math.floor(12 + value * 52);
    return [tone, tone, tone];
  },
};
