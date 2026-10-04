import { profile } from "@/content/profile";

// Opens Gmail's compose window in the browser, addressed to me.
export function gmailHref(subject?: string, body?: string) {
  const q = new URLSearchParams({ view: "cm", fs: "1", to: profile.email });
  if (subject) q.set("su", subject);
  if (body) q.set("body", body);
  return `https://mail.google.com/mail/?${q}`;
}
