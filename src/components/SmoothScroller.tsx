"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // 1. Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Add Lenis RAF to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 3. Disable GSAP lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
