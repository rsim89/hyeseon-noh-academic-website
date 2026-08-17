import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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

function readJpegDimensions(image) {
  assert.deepEqual([...image.subarray(0, 3)], [0xff, 0xd8, 0xff]);

  const startOfFrameMarkers = new Set([
    0xc0,
    0xc1,
    0xc2,
    0xc3,
    0xc5,
    0xc6,
    0xc7,
    0xc9,
    0xca,
    0xcb,
    0xcd,
    0xce,
    0xcf,
  ]);
  let offset = 2;

  while (offset < image.length) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (image[offset] === 0xff) {
      offset += 1;
    }

    const marker = image[offset];
    offset += 1;

    if (
      marker === 0x01 ||
      marker === 0xd8 ||
      marker === 0xd9 ||
      (marker >= 0xd0 && marker <= 0xd7)
    ) {
      continue;
    }

    if (offset + 1 >= image.length) {
      break;
    }

    const segmentLength = image.readUInt16BE(offset);

    if (startOfFrameMarkers.has(marker)) {
      return {
        height: image.readUInt16BE(offset + 3),
        width: image.readUInt16BE(offset + 5),
      };
    }

    if (marker === 0xda || segmentLength < 2) {
      break;
    }

    offset += segmentLength;
  }

  throw new Error("JPEG dimensions were not found");
}

function isMissingFile(error) {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the academic homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Understanding is where/);
  assert.match(html, /overlooked forms of victimization/i);
  assert.match(html, /alt="Portrait of Hyeseon Noh"/);
  assert.match(html, /src="\/hyeseon-noh-portrait\.jpg"/);
  assert.match(html, /width="1200"/);
  assert.match(html, /height="1800"/);
  assert.doesNotMatch(html, /hyeseon-noh-portrait\.png/);
  assert.match(html, contactFooterPattern);
  assert.doesNotMatch(html, /class="footer-nav"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Building your site/);
});

test("shows the complete portrait without cropping", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const visual = css.match(/\.home-profile__visual\s*\{([^}]*)\}/)?.[1] ?? "";
  const portrait =
    css.match(/\.home-profile__portrait\s*\{([^}]*)\}/)?.[1] ?? "";
  const visualRules = [
    ...css.matchAll(/\.home-profile__visual\s*\{([^}]*)\}/g),
  ].map((match) => match[1]);
  const profileRules = [
    ...css.matchAll(/\.home-profile\s*\{([^}]*)\}/g),
  ].map((match) => match[1]);
  const image = await readFile(
    new URL("../public/hyeseon-noh-portrait.jpg", import.meta.url),
  );
  const dimensions = readJpegDimensions(image);

  assert.deepEqual(dimensions, { width: 1200, height: 1800 });
  assert.match(visual, /width:\s*min\(100%,\s*229px\)/);
  assert.match(visual, /margin:\s*0 auto/);
  assert.match(portrait, /height:\s*auto/);
  assert.match(portrait, /object-fit:\s*contain/);
  assert.doesNotMatch(portrait, /aspect-ratio/);
  assert.doesNotMatch(portrait, /object-fit:\s*cover/);
  assert.ok(
    visualRules.some((rule) =>
      /width:\s*min\(56vw,\s*210px\)/.test(rule),
    ),
  );
  assert.ok(
    profileRules.some(
      (rule) =>
        /min-height:\s*auto/.test(rule) &&
        /grid-template-columns:\s*1fr/.test(rule) &&
        /gap:\s*24px/.test(rule),
    ),
  );
  assert.ok(
    profileRules.some(
      (rule) => /padding-top:\s*16px/.test(rule) && /gap:\s*18px/.test(rule),
    ),
  );
  await assert.rejects(
    access(new URL("../public/hyeseon-noh-portrait.png", import.meta.url)),
    isMissingFile,
  );
});

test("renders every primary section route", async () => {
  const expected = [
    ["/cv", /Updated August 2026/, false],
    ["/research", /From overlooked harm to legible response/, false],
    [
      "/teaching",
      /I bring research to life by connecting concepts to students/,
      false,
    ],
    ["/about", /Across places, one enduring question/, true],
  ];

  for (const [pathname, pattern, hasContactFooter] of expected) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, pattern);
    assert.doesNotMatch(html, heroPageIndexClassPattern, pathname);
    for (const indexPattern of heroPageIndexTextPatterns) {
      assert.doesNotMatch(html, indexPattern, pathname);
    }
    assert.doesNotMatch(html, /class="footer-nav"/, pathname);

    if (hasContactFooter) {
      assert.match(html, contactFooterPattern, pathname);
    } else {
      assert.doesNotMatch(html, contactFooterPattern, pathname);
    }

    if (pathname === "/teaching") {
      assert.doesNotMatch(
        html,
        /class="teaching-editorial-hero__question"/,
        pathname,
      );
    }
  }
});

test("renders the current CV with open, download, and embedded PDF access", async () => {
  const response = await render("/cv");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h1[^>]*>CV<\/h1>/);
  assert.match(html, /Updated August 2026/);
  assert.match(
    html,
    /<a[^>]*href="\/hyeseon-noh-cv\.pdf"[^>]*>\s*Open\s*<\/a>/,
  );
  assert.match(
    html,
    /<a[^>]*href="\/hyeseon-noh-cv\.pdf"[^>]*download=""[^>]*>\s*Download\s*<\/a>/,
  );
  assert.match(
    html,
    /<object[^>]*data="\/hyeseon-noh-cv\.pdf"[^>]*type="application\/pdf"/,
  );
  assert.doesNotMatch(html, /PDF forthcoming/i);
});

test("applies the revised research and teaching content contract", async () => {
  const [researchResponse, teachingResponse] = await Promise.all([
    render("/research"),
    render("/teaching"),
  ]);
  const research = await researchResponse.text();
  const teaching = await teachingResponse.text();

  assert.match(
    research,
    /I approach this work using quantitative and computational methods/,
  );
  assert.match(
    research,
    /Emerging technologies create new forms of victimization faster than data and law can adapt/,
  );
  assert.match(research, /Book chapter/);
  assert.match(research, /Newsletter/);
  assert.match(
    research,
    /A follow-up study applies focal concerns theory to incarcerated stalkers/,
  );
  assert.match(
    research,
    /This work treats AI as both a research tool and a research subject/,
  );
  assert.match(
    research,
    /Please see my CV for a complete list of publications/,
  );
  assert.doesNotMatch(
    research,
    /research-program__number|research-program__count|Research area|↗/i,
  );

  assert.match(teaching, /Learning is transformative when it brings research to life/);
  assert.match(teaching, /As a scholar–educator/);
  assert.match(teaching, /Ultimately, I want students to become thoughtful participants/);
  assert.match(teaching, /Courses Taught/);
  assert.match(teaching, /Students learn social advocacy by staying with one issue/);
  assert.match(teaching, /Interpreting landmark decisions from stop and frisk/);
  assert.match(teaching, /From how crime is measured to how policing, courts, and corrections respond/);
  assert.match(teaching, /<em>13th<\/em>/);
  assert.doesNotMatch(
    teaching,
    /Selected undergraduate teaching|Featured activity|Courses supported as a teaching assistant|teaching-course-row__number|>Status</i,
  );
});

test("uses the garnet visual system and removes requested accent rules", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  const researchBoxes =
    css.match(
      /\.research-program__questions,\s*\.research-program__dissertation\s*\{([^}]*)\}/,
    )?.[1] ?? "";
  const teachingPhilosophy =
    css.match(/\.teaching-editorial-philosophy__body\s*\{([^}]*)\}/)?.[1] ??
    "";
  const teachingActivity =
    css.match(/\.teaching-activity-program__activity\s*\{([^}]*)\}/)?.[1] ??
    "";
  const caption =
    css.match(/\.home-profile__visual figcaption\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(css, /--accent:\s*#73000a/i);
  assert.match(researchBoxes, /border-left:\s*0/);
  assert.match(teachingPhilosophy, /border-left:\s*0/);
  assert.match(teachingActivity, /border-left:\s*0/);
  assert.match(caption, /font-family:\s*var\(--serif\)/);
  assert.match(caption, /font-size:\s*14px/);
});
