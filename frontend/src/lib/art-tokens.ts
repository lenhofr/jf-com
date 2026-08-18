/**
 * Palette, tones, and seeding for the generated section art in
 * components/site/art.tsx.
 *
 * These live outside that file so it can export only components — mixing
 * component and non-component exports breaks React Fast Refresh, which the
 * repo's lint config flags.
 */

export const ART_PALETTE = {
  forest900: "#0F2E22",
  forest800: "#123A2B",
  forest700: "#1C5741",
  moss: "#4E8C5E",
  mint: "#7FBE92",
  mint50: "#E8F1EB",
  sage50: "#F5F7F5",
  gold: "#C9A227",
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
    from: "#EEF4EF",
    to: "#D7E5DB",
    line: "rgba(28,87,65,0.22)",
    lineStrong: "rgba(28,87,65,0.42)",
    accent: ART_PALETTE.moss,
  },
  dark: {
    from: ART_PALETTE.forest800,
    to: ART_PALETTE.forest900,
    line: "rgba(127,190,146,0.20)",
    lineStrong: "rgba(127,190,146,0.42)",
    accent: ART_PALETTE.mint,
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
  Contracts: ART_PALETTE.moss,
  NIL: ART_PALETTE.gold,
  Draft: ART_PALETTE.forest700,
  Career: ART_PALETTE.mint,
};

/** Accent colour for a post category, so the blog index reads as a set. */
export function categoryAccent(category?: string): string | undefined {
  return category ? CATEGORY_ACCENT[category] : undefined;
}
