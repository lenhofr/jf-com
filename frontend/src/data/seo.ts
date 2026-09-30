/**
 * Per-page titles, descriptions, and share images.
 *
 * Used twice: at runtime (SiteLayout sets document.title and the meta tags on
 * every navigation, for Google and the browser tab) and at build time (the
 * prerender plugin in vite.config.ts writes a copy of index.html per route with
 * these values baked in, for iMessage, Slack, Facebook and other link-preview
 * crawlers that never run JavaScript).
 *
 * Keep this module free of image and component imports: vite.config.ts loads it
 * in Node, where those do not resolve.
 */

import generatedPosts from "./posts.generated.json";

export const SITE_URL = "https://jesseforeman.com";
export const SITE_NAME = "Jesse L. Foreman, Esq.";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export type PageMeta = {
  title: string;
  description: string;
  /** Absolute URL. Defaults to the site-wide share image. */
  image?: string;
  imageAlt?: string;
};

const HOME: PageMeta = {
  title: `${SITE_NAME} | NFLPA Certified Contract Advisor & Attorney`,
  description:
    "Attorney and NFLPA Certified Contract Advisor in Northern Kentucky. Legal counsel, NFL representation, entrepreneur advisory, and speaking.",
};

/** Static routes, in sitemap order. */
export const pageMeta: Record<string, PageMeta> = {
  "/": HOME,
  "/about": {
    title: `About | ${SITE_NAME}`,
    description:
      "Helping ambitious people protect what they are building. Over $100 million in NFL contracts negotiated, a JD from the University of Cincinnati, and licensed to practice in Kentucky.",
  },
  "/legal": {
    title: `Legal Counsel | ${SITE_NAME}`,
    description:
      "Personal injury, corporate, and regulatory counsel in Kentucky. Understand the problem, evaluate the risks, and make the next decision count.",
  },
  "/nfl-agent": {
    title: `NFL Agent | ${SITE_NAME}`,
    description:
      "NFLPA Certified Contract Advisor for over a decade. Guiding clients through the most important decisions in their career and after.",
  },
  "/entrepreneur": {
    title: `Entrepreneur Advisory | ${SITE_NAME}`,
    description:
      "Venture vetting, startup formation, and regulatory guidance from a serial entrepreneur. Let's build the future together.",
  },
  "/speaking": {
    title: `Speaking & Media | ${SITE_NAME}`,
    description:
      "Keynotes, panels, and fireside chats on technology, business, NIL, and athlete representation. Featured in Forbes, Yahoo, Nasdaq, and ESPN.",
  },
  "/insights": {
    title: `Insights | ${SITE_NAME}`,
    description:
      "Trusted guidance for consequential decisions. The latest insights in sports, law, business, and technology.",
  },
  "/blog": {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Writing about the business, not the highlights. Everything I publish, in one place.",
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description:
      "Tell me what you're working through. Email info@jesseforeman.com or call (859) 880-8801. Every inquiry is read personally.",
  },
};

type GeneratedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  imageAlt?: string;
};

export const publishedPosts = generatedPosts as GeneratedPost[];

export function postMeta(post: GeneratedPost): PageMeta {
  return {
    title: `${post.title} | ${SITE_NAME}`,
    // Excerpts can run long; previews truncate around 160 characters anyway.
    description: post.excerpt.replace(/\s+/g, " ").trim(),
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    imageAlt: post.imageAlt,
  };
}

/** Meta for any path. Unknown paths get the homepage defaults. */
export function metaForPath(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (pageMeta[path]) return pageMeta[path];
  const slug = /^\/blog\/([^/]+)$/.exec(path)?.[1];
  const post = slug && publishedPosts.find((p) => p.slug === slug);
  return post ? postMeta(post) : HOME;
}
