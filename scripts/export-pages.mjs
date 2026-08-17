import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const clientDirectory = path.join(projectRoot, "dist", "client");
const outputDirectory = path.join(projectRoot, "pages-dist");
const routes = ["/", "/research", "/teaching", "/cv", "/about"];

const repository =
  process.env.GITHUB_REPOSITORY ?? "rsim89/hyeseon-noh-academic-website";
const [owner, repositoryName] = repository.split("/");

if (!owner || !repositoryName) {
  throw new Error(`Invalid GITHUB_REPOSITORY value: ${repository}`);
}

const defaultOrigin = `https://${owner}.github.io`;
const defaultBasePath =
  repositoryName.toLowerCase() === `${owner.toLowerCase()}.github.io`
    ? ""
    : `/${repositoryName}`;
const origin = process.env.PAGES_ORIGIN ?? defaultOrigin;
const basePath = normalizeBasePath(
  process.env.PAGES_BASE_PATH ?? defaultBasePath,
);
const siteUrl = stripTrailingSlash(
  process.env.PAGES_SITE_URL ?? `${origin}${basePath}`,
);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

await rm(outputDirectory, { recursive: true, force: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

for (const generatedFile of [
  ".assetsignore",
  ".vite",
  "_headers",
  "vinext-client-entry-manifest.json",
]) {
  await rm(path.join(outputDirectory, generatedFile), {
    recursive: true,
    force: true,
  });
}

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`${origin}${route}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      passThroughOnException() {},
      waitUntil() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Could not render ${route}: HTTP ${response.status}`);
  }

  const outputPath =
    route === "/"
      ? path.join(outputDirectory, "index.html")
      : path.join(outputDirectory, route.slice(1), "index.html");
  const html = prepareStaticHtml(await response.text(), route);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
await writeFile(
  path.join(outputDirectory, "404.html"),
  createNotFoundPage(),
  "utf8",
);

console.log(
  `Exported ${routes.length} routes for GitHub Pages at ${siteUrl}/`,
);

function prepareStaticHtml(source, route) {
  const canonicalPath = route === "/" ? "/" : `${route}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const metadataBoundary = source.match(
    /<div hidden=""><!--\$\??--><div hidden="">([\s\S]*?)<\/div><!--\/\$--><\/div>/i,
  );
  const documentMetadata = rewriteSocialImageUrls(metadataBoundary?.[1] ?? "");

  let html = source
    .replace(metadataBoundary?.[0] ?? /$^/, "")
    .replace(
      /<script\b([^>]*)>[\s\S]*?<\/script>/gi,
      (script, attributes) =>
        /type=(?:"|')application\/ld\+json(?:"|')/i.test(attributes)
          ? script
          : "",
    )
    .replace(
      /<link\b(?=[^>]*\brel=(?:"|')(?:modulepreload|preload)(?:"|'))(?=[^>]*(?:\bas=(?:"|')script(?:"|')|\brel=(?:"|')modulepreload(?:"|')))[^>]*\/?\s*>/gi,
      "",
    )
    .replace(
      /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/og-editorial\.png/gi,
      `${siteUrl}/og-editorial.png`,
    )
    .replaceAll(`${origin}/og-editorial.png`, `${siteUrl}/og-editorial.png`)
    .replace(
      /\b(href|src|srcset|action|data)=("|')\/(?!\/)/gi,
      (_, attribute, quote) => `${attribute}=${quote}${basePath}/`,
    )
    .replace(
      "</head>",
      `${documentMetadata}<link rel="canonical" href="${canonicalUrl}"/><meta property="og:url" content="${canonicalUrl}"/></head>`,
    );

  if (!html.endsWith("\n")) {
    html += "\n";
  }

  return html;
}

function createNotFoundPage() {
  const homeUrl = `${siteUrl}/`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${homeUrl}" />
    <title>Page not found | Hyeseon Noh</title>
    <link rel="canonical" href="${homeUrl}" />
  </head>
  <body>
    <p>That page could not be found. <a href="${homeUrl}">Return home</a>.</p>
  </body>
</html>
`;
}

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function rewriteSocialImageUrls(value) {
  return value
    .replace(
      /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/og-editorial\.png/gi,
      `${siteUrl}/og-editorial.png`,
    )
    .replaceAll(`${origin}/og-editorial.png`, `${siteUrl}/og-editorial.png`);
}
