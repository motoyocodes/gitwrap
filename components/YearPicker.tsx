"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";

interface YearPickerProps {
  years: number[];
  current: number;
  className?: string;
}

export default function YearPicker({ years, current, className = "" }: YearPickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [inputVal, setInputVal] = useState(current.toString());

  // Deduplicate and sort active years (only keep current + user active years)
  const activeYears = Array.from(new Set([current, ...years])).sort((a, b) => b - a);

  const navigateToYear = (yearStr: string) => {
    const y = Number(yearStr);
    if (y && y >= 2008 && y <= new Date().getFullYear()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", y.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSelectChange = (val: string) => {
    if (val === "custom") {
      setIsEditing(true);
    } else {
      navigateToYear(val);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      navigateToYear(inputVal);
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setInputVal(current.toString());
    }
  };

  return (
    <div
      className={`relative inline-flex items-center pointer-events-auto ${className}`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="relative flex items-center bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 hover:border-white/30 rounded-full px-2.5 py-1 text-white text-xs font-mono shadow-lg transition-all">
        <Calendar className="w-3 h-3 text-indigo-400 mr-1.5 shrink-0" />

        {isEditing ? (
          <input
            type="number"
            min="2008"
            max={new Date().getFullYear()}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onBlur={() => {
              navigateToYear(inputVal);
              setIsEditing(false);
            }}
            autoFocus
            className="w-12 bg-transparent text-white text-xs font-mono font-bold focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        ) : (
          <select
            value={current}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="appearance-none bg-transparent text-white text-xs font-mono font-semibold focus:outline-none cursor-pointer pr-3.5"
            aria-label="Select wrapped year"
          >
            {activeYears.map((y) => (
              <option key={y} value={y} className="bg-zinc-900 text-white">
                {y}
              </option>
            ))}
            <option value="custom" className="bg-zinc-900 text-indigo-300">
              Type...
            </option>
          </select>
        )}

        {!isEditing && (
          <span className="absolute right-2 pointer-events-none text-white/50 text-[8px]">
            ▼
          </span>
        )}
      </div>
    </div>
  );
}