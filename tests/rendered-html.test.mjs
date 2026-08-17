import assert from "node:assert/strict";
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
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Building your site/);
});

test("renders every primary section route", async () => {
  const expected = [
    ["/research", /From overlooked harm to legible response/],
    ["/teaching", /Who gets heard/],
    ["/cv", /Scholarship, teaching, and service/],
    ["/about", /Across places, one enduring question/],
  ];

  for (const [pathname, pattern] of expected) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), pattern);
  }
});
