"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle the search on the client side for better UI control
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;

    if (username) {
      setIsLoading(true);
      // Simulate a brief delay if you want the animation to be seen,
      // or just push immediately.
      router.push(`/wrap/${username}`);
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,#000_100%)] -z-10" />

      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-full bg-zinc-900 border border-zinc-800"
          >
            <Github className="w-10 h-10 text-white" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-zinc-300">
              GitWrap 2025
            </h1>
            <p className="text-zinc-500">
              Discover your developer personality.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative group">
          <div
            className={`relative flex items-center bg-zinc-900/80 backdrop-blur-xl border rounded-xl p-1.5 md:p-2 transition-all duration-300 ${
              isLoading
                ? "border-zinc-700 opacity-80 cursor-not-allowed"
                : "border-zinc-800 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600"
            }`}
          >
            <Search
              className={`w-5 h-5 ml-3 transition-colors ${
                isLoading ? "text-zinc-600" : "text-zinc-500"
              }`}
            />

            <input
              name="username"
              type="text"
              placeholder="Enter GitHub username..."
              disabled={isLoading}
              className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed"
              autoComplete="off"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-sm hover:bg-zinc-200 md:text-md text-black px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 min-w-20 justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>...</span>
                </>
              ) : (
                "Check"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 text-xs text-zinc-600"
        >
          <span>Uses GitHub GraphQL API</span>
          <span>•</span>
          <span>Next.js 15</span>
        </motion.div>
      </div>
    </main>
  );
}
