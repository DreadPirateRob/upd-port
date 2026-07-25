"use client";

import Link from "next/link";
import Image from "next/image";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";

export default function Navigation() {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/hacker-cat.png"
                alt="Adrian Garcia"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/#skills-section">
              <ClickPowerUp
                variant="secondary"
                as="span"
                className="px-3 py-2 text-[0.65rem] sm:px-5 sm:text-xs"
              >
                Skills
              </ClickPowerUp>
            </Link>

            <Link href="/#projects-section">
              <ClickPowerUp
                variant="secondary"
                as="span"
                className="px-3 py-2 text-[0.65rem] sm:px-5 sm:text-xs"
              >
                Projects
              </ClickPowerUp>
            </Link>

            <Link href="/#experience-section">
              <ClickPowerUp
                variant="secondary"
                as="span"
                className="px-3 py-2 text-[0.65rem] sm:px-5 sm:text-xs"
              >
                Experience
              </ClickPowerUp>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
