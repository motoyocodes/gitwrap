export const LEGENDS = [
  { handle: "shadcn", label: "shadcn" },
  { handle: "torvalds", label: "Linus Torvalds" },
  { handle: "leerob", label: "Lee Robinson" },
  { handle: "gaearon", label: "Dan Abramov" },
] as const;

export const LEGEND_HANDLES: readonly string[] = LEGENDS.map((l) => l.handle.toLowerCase());

export function isLegendUser(username?: string): boolean {
  if (!username) return false;
  return LEGEND_HANDLES.includes(username.toLowerCase().trim());
}
