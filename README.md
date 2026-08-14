# jf-com

## Run locally

This repo’s web app lives in `frontend/` and is built with Vite + React.

### Prerequisites

- Node.js (18+ recommended)
- npm

### Install

```bash
cd frontend
npm ci
```

### Start dev server

```bash
cd frontend
npm run dev
```

Vite will print the local URL (typically `http://127.0.0.1:5173/`).

### Production build

```bash
cd frontend
npm run build
```

### Preview the production build

```bash
cd frontend
npm run preview
```

## Blog content

Blog posts are markdown files with frontmatter in [`content/blog/`](content/README.md)
at the repo root — not in `frontend/`, because that is where Decap CMS's GitHub
backend commits. Page copy other than blog posts still lives in
`frontend/src/data/site.ts`.

`frontend/scripts/generate-posts.mjs` compiles that folder into
`frontend/src/data/posts.generated.json`, which the React pages import. It runs
automatically through npm's `prebuild` / `predev` hooks, so `npm run build` and
`npm run dev` both pick up content changes with no extra step — including in CI,
which just calls `npm run build`. Run it on its own with:

```bash
cd frontend
npm run generate:posts
```

`posts.generated.json` is **gitignored**: it is a build artifact, and committing
it would mean every content edit produced a second, conflict-prone diff. The
tradeoff is that a fresh clone has no JSON until something regenerates it, so
run `npm run generate:posts` (or any `npm run dev` / `npm run build`) once after
cloning or the TypeScript import will not resolve in your editor.

The generator is the only schema validation blog content gets, so it is
deliberately strict: any missing or malformed frontmatter field prints every
problem it found and exits non-zero, failing the build rather than shipping a
broken post. Dates are stored ISO (`2026-03-12`) and formatted for display
(`March 2026`) by `formatPostDate()` in `site.ts`.

> **Heads up:** the six migrated posts have lorem ipsum bodies. Their titles,
> excerpts, categories, and dates are approved copy; the bodies are not. The
> generator prints a warning naming each one. Replace them before this site is
> client-facing.
