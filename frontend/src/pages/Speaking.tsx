import { ArrowLink, Eyebrow, HeroPhoto, PrimaryButton } from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { events, pressLogos, speakingFormats, speakingQuotes } from "@/data/site";
import panelPhoto from "@/assets/photo-speaking-panel.jpg";

const infoBoxes = [
  {
    label: "Formats",
    text: "Keynotes, Panels, Lightning Talks, Fishbowl, Fireside Chats, and Campus briefings.",
  },
  {
    label: "Audiences",
    text: "Entrepreneurs, Athletes, Visionaries, Technological Developers, and Legal Professionals.",
  },
];

const Speaking = () => (
  <>
    <section className="on-dark relative flex min-h-[420px] items-end overflow-hidden bg-charcoal-900 md:min-h-[480px]">
      {/* The venue lighting is saturated purple; muted so it sits in the palette. */}
      <HeroPhoto src={panelPhoto} imgClassName="object-[50%_45%] saturate-[0.15]" />
      <div className="hero-hatch absolute inset-0" />
      <div className="site-container relative pb-14 pt-24 md:pb-[68px]">
        <div className="max-w-[720px]">
          <Eyebrow tone="dark" className="mb-5">
            Speaking &amp; Media
          </Eyebrow>
          <h1 className="m-0 mb-5 text-balance font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-white md:text-[46px] lg:text-[54px]">
            Ideas Worth Sharing.
          </h1>
          <p className="m-0 max-w-[520px] text-[16px] font-light leading-[1.65] text-white/75 md:text-[16.5px]">
            I challenge audiences to think critically about{" "}
            <strong className="font-semibold">what comes next.</strong>
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="site-container">
        <div className="mb-9">
          <Eyebrow className="mb-[14px]">Media</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-charcoal-700 md:text-[36px]">
            Selected appearances.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <StatementPanel
            eyebrow="Featured In"
            seed="speaking-press"
            tone="dark"
            className="min-h-[240px] md:min-h-[330px]"
          >
            <div className="flex flex-wrap items-center gap-x-[38px] gap-y-[22px]">
              {pressLogos.map((p) => (
                <img
                  key={p.name}
                  src={p.src}
                  alt={p.name}
                  loading="lazy"
                  style={{ height: Math.round(30 * p.scale) }}
                  className="block w-auto opacity-[0.88]"
                />
              ))}
            </div>
            <p className="m-0 mt-8 max-w-[380px] text-[13.5px] font-light leading-[1.7] text-white/55">
              Featured in articles on tech, regulations, representation, marketing, NIL, and digital
              rights.
            </p>
          </StatementPanel>
          <div className="grid gap-5 md:grid-rows-2">
            {infoBoxes.map((b) => (
              <div
                key={b.label}
                className="flex flex-col justify-center border border-black/[0.12] bg-grey-50 px-7 py-6"
              >
                <p className="m-0 mb-2 font-mono text-[10.5px] font-semibold uppercase leading-none tracking-[0.1em] text-gold-dark">
                  {b.label}
                </p>
                <p className="m-0 text-[14px] leading-[1.6] text-charcoal-900">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-champagne-50 py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-11 text-center">
          <Eyebrow className="mb-[14px]">Calendar</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[38px]">
            Upcoming engagements.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[760px] gap-5 md:grid-cols-2">
          {events.map((e, i) => (
            <div key={`event-${i}`} className="border border-black/10 bg-white px-[26px] py-7">
              {e.when && (
                <p className="m-0 mb-4 font-mono text-[11.5px] font-semibold uppercase leading-none tracking-[0.06em] text-gold-dark">
                  {e.when}
                </p>
              )}
              <h3 className="m-0 mb-3 font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal-900">
                {e.title}
              </h3>
              {e.body && (
                <p className="m-0 mb-[22px] text-[13.5px] leading-[1.7] text-grey-body">{e.body}</p>
              )}
              {e.when && <ArrowLink to="/contact">Details</ArrowLink>}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-charcoal-800 py-16 md:py-[84px]">
      <div className="site-container">
        <h2 className="m-0 mb-10 text-center font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[36px]">
          What organizers say.
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {speakingQuotes.map((s, i) => (
            <blockquote key={`sq-${i}`} className="m-0 border border-white/[0.16] px-[26px] py-7">
              <p className="m-0 text-[15px] font-light leading-[1.7] text-white/85">{s.text}</p>
              {s.name && (
                <p className="m-0 mt-6 text-[13.5px] font-semibold leading-none text-white">
                  {s.name}
                </p>
              )}
              {s.role && (
                <p className="m-0 mt-[5px] text-xs leading-none text-white/50">{s.role}</p>
              )}
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
          <h2 className="m-0 mb-[18px] font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-charcoal-700 md:text-[36px]">
            Book a session.
          </h2>
          <p className="m-0 mb-7 text-[14.5px] leading-[1.75] text-grey-body">
            Please provide me with the audience size, the topic, location and the length of the
            presentation.
          </p>
          <PrimaryButton to="/contact">Book Now</PrimaryButton>
        </div>
      </div>
    </section>
  </>
);

export default Speaking;
