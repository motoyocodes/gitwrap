"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center p-4 relative">
      {/* Background  */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[20%] right-[20%] w-64 h-64 bg-yellow-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl text-center shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20">
            <AlertTriangle className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
          System Crash
        </h2>

        <p className="text-zinc-400 text-sm mb-6">
          We encountered a runtime error. It’s not you, it’s our spaghetti code.
        </p>

        {/* Code Block for "Tech" Feel */}
        <div className="bg-black/50 rounded-lg p-3 mb-6 text-left overflow-hidden border border-zinc-800">
          <code className="text-[10px] md:text-xs font-mono text-red-400 block break-all">
            {error.message || "Unknown error occurred"}
          </code>
          <div className="text-[10px] text-zinc-600 font-mono mt-1">
            Digest: {error.digest}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={reset}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 px-4 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>

          <Link href="/">
            <button className="w-full text-zinc-500 hover:text-white text-sm py-2 transition-colors">
              Return to Homepage
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
