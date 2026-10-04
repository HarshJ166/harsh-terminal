import { profile } from "@/content/profile";

const revision = new Date().toISOString().slice(0, 10).replaceAll("-", ".");

function Cell({ k, children, className = "" }: { k: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-bg p-4 ${className}`}>
      <div className="font-mono text-[11px] text-muted">{k}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}

// Drafting title block that closes every page: who drew it, which revision, which sheet.
export function TitleBlock({ sheet }: { sheet: string }) {
  return (
    <div className="mt-24 grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-6">
      <Cell k="drawn by" className="col-span-2">
        {profile.fullName}
      </Cell>
      <Cell k="role" className="col-span-2">
        {profile.role}, {profile.company}
      </Cell>
      <Cell k="links" className="col-span-2">
        <span className="-my-3 flex flex-wrap gap-x-4">
          {profile.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-rule underline-offset-4 hover:decoration-accent-ink">
              {l.label}
            </a>
          ))}
        </span>
      </Cell>
      <Cell k="revision" className="md:col-span-2">
        <span className="font-mono">{revision}</span>
      </Cell>
      <Cell k="set in" className="md:col-span-2">
        IBM Plex, Commit Mono
      </Cell>
      <Cell k="sheet" className="col-span-2 md:col-span-2">
        <span className="font-mono">{sheet}</span>
      </Cell>
      </div>
  );
}
