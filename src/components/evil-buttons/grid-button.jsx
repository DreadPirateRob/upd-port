"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import MiniTextmodeIcon from "@/components/ui/mini-textmode-icon";
import { ScrambleText } from "@/components/ui/scramble-text";

const SCRAMBLE_CONFIG = {
  tickMs: 28,
  staggerMs: 22,
  scrambleRounds: 3,
  ambientMaxInterval: 7000,
  ambientMaxChars: 2,
};

function GridIcon() {
  return <MiniTextmodeIcon />;
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
