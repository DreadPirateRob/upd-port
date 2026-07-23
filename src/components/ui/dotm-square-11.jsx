"use client";

import { cn } from "@/lib/utils";

export function DotmSquare11({
  dotSize = 2,
  cellPadding = 1,
  boxSize = 21,
  minSize = 16,
  className,
  ...props
}) {
  const cols = 4;
  const rows = 4;
  const cellSize = (boxSize - cellPadding * (cols - 1)) / cols;
  const dotRadius = dotSize;
  const visibleSize = Math.max(boxSize, minSize);

  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * (cellSize + cellPadding) + cellSize / 2;
      const cy = row * (cellSize + cellPadding) + cellSize / 2;
      const isAccent = (row + col) % 2 === 0;
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={cx}
          cy={cy}
          r={dotRadius}
          fill="currentColor"
          opacity={isAccent ? 1 : 0.35}
        />,
      );
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={visibleSize}
      height={visibleSize}
      viewBox={`0 0 ${boxSize} ${boxSize}`}
      className={cn(className)}
      {...props}
    >
      {dots}
    </svg>
  );
}
