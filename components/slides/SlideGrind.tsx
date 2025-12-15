"use client";

import { motion } from "framer-motion";
import { TrendingUp, Flame, Ghost, BatteryWarning, Trophy } from "lucide-react";

import { SlideGrindProps } from "@/types";

export default function SlideGrind({ data }: SlideGrindProps) {
  const count = data.totalCommits;

  // --- LOGIC
  const getCommitInsight = () => {
    if (count < 20) {
      return {
        icon: Ghost,
        title: "Ghost Town",
        desc: "Your contribution graph looks like a Morse code message for 'I need a job'.",
        color: "text-zinc-500",
        bg: "bg-zinc-900/50",
      };
    }
    if (count < 100) {
      return {
        icon: BatteryWarning,
        title: "Just Warming Up",
        desc: "You have a GitHub account just to star other people's repos, don't you?",
        color: "text-blue-400",
        bg: "bg-blue-900/20",
      };
    }
    if (count < 500) {
      return {
        icon: TrendingUp,
        title: "Building Momentum",
        desc: "Consistency is key. You're showing up and shipping code.",
        color: "text-emerald-400",
        bg: "bg-emerald-900/20",
      };
    }
    // High Performers
    return {
      icon: Trophy,
      title: "Top 5% Global",
      desc: "You worked harder than 95% of developers this year. Absolute machine.",
      color: "text-amber-400",
      bg: "bg-amber-900/20",
    };
  };

  const insight = getCommitInsight();
  const Icon = insight.icon;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-12 text-center space-y-5 md:space-y-8 relative overflow-hidden">
      {/*  Vibe Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-zinc-800 border border-zinc-700 text-gray-300 text-xs md:text-sm font-medium z-10"
      >
        <Flame
          className={`w-4 h-4 ${
            count > 500 ? "text-orange-500" : "text-gray-500"
          }`}
        />
        <span>{data.vibe}</span>
      </motion.div>

      {/*  Total Commits*/}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        className="relative z-10"
      >
        <div
          className={`text-[4rem] md:text-[6rem] font-bold leading-none tracking-tighter bg-clip-text text-gray-300`}
        >
          {data.totalCommits}
        </div>
        <div className="text-md md:text-xl text-zinc-500 mt-2 font-medium tracking-wide uppercase">
          Total Commits
        </div>
      </motion.div>

      {/* 3.  Insight Card  */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-6 rounded-2xl border mt-10 backdrop-blur-sm max-w-sm w-full z-10 ${insight.bg} border-white/5`}
      >
        <div
          className={`flex items-center justify-center gap-3 ${insight.color} mb-2`}
        >
          <Icon className="w-6 h-6" />
          <span className="font-bold text-lg">{insight.title}</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{insight.desc}</p>
      </motion.div>

      {/* Background  */}
      <div
        className={`absolute inset-0 -z-10  opacity-20 pointer-events-none blur-[100px] transition-colors duration-1000 ${
          count > 500
            ? "from-amber-500/20 via-transparent to-transparent"
            : "from-blue-500/10 via-transparent to-transparent"
        }`}
      />
    </div>
  );
}
