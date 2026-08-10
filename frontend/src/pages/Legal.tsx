import {
  ArrowLink,
  Eyebrow,
  FaqList,
  GhostButton,
  ImageSlot,
  PrimaryButton,
  QuoteCarousel,
} from "@/components/site/ui";
import { clientQuotes, legalFaqs, legalServices } from "@/data/site";

const Legal = () => (
  <>
    <section className="border-b border-forest-900/[0.09] bg-sage-50 py-16 text-center md:py-[92px]">
      <div className="site-container">
        <Eyebrow className="mb-5">Legal</Eyebrow>
        <h1 className="m-0 mx-auto mb-5 max-w-[760px] text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-forest-700 md:text-[44px] lg:text-[52px]">
          Courtroom instincts, applied before there is a courtroom.
        </h1>
        <p className="m-0 mx-auto mb-[34px] max-w-[560px] text-[16px] font-light leading-[1.7] text-slate-dark md:text-[16.5px]">
          Jesse L. Foreman, Esq. JD, University of Cincinnati. Exposure on both the prosecution and
          defense side, now used to anticipate moves and de-risk outcomes for athletes and the
          businesses around them.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <PrimaryButton to="/contact">Request a Review</PrimaryButton>
          <GhostButton to="/about">Credentials</GhostButton>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-[84px]">
      <div className="site-container">
        <div className="grid gap-px border border-forest-900/[0.12] bg-forest-900/[0.12] md:grid-cols-3">
          {legalServices.map((s) => (
            <div key={s.title} className="bg-white px-[30px] py-9">
              <div className="mb-[22px] h-[26px] w-[26px] rounded-[2px] border-2 border-moss" />
              <h3 className="m-0 mb-3 font-display text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-forest-900">
                {s.title}
              </h3>
              <p className="m-0 mb-[22px] text-[13.5px] leading-[1.7] text-slate-body">{s.body}</p>
              <ArrowLink to="/contact">Discuss a matter</ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="on-dark bg-forest-900 py-16 md:py-[78px]">
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
        <FaqList items={legalFaqs} className="mx-auto max-w-[760px]" />
      </div>
    </section>

    <section className="grid lg:grid-cols-2">
      <div className="on-dark bg-forest-800 py-16 md:py-20">
        <div className="site-container lg:mx-0 lg:ml-auto lg:max-w-[546px] lg:pr-11">
          <Eyebrow tone="dark" className="mb-4">
            Next Step
          </Eyebrow>
          <h2 className="m-0 mb-[18px] font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[38px]">
            Send the document before you sign it.
          </h2>
          <p className="m-0 mb-[30px] max-w-[400px] text-[15px] font-light leading-[1.7] text-white/[0.68]">
            Response times vary with active matters, but every inquiry is read personally.
          </p>
          <PrimaryButton to="/contact" tone="dark">
            Contact Me
          </PrimaryButton>
        </div>
      </div>
      <ImageSlot label="Desk / documents photo" className="min-h-[240px] lg:min-h-[330px]" />
    </section>
  </>
);

export default Legal;
