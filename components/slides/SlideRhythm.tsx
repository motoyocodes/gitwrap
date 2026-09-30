"use client";

import { motion } from "framer-motion";
import { Calendar, Zap, Sparkles } from "lucide-react";
import { WeeklyVibeData } from "@/types";

interface SlideRhythmProps {
  data: {
    weeklyVibe: WeeklyVibeData;
  };
}

export default function SlideRhythm({ data }: SlideRhythmProps) {
  const { weeklyVibe } = data;
  const { days, title, desc, roast, peakDay, weekendPct } = weeklyVibe;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-7 py-4 pt-12 md:pt-14 text-center space-y-3 md:space-y-4 relative overflow-hidden select-none">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800 text-indigo-300 text-[11px] font-mono z-10"
      >
        <Calendar className="w-3 h-3 text-indigo-400" />
        <span>Weekly Rhythm</span>
      </motion.div>

      {/* Main Title & Peak Day */}
      <div className="space-y-1 z-10 max-w-[310px] md:max-w-[330px] px-2 mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xl md:text-2xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xs md:text-sm text-zinc-400"
        >
          {desc}
        </motion.p>
      </div>

      {/* 7-Day Contribution Equalizer Bars */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-[310px] md:max-w-[325px] bg-zinc-900/70 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-3.5 z-10 shadow-xl"
      >
        <div className="flex items-end justify-between gap-1.5 h-20 md:h-24 pt-1 px-1">
          {days.map((item, idx) => {
            const isPeak = item.day === peakDay;
            const barHeight = Math.max(item.percentage, 8); // At least 8% so bar is visible

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                {/* Count indicator on peak */}
                {isPeak && (
                  <motion.span
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-[9px] font-bold text-indigo-400 flex items-center"
                  >
                    <Zap className="w-2.5 h-2.5 fill-indigo-400" />
                  </motion.span>
                )}

                {/* Animated Bar */}
                <div className="w-full bg-zinc-800/60 rounded-full h-full flex items-end overflow-hidden p-0.5">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeight}%` }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + idx * 0.08,
                      ease: "easeOut",
                    }}
                    className={`w-full rounded-full transition-all duration-300 ${
                      isPeak
                        ? "bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                        : idx === 0 || idx === 6
                        ? "bg-purple-600/70"
                        : "bg-zinc-600/60"
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-[10px] font-mono uppercase ${
                    isPeak ? "text-indigo-300 font-bold" : "text-zinc-500"
                  }`}
                >
                  {item.shortDay}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend / Weekend Stat */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-800/80 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Peak: <strong className="text-white font-medium">{peakDay}</strong>
          </span>
          <span className="text-zinc-500 font-mono text-[10px]">
            {weekendPct}% Weekend
          </span>
        </div>
      </motion.div>

      {/* Compact Verdict Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-[340px] md:max-w-sm w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center z-10"
      >
        <p className="text-xs text-zinc-300 italic leading-snug">
          &quot;{roast}&quot;
        </p>
      </motion.div>

      {/* Glowing Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
