import { DEFAULT_IMAGE, SITE_URL, type PageMeta } from "@/data/seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Applies a page's meta to the live document after client-side navigation.
 * The prerendered HTML already carries the same values for the first load;
 * this keeps them right as the visitor moves between routes.
 */
export function applyPageMeta(meta: PageMeta, pathname: string) {
  const url = `${SITE_URL}${pathname === "/" ? "" : pathname.replace(/\/+$/, "")}`;
  const image = meta.image ?? DEFAULT_IMAGE;

  document.title = meta.title;
  setMeta("name", "description", meta.description);
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("name", "twitter:title", meta.title);
  setMeta("name", "twitter:description", meta.description);
  setMeta("name", "twitter:image", image);
  document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", url);
}
