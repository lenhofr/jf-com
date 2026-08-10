import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eyebrow, GhostButton, PrimaryButton } from "@/components/site/ui";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="on-dark flex min-h-[60vh] items-center bg-forest-900 py-20">
      <div className="site-container text-center">
        <Eyebrow tone="dark" className="mb-5">
          404
        </Eyebrow>
        <h1 className="m-0 mb-5 font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[44px]">
          That page isn't here.
        </h1>
        <p className="m-0 mx-auto mb-8 max-w-[460px] text-base font-light leading-[1.7] text-white/[0.72]">
          The link may be out of date. Start from the homepage, or send a note and I'll point you in
          the right direction.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton to="/" tone="dark">
            Back Home
          </PrimaryButton>
          <GhostButton to="/contact" tone="dark">
            Contact Me
          </GhostButton>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
