"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Global Lenis instance. Rendered as a sibling so toggling it never remounts the page.
export function SmoothScroll() {
  const reduce = useReducedMotion();
  if (reduce !== false) return null;
  return <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -72 } }} />;
}
