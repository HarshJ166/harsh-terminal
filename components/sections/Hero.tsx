import Image from "next/image";
import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { Dimension } from "@/components/ui/Dimension";
import { profile } from "@/content/profile";
import { log } from "@/content/log";
import type { CSSProperties } from "react";

const head = log.at(-1)!;

export function Hero() {
  const [first, last] = profile.name.split(" ");
  return (
    <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1280px] grid-cols-1 items-center gap-14 px-4 pt-12 pb-20 md:grid-cols-12 md:gap-8 md:px-8 md:pt-16">
      <div className="md:col-span-7">
        <p className="font-mono text-xs text-muted">
          topic <span className="text-fg">harsh.career</span>
          <span className="mx-3 text-rule" aria-hidden>
            /
          </span>
          head <span className="text-accent-ink">0x{head.offset.toString(16).padStart(2, "0")}</span>
        </p>
        <h1 className="mt-6 font-display text-7xl leading-[0.92] font-semibold tracking-tight sm:text-8xl lg:text-[9.5rem]">
          <span className="tick-in block" style={{ "--ticks": first.length } as CSSProperties}>
            {first}
          </span>
          <span
            className="tick-in block"
            style={{ "--ticks": last.length, "--tick-delay": "0.5s" } as CSSProperties}
          >
            {last}
          </span>
        </h1>
        <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-muted md:text-xl">{profile.summary}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 items-center gap-2 bg-fg px-5 font-mono text-sm text-bg transition-transform active:translate-y-px"
          >
            <EnvelopeSimple size={16} />
            Email
          </a>
          <a
            href={profile.links[0].href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 border border-rule px-5 font-mono text-sm transition-colors hover:border-fg active:translate-y-px"
          >
            <GithubLogo size={16} />
            GitHub
          </a>
        </div>
      </div>

      <figure className="mx-auto w-full max-w-[300px] md:col-span-5 md:mr-0 md:max-w-[345px] lg:col-span-4 lg:col-start-9">
        <Dimension label="2021 / 2026" />
        <div className="mt-3 border border-rule bg-[#e8e6df] p-3 dark:brightness-[0.82]">
          <Image
            src="/portrait.webp"
            alt={`Portrait of ${profile.name}`}
            width={321}
            height={413}
            loading="eager"
            fetchPriority="high"
            unoptimized
            className="w-full mix-blend-multiply"
          />
        </div>
        <figcaption className="grid grid-cols-[4.5rem_1fr] gap-y-1 border-x border-b border-rule p-3 font-mono text-[11px]">
          <span className="text-muted">part</span>
          <span>{profile.fullName}</span>
          <span className="text-muted">role</span>
          <span>
            {profile.role}, {profile.company}
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
