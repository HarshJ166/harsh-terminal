"use client";

import { m, useReducedMotion } from "motion/react";

const ease = [0.65, 0, 0.35, 1] as const;

// A drafting dimension line: end ticks, a rule that draws out from the centre, and a label in the gap.
export function Dimension({ label, className = "" }: { label: string; className?: string }) {
  const reduce = useReducedMotion();
  const view = { once: true, amount: 0.8 } as const;

  return (
    <div className={`relative flex h-4 items-center text-muted ${className}`} aria-hidden>
      <span className="absolute inset-y-0.5 left-0 w-px bg-current" />
      <span className="absolute inset-y-0.5 right-0 w-px bg-current" />
      <m.span
        className="absolute inset-x-0 top-1/2 h-px bg-current"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.9, ease }}
      />
      <m.span
        className="relative mx-auto bg-bg px-2 font-mono text-[11px] leading-none text-fg"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={view}
        transition={{ delay: reduce ? 0 : 0.6, duration: 0.3 }}
      >
        {label}
      </m.span>
    </div>
  );
}
