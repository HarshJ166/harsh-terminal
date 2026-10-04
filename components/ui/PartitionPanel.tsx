"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowCounterClockwise, CalendarBlank, PaperPlaneTilt, Plus } from "@phosphor-icons/react";
import type { LogRecord } from "@/content/log";
import { gmailHref } from "@/lib/mail";
import { profile } from "@/content/profile";

const hex = (n: number) => `0x${n.toString(16).padStart(2, "0")}`;
const GAP = 6; // px between cells; the consumer bar math below depends on it

type Cell = { offset: number; tag: string; ts: string; title: string; org: string; payload: [string, string][]; current?: boolean };

// The career as records in a Kafka partition. Visitors read records by hovering or tapping,
// and can append their own, which turns into a Gmail draft addressed to me.
export function PartitionPanel({ records }: { records: LogRecord[] }) {
  const base: Cell[] = records.map((r) => ({
    offset: r.offset,
    tag: r.tag,
    ts: r.ts,
    title: r.title,
    org: r.org,
    payload: r.payload.slice(0, 3),
    current: r.current,
  }));
  const [mine, setMine] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [sel, setSel] = useState(base.length - 1);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const cells: Cell[] = mine
    ? [...base, { offset: base.length, tag: "you", ts: "just now", title: "Your record", org: "Appended by you", payload: [["message", mine]] }]
    : base;
  const slots = base.length + 1;
  const cur = cells[sel];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return inputRef.current?.focus();
    setMine(text);
    setSel(base.length);
  };
  const reset = () => {
    setMine(null);
    setDraft("");
    setSel(base.length - 1);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="border border-rule bg-bg/85 p-5 md:p-6">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Career, as a Kafka partition</h2>
      <p className="mt-1 text-sm text-muted">Hover or tap a record to read it. The last slot is yours.</p>

      <div className="mt-5 grid" style={{ gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))`, gap: GAP }}>
        {cells.map((c, i) => {
          const on = i === sel;
          return (
            <m.button
              key={c.offset}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onClick={() => setSel(i)}
              initial={c.tag === "you" && !reduce ? { scale: 0.4, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className={`relative flex aspect-square min-h-11 flex-col justify-between border p-1.5 text-left font-mono transition-colors duration-200 ${
                on ? "border-accent bg-accent/10 text-fg" : "border-rule text-muted hover:border-muted"
              }`}
            >
              <span className="text-[10px] leading-none sm:text-[11px]">{hex(c.offset)}</span>
              <span className="hidden truncate text-[9px] leading-none sm:block"> {c.tag}</span>
              <span className="sr-only">
                : {c.title}, {c.org}
              </span>
              {c.current && (
                <span aria-hidden className="absolute top-1.5 right-1.5 size-1.5 bg-accent motion-safe:animate-pulse" />
              )}
            </m.button>
          );
        })}
        {!mine && (
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            aria-label="Append your own record"
            className="flex aspect-square min-h-11 items-center justify-center border border-dashed border-rule text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Consumer position: slides under the record being read. */}
      <div className="relative mt-2 h-[2px]" aria-hidden>
        <span
          className="absolute left-0 h-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            width: `calc((100% - ${GAP * (slots - 1)}px) / ${slots})`,
            transform: `translateX(calc(${sel} * (100% + ${GAP}px)))`,
          }}
        />
      </div>

      <div className="mt-5 min-h-[13.5rem]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={cur.offset}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <p className="font-mono text-xs text-accent">
              {hex(cur.offset)} <span className="text-muted">at</span> {cur.ts}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight font-semibold tracking-tight md:text-3xl">{cur.title}</h3>
            <p className="text-muted">{cur.org}</p>
            <dl className="mt-4 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5 font-mono text-xs leading-relaxed">
              {cur.payload.map(([k, v], j) => (
                <div key={j} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd className="break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </m.div>
        </AnimatePresence>
      </div>

      {mine && (
        <div className="mt-4 flex min-h-[5.75rem] flex-wrap items-end gap-2 border-t border-rule pt-4">
          <a
            href={gmailHref("Hello from your portfolio", mine)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 bg-accent px-4 font-mono text-sm text-bg transition-transform active:translate-y-px"
          >
            <PaperPlaneTilt size={16} />
            Send it to my inbox
          </a>
          {profile.calendly && (
            <a
              href={profile.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 border border-rule px-4 font-mono text-sm transition-colors hover:border-fg"
            >
              <CalendarBlank size={16} />
              Book a call
            </a>
          )}
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 px-3 text-sm text-muted hover:text-fg"
          >
            <ArrowCounterClockwise size={14} />
            Start over
          </button>
        </div>
      )}

      {!mine && (
        <form onSubmit={submit} className="mt-4 min-h-[5.75rem] border-t border-rule pt-4">
          <label htmlFor="append" className="text-sm">
            Append your own record
          </label>
          <div className="mt-2 flex gap-2">
            <input
              ref={inputRef}
              id="append"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={280}
              autoComplete="off"
              placeholder="Hi Harsh, I'm building..."
              className="h-11 min-w-0 flex-1 border border-rule bg-bg px-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 shrink-0 border border-fg px-4 font-mono text-sm transition-colors hover:bg-fg hover:text-bg active:translate-y-px"
            >
              Append
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
