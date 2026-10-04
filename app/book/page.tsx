import type { Metadata } from "next";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/ui/Nav";
import { TitleBlock } from "@/components/sections/TitleBlock";
import { profile } from "@/content/profile";
import { gmailHref } from "@/lib/mail";

export const metadata: Metadata = {
  title: "Book a call",
  description: `Book a 30-minute video call with ${profile.name}, ${profile.role} at ${profile.company}.`,
  alternates: { canonical: "/book" },
};

const embed = `${profile.booking}?embed=true&theme=dark&layout=month_view`;

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[1280px] px-4 pt-28 pb-10 md:px-8 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h1 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight md:text-7xl">Book a call</h1>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted">
              Thirty minutes on video. Pick a slot that suits you and the invite lands in your calendar.
            </p>
            <div className="mt-10 border-t border-rule pt-6">
              <p className="text-sm text-muted">Rather write first?</p>
              <a
                href={gmailHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-11 items-center gap-2 border border-rule px-4 font-mono text-sm transition-colors hover:border-fg"
              >
                <EnvelopeSimple size={16} />
                Email
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative border border-rule bg-plate">
              {/* Shown until the calendar paints over it. */}
              <p className="absolute inset-x-0 top-24 text-center font-mono text-xs text-muted" aria-hidden>
                Loading calendar...
              </p>
              <iframe
                src={embed}
                title={`Book a 30-minute call with ${profile.name}`}
                loading="eager"
                className="relative block h-[1080px] w-full md:h-[660px]"
              />
            </div>
            <a
              href={profile.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-1 font-mono text-xs text-muted underline decoration-rule underline-offset-4 hover:text-fg"
            >
              Calendar not loading? Open it on cal.com
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <TitleBlock sheet="2 of 2" />
      </main>
    </>
  );
}
