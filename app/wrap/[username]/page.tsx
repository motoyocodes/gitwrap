import type { Metadata } from "next";
import { fetchGitHubStats } from "@/lib/github";
import StoryContainer from "@/components/StoryContainer";
import NoDataRoast from "@/components/NoDataRoast";
import { processGitHubData } from "@/lib/transformData";
import { resolveYear } from "@/lib/year";
import Link from "next/link";

// This type tells Nextjs that params is a Promise
type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ year?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { username } = await params;
  const year = resolveYear((await searchParams).year);
  const rawData = await fetchGitHubStats(username, year);

  if (!rawData) {
    return {
      title: `${username} | GitWrap ${year}`,
      description: `Developer stats not found for @${username}.`,
    };
  }

  const totalCommits = rawData.contributionsCollection?.totalCommitContributions ?? 0;
  const joinYear = rawData.createdAt ? new Date(rawData.createdAt).getFullYear() : null;

  if (totalCommits === 0 || (joinYear !== null && year < joinYear)) {
    const isBeforeJoin = joinYear !== null && year < joinYear;
    return {
      title: isBeforeJoin
        ? `@${username} didn't exist on GitHub in ${year} | GitWrap`
        : `@${username} had 0 commits in ${year} | GitWrap`,
      description: isBeforeJoin
        ? `@${username} joined GitHub in ${joinYear}. No commits found in ${year}!`
        : `@${username} made 0 commits in ${year}. Complete AFK ghost town.`,
    };
  }

  const clean = processGitHubData(rawData, year);
  const ogUrl = `/api/og?username=${encodeURIComponent(clean.username)}&year=${year}&commits=${clean.totalCommits}&vibe=${encodeURIComponent(clean.vibe)}&lang=${encodeURIComponent(clean.topLanguages[0]?.name || "Code")}&avatar=${encodeURIComponent(clean.avatarUrl || "")}`;

  return {
    title: `@${clean.username}'s ${year} Wrapped • ${clean.vibe}`,
    description: `@${clean.username} shipped ${clean.totalCommits} commits in ${year} with top weapon ${clean.topLanguages[0]?.name || "Code"}. Persona: "${clean.vibe}".`,
    openGraph: {
      title: `@${clean.username}'s ${year} GitHub Wrapped`,
      description: `@${clean.username} is "${clean.vibe}" with ${clean.totalCommits} commits in ${year}!`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `@${clean.username}'s GitHub Wrapped ${year}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `@${clean.username}'s ${year} GitHub Wrapped`,
      description: `@${clean.username} is "${clean.vibe}" with ${clean.totalCommits} commits in ${year}!`,
      images: [ogUrl],
    },
  };
}

export default async function WrapPage({ params, searchParams }: Props) {
  //  Await the params to get the username
  const { username } = await params;
  const year = resolveYear((await searchParams).year);

  //  Fetch Data dynamically
  const rawData = await fetchGitHubStats(username, year);

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

  // Check if user has zero commits or requested year before joining GitHub
  const totalCommits = rawData.contributionsCollection?.totalCommitContributions ?? 0;
  const activeYears: number[] = rawData.contributionsCollection?.contributionYears ?? [];
  const createdAt = rawData.createdAt;
  const joinYear = createdAt ? new Date(createdAt).getFullYear() : null;

  if (totalCommits === 0 || (joinYear !== null && year < joinYear)) {
    return (
      <NoDataRoast
        username={username}
        name={rawData.name || username}
        avatarUrl={rawData.avatarUrl}
        requestedYear={year}
        createdAt={createdAt}
        activeYears={activeYears}
      />
    );
  }

  //  Transform & Render
  const cleanData = processGitHubData(rawData, year);

  return (
    <div className="h-screen w-full bg-stone-950 relative">
      {/* Steel Blue Background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
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
      <main className="relative z-10 flex flex-col h-screen items-center justify-center p-0 md:py-4">
        {/* Desktop top bar with back navigation */}
        <div className="hidden md:flex items-center justify-between w-full max-w-md px-2 py-2 mb-2 text-xs font-mono text-zinc-400 relative z-30 pointer-events-auto">
          <Link
            href="/"
            className="group flex items-center gap-1.5 cursor-pointer text-zinc-400 hover:text-white transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-zinc-800/50"
          >
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:-translate-x-0.5">←</span>
            <span className="font-mono">New Wrap</span>
          </Link>
          <span className="text-zinc-500">{year} Edition</span>
        </div>

        <div className="w-full h-screen md:h-[520px] md:max-w-md bg-zinc-950 md:rounded-3xl border-0 md:border border-zinc-800 overflow-hidden relative shadow-2xl">
          <StoryContainer data={cleanData} />
        </div>
      </main>
    </div>
  );
}
