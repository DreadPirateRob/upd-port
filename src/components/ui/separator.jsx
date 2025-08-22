"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

// top: calc(var(--spacing) * 0);
// content: var(--tw-content);
// background-color: var(--grid-line-color);
// width: 200vw;
// height: 1px;
// position: absolute;
// left: -100vw;

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    (<SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "absolute left-[-100vw] bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[200vw] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px top-[calc(var(--spacing) * 0)]",
        className
      )}
      {...props} />)
  );
}

export { Separator }
