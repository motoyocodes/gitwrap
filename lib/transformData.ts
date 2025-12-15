export function processGitHubData(data: any) {
  const { contributionsCollection, repositories } = data;

  // 1. Get the flat number
  const totalCommits = contributionsCollection.totalCommitContributions;

  // 2. Logic for Languages
  const languageMap = new Map<string, { count: number; color: string }>();

  repositories.nodes.forEach((repo: any) => {
    if (repo.languages.edges.length > 0) {
      const lang = repo.languages.edges[0].node;
      const current = languageMap.get(lang.name) || {
        count: 0,
        color: lang.color,
      };
      languageMap.set(lang.name, {
        count: current.count + 1,
        color: lang.color,
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
    repositories.nodes.map((r: any) => r.languages?.edges[0]?.node.name)
  ).size;

  //  MAIN VIBE LOGIC
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

  let clockVibe = "The 9-to-5er"; // Default value
  const commitTimes: number[] = [];

  if (contributionsCollection.commitContributionsByRepository) {
    contributionsCollection.commitContributionsByRepository.forEach(
      (repo: any) => {
        repo.contributions.nodes.forEach((commit: any) => {
          const date = new Date(commit.occurredAt);
          commitTimes.push(date.getHours());
        });
      }
    );
  }

  if (commitTimes.length > 0) {
    const nightCommits = commitTimes.filter((h) => h >= 20 || h < 4).length;
    const morningCommits = commitTimes.filter((h) => h >= 4 && h < 12).length;

    if (nightCommits > commitTimes.length * 0.5) {
      clockVibe = "The Vampire Coder";
    } else if (morningCommits > commitTimes.length * 0.5) {
      clockVibe = "The Early Bird";
    }
  }

  return {
    username: data.login,
    totalCommits: totalCommits,
    topLanguages,
    vibe,
    clockVibe,
    avatarUrl: data.avatarUrl,
  };
}
