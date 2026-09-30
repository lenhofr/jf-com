import {
  Eyebrow,
  FaqList,
  GhostButton,
  HeroPhoto,
  PrimaryButton,
  QuoteCarousel,
} from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { clientQuotes, credentials, nflFaqs, nflServices } from "@/data/site";
import eventPhoto from "@/assets/photo-adidas-event.jpg";

const NflAgent = () => (
  <>
    <section className="on-dark relative flex min-h-[420px] items-end overflow-hidden bg-charcoal-900 md:min-h-[480px]">
      <HeroPhoto src={eventPhoto} imgClassName="object-[50%_55%]" />
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[68px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-5">
            NFLPA Certified Contract Advisor
          </Eyebrow>
          <h1 className="m-0 mb-5 text-balance font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-white md:text-[46px] lg:text-[54px]">
            Guiding clients through the most important decisions and moments in their career and
            after.
          </h1>
          <p className="m-0 mb-[34px] max-w-[520px] text-[16px] font-light leading-[1.65] text-white/75 md:text-[16.5px]">
            Relationships and communication are the key to success in athlete representation.{" "}
            <strong className="font-semibold">
              Your career is the beginning, let's build what will come next.
            </strong>
          </p>
          <PrimaryButton to="/contact" tone="dark">
            Book a Call
          </PrimaryButton>
        </div>
      </div>
    </section>

    <section className="bg-champagne-50 py-16 md:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow className="mb-[14px]">Career Highlights</Eyebrow>
          <h2 className="m-0 mb-5 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-charcoal-700 md:text-[36px]">
            Over a decade as a Certified NFL Agent.
          </h2>
          <p className="m-0 text-[14.5px] leading-[1.75] text-grey-dark">
            Represented multiple Super Bowl Champions, NFL Draft Picks, Pro Bowler, and Undrafted
            Players who have had long NFL Careers.
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
        <div className="grid gap-px border border-black/[0.12] bg-black/[0.12] md:grid-cols-3">
          {nflServices.map((s) => (
            <div key={s.title} className="bg-white px-[30px] py-9">
              <div className="mb-[22px] h-2 w-full rounded-[2px] bg-gold" />
              <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal-900">
                {s.title}
              </h3>
              <p className="m-0 text-[13.5px] leading-[1.7] text-grey-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-charcoal-800 py-16 md:py-[78px]">
      <div className="site-container">
        <QuoteCarousel quotes={clientQuotes} />
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-10 text-center">
          <Eyebrow className="mb-[14px]">FAQ</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[38px]">
            Common Questions
          </h2>
        </div>
        <FaqList items={nflFaqs} className="mx-auto grid max-w-[940px] gap-x-8 md:grid-cols-2" />
      </div>
    </section>

    <section className="on-dark bg-charcoal-900 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-4 font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[42px]">
          Ready to elevate your game?
        </h2>
        <p className="m-0 mx-auto mb-[30px] max-w-[500px] text-base font-light leading-[1.7] text-white/70">
          Tell me where you are in your career. I'll give you an honest evaluation of your market
          before either of us commit to anything.
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
