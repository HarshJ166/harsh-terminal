import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0e0f0c", color: "#ffb000", fontSize: 30, fontWeight: 700, border: "4px solid #ffb000" }}>
        HJ
      </div>
    ),
    size,
  );
}
