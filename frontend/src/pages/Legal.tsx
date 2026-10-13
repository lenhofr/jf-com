import { Eyebrow, ImageSlot, PrimaryButton } from "@/components/site/ui";
import legalPortrait from "@/assets/portrait-legal-suit.jpg";

const Legal = () => (
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
        <PrimaryButton href="https://repky.com" external>
          Learn More About Legal Here
        </PrimaryButton>
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
);

export default Legal;
