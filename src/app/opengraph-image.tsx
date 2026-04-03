import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Himmels Makrele — Kunst vom Himmel, Geschichten aus dem Meer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #E0F2FE 0%, #38BDF8 50%, #164E63 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "white",
            textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
            marginBottom: 16,
          }}
        >
          Himmels Makrele
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#FBBF24",
            fontWeight: 500,
          }}
        >
          Kunst vom Himmel, Geschichten aus dem Meer
        </div>
        {/* Simple fish icon */}
        <div
          style={{
            marginTop: 40,
            fontSize: 64,
          }}
        >
          🐟
        </div>
      </div>
    ),
    { ...size }
  );
}
