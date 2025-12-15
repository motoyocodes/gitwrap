"use client";

import { motion } from "framer-motion";

interface SlideLanguagesProps {
  data: {
    topLanguages: {
      name: string;
      count: number;
      color: string;
    }[];
  };
}

export default function SlideLanguages({ data }: SlideLanguagesProps) {
  //  Find the maximum count to calculate percentages
  // If the top language has 50 repos, that represents 100% width.
  const maxCount = data.topLanguages[0]?.count || 0;

  return (
    <div className="flex flex-col h-full w-full p-8 md:pb-15 pt-30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white tracking-tight">
          The Arsenal
        </h2>
        <p className="text-zinc-500 text-sm mt-1">Tools of your trade</p>
      </motion.div>

      {/*  List */}
      <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
        {data.topLanguages.map((lang, index) => {
          // Calculate width percentage relative to the top language
          const percentage = maxCount > 0 ? (lang.count / maxCount) * 100 : 0;

          return (
            <div key={lang.name} className="relative group">
              {/* Labels Name & Count */}
              <div className="flex justify-between text-sm font-medium mb-2 relative z-10">
                <span className="text-zinc-200 group-hover:text-white transition-colors">
                  {lang.name}
                </span>
                <span className="text-zinc-500">{lang.count} repos</span>
              </div>

              {/*  Progress Bar Container */}
              <div className="h-3 w-full bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-zinc-800">
                {/*  Filled Bar Animated */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: lang.color || "#ffffff" }}
                >
                  {/* shine effect */}
                  <div className="absolute inset-0 bg-white/20" />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State If they have no code */}
      {data.topLanguages.length === 0 && (
        <div className="text-zinc-500 text-center mt-10">
          No languages found. Are you writing binary?
        </div>
      )}
    </div>
  );
}
