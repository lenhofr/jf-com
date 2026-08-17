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

## Editing via the CMS

Editors use the Decap admin UI at https://jesseforeman.com/admin/ rather than
editing these files by hand. Saving there opens a pull request on a `cms/`
branch; nothing reaches the live site until that PR is merged. The category
dropdown in `frontend/public/admin/config.yml` must match `postCategories` in
`site.ts` — the generator checks this and fails the build if they diverge.

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

HTML comments are stripped from the body before it reaches the site.
`react-markdown` escapes raw HTML rather than dropping it, so a comment left in
would otherwise render as visible text on the page.

## ⚠️ Every post is ghostwritten and unapproved

The lorem ipsum is gone — all eight posts now have real, substantive bodies. But
none of them was written by Jesse, and they publish under his byline. Two grades
of flag, each an HTML comment at the top of the body, each warned about
separately by the generator on every build:

**`<!-- GHOSTWRITTEN ... -->` — six posts.** Titles, excerpts, categories, and
dates are approved mockup copy. The bodies were drafted for him and have not
been reviewed by him. They are deliberately educational and general: contract
and NIL mechanics, no client names, no deal figures, no case outcomes, nothing
asserted about his personal history that is not already elsewhere in this repo.
That keeps the exposure low, but it does not make them his words.

**`<!-- PLACEHOLDER POST ... -->` — two posts.** Everything invented, title and
excerpt included. They exist only so the collection exceeds `PAGE_SIZE = 6` in
`Blog.tsx`, which makes the "Load More" control reachable — with exactly six
posts it was unreachable dead code. Dated oldest on purpose, so they sort to the
second page and never surface in the home page or `/insights` teasers. Deleting
the two files is the whole rollback.

**A licensed attorney's byline is not a placeholder.** Jesse should read all
eight before this counts as client-facing, and the two invented ones need his
sign-off on the premise, not just the prose. `docs/content-review.md` is the
checklist.
