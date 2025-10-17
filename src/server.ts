import { Application, Router, send } from "@oak/oak";
import { renderFileToString } from "@hongminhee/dejs";
import { type GitHubRelease } from "./types.ts";
import { getName } from "./services.ts";

export const app = new Application();
const router = new Router();
const pagesPath = `${Deno.cwd()}/src/pages`;
const resumeFileName = "ETHAN_LORZANO_Resume.pdf";

router.get("/", async (context) => {
  const githubToken = Deno.env.get("GITHUB_TOKEN");
  const fetchHeaders = new Headers();
  fetchHeaders.set("Authorization", `Bearer ${githubToken}`);

  const latestRelease = await fetch(
    "https://api.github.com/repos/gannhiro/bungaku/releases/latest",
    {
      headers: fetchHeaders,
    }
  );
  const latestReleaseJson: GitHubRelease = await latestRelease.json();
  const myName = getName();

  const body = await renderFileToString(`${pagesPath}/index.ejs`, {
    bungakuVersion: latestReleaseJson.name,
    songName: "lighthouse-ac7.mp3",
    myName,
  });

  context.response.body = body;
  context.response.headers.set("Content-Type", "text/html");
});

router.get("/resume", async (context) => {
  const filePath = `${Deno.cwd()}/public/assets/${resumeFileName}`;
  const fileInfo = await Deno.stat(filePath);
  const file = await Deno.open(filePath, { read: true });

  context.response.headers.set("Content-Type", "application/pdf");
  context.response.headers.set(
    "Content-Disposition",
    `attachment; filename="${resumeFileName}"`
  );
  context.response.headers.set("Content-Length", fileInfo.size.toString());
  context.response.body = file.readable;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
  });
});

console.log("🚀 Server running on http://localhost:8000");
await app.listen({ port: 8000 });
