import { Eyebrow, FaqList, HeroPhoto, PrimaryButton } from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { entrepreneurFaqs, ventures } from "@/data/site";
import chairPhoto from "@/assets/photo-entrepreneur-chair.png";

const pillars = [
  {
    n: "01",
    title: "Venture Vetting",
    body: "Let me evaluate the investment opportunity and any potential future risk that may be associated.",
  },
  {
    n: "02",
    title: "Start Ups",
    body: "Let me advise you through the incorporation process and help build a roadmap for your companies success.",
  },
  {
    n: "03",
    title: "Regulations",
    body: "Let me help you navigate Rule 506, 83b election, Simple Agreement for Future Equity (SAFE), Special Purpose Vehicle (SPV), IRC 409A, etc.",
  },
];

const Entrepreneur = () => (
  <>
    <section className="on-dark relative flex min-h-[420px] items-end overflow-hidden bg-charcoal-900 md:min-h-[480px]">
      <HeroPhoto src={chairPhoto} imgClassName="object-[50%_30%]" />
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[68px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-5">
            Entrepreneur
          </Eyebrow>
          <h1 className="m-0 mb-5 text-balance font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-white md:text-[46px] lg:text-[54px]">
            Let's build the future together.
          </h1>
          <p className="m-0 max-w-[520px] text-[16px] font-light leading-[1.65] text-white/75 md:text-[16.5px]">
            Agency founder, sports digital rights founder, and serial entrepreneur. Advice from
            someone who has taken the risk, not just read about it.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-champagne-50 py-16 md:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow className="mb-[14px]">Track Record</Eyebrow>
          <h2 className="m-0 mb-5 font-display text-[28px] font-semibold leading-[1.14] tracking-[-0.025em] text-charcoal-700 md:text-[36px]">
            The future creates new possibilities. It also creates new decisions.
          </h2>
          <p className="m-0 mb-4 text-[14.5px] leading-[1.75] text-grey-dark">
            I have founded a sports agency, marketing agency, NFT project (with Lil Wayne),
            technological company, social networking site, fitness company, and an invention
            development company.
          </p>
          <p className="m-0 text-[14.5px] leading-[1.75] text-grey-dark">
            I was also early to social platforms as a recruiting channel when most of the industry
            still thought it was a distraction. Being early is uncomfortable experience and that is
            where the advantage lives.
          </p>
        </div>
        <StatementPanel
          eyebrow="Ventures"
          seed="entrepreneur-ventures"
          tone="dark"
          className="min-h-[260px] md:min-h-[340px]"
        >
          <FactList items={ventures} />
        </StatementPanel>
      </div>
    </section>

    <section className="on-dark bg-charcoal-800 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <Eyebrow tone="dark" className="mb-[22px]">
          Advisory
        </Eyebrow>
        <blockquote className="m-0">
          <p className="m-0 mx-auto mb-[26px] max-w-[820px] font-display text-[22px] font-light leading-[1.45] text-white md:text-[28px]">
            “Representation isn't just about reacting. It's positioning a client so the right
            opportunities become inevitable.”
          </p>
          <p className="m-0 text-sm font-semibold leading-none text-white">
            Jesse L. Foreman, Esq.
          </p>
        </blockquote>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container grid gap-10 md:grid-cols-3 md:gap-11">
        {pillars.map((p) => (
          <div key={p.n}>
            <span className="mb-4 block font-mono text-[11px] font-semibold leading-none text-gold-dark">
              {p.n}
            </span>
            <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal-900">
              {p.title}
            </h3>
            <p className="m-0 text-[13.5px] leading-[1.7] text-grey-body">{p.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="border-t border-black/[0.09] bg-grey-50 py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-10 text-center">
          <Eyebrow className="mb-[14px]">FAQ</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[38px]">
            Common questions.
          </h2>
        </div>
        <FaqList items={entrepreneurFaqs} className="mx-auto max-w-[760px]" />
      </div>
    </section>

    <section className="on-dark bg-charcoal-900 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-4 font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[40px]">
          Let's bring your vision to life.
        </h2>
        <p className="m-0 mx-auto mb-[30px] max-w-[500px] text-base font-light leading-[1.7] text-white/70">
          Bring me the idea, the term sheet, or existing company. I'll tell you what steps you
          should take next.
        </p>
        <PrimaryButton to="/contact" tone="dark">
          Work With Me
        </PrimaryButton>
      </div>
    </section>
  </>
);

export default Entrepreneur;
