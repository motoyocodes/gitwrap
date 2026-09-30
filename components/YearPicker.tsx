"use client";
import { useRouter, usePathname } from "next/navigation";

export default function YearPicker({ years, current }: { years: number[]; current: number }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <select
            value={current}
            onChange={(e) => router.push(`${pathname}?year=${e.target.value}`)}
            className="fixed top-4 right-4 z-50 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700 text-white text-sm font-semibold px-4 py-2"
        >
            {years.map((y) => (
                <option key={y} value={y}>{y}</option>
            ))}
        </select>
    );
}