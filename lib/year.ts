export const GITHUB_START_YEAR = 2008;

export function resolveYear(input?: string | null): number {
  const now = new Date().getFullYear();
  const y = Number(input);
  // GitHub launched in 2008; fall back to current year if invalid
  return Number.isInteger(y) && y >= GITHUB_START_YEAR && y <= now ? y : now;
}

export function getGitHubYears(): number[] {
  const now = new Date().getFullYear();
  return Array.from({ length: now - GITHUB_START_YEAR + 1 }, (_, i) => now - i);
}