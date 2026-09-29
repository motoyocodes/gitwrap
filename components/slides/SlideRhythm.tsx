"use client";

import { motion } from "framer-motion";
import { Calendar, Zap, Sparkles, AlertCircle } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center h-full w-full p-4 md:p-8 text-center space-y-4 md:space-y-6 relative overflow-hidden select-none">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800 text-indigo-300 text-xs font-mono z-10"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Weekly Rhythm</span>
      </motion.div>

      {/* Main Title & Peak Day */}
      <div className="space-y-1 z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="text-2xl md:text-3xl font-black tracking-tight text-white"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xs md:text-sm text-zinc-400 max-w-xs mx-auto"
        >
          {desc}
        </motion.p>
      </div>

      {/* 7-Day Contribution Equalizer Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 md:p-5 z-10"
      >
        <div className="flex items-end justify-between gap-1.5 h-28 md:h-32 pt-2 px-1">
          {days.map((item, idx) => {
            const isPeak = item.day === peakDay;
            const barHeight = Math.max(item.percentage, 8); // At least 8% so bar is visible

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                {/* Count tooltip on peak */}
                {isPeak && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-[9px] font-bold text-indigo-400 flex items-center gap-0.5"
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
                  className={`text-[10px] md:text-xs font-mono uppercase ${
                    isPeak
                      ? "text-indigo-300 font-bold"
                      : "text-zinc-500"
                  }`}
                >
                  {item.shortDay}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend / Weekend Stat */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Peak: <strong className="text-white font-medium">{peakDay}</strong>
          </span>
          <span className="text-zinc-500 font-mono">
            {weekendPct}% Weekend
          </span>
        </div>
      </motion.div>

      {/* Roast Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="max-w-xs w-full bg-white/5 border border-white/10 rounded-xl p-3 text-center z-10"
      >
        <div className="flex items-center justify-center gap-1.5 text-zinc-500 text-[10px] uppercase font-mono tracking-wider mb-1">
          <AlertCircle className="w-3 h-3 text-zinc-400" />
          <span>Verdict</span>
        </div>
        <p className="text-xs md:text-sm text-zinc-300 italic">
          &quot;{roast}&quot;
        </p>
      </motion.div>

      {/* Glowing Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
