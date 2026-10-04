import type { CSSProperties } from "react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { HeroField } from "@/components/ui/HeroField";
import { Parallax } from "@/components/ui/Parallax";
import { PartitionPanel } from "@/components/ui/PartitionPanel";
import { profile } from "@/content/profile";
import { log } from "@/content/log";
import { gmailHref } from "@/lib/mail";

const secondary =
  "inline-flex h-12 min-w-12 items-center justify-center gap-2 border border-rule px-3.5 font-mono sm:px-5 text-sm transition-colors hover:border-fg active:translate-y-px";

export function Hero() {
  let n = 0;
  const github = profile.links.find((l) => l.label === "GitHub")!;
  const linkedin = profile.links.find((l) => l.label === "LinkedIn")!;

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroField />
      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1280px] grid-cols-1 items-center gap-14 px-4 pt-28 pb-20 md:grid-cols-12 md:gap-8 md:px-8">
        <Parallax className="md:col-span-7">
          <h1
            aria-label={profile.name}
            className="pb-[0.12em] font-display text-[clamp(4.75rem,16vw,10rem)] leading-[0.95] font-semibold tracking-tight"
          >
            {profile.name.split(" ").map((word) => (
              <span key={word} aria-hidden className="block whitespace-nowrap">
                {[...word].map((ch) => (
                  <span key={n} className="letter" style={{ "--i": n++ } as CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-muted md:text-xl">{profile.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={gmailHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 bg-fg px-5 font-mono text-sm text-bg transition-transform active:translate-y-px"
            >
              <EnvelopeSimple size={16} />
              Email
            </a>
            <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={secondary}>
              <LinkedinLogo size={18} />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className={secondary}>
              <GithubLogo size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </Parallax>

        <div className="md:col-span-5">
          <PartitionPanel records={log} />
        </div>
      </div>
    </section>
  );
}
