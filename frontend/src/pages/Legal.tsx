import {
  ArrowLink,
  Eyebrow,
  FaqList,
  GhostButton,
  ImageSlot,
  PrimaryButton,
  QuoteCarousel,
} from "@/components/site/ui";
import { FactList, StatementPanel } from "@/components/site/art";
import { clientQuotes, legalFaqs, legalScope, legalServices } from "@/data/site";
import legalPortrait from "@/assets/portrait-legal-suit.jpg";

const Legal = () => (
  <>
    <section className="border-b border-black/[0.09] bg-grey-50 py-16 md:py-[92px]">
      <div className="site-container grid items-center gap-10 md:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div>
          <Eyebrow className="mb-5">Legal</Eyebrow>
          <h1 className="m-0 mb-5 max-w-[760px] text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-charcoal-700 md:text-[40px] lg:text-[52px]">
            Legal guidance matters most when the decisions are difficult, the consequences are
            significant, and there is no clear path forward.
          </h1>
          <p className="m-0 mb-[34px] max-w-[560px] text-[16px] font-light leading-[1.7] text-grey-dark md:text-[16.5px]">
            Whether protecting someone's rights or helping a business prepare for what's next, the
            objective remains the same:{" "}
            <strong className="font-semibold text-charcoal-900">
              understand the problem, evaluate the risks, and make the next decision count.
            </strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton to="/contact">Request a Review</PrimaryButton>
            <GhostButton to="/about">Credentials</GhostButton>
          </div>
        </div>
        <ImageSlot
          label="Jesse Foreman, Esq."
          src={legalPortrait}
          alt="Jesse L. Foreman, Esq."
          className="h-[360px] border border-black/[0.12] md:h-[440px]"
          imgClassName="object-[50%_35%]"
        />
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="grid gap-px border border-black/[0.12] bg-black/[0.12] md:grid-cols-3">
          {legalServices.map((s) => (
            <div key={s.title} className="bg-white px-[30px] py-9">
              <div className="mb-[22px] h-[26px] w-[26px] rounded-[2px] border-2 border-gold" />
              <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal-900">
                {s.title}
              </h3>
              <p className="m-0 mb-[22px] text-[13.5px] leading-[1.7] text-grey-body">{s.body}</p>
              <ArrowLink to="/contact">Discuss a matter</ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-charcoal-900 py-16 md:py-[78px]">
      <div className="site-container">
        <QuoteCarousel quotes={clientQuotes} />
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="mb-10 text-center">
          <Eyebrow className="mb-[14px]">FAQ</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-charcoal-700 md:text-[38px]">
            Common questions.
          </h2>
        </div>
        <FaqList items={legalFaqs} className="mx-auto max-w-[760px]" />
      </div>
    </section>

    <section className="grid lg:grid-cols-2">
      <div className="on-dark bg-charcoal-800 py-16 md:py-20">
        <div className="site-container lg:mx-0 lg:ml-auto lg:max-w-[546px] lg:pr-11">
          <Eyebrow tone="dark" className="mb-4">
            Next Step
          </Eyebrow>
          <h2 className="m-0 mb-[18px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[38px]">
            Have someone review your document before you sign it.
          </h2>
          <p className="m-0 mb-[30px] max-w-[400px] text-[15px] font-light leading-[1.7] text-white/[0.68]">
            Do not send confidential information. Response times vary with active matters, but every
            inquiry is read personally and as soon as possible.
          </p>
          <PrimaryButton to="/contact" tone="dark">
            Contact Me
          </PrimaryButton>
        </div>
      </div>
      <StatementPanel
        eyebrow="What Gets Reviewed"
        seed="legal-scope"
        tone="dark"
        className="min-h-[240px] lg:min-h-[330px]"
      >
        <FactList items={legalScope} />
      </StatementPanel>
    </section>
  </>
);

export default Legal;
