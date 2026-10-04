import { CountUp } from "@/components/ui/CountUp";
import { getContributions } from "@/lib/github";
import { profile } from "@/content/profile";


export async function Throughput() {
  const data = await getContributions(profile.github);
  if (!data) return null;
  const lead = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay(); // calendar columns start on Sunday

  return (
    <section aria-labelledby="throughput" className="border-y border-rule bg-plate">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-8">
        <h2
          id="throughput"
          aria-label={`${data.total.toLocaleString("en-US")} contributions in the last twelve months.`}
          className="max-w-[18ch] font-display text-5xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
          <CountUp value={data.total} /> contributions in the last twelve months.
        </h2>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 font-mono text-sm">
          <div>
            <dt className="text-muted">active days</dt>
            <dd className="mt-1 text-2xl">{data.activeDays} / {data.days.length}</dd>
          </div>
          <div>
            <dt className="text-muted">longest streak</dt>
            <dd className="mt-1 text-2xl">{data.longestStreak} days</dd>
          </div>
        </dl>

        <div className="mt-12 overflow-x-auto pb-2">
          <div
            role="img"
            aria-label={`GitHub contribution calendar: ${data.total} contributions over ${data.activeDays} active days in the last year`}
            className="grid w-max grid-flow-col grid-rows-7 gap-[3px] lg:gap-1"
          >
            {Array.from({ length: lead }, (_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {data.days.map((d) => (
              <span
                key={d.date}
                title={`${d.count} on ${d.date}`}
                className="size-[10px] md:size-[13px] lg:size-[17px]"
                style={{ background: `var(--heat-${Math.min(d.level, 4)})` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Live from{" "}
          <a href={`https://github.com/${profile.github}`} className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:text-fg">
            github.com/{profile.github}
          </a>
          , refreshed daily.
        </p>
      </div>
    </section>
  );
}
