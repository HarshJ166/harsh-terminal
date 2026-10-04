"use client";

import { Fragment, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";
import type { LogRecord } from "@/content/log";

const hex = (n: number) => `0x${n.toString(16).padStart(2, "0")}`;
const step: Record<string, number> = { j: 1, ArrowDown: 1, k: -1, ArrowUp: -1 };

// Records render visible on the server. The enter animation is CSS (globals.css: .record),
// scroll-driven where supported, so the log never depends on JS to be readable.
export function LogStream({ records }: { records: LogRecord[] }) {
  const [run, setRun] = useState(0);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const focusAt = (i: number) => {
    const el = listRef.current?.querySelectorAll<HTMLElement>("[data-record]")[i];
    if (!el) return;
    setActive(i);
    el.focus({ preventScroll: true });
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "center", behavior: smooth ? "smooth" : "auto" });
  };

  // j / k (and arrows) only act while focus is inside the log: WCAG 2.1.4.
  const onKeyDown = (e: KeyboardEvent<HTMLOListElement>) => {
    const d = step[e.key];
    if (!d || e.metaKey || e.ctrlKey || e.altKey) return;
    e.preventDefault();
    focusAt(Math.min(Math.max(active + d, 0), records.length - 1));
  };

  const replay = () => {
    setRun((r) => r + 1);
    requestAnimationFrame(() => focusAt(0));
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-between gap-4 font-mono text-xs text-muted">
        <p className="hidden md:block">
          Tab into the log, then <kbd className="border border-rule px-1.5 py-0.5 text-fg">j</kbd>{" "}
          <kbd className="border border-rule px-1.5 py-0.5 text-fg">k</kbd> to step through records
        </p>
        <button
          type="button"
          onClick={replay}
          className="inline-flex h-11 items-center gap-2 border border-rule px-3 text-fg transition-colors hover:border-fg active:translate-y-px"
        >
          <ArrowCounterClockwise size={14} />
          Replay from offset 0
        </button>
      </div>

      <div className="mt-6 hidden grid-cols-12 gap-8 border-b border-rule pb-3 font-mono text-[11px] text-muted md:grid">
        <span className="col-span-3">offset / time</span>
        <span className="col-span-4">record</span>
        <span className="col-span-5">payload</span>
      </div>

      <ol ref={listRef} key={run} onKeyDown={onKeyDown} className={run ? "replaying" : undefined}>
        {records.map((r, i) => (
          <li
            key={r.offset}
            data-record
            tabIndex={i === active ? 0 : -1}
            onFocus={() => setActive(i)}
            aria-labelledby={`rec-${r.offset}`}
            aria-describedby={`rec-${r.offset}-payload`}
            style={{ "--i": i } as CSSProperties}
            className="record group relative grid grid-cols-1 gap-4 border-b border-rule py-8 outline-none md:grid-cols-12 md:gap-8 md:py-10"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -top-px h-[3px] origin-left scale-x-0 bg-accent-ink transition-transform duration-500 group-focus-visible:scale-x-100 motion-reduce:transition-none"
            />
            <div className="flex items-baseline gap-4 font-mono text-sm md:col-span-3 md:flex-col md:gap-1">
              <span className="text-accent-ink">{hex(r.offset)}</span>
              <span className="text-muted">{r.ts}</span>
              {r.current && (
                <span className="inline-flex items-center gap-2 text-xs text-fg md:mt-3">
                  <span className="size-1.5 bg-accent" aria-hidden />
                  current
                </span>
              )}
            </div>
            <div className="md:col-span-4">
              <h3
                id={`rec-${r.offset}`}
                className="font-display text-2xl leading-tight font-semibold tracking-tight md:text-3xl"
              >
                {r.title}
                <span className="sr-only">, {r.org}</span>
              </h3>
              <p className="mt-1 text-muted" aria-hidden>
                {r.org}
              </p>
            </div>
            <dl
              id={`rec-${r.offset}-payload`}
              className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 font-mono text-[13px] leading-relaxed md:col-span-5"
            >
              {r.payload.map(([k, v], j) => (
                <Fragment key={j}>
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </Fragment>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </>
  );
}
