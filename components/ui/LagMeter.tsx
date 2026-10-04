"use client";

import { m, useScroll, useTransform } from "motion/react";

// Scroll progress, phrased as Kafka consumer lag: records left to read on this page.
export function LagMeter({ total }: { total: number }) {
  const { scrollYProgress } = useScroll();
  const lag = useTransform(scrollYProgress, (p) => String(Math.round((1 - p) * total)).padStart(2, "0"));

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted sm:gap-3" aria-hidden>
      <span>lag</span>
      <m.span className="w-[2ch] text-fg tabular-nums">{lag}</m.span>
      <span className="relative hidden h-[2px] w-16 bg-rule sm:block">
        <m.span className="absolute inset-0 origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </span>
    </div>
  );
}
