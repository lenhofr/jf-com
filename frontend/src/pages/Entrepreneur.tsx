import { Eyebrow, PrimaryButton } from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { network, ventures } from "@/data/site";

const pillars = [
  {
    n: "01",
    title: "Venture Vetting",
    body: "After a signing bonus, everyone has a deal for you. I read the cap table and the terms before you write the check.",
  },
  {
    n: "02",
    title: "Brand & Likeness",
    body: "Endorsements, licensing, and digital rights structured so the value returns to you rather than the platform.",
  },
  {
    n: "03",
    title: "Second Act Planning",
    body: "Careers are short. The work of turning a playing income into a durable business starts long before the last snap.",
  },
];

const Entrepreneur = () => (
  <>
    <section className="on-dark bg-forest-900 py-16 md:py-[88px]">
      <div className="site-container grid items-end gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow tone="dark" className="mb-5">
            Entrepreneur
          </Eyebrow>
          <h1 className="m-0 text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[44px] lg:text-[50px]">
            I've built the thing I'm advising you on.
          </h1>
        </div>
        <p className="m-0 text-base font-light leading-[1.7] text-white/[0.72] lg:mb-2">
          Agency founder, early operator in sports digital rights, and a builder who has raised,
          hired, and shut things down. Advice from someone who has taken the risk, not read about
          it.
        </p>
      </div>
    </section>

    <section className="bg-mint-50 py-16 md:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow className="mb-[14px]">Track Record</Eyebrow>
          <h2 className="m-0 mb-5 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            What I've actually run.
          </h2>
          <p className="m-0 mb-4 text-[14.5px] leading-[1.75] text-slate-dark">
            I founded Global Sports and Entertainment out of law school with a business partner and
            learned the operations side of an agency the hard way. Later I led a digital rights
            division at Young Money APAA, one of the first in the industry.
          </p>
          <p className="m-0 text-[14.5px] leading-[1.75] text-slate-dark">
            I was also early to social platforms as a recruiting channel when most of the industry
            still thought it was a distraction. Being early is uncomfortable and occasionally
            expensive. It is also where the advantage lives.
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

    <section className="on-dark bg-forest-800 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <Eyebrow tone="dark" className="mb-[22px]">
          Advisory
        </Eyebrow>
        <blockquote className="m-0">
          <p className="m-0 mx-auto mb-[26px] max-w-[820px] font-display text-[22px] font-light leading-[1.45] text-white md:text-[28px]">
            “Representation isn't just about reacting. It's positioning a client so the right
            opportunities become inevitable.”
          </p>
          <p className="m-0 mb-[5px] text-sm font-semibold leading-none text-white">
            Jesse L. Foreman, Esq.
          </p>
          <p className="m-0 text-[13px] leading-none text-white/55">
            NFLPA Certified Contract Advisor
          </p>
        </blockquote>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container grid gap-10 md:grid-cols-3 md:gap-11">
        {pillars.map((p) => (
          <div key={p.n}>
            <span className="mb-4 block font-mono text-[11px] font-semibold leading-none text-moss">
              {p.n}
            </span>
            <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-forest-900">
              {p.title}
            </h3>
            <p className="m-0 text-[13.5px] leading-[1.7] text-slate-body">{p.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="border-t border-forest-900/[0.09] bg-sage-50 py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-11 text-center">
          <Eyebrow className="mb-[14px]">The Network</Eyebrow>
          <h2 className="m-0 mx-auto max-w-[620px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
            The specialists I bring in.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {network.map((n) => (
            <div key={n.name} className="border border-forest-900/10 bg-white px-[22px] py-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-moss/30 bg-mint-50">
                <span className="font-mono text-[12px] font-semibold leading-none text-moss">
                  {n.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <h3 className="m-0 mb-1 font-display text-[14.5px] font-semibold leading-[1.3] text-forest-900">
                {n.name}
              </h3>
              <p className="m-0 mb-3 text-[11.5px] leading-none text-moss">{n.role}</p>
              <p className="m-0 text-[12.5px] leading-[1.65] text-slate-body">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-900 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <h2 className="m-0 mb-4 font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[40px]">
          Let's turn the vision into a structure.
        </h2>
        <p className="m-0 mx-auto mb-[30px] max-w-[500px] text-base font-light leading-[1.7] text-white/70">
          Bring me the idea, the term sheet, or the mess. I'll tell you what I'd do with it.
        </p>
        <PrimaryButton to="/contact" tone="dark">
          Work With Me
        </PrimaryButton>
      </div>
    </section>
  </>
);

export default Entrepreneur;
