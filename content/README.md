# content/

Source of truth for site content that isn't page copy. Today that's
`content/blog/` — one markdown file per blog post.

`content/blog/` is the folder Decap CMS's GitHub backend commits into (see
`frontend/public/admin/config.yml` once that lands), so it lives at the repo
root rather than under `frontend/`. This README deliberately sits one level
above it: anything ending in `.md` inside `content/blog/` is treated as a post,
by both the generator and the CMS.

`frontend/scripts/generate-posts.mjs` reads this folder at build time and writes
`frontend/src/data/posts.generated.json`, which the React pages import. That
script runs automatically via npm's `prebuild` / `predev` hooks, so
`npm run build` and `npm run dev` both pick up content changes. It is the only
schema validation these files get, and it fails the build loudly on anything
invalid rather than rendering a broken post.

## Frontmatter

| Field      | Required | Notes                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------- |
| `title`    | yes      | Non-empty string.                                                         |
| `slug`     | yes      | URL segment, `a-z0-9` and hyphens. Must be unique. Drives `/blog/<slug>`. |
| `date`     | yes      | **ISO `YYYY-MM-DD`.** Displayed as `March 2026`; also the sort key.       |
| `category` | yes      | Must be one of `postCategories` in `frontend/src/data/site.ts`.           |
| `excerpt`  | yes      | Teaser copy shown on `/blog`, `/insights`, and the home page.             |
| `draft`    | no       | `true` omits the post from the build entirely. Defaults to `false`.       |

The body is everything after the closing `---`, rendered as markdown.

**Dates are stored ISO and formatted for display.** The site never prints the
raw value — `formatPostDate()` in `site.ts` turns `2026-03-12` into
`March 2026`. Storing a human string like `"March 2026"` here fails the build.

## ⚠️ Placeholder bodies

All six migrated posts have **lorem ipsum bodies** and are marked with an HTML
comment at the top:

```
<!-- PLACEHOLDER BODY — lorem ipsum. Needs real copy before this post is client-facing. -->
```

Their titles, excerpts, categories, and dates are real copy from the approved
mockup — only the bodies are filler, since the original `site.ts` array never
had bodies. The generator prints a warning listing every post still carrying
that marker. **Replace the bodies with real content before this site goes
client-facing.**
