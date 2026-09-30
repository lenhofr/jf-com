/**
 * All site copy in one place. Content comes verbatim from the client-approved
 * design handoff (docs/design-handoff/README.md, whose prototype data.js is
 * the source of truth for copy). Edit here rather than in the page components.
 *
 * Blog posts are the exception: they live in content/blog/*.md at the repo root
 * and are re-exported below from the generated JSON.
 */

import generatedPosts from "./posts.generated.json";
import kbaLogo from "@/assets/affiliations/kba.png";
import nflpaLogo from "@/assets/affiliations/nflpa.png";
import nkbaLogo from "@/assets/affiliations/nkba.png";
import nflAlumniLogo from "@/assets/affiliations/nfl-alumni.png";
import forbesLogo from "@/assets/press/forbes-white.png";
import yahooLogo from "@/assets/press/yahoo-white.png";
import nasdaqLogo from "@/assets/press/nasdaq-white.png";
import espnLogo from "@/assets/press/espn-white.png";

export const contact = {
  email: "info@jesseforeman.com",
  phone: "(859) 880-8801",
  phoneHref: "tel:+18598808801",
  location: "Northern Kentucky",
};

export type Quote = { text: string; name: string; role: string };

/**
 * Entries with empty text are placeholders the client will fill in: the
 * carousels skip them, and About shows the card's stars only.
 */
export const clientQuotes: Quote[] = [
  {
    text: "Jesse is someone I know I can trust to give me honest and well thought out advise. He isn't someone who will agree with you just to appease you.",
    name: "Jammal Brown",
    role: "Super Bowl Champ, All Pro, and Pro-Bowler",
  },
  {
    text: "Jesse Foreman, that's the guy with the plan. He is the guy to listen to. I always go to him for advice.",
    name: "Isaiah Iton",
    role: "New England Patriots",
  },
  {
    text: "Jesse believed in me when I was a college student, chasing my dream of playing in the NFL. He played a huge role in helping me get there and last for 4 and a half years. Forever grateful for him!!",
    name: "Rico Gafford",
    role: "Former NFL Player",
  },
  { text: "", name: "", role: "" },
];

/** Organizer quotes run without attribution, by request. */
export const speakingQuotes: Quote[] = [
  {
    text: "He provided the audience with a real understanding of possibilities of NFTs if built and utilized properly.",
    name: "",
    role: "",
  },
  {
    text: "The students walked away with a much more realistic understanding of the ins and outs of athlete representation.",
    name: "",
    role: "",
  },
  {
    text: "He spoke on a high level regulatory issue with such knowledge that anyone could understand and appreciate the speech.",
    name: "",
    role: "",
  },
];

/**
 * Canonical category list. The generator reads this declaration out of this
 * file to validate frontmatter, and Decap's config.yml select must list the
 * same values (kept in sync by hand for now).
 */
export const postCategories = ["Contracts", "NIL", "Draft", "Career"] as const;
export type PostCategory = (typeof postCategories)[number];

export type Post = {
  title: string;
  /** ISO `YYYY-MM-DD`. Never rendered raw — run it through formatPostDate. */
  date: string;
  slug: string;
  excerpt: string;
  category: PostCategory;
  /**
   * Site-absolute path to the article image, e.g. `/images/blog/foo.jpg`.
   * Optional — without it the hatched ImageSlot placeholder shows instead.
   */
  image?: string;
  /** Alt text for `image`. Required by the build whenever `image` is set. */
  imageAlt?: string;
  /** Markdown source of the post body. */
  body: string;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Posts store ISO dates so they sort correctly and Decap's datetime widget can
 * edit them, but the design shows "March 2026". Parsed by hand rather than via
 * `new Date()` so a local timezone behind UTC can't roll the first of a month
 * back into the previous one. Unparseable input falls back to the raw string.
 *
 * DUPLICATED in `frontend/public/admin/index.html`, which powers the CMS preview
 * pane. That page is static and cannot import from this bundle, so changing the
 * format here without changing it there makes the preview disagree with the live
 * site — silently, and only visible to whoever is writing the post.
 */
export function formatPostDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : iso;
}

/**
 * Posts come from markdown in content/blog/ at the repo root, compiled into
 * posts.generated.json by scripts/generate-posts.mjs on every build. The
 * generator has already validated every field and sorted newest first.
 */
export const posts: Post[] = generatedPosts as Post[];

export const milestones = [
  {
    year: "2012",
    title: "Became a football agent",
    body: "After years around athletes in the hospitality business, I started representing players full time.",
  },
  {
    year: "2014",
    title: "NFLPA certified",
    body: "Earned certification as a contract advisor after finishing my JD at the University of Cincinnati.",
  },
  {
    year: "2015",
    title: "Founded Global Sports and Entertainment",
    body: "Started an agency with a business partner and learned the operations side of representation the hard way.",
  },
  {
    year: "2021",
    title: "Young Money APAA",
    body: "NFL agent and started the NIL division, one of the first in the industry.",
  },
  {
    year: "2024",
    title: "Delta Sports Group",
    body: "NFL Agent with Delta Sports Group and helped them to launch their NIL division.",
  },
  {
    year: "2025",
    title: "Licensed to practice in Kentucky",
    body: "Eleven years after receiving my JD, I took the bar and began practicing.",
  },
];

export const credentials = [
  { label: "Certification", value: "NFLPA Certified Contract Advisor" },
  { label: "Bar Admission", value: "Licensed attorney" },
  { label: "Juris Doctor", value: "University of Cincinnati College of Law" },
  { label: "Graduate Degrees", value: "MBA and Masters in AI for Businesses" },
];

/**
 * White, trimmed versions of the outlets' own logos. `scale` is an optical
 * multiplier on the base height so the four marks read at equal weight.
 */
export const pressLogos = [
  { name: "Forbes", src: forbesLogo, scale: 1.05 },
  { name: "Yahoo", src: yahooLogo, scale: 1.05 },
  { name: "Nasdaq", src: nasdaqLogo, scale: 0.95 },
  { name: "ESPN", src: espnLogo, scale: 0.85 },
];

/** Restates the legalServices copy below as a scannable list for the CTA panel. */
export const legalScope = [
  { label: "Before Signing", value: "Contract and offer-sheet review" },
  { label: "Disputes", value: "Positioning and exposure assessment" },
  { label: "Likeness & IP", value: "Rights, licensing, and takedowns" },
];

export const ventures = [
  { label: "2015", value: "Global Sports and Entertainment, Co-founder" },
  { label: "2018", value: "Fanoptic, Founder" },
  { label: "2023", value: "YMAPAA Kingdom, Co-Founder" },
  { label: "2026", value: "Barristers Boosters, Co-Founder" },
];

export const speakingFormats = [
  { label: "Technology", value: "AI and Non-Fungible Token" },
  { label: "Business", value: "Summit panels and keynote sessions" },
  { label: "Education", value: "Certification and Career Advise" },
];

export const team = [
  { name: "Financial Advisor", role: "Wealth & taxes" },
  { name: "Marketing Lead", role: "Brand & endorsements" },
  { name: "Performance Coach", role: "Training & combine prep" },
  { name: "Technical Developers", role: "Tech review" },
];

export const nflServices = [
  { title: "Contracts Negotiated", body: "Over 100 Million in Contracts Negotiated" },
  {
    title: "NIL",
    body: "Guiding student athletes through NIL deals and preparing them for their future career",
  },
  { title: "Post Career", body: "Preparing clients for life after their career." },
];

export const legalServices = [
  {
    title: "Personal Injury",
    body: "Serious injuries can change a life in an instant. I help navigate the legal, financial, and insurance challenges that arise and help you get the compensation you deserve.",
  },
  {
    title: "Corporate",
    body: "From formation and contracts to transactions, governance, risk, and growth, The focus is practical: understand the risk, protect what you're building, and make decisions with the future in mind.",
  },
  {
    title: "Regulations",
    body: "Highly regulated industries operate where business opportunity and legal risk frequently collide. Helping leaders understand the rules while continuing to move their organizations forward.",
  },
];

/** Entries with an empty date are "More to come" placeholders. */
export const events = [
  { when: "September 2026", title: "NFT.NYC", body: "Beyond NIL: The future of digital rights." },
  { when: "", title: "More to come", body: "" },
  { when: "", title: "More to come", body: "" },
];

export type Faq = { q: string; a: string };

/*
 * Site-wide rule from the client: every FAQ answer ends "Contact me and let's
 * discuss further." except Legal's response-time and first-message answers
 * and Contact's "How do I get started?".
 */
const CTA = "Contact me and let's discuss further.";

export const nflFaqs: Faq[] = [
  {
    q: "When should a player start talking to agents?",
    a: `Well before you are eligible to sign. The relationship matters more than the timing, and early conversations cost you nothing. ${CTA}`,
  },
  {
    q: "How many clients do you normally sign during a draft class?",
    a: `Three or less. Roster size is the single best predictor of whether your agent returns your call. ${CTA}`,
  },
  {
    q: "What does representation cost?",
    a: `NFLPA rules cap contract advisor fees at 3% of the compensation negotiated in a player's official NFL playing contract. This is described in the Standard Representation Agreement (SRA). ${CTA}`,
  },
  {
    q: "Do you work with undrafted players?",
    a: `Yes. Undrafted free agency is a negotiation too, and often a more important one. ${CTA}`,
  },
  {
    q: "Does the law degree matter?",
    a: `It helps with contracts. Plenty of excellent agents do not have one, but I find the information I gained in law lets me better predict unforeseen issues that may arise. ${CTA}`,
  },
  {
    q: "Who actually handles my account?",
    a: `I do. There is no associate layer between you and the person negotiating your deal. ${CTA}`,
  },
];

export const legalFaqs: Faq[] = [
  {
    q: "What types of clients do you work with?",
    a: `Ambitious individuals looking to build towards the future. ${CTA}`,
  },
  {
    q: "How do you approach a legal matter?",
    a: `Position first. I look at where a matter is likely to end before deciding where to start. ${CTA}`,
  },
  {
    q: "Is legal work separate from representation?",
    a: `Yes for athletes looking for representation. ${CTA}`,
  },
  {
    q: "How quickly do you respond?",
    a: "Response times vary with active matters, but every inquiry is read personally and as soon as possible.",
  },
  {
    q: "Do you handle matters outside Kentucky?",
    a: `Matters I advise on routinely cross state lines. I will tell you plainly when local counsel is required. ${CTA}`,
  },
  {
    q: "What should I send in a first message?",
    a: "A short summary of the situation with no confidential information and any deadline you are working against.",
  },
];

export const entrepreneurFaqs: Faq[] = [
  {
    q: "Should I form an LLC or a C-Corp?",
    a: `It depends on how you plan to fund and grow the business. An LLC is simpler to run and taxed as a pass-through. A C-Corp is usually what institutional investors expect. ${CTA}`,
  },
  {
    q: "Where should I incorporate?",
    a: `Many venture-backed companies incorporate in Delaware for its established corporate law. Smaller or locally owned businesses often stay in their home state to avoid a second set of filings and fees. ${CTA}`,
  },
  {
    q: "What documents do I need after forming the company?",
    a: `At minimum, an operating agreement or bylaws, a clear record of who owns what, and founder agreements covering vesting and what happens if someone leaves. ${CTA}`,
  },
  {
    q: "What is an 83(b) election, and when is it due?",
    a: `It lets founders pay tax on restricted stock at today's value rather than as it vests. It must be filed with the IRS within 30 days of the grant, and that deadline cannot be extended. ${CTA}`,
  },
  {
    q: "Should I raise on a SAFE or a priced round?",
    a: `A SAFE is faster and cheaper for early money. A priced round sets a valuation and board terms. I walk through what each does to your ownership before you sign. ${CTA}`,
  },
  {
    q: "What should I check before investing in someone else's company?",
    a: `The cap table, the terms of your security, who else is investing, and what rights you actually receive. Most regrets come from terms nobody read. ${CTA}`,
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "How do I get started?",
    a: "Send a short note about your situation. If it is a fit, we will set up a call.",
  },
  {
    q: "What services do you offer?",
    a: `NFL representation, contract negotiation, legal counsel, NIL and brand advisory, and speaking. ${CTA}`,
  },
  {
    q: "How do I book a consultation?",
    a: `Use the form above or email directly. I schedule calls myself. ${CTA}`,
  },
  {
    q: "What can I expect on the first call?",
    a: `Questions about where you are, an honest read on your market, and no pressure to commit. ${CTA}`,
  },
  {
    q: "Can I get ongoing support?",
    a: `That is the point. Representation is a multi-year relationship, not a single transaction. ${CTA}`,
  },
];

export const contactTopics = [
  "NFL representation",
  "Contract review",
  "Legal matter",
  "NIL or brand deal",
  "Speaking request",
];

/**
 * Partners' own logos, background removed. `height` is the rendered height in
 * px, set per mark so the four read at equal weight.
 */
export const affiliations = [
  { name: "Kentucky Bar Association", src: kbaLogo, height: 80 },
  { name: "NFLPA", src: nflpaLogo, height: 42 },
  { name: "Northern Kentucky Bar Association", src: nkbaLogo, height: 58 },
  { name: "NFL Alumni", src: nflAlumniLogo, height: 76 },
];
