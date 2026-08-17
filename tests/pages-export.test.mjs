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
const heroPageIndexClassPattern =
  /academic-page-hero__index|research-editorial-hero__index|teaching-editorial-hero__index/;
const heroPageIndexTextPatterns = [
  />\s*01 \/ Curriculum vitae\s*</i,
  />\s*02 \/ Research\s*</i,
  />\s*03 \/ Teaching\s*</i,
  />\s*04 \/ About\s*</i,
];
const contactFooterPattern =
  /Research grows through conversation|Academic inquiries|Alternate contact/;
const pages = [
  {
    file: "index.html",
    expectedContent: /Understanding is where/,
    hasContactFooter: true,
  },
  {
    file: "research/index.html",
    expectedContent: /From overlooked harm to legible response/,
    hasContactFooter: false,
    internal: true,
  },
  {
    file: "teaching/index.html",
    expectedContent:
      /I bring research to life by connecting concepts to students/,
    hasContactFooter: false,
    internal: true,
  },
  {
    file: "cv/index.html",
    expectedContent: /Updated August 2026/,
    hasContactFooter: false,
    internal: true,
  },
  {
    file: "about/index.html",
    expectedContent: /Across places, one enduring question/,
    hasContactFooter: true,
    internal: true,
  },
];

function isMissingFile(error) {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

test("exports every route as standalone static HTML", async () => {
  for (const {
    file,
    expectedContent,
    hasContactFooter,
    internal = false,
  } of pages) {
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
    assert.doesNotMatch(html, /class="footer-nav"/, file);

    if (hasContactFooter) {
      assert.match(html, contactFooterPattern, file);
    } else {
      assert.doesNotMatch(html, contactFooterPattern, file);
    }

    if (internal) {
      assert.doesNotMatch(html, heroPageIndexClassPattern, file);
      for (const indexPattern of heroPageIndexTextPatterns) {
        assert.doesNotMatch(html, indexPattern, file);
      }
    }

    if (file === "teaching/index.html") {
      assert.doesNotMatch(
        html,
        /class="teaching-editorial-hero__question"/,
        file,
      );
    }
  }
});

test("exports Pages support files and current public assets", async () => {
  await access(path.join(outputDirectory, ".nojekyll"));
  await access(path.join(outputDirectory, "404.html"));
  await access(path.join(outputDirectory, "og-editorial.png"));
  await access(path.join(outputDirectory, "hyeseon-noh-portrait.jpg"));
  await access(path.join(outputDirectory, "hyeseon-noh-cv.pdf"));
  await assert.rejects(
    access(path.join(outputDirectory, "hyeseon-noh-portrait.png")),
    isMissingFile,
  );

  const home = await readFile(path.join(outputDirectory, "index.html"), "utf8");
  assert.match(
    home,
    /https:\/\/rsim89\.github\.io\/hyeseon-noh-academic-website\/og-editorial\.png/,
  );
  assert.match(
    home,
    /src="\/hyeseon-noh-academic-website\/hyeseon-noh-portrait\.jpg"/,
  );
  assert.match(home, /width="1200"/);
  assert.match(home, /height="1800"/);
  assert.doesNotMatch(home, /hyeseon-noh-portrait\.png/);
  assert.match(
    home,
    /rel="canonical" href="https:\/\/rsim89\.github\.io\/hyeseon-noh-academic-website\/"/,
  );
  assert.match(home, /<head>[\s\S]*<title>Hyeseon Noh, Ph\.D\./);
  assert.doesNotMatch(home, /<div hidden=""><!--\$--><div hidden=""><title>/);
});

test("exports the CV with base-path-safe open, download, and embed URLs", async () => {
  const pdf = await readFile(path.join(outputDirectory, "hyeseon-noh-cv.pdf"));
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");

  const html = await readFile(
    path.join(outputDirectory, "cv", "index.html"),
    "utf8",
  );
  const cvPath = `${basePath}/hyeseon-noh-cv.pdf`;
  const escapedCvPath = cvPath.replaceAll("/", "\\/").replace(".", "\\.");

  assert.match(html, /<h1[^>]*>CV<\/h1>/);
  assert.match(html, /Updated August 2026/);
  assert.match(
    html,
    new RegExp(`<a[^>]*href="${escapedCvPath}"[^>]*>\\s*Open\\s*</a>`),
  );
  assert.match(
    html,
    new RegExp(
      `<a[^>]*href="${escapedCvPath}"[^>]*download=""[^>]*>\\s*Download\\s*</a>`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `<object[^>]*data="${escapedCvPath}"[^>]*type="application\\/pdf"`,
    ),
  );
  assert.doesNotMatch(html, /PDF forthcoming/i);
  assert.doesNotMatch(
    html,
    /(?:href|data)="\/hyeseon-noh-cv\.pdf"/,
  );
});
