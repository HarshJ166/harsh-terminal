import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role} at ${profile.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Display face for the card. Falls back to the default font if the CDN is unreachable at build.
async function display() {
  try {
    const res = await fetch("https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans-condensed@latest/latin-600-normal.woff");
    return res.ok ? [{ name: "Plex Condensed", data: await res.arrayBuffer(), weight: 600 as const }] : undefined;
  } catch {
    return undefined;
  }
}

export default async function OpengraphImage() {
  const fonts = await display();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0e0f0c", color: "#e8e6df", padding: 80, fontFamily: "Plex Condensed" }}>
        <div style={{ display: "flex", gap: 14 }}>
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} style={{ width: 54, height: 54, border: `2px solid ${i === 5 ? "#ffb000" : "#2a2c27"}`, background: i === 5 ? "rgba(255,176,0,0.12)" : "transparent" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 600, letterSpacing: -4, lineHeight: 0.95 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 40, color: "#8a8f84" }}>
            {profile.role} at {profile.company}. AI solutions for lawyers.
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 220, background: "#ffb000" }} />
      </div>
    ),
    { ...size, fonts },
  );
}
