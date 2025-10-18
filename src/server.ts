import { Application, Router } from "@oak/oak";
import { renderFileToString } from "@hongminhee/dejs";
import { getBungakuVersion } from "./services.ts";
import { dialogues, technicalSkills } from "./constants.ts";

export const app = new Application();
const router = new Router();
const pagesPath = `${Deno.cwd()}/src/pages`;
const resumeFileName = "ETHAN_LORZANO_Resume.pdf";

router.get("/", async (context) => {
  const body = await renderFileToString(`${pagesPath}/index.ejs`, {
    bungakuVersion: "loading...",
    technicalSkills,
    dialogues,
  });

  context.response.body = body;
  context.response.headers.set("Content-Type", "text/html");
});

router.get("/bungaku-version", async (context) => {
  const bungakuVersion = await getBungakuVersion();

  const versionText =
    bungakuVersion.length > 0 ? bungakuVersion : "Version not found";
  const htmlSnippet = `<p class="text-center">${versionText}</p>`;

  context.response.body = htmlSnippet;
  context.response.headers.set("Content-Type", "text/plain");
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
