"use client";

import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { generateRoast } from "@/lib/roast";
import { useMemo } from "react";

interface SlideRoastProps {
  data: any;
}

export default function SlideRoast({ data }: SlideRoastProps) {
  // Generate the roast once so it doesnt change on rerender
  const roast = useMemo(() => generateRoast(data), [data]);

  // Get context (Language)
  const topLang = data.topLanguages[0]?.name || "Spaghetti Code";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 py-4 md:px-8 md:py-8 text-center space-y-4 md:space-y-7 relative overflow-hidden">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-3 py-1 md:px-4 md:py-1.5 mt-8 rounded-full bg-red-950/30 text-red-200 text-xs md:text-sm font-mono"
      >
        Primary Weapon: <span className="font-bold text-white">{topLang}</span>
      </motion.div>

      {/*  Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
        className="p-4 md:p-6 rounded-full bg-red-900/20"
      >
        <Skull className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
      </motion.div>

      {/*  Roast  */}
      <div className="relative mt-2 w-full max-w-[290px] md:max-w-[310px] mx-auto px-2">
        <span className="absolute -top-3 -left-1 md:-top-5 md:-left-2 text-3xl md:text-5xl text-red-800 opacity-20 font-serif">
          “
        </span>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl font-bold text-white leading-relaxed mx-auto"
        >
          {roast}
        </motion.h2>
        <span className="absolute -bottom-5 -right-1 md:-bottom-7 md:-right-2 text-3xl md:text-5xl text-red-800 opacity-20 font-serif">
          ”
        </span>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-zinc-500 text-[10px] md:text-xs mt-2"
      >
        (based on your commit history)
      </motion.p>
    </div>
  );
}
