import { Link } from "react-router-dom";
import { contact } from "@/data/site";
import wordmark from "@/assets/wordmark-foreman-company.png";
import { Logo } from "./SiteHeader";

const services = [
  { to: "/legal", label: "Legal" },
  { to: "/nfl-agent", label: "NFL Representation" },
  { to: "/entrepreneur", label: "Entrepreneur Advisory" },
  { to: "/speaking", label: "Speaking & Media" },
];

const more = [
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const labelCls =
  "text-[10.5px] font-semibold uppercase leading-none tracking-[0.16em] text-white/[0.42]";

function Column({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="flex min-w-[150px] flex-col gap-[11px]">
      <span className={`mb-[3px] ${labelCls}`}>{title}</span>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="text-[13px] leading-none text-white/[0.78] transition-colors hover:text-white"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

const SiteFooter = () => (
  <footer className="on-dark bg-charcoal-900 pb-10 pt-[52px]">
    <div className="site-container">
      <div className="flex flex-wrap items-start gap-10">
        <div className="min-w-[220px] flex-1 basis-[260px]">
          <div className="mb-[18px]">
            <Logo className="h-[52px]" />
          </div>
          <p className="m-0 max-w-[280px] text-[13px] leading-[1.7] text-white/[0.62]">
            Jesse L. Foreman, Esq.
            <br />
            Licensed Attorney &amp; NFLPA Certified Contract Advisor
            <br />
            Helping make better decisions in high-stakes moments.
          </p>
        </div>

        <Column title="Services" links={services} />
        <Column title="More" links={more} />

        <div className="flex min-w-[180px] flex-col gap-[11px]">
          <span className={`mb-[3px] ${labelCls}`}>Contact</span>
          <a
            href={`mailto:${contact.email}`}
            className="text-[13px] leading-none text-white/[0.78] transition-colors hover:text-white"
          >
            {contact.email}
          </a>
          <a
            href={contact.phoneHref}
            className="text-[13px] leading-none text-white/[0.78] transition-colors hover:text-white"
          >
            {contact.phone}
          </a>
          <span className="text-[13px] leading-[1.5] text-white/[0.78]">{contact.location}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.12] pt-[22px]">
        <span className="text-xs leading-none text-white/[0.42]">
          © {new Date().getFullYear()} The Foreman Company. All rights reserved.
        </span>
        <img
          src={wordmark}
          alt="The Foreman Company"
          loading="lazy"
          className="h-12 w-auto object-contain opacity-85"
        />
      </div>

      <div className="mt-[22px] border-t border-white/[0.12] pt-[18px]">
        <p className={`m-0 mb-[6px] ${labelCls}`}>Disclaimer</p>
        <p className="m-0 max-w-[820px] text-[11.5px] leading-[1.65] text-white/[0.42]">
          The information you obtain at this site is not, nor is it intended to be, legal advice.
          You should consult an attorney for advice regarding your individual situation. We invite
          you to contact us and welcome your calls, letters and electronic mail. Contacting us does
          not create an attorney-client relationship. Please do not send any confidential
          information to us until such time as an attorney-client relationship has been established.
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
