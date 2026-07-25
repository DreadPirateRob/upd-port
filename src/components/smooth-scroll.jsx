"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;

    function enable() {
      if (motionPreference.matches || lenis) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
    }

    function disable() {
      lenis?.destroy();
      lenis = undefined;
    }

    function syncMotionPreference() {
      if (motionPreference.matches) {
        disable();
      } else {
        enable();
      }
    }

    motionPreference.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      disable();
    };
  }, []);

  return null;
}
