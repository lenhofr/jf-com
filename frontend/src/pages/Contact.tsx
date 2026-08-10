import { Eyebrow, FaqList, ImageSlot } from "@/components/site/ui";
import ContactForm from "@/components/site/ContactForm";
import { contact, contactFaqs } from "@/data/site";

const Contact = () => (
  <>
    <section className="on-dark bg-forest-900 py-16 text-center md:py-[88px]">
      <div className="site-container">
        <Eyebrow tone="dark" className="mb-5">
          Contact
        </Eyebrow>
        <h1 className="m-0 mx-auto mb-5 max-w-[700px] text-balance font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[44px] lg:text-[52px]">
          Tell me what you're working through.
        </h1>
        <p className="m-0 mx-auto max-w-[520px] text-base font-light leading-[1.7] text-white/[0.72] md:text-[16.5px]">
          A contract, a representation question, or a strategic legal need. I'll review it
          personally and follow up. Response times vary based on active matters.
        </p>
      </div>
    </section>

    <section className="bg-white py-16 md:py-20">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <Eyebrow className="mb-[14px]">Reach Out</Eyebrow>
          <h2 className="m-0 mb-7 font-display text-[28px] font-semibold leading-[1.16] tracking-[-0.025em] text-forest-700 md:text-[34px]">
            Direct lines.
          </h2>

          <div className="mb-8 flex flex-col gap-[18px]">
            <div className="flex flex-col gap-[5px] border-b border-forest-900/10 pb-4">
              <span className="text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-slate-muted">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-[15px] leading-none text-forest-900 transition-colors hover:text-moss"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex flex-col gap-[5px] border-b border-forest-900/10 pb-4">
              <span className="text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-slate-muted">
                Phone
              </span>
              <a
                href={contact.phoneHref}
                className="text-[15px] leading-none text-forest-900 transition-colors hover:text-moss"
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex flex-col gap-[5px] border-b border-forest-900/10 pb-4">
              <span className="text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-slate-muted">
                Office
              </span>
              <span className="text-[15px] leading-[1.5] text-forest-900">{contact.location}</span>
            </div>
          </div>

          <ImageSlot label="Map embed" className="h-[230px]" />
        </div>

        <ContactForm />
      </div>
    </section>

    <section className="bg-mint-50 py-16 md:py-20">
      <div className="site-container">
        <div className="mb-9 text-center">
          <Eyebrow className="mb-[14px]">FAQ</Eyebrow>
          <h2 className="m-0 font-display text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] text-forest-700 md:text-[36px]">
            Before you write.
          </h2>
        </div>
        <FaqList items={contactFaqs} className="mx-auto max-w-[720px]" />
      </div>
    </section>
  </>
);

export default Contact;
