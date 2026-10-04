# harsh-jajal

Personal site of Harsh Jajal. The career is presented as an append-only event log, with engineering-drawing details.

- Next.js 16 (App Router), Tailwind CSS v4, `motion` for the few animations that need JS
- Content lives in `content/` (`profile.ts`, `log.ts`, `projects.ts`); edit those, not the components
- GitHub contribution calendar is fetched at build time and revalidated daily (`lib/github.ts`)

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build && pnpm start
```

Set `NEXT_PUBLIC_SITE_URL` in production so OG and sitemap URLs point at the real domain.

Fonts: IBM Plex Sans and IBM Plex Sans Condensed (OFL, via next/font/google), Commit Mono (OFL, self-hosted).
