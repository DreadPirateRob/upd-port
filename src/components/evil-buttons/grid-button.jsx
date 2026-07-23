"use client";

import { cn } from "@/lib/utils";
import { DotmSquare11 } from "@/components/ui/dotm-square-11";

function GridIcon() {
  return (
    <div className="bg-foreground/90 size-7 rounded flex items-center justify-center flex-shrink-0">
      <DotmSquare11 dotSize={2} cellPadding={1} className="text-background" boxSize={21} minSize={16} />
    </div>
  );
}

export default function GridButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border border-border bg-background p-1 rounded transition-all duration-75 active:translate-y-0.5 active:scale-[0.98] hover:bg-muted text-xs font-semibold uppercase tracking-widest pr-3",
        className,
      )}
      {...props}
    >
      <GridIcon />
      {children}
    </button>
  );
}
