"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Layers, CheckCircle2, Download, Copy, Check, Code, ExternalLink } from "lucide-react";
import Receipt from "@/components/Receipt";
import html2canvas from "html2canvas";
import { isLegendUser } from "@/lib/legends";

// X Logo Component
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
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const year = data.year || new Date().getFullYear();
  const isLegend = isLegendUser(data.username);

  // DOWNLOAD RECEIPT
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLegend || !receiptRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#09090b",
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${data.username}-github-wrapped-${year}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate receipt", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // SHARE ON X / TWITTER
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLegend) return;

    const shareUrl = "https://gitwrap-mu.vercel.app/";
    const text = `My ${year} GitHub Wrapped is in: I'm "${data.vibe}" with ${data.totalCommits} commits! 🚀 Check your developer persona:`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  // COPY README BADGE
  const handleCopyBadge = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const baseUrl = "https://gitwrap-mu.vercel.app";
    const badgeMarkdown = `[![GitWrap ${year}](${baseUrl}/api/badge/${data.username}?year=${year})](${baseUrl}/wrap/${data.username}?year=${year})`;

    try {
      await navigator.clipboard.writeText(badgeMarkdown);
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full px-6 py-4 md:px-7 md:py-5 relative select-none max-w-[360px] mx-auto">
      {/* HIDDEN RECEIPT FOR HTML2CANVAS */}
      {!isLegend && (
        <div className="absolute top-0 left-0 overflow-hidden w-0 h-0 opacity-0 pointer-events-none">
          <Receipt ref={receiptRef} data={data} />
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-block py-0.5 px-2.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-medium mb-1">
          {year} WRAPPED
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          @{data.username}
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-2.5 my-auto">
        {/* Dev Persona Card - Balanced size with small text so buttons never cut off */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-xl p-2.5 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-md"
        >
          <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-0.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Dev Persona</span>
          </div>
          <div className="text-sm md:text-base font-bold text-white tracking-tight truncate max-w-full px-2">
            {data.vibe}
          </div>
        </motion.div>

        {/* Contributions */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 flex justify-center gap-2.5 w-full items-center"
        >
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          <div>
            <div className="text-sm md:text-base font-bold text-white">
              {data.totalCommits}
            </div>
            <div className="text-[10px] text-zinc-500">
              Commits
            </div>
          </div>
        </motion.div>

        {/* Top Language */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-2.5 flex justify-center gap-2.5 w-full items-center relative overflow-hidden"
        >
          <div
            className="absolute right-0 top-0 w-10 h-10 opacity-15 rounded-bl-3xl"
            style={{ backgroundColor: data.topLanguages[0]?.color || "#3b82f6" }}
          />
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="truncate">
            <div className="text-sm md:text-base font-bold text-white truncate">
              {data.topLanguages[0]?.name || "N/A"}
            </div>
            <div className="text-[10px] text-zinc-500">
              Top Language
            </div>
          </div>
        </motion.div>

        {/* GitHub README Badge Quick Copy Card */}
        {!isLegend && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="col-span-2 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 rounded-xl py-2 px-3 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <Code className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <div className="text-left truncate">
                <div className="text-[11px] font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                  README Badge
                  <span className="text-[8px] px-1 py-0.2 rounded bg-indigo-950 text-indigo-300 font-mono">
                    SVG
                  </span>
                </div>
                <div className="text-[9px] text-zinc-500 truncate max-w-[140px] sm:max-w-[200px] font-mono">
                  {`[![GitWrap ${year}](...api/badge/${data.username})]`}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 shrink-0 min-w-[68px]">
              <Link
                href={`/badge/${data.username}?year=${year}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="py-0.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[9px] font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
                title="Open full-screen Badge Studio"
              >
                <span>Preview</span>
                <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
              </Link>

              <button
                type="button"
                onClick={handleCopyBadge}
                className="flex items-center justify-center gap-1 py-0.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[9px] font-semibold text-zinc-300 transition-colors cursor-pointer"
              >
                {copiedBadge ? (
                  <>
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-2.5 h-2.5 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ACTIONS ROW */}
        {isLegend ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 flex flex-col gap-1.5 mt-1 items-center"
          >
            <Link
              href="/"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99] z-20"
            >
              <span>Wrap Your Own GitHub</span>
              <span>→</span>
            </Link>

          </motion.div>
        ) : (
          <div className="col-span-2 flex justify-between gap-2.5 mt-1 items-center">
            {/* Share Button */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="flex-1 bg-black text-white rounded-xl py-2.5 px-3 font-bold flex items-center justify-center gap-1.5 text-xs hover:bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer z-20"
            >
              <XLogo className="w-3.5 h-3.5 fill-white" />
              Share on X
            </motion.button>

            {/* Download Receipt Button */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 bg-white text-black rounded-xl py-2.5 px-3 font-bold flex items-center justify-center gap-1.5 text-xs hover:bg-zinc-200 transition-colors cursor-pointer z-20 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              {isGenerating ? "Saving..." : "Save Receipt"}
            </motion.button>
          </div>
        )}

        {/* New Wrap Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="col-span-2 flex justify-center pt-1"
        >
          <Link
            href="/"
            onClick={(e) => e.stopPropagation()}
            className="group inline-flex items-center gap-1.5 py-1 px-3 rounded-lg bg-zinc-900/60 hover:bg-zinc-800/90 border border-zinc-800/80 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer z-20 pointer-events-auto"
          >
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-transform group-hover:-translate-x-0.5">←</span>
            <span>{isLegend ? "Check another developer" : "New Wrap"}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
