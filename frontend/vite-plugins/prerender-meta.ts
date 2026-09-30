import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import {
  DEFAULT_IMAGE,
  SITE_URL,
  metaForPath,
  pageMeta,
  publishedPosts,
  type PageMeta,
} from "../src/data/seo";

/**
 * Link-preview crawlers (iMessage, Slack, Facebook, LinkedIn) read the raw HTML
 * and never run the app, so without this every URL previews as the homepage.
 *
 * After the build, this writes dist/<route>/index.html for each page and blog
 * post, each a copy of dist/index.html with that page's title, description,
 * canonical URL and share image in the <!-- page-meta --> block. The CloudFront
 * function in infra/terraform/main.tf serves /legal from /legal/index.html.
 * It also writes dist/sitemap.xml from the same route list.
 */

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function urlFor(route: string) {
  return route === "/" ? SITE_URL : `${SITE_URL}${route}`;
}

export function renderMetaTags(meta: PageMeta, route: string) {
  const url = urlFor(route);
  const image = meta.image ?? DEFAULT_IMAGE;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.startsWith("/blog/") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="Jesse L. Foreman, Esq." />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${escape(image)}" />`,
  ];
  // Only the default share image has known dimensions.
  if (!meta.image) {
    tags.push(
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
    );
  }
  tags.push(
    `<meta property="og:image:alt" content="${escape(meta.imageAlt ?? "Jesse L. Foreman, Esq. — Attorney & NFLPA Certified Contract Advisor")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(meta.title)}" />`,
    `<meta name="twitter:description" content="${escape(meta.description)}" />`,
    `<meta name="twitter:image" content="${escape(image)}" />`,
  );
  return tags.map((t) => `    ${t}`).join("\n");
}

const BLOCK = /<!-- page-meta -->[\s\S]*?<!-- \/page-meta -->/;

export function prerenderMeta(): Plugin {
  let outDir = "dist";
  return {
    name: "prerender-meta",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      if (!BLOCK.test(template)) {
        throw new Error("prerender-meta: index.html is missing the <!-- page-meta --> block.");
      }

      const routes = [...Object.keys(pageMeta), ...publishedPosts.map((p) => `/blog/${p.slug}`)];

      for (const route of routes) {
        const html = template.replace(
          BLOCK,
          `<!-- page-meta -->\n${renderMetaTags(metaForPath(route), route)}\n    <!-- /page-meta -->`,
        );
        const file =
          route === "/" ? path.join(outDir, "index.html") : path.join(outDir, route, "index.html");
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, html);
      }

      const lastmod = (route: string) =>
        publishedPosts.find((p) => `/blog/${p.slug}` === route)?.date.slice(0, 10);
      const sitemap = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ...routes.map((r) => {
          const mod = lastmod(r);
          return `  <url><loc>${urlFor(r)}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}</url>`;
        }),
        `</urlset>`,
        "",
      ].join("\n");
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
    },
  };
}
