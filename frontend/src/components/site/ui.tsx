import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FieldArt } from "./art";
import type { Faq, Quote } from "@/data/site";

/* ------------------------------------------------------------------ *
 * Shared primitives. Sizes and colors mirror the mockup exactly; the
 * responsive steps below it are additions, since the mockup is desktop-only.
 * ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 text-[11px] font-medium uppercase leading-none tracking-[0.2em]",
        tone === "dark" ? "text-mint" : "text-moss",
        className,
      )}
    >
      {children}
    </p>
  );
}

type ActionProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

function Action({
  children,
  to,
  href,
  onClick,
  className,
  type = "button",
  disabled,
}: ActionProps) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}

const buttonBase =
  "inline-flex items-center justify-center rounded-[3px] text-[13.5px] font-semibold leading-none transition-colors";

export function PrimaryButton({
  tone = "light",
  className,
  ...props
}: ActionProps & { tone?: "light" | "dark" }) {
  return (
    <Action
      {...props}
      className={cn(
        buttonBase,
        "bg-moss px-7 py-[14px] text-white",
        tone === "dark" ? "hover:bg-moss-light" : "hover:bg-moss-dark",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}

export function GhostButton({
  tone = "light",
  className,
  ...props
}: ActionProps & { tone?: "light" | "dark" }) {
  return (
    <Action
      {...props}
      className={cn(
        buttonBase,
        "border px-7 py-[14px]",
        tone === "dark"
          ? "border-white/30 text-white hover:bg-white/10"
          : "border-forest-900/25 text-forest-900 hover:bg-forest-900/5",
        className,
      )}
    />
  );
}

export function OutlineButton({ className, ...props }: ActionProps) {
  return (
    <Action
      {...props}
      className={cn(
        buttonBase,
        "border border-forest-900/25 px-5 py-[11px] text-[12.5px] text-forest-900 hover:border-moss hover:text-moss",
        className,
      )}
    />
  );
}

/** Arrow link used throughout the mockup ("Explore now →"). */
export function ArrowLink({
  to,
  children,
  tone = "light",
  className,
}: {
  to?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cls = cn(
    "inline-block text-[12.5px] font-semibold leading-none transition-colors",
    tone === "dark" ? "text-mint hover:text-white" : "text-moss hover:text-forest-700",
    className,
  );
  if (!to) return <span className={cls}>{children} →</span>;
  return (
    <Link to={to} className={cls}>
      {children} →
    </Link>
  );
}

/**
 * Image slot. Renders the real photo when one is supplied.
 *
 * With no photo it renders generated art (see art.tsx) rather than the
 * mockup's captioned hatch. Most of the photography the mockup asks for is of
 * a real person, real clients, and real rooms, so it cannot be substituted —
 * and a box reading "Panel photo" makes a finished page look broken. The art
 * is decorative and hidden from assistive tech: it depicts nothing, so
 * announcing `label` would describe a photograph that isn't there.
 *
 * `label` still names what belongs here for whoever fills it in later, and
 * doubles as the art seed, so each slot gets its own composition. Pass `seed`
 * to pin two slots to the same artwork, or to keep it stable if the label is
 * reworded.
 */
export function ImageSlot({
  label,
  src,
  alt,
  tone = "light",
  seed,
  variant,
  accent,
  className,
  imgClassName,
}: {
  label: string;
  src?: string;
  alt?: string;
  tone?: "light" | "dark";
  seed?: string;
  variant?: number;
  accent?: string;
  className?: string;
  imgClassName?: string;
}) {
  if (src) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
    );
  }
  return (
    <FieldArt
      seed={seed ?? label}
      tone={tone}
      variant={variant}
      accent={accent}
      className={className}
    />
  );
}

export function FaqList({ items, className }: { items: Faq[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((f) => (
        <details key={f.q} className="group border-b border-forest-900/[0.12] py-[18px]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-semibold leading-[1.4] text-forest-900 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="mt-1 shrink-0 text-moss transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="m-0 mt-3 text-[13.5px] leading-[1.7] text-slate-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Dark testimonial block with prev/next controls (Home, NFL, and Legal pages). */
export function QuoteCarousel({
  quotes,
  eyebrow,
  heading = "What clients say.",
}: {
  quotes: Quote[];
  eyebrow?: string;
  heading?: string;
}) {
  const [i, setI] = useState(0);
  const quote = quotes[i % quotes.length];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div>
        {eyebrow && (
          <Eyebrow tone="dark" className="mb-4">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="m-0 mb-6 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[38px]">
          {heading}
        </h2>
        <div className="flex gap-[10px]">
          <button
            type="button"
            aria-label="Previous quote"
            onClick={() => setI((n) => (n + quotes.length - 1) % quotes.length)}
            className="h-[38px] w-[38px] rounded-full border border-white/30 text-sm text-white transition-colors hover:bg-white/[0.12]"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next quote"
            onClick={() => setI((n) => (n + 1) % quotes.length)}
            className="h-[38px] w-[38px] rounded-full border border-white/30 text-sm text-white transition-colors hover:bg-white/[0.12]"
          >
            →
          </button>
        </div>
      </div>
      <blockquote className="m-0 border-l border-white/[0.16] pl-6 md:pl-11">
        <p className="m-0 mb-6 font-display text-[19px] font-light leading-[1.55] text-white md:text-[22px]">
          “{quote.text}”
        </p>
        <p className="m-0 mb-[6px] text-sm font-semibold leading-none text-white">{quote.name}</p>
        <p className="m-0 text-[13px] leading-none text-white/55">{quote.role}</p>
      </blockquote>
    </div>
  );
}
