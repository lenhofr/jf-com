import { ArrowLink, Eyebrow, PrimaryButton } from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { events, pressMentions, speakingFormats, speakingQuotes } from "@/data/site";

const Speaking = () => (
  <>
    <section className="on-dark bg-forest-900 py-16 md:py-[88px]">
      <div className="site-container">
        <Eyebrow tone="dark" className="mb-5">
          Speaking &amp; Media
        </Eyebrow>
        <h1 className="m-0 mb-5 max-w-[780px] text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[44px] lg:text-[52px]">
          Talks about the money nobody explains to athletes.
        </h1>
        <p className="m-0 max-w-[540px] text-[16px] font-light leading-[1.65] text-white/[0.72] md:text-[16.5px]">
          Financial literacy, NIL, contract mechanics, and the business of representation. For
          programs, summits, and law schools.
        </p>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow className="mb-[14px]">Media</Eyebrow>
            <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
              Selected appearances.
            </h2>
          </div>
          <p className="m-0 max-w-[340px] text-[13.5px] leading-[1.7] text-slate-body">
            Interviews and panels on representation, NIL, and digital rights in sports.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <StatementPanel
            eyebrow="Featured In"
            seed="speaking-press"
            tone="dark"
            className="min-h-[240px] md:min-h-[330px]"
          >
            <div className="flex flex-wrap gap-x-9 gap-y-5">
              {pressMentions.map((p) => (
                <span
                  key={p}
                  className="font-display text-[22px] font-semibold leading-none tracking-[-0.01em] text-white/85 md:text-[27px]"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="m-0 mt-8 max-w-[380px] text-[13.5px] font-light leading-[1.7] text-white/55">
              Interviewed and quoted on representation, NIL, and digital rights, and a Forbes
              Business Council member and contributor for several years.
            </p>
          </StatementPanel>
          <div className="grid gap-5 md:grid-rows-2">
            <div className="flex flex-col justify-center border border-forest-900/[0.12] bg-sage-50 px-7 py-6">
              <p className="m-0 mb-2 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.1em] text-moss">
                Formats
              </p>
              <p className="m-0 text-[14px] leading-[1.6] text-forest-900">
                Keynotes, panels, campus briefings, and locker-room sessions.
              </p>
            </div>
            <div className="flex flex-col justify-center border border-forest-900/[0.12] bg-sage-50 px-7 py-6">
              <p className="m-0 mb-2 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.1em] text-moss">
                Audiences
              </p>
              <p className="m-0 text-[14px] leading-[1.6] text-forest-900">
                Athletes and families, athletic departments, summits, and law schools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-mint-50 py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-11 text-center">
          <Eyebrow className="mb-[14px]">Calendar</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-forest-700 md:text-[38px]">
            Upcoming engagements.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((e) => (
            <div key={e.title} className="border border-forest-900/10 bg-white px-[26px] py-7">
              <p className="m-0 mb-4 font-mono text-[11.5px] font-semibold uppercase leading-none tracking-[0.06em] text-moss">
                {e.when}
              </p>
              <h3 className="m-0 mb-3 font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-forest-900">
                {e.title}
              </h3>
              <p className="m-0 mb-[22px] text-[13.5px] leading-[1.7] text-slate-body">{e.body}</p>
              <ArrowLink to="/contact">Details</ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-800 py-16 md:py-[84px]">
      <div className="site-container">
        <h2 className="m-0 mb-10 text-center font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[36px]">
          What organizers say.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {speakingQuotes.map((s) => (
            <blockquote key={s.name} className="m-0 border border-white/[0.16] px-[26px] py-7">
              <p className="m-0 mb-6 text-[15px] font-light leading-[1.7] text-white/85">
                “{s.text}”
              </p>
              <p className="m-0 mb-[5px] text-[13.5px] font-semibold leading-none text-white">
                {s.name}
              </p>
              <p className="m-0 text-xs leading-none text-white/50">{s.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <StatementPanel
          eyebrow="Session Types"
          seed="speaking-formats"
          tone="dark"
          className="min-h-[240px] md:min-h-[320px]"
        >
          <FactList items={speakingFormats} />
        </StatementPanel>
        <div>
          <h2 className="m-0 mb-[18px] font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            Book a session.
          </h2>
          <p className="m-0 mb-7 text-[14.5px] leading-[1.75] text-slate-body">
            Tell me the audience, the room, and how long you have. I'll tailor the material rather
            than reuse a deck.
          </p>
          <PrimaryButton to="/contact">Book Now</PrimaryButton>
        </div>
      </div>
    </section>
  </>
);

export default Speaking;
