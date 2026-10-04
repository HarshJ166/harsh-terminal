import { LogStream } from "@/components/ui/LogStream";
import { log } from "@/content/log";

export function Log() {
  return (
    <section id="log" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="font-display text-5xl leading-none font-semibold tracking-tight md:text-6xl">The log</h2>
      <p className="mt-5 font-mono text-xs leading-6 text-muted">
        topic <span className="text-fg">harsh.career</span>
        <span className="mx-3" aria-hidden>/</span>
        {log.length} records, oldest first
        <span className="mx-3" aria-hidden>/</span>
        retention <span className="text-fg">forever</span>
      </p>
      <LogStream records={log} />
    </section>
  );
}
