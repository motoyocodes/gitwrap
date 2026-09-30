"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Skull, Hourglass, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface NoDataRoastProps {
  username: string;
  name?: string;
  avatarUrl?: string;
  requestedYear: number;
  createdAt?: string;
  activeYears: number[];
}

export default function NoDataRoast({
  username,
  avatarUrl,
  requestedYear,
  createdAt,
  activeYears,
}: NoDataRoastProps) {
  const createdDate = createdAt ? new Date(createdAt) : null;
  const joinYear = createdDate ? createdDate.getFullYear() : null;
  const joinMonthYear = createdDate
    ? createdDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : null;

  const isBeforeJoin = joinYear !== null && requestedYear < joinYear;
  // Pick just one year for the recovery button: latest active year or default
  const fallbackYear = activeYears[0] || joinYear || 2025;

  useEffect(() => {
    sound.playRoastHit();
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08)_0%,transparent_60%)] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 text-center shadow-2xl backdrop-blur-xl space-y-4"
      >
        {/* User Avatar & Tag */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={username}
              className="w-5 h-5 rounded-full border border-white/20"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
              {username.charAt(0).toUpperCase()}
            </div>
          )}
          <span>@{username}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">{requestedYear}</span>
        </div>

        {/* Small Icon Badge */}
        <div className="inline-flex p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 mx-auto">
          {isBeforeJoin ? (
            <Hourglass className="w-6 h-6 text-amber-400" />
          ) : (
            <Skull className="w-6 h-6 text-red-400" />
          )}
        </div>

        {/* Unified, Compact Heading & Roast */}
        <div className="space-y-2">
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
            {isBeforeJoin
              ? `Didn't exist on GitHub in ${requestedYear}`
              : `0 commits in ${requestedYear}`}
          </h1>

          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans px-1">
            {isBeforeJoin ? (
              <>
                Hold up, <strong className="text-zinc-200">@{username}</strong>! You joined GitHub in{" "}
                <span className="text-amber-300 font-semibold">{joinMonthYear || joinYear}</span>. Looking for commits in{" "}
                <span className="text-amber-300 font-semibold">{requestedYear}</span> is like looking for your git history in the Stone Age. You were probably touching actual grass.
              </>
            ) : (
              <>
                You had an active GitHub account in <span className="text-red-300 font-semibold">{requestedYear}</span>, but shipped 0 commits. Total ghost town mode. Were you just starring repos and closing the tab?
              </>
            )}
          </p>
        </div>

        {/* Single Clean Action Button */}
        <div className="pt-2 space-y-2.5">
          <Link
            href={`/wrap/${username}?year=${fallbackYear}`}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Try Another Year ({fallbackYear})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="inline-block text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Try another username
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
