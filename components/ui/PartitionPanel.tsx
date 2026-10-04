"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowCounterClockwise, CalendarBlank, CheckCircle, PaperPlaneTilt, Plus } from "@phosphor-icons/react";
import type { LogRecord } from "@/content/log";
import { gmailHref } from "@/lib/mail";
import { profile } from "@/content/profile";
import { sendContact } from "@/lib/contact";

const hex = (n: number) => `0x${n.toString(16).padStart(2, "0")}`;
const GAP = 6; // px between cells; the consumer bar math below depends on it

type Cell = { offset: number; tag: string; ts: string; title: string; org: string; payload: [string, string][]; current?: boolean };

// The career as records in a Kafka partition. Visitors read records by hovering or tapping,
// and can append their own, then send it (stored in my Google Sheet via /api/contact).
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
  const [delivery, setDelivery] = useState<{ status: "idle" | "sending" | "sent" | "error"; error?: string }>({ status: "idle" });
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
  const deliver = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setDelivery({ status: "sending" });
    const error = await sendContact({ name: data.name, email: data.email, website: data.website, message: mine ?? "", source: "hero" });
    setDelivery(error ? { status: "error", error } : { status: "sent" });
  };
  const reset = () => {
    setMine(null);
    setDelivery({ status: "idle" });
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

      {mine && delivery.status !== "sent" && (
        <form onSubmit={deliver} className="mt-4 grid gap-3 border-t border-rule pt-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label htmlFor="hp-name" className="text-sm">
                Your name
              </label>
              <input id="hp-name" name="name" autoComplete="name" maxLength={100} className="h-11 border border-rule bg-bg px-3 text-sm focus:border-accent focus:outline-none" />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="hp-email" className="text-sm">
                Your email
              </label>
              <input id="hp-email" name="email" type="email" required autoComplete="email" maxLength={200} className="h-11 border border-rule bg-bg px-3 text-sm focus:border-accent focus:outline-none" />
            </div>
          </div>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />
          {delivery.status === "error" && (
            <p role="alert" className="text-sm text-accent">
              {delivery.error}{" "}
              <a href={gmailHref("Hello from your portfolio", mine)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Open Gmail
              </a>
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="submit"
              disabled={delivery.status === "sending"}
              className="inline-flex h-11 items-center gap-2 bg-accent px-4 font-mono text-sm text-bg transition-transform active:translate-y-px disabled:opacity-60"
            >
              <PaperPlaneTilt size={16} />
              {delivery.status === "sending" ? "Sending..." : "Send to Harsh"}
            </button>
            <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 px-3 text-sm text-muted hover:text-fg">
              <ArrowCounterClockwise size={14} />
              Start over
            </button>
          </div>
        </form>
      )}

      {mine && delivery.status === "sent" && (
        <div className="mt-4 border-t border-rule pt-4" role="status">
          <p className="flex items-center gap-2 text-sm">
            <CheckCircle size={18} className="text-accent" />
            Committed. I&apos;ll reply from {profile.email}.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {profile.booking && (
              <a
                href="/book"
                className="inline-flex h-11 items-center gap-2 border border-rule px-4 font-mono text-sm transition-colors hover:border-fg"
              >
                <CalendarBlank size={16} />
                Book a call
              </a>
            )}
            <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 px-3 text-sm text-muted hover:text-fg">
              <ArrowCounterClockwise size={14} />
              Append another
            </button>
          </div>
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
