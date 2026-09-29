import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || "developer";
    const commits = searchParams.get("commits") || "100+";
    const vibe = searchParams.get("vibe") || "The Developer";
    const lang = searchParams.get("lang") || "Code";
    const avatar = searchParams.get("avatar");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#09090b",
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15), transparent 60%)",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "8px 20px",
                borderRadius: "9999px",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#a1a1aa",
              }}
            >
              GITWRAP 2025
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#71717a",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              YEAR IN REVIEW
            </div>
          </div>

          {/* User Profile & Persona */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
            }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                alt={username}
                width="110"
                height="110"
                style={{
                  borderRadius: "50%",
                  border: "4px solid rgba(99, 102, 241, 0.5)",
                }}
              />
            ) : null}

            <div
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-1px",
              }}
            >
              @{username}
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                backgroundClip: "text",
                color: "transparent",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {vibe}
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {/* Commits */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(24, 24, 27, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "16px 36px",
                minWidth: "200px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#a1a1aa", textTransform: "uppercase" }}>
                Commits
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#ffffff" }}>
                {commits}
              </div>
            </div>

            {/* Top Language */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(24, 24, 27, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "16px 36px",
                minWidth: "200px",
              }}
            >
              <div style={{ fontSize: "14px", color: "#a1a1aa", textTransform: "uppercase" }}>
                Weapon of Choice
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#818cf8" }}>
                {lang}
              </div>
            </div>
          </div>

          {/* Footer watermark */}
          <div
            style={{
              fontSize: "16px",
              color: "#52525b",
              letterSpacing: "1px",
            }}
          >
            gitwrap-mu.vercel.app • Verified Developer Output
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    });
  }
}
