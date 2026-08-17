# Hyeseon Noh Academic Website

A multi-page academic personal website built with React, TypeScript, Vinext,
and the Cloudflare-compatible Vite runtime.

## Pages

- `/` — Home
- `/research` — four research programs, publications, and current projects
- `/teaching` — teaching philosophy, courses, and featured activities
- `/cv` — web CV summary and optional PDF viewer/download
- `/about` — academic path and community engagement

## Run in VS Code

Requirements: Node.js 22.13 or newer.

    npm ci
    npm run dev

Open `http://localhost:3000`.

## Verify a production build

    npm run build
    npm test

To run the production output locally:

    npm run start

## Add the final CV PDF

The source folder did not include a CV PDF. When it is ready:

1. Save it as `public/hyeseon-noh-cv.pdf`.
2. Change `cvPdfAvailable` to `true` in `app/cv/page.tsx`.

The CV page will then show the same file in its inline viewer and download
button.

## Content updates

Research publications, projects, courses, and external links are centralized
in `app/data/siteContent.ts`. Shared navigation and contact details are in
`app/components/`.

## Deployment

The project supports two deployment targets:

- `npm run build` creates the Cloudflare Worker-compatible Vinext build used by
  OpenAI Sites.
- `npm run build:pages` renders the five routes as static HTML for GitHub Pages
  in `pages-dist/`.

Pushes to `main` are tested and deployed automatically by
`.github/workflows/deploy-pages.yml`. The public site is available at:

https://rsim89.github.io/hyeseon-noh-academic-website/

GitHub Pages runs Node.js during the build; the deployed result itself is
static HTML and CSS.
