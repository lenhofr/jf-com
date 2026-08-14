import { ArrowLink, Eyebrow, ImageSlot, OutlineButton } from "@/components/site/ui";
import NewsletterForm from "@/components/site/NewsletterForm";
import { formatPostDate, posts } from "@/data/site";

const series = [
  {
    title: "Read Your Own Contract",
    body: "A clause-by-clause walkthrough of a standard rookie deal. Offsets, guarantees, injury protection, and the language that quietly decides how much of a headline number is real.",
  },
  {
    title: "Conversations",
    body: "Interviews with financial advisors, trainers, and former players about the decisions they wish they had made earlier. Practical, specific, and free of the usual motivational filler.",
  },
];

const Insights = () => (
  <>
    <section className="on-dark relative flex min-h-[340px] items-end overflow-hidden bg-forest-900 md:min-h-[400px]">
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-12 pt-20 md:pb-[60px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-[18px]">
            Insights
          </Eyebrow>
          <h1 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[42px] lg:text-[50px]">
            The parts of the deal nobody puts in the press release.
          </h1>
          <p className="m-0 max-w-[500px] text-base font-light leading-[1.65] text-white/[0.72]">
            Contract mechanics, NIL, and the business of representation, written plainly.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            Latest.
          </h2>
          <OutlineButton to="/blog">See All Posts</OutlineButton>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug}>
              <ImageSlot label="Article image" className="mb-[18px] h-[190px]" />
              <p className="m-0 mb-[10px] text-[11.5px] leading-none text-slate-muted">
                {formatPostDate(post.date)}
              </p>
              <h3 className="m-0 mb-[10px] font-display text-[18px] font-semibold leading-[1.32] tracking-[-0.01em] text-forest-900">
                {post.title}
              </h3>
              <p className="m-0 mb-[14px] text-[13.5px] leading-[1.7] text-slate-body">
                {post.excerpt}
              </p>
              <ArrowLink to={`/blog/${post.slug}`}>Read more</ArrowLink>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-forest-900/[0.09] bg-sage-50 py-16 md:py-20">
      <div className="site-container grid gap-10 md:grid-cols-2 md:gap-14">
        {series.map((s) => (
          <div key={s.title}>
            <Eyebrow className="mb-[14px]">Series</Eyebrow>
            <h3 className="m-0 mb-[14px] font-display text-[24px] font-semibold leading-[1.25] tracking-[-0.02em] text-forest-700">
              {s.title}
            </h3>
            <p className="m-0 text-sm leading-[1.75] text-slate-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="site-container grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <ImageSlot label="Interview still" className="h-[220px] md:h-[280px]" />
        <div>
          <h2 className="m-0 mb-4 font-display text-[28px] font-semibold leading-[1.16] tracking-[-0.025em] text-forest-700 md:text-[34px]">
            Insights from people who've been there.
          </h2>
          <p className="m-0 mb-[26px] text-[14.5px] leading-[1.75] text-slate-body">
            Guests who have negotiated, signed, and occasionally regretted. The goal is a record of
            what the business actually looks like from the inside.
          </p>
          <ArrowLink to="/blog">Listen to the series</ArrowLink>
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-800 py-16 md:py-[76px]">
      <div className="site-container grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-white md:text-[36px]">
          Get new posts in your inbox.
        </h2>
        <div>
          <NewsletterForm tone="dark" className="mb-[14px]" />
          <p className="m-0 text-[11.5px] leading-[1.5] text-white/45">
            No more than twice a month. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Insights;
