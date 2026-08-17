/**
 * All site copy in one place. Content comes verbatim from the approved
 * mockup (JesseForemanWebsiteMockupsZIP/Jesse Foreman Site.dc.html).
 * Edit here rather than in the page components.
 *
 * Blog posts are the exception: they live in content/blog/*.md at the repo root
 * and are re-exported below from the generated JSON.
 */

import generatedPosts from "./posts.generated.json";

export const contact = {
  email: "thenflagent@gmail.com",
  phone: "(859) 640-8053",
  phoneHref: "tel:+18596408053",
  location: "Florence, Kentucky",
};

export type Quote = { text: string; name: string; role: string };

export const clientQuotes: Quote[] = [
  {
    text: "Jesse read my deal line by line and found guarantees the last agent never asked for. He answers the phone. That alone puts him ahead.",
    name: "Client, NFL Veteran",
    role: "Third contract",
  },
  {
    text: "He told me things I didn't want to hear about my market. He was right, and the offer we ended up signing proved it.",
    name: "Client, Draft Pick",
    role: "Rookie deal",
  },
  {
    text: "The NIL structure he put together protected my likeness in ways I didn't know were negotiable.",
    name: "Client, Collegiate Athlete",
    role: "NIL representation",
  },
  {
    text: "Straightforward, transparent, and quick. That combination is rare in this business.",
    name: "Client, Free Agent",
    role: "Free agency",
  },
];

export const speakingQuotes: Quote[] = [
  {
    text: "He explained cap mechanics to a room of nineteen-year-olds without talking down to a single one of them.",
    name: "Athletic Director",
    role: "Division I program",
  },
  {
    text: "The most useful hour of our summit. Practical, specific, and no sales pitch.",
    name: "Conference Organizer",
    role: "Sports business summit",
  },
  {
    text: "Our players still quote things he said about reading their own contracts.",
    name: "Head Coach",
    role: "Collegiate football",
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
    body: "Joined as an NFL agent and led the digital rights division, one of the first in the industry.",
  },
  {
    year: "2024",
    title: "Delta Sports Group",
    body: "Now a contract advisor at Delta Sports Group, founded by former NFL lineman Jammal Brown.",
  },
  {
    year: "2025",
    title: "Licensed to practice in Kentucky",
    body: "Eleven years after finishing the JD, I took the bar and began practising law alongside the agency work.",
  },
];

/**
 * Credentials and press below are drawn from docs/bio.txt, the client-supplied
 * biography in this repo. They are the only factual claims on the site that did
 * not come from the approved mockup — worth a check against the record before a
 * client-facing sign-off.
 */
export const credentials = [
  { label: "Certification", value: "NFLPA Certified Contract Advisor" },
  { label: "Bar Admission", value: "Licensed attorney, Kentucky" },
  { label: "Juris Doctor", value: "University of Cincinnati College of Law" },
  { label: "Practice", value: "Delta Sports Group" },
];

export const pressMentions = ["Forbes", "Yahoo", "Nasdaq", "ESPN"];

/** Restates the legalServices copy below as a scannable list for the CTA panel. */
export const legalScope = [
  { label: "Before Signing", value: "Contract and offer-sheet review" },
  { label: "Disputes", value: "Positioning and exposure assessment" },
  { label: "Likeness & IP", value: "Rights, licensing, and takedowns" },
  { label: "Multi-State", value: "Counsel coordination across jurisdictions" },
];

export const ventures = [
  { label: "2015", value: "Global Sports and Entertainment, co-founder" },
  { label: "2021", value: "Young Money APAA, digital rights division" },
  { label: "Since 2024", value: "Delta Sports Group, contract advisor" },
  { label: "Advisory", value: "Likeness, licensing, and brand structures" },
];

export const seriesFacts = [
  { label: "Format", value: "Long-form conversations, published as written pieces" },
  { label: "Guests", value: "Players, advisors, and front-office voices" },
  { label: "Subjects", value: "Contracts, NIL, the draft, and life after it" },
];

export const speakingFormats = [
  { label: "Team & Program", value: "Locker-room and position-group sessions" },
  { label: "Campus", value: "NIL briefings for athletes and families" },
  { label: "Industry", value: "Summit panels and keynote sessions" },
  { label: "Law School", value: "Certification path and sports-practice talks" },
];

export const team = [
  { name: "Financial Advisor", role: "Wealth & taxes" },
  { name: "Marketing Lead", role: "Brand & endorsements" },
  { name: "Performance Coach", role: "Training & combine prep" },
  { name: "Legal Associate", role: "Contract review" },
];

export const network = [
  {
    name: "Financial Advisor",
    role: "Wealth planning",
    body: "Structures earnings so a short career funds a long life.",
  },
  {
    name: "Marketing Lead",
    role: "Brand strategy",
    body: "Builds endorsement pipelines that match the player, not the market.",
  },
  {
    name: "Performance Coach",
    role: "Combine prep",
    body: "Runs the training block between the last game and the draft.",
  },
  {
    name: "Legal Associate",
    role: "Contract review",
    body: "Second set of eyes on every document before it is signed.",
  },
  {
    name: "Tax Counsel",
    role: "Multi-state filing",
    body: "Handles the jock tax across every state a season touches.",
  },
  {
    name: "Media Trainer",
    role: "Press readiness",
    body: "Prepares clients for the interviews that shape their value.",
  },
  {
    name: "Business Advisor",
    role: "Ventures",
    body: "Vets the investments that come knocking after a signing bonus.",
  },
  {
    name: "Family Liaison",
    role: "Support",
    body: "Keeps parents and partners informed through the process.",
  },
];

export const nflServices = [
  {
    title: "Contract Advisory",
    body: "Rookie deals, extensions, and veteran negotiations. I model the cap implications before I take a call with a team.",
  },
  {
    title: "Combine & Draft Prep",
    body: "Training placement, medical management, team interviews, and the positioning work that starts months before the draft.",
  },
  {
    title: "Career Management",
    body: "Trade requests, releases, and the mid-season conversations that decide where a career goes next.",
  },
];

export const legalServices = [
  {
    title: "Contract Review",
    body: "Sharp, protective language written to your objectives rather than the team's template.",
  },
  {
    title: "Dispute Positioning",
    body: "Insight from both prosecution and defense angles to anticipate moves and reduce exposure.",
  },
  {
    title: "Likeness & IP",
    body: "Protecting identity, likeness, and long-term commercial value across every platform.",
  },
];

export const events = [
  {
    when: "April 2026",
    title: "The Business of NIL",
    body: "A campus session for athletes and families on reading collegiate deals before signing them.",
  },
  {
    when: "June 2026",
    title: "Family Office Sports Summit",
    body: "Panel on athlete investment structures and where representation fits alongside capital.",
  },
  {
    when: "September 2026",
    title: "Agent Certification Prep",
    body: "A candid session for law students considering the certification path.",
  },
];

export type Faq = { q: string; a: string };

export const nflFaqs: Faq[] = [
  {
    q: "When should a player start talking to agents?",
    a: "Well before you are eligible to sign. The relationship matters more than the timing, and early conversations cost you nothing.",
  },
  {
    q: "How many clients do you represent?",
    a: "Deliberately few. Roster size is the single best predictor of whether your agent returns your call.",
  },
  {
    q: "What does representation cost?",
    a: "NFLPA rules cap contract advisor fees at three percent. I do not charge above the cap, and marketing terms are discussed separately.",
  },
  {
    q: "Do you work with undrafted players?",
    a: "Yes. Undrafted free agency is a negotiation too, and often a more important one.",
  },
  {
    q: "Does the law degree matter?",
    a: "It helps with contracts. Plenty of excellent agents do not have one, and I have never pretended otherwise.",
  },
  {
    q: "Who actually handles my account?",
    a: "I do. There is no associate layer between you and the person negotiating your deal.",
  },
];

export const legalFaqs: Faq[] = [
  {
    q: "What types of clients do you work with?",
    a: "Professional athletes, performers, and the founders and businesses that operate around them.",
  },
  {
    q: "How do you approach a legal matter?",
    a: "Position first. I look at where a matter is likely to end before deciding how to open it.",
  },
  {
    q: "Is legal work separate from representation?",
    a: "It can be. Some clients bring me in only for contract review or a specific dispute.",
  },
  {
    q: "How quickly do you respond?",
    a: "Response times vary with active matters, but every inquiry is read personally.",
  },
  {
    q: "Do you handle matters outside Kentucky?",
    a: "Athlete matters routinely cross state lines. I will tell you plainly when local counsel is required.",
  },
  {
    q: "What should I send in a first message?",
    a: "A short summary of the situation and any deadline you are working against.",
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "How do I get started?",
    a: "Send a short note about your situation. If it is a fit, we will set up a call.",
  },
  {
    q: "What services do you offer?",
    a: "NFL representation, contract negotiation, legal counsel, NIL and brand advisory, and speaking.",
  },
  {
    q: "How do I book a consultation?",
    a: "Use the form above or email directly. I schedule calls myself.",
  },
  {
    q: "What can I expect on the first call?",
    a: "Questions about where you are, an honest read on your market, and no pressure to commit.",
  },
  {
    q: "Can I get ongoing support?",
    a: "That is the point. Representation is a multi-year relationship, not a single transaction.",
  },
];

export const contactTopics = [
  "NFL representation",
  "Contract review",
  "Legal matter",
  "NIL or brand deal",
  "Speaking request",
];

export const affiliations = ["NFLPA", "Delta Sports", "KY Bar Assoc", "UC Law"];
