"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

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

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>

            <Link href="/#projects-section">
              <Button variant="ghost">Projects</Button>
            </Link>
            {/* <Badge variant="secondary">Demo</Badge> */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
