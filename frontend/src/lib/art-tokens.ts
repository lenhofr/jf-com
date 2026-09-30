/**
 * Palette, tones, and seeding for the generated section art in
 * components/site/art.tsx.
 *
 * These live outside that file so it can export only components — mixing
 * component and non-component exports breaks React Fast Refresh, which the
 * repo's lint config flags.
 */

export const ART_PALETTE = {
  charcoal900: "#141414",
  charcoal800: "#1E1E1E",
  gold: "#C9A227",
  champagne: "#E0C871",
  silver: "#C6C8CA",
  greyMuted: "#8C8C8C",
} as const;

export type ArtTone = "light" | "dark";

export type ToneSpec = {
  from: string;
  to: string;
  line: string;
  lineStrong: string;
  accent: string;
};

export const ART_TONES: Record<ArtTone, ToneSpec> = {
  light: {
    // A wider gradient span and firmer strokes than the mockup's hatch: at
    // banner size, a near-flat tint reads as an image that failed to load.
    from: "#F4F4F3",
    to: "#D8D9DA",
    line: "rgba(70,70,70,0.22)",
    lineStrong: "rgba(70,70,70,0.42)",
    accent: ART_PALETTE.gold,
  },
  dark: {
    from: ART_PALETTE.charcoal800,
    to: ART_PALETTE.charcoal900,
    line: "rgba(224,200,113,0.20)",
    lineStrong: "rgba(224,200,113,0.42)",
    accent: ART_PALETTE.champagne,
  },
};

export const ART_VARIANT_COUNT = 6;

/** Stable string hash, so a given seed always picks the same composition. */
export function artHash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const CATEGORY_ACCENT: Record<string, string> = {
  Sports: ART_PALETTE.gold,
  Law: ART_PALETTE.champagne,
  Business: ART_PALETTE.silver,
  Technology: ART_PALETTE.greyMuted,
};

/** Accent colour for a post category, so the blog index reads as a set. */
export function categoryAccent(category?: string): string | undefined {
  return category ? CATEGORY_ACCENT[category] : undefined;
}
