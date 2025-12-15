import { fetchGitHubStats } from "@/lib/github";
import StoryContainer from "@/components/StoryContainer";
import { processGitHubData } from "@/lib/transformData";

// This type tells Nextjs that params is a Promise
type Props = {
  params: Promise<{ username: string }>;
};

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

          <div className="space`-y-2">
            <h2 className="text-2xl font-bold text-white">
              Developer not found.
            </h2>
            <p className="text-zinc-500">
              Are they touching grass? We couldn't find any trace of "{username}
              " on GitHub.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-black bg-white rounded-full hover:bg-zinc-200 transition-colors"
          >
            Try Another Username
          </a>
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
