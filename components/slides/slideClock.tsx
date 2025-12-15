"use client";

import { motion } from "framer-motion";
import { Moon, Sun, Briefcase, Clock, Star } from "lucide-react";

interface SlideClockProps {
  data: {
    clockVibe: string;
  };
}

export default function SlideClock({ data }: SlideClockProps) {
  const vibe = data.clockVibe;

  // Configuration with Context and Roast
  const config = {
    "The Vampire Coder": {
      icon: Moon,
      title: " Vampire Coder",
      color: "text-purple-400",

      explanation: "You commit most of your code between 8 PM and 4 AM.",
      roast: "Your sleep schedule is more broken than your production builds.",
      bgcolor: "bg-purple-950",
    },
    "The Early Bird": {
      icon: Sun,
      title: " Early Bird",
      color: "text-amber-400",

      explanation: "You start shipping features between 4 AM and 12 PM.",
      roast: "Coding at 5 AM doesn't make the bugs fix themselves faster.",
      bgcolor: "bg-amber-950",
    },
    "The 9-to-5er": {
      icon: Briefcase,
      title: " 9-to-5er",
      color: "text-blue-400",

      explanation: "You treat GitHub strictly as a day job (9 AM - 5 PM).",
      roast: "You actually have a work-life balance? Disgusting.",
      bgcolor: "bg-blue-950",
    },
  };

  const activeConfig =
    config[vibe as keyof typeof config] || config["The 9-to-5er"];
  const Icon = activeConfig.icon;
  const isNight = vibe === "The Vampire Coder";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-2 md:p-8 text-center space-y-5 md:space-y-10 relative overflow-hidden">
      {/*  Main Icon with Pulse Effect */}
      <div className="relative mt-2 md:mt-4">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className={`relative z-10 p-5 md:p-8   backdrop-blur-md`}
        >
          <Icon className={`w-12 h-12 md:w-20 md:h-20 ${activeConfig.color}`} />
        </motion.div>
      </div>

      {/*  Text Content */}
      <div className="space-y-4 md:space-y-6 max-w-sm w-full">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl md:text-4xl font-black tracking-tight ${activeConfig.color}`}
        >
          {activeConfig.title}
        </motion.h2>

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs md:text-sm uppercase tracking-widest font-medium">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>Hyper Coding Time</span>
          </div>
          <p className="text-zinc-300 text-sm md:text-base font-medium">
            {activeConfig.explanation}
          </p>
        </motion.div>

        {/* Roast */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative p-3 md:p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed italic">
            &quot;{activeConfig.roast}&quot;
          </p>
        </motion.div>
      </div>

      {/*  EFFECTS */}

      {/* Stars for Vampires */}
      {isNight && (
        <>
          <Star className="absolute top-10 right-10 w-4 h-4 text-purple-200 opacity-20 animate-pulse" />
          <Star className="absolute bottom-20 left-10 w-3 h-3 text-purple-200 opacity-20 animate-pulse delay-75" />
        </>
      )}

      {/* Background */}
      <div
        className={`absolute inset-0 -z-10 opacity-40 transition-colors duration-1000 ${activeConfig.bgcolor}`}
      />
    </div>
  );
}
