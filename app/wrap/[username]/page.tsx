import type { Metadata } from "next";
import { fetchGitHubStats } from "@/lib/github";
import StoryContainer from "@/components/StoryContainer";
import { processGitHubData } from "@/lib/transformData";
import Link from "next/link";

// This type tells Nextjs that params is a Promise
type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const rawData = await fetchGitHubStats(username);

  if (!rawData) {
    return {
      title: `${username} | GitWrap 2025`,
      description: `Developer stats not found for @${username}.`,
    };
  }

  const clean = processGitHubData(rawData);
  const ogUrl = `/api/og?username=${encodeURIComponent(clean.username)}&commits=${clean.totalCommits}&vibe=${encodeURIComponent(clean.vibe)}&lang=${encodeURIComponent(clean.topLanguages[0]?.name || "Code")}&avatar=${encodeURIComponent(clean.avatarUrl || "")}`;

  return {
    title: `@${clean.username}'s 2025 Wrapped • ${clean.vibe}`,
    description: `@${clean.username} shipped ${clean.totalCommits} commits in 2025 with top weapon ${clean.topLanguages[0]?.name || "Code"}. Persona: "${clean.vibe}".`,
    openGraph: {
      title: `@${clean.username}'s 2025 GitHub Wrapped`,
      description: `@${clean.username} is "${clean.vibe}" with ${clean.totalCommits} commits in 2025!`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `@${clean.username}'s GitHub Wrapped`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `@${clean.username}'s 2025 GitHub Wrapped`,
      description: `@${clean.username} is "${clean.vibe}" with ${clean.totalCommits} commits in 2025!`,
      images: [ogUrl],
    },
  };
}

export default async function WrapPage({ params }: Props) {
  //  Await the params to get the username
  const { username } = await params;

  //  Fetch Data dynamically
  const rawData = await fetchGitHubStats(username);

  //  Handle 404 (User not found)
  if (!rawData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-6">
          {/* Animated 404 Text */}
          <h1 className="text-9xl font-black text-zinc-800 tracking-tighter select-none">
            404
          </h1>

          <div className="space-y-2.5">
            <h2 className="text-2xl font-bold text-white">
              Developer not found.
            </h2>
            <p className="text-zinc-500">
              Are they touching grass? We couldn't find any trace of "{username}
              " on GitHub.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
          >
            Try Another Username
          </Link>
        </div>
      </div>
    );
  }

  //  Transform & Render
  const cleanData = processGitHubData(rawData);

  return (
    <div className="h-screen w-full bg-stone-950 relative">
      {/* Steel Blue Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 50% 50%, 
          rgba(59, 130, 246, 0.16) 0%, 
          rgba(59, 130, 246, 0.09) 25%, 
          rgba(59, 130, 246, 0.04) 35%, 
          transparent 50%
        )
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <main className=" bg-black flex h-screen items-center justify-center p-0 md:py-4">
        <div className="w-full h-screen md:h-auto md:max-w-md  bg-zinc-950 md:rounded-3xl border-0 md:border border-zinc-800 overflow-hidden relative shadow-2xl">
          <StoryContainer data={cleanData} />
        </div>
      </main>
    </div>
  );
}
