import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0e0f0c", color: "#e8e6df", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 24, color: "#8a8f84" }}>topic harsh.career / head 0x05</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#8a8f84" }}>
            {profile.role}, {profile.company}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 240, background: "#ffb000" }} />
      </div>
    ),
    size,
  );
}
