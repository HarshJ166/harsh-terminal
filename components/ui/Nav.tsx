"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { GithubLogo, LinkedinLogo, List, X } from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import { gmailHref } from "@/lib/mail";

const items = [
  { id: "log", label: "Log" },
  { id: "work", label: "Work" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Contact" },
];
const github = profile.links.find((l) => l.label === "GitHub")!;
const linkedin = profile.links.find((l) => l.label === "LinkedIn")!;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  // Section anchors live on the home page; from other pages they navigate back to it.
  const base = usePathname() === "/" ? "" : "/";
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Scrollspy: the section crossing the middle band of the viewport is "active".
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "top" ? null : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...items.map((i) => i.id)]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [base]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        solid ? "border-rule bg-bg/95" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8">
        <a href={`${base}#top`} className="inline-flex min-h-11 items-center font-display text-xl font-semibold tracking-tight">
          Harsh Jajal<span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {items.map((i) => {
            const on = active === i.id;
            return (
              <a
                key={i.id}
                href={`${base}#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={`relative inline-flex h-11 items-center px-3.5 text-sm transition-colors ${on ? "text-fg" : "text-muted hover:text-fg"}`}
              >
                {i.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 bottom-2 h-px origin-left bg-accent transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden size-11 items-center justify-center text-muted transition-colors hover:text-fg md:inline-flex">
            <GithubLogo size={20} />
          </a>
          <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hidden size-11 items-center justify-center text-muted transition-colors hover:text-fg md:inline-flex">
            <LinkedinLogo size={20} />
          </a>
          <a
            href={gmailHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex h-11 items-center border border-fg px-4 font-mono text-xs transition-colors hover:bg-fg hover:text-bg active:translate-y-px"
          >
            Email
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center md:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Reading progress along the bottom edge of the bar. */}
      <m.span
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-bg px-4 pt-4 pb-8 md:hidden"
          >
            {items.map((i) => (
              <a
                key={i.id}
                href={`${base}#${i.id}`}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-between border-b border-rule font-display text-3xl font-semibold tracking-tight"
              >
                {i.label}
                {active === i.id && <span aria-hidden className="size-2 bg-accent" />}
              </a>
            ))}
            <div className="mt-6 flex gap-2">
              {[github, linkedin].map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 border border-rule px-4 text-sm">
                  {l.label === "GitHub" ? <GithubLogo size={18} /> : <LinkedinLogo size={18} />}
                  {l.label}
                </a>
              ))}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
