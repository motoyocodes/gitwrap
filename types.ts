export interface SlideGrindProps {
  data: {
    totalCommits: number;
    username: string;
    vibe: string;
  };
}

export type StoryData = {
  totalCommits: number;
  username: string;
  vibe: string;
  clockVibe: string;
  topLanguages: any[];
};

export interface ReceiptProps {
  data: {
    username: string;
    totalCommits: number;
    vibe: string;
    topLanguages: { name: string; color: string }[];
  };
}
