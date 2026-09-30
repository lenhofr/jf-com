import { ArrowLink, Eyebrow, HeroPhoto, ImageSlot, OutlineButton } from "@/components/site/ui";
import { categoryAccent } from "@/lib/art-tokens";
import NewsletterForm from "@/components/site/NewsletterForm";
import { formatPostDate, posts } from "@/data/site";
import insightsPortrait from "@/assets/portrait-insights-charcoal.png";

const Insights = () => (
  <>
    <section className="on-dark relative flex min-h-[340px] items-center overflow-hidden bg-charcoal-900 md:min-h-[540px]">
      {/* The portrait's backdrop was recoloured to charcoal, so it needs a
          softer scrim than the other heroes plus a fade into the section below. */}
      <HeroPhoto
        src={insightsPortrait}
        imgClassName="object-[50%_30%] opacity-[0.92]"
        scrim="bg-[linear-gradient(to_right,#141414_0%,rgba(20,20,20,0.7)_30%,rgba(20,20,20,0.15)_65%,transparent_100%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#141414_0%,transparent_28%)]" />
      </HeroPhoto>
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative py-[60px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-[18px]">
            Insights
          </Eyebrow>
          <h1 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[42px] lg:text-[50px]">
            Trusted guidance for consequential decisions.
          </h1>
          <p className="m-0 max-w-[500px] text-base font-light leading-[1.65] text-white/[0.72]">
            The latest insights in sports, law, business, and technology.
          </p>
        </div>
      </div>
    </section>

    {posts.length > 0 && (
      <section className="bg-white py-16 md:py-20">
        <div className="site-container">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-charcoal-700 md:text-[36px]">
              Latest.
            </h2>
            <OutlineButton to="/blog">See All Posts</OutlineButton>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <article key={post.slug}>
                <ImageSlot
                  label="Article image"
                  src={post.image}
                  alt={post.imageAlt}
                  seed={post.slug}
                  accent={categoryAccent(post.category)}
                  className="mb-[18px] aspect-[1.91/1]"
                />
                <p className="m-0 mb-[10px] text-[11.5px] leading-none text-grey-muted">
                  {formatPostDate(post.date)}
                </p>
                <h3 className="m-0 mb-[10px] font-display text-[18px] font-semibold leading-[1.32] tracking-[-0.01em] text-charcoal-900">
                  {post.title}
                </h3>
                <p className="m-0 mb-[14px] text-[13.5px] leading-[1.7] text-grey-body">
                  {post.excerpt}
                </p>
                <ArrowLink to={`/blog/${post.slug}`}>Read more</ArrowLink>
              </article>
            ))}
          </div>
        </div>
      </section>
    )}

    <section className="on-dark bg-charcoal-800 py-16 md:py-[76px]">
      <div className="site-container grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-white md:text-[36px]">
          Stay up to date!
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
