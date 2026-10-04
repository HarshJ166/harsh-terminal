import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Dimension } from "@/components/ui/Dimension";
import { alsoBuilt, featured, projects, type Project } from "@/content/projects";

function Spec({ spec }: { spec: Project["spec"] }) {
  return (
    <dl className="mt-6 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 border-t border-rule pt-4 font-mono text-[13px]">
      {spec.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted">{k}</dt>
          <dd className="break-words">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Links({ links }: { links: Project["links"] }) {
  if (!links.length) return null;
  return (
    <div className="mt-4 flex gap-6 font-mono text-sm">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1 underline decoration-rule underline-offset-4 transition-colors hover:decoration-accent-ink"
        >
          {l.label}
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}

// Product shots sit in grey with the rest of the sheet and show full colour on hover or focus.
const shot =
  "w-full border border-rule transition-[filter] duration-500 [@media(hover:hover)]:grayscale group-hover:grayscale-0 group-focus-within:grayscale-0";

export function Work() {
  const [shotProject, ...plates] = projects;
  return (
    <section id="work" className="mx-auto max-w-[1280px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="font-display text-5xl leading-none font-semibold tracking-tight md:text-6xl">Selected work</h2>
      <p className="mt-5 max-w-[56ch] text-lg text-muted">
        Built end to end, from the contract or the schema up to the screen.
      </p>

      <article className="group mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <figure className="md:col-span-7">
          <Dimension label="issue / verify" className="mb-3" />
          <Image {...featured.image!} alt={featured.image!.alt} sizes="(min-width: 768px) 58vw, 100vw" className={shot} />
        </figure>
        <div className="md:col-span-5 md:pt-10">
          <h3 className="font-display text-4xl font-semibold tracking-tight">{featured.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{featured.summary}</p>
          <Spec spec={featured.spec} />
          <Links links={featured.links} />
        </div>
      </article>

      <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <article className="group md:col-span-7">
          <Image {...shotProject.image!} alt={shotProject.image!.alt} sizes="(min-width: 768px) 58vw, 100vw" className={shot} />
          <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight">{shotProject.name}</h3>
          <p className="mt-3 max-w-[56ch] leading-relaxed text-muted">{shotProject.summary}</p>
          <Spec spec={shotProject.spec} />
          <Links links={shotProject.links} />
        </article>
        <div className="flex flex-col gap-16 md:col-span-5">
          {plates.map((p) => (
            <article key={p.slug} className="border-t-2 border-fg pt-6">
              <h3 className="font-display text-3xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
              <Spec spec={p.spec} />
              <Links links={p.links} />
            </article>
          ))}
        </div>
      </div>

      <p className="mt-24 flex flex-col gap-1 border-t border-rule pt-4 text-muted md:flex-row md:items-center md:gap-10">
        <span className="text-fg">Also built:</span>
        {alsoBuilt.map((a) => (
          <span key={a.name}>
            {a.href ? (
              <a href={a.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-fg underline decoration-rule underline-offset-4 hover:decoration-accent-ink">
                {a.name}
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center text-fg">{a.name}</span>
            )}
            , {a.note}
          </span>
        ))}
      </p>
    </section>
  );
}
