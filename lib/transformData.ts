import { StoryData, WeeklyVibeData, DayContribution, TopRepoData } from "@/types";

export function processGitHubData(data: any): StoryData {
  const { contributionsCollection, repositories } = data;

  // 1. Get total commits
  const totalCommits = contributionsCollection?.totalCommitContributions || 0;

  // 2. Logic for Languages
  const languageMap = new Map<string, { count: number; color: string }>();

  repositories?.nodes?.forEach((repo: any) => {
    if (repo?.languages?.edges?.length > 0) {
      const lang = repo.languages.edges[0].node;
      const current = languageMap.get(lang.name) || {
        count: 0,
        color: lang.color || "#3b82f6",
      };
      languageMap.set(lang.name, {
        count: current.count + 1,
        color: lang.color || "#3b82f6",
      });
    }
  });

  const topLanguages = Array.from(languageMap.entries())
    .map(([name, val]) => ({ name, count: val.count, color: val.color }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 3. Determine Vibe (Persona)
  let vibe = "The NPC";
  const topLangName = topLanguages[0]?.name || "";

  // Calculate Repo Distribution
  const uniqueLangs = new Set(
    repositories?.nodes
      ?.map((r: any) => r.languages?.edges?.[0]?.node?.name)
      .filter(Boolean)
  ).size;

  // MAIN VIBE LOGIC
  if (totalCommits > 2000) {
    vibe = "The 10x Engineer";
  } else if (totalCommits < 50) {
    vibe = "The Tourist";
  } else if (totalCommits > 500 && uniqueLangs <= 2) {
    vibe = "The Specialist";
  } else if (uniqueLangs >= 5) {
    vibe = "The Jack of All Trades";
  } else {
    // Default to Language Stereotypes
    switch (topLangName) {
      case "TypeScript":
        vibe = "The Type Safety Nerd";
        break;
      case "JavaScript":
        vibe = "The Chaos Manager";
        break;
      case "Python":
        vibe = "The Data Wizard";
        break;
      case "Rust":
        vibe = "The Blazingly Fast";
        break;
      case "Go":
        vibe = "The Cloud Native";
        break;
      case "Java":
        vibe = "The Enterprise Architect";
        break;
      case "C++":
        vibe = "The Memory Manager";
        break;
      case "C#":
        vibe = "The Microsoft MVP";
        break;
      case "PHP":
        vibe = "The Legend";
        break;
      case "HTML":
      case "CSS":
        vibe = "The Pixel Artist";
        break;
      case "Swift":
        vibe = "The iOS Wizard";
        break;
      case "Kotlin":
        vibe = "The Android Pro";
        break;
      case "Ruby":
        vibe = "The Gem Collector";
        break;
      case "Shell":
        vibe = "The Sysadmin";
        break;
      default:
        vibe = "The Full Stack Mystery";
        break;
    }
  }

  // 4. Time of Day (Clock Vibe) & Day of Week
  let clockVibe = "The 9-to-5er";
  const commitTimes: number[] = [];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // 0: Sun, 1: Mon, ..., 6: Sat
  const dayNames = [
    { day: "Sunday", short: "Sun" },
    { day: "Monday", short: "Mon" },
    { day: "Tuesday", short: "Tue" },
    { day: "Wednesday", short: "Wed" },
    { day: "Thursday", short: "Thu" },
    { day: "Friday", short: "Fri" },
    { day: "Saturday", short: "Sat" },
  ];

  if (contributionsCollection?.commitContributionsByRepository) {
    contributionsCollection.commitContributionsByRepository.forEach(
      (repo: any) => {
        repo?.contributions?.nodes?.forEach((commit: any) => {
          if (commit?.occurredAt) {
            const date = new Date(commit.occurredAt);
            commitTimes.push(date.getHours());
            const dayIndex = date.getDay();
            dayCounts[dayIndex] += 1;
          }
        });
      }
    );
  }

  if (commitTimes.length > 0) {
    const nightCommits = commitTimes.filter((h) => h >= 20 || h < 4).length;
    const morningCommits = commitTimes.filter((h) => h >= 4 && h < 12).length;

    if (nightCommits > commitTimes.length * 0.45) {
      clockVibe = "The Vampire Coder";
    } else if (morningCommits > commitTimes.length * 0.45) {
      clockVibe = "The Early Bird";
    }
  }

  // 5. Weekly Rhythm Analysis
  const totalSampled = dayCounts.reduce((a, b) => a + b, 0);
  const maxDayCount = Math.max(...dayCounts, 1);
  const peakDayIndex = dayCounts.indexOf(Math.max(...dayCounts));
  const peakDayName = dayNames[peakDayIndex].day;

  const weekendCommits = dayCounts[0] + dayCounts[6]; // Sun + Sat
  const weekendPct =
    totalSampled > 0 ? Math.round((weekendCommits / totalSampled) * 100) : 0;
  const fridayCount = dayCounts[5];

  let weeklyTitle = "The Steady Flow";
  let weeklyDesc = "Consistent momentum across the entire week.";
  let weeklyRoast =
    "You don't have a schedule, code just leaks out of you 24/7.";

  if (totalSampled > 0) {
    if (weekendPct >= 45) {
      weeklyTitle = "The Weekend Warrior";
      weeklyDesc = `${weekendPct}% of your commits drop on weekends. Who needs grass?`;
      weeklyRoast = "You treat Saturday and Sunday as bonus sprint cycles.";
    } else if (fridayCount === 0 && totalSampled >= 10) {
      weeklyTitle = "Never On A Friday";
      weeklyDesc =
        "Zero Friday commits detected. The ultimate production survivor.";
      weeklyRoast = "You shut down Slack at 4:30 PM and never look back.";
    } else if (peakDayIndex === 0) {
      weeklyTitle = "The Sunday Panic Pusher";
      weeklyDesc =
        "Sunday is your heaviest commit day. Deadline adrenaline is real.";
      weeklyRoast =
        "Cramming commits before Monday morning standup. We see you.";
    } else if (peakDayIndex === 1) {
      weeklyTitle = "The Monday Sprinter";
      weeklyDesc =
        "Hitting the ground running on Monday morning with zero chill.";
      weeklyRoast = "Calm down, it's just Monday. The servers will survive.";
    } else if (weekendPct <= 10) {
      weeklyTitle = "The Corporate Clockworker";
      weeklyDesc =
        "Strict 9-to-5 Monday through Friday. Work-life balance is elite.";
      weeklyRoast = "Your git history matches an office badge swipe card.";
    } else {
      weeklyTitle = `The ${peakDayName} Powerhouse`;
      weeklyDesc = `Peak velocity achieved every ${peakDayName}.`;
      weeklyRoast = `Most productive on ${peakDayName}s, running on vibes the rest of the week.`;
    }
  }

  const days: DayContribution[] = dayNames.map((d, idx) => ({
    day: d.day,
    shortDay: d.short,
    count: dayCounts[idx],
    percentage: Math.round((dayCounts[idx] / maxDayCount) * 100),
  }));

  const weeklyVibe: WeeklyVibeData = {
    title: weeklyTitle,
    desc: weeklyDesc,
    roast: weeklyRoast,
    peakDay: peakDayName,
    weekendPct,
    days,
  };

  // 6. Top Repo & Star Power
  let topRepo: TopRepoData | undefined;
  if (repositories?.nodes?.length > 0) {
    const first = repositories.nodes[0];
    const totalStars = repositories.nodes.reduce(
      (acc: number, r: any) => acc + (r?.stargazerCount || 0),
      0
    );
    topRepo = {
      name: first?.name || "N/A",
      stars: first?.stargazerCount || 0,
      language: first?.languages?.edges?.[0]?.node?.name,
      totalStars,
    };
  }

  return {
    username: data.login,
    name: data.name || data.login,
    avatarUrl: data.avatarUrl,
    bio: data.bio || undefined,
    totalCommits,
    topLanguages,
    vibe,
    clockVibe,
    weeklyVibe,
    topRepo,
  };
}

