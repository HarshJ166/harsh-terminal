export type ContactInput = { name: string; email: string; message: string; source: string; website?: string };

const messages: Record<string, string> = {
  email: "That email address doesn't look right.",
  message: "Add a short message first.",
  rate_limited: "Too many messages from here. Try again in a few minutes.",
};
const fallback = "Couldn't send right now. Use the Gmail link instead.";

// Returns null on success, or a message to show the visitor.
export async function sendContact(input: ContactInput): Promise<string | null> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return messages[data.error ?? ""] ?? fallback;
  } catch {
    return fallback;
  }
}
