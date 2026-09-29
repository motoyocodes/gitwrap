import { NextRequest } from "next/server";
import { fetchGitHubStats } from "@/lib/github";
import { processGitHubData } from "@/lib/transformData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const rawData = await fetchGitHubStats(username);

    let commits = 0;
    let vibe = "The Developer";
    let topLang = "Code";
    let clockVibe = "The 9-to-5er";
    let avatarUrl = "";

    if (rawData) {
      const cleanData = processGitHubData(rawData);
      commits = cleanData.totalCommits;
      vibe = cleanData.vibe;
      topLang = cleanData.topLanguages[0]?.name || "Code";
      clockVibe = cleanData.clockVibe;
      avatarUrl = cleanData.avatarUrl || "";
    }

    // Convert avatar to Base64 data URI so SVG renders image inside <img> tags & GitHub README without CORS block
    let avatarBase64 = "";
    if (avatarUrl) {
      try {
        const imgRes = await fetch(avatarUrl, {
          headers: { "User-Agent": "GitWrap-Badge" },
        });
        if (imgRes.ok) {
          const arrayBuffer = await imgRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const mimeType = imgRes.headers.get("content-type") || "image/jpeg";
          avatarBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
        }
      } catch (err) {
        console.error("Avatar fetch error:", err);
      }
    }

    // Escape XML special characters
    const escapeXml = (unsafe: string) =>
      unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "&":
            return "&amp;";
          case "'":
            return "&apos;";
          case '"':
            return "&quot;";
          default:
            return c;
        }
      });

    const safeUsername = escapeXml(username);
    const safeVibe = escapeXml(vibe);
    const safeLang = escapeXml(topLang);
    const safeClock = escapeXml(clockVibe.replace("The ", ""));
    const firstLetter = safeUsername.charAt(0).toUpperCase();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="200" viewBox="0 0 520 200" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="520" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Border Gradient -->
    <linearGradient id="borderGrad" x1="0" y1="0" x2="520" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.8" />
    </linearGradient>

    <!-- Glow Accent -->
    <radialGradient id="cardGlow" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
    </radialGradient>

    <!-- Persona Text Gradient -->
    <linearGradient id="vibeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>

    <!-- Avatar Clip -->
    <clipPath id="avatarClip">
      <circle cx="50" cy="90" r="24" />
    </clipPath>
  </defs>

  <!-- Card Background -->
  <rect x="1" y="1" width="518" height="198" rx="18" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5" />
  <rect x="1" y="1" width="518" height="198" rx="18" fill="url(#cardGlow)" />

  <!-- Top Badge Bar (y=20 to y=42) -->
  <g transform="translate(24, 20)">
    <!-- GitWrap Pill -->
    <rect x="0" y="0" width="116" height="22" rx="11" fill="#1e1b4b" stroke="#4338ca" stroke-width="1" />
    <text x="13" y="15" fill="#a5b4fc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" letter-spacing="1">GITWRAP 2025</text>

    <!-- Live Status Dot -->
    <circle cx="466" cy="11" r="4" fill="#10b981" />
    <text x="454" y="15" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" text-anchor="end">VERIFIED</text>
  </g>

  <!-- User Avatar & Profile Section (Starts at y=66 with 24px space below top bar) -->
  <g transform="translate(0, 0)">
    <!-- Avatar Fallback -->
    <circle cx="50" cy="90" r="24" fill="#312e81" stroke="#6366f1" stroke-width="1.5" />
    <text x="50" y="97" fill="#e0e7ff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle">${firstLetter}</text>

    ${
      avatarBase64
        ? `<image href="${avatarBase64}" x="26" y="66" width="48" height="48" clip-path="url(#avatarClip)" />`
        : ""
    }

    <!-- Username & Persona -->
    <text x="88" y="86" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800">@${safeUsername}</text>
    <text x="88" y="108" fill="url(#vibeGrad)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">✦ ${safeVibe}</text>
  </g>

  <!-- Divider Line -->
  <line x1="24" y1="130" x2="496" y2="130" stroke="#334155" stroke-opacity="0.6" stroke-dasharray="3 3" />

  <!-- 3 Stats Columns -->
  <g transform="translate(24, 142)">
    <!-- Stat 1: Commits -->
    <g transform="translate(10, 0)">
      <text x="0" y="12" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" letter-spacing="1">COMMITS</text>
      <text x="0" y="37" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900">${commits}</text>
    </g>

    <!-- Vertical separator 1 -->
    <line x1="146" y1="6" x2="146" y2="38" stroke="#334155" stroke-opacity="0.5" />

    <!-- Stat 2: Weapon -->
    <g transform="translate(166, 0)">
      <text x="0" y="12" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" letter-spacing="1">WEAPON</text>
      <text x="0" y="37" fill="#818cf8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800">${safeLang}</text>
    </g>

    <!-- Vertical separator 2 -->
    <line x1="316" y1="6" x2="316" y2="38" stroke="#334155" stroke-opacity="0.5" />

    <!-- Stat 3: Clock Schedule -->
    <g transform="translate(336, 0)">
      <text x="0" y="12" fill="#64748b" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" letter-spacing="1">CHRONO-TYPE</text>
      <text x="0" y="37" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700">${safeClock}</text>
    </g>
  </g>
</svg>`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    return new Response("Failed to generate badge", { status: 500 });
  }
}
