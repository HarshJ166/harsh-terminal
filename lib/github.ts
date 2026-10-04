export type Day = { date: string; count: number; level: number };
export type Contributions = { days: Day[]; total: number; activeDays: number; longestStreak: number };

// ponytail: scrapes GitHub's public calendar HTML (no token needed). If GitHub changes the markup,
// parse returns null and the section hides itself. Swap to the GraphQL API with a token if that happens.
export async function getContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return parse(await res.text());
  } catch {
    return null;
  }
}

export function parse(html: string): Contributions | null {
  const tips = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]+)</g)) {
    tips.set(id, Number(text.match(/^(\d+) contribution/)?.[1] ?? 0));
  }
  const days: Day[] = [];
  for (const [, date, id, level] of html.matchAll(
    /data-date="([\d-]+)" id="(contribution-day-component-[\d-]+)" data-level="(\d)"/g,
  )) {
    days.push({ date, count: tips.get(id) ?? 0, level: Number(level) });
  }
  if (days.length < 300) return null;
  days.sort((a, b) => a.date.localeCompare(b.date));

  let run = 0;
  let longestStreak = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longestStreak = Math.max(longestStreak, run);
  }
  return {
    days,
    total: days.reduce((s, d) => s + d.count, 0),
    activeDays: days.filter((d) => d.count > 0).length,
    longestStreak,
  };
}
