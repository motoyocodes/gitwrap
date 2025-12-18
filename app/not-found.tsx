import Link from "next/link";
import { FileQuestion, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Icon */}
      <div className="bg-zinc-900/80 p-6 rounded-3xl border border-zinc-800 mb-8 backdrop-blur-xl relative group">
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <FileQuestion className="w-16 h-16 text-zinc-400 group-hover:text-red-400 transition-colors relative z-10" />
      </div>

      {/* Text */}
      <div className="space-y-4 max-w-md relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-900 text-red-400 text-xs font-mono mb-2">
          <Terminal className="w-3 h-3" />
          <span>Error 404: HEAD Detached</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
          Commit Not Found
        </h1>

        <p className="text-zinc-500 text-sm md:text-base">
          Looks like this page was force-pushed into oblivion. The branch you
          are looking for has been deleted.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 font-medium text-black transition-all bg-white rounded-full hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            git checkout main
          </Link>
        </div>
      </div>
    </main>
  );
}
