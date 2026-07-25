"use client";

import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";
import { cn } from "@/lib/utils";

export default function TechTag({ children, className }) {
  return (
    <span data-slot="tech-tag" className="inline-flex">
      <ClickPowerUp
        as="span"
        variant="secondary"
        size="chip"
        className={cn("whitespace-nowrap", className)}
      >
        <span>{children}</span>
      </ClickPowerUp>
    </span>
  );
}
