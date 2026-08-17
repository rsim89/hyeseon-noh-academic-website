import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "pages-dist");
const basePath = "/hyeseon-noh-academic-website";
const pages = [
  ["index.html", /Understanding is where/],
  ["research/index.html", /From overlooked harm to legible response/],
  ["teaching/index.html", /Who gets heard/],
  ["cv/index.html", /Scholarship, teaching, and service/],
  ["about/index.html", /Across places, one enduring question/],
];

test("exports every route as standalone static HTML", async () => {
  for (const [file, expectedContent] of pages) {
    const html = await readFile(path.join(outputDirectory, file), "utf8");

    assert.match(html, /^<!DOCTYPE html>/i, file);
    assert.match(html, expectedContent, file);
    assert.doesNotMatch(html, /<script\b/i, file);
    assert.doesNotMatch(html, /localhost|127\.0\.0\.1/i, file);
    assert.doesNotMatch(
      html,
      /(?:href|src|srcset|action|data)=(?:"|')\/(?!hyeseon-noh-academic-website\/)/i,
      file,
    );
    assert.match(
      html,
      new RegExp(
        `href="${basePath}/_next/static/css/[^"]+\\.css"`,
      ),
      file,
    );
  }
});

test("exports Pages support files and public social image", async () => {
  await access(path.join(outputDirectory, ".nojekyll"));
  await access(path.join(outputDirectory, "404.html"));
  await access(path.join(outputDirectory, "og-editorial.png"));

  const home = await readFile(path.join(outputDirectory, "index.html"), "utf8");
  assert.match(
    home,
    /https:\/\/rsim89\.github\.io\/hyeseon-noh-academic-website\/og-editorial\.png/,
  );
  assert.match(
    home,
    /rel="canonical" href="https:\/\/rsim89\.github\.io\/hyeseon-noh-academic-website\/"/,
  );
  assert.match(home, /<head>[\s\S]*<title>Hyeseon Noh, Ph\.D\./);
  assert.doesNotMatch(home, /<div hidden=""><!--\$--><div hidden=""><title>/);
});
