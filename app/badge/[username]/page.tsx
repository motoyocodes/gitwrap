"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, ExternalLink, Sparkles, Code2, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function BadgeShowcasePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const baseUrl = typeof window !== "undefined" && window.location.origin ? window.location.origin : "https://gitwrap-mu.vercel.app";
  const badgeSvgUrl = `${baseUrl}/api/badge/${username}`;
  const wrapUrl = `${baseUrl}/wrap/${username}`;

  const markdownSnippet = `[![GitWrap 2025](${badgeSvgUrl})](${wrapUrl})`;
  const htmlSnippet = `<a href="${wrapUrl}"><img src="${badgeSvgUrl}" alt="${username}'s GitWrap 2025" /></a>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden">
      {/* Background Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Nav */}
      <header className="w-full max-w-4xl flex items-center justify-between py-4">
        <Link
          href={`/wrap/${username}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Story</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-mono">
            README BADGE STUDIO
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-2xl flex flex-col items-center text-center space-y-8 my-auto">
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>GitHub Profile README Card</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Embed your 2025 Flex
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto">
            Live vector SVG card that updates directly on your GitHub profile README.
          </p>
        </div>

        {/* Live Badge Showcase Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-6 shadow-2xl relative group"
        >
          {/* GitHub README Preview Shell Header */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-zinc-400" />
              README.md Preview
            </span>
          </div>

          {/* Actual Live SVG Embed */}
          <div className="py-2 w-full flex justify-center overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/badge/${username}`}
              alt={`${username}'s GitHub Wrapped 2025`}
              className="max-w-full h-auto rounded-2xl shadow-lg border border-white/5 hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => copyToClipboard(markdownSnippet, "markdown")}
              className="flex-1 bg-white hover:bg-zinc-200 text-black py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              {copiedType === "markdown" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied Markdown!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(badgeSvgUrl, "url")}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedType === "url" ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied SVG Link!</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>Copy SVG URL</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Markdown Snippet Box */}
        <div className="w-full max-w-xl text-left bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-zinc-400 relative">
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5 font-sans font-semibold">
            Paste into your GitHub README.md:
          </div>
          <div className="text-zinc-200 overflow-x-auto whitespace-pre p-2 bg-black/60 rounded-lg border border-white/5 select-all">
            {markdownSnippet}
          </div>
        </div>

        {/* Actions Link */}
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <Link
            href={`/wrap/${username}`}
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Open Story Experience</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl py-4 text-center text-xs text-zinc-600 font-mono">
        GitWrap 2025 • Dynamic SVG Generator
      </footer>
    </div>
  );
}
