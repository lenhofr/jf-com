import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLink, Eyebrow, ImageSlot } from "@/components/site/ui";
import NewsletterForm from "@/components/site/NewsletterForm";
import { formatPostDate, posts } from "@/data/site";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);

  // Unknown slug reuses the site's 404 rather than inventing a second one.
  if (index === -1) return <NotFound />;

  const post = posts[index];
  // posts is sorted newest first, so the next entry is the older one.
  const older = posts[index + 1];
  const newer = posts[index - 1];

  return (
    <>
      <section className="on-dark bg-forest-800 py-16 md:py-20">
        <div className="site-container max-w-[760px]">
          <Eyebrow tone="dark" className="mb-[18px]">
            {post.category}
          </Eyebrow>
          <h1 className="m-0 mb-[18px] text-balance font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[40px] lg:text-[44px]">
            {post.title}
          </h1>
          <p className="m-0 mb-7 text-base font-light leading-[1.65] text-white/[0.72]">
            {post.excerpt}
          </p>
          <p className="m-0 text-[11.5px] leading-none text-white/55">
            {formatPostDate(post.date)}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="site-container max-w-[760px]">
          <ImageSlot label="Article image" className="mb-10 h-[240px] md:h-[320px]" />

          <div
            className="prose max-w-none
              prose-headings:font-display prose-headings:font-semibold
              prose-headings:tracking-[-0.02em] prose-headings:text-forest-900
              prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-[22px] prose-h2:leading-[1.25]
              prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-[18px]
              prose-p:text-[15.5px] prose-p:font-light prose-p:leading-[1.8] prose-p:text-slate-body
              prose-a:font-semibold prose-a:text-moss prose-a:no-underline hover:prose-a:text-forest-700
              prose-strong:font-semibold prose-strong:text-forest-900
              prose-blockquote:border-l prose-blockquote:border-moss
              prose-blockquote:font-display prose-blockquote:text-[17px]
              prose-blockquote:font-light prose-blockquote:not-italic
              prose-blockquote:text-forest-700
              prose-li:text-[15.5px] prose-li:font-light prose-li:leading-[1.8]
              prose-li:text-slate-body
              prose-img:w-full"
          >
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-forest-900/[0.12] pt-7">
            {newer ? (
              <Link
                to={`/blog/${newer.slug}`}
                className="text-[12.5px] font-semibold leading-none text-moss transition-colors hover:text-forest-700"
              >
                ← {newer.title}
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <ArrowLink to={`/blog/${older.slug}`} className="text-right">
                {older.title}
              </ArrowLink>
            ) : (
              <span />
            )}
          </div>

          <div className="mt-9">
            <ArrowLink to="/blog">All posts</ArrowLink>
          </div>
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

export default BlogPost;
