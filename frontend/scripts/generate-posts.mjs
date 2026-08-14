/**
 * Reads the markdown blog posts in content/blog/ and writes
 * frontend/src/data/posts.generated.json for the React pages to import.
 *
 * Runs automatically via npm's prebuild/predev hooks, so `npm run build`
 * (which is what CI calls) regenerates the JSON without any workflow change.
 *
 * This is the ONLY schema validation blog content gets. Anything invalid is
 * collected and reported here, and the process exits non-zero — a bad post must
 * break the build, never render as a blank or half-broken page.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const contentDir = path.join(repoRoot, "content/blog");
const siteTsPath = path.join(repoRoot, "frontend/src/data/site.ts");
const outPath = path.join(repoRoot, "frontend/src/data/posts.generated.json");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Two grades of unfinished content, both flagged by an HTML comment at the top
 * of the body. BODY means the frontmatter is approved mockup copy and only the
 * prose is filler; POST means the whole entry is invented and nothing in it has
 * been approved. Both are warned about on every build.
 */
const PLACEHOLDER_BODY_MARKER = "<!-- PLACEHOLDER BODY";
const PLACEHOLDER_POST_MARKER = "<!-- PLACEHOLDER POST";

/** Prefix every failure so the reason is obvious in CI log noise. */
const fail = (message) => {
  console.error(`\n✖ generate-posts: ${message}\n`);
  process.exit(1);
};

/**
 * postCategories in site.ts stays the canonical category list, so read it from
 * there instead of keeping a second copy in sync by hand. If the shape of that
 * declaration ever changes, this throws rather than silently accepting anything.
 */
function readCanonicalCategories() {
  let source;
  try {
    source = fs.readFileSync(siteTsPath, "utf8");
  } catch {
    fail(`could not read ${path.relative(repoRoot, siteTsPath)} to load postCategories.`);
  }

  const match = source.match(/export\s+const\s+postCategories\s*=\s*\[([^\]]*)\]\s*as\s+const/);
  if (!match) {
    fail(
      `could not find 'export const postCategories = [...] as const' in ` +
        `${path.relative(repoRoot, siteTsPath)}. It is the canonical category list; ` +
        `if it was renamed or reformatted, update this script to match.`,
    );
  }

  const categories = [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  if (categories.length === 0) {
    fail(`postCategories in ${path.relative(repoRoot, siteTsPath)} is empty.`);
  }
  return categories;
}

/**
 * YAML parses an unquoted `date: 2026-03-12` into a Date, and Decap writes dates
 * unquoted. Normalise both spellings to a plain ISO day string, in UTC — using
 * local time would shift a first-of-the-month date into the previous month.
 */
function normaliseDate(value) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    return value.toISOString().slice(0, 10);
  }
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  // Tolerate a full ISO timestamp; the site only ever displays month + year.
  const dayPart = trimmed.includes("T") ? trimmed.slice(0, trimmed.indexOf("T")) : trimmed;
  if (!ISO_DATE_RE.test(dayPart)) return null;

  const [year, month, day] = dayPart.split("-").map(Number);
  const asDate = new Date(Date.UTC(year, month - 1, day));
  const roundTrips =
    asDate.getUTCFullYear() === year &&
    asDate.getUTCMonth() === month - 1 &&
    asDate.getUTCDate() === day;
  return roundTrips ? dayPart : null;
}

/** Drop HTML comments, then collapse the blank lines they leave behind. */
function stripHtmlComments(body) {
  return body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function requireString(data, field, errors, file) {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`${file}: '${field}' is required and must be a non-empty string.`);
    return null;
  }
  return value.trim();
}

function readPost(file, categories, errors) {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf8");

  let parsed;
  try {
    parsed = matter(raw);
  } catch (err) {
    errors.push(`${file}: frontmatter is not valid YAML — ${err.message}`);
    return null;
  }

  const { data, content } = parsed;
  if (!data || Object.keys(data).length === 0) {
    errors.push(`${file}: no frontmatter block found (expected a '---' fenced YAML header).`);
    return null;
  }

  const title = requireString(data, "title", errors, file);
  const slug = requireString(data, "slug", errors, file);
  const excerpt = requireString(data, "excerpt", errors, file);

  if (slug && !SLUG_RE.test(slug)) {
    errors.push(
      `${file}: 'slug' must be lowercase letters, digits and single hyphens (got "${slug}").`,
    );
  }

  const date = normaliseDate(data.date);
  if (!date) {
    errors.push(
      `${file}: 'date' must be an ISO calendar date, e.g. "2026-03-12" (got ${JSON.stringify(
        data.date,
      )}). Human strings like "March 2026" are formatted at render time, not stored.`,
    );
  }

  const category = typeof data.category === "string" ? data.category.trim() : null;
  if (!category) {
    errors.push(`${file}: 'category' is required and must be a string.`);
  } else if (!categories.includes(category)) {
    errors.push(
      `${file}: 'category' "${category}" is not one of ${categories.join(", ")} ` +
        `(the postCategories list in src/data/site.ts).`,
    );
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    errors.push(`${file}: 'draft' must be true or false (got ${JSON.stringify(data.draft)}).`);
  }

  // react-markdown escapes raw HTML rather than dropping it, so an editorial
  // <!-- comment --> would render as literal text on the page. Strip comments
  // here — after noting the placeholder marker, which is one of them.
  const rawBody = content.trim();
  const placeholderBody = rawBody.includes(PLACEHOLDER_BODY_MARKER);
  const placeholderPost = rawBody.includes(PLACEHOLDER_POST_MARKER);
  const body = stripHtmlComments(rawBody);
  if (body === "") {
    errors.push(`${file}: post body is empty.`);
  }

  const expectedFile = slug ? `${slug}.md` : null;
  if (expectedFile && expectedFile !== file) {
    console.warn(
      `⚠ generate-posts: ${file} declares slug "${slug}" — the URL will be /blog/${slug}, ` +
        `not /blog/${file.replace(/\.md$/, "")}.`,
    );
  }

  if (!title || !slug || !excerpt || !date || !category || body === "") return null;

  return {
    title,
    slug,
    date,
    category,
    excerpt,
    body,
    placeholderBody,
    placeholderPost,
    draft: data.draft === true,
    file,
  };
}

function main() {
  if (!fs.existsSync(contentDir)) {
    fail(`content directory ${path.relative(repoRoot, contentDir)} does not exist.`);
  }

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (files.length === 0) {
    fail(`no .md files found in ${path.relative(repoRoot, contentDir)}.`);
  }

  const categories = readCanonicalCategories();
  const errors = [];
  const posts = files.map((file) => readPost(file, categories, errors)).filter(Boolean);

  const seen = new Map();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      errors.push(
        `${post.file}: duplicate slug "${post.slug}", already used by ${seen.get(post.slug)}.`,
      );
    } else {
      seen.set(post.slug, post.file);
    }
  }

  if (errors.length > 0) {
    fail(
      `${errors.length} content error(s) in content/blog:\n\n` +
        errors.map((e) => `  • ${e}`).join("\n"),
    );
  }

  const published = posts
    .filter((post) => !post.draft)
    // Newest first. Slug breaks ties so the output is stable across machines.
    .sort((a, b) =>
      a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date),
    );

  if (published.length === 0) {
    console.warn("⚠ generate-posts: every post is marked draft — the blog will render empty.");
  }

  const wholesalePlaceholders = published.filter((post) => post.placeholderPost);
  if (wholesalePlaceholders.length > 0) {
    console.warn(
      `⚠ generate-posts: ${wholesalePlaceholders.length} post(s) are placeholders end to end — ` +
        `title, excerpt, category and date are invented, not approved copy. Delete or replace ` +
        `before this site is client-facing:\n` +
        wholesalePlaceholders.map((p) => `    - ${p.slug}`).join("\n"),
    );
  }

  const placeholderBodies = published.filter(
    (post) => post.placeholderBody && !post.placeholderPost,
  );
  if (placeholderBodies.length > 0) {
    console.warn(
      `⚠ generate-posts: ${placeholderBodies.length} post(s) have approved frontmatter but ` +
        `placeholder lorem ipsum bodies, and need real content before this site is ` +
        `client-facing:\n` +
        placeholderBodies.map((p) => `    - ${p.slug}`).join("\n"),
    );
  }

  // Only the fields the site renders reach the bundle — draft/file/hasPlaceholder
  // are build-time bookkeeping.
  const output = published.map(({ title, slug, date, category, excerpt, body }) => ({
    title,
    slug,
    date,
    category,
    excerpt,
    body,
  }));

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);

  const skipped = posts.length - published.length;
  console.log(
    `generate-posts: wrote ${published.length} post(s) to ` +
      `${path.relative(repoRoot, outPath)}${skipped > 0 ? ` (${skipped} draft skipped)` : ""}.`,
  );
}

main();
