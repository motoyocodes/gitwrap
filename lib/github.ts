const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function fetchGitHubStats(username: string) {
  //  Query to get users Profile, Contribution Calendar, and Top Repos
  const query = `
  query($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      company
      location
      followers {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        # For Night Owl and Weekly Rhythm analytics
        commitContributionsByRepository(maxRepositories: 20) {
          contributions(first: 50) {
            nodes {
              occurredAt
            }
          }
        }
      }
      repositories(first: 20, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: OWNER) {
        nodes {
          name
          stargazerCount
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
  try {
    if (!process.env.GITHUB_TOKEN) {
      console.error("Missing GITHUB_TOKEN environment variable. Please set it in .env.local.");
      return null;
    }

    const res = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "GitWrap-App",
      },
      body: JSON.stringify({
        query,
        variables: { username: username },
      }),
      //  CACHING
      next: {
        revalidate: 86400, // Cache this data for 24 hours
        tags: [`user-${username}`], // Tag it so I can clear it later if needed
      },
    });

    const json = await res.json();

    if (!res.ok) {
      console.error(`GitHub API HTTP ${res.status}:`, json.message || json);
      return null;
    }

    if (json.errors) {
      console.error("GitHub API Error:", json.errors);
      return null;
    }

    return json.data?.user ?? null;
  } catch (error) {
    console.error("Fetching failed:", error);
    return null;
  }
}
