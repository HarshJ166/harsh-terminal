import { LagMeter } from "@/components/ui/LagMeter";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const nav = [
  { label: "Log", href: "#log" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Header({ records }: { records: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-2 px-4 sm:gap-4 md:px-8">
        <a
          href="#top"
          aria-label="HJ, back to top"
          className="inline-flex size-11 shrink-0 items-center justify-center border border-fg font-mono text-xs"
        >
          HJ
        </a>
        <nav aria-label="Primary" className="flex items-center font-mono text-xs sm:gap-3">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex h-11 items-center px-2 text-muted transition-colors hover:text-fg">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <LagMeter total={records} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
