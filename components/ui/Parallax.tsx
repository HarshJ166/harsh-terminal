"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

// Hero copy drifts up and dims slightly as the page scrolls away from it.
export function Parallax({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -70]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);
  return (
    <m.div className={className} style={reduce ? undefined : { y, opacity }}>
      {children}
    </m.div>
  );
}
