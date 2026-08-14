import {
  ArrowLink,
  Eyebrow,
  GhostButton,
  ImageSlot,
  OutlineButton,
  PrimaryButton,
  QuoteCarousel,
} from "@/components/site/ui";
import NewsletterForm from "@/components/site/NewsletterForm";
import { affiliations, clientQuotes, formatPostDate, posts } from "@/data/site";
import heroPortrait from "@/assets/jForemanLI.jpeg";

const practices = [
  {
    n: "01",
    title: "NFL Representation",
    body: "Rookie contracts, extensions, and veteran negotiations. I model the cap consequences of every structure before a team hears a number from me.",
    to: "/nfl-agent",
  },
  {
    n: "02",
    title: "Legal Counsel",
    body: "A JD from the University of Cincinnati and courtroom exposure on both sides of the aisle. Contract language, disputes, and risk read the way opposing counsel will read it.",
    to: "/legal",
  },
  {
    n: "03",
    title: "NIL & Brand",
    body: "Likeness rights are the asset most often signed away by accident. I built one of the first digital rights divisions in sports and I know where the traps sit.",
    to: "/entrepreneur",
  },
  {
    n: "04",
    title: "Speaking & Media",
    body: "Sessions on financial literacy, NIL, and the business of representation for programs, summits, and law schools.",
    to: "/speaking",
  },
];

const Home = () => (
  <>
    {/* Hero */}
    <section className="on-dark relative flex min-h-[470px] items-end overflow-hidden bg-forest-900 md:min-h-[540px]">
      {/* Portrait sits in the right half so it never fights the headline. */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] md:block">
        <img
          src={heroPortrait}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_22%] opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/60 to-forest-900/10" />
      </div>
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[76px]">
        <div className="max-w-[760px]">
          <Eyebrow tone="dark" className="mb-5">
            NFLPA Certified Contract Advisor · Attorney
          </Eyebrow>
          <h1 className="m-0 mb-[22px] text-balance font-display text-[38px] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[52px] lg:text-[62px]">
            Representation that plays the long game.
          </h1>
          <p className="m-0 mb-[34px] max-w-[520px] text-[16px] font-light leading-[1.65] text-white/[0.78] md:text-[17px]">
            I combine courtroom experience with a decade of NFL contract negotiation. Fewer clients,
            sharper terms, and a person who answers the phone.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton to="/contact" tone="dark">
              Work With Me
            </PrimaryButton>
            <GhostButton to="/about" tone="dark" className="border-white/35">
              My Background
            </GhostButton>
          </div>
        </div>
      </div>
    </section>

    {/* Four practices */}
    <section className="on-dark bg-forest-800 py-16 md:py-20">
      <div className="site-container">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[480px]">
            <Eyebrow tone="dark" className="mb-[14px]">
              What I Do
            </Eyebrow>
            <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]">
              Four practices, one relationship.
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-[14.5px] font-light leading-[1.7] text-white/[0.66]">
            Most athletes get handed to a junior associate. Here the person who negotiates your
            contract is the person who reviews it, protects it, and picks up when you call.
          </p>
        </div>

        <div className="grid gap-px border border-white/[0.14] bg-white/[0.14] sm:grid-cols-2">
          {practices.map((p) => (
            <div
              key={p.n}
              className="bg-forest-800 px-[34px] py-[38px] transition-colors hover:bg-forest-hover"
            >
              <span className="mb-5 block font-mono text-[11px] font-semibold leading-none text-mint">
                {p.n}
              </span>
              <h3 className="m-0 mb-[14px] font-display text-[21px] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
                {p.title}
              </h3>
              <p className="m-0 mb-6 text-sm font-light leading-[1.75] text-white/[0.68]">
                {p.body}
              </p>
              <ArrowLink to={p.to} tone="dark">
                Explore now
              </ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Affiliations */}
    <section className="border-b border-forest-900/[0.09] bg-white py-14 md:py-[66px]">
      <div className="site-container">
        <Eyebrow className="mb-8 text-center">Affiliations &amp; Partnerships</Eyebrow>
        <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4">
          {affiliations.map((a) => (
            <ImageSlot key={a} label={a} className="h-[84px]" />
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="on-dark bg-forest-900 py-16 md:py-[78px]">
      <div className="site-container">
        <QuoteCarousel quotes={clientQuotes} eyebrow="Client Voices" />
      </div>
    </section>

    {/* Insights */}
    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-[14px]">Insights</Eyebrow>
            <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
              Notes from inside the negotiation.
            </h2>
          </div>
          <OutlineButton to="/blog">See All Articles</OutlineButton>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.slice(0, 4).map((post) => (
            <article
              key={post.slug}
              className="grid gap-5 border border-forest-900/10 p-5 transition-colors hover:border-moss/50 sm:grid-cols-[150px_1fr]"
            >
              <ImageSlot label="Article image" className="h-[132px]" />
              <div>
                <p className="m-0 mb-[9px] text-[11.5px] leading-none text-slate-muted">
                  {formatPostDate(post.date)}
                </p>
                <h3 className="m-0 mb-[10px] font-display text-base font-semibold leading-[1.35] tracking-[-0.01em] text-forest-900">
                  {post.title}
                </h3>
                <p className="m-0 mb-[14px] text-[13px] leading-[1.65] text-slate-body">
                  {post.excerpt}
                </p>
                <ArrowLink to={`/blog/${post.slug}`}>Read more</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-mint-50 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[42px]">
          Let's talk before you sign anything.
        </h2>
        <p className="m-0 mx-auto mb-8 max-w-[520px] text-base font-light leading-[1.7] text-slate-dark">
          Share a bit about your situation or goals. I review every inquiry personally and follow
          up.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton to="/contact">Contact Me</PrimaryButton>
          <GhostButton to="/nfl-agent">See Services</GhostButton>
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <section className="on-dark grid items-stretch bg-forest-800 lg:grid-cols-2">
      <div className="site-container py-16 md:py-[76px] lg:mx-0 lg:ml-auto lg:max-w-[546px] lg:pr-11">
        <h2 className="m-0 mb-4 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-white md:text-[34px]">
          Stay updated with my insights.
        </h2>
        <p className="m-0 mb-7 max-w-[400px] text-[14.5px] font-light leading-[1.7] text-white/[0.66]">
          Occasional notes on contracts, NIL, and the business of representation. No noise, no
          selling.
        </p>
        <NewsletterForm tone="dark" withName buttonLabel="Join" />
      </div>
      <ImageSlot
        label="Portrait / draft night photo"
        tone="dark"
        className="min-h-[240px] lg:min-h-[330px]"
      />
    </section>
  </>
);

export default Home;
