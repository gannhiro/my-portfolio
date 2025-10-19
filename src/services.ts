import { GitHubRelease } from "./types.ts";

export async function getBungakuVersion(): Promise<string> {
  const githubToken = Deno.env.get("GITHUB_TOKEN");
  const fetchHeaders = new Headers();
  fetchHeaders.set("Authorization", `Bearer ${githubToken}`);

  try {
    const latestRelease = await fetch(
      "https://api.github.com/repos/gannhiro/bungaku/releases/latest",
      {
        headers: fetchHeaders,
      }
    );
    const latestReleaseJson: GitHubRelease = await latestRelease.json();

    return latestReleaseJson.name;
  } catch (e) {
    console.log(e);
    return "";
  }
}
