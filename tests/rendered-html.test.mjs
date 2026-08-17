import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /Read more about my research/);
  assert.match(html, /alt="Portrait of Hyeseon Noh"/);
  assert.match(html, /src="\/hyeseon-noh-portrait\.jpg"/);
  assert.match(html, /width="963"/);
  assert.match(html, /height="1280"/);
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

  assert.match(visual, /width:\s*min\(100%,\s*260px\)/);
  assert.match(visual, /margin:\s*0 auto/);
  assert.match(portrait, /aspect-ratio:\s*963\s*\/\s*1280/);
  assert.match(portrait, /object-fit:\s*contain/);
  assert.doesNotMatch(portrait, /object-fit:\s*cover/);
});

test("renders every primary section route", async () => {
  const expected = [
    ["/cv", /Scholarship, teaching, and service/, /01 \/ Curriculum vitae/],
    ["/research", /From overlooked harm to legible response/, /02 \/ Research/],
    ["/teaching", /Who gets heard/, /03 \/ Teaching/],
    ["/about", /Across places, one enduring question/, /04 \/ About/],
  ];

  for (const [pathname, pattern, indexPattern] of expected) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, pattern);
    assert.match(html, indexPattern);
    assert.match(
      html,
      /class="section-number academic-page-hero__index" hidden=""/,
      pathname,
    );
    assert.doesNotMatch(
      html,
      /research-editorial-hero__index|teaching-editorial-hero__index/,
      pathname,
    );
  }
});
