import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ART_PALETTE,
  ART_TONES,
  ART_VARIANT_COUNT,
  categoryAccent,
  artHash,
  type ArtTone,
  type ToneSpec,
} from "@/lib/art-tokens";

export type { ArtTone };

/* ------------------------------------------------------------------ *
 * Generated section art.
 *
 * The mockup left every image as a hatched placeholder, and most of the
 * photography it calls for does not exist yet — and cannot be invented,
 * since it depicts a real person, real clients, and real rooms. Rather
 * than ship hatched boxes captioned "Panel photo", unfilled slots render
 * a piece of generated art from this file.
 *
 * The motif is drawn from a football field: yard lines, hash marks,
 * numbered strata. It reads as a deliberate graphic language rather than
 * a missing asset, and every composition is deterministic — the same
 * seed always produces the same artwork, so a post's card and its banner
 * match, and nothing shifts between builds.
 *
 * All of it is inline SVG: no network requests, no binary assets, and it
 * stays sharp at any size. Swap in a real photograph by passing `src` to
 * ImageSlot and the art steps aside.
 * ------------------------------------------------------------------ */

/* Each composition draws into a 400×300 viewBox and is sliced to fill,
   so the same artwork works in a square tile and a wide banner. */

function YardLines({ t, accent }: { t: ToneSpec; accent: string }) {
  const xs = [40, 80, 120, 160, 200, 240, 280, 320, 360];
  return (
    <>
      {xs.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="300"
          stroke={i === 4 ? t.lineStrong : t.line}
          strokeWidth={i === 4 ? 2 : 1}
        />
      ))}
      {xs.map((x) => (
        <g key={`h${x}`} stroke={t.line} strokeWidth="1">
          <line x1={x - 7} y1="108" x2={x + 7} y2="108" />
          <line x1={x - 7} y1="192" x2={x + 7} y2="192" />
        </g>
      ))}
      <rect x="196" y="120" width="8" height="60" fill={accent} opacity="0.9" />
    </>
  );
}

function Contour({ t, accent }: { t: ToneSpec; accent: string }) {
  return (
    <>
      {[60, 110, 160, 210, 260, 310, 360].map((r, i) => (
        <circle
          key={r}
          cx="60"
          cy="250"
          r={r}
          fill="none"
          stroke={i === 2 ? t.lineStrong : t.line}
          strokeWidth={i === 2 ? 1.75 : 1}
        />
      ))}
      <circle cx="60" cy="250" r="13" fill={accent} opacity="0.92" />
    </>
  );
}

function Strata({ t, accent }: { t: ToneSpec; accent: string }) {
  const bands = [
    { y: 42, h: 3 },
    { y: 74, h: 1 },
    { y: 104, h: 1 },
    { y: 150, h: 8 },
    { y: 196, h: 1 },
    { y: 224, h: 1 },
    { y: 252, h: 3 },
  ];
  return (
    <>
      {bands.map((b, i) => (
        <rect
          key={b.y}
          x="0"
          y={b.y}
          width="400"
          height={b.h}
          fill={i === 3 ? accent : t.line}
          opacity={i === 3 ? 0.85 : 1}
        />
      ))}
      <rect x="268" y="0" width="1.5" height="300" fill={t.lineStrong} />
    </>
  );
}

function Weave({ t, accent }: { t: ToneSpec; accent: string }) {
  const lines = [];
  for (let i = -300; i <= 400; i += 26) {
    lines.push(i);
  }
  return (
    <>
      {lines.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x + 300}
          y2="300"
          stroke={i % 4 === 0 ? t.lineStrong : t.line}
          strokeWidth="1"
        />
      ))}
      <path d="M400 0 L400 128 L272 0 Z" fill={accent} opacity="0.88" />
    </>
  );
}

function Orbit({ t, accent }: { t: ToneSpec; accent: string }) {
  return (
    <>
      <circle cx="290" cy="96" r="118" fill="none" stroke={t.line} strokeWidth="1" />
      <circle cx="290" cy="96" r="74" fill="none" stroke={t.lineStrong} strokeWidth="1.75" />
      <circle cx="290" cy="96" r="30" fill={accent} opacity="0.9" />
      <line x1="0" y1="228" x2="400" y2="228" stroke={t.lineStrong} strokeWidth="1.5" />
      <line x1="0" y1="252" x2="400" y2="252" stroke={t.line} strokeWidth="1" />
      <line x1="0" y1="276" x2="400" y2="276" stroke={t.line} strokeWidth="1" />
    </>
  );
}

function Grid({ t, accent }: { t: ToneSpec; accent: string }) {
  const cells = [];
  for (let r = 0; r < 6; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      cells.push({ r, c });
    }
  }
  return (
    <>
      {cells.map(({ r, c }) => {
        const onDiagonal = r + 2 === c || r + 3 === c;
        return (
          <rect
            key={`${r}-${c}`}
            x={c * 50 + 8}
            y={r * 50 + 4}
            width="34"
            height="34"
            fill={onDiagonal ? accent : "none"}
            opacity={onDiagonal ? 0.85 : 1}
            stroke={onDiagonal ? "none" : t.line}
            strokeWidth="1"
          />
        );
      })}
    </>
  );
}

const VARIANTS = [YardLines, Contour, Strata, Weave, Orbit, Grid];

/**
 * Decorative generated panel. Purely presentational — it is marked
 * aria-hidden and carries no alternative text, because it depicts
 * nothing. Callers that need an accessible name should label the
 * surrounding element.
 */
export function FieldArt({
  seed = "jf",
  tone = "light",
  accent,
  variant,
  className,
  children,
}: {
  seed?: string;
  tone?: ArtTone;
  accent?: string;
  variant?: number;
  className?: string;
  children?: ReactNode;
}) {
  const t = ART_TONES[tone];
  const h = artHash(seed);
  const pick = variant ?? h % ART_VARIANT_COUNT;
  const Composition = VARIANTS[pick % ART_VARIANT_COUNT];
  const gradientId = `art-${pick}-${tone}-${h % 9973}`;

  return (
    // `flex` lets a caller set only a min-height: the content column stretches
    // to fill it, and grows past it rather than being clipped.
    <div className={cn("relative flex overflow-hidden", className)}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.from} />
            <stop offset="100%" stopColor={t.to} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gradientId})`} />
        <Composition t={t} accent={accent ?? t.accent} />
      </svg>
      {children && (
        <>
          {/* Scrim: the art carries real contrast, so text over it needs the
              pattern knocked back or the two compete. */}
          <div
            className={cn("absolute inset-0", tone === "dark" ? "bg-forest-900/70" : "bg-white/75")}
            aria-hidden="true"
          />
          <div className="relative flex w-full flex-col justify-center">{children}</div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Blog article art
 * ------------------------------------------------------------------ */

/**
 * Art for a post that has no uploaded image. Seeded by slug so a post
 * looks the same on its card and on its own page, and coloured by
 * category so the blog index reads as a set.
 */
export function PostArt({
  slug,
  category,
  tone = "light",
  className,
}: {
  slug: string;
  category?: string;
  tone?: ArtTone;
  className?: string;
}) {
  return (
    <FieldArt seed={slug} tone={tone} accent={categoryAccent(category)} className={className} />
  );
}

/* ------------------------------------------------------------------ *
 * Named panels used in place of specific missing photographs
 * ------------------------------------------------------------------ */

/**
 * Editorial panel: generated art behind a short piece of real content.
 * Used where the mockup called for a photograph that does not exist —
 * a credential list or pull quote carries more than a stock photo would.
 */
export function StatementPanel({
  eyebrow,
  children,
  seed = "statement",
  tone = "dark",
  variant,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  seed?: string;
  tone?: ArtTone;
  variant?: number;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <FieldArt seed={seed} tone={tone} variant={variant} className={className}>
      <div className="flex flex-col justify-center px-7 py-9 md:px-9">
        {eyebrow && (
          <p
            className={cn(
              "m-0 mb-5 text-[11px] font-medium uppercase leading-none tracking-[0.2em]",
              dark ? "text-mint" : "text-moss",
            )}
          >
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </FieldArt>
  );
}

/** A labelled list of facts, for use inside StatementPanel. */
export function FactList({
  items,
  tone = "dark",
}: {
  items: { label: string; value: string }[];
  tone?: ArtTone;
}) {
  const dark = tone === "dark";
  return (
    <dl className="m-0 flex flex-col gap-[14px]">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col gap-[3px] border-t pt-[11px]",
            dark ? "border-white/20" : "border-forest-900/15",
          )}
        >
          <dt
            className={cn(
              "font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.1em]",
              dark ? "text-mint" : "text-moss",
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              "m-0 text-[14px] font-semibold leading-[1.35]",
              dark ? "text-white" : "text-forest-900",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Role tile standing in for a headshot on "The Bench". The people are
 * real but unnamed here, so this shows a numbered marker rather than a
 * fabricated face or name.
 */
export function RoleTile({ index, className }: { index: number; className?: string }) {
  return (
    <FieldArt
      seed={`bench-${index}`}
      tone="dark"
      variant={index % ART_VARIANT_COUNT}
      // Bordered: these sit on a forest section, and without an edge the tile
      // and the background read as one dark shape.
      className={cn("border border-white/[0.18]", className)}
    >
      <div className="flex w-full items-end p-4">
        <span className="font-mono text-[11px] font-semibold leading-none tracking-[0.12em] text-mint">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </FieldArt>
  );
}

/**
 * Affiliation shown as a typographic wordmark. These are other
 * organisations' marks, which this site has no licence to reproduce, so
 * the name is set in the site's own type instead of faking a logo.
 */
export function WordmarkTile({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[10px] border border-forest-900/[0.12] bg-sage-50 px-4 text-center transition-colors hover:border-moss/45",
        className,
      )}
    >
      <span className="font-display text-[15px] font-semibold leading-[1.2] tracking-[-0.01em] text-forest-800">
        {name}
      </span>
      <span className="h-px w-8 bg-moss/45" />
    </div>
  );
}
