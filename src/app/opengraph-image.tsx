import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Bearstow | Creative Agency for Brand, Digital & Motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/images/brand/bearstow-logo@2x.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0c0c0c",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" height={72} style={{ filter: "invert(1)", objectFit: "contain", alignSelf: "flex-start" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Ideas that move people.
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "rgba(255,255,255,0.6)" }}>
            Brand · Digital · Content · Motion · Print
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.45)" }}>
          <span>bearstow.com</span>
          <span>Creative agency</span>
        </div>
      </div>
    ),
    size,
  );
}
