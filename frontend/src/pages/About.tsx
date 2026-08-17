import { Eyebrow, ImageSlot, PrimaryButton } from "@/components/site/ui";
import { RoleTile, StatementPanel } from "@/components/site/art";
import { clientQuotes, milestones, team } from "@/data/site";
import officePortrait from "@/assets/jess_working.jpeg";

const About = () => (
  <>
    <section className="on-dark bg-forest-900 py-16 md:py-[92px]">
      <div className="site-container">
        <Eyebrow tone="dark" className="mb-5">
          About
        </Eyebrow>
        <h1 className="m-0 mb-5 max-w-[820px] text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[46px] lg:text-[54px]">
          From behind a bar in Cincinnati to the negotiating table.
        </h1>
        <p className="m-0 max-w-[560px] text-[16px] font-light leading-[1.65] text-white/[0.72] md:text-[17px]">
          I got into this business because players kept telling me their agents wouldn't call them
          back. Fifteen years later, that is still the standard I hold myself to.
        </p>
      </div>
    </section>

    <section className="bg-white py-12 md:py-[70px]">
      <div className="site-container grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <ImageSlot
          label="Jesse portrait — office"
          src={officePortrait}
          alt="Jesse Foreman in his office"
          className="h-[240px] md:h-[300px]"
          imgClassName="object-[50%_28%]"
        />
        <StatementPanel
          eyebrow="In Short"
          seed="about-quote"
          tone="dark"
          className="min-h-[240px] md:min-h-[300px]"
        >
          <blockquote className="m-0">
            <p className="m-0 font-display text-[19px] font-light leading-[1.45] text-white md:text-[21px]">
              “I went to law school to become an agent. Eleven years later I went back and took the
              bar, because reading the contract yourself is the whole job.”
            </p>
          </blockquote>
        </StatementPanel>
      </div>
    </section>

    <section className="bg-white pb-16 pt-2 md:pb-[90px] md:pt-5">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-[100px]">
          <Eyebrow className="mb-[14px]">The Path</Eyebrow>
          <h2 className="m-0 mb-[22px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
            Milestones that mark the journey.
          </h2>
          <p className="m-0 mb-4 text-[14.5px] leading-[1.75] text-slate-body">
            I was the second person in my family to finish high school and the first to finish
            college. A lot of my family had legal trouble, which is part of why the law ended up
            mattering to me.
          </p>
          <p className="m-0 text-[14.5px] leading-[1.75] text-slate-body">
            I used to own a club. Players would come in and complain about their agents. So I went
            to law school, got certified, and set out to be the agent they described wanting.
          </p>
        </div>

        <div className="flex flex-col">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="grid gap-3 border-t border-forest-900/[0.12] py-[26px] sm:grid-cols-[74px_1fr] sm:gap-6"
            >
              <span className="font-mono text-[13px] font-semibold leading-[1.5] text-moss">
                {m.year}
              </span>
              <div>
                <h3 className="m-0 mb-2 font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-forest-900">
                  {m.title}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.7] text-slate-body">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-800 py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-11 max-w-[520px]">
          <Eyebrow tone="dark" className="mb-[14px]">
            The Bench
          </Eyebrow>
          <h2 className="m-0 mb-4 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[38px]">
            You don't hire one person. You hire a bench.
          </h2>
          <p className="m-0 text-[14.5px] font-light leading-[1.7] text-white/[0.66]">
            Representation is the front door. Behind it sits the network a career actually runs on.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {team.map((t, i) => (
            <div key={t.name}>
              <RoleTile index={i} className="mb-4 aspect-square" />
              <h3 className="m-0 mb-[5px] font-display text-[15px] font-semibold leading-[1.3] text-white">
                {t.name}
              </h3>
              <p className="m-0 text-[12.5px] leading-none text-white/55">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <h2 className="m-0 mb-10 text-center font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
          What clients say.
        </h2>
        <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {clientQuotes.map((c) => (
            <div
              key={c.name + c.role}
              className="flex flex-col border border-forest-900/[0.12] px-6 py-[26px]"
            >
              <span className="mb-4 text-[13px] leading-none tracking-[0.16em] text-gold">
                ★★★★★
              </span>
              <p className="m-0 mb-[22px] flex-1 text-[13.5px] leading-[1.7] text-slate-dark">
                {c.text}
              </p>
              <p className="m-0 mb-[5px] text-[13.5px] font-semibold leading-none text-forest-900">
                {c.name}
              </p>
              <p className="m-0 text-xs leading-none text-slate-muted">{c.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-mint-50 py-16 text-center md:py-[84px]">
      <div className="site-container">
        <h2 className="m-0 mb-4 font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[40px]">
          Have a question about your situation?
        </h2>
        <p className="m-0 mx-auto mb-[30px] max-w-[480px] text-base font-light leading-[1.7] text-slate-dark">
          Contract, representation, or a strategic legal need. Send it over and I'll read it
          personally.
        </p>
        <PrimaryButton to="/contact">Get in Touch</PrimaryButton>
      </div>
    </section>
  </>
);

export default About;
