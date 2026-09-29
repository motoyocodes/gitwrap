export interface SlideGrindProps {
  data: {
    totalCommits: number;
    username: string;
    vibe: string;
  };
}

export interface DayContribution {
  day: string;
  shortDay: string;
  count: number;
  percentage: number;
}

export interface WeeklyVibeData {
  title: string;
  desc: string;
  roast: string;
  peakDay: string;
  weekendPct: number;
  days: DayContribution[];
}

export interface TopRepoData {
  name: string;
  stars: number;
  language?: string;
  totalStars: number;
}

export type StoryData = {
  totalCommits: number;
  username: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  vibe: string;
  clockVibe: string;
  topLanguages: { name: string; count: number; color: string }[];
  weeklyVibe: WeeklyVibeData;
  topRepo?: TopRepoData;
};

export interface ReceiptProps {
  data: {
    username: string;
    totalCommits: number;
    vibe: string;
    topLanguages: { name: string; color: string; count: number }[];
  };
}

