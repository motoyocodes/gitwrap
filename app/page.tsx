import { redirect } from "next/navigation";
import { Search, Github } from "lucide-react";

export default function Home() {
  // Server Action to handle the search
  async function searchUser(formData: FormData) {
    "use server";
    const username = formData.get("username") as string;
    if (username) {
      redirect(`/wrap/${username}`);
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#000_100%)] -z-10" />

      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 animate-pulse">
            <Github className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500">
            GitWrap 2025
          </h1>
          <p className="text-zinc-500">Discover your developer personality.</p>
        </div>

        {/*  Input Form */}
        <form action={searchUser} className="relative group">
          <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-xl p-1.5 md:p-2 focus-within:border-zinc-600 transition-colors">
            <Search className="w-5 h-5 text-zinc-500 ml-3" />
            <input
              name="username"
              type="text"
              placeholder="Enter GitHub username..."
              className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-zinc-600"
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className="bg-white text-sm hover:opacity-80 md:text-md text-black px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-medium  transition-colors"
            >
              Check
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-4 text-xs text-zinc-600">
          <span>Uses GitHub GraphQL API</span>
          <span>•</span>
          <span>Next.js 15 Server Actions</span>
        </div>
      </div>
    </main>
  );
}
