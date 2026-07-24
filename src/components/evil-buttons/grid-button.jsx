"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DotmSquare11 } from "@/components/ui/dotm-square-11";
import { ScrambleText } from "@/components/ui/scramble-text";

const SCRAMBLE_CONFIG = {
  tickMs: 28,
  staggerMs: 22,
  scrambleRounds: 3,
  ambientMaxInterval: 7000,
  ambientMaxChars: 2,
};

function GridIcon() {
  return (
    <div className="bg-foreground/90 size-7 rounded flex items-center justify-center flex-shrink-0">
      <DotmSquare11 dotSize={2} cellPadding={1} className="text-background" boxSize={21} minSize={16} />
    </div>
  );
}

export default function GridButton({ children, className, ...props }) {
  const [hoverCount, setHoverCount] = useState(0);
  const childText = typeof children === "string" ? children : null;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border border-border bg-background p-1 rounded transition-all duration-75 active:translate-y-0.5 active:scale-[0.98] hover:bg-muted text-xs font-semibold uppercase tracking-widest pr-3 font-pixel",
        className,
      )}
      onMouseEnter={() => setHoverCount((c) => c + 1)}
      {...props}
    >
      <GridIcon />
      {childText ? (
        <ScrambleText text={childText} trigger={hoverCount} config={SCRAMBLE_CONFIG} />
      ) : (
        children
      )}
    </button>
  );
}
