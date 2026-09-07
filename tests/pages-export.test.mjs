import assert from "node:assert/strict";
import { createHash } from "node:crypto";
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
    expectedContent: /Harm does not become visible on its own/,
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
    expectedContent: /<h1[^>]*>CV<\/h1>/,
    hasContactFooter: false,
    internal: true,
  },
  {
    file: "about/index.html",
    expectedContent: /Where it started, curiosity about people/,
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
  await access(path.join(outputDirectory, "about-young-saver-hearts-gathered.jpg"));
  await access(path.join(outputDirectory, "about-young-saver-student-event.jpg"));
  await access(path.join(outputDirectory, "about-young-saver-photo-wall.jpg"));
  await access(path.join(outputDirectory, "about-resilience-program-session.jpg"));
  await access(path.join(outputDirectory, "about-resilience-program-messages.jpg"));
  await access(path.join(outputDirectory, "about-korean-school-sogo-class.jpeg"));
  await access(path.join(outputDirectory, "about-korean-school-festival-booth.jpg"));
  await assert.rejects(
    access(path.join(outputDirectory, "hyeseon-noh-portrait.png")),
    isMissingFile,
  );

  const socialCard = await readFile(
    path.join(outputDirectory, "og-editorial.png"),
  );
  assert.equal(
    createHash("sha256").update(socialCard).digest("hex"),
    "496092c6f6c8167f81606a56aea65d359f1498137071a803bb70a3897e463425",
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
  assert.doesNotMatch(html, /Hyeseon_Noh_CV_August_2026\.pdf/);
  assert.doesNotMatch(html, /class="cv-document-hero__updated"/);
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
