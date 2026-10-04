import { principles, stack } from "@/content/profile";

export function Principles() {
  return (
    <section aria-labelledby="principles" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 id="principles" className="font-mono text-xs text-muted">
        How I work
      </h2>
      <ul className="mt-10 space-y-10 md:space-y-14">
        {principles.map((p) => (
          <li key={p.lead} className="max-w-[24ch] font-display text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            {p.lead} <span className="text-muted">{p.rest}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Stack() {
  return (
    <section aria-labelledby="stack" className="mx-auto max-w-[1280px] px-4 pb-24 md:px-8 md:pb-32">
      <h2 id="stack" className="font-display text-3xl font-semibold tracking-tight">
        Tools I reach for
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {stack.map((g) => (
          <div key={g.layer} className="border-t border-fg pt-4">
            <h3 className="font-mono text-xs text-muted">{g.layer}</h3>
            <ul className="mt-4 space-y-1.5 text-lg">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
