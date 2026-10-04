import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { TitleBlock } from "@/components/sections/TitleBlock";
import { profile } from "@/content/profile";
import { gmailHref } from "@/lib/mail";

// The page ends on a drafting title block: who drew it, which revision, which sheet.
export function Contact() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-[1280px] px-4 pt-24 pb-10 md:px-8 md:pt-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="max-w-[14ch] font-display text-5xl leading-[1] font-semibold tracking-tight md:text-6xl">
              Building something that has to hold up?
            </h2>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted">
              Tell me what you are working on, or grab 30 minutes on my calendar.
            </p>
            {profile.booking && (
              <a
                href="/book"
                className="mt-8 inline-flex h-12 items-center gap-2 bg-accent px-5 font-mono text-sm text-bg transition-transform active:translate-y-px"
              >
                <CalendarBlank size={18} />
                Book a call
              </a>
            )}
            <div className="mt-10 border-t border-rule pt-6">
              <p className="text-sm text-muted">Or write directly</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={gmailHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center font-mono text-base break-all underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent md:text-lg"
                >
                  {profile.email}
                </a>
                <CopyEmail />
              </div>
            </div>
          </div>
          <div className="md:col-span-7 md:pt-2">
            <ContactForm />
          </div>
        </div>

        <TitleBlock sheet="1 of 2" />
      </div>
    </footer>
  );
}
