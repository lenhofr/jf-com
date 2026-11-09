/**
 * Drafts one blog post with a model on Amazon Bedrock and writes it to
 * content/blog/<slug>.md.
 *
 * It does not publish anything. .github/workflows/draft-posts.yml commits the
 * file to a cms/blog/<slug> branch and opens a pull request labelled
 * decap-cms/pending_review, which is all Decap needs to show the draft in the
 * "In review" column of its Workflow tab. Jesse edits it there like any other
 * post, and merging (Decap's "Publish") is still the only way it goes live.
 *
 * The model is called through Bedrock's Converse API, so any Bedrock model
 * that supports tool use can be swapped in with DRAFT_MODEL_ID. Bedrock has no
 * built-in web search, so this script supplies its own research tools:
 * search_news and search_web (Bing's public RSS feeds, no key needed) and
 * fetch_page (a plain HTTP fetch reduced to text). Every link in the finished
 * post must be a page fetch_page actually read; drafts that cite anything else,
 * fall outside the length limits, or use em dashes and other stock AI phrasing
 * are sent back. Full write-up: docs/ai-draft-posts.md.
 *
 * Inputs (environment):
 *   AWS credentials   any source the default AWS chain reads; in Actions, the
 *                     OIDC role from infra/ai-account
 *   AWS_REGION        region to call Bedrock in (us-east-1)
 *   DRAFT_MODEL_ID    optional; Bedrock model or inference profile ID.
 *                     Default us.anthropic.claude-sonnet-4-6. The role in
 *                     infra/ai-account must allow whatever is set here.
 *   DRAFT_TOPIC       optional; a topic to write about instead of finding one
 *   PENDING_SLUGS     optional; space-separated slugs of open cms/blog drafts,
 *                     so a topic already waiting for review is not repeated
 *   GITHUB_OUTPUT     set by Actions; receives slug= and title=
 *   PR_BODY_PATH      where to write the pull request description
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import matter from "gray-matter";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const contentDir = path.join(repoRoot, "content/blog");
const siteTsPath = path.join(repoRoot, "frontend/src/data/site.ts");

const MODEL_ID = process.env.DRAFT_MODEL_ID?.trim() || "us.anthropic.claude-sonnet-4-6";
// Prompt caching and tool-result status are Anthropic-only Converse fields;
// other models reject them.
const IS_CLAUDE = MODEL_ID.includes("anthropic.");

// Same rule as the Decap slug field and generate-posts.mjs.
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Searches plus fetches across the whole run, so research can't wander.
const MAX_RESEARCH_CALLS = 16;
// Model round trips, including tool turns and correction requests.
const MAX_TURNS = 24;
// The prompt asks for 700-1,100 words. All three models in the trial overshot,
// so the limits are enforced, with a little slack.
const MIN_WORDS = 600;
const MAX_WORDS = 1250;
// Text returned from one fetched page, in characters.
const PAGE_CHAR_LIMIT = 15000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";

const fail = (message) => {
  console.error(`\n✖ draft-post: ${message}\n`);
  process.exit(1);
};

/** postCategories in site.ts is the canonical list; read it the way generate-posts.mjs does. */
function readCategories() {
  const source = fs.readFileSync(siteTsPath, "utf8");
  const match = source.match(/export\s+const\s+postCategories\s*=\s*\[([^\]]*)\]\s*as\s+const/);
  if (!match) fail("could not find postCategories in frontend/src/data/site.ts.");
  return [...match[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
}

function readExistingPosts() {
  return fs
    .readdirSync(contentDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const { data, content } = matter(fs.readFileSync(path.join(contentDir, name), "utf8"));
      return { ...data, date: String(data.date ?? "").slice(0, 10), body: content.trim() };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const categories = readCategories();
const existing = readExistingPosts();
const pendingSlugs = (process.env.PENDING_SLUGS ?? "").split(/\s+/).filter(Boolean);
const topic = process.env.DRAFT_TOPIC?.trim();
const today = new Date().toISOString().slice(0, 10);

// The published posts are the style guide. There are few enough to send whole;
// once the blog grows, send the newest handful instead.
const styleSamples = existing
  .slice(0, 3)
  .map((p) => `<post title="${p.title}" category="${p.category}">\n${p.body}\n</post>`)
  .join("\n\n");

const alreadyCovered = [
  ...existing.map((p) => `- ${p.title} (${p.slug}, ${p.date})`),
  ...pendingSlugs.map((s) => `- ${s} (draft awaiting review)`),
].join("\n");

const system = `You draft blog posts for jesseforeman.com, the site of Jesse Foreman: a Northern Kentucky attorney and NFL agent who writes about sports (NIL, college athletics, athlete representation), law (Kentucky personal injury and related practice), business, and technology. Posts are published in the first person under his name, after he reviews and edits them.

Your draft goes straight to Jesse's review queue. He is a busy lawyer, so a draft he can trust and lightly edit is worth far more than one he has to fact-check line by line.

Research tools: search_news finds recent news articles, search_web finds other pages (court, legislature, agency and NCAA pages), and fetch_page reads one page. Searches return only headlines and short snippets, which are not sources. You have ${MAX_RESEARCH_CALLS} research calls in total, so search with purpose. Some sites block fetching; if one fails, use another outlet's coverage of the same story.

Accuracy rules. These matter more than anything else, because the site is lawyer advertising under Kentucky's Rules of Professional Conduct:
- Every factual claim about a law, bill, ruling, vote, date, number or event must come from a page you read with fetch_page in this session. Link that page inline where you use it. Prefer primary sources (a legislature, court, agency or the organisation itself), otherwise a reputable news outlet.
- Only link pages you fetched successfully. Drafts that link anything else are sent back.
- Never cite a case, statute or rule you did not read. Do not add legal rules from memory, even well-known ones; rules change. If you are unsure of a detail, leave it out.
- No guarantees or predictions of results, no claims that Jesse is a "specialist", "expert" or "the best", and no client testimonials.
- Information, not legal advice: where a reader might act on the post, say that their situation needs individual advice, the way the existing posts do.

Style: match the existing posts below, which Jesse approved. Plain, confident, practical; short paragraphs; ## and ### headings phrased as the reader's questions where that fits; open with a bolded one- or two-sentence answer to the headline. 700 to 1,100 words: drafts outside ${MIN_WORDS}-${MAX_WORDS} words are sent back. Markdown only: raw HTML is not rendered on this site. Do not repeat the title as a heading at the top of the body, because the page already shows it.

Voice: the post must read as if Jesse wrote it, not as machine-written copy. Readers spot AI writing quickly, and it costs him their trust.
- No em dashes (—) or en dashes (–) anywhere, including in number ranges and scores: write "December 2 to 4" and "a 77-22 vote" (plain hyphen). Use a comma, period, colon or parentheses instead, or split the sentence. Drafts containing either dash are sent back. Direct quotations from sources stay word for word, dashes included.
- No "it's not X, it's Y" or "not just X, but Y" constructions. Say what the thing is.
- No throat-clearing or signposting: "Here's what you need to know", "Here's why", "Let's dive in", "Let's break it down", "In conclusion", "The bottom line", "Key takeaways". Start with the substance.
- Avoid stock words and phrases: navigate, landscape, crucial, pivotal, delve, robust, game-changer, "in today's ...", "it's worth noting", "when it comes to", ultimately, moreover, furthermore, additionally.
- Don't list three things just for rhythm, and don't stack adjectives.
- No dramatic one-line paragraphs or rhetorical questions answered in the next sentence (question headings are fine).
- Don't end with a paragraph that restates the post. End on the practical point: what the reader should watch for or do next.
- Prefer plain verbs and specific facts over intensifiers ("significant", "major", "critical").

<existing_posts>
${styleSamples}
</existing_posts>`;

const task = topic
  ? `Write a post about: ${topic}

Research it first so the post rests on current, sourced facts.`
  : `Find one development from roughly the last two weeks (today is ${today}) that Jesse's readers would want explained: athletes and families dealing with NIL and college sports, people injured in Northern Kentucky, or business owners. Prefer something with a concrete hook (a bill moving, a ruling, a new rule taking effect) over general commentary. Search, pick the single best topic, then fetch the sources you will rely on.`;

const user = `${task}

Do not cover something these posts and pending drafts already cover:
${alreadyCovered || "- (none yet)"}

When the draft is finished, call submit_draft exactly once.`;

// ---------------------------------------------------------------------------
// Research tools

const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

const stripTags = (s) => decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Bing's RSS output (news and web). Unofficial: if Bing changes it, this returns nothing. */
async function bingRss(kind, query) {
  const base = kind === "news" ? "https://www.bing.com/news/search" : "https://www.bing.com/search";
  const url = `${base}?q=${encodeURIComponent(query)}&format=rss&setlang=en-US&cc=US`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`search returned HTTP ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 10).map(([, item]) => {
    const field = (name) => {
      const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
      return m ? stripTags(m[1].replace(/^<!\[CDATA\[|\]\]>$/g, "")) : "";
    };
    let link = field("link");
    // News links go through a click tracker; the article URL is its url= parameter.
    try {
      link = new URL(link).searchParams.get("url") ?? link;
    } catch {}
    return { title: field("title"), url: link, date: field("pubDate"), snippet: field("description").slice(0, 300) };
  });
  if (items.length === 0) return "No results. Try different words.";
  return items
    .map((r, i) => `${i + 1}. ${r.title}\n   ${r.url}${r.date ? `\n   ${r.date}` : ""}${r.snippet ? `\n   ${r.snippet}` : ""}`)
    .join("\n");
}

const normalizeUrl = (u, { dropQuery = false } = {}) => {
  try {
    const url = new URL(u);
    url.hash = "";
    if (dropQuery) url.search = "";
    return url.href.replace(/\/$/, "");
  } catch {
    return u;
  }
};

/**
 * URLs fetch_page read successfully, both as requested and after redirects.
 * Each is also stored without its query string: search results often carry
 * tracking parameters (?src=partner, ?utm_source=...) that the model rightly
 * drops when it links the page. A link that keeps a query string still has to
 * match exactly, since some sites put the article ID there.
 */
const fetchedUrls = new Set();
const recordFetched = (u) => {
  fetchedUrls.add(normalizeUrl(u));
  fetchedUrls.add(normalizeUrl(u, { dropQuery: true }));
};

async function fetchPage(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("not a valid URL");
  }
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("only http and https URLs can be fetched");

  const res = await fetch(parsed, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html,text/plain;q=0.9" },
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}; this site may block automated reading, try another source`);
  const type = res.headers.get("content-type") ?? "";
  if (!/text\/html|text\/plain|xhtml/.test(type)) throw new Error(`cannot read ${type || "this content type"}`);

  const html = await res.text();
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const cleaned = html.replace(
    /<(script|style|noscript|svg|header|footer|nav|aside|form|iframe)\b[^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );
  // Article text lives in headings, paragraphs and list items; menus and
  // boilerplate mostly don't, and short fragments are dropped as noise.
  const blocks = [...cleaned.matchAll(/<(h[1-4]|p|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map(([, tag, inner]) => ({ tag: tag.toLowerCase(), text: stripTags(inner) }))
    .filter(({ tag, text }) => text.length >= (tag.startsWith("h") ? 4 : 40));
  let text = blocks.map(({ tag, text }) => (tag.startsWith("h") ? `## ${text}` : text)).join("\n\n");
  if (text.length < 500) text = stripTags(cleaned); // pages without paragraph markup
  if (text.length < 200) throw new Error("the page had almost no readable text (it may need a browser)");

  recordFetched(url);
  recordFetched(res.url);
  const truncated = text.length > PAGE_CHAR_LIMIT;
  return `URL: ${res.url}\nTitle: ${title}\n\n${text.slice(0, PAGE_CHAR_LIMIT)}${truncated ? "\n\n[truncated]" : ""}`;
}

const queryInput = (description) => ({
  type: "object",
  properties: { query: { type: "string", description } },
  required: ["query"],
});

const researchTools = {
  search_news: {
    description:
      "Search recent news articles. Returns up to 10 results with headline, URL, date and snippet. Snippets are not sources: fetch a page before relying on it.",
    inputSchema: queryInput("Search words, e.g. 'Kentucky NIL bill' or 'NCAA eligibility ruling'."),
    run: ({ query }) => bingRss("news", query),
  },
  search_web: {
    description:
      "Search the general web, for primary sources such as court, legislature, agency or NCAA pages. Returns up to 10 results with title, URL and snippet.",
    inputSchema: queryInput("Search words; add a site name to narrow it, e.g. 'ncaa.org eligibility model'."),
    run: ({ query }) => bingRss("web", query),
  },
  fetch_page: {
    description:
      "Read one web page and return its main text. Only pages read with this tool may be cited or linked in the post.",
    inputSchema: {
      type: "object",
      properties: { url: { type: "string", description: "Full http(s) URL from a search result or another page." } },
      required: ["url"],
    },
    run: ({ url }) => fetchPage(url),
  },
};

// ---------------------------------------------------------------------------
// The finished draft

const submitDraftSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "Headline, under 70 characters." },
    slug: {
      type: "string",
      description: "URL segment: lowercase letters, numbers and single hyphens, under 60 characters.",
    },
    category: { type: "string", enum: categories },
    excerpt: {
      type: "string",
      description: "One or two sentences shown on the blog list and in link previews.",
    },
    body: { type: "string", description: "The post in Markdown, without the title." },
    sources: {
      type: "array",
      description: "Every page the post's facts rely on. Each must be a page you read with fetch_page.",
      items: {
        type: "object",
        properties: { title: { type: "string" }, url: { type: "string" } },
        required: ["title", "url"],
      },
    },
    reviewer_notes: {
      type: "string",
      description:
        "For Jesse, not published: claims he should double-check, judgement calls you made, and anything you could not confirm.",
    },
  },
  required: ["title", "slug", "category", "excerpt", "body", "sources", "reviewer_notes"],
};

const toolConfig = {
  tools: [
    ...Object.entries(researchTools).map(([name, t]) => ({
      toolSpec: { name, description: t.description, inputSchema: { json: t.inputSchema } },
    })),
    {
      toolSpec: {
        name: "submit_draft",
        description:
          "Submit the finished post. Call once, after research is done. The post is not published; it goes to Jesse for review.",
        inputSchema: { json: submitDraftSchema },
      },
    },
  ],
};

const countWords = (markdown) =>
  markdown
    .replace(/\]\([^)]*\)/g, "]") // link targets aren't words
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;

// The clearest signs of machine-written prose. The prompt asks the model to
// avoid a longer list; only patterns with almost no legitimate use in these
// posts are enforced, so a court "ultimately" ruling doesn't bounce a draft.
const AI_TELLS = [
  [/[—–]/, "em or en dash"],
  [/\bit['’]?s not\b[^.!?\n]{1,80}?[,;:]\s*it['’]?s\b/i, `"it's not X, it's Y"`],
  [/\bnot (just|only|merely)\b[^.!?\n]{1,80}?\bbut\b/i, `"not just X, but Y"`],
  [/\bhere['’]?s (what|why|how|the thing)\b/i, `"here's what/why/how"`],
  [/\blet['’]?s (dive|break|unpack|take a (closer )?look)\b/i, `"let's dive in"`],
  [/\b(deep dive|delve|delving)\b/i, `"delve" / "deep dive"`],
  [/\bin today['’]?s\b/i, `"in today's ..."`],
  [/\bgame[- ]changer/i, `"game-changer"`],
  [/\b(the bottom line|key takeaways?|in conclusion)\b/i, `"bottom line" / "key takeaways" / "in conclusion"`],
  [/\bit['’]?s worth noting\b/i, `"it's worth noting"`],
];

// Quoted words are someone else's and stay verbatim, and URLs aren't prose, so
// blank out blockquotes, quotations and link targets before checking. Blanking
// with spaces keeps offsets, so matches can still be quoted from the original.
const blank = (s) => " ".repeat(s.length);
const proseOnly = (text) =>
  text
    .replace(/^>.*$/gm, blank)
    .replace(/"[^"\n]*"|“[^”\n]*”/g, blank)
    .replace(/\]\([^)]*\)/g, blank);

function findAiTells(draft) {
  const found = new Set();
  for (const [field, text] of [["title", draft.title], ["excerpt", draft.excerpt], ["body", draft.body]]) {
    if (typeof text !== "string") continue;
    const prose = proseOnly(text);
    for (const [re, label] of AI_TELLS) {
      for (const m of prose.matchAll(new RegExp(re.source, `${re.flags}g`))) {
        // Quote the text around the match so the model can find it.
        const start = Math.max(0, m.index - 70);
        const end = Math.min(text.length, m.index + m[0].length + 70);
        const quote = `${start > 0 ? "..." : ""}${text.slice(start, end).replace(/\s+/g, " ").trim()}${end < text.length ? "..." : ""}`;
        found.add(`${label} in ${field}: "${quote}"`);
      }
    }
  }
  return [...found];
}

function validateDraft(draft) {
  const problems = [];
  for (const field of submitDraftSchema.required) {
    if (draft?.[field] === undefined || draft[field] === "") problems.push(`missing ${field}`);
  }
  if (problems.length) return problems;
  if (typeof draft.body !== "string" || !Array.isArray(draft.sources)) return ["body must be text and sources a list"];

  if (!SLUG_RE.test(draft.slug)) problems.push(`slug "${draft.slug}" is not lowercase-hyphenated`);
  if (existing.some((p) => p.slug === draft.slug) || pendingSlugs.includes(draft.slug)) {
    problems.push(`slug "${draft.slug}" is already used`);
  }
  if (!categories.includes(draft.category)) problems.push(`unknown category "${draft.category}"`);
  if (/<[a-z!/][^>]*>/i.test(draft.body)) problems.push("body contains raw HTML");

  const words = countWords(draft.body);
  if (words < MIN_WORDS || words > MAX_WORDS) {
    problems.push(`body is ${words} words; it must be ${MIN_WORDS}-${MAX_WORDS} (aim for 700-1,100)`);
  }

  if (draft.sources.length === 0) problems.push("no sources");
  const unread = [
    ...draft.sources.map((s) => s?.url),
    ...[...draft.body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]),
  ].filter((u) => u && !fetchedUrls.has(normalizeUrl(u)));
  if (unread.length) {
    problems.push(
      `these links were not read with fetch_page in this session; fetch them or remove them: ${[...new Set(unread)].join(", ")}`,
    );
  }
  const bodyLinks = draft.body.match(/\]\(https?:\/\//g)?.length ?? 0;
  if (bodyLinks === 0) problems.push("the body links no sources inline");

  const tells = findAiTells(draft);
  if (tells.length) {
    problems.push(
      `rewrite these to remove machine-sounding phrasing (see the Voice rules; rephrase the sentence rather than swapping one word): ${tells.slice(0, 25).join("; ")}${tells.length > 25 ? `; and ${tells.length - 25} more like these` : ""}`,
    );
  }
  return problems;
}

// ---------------------------------------------------------------------------
// The conversation

const client = new BedrockRuntimeClient({});
const systemBlocks = [{ text: system }, ...(IS_CLAUDE ? [{ cachePoint: { type: "default" } }] : [])];
const messages = [{ role: "user", content: [{ text: user }] }];

const toolResult = (toolUseId, text, isError = false) => ({
  toolResult: {
    toolUseId,
    content: [{ text: isError ? `Error: ${text}` : text }],
    ...(IS_CLAUDE ? { status: isError ? "error" : "success" } : {}),
  },
});

let draft;
let researchCalls = 0;
let nudges = 0;
const usage = { inputTokens: 0, outputTokens: 0, cacheReadInputTokens: 0, cacheWriteInputTokens: 0 };

for (let turn = 0; turn < MAX_TURNS && !draft; turn++) {
  const response = await client.send(
    new ConverseCommand({
      modelId: MODEL_ID,
      system: systemBlocks,
      messages,
      toolConfig,
      inferenceConfig: { maxTokens: 16000 },
    }),
  );
  for (const key of Object.keys(usage)) usage[key] += response.usage?.[key] ?? 0;

  const { stopReason } = response;
  if (stopReason === "max_tokens") fail("the response hit maxTokens before finishing.");
  if (stopReason === "guardrail_intervened" || stopReason === "content_filtered") {
    fail(`the model's output was blocked (${stopReason}).`);
  }
  if (stopReason === "model_context_window_exceeded") fail("the conversation outgrew the model's context window.");

  const content = response.output?.message?.content ?? [];
  messages.push({ role: "assistant", content });

  const calls = content.filter((b) => b.toolUse).map((b) => b.toolUse);
  if (calls.length === 0) {
    if (++nudges > 2) fail("the model stopped without submitting a draft.");
    messages.push({ role: "user", content: [{ text: "Please call submit_draft with the finished post." }] });
    continue;
  }

  // Every tool call in a turn gets its result in one user message, in order.
  const results = [];
  for (const call of calls) {
    if (call.name === "submit_draft") {
      const problems = validateDraft(call.input);
      if (problems.length === 0) {
        draft = call.input;
        results.push(toolResult(call.toolUseId, "Draft accepted."));
      } else {
        console.warn(`Draft rejected: ${problems.join("; ")}`);
        results.push(toolResult(call.toolUseId, `Fix and call submit_draft again: ${problems.join("; ")}.`, true));
      }
      continue;
    }

    const tool = researchTools[call.name];
    if (!tool) {
      results.push(toolResult(call.toolUseId, `unknown tool ${call.name}`, true));
      continue;
    }
    if (researchCalls >= MAX_RESEARCH_CALLS) {
      results.push(
        toolResult(call.toolUseId, "research budget used up; write the post from what you have read and submit it", true),
      );
      continue;
    }
    researchCalls++;
    console.log(`  ${call.name} ${JSON.stringify(call.input)}`);
    try {
      results.push(toolResult(call.toolUseId, await tool.run(call.input ?? {})));
    } catch (err) {
      results.push(toolResult(call.toolUseId, err?.message ?? String(err), true));
    }
  }
  if (!draft) messages.push({ role: "user", content: results });
}
if (!draft) fail(`no valid draft after ${MAX_TURNS} turns.`);

console.log(
  `Model ${MODEL_ID}: ${researchCalls} research calls; tokens in ${usage.inputTokens} (cache read ${usage.cacheReadInputTokens}, cache write ${usage.cacheWriteInputTokens}), out ${usage.outputTokens}.`,
);

// Frontmatter matches what Decap writes, so the entry opens cleanly in the editor.
// No image: the site falls back to generated art until Jesse uploads one.
const file = matter.stringify(`\n${draft.body.trim()}\n`, {
  title: draft.title,
  slug: draft.slug,
  date: today,
  category: draft.category,
  excerpt: draft.excerpt,
  draft: false,
});
fs.writeFileSync(path.join(contentDir, `${draft.slug}.md`), file);

const prBody = `> [!WARNING]
> **AI-generated draft.** Nothing here has been checked by a person. Verify every legal and factual claim against the sources below before publishing. Merging this pull request (or pressing Publish in the CMS) puts it on the live site.

Edit it at https://jesseforeman.com/admin/#/workflow, or delete it from there if it isn't worth publishing.

## Notes for the reviewer

${draft.reviewer_notes.trim()}

## Sources

${draft.sources.map((s) => `- [${s.title}](${s.url})`).join("\n")}

---
Drafted by \`automation/draft-posts\` with \`${MODEL_ID}\` on Amazon Bedrock${topic ? ` on request: “${topic}”` : ""}.
`;
if (process.env.PR_BODY_PATH) fs.writeFileSync(process.env.PR_BODY_PATH, prBody);
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${draft.slug}\ntitle=${draft.title.replace(/\n/g, " ")}\n`);
}

console.log(`Drafted content/blog/${draft.slug}.md: ${draft.title}`);
