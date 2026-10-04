"use client";

import { LazyMotion, domAnimation } from "motion/react";

// Loads only the DOM animation features the site uses, keeping the client bundle small.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
