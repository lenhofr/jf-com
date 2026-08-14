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

## ⚠️ Nothing here is finished content

There are two grades of placeholder, each flagged by an HTML comment at the top
of the body, and the generator warns about both — separately — on every build.

**`<!-- PLACEHOLDER BODY ... -->` — six posts.** Their titles, excerpts,
categories, and dates are real copy from the approved mockup; only the bodies
are lorem ipsum, since the original `site.ts` array never had bodies. Replace
the prose, keep the frontmatter.

**`<!-- PLACEHOLDER POST ... -->` — two posts.** Invented end to end: title,
excerpt, category, and date included. Nothing in them has been approved by
anyone. They exist only so the collection exceeds the `PAGE_SIZE = 6` on
`/blog`, which makes the "Load More" control reachable — with exactly six posts
it was unreachable dead code. They are dated oldest on purpose, so they sort to
the second page and never surface in the home page or `/insights` teasers.
Delete them once there is enough real content, or replace them.

**Neither grade may reach a client-facing deploy as-is.**
