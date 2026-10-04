// Contact form endpoint. Validates, filters bots, then forwards to the Google Apps Script
// web app (scripts/google-sheets-contact.gs), which appends a row and emails me.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// ponytail: per-instance memory, resets on cold start. Move to Upstash/Vercel KV if spam gets past it.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field. Pretend success so bots move on.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const message = str(body.message, 2000);
  const source = str(body.source, 40) || "site";
  if (!EMAIL.test(email)) return Response.json({ ok: false, error: "email" }, { status: 400 });
  if (message.length < 2) return Response.json({ ok: false, error: "message" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  try {
    // Apps Script answers with a redirect to the actual output; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, email, message, source }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!data?.ok) return Response.json({ ok: false, error: "upstream" }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
