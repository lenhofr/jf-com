# Handoff: jesseforeman.com update (rebrand, new pages, new copy and photos)

## Overview
This package describes every change approved in design review for **jesseforeman.com**, the site in `github.com/lenhofr/jf-com` (Vite + React + Tailwind, `frontend/`). It covers:
- a rebrand from forest green and moss to **black, gold, silver, grey and white**;
- a new logo (a lion shield) and a Foreman Company wordmark in the footer;
- new photos on five pages;
- full-colour affiliation logos and white press logos;
- copy rewritten across every page;
- a legal disclaimer in the footer;
- mobile layout rules.

## About the design files
The `prototype/` folder is a **design reference built in HTML/React**. It shows the intended look, copy and behaviour. It is not production code to paste in. Recreate these changes inside the existing `jf-com` codebase, using its current Tailwind + `components/site/*` patterns.

Open `prototype/ui_kits/website/index.html` in a browser to click through the pages: Home, About, NFL Agent, Legal, Entrepreneur, Speaking, Insights, Blog, Contact. Append `#/legal` (or any route) to the URL to jump straight to a page.

**Source of truth for all copy:** `prototype/ui_kits/website/data.js` plus the page files next to it (`Home.jsx`, `About.jsx`, …). Copy text from those files exactly as written. The client approved the wording as-is.

## Fidelity
**High fidelity.** Colours, type, spacing and copy are final. Layout is unchanged from the current site except where this document says otherwise.

---

## 1. Rebrand: colour palette
The fastest route is to **keep the existing Tailwind colour names and change their values** in `frontend/tailwind.config.ts`. Then every `bg-forest-900`, `text-moss` and so on updates automatically. Renaming the tokens is optional clean-up.

| Tailwind token (existing) | Old | **New** | New name in prototype |
|---|---|---|---|
| ink | #0F1311 | **#0B0B0B** | ink |
| forest-900 | #0F2E22 | **#141414** | charcoal-900 |
| forest-800 | #123A2B | **#1E1E1E** | charcoal-800 |
| forest-700 | #1C5741 | **#2B2B2B** | charcoal-700 |
| forest-hover | #164434 | **#262626** | charcoal-hover |
| moss | #4E8C5E | **#C9A227** | gold |
| moss-dark | #3F7A4E | **#A8871C** | gold-dark |
| moss-light | #5FA271 | **#DDBB4E** | gold-light |
| mint | #7FBE92 | **#E0C871** | champagne |
| mint-50 | #E8F1EB | **#F7F1DF** | champagne-50 |
| sage-50 | #F5F7F5 | **#F6F6F5** | grey-50 |
| sage-100 | #E9EDEA | **#EAEAEA** | grey-100 |
| sage-200 | #F3F5F3 | **#F4F4F3** | grey-200 |
| paper | #EDEEEB | **#F2F2F0** | paper |
| slate-dark | #3C4A44 | **#333333** | grey-dark |
| slate-body | #5B6A63 | **#5A5A5A** | grey-body |
| slate-muted | #8D9B94 | **#8C8C8C** | grey-muted |
| gold | #C9A227 | #C9A227 (unchanged) | gold |
| *(new)* | — | **#C6C8CA** | silver |
| *(new)* | — | **#E4E6E8** | silver-light |

Also update these related values:
- **Tinted hairlines and borders.** Replace every `forest-900/[0.xx]` and `rgba(15,46,34,x)` with pure black at the same opacity, e.g. `rgba(0,0,0,0.12)`. Replace mint-tinted art lines `rgba(127,190,146,x)` with `rgba(224,200,113,x)`.
- **Label text on gold buttons is now black (`#0B0B0B`), not white.** This affects `PrimaryButton`, the header CTA, and the newsletter and contact submit buttons.
- **Small gold text on light backgrounds uses `gold-dark #A8871C`** for contrast: eyebrows, mono numbers, role lines and similar labels. Plain `gold #C9A227` is kept for fills, links and lines.
- **On dark sections, eyebrows are champagne (#E0C871).** They used to be mint.
- **Focus ring:** 2px `#A8871C`, 2px offset; `#E0C871` inside dark sections.
- **Text selection:** gold background with ink text.
- **Field art** (`components/site/art.tsx`, `lib/art-tokens.ts`):
  - light gradient: `#F4F4F3 → #D8D9DA`, line colour `rgba(70,70,70,0.22)`, strong line `rgba(70,70,70,0.42)`;
  - dark gradient: `#1E1E1E → #141414`, line colour `rgba(224,200,113,0.20)`, strong line `rgba(224,200,113,0.42)`;
  - category accents: Contracts #C9A227, NIL #E0C871, Draft #C6C8CA, Career #8C8C8C.

Full token list: `prototype/tokens/colors.css`.

## 2. Logo and footer
- **Header:** replace the "JF" monogram square with `assets/logo.png` (the lion shield, transparent PNG, 103×128). Render it **44px tall, width auto**.
- **Footer:**
  - Logo at **52px tall**.
  - Positioning text is now three lines: "Jesse L. Foreman, Esq." / "Licensed Attorney & NFLPA Certified Contract Advisor" / "Helping make better decision in high-stake moments." (client wording, verbatim).
  - Services column order: **Legal**, NFL Representation, Entrepreneur Advisory, Speaking & Media. The first link is renamed from "Legal Counsel" to "Legal".
  - Contact block: `info@jesseforeman.com`, `(859) 880-8801`, `Northern Kentucky`.
  - Bottom bar: left side reads "© {year} The Foreman Company. All rights reserved."; right side shows `assets/wordmark-foreman-company.png` at 48px tall, 85% opacity. Remove the old "NFLPA Certified Contract Advisor since 2014" line.
  - **New disclaimer** below the bar: a 1px hairline (`rgba(255,255,255,0.12)`) and 18px top padding; then a "DISCLAIMER" label (10.5px, 600 weight, uppercase, 0.16em tracking, white at 42%); then the paragraph (11.5px, line-height 1.65, white at 42%, max-width 820px). Exact text is in `prototype/components/layout/SiteFooter.jsx`.
- **Header nav order:** About, **Legal, The NFL Agent**, Entrepreneur, Speaking, Insights. Legal and The NFL Agent have swapped places.
- Reference: `prototype/components/layout/SiteHeader.jsx`, `SiteFooter.jsx`.

## 3. Photos (copy from `prototype/assets/`)
The right-side photos on the Home, NFL Agent, Speaking, Entrepreneur and Insights pages share one treatment:
- The photo sits in an absolutely positioned box covering the right 52% of the section (46–52% depending on page), full height.
- `object-fit: cover`, opacity 0.9.
- A left-to-right gradient over it: `linear-gradient(to right, #141414, rgba(0,0,0,.45), transparent)`.
- **The diagonal hatch overlay must render after (on top of) the photo**, otherwise a hard seam shows at the photo's edge.
- The photo box is hidden below 768px.

| Page | Where | File | object-position |
|---|---|---|---|
| Home | hero, right | `portrait-linkedin.jpeg` (unchanged) | 50% 22% |
| About | image slot beside "In Short" quote, **height 480px** | `portrait-headshot.jpg` | 50% 20% |
| NFL Agent | hero, right (replaces line art) | `photo-adidas-event.jpg` | 50% 55% |
| Legal | hero, right column (see §5) | `portrait-legal-suit.jpg` | 50% 35% |
| Entrepreneur | hero, right | `photo-entrepreneur-chair.png` (colour-corrected) | 50% 30% |
| Speaking | hero, right | `photo-speaking-panel.jpg` | 50% 45% |
| Insights | hero, right, 52% wide | `portrait-insights-charcoal.png` (backdrop recoloured to charcoal) | 50% 30% |

Insights page hero specifics:
- min-height **540px**, content vertically centred;
- padding-top 60, padding-bottom 60;
- scrim: `linear-gradient(to right, #141414 0%, rgba(20,20,20,.7) 30%, rgba(20,20,20,.15) 65%, transparent)`;
- plus a bottom fade: `linear-gradient(to top, #141414 0%, transparent 28%)`.

## 4. Logo strips
- **Home → "Affiliations"** (label renamed from "Affiliations & Partnerships"):
  - Four logo tiles, in this order: Kentucky Bar Association, NFLPA, Northern Kentucky Bar Association, NFL Alumni. Files are in `assets/affiliations/` (backgrounds removed, colour kept).
  - Tile: `flex: 1 1 200px`, max-width 250px, height 120px, background #F6F6F5, 1px border `rgba(0,0,0,.12)`, logo centred.
  - Logo heights: KBA 80, NFLPA 42, NKBA 58, NFL Alumni 76px.
  - The row is centred and wraps on narrow screens.
- **Home and Speaking → "Featured In" panel:**
  - Replace the typed outlet names with white logos from `assets/press/`, in this order: Forbes, Yahoo, NASDAQ, ESPN.
  - Base height 26px (Home) or 30px (Speaking), multiplied per logo: Forbes ×1.05, Yahoo ×1.05, NASDAQ ×0.95, ESPN ×0.85.
  - Opacity 0.88, gap 20–22px × 34–38px.

## 5. Page-by-page structural changes
Copy text from the prototype files. This section lists only structural changes.
- **Home:**
  - Practice tiles reordered and renamed: 01 Legal Counsel, 02 NFL Representation, **03 Entrepreneur** (was NIL & Brand), 04 Speaking & Media.
  - Several headings and body lines rewritten.
- **About:**
  - Headline, lead, "In Short" quote, both Path paragraphs, three milestones, Bench heading (now an Earl Nightingale quote), Bench lead, one Bench tile ("Technical Developers / Tech review") and the CTA lead all rewritten.
  - The About page office photo is replaced (see §3).
- **Testimonials** (`clientQuotes`, used on About and in every quote carousel):
  1. Jammal Brown — Super Bowl Champ, All Pro, and Pro-Bowler
  2. Isaiah Iton — New England Patriots
  3. Rico Gafford — Former NFL Player
  4. *(empty; the client will supply one)*

  The **carousel must skip entries with empty text**. On About, the 4th card currently shows only its stars.
- **NFL Agent:**
  - New hero copy, with a bold final sentence.
  - "Career Highlights" section: second paragraph removed.
  - Service cards: Contracts Negotiated / NIL / Post Career, each topped by a **full-width 8px gold bar** instead of the small square icon.
  - Credentials: "Licensed attorney"; the Practice row is removed; new row "Graduate Degrees — MBA and Masters in AI for Businesses".
  - FAQ copy updated.
- **Legal (new page on the prototype's Legal.tsx layout, with changes):**
  - Hero is now **two columns** on a light grey background: text on the left, left-aligned; a 440px-tall portrait on the right with a 1px border.
  - New headline, and an intro with a bold final clause.
  - Services: **Personal Injury, Corporate, Regulations**.
  - FAQ copy updated.
  - "What Gets Reviewed" panel: the Multi-State row is removed.
  - Next Step heading and body rewritten, including "Do not send confidential information."
- **Entrepreneur:**
  - Hero changed to the shared photo hero, with new headline and lead.
  - Track Record heading and both paragraphs rewritten.
  - Ventures list replaced: 2015 Global Sports and Entertainment; 2018 Fanoptic; 2023 YMAPAA Kingdom; 2026 Barristers Boosters.
  - Advisory quote attribution is now just "Jesse L. Foreman, Esq.".
  - Pillars: Venture Vetting / Start Ups / Regulations.
  - **"The Network" section removed.**
  - **New FAQ section** (6 questions on LLC vs C-Corp, incorporation, 83(b), SAFE and so on) above the closing CTA, on a #F6F6F5 background.
  - Closing CTA rewritten.
- **Speaking:**
  - Hero headline "Ideas Worth Sharing.", lead with a bold ending.
  - The side blurb next to "Selected appearances." is removed.
  - Formats and Audiences boxes rewritten.
  - Upcoming engagements: NFT.NYC (September 2026), plus two "More to come" cards.
  - "What organizers say.": three new quotes with no attribution and no quote marks.
  - Session Types: Technology / Business / Education.
  - Booking text rewritten.
- **Insights:**
  - New headline and lead.
  - **Both "Series" blocks and the "Insights from people who've been there" panel are removed.**
  - Newsletter heading changed to "Stay up to date!".
- **FAQs site-wide:** every answer ends with "Contact me and let's discuss further.", except these three:
  - Legal: "How quickly do you respond?"
  - Legal: "What should I send in a first message?"
  - Contact: "How do I get started?"

## 6. Mobile
See `prototype/tokens/responsive.css`:
- Grids drop to 2 columns at ≤1024px and to 1 column at ≤900px. Three- and four-column grids go to 1 column at ≤520px.
- Section padding shrinks to 56px at ≤768px.
- Hero photos are hidden at ≤768px.
- Headings scale with `clamp()`, e.g. hero `clamp(34px, 6.4vw, 62px)`.
- Header: below 1024px the nav collapses behind a hamburger (lucide `Menu`/`X`, 22px) into a stacked list with the gold CTA last.
- Add a global `box-sizing: border-box` reset if one isn't already present.

## Design tokens
All tokens are in `prototype/tokens/*.css`:
- **Radius:** 3px on all controls; 999px only on filter pills and carousel arrows.
- **Shadows:** none.
- **Motion:** 150ms ease-out colour transitions.
- **Fonts:** unchanged, Archivo (display) and Public Sans (body) from Google Fonts.

## Assets
Everything is in `prototype/assets/`. The client supplied all photos and logos. The two derived files were edited here:
- `photo-entrepreneur-chair.png` is a colour-corrected version of the client's photo.
- `portrait-insights-charcoal.png` is the original with its navy backdrop recoloured to charcoal. The untouched original is `portrait-insights.jpg`.

The affiliation and press logos belong to their respective organisations. Confirm with the client that they're cleared to use them.

## Files
- `prototype/ui_kits/website/index.html`: the clickable prototype (routing, header, footer).
- `prototype/ui_kits/website/*.jsx`: one file per page. `data.js` holds all copy.
- `prototype/components/**`: brand components (buttons, FAQ list, quote carousel, header, footer, field art, and so on). Each comes with a `.d.ts` props contract.
- `prototype/tokens/*.css`: colour, type, spacing, effect, pattern and responsive tokens.
- `prototype/_ds_bundle.js`: the compiled component bundle the prototype loads. It's reference only.
