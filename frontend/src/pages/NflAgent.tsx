import { Eyebrow, FaqList, GhostButton, PrimaryButton, QuoteCarousel } from "@/components/site/ui";
import { FactList, FieldArt, StatementPanel } from "@/components/site/art";
import { clientQuotes, credentials, nflFaqs, nflServices } from "@/data/site";

const NflAgent = () => (
  <>
    <section className="on-dark relative flex min-h-[420px] items-end overflow-hidden bg-forest-900 md:min-h-[480px]">
      {/* Art fills the right half where the mockup called for a stadium photo. */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <FieldArt seed="nfl-hero" tone="dark" variant={0} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/70 to-forest-900/25" />
      </div>
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[68px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-5">
            The NFL Agent
          </Eyebrow>
          <h1 className="m-0 mb-5 text-balance font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-white md:text-[46px] lg:text-[54px]">
            Certified since 2014. Still taking my own calls.
          </h1>
          <p className="m-0 max-w-[520px] text-[16px] font-light leading-[1.65] text-white/75 md:text-[16.5px]">
            Draft picks, Super Bowl winners, and veterans on their third contract. A small roster is
            a deliberate choice, not a limitation.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-mint-50 py-16 md:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow className="mb-[14px]">Representation</Eyebrow>
          <h2 className="m-0 mb-5 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            What an agent is actually for.
          </h2>
          <p className="m-0 mb-4 text-[14.5px] leading-[1.75] text-slate-dark">
            Representation isn't reacting to offers. It's positioning a client so the right
            opportunities become inevitable, then making sure the paperwork reflects it.
          </p>
          <p className="m-0 text-[14.5px] leading-[1.75] text-slate-dark">
            I've represented draft picks, Super Bowl winners, and veterans negotiating a third deal.
            I stay ahead of where the business is going, and I tell clients the truth about their
            market even when it costs me the signature.
          </p>
        </div>
        <StatementPanel
          eyebrow="Credentials"
          seed="nfl-credentials"
          tone="dark"
          className="min-h-[260px] md:min-h-[340px]"
        >
          <FactList items={credentials} />
        </StatementPanel>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="grid gap-px border border-forest-900/[0.12] bg-forest-900/[0.12] md:grid-cols-3">
          {nflServices.map((s) => (
            <div key={s.title} className="bg-white px-[30px] py-9">
              <div className="mb-[22px] h-[26px] w-[26px] rounded-[2px] bg-moss" />
              <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-forest-900">
                {s.title}
              </h3>
              <p className="m-0 text-[13.5px] leading-[1.7] text-slate-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-800 py-16 md:py-[78px]">
      <div className="site-container">
        <QuoteCarousel quotes={clientQuotes} />
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-10 text-center">
          <Eyebrow className="mb-[14px]">FAQ</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
            Common questions.
          </h2>
        </div>
        <FaqList items={nflFaqs} className="mx-auto grid max-w-[940px] gap-x-8 md:grid-cols-2" />
      </div>
    </section>

    <section className="on-dark bg-forest-900 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-4 font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[42px]">
          Ready to elevate your game?
        </h2>
        <p className="m-0 mx-auto mb-[30px] max-w-[500px] text-base font-light leading-[1.7] text-white/70">
          Tell me where you are in your career. I'll give you an honest read on your market before
          either of us commits to anything.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton to="/contact" tone="dark">
            Book a Call
          </PrimaryButton>
          <GhostButton to="/about" tone="dark">
            My Background
          </GhostButton>
        </div>
      </div>
    </section>
  </>
);

export default NflAgent;
