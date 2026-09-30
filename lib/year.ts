export function resolveYear(input?: string | null): number {
    const now = new Date().getFullYear();
    const y = Number(input);
    // GitHub launched in 2008; fall back to current year if invalid
    return Number.isInteger(y) && y >= 2008 && y <= now ? y : now;
}