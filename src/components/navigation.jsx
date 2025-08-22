"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/theme-toggle";

export default function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Portfolio
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/project/web-app">
              <Button variant="ghost">Projects</Button>
            </Link>
            <Badge variant="secondary">Demo</Badge>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
