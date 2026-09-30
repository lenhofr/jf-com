# content/

Source of truth for site content that isn't page copy. Today that's
`content/blog/` — one markdown file per blog post.

`content/blog/` is the folder Decap CMS's GitHub backend commits into (see
`frontend/public/admin/config.yml`), so it lives at the repo root rather than
under `frontend/`. This README deliberately sits one level
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
branch; nothing reaches the live site until that PR is merged. The exception is
deleting a published post, which Decap commits straight to `main`, and that
deploys immediately. The category
dropdown in `frontend/public/admin/config.yml` must match `postCategories` in
`site.ts` — the generator checks this and fails the build if they diverge.

## Frontmatter

| Field      | Required | Notes                                                                           |
| ---------- | -------- | ------------------------------------------------------------------------------- |
| `title`    | yes      | Non-empty string.                                                               |
| `slug`     | yes      | URL segment, `a-z0-9` and hyphens. Must be unique. Drives `/blog/<slug>`.       |
| `date`     | yes      | **ISO `YYYY-MM-DD`.** Displayed as `March 2026`; also the sort key.             |
| `category` | yes      | Must be one of `postCategories` in `frontend/src/data/site.ts`.                 |
| `excerpt`  | yes      | Teaser copy shown on `/blog`, `/insights`, and the home page.                   |
| `image`    | no       | Site path, e.g. `/images/blog/foo.jpg`. Framed at 1.91:1, also the share image. |
| `imageAlt` | if image | Alt text. Required whenever `image` is set; the build fails without it.         |
| `draft`    | no       | `true` omits the post from the build entirely. Defaults to `false`.             |

The body is everything after the closing `---`, rendered as markdown.

**Dates are stored ISO and formatted for display.** The site never prints the
raw value — `formatPostDate()` in `site.ts` turns `2026-03-12` into
`March 2026`. Storing a human string like `"March 2026"` here fails the build.

HTML comments are stripped from the body before it reaches the site.
`react-markdown` escapes raw HTML rather than dropping it, so a comment left in
would otherwise render as visible text on the page.

## Review flags

The generator recognises two HTML comments at the top of a post body and warns
about each flagged post by name on every build:

- `<!-- GHOSTWRITTEN ... -->`: the body was drafted for Jesse and has not been
  approved by him.
- `<!-- PLACEHOLDER POST ... -->`: the whole post, title included, is invented.

The original ghostwritten and placeholder posts were deleted on 2026-09-30, so
none are in use today. Use the flags if drafted content is ever added again: a
licensed attorney's byline should not carry words he has not approved.
