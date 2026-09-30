import {
  ArrowLink,
  Eyebrow,
  GhostButton,
  HeroPhoto,
  ImageSlot,
  OutlineButton,
  PrimaryButton,
  QuoteCarousel,
} from "@/components/site/ui";
import { StatementPanel } from "@/components/site/art";
import { categoryAccent } from "@/lib/art-tokens";
import NewsletterForm from "@/components/site/NewsletterForm";
import { affiliations, clientQuotes, formatPostDate, posts, pressLogos } from "@/data/site";
import heroPortrait from "@/assets/jForemanLI.jpeg";

const practices = [
  {
    n: "01",
    title: "Legal Counsel",
    body: "A JD from the University of Cincinnati and litigation experience. Extensive experience in business, contracts, and negotiations.",
    to: "/legal",
  },
  {
    n: "02",
    title: "NFL Representation",
    body: "Rookie contracts, extensions, and veteran negotiations. I account for the effects each decision has now and throughout my clients career.",
    to: "/nfl-agent",
  },
  {
    n: "03",
    title: "Entrepreneur",
    body: "Developing and advising start up corporations in tech, sports, and marketing. From incorporating your corporation, filing the appropriate forms, reviewing/developing contracts, and advising on important decisions, I can help you through it all.",
    to: "/entrepreneur",
  },
  {
    n: "04",
    title: "Speaking & Media",
    body: "Sessions on financial literacy, tech, AI, entrepreneurship, NIL, and NFL representation.",
    to: "/speaking",
  },
];

const Home = () => (
  <>
    {/* Hero */}
    <section className="on-dark relative flex min-h-[470px] items-end overflow-hidden bg-charcoal-900 md:min-h-[540px]">
      {/* Portrait sits in the right half so it never fights the headline. */}
      <HeroPhoto src={heroPortrait} className="w-[58%]" imgClassName="object-[50%_22%]" />
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[76px]">
        <div className="max-w-[760px]">
          <Eyebrow tone="dark" className="mb-5">
            Attorney &amp; NFLPA Certified Contract Advisor
          </Eyebrow>
          <h1 className="m-0 mb-[22px] text-balance font-display text-[38px] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[52px] lg:text-[62px]">
            Representation built to go the distance.
          </h1>
          <p className="m-0 mb-[34px] max-w-[520px] text-[16px] font-light leading-[1.65] text-white/[0.78] md:text-[17px]">
            Protecting People. Building the Future
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
    <section className="on-dark bg-charcoal-800 py-16 md:py-20">
      <div className="site-container">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[480px]">
            <Eyebrow tone="dark" className="mb-[14px]">
              What I Do
            </Eyebrow>
            <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.025em] text-white md:text-[40px]">
              Clear advice for your future.
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-[14.5px] font-light leading-[1.7] text-white/[0.66]">
            The people who have succeeded the most are the ones who have one focus and have stuck
            with it. I help those individuals with their business decisions so that they can keep
            their focus.
          </p>
        </div>

        <div className="grid gap-px border border-white/[0.14] bg-white/[0.14] sm:grid-cols-2">
          {practices.map((p) => (
            <div
              key={p.n}
              className="bg-charcoal-800 px-[34px] py-[38px] transition-colors hover:bg-charcoal-hover"
            >
              <span className="mb-5 block font-mono text-[11px] font-semibold leading-none text-champagne">
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
    <section className="border-b border-black/[0.09] bg-white py-14 md:py-[66px]">
      <div className="site-container">
        <Eyebrow className="mb-8 text-center">Affiliations</Eyebrow>
        <div className="flex flex-wrap justify-center gap-[14px]">
          {affiliations.map((a) => (
            <div
              key={a.name}
              className="flex h-[120px] max-w-[250px] flex-[1_1_200px] items-center justify-center border border-black/[0.12] bg-grey-50 px-5"
            >
              <img
                src={a.src}
                alt={a.name}
                loading="lazy"
                style={{ height: a.height }}
                className="block w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="on-dark bg-charcoal-900 py-16 md:py-[78px]">
      <div className="site-container">
        <QuoteCarousel quotes={clientQuotes} eyebrow="Client Voices" />
      </div>
    </section>

    {/* Insights (hidden when every post is unpublished) */}
    {posts.length > 0 && (
      <section className="bg-white py-16 md:py-[84px]">
        <div className="site-container">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-[14px]">Insights</Eyebrow>
              <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[38px]">
                Notes of Interest
              </h2>
            </div>
            <OutlineButton to="/blog">See All Articles</OutlineButton>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <article
                key={post.slug}
                className="grid gap-5 border border-black/[0.12] p-5 transition-colors hover:border-gold/50 sm:grid-cols-[200px_1fr]"
              >
                <ImageSlot
                  label="Article image"
                  src={post.image}
                  alt={post.imageAlt}
                  seed={post.slug}
                  accent={categoryAccent(post.category)}
                  className="aspect-[1.91/1] self-start"
                />
                <div>
                  <p className="m-0 mb-[9px] text-[11.5px] leading-none text-grey-muted">
                    {formatPostDate(post.date)}
                  </p>
                  <h3 className="m-0 mb-[10px] font-display text-base font-semibold leading-[1.35] tracking-[-0.01em] text-charcoal-900">
                    {post.title}
                  </h3>
                  <p className="m-0 mb-[14px] text-[13px] leading-[1.65] text-grey-body">
                    {post.excerpt}
                  </p>
                  <ArrowLink to={`/blog/${post.slug}`}>Read more</ArrowLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* CTA */}
    <section className="bg-champagne-50 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[42px]">
          Let's talk before you sign anything.
        </h2>
        <p className="m-0 mx-auto mb-8 max-w-[520px] text-base font-light leading-[1.7] text-grey-dark">
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
    <section className="on-dark grid items-stretch bg-charcoal-800 lg:grid-cols-2">
      <div className="site-container py-16 md:py-[76px] lg:mx-0 lg:ml-auto lg:max-w-[546px] lg:pr-11">
        <h2 className="m-0 mb-4 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.025em] text-white md:text-[34px]">
          Stay updated with my insights.
        </h2>
        <p className="m-0 mb-7 max-w-[400px] text-[14.5px] font-light leading-[1.7] text-white/[0.66]">
          Occasional notes on the biggest regulation news in sports, tech, and business. No selling,
          just personal insights.
        </p>
        <NewsletterForm tone="dark" withName buttonLabel="Join" />
      </div>
      <StatementPanel
        eyebrow="Featured In"
        seed="home-press"
        tone="dark"
        className="min-h-[240px] lg:min-h-[330px]"
      >
        <div className="flex flex-wrap items-center gap-x-[34px] gap-y-5">
          {pressLogos.map((p) => (
            <img
              key={p.name}
              src={p.src}
              alt={p.name}
              loading="lazy"
              style={{ height: Math.round(26 * p.scale) }}
              className="block w-auto opacity-[0.88]"
            />
          ))}
        </div>
        <p className="m-0 mt-7 max-w-[320px] text-[13px] font-light leading-[1.7] text-white/55">
          Featured in articles on tech, regulations, representation, marketing, NIL, and digital
          rights.
        </p>
      </StatementPanel>
    </section>
  </>
);

export default Home;
