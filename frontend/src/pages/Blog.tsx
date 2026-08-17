import { useState } from "react";
import { ArrowLink, Eyebrow, GhostButton, ImageSlot, PrimaryButton } from "@/components/site/ui";
import { categoryAccent } from "@/lib/art-tokens";
import NewsletterForm from "@/components/site/NewsletterForm";
import { formatPostDate, posts, postCategories } from "@/data/site";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

const Blog = () => {
  const [filter, setFilter] = useState<string>("All");
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const visible = filtered.slice(0, shown);

  const selectFilter = (f: string) => {
    setFilter(f);
    setShown(PAGE_SIZE);
  };

  return (
    <>
      <section className="on-dark bg-forest-800 py-16 md:py-20">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow tone="dark" className="mb-[18px]">
              Blog
            </Eyebrow>
            <h1 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[40px] lg:text-[46px]">
              Writing about the business, not the highlights.
            </h1>
            <p className="m-0 mb-7 text-base font-light leading-[1.65] text-white/[0.72]">
              Everything I publish, in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton to="/insights" tone="dark">
                Featured Series
              </PrimaryButton>
              <GhostButton to="/contact" tone="dark">
                Get in Touch
              </GhostButton>
            </div>
          </div>
          <ImageSlot
            label="Feature image"
            tone="dark"
            seed="blog-hero"
            className="h-[220px] lg:h-[280px]"
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="site-container">
          <div className="mb-9 flex flex-wrap items-center gap-[10px]">
            {["All", ...postCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectFilter(c)}
                aria-pressed={filter === c}
                className={cn(
                  "rounded-full px-[15px] py-[7px] text-xs leading-none transition-colors",
                  filter === c
                    ? "bg-forest-900 font-semibold text-white"
                    : "border border-forest-900/[0.18] font-medium text-slate-dark hover:border-moss hover:text-moss",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-x-6 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <article key={post.slug}>
                <ImageSlot
                  label="Article image"
                  src={post.image}
                  alt={post.imageAlt}
                  seed={post.slug}
                  accent={categoryAccent(post.category)}
                  className="mb-4 h-[180px]"
                />
                <p className="m-0 mb-[9px] text-[11.5px] leading-none text-slate-muted">
                  {formatPostDate(post.date)}
                </p>
                <h3 className="m-0 mb-[10px] font-display text-[17px] font-semibold leading-[1.32] tracking-[-0.01em] text-forest-900">
                  {post.title}
                </h3>
                <p className="m-0 mb-3 text-[13px] leading-[1.7] text-slate-body">{post.excerpt}</p>
                <ArrowLink to={`/blog/${post.slug}`}>Read more</ArrowLink>
              </article>
            ))}
          </div>

          {visible.length < filtered.length && (
            <div className="mt-11 text-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
                className="rounded-[3px] border border-forest-900/25 px-6 py-3 text-[12.5px] font-semibold leading-none text-forest-900 transition-colors hover:border-moss hover:text-moss"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-mint-50 py-16 text-center md:py-[76px]">
        <div className="site-container">
          <h2 className="m-0 mb-[14px] font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            Stay informed.
          </h2>
          <p className="m-0 mx-auto mb-7 max-w-[460px] text-[15.5px] font-light leading-[1.7] text-slate-dark">
            New posts, delivered when there's something worth saying.
          </p>
          <NewsletterForm tone="light" className="mx-auto max-w-[480px]" />
        </div>
      </section>
    </>
  );
};

export default Blog;
