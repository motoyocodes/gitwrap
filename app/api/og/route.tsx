import { ImageResponse } from "next/og";

// FORCE Node.js runtime (just to be safe)
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Default values
    const username = searchParams.get("username")?.slice(0, 15) || "Developer";
    const commits = searchParams.get("commits") || "0";
    const vibe = searchParams.get("vibe") || "The NPC";
    const topLang = searchParams.get("lang") || "Code";
    const langColor = searchParams.get("color") || "#ffffff";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#09090b",
            color: "white",
            fontFamily: "sans-serif",
            padding: "40px",
          }}
        >
          {/*  Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at 50% 0%, #1a1a1a 0%, #000000 100%)",
            }}
          />

          {/* Content  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "10px 20px",
                backgroundColor: "#27272a",
                borderRadius: "50px",
                border: "1px solid #3f3f46",
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              GITWRAP 2025
            </div>

            {/* Stats */}
            <div style={{ fontSize: "40px", color: "#a1a1aa" }}>
              @{username}
            </div>

            <div
              style={{
                fontSize: "100px",
                fontWeight: "bold",
                margin: "20px 0",
                color: "white",
              }}
            >
              {commits}
            </div>

            <div
              style={{
                fontSize: "24px",
                textTransform: "uppercase",
                color: "#71717a",
              }}
            >
              Total Commits
            </div>

            <div style={{ display: "flex", gap: "40px", marginTop: "60px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "#18181b",
                  borderRadius: "15px",
                  border: "1px solid #27272a",
                }}
              >
                <div style={{ color: "#a1a1aa", fontSize: "16px" }}>VIBE</div>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {vibe}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "#18181b",
                  borderRadius: "15px",
                  border: "1px solid #27272a",
                }}
              >
                <div style={{ color: "#a1a1aa", fontSize: "16px" }}>
                  TOP LANG
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: langColor,
                  }}
                >
                  {topLang}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log("ERROR:", e.message);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
