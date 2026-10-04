import { LogStream } from "@/components/ui/LogStream";
import { log } from "@/content/log";

export function Log() {
  return (
    <section id="log" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="font-display text-5xl leading-none font-semibold tracking-tight md:text-6xl">The log</h2>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
        Six stops so far, oldest first. Nothing gets rewritten, only appended. On a keyboard, tab in and use{" "}
        <kbd className="border border-rule px-1.5 font-mono text-sm text-fg">j</kbd> and{" "}
        <kbd className="border border-rule px-1.5 font-mono text-sm text-fg">k</kbd> to step through.
      </p>
      <LogStream records={log} />
    </section>
  );
}
