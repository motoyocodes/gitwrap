"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Crown, Layers, CheckCircle2, Download } from "lucide-react";
import Receipt from "@/components/Receipt";
import html2canvas from "html2canvas";

//   X Logo Component
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zl-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function SlideSummary({ data }: { data: any }) {
  const receiptRef = useRef<HTMLDivElement>(null);

  // DOWNLOAD LOGIC
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // STOP THE CLICK FROM GOING TO THE PARENT

    if (!receiptRef.current) return;
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#09090b",
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${data.username}-github-wrapped-2025.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate receipt", err);
    }
  };

  // SHARE LOGIC
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // STOP THE CLICK FROM GOING TO THE PARENT

    // 1. HARDCODED URL that Points to Homepage
    const shareUrl = "https://gitwrap-2025-topaz.vercel.app";

    // 2. TWEET TEXT
    const text = `I'm a ${data.vibe} 🧛‍♂️ with ${data.totalCommits} commits in 2025.\n\nCheck out your GitHub Wrapped here:`;

    // 3. GENERATE LINK
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col h-full w-full p-5 py-8 md:p-6 md:py-12 space-y-5 md:space-y-6 relative">
      {/*  HIDDEN RECEIPT*/}
      <div className="absolute top-0 left-0 overflow-hidden w-0 h-0 opacity-0 pointer-events-none">
        <Receipt ref={receiptRef} data={data} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-block p-1 px-3 mt-3 rounded-full bg-emerald-950 border border-emerald-900 text-emerald-400 text-[10px] md:text-xs font-medium mb-3 md:mb-4">
          2025 WRAPPED
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-white tracking-tighter">
          @{data.username}
        </h1>
      </motion.div>

      {/*  Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 flex-1 h-full">
        {/*  Vibe */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-center items-center text-center relative overflow-hidden"
        >
          <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mb-2" />
          <div className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest">
            Dev Persona
          </div>
          <div className="text-xl md:text-2xl font-bold text-white mt-1">
            {data.vibe}
          </div>
        </motion.div>

        {/*  Contributions */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 md:p-4 flex justify-center gap-3 w-full items-center"
        >
          <Layers className="w-4 h-4 md:w-5 md:h-5 text-zinc-600" />
          <div>
            <div className="md:text-lg text-md font-bold text-white">
              {data.totalCommits}
            </div>
            <div className="text-[10px] md:text-xs text-zinc-500">
              Contributions
            </div>
          </div>
        </motion.div>

        {/* Top Lang */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 md:p-4 flex justify-center gap-3 w-full items-center"
        >
          <div
            className="absolute right-0 top-0 w-12 h-12 opacity-10 rounded-bl-3xl"
            style={{ backgroundColor: data.topLanguages[0]?.color }}
          />
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-zinc-600" />
          <div>
            <div className="md:text-lg text-md font-bold text-white truncate">
              {data.topLanguages[0]?.name || "N/A"}
            </div>
            <div className="text-[10px] md:text-xs text-zinc-500">
              Top Language
            </div>
          </div>
        </motion.div>

        {/* ACTIONS ROW   */}
        <div className="col-span-2 flex justify-between gap-2 md:gap-3 mt-1 md:mt-2 items-center">
          {/*  Share Button */}
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 bg-black text-white rounded-2xl py-3 px-4 md:p-4 font-bold flex items-center justify-center gap-2 text-xs md:text-base hover:bg-zinc-900 transition-colors cursor-pointer z-50 h-fit"
          >
            <XLogo className="w-3 h-3 md:w-4 md:h-4 fill-white" />
            Share
          </motion.button>

          {/*  Download Button */}
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 bg-white text-black rounded-2xl py-3 px-4 md:p-4 font-bold flex items-center justify-center gap-2 text-xs md:text-base hover:bg-zinc-200 transition-colors cursor-pointer z-50 h-fit"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            Save
          </motion.button>
        </div>
      </div>
    </div>
  );
}
