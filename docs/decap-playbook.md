# Decap CMS playbook — porting this setup to another static site

Written after doing it on `lenhofr/jf-com`. Everything below is either a
decision worth repeating or a trap that cost time. The four planning docs in
the `lenhofr/cms` repo (`cms_files/01`–`04`) describe the intended shape; this
file is the corrected version, written against a build that actually shipped.

## What you are building

Markdown files with frontmatter become the source of truth for blog content.
A build-time Node script compiles them into a JSON file the React app imports.
Decap CMS gives non-technical editors a UI that commits those markdown files
back to GitHub through a pull request.

Nothing about the hosting changes. Decap is a static bundle in `public/admin/`,
so it rides whatever deploy already exists — no new bucket, distribution, or
workflow step.

```
content/blog/*.md          <- source of truth, repo ROOT, what Decap commits
    │
    │  scripts/generate-posts.mjs   (npm prebuild/predev hook)
    ▼
src/data/posts.generated.json   <- build artifact, gitignored
    │
    ▼
React pages import it exactly like the old hardcoded array
```

## Prerequisites you already have

- **The OAuth broker is shared and already deployed** at
  `https://cms-auth.lenhof.dev` (from `lenhofr/cms-oauth`). It performs the
  OAuth code exchange that cannot happen in a browser, and serves every site we
  own. New sites just point at it — there is nothing to deploy per site.
- Access control is entirely GitHub repo collaborators. There is no user
  database. Whoever can open and merge PRs on the repo can edit the site.

## Order of work

1. Migrate content to `content/blog/*.md`.
2. Write the generator and wire the npm hooks.
3. Repoint the data layer, keeping the old export name so pages don't change.
4. Add `public/admin/{index.html,config.yml}`.
5. Verify the CloudFront invalidation covers `/admin/*`.
6. Test with `local_backend: true`, then **remove that line**.

---

## The gotchas, in rough order of how much they cost

### 1. Dates. This is the one that breaks silently.

Hardcoded post arrays almost always store a human display string — `"July 2026"`,
`"March 2026"`. Decap's datetime widget and any date-descending sort both need
ISO. So: **store ISO in frontmatter, format for display**, and the rendered page
must look byte-identical to before.

Three separate traps:

**a. YAML parses unquoted dates into `Date` objects.** Decap writes them
unquoted (`date: 2026-03-12`), so `gray-matter` hands you a `Date`, not a
string. Handle both spellings.

**b. Never parse with `new Date()` for display.** `new Date("2026-03-01")` is
UTC midnight; formatted in any timezone behind UTC it renders as
*February 28* — the post silently shows the wrong month. Parse the string with
a regex and index a month-name array:

```ts
export function formatPostDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return iso
  return `${MONTHS[Number(m[2]) - 1]} ${m[1]}`
}
```

**c. Set `picker_utc: true`** on the Decap datetime widget, or an editor picking
a date in a timezone behind UTC stores the previous day.

### 2. `react-markdown` escapes raw HTML — it does not drop it

An HTML comment left in a body renders as **literal visible text on the page**.
This bit us: a `<!-- PLACEHOLDER -->` marker showed up at the top of every post.

Strip HTML comments in the generator (after reading them for build warnings, if
you use them as flags):

```js
body.replace(/<!--[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n").trim()
```

Tell editors in a Decap `hint` that raw HTML will not render.

### 3. `content/` goes at the repo root, and keep docs OUT of the collection folder

Decap's GitHub backend commits relative to the **repo root**, not relative to a
`frontend/` subdirectory. So `folder: content/blog` regardless of where the app
lives.

And: **any `.md` inside the collection folder is a post**, to both the generator
and Decap. A `content/blog/README.md` shows up as a post in the CMS. Put docs
one level up at `content/README.md`.

### 4. npm `pre` hooks are per-script

`prebuild` fires for `build` only. If the repo also has `build:dev`, it needs
its own `prebuild:dev` or that path silently ships stale JSON.

```json
"generate:posts": "node scripts/generate-posts.mjs",
"predev":         "npm run generate:posts",
"prebuild":       "npm run generate:posts",
"prebuild:dev":   "npm run generate:posts"
```

No CI change is needed — CI already calls `npm run build`.

**Dev limitation:** markdown edits do not hot-reload; the generator runs once at
startup. Re-run `npm run generate:posts` in a second terminal, or restart.

### 5. The generated JSON is a build artifact — gitignore it

Committing it means every content edit produces a second, conflict-prone diff.
The tradeoff: a fresh clone has no JSON until something regenerates it, so the
TS import will not resolve in an editor until you run it once. Document that.

You may need `"resolveJsonModule": true` in the app tsconfig.

### 6. CloudFront invalidation must cover the admin UI

If the workflow invalidates a path list like `"/index.html" "/" "/assets/*"`,
the Decap bundle under `/admin/` is **never invalidated** and `config.yml` edits
serve stale for the full TTL.

Use `--paths "/*"`. It is a single billable invalidation path (1000/month free),
so it costs exactly what a three-path list costs and is strictly more correct.

### 7. Category/tag lists exist in two places and nothing syncs them

The app has a canonical list; Decap's `select` widget has its own copy. Have the
generator read the app's list (regex it out of the source file) and **fail the
build** if `config.yml`'s options diverge. Otherwise an editor picks a value the
site rejects and only finds out after writing a whole post.

### 8. Decap cannot make one field conditionally required

`imageAlt` should be required *only when* `image` is set. Decap has no way to
express that. Enforce it in the generator so it fails CI on the pull request
rather than shipping an unlabelled image.

Also: **editors write bad alt text.** Ours arrived as `jessehead`. Put a real
`hint` on the field explaining it is read aloud.

### 9. `local_backend: true` must come out before deploying

It bypasses OAuth *and* the editorial workflow entirely — which defeats the
whole approval story. Treat it as a hard pre-deploy checklist item.

Local testing: add the line, run `npx decap-server` alongside the dev server,
visit `/admin/`.

### 10. `publish_mode: editorial_workflow` IS the approval gate

It makes Decap open a PR on a `cms/<slug>` branch instead of committing to
`main`. GitHub's PR review is the approval UI — there is nothing else to build.
Removing that line lets an editor publish to the live site unreviewed.

### 11. `slug: "{{fields.slug}}"`, not `"{{slug}}"`

`{{slug}}` derives the filename from the *title*, which can drift from an
editable `slug` field, so the filename and the URL diverge. Naming the file from
the slug field keeps them locked together. Warn on mismatch in the generator.

### 12. Fail loudly, and fail before the bundler runs

The generator is the only content-schema validation that will ever exist.
Collect **every** error across all files, print them all, exit non-zero. Verify
the bundler never runs — check the exit code directly, not through a pipe
(`$?` after `| tail` is `tail`'s status, not npm's).

Worth failing on: missing/empty required fields, non-ISO dates, unknown
category, bad slug characters, duplicate slugs, image path not site-absolute,
`imageAlt` without `image`.

### 13. SPA deep links need CloudFront 403/404 → `/index.html` (200)

Required for `/blog/<slug>` to work on refresh. Both our sites already had it.
Side effect worth knowing: **every path returns HTTP 200**, so a 200 proves
nothing about routing. You must render the page to verify.

---

## Verification notes

- The site is an SPA, so `curl` returns an empty shell. Render with a headless
  browser to check anything.
- **`fullPage` screenshots misplace sticky headers** — the header gets painted
  at the scroll offset, mid-page. That is a capture artifact, not a bug. Confirm
  layout with a viewport-sized screenshot before "fixing" it.
- Playwright's npm package pins a chromium build number that may not match what
  is in `~/Library/Caches/ms-playwright`. Point at an installed one:
  `chromium.launch({ executablePath: ".../chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" })`
- Test the failure modes by actually breaking a file — a human date string, a
  missing title, a bad category, a duplicate slug — and confirm exit code 1.

## Decisions worth repeating

- Keep the existing export name (`export const posts`) when swapping the
  hardcoded array for the generated JSON, so consuming pages need no edit.
- Generate art or use an information panel for missing images rather than
  shipping captioned placeholder boxes. Real photos drop in later via a `src`
  prop with no other change.
- If content is drafted by an AI or a contractor and publishes under a named
  person's byline, flag it in the file **and** make the generator warn on every
  build. A flag that only lives in a commit message is invisible by next week.
