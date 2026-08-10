import { Link } from "react-router-dom";
import { contact } from "@/data/site";
import { Monogram } from "./SiteHeader";

const services = [
  { to: "/nfl-agent", label: "NFL Representation" },
  { to: "/legal", label: "Legal Counsel" },
  { to: "/entrepreneur", label: "Entrepreneur Advisory" },
  { to: "/speaking", label: "Speaking & Media" },
];

const more = [
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function Column({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="flex min-w-[150px] flex-col gap-[11px]">
      <span className="mb-[3px] text-[10.5px] font-semibold uppercase leading-none tracking-[0.16em] text-white/[0.42]">
        {title}
      </span>
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
  <footer className="on-dark bg-forest-900 pb-10 pt-[52px]">
    <div className="site-container">
      <div className="flex flex-wrap items-start gap-10">
        <div className="min-w-[220px] flex-1 basis-[260px]">
          <div className="mb-[18px]">
            <Monogram tone="light" />
          </div>
          <p className="m-0 max-w-[280px] text-[13px] leading-[1.7] text-white/[0.62]">
            Jesse L. Foreman, Esq. NFLPA-certified contract advisor and attorney. Athlete
            representation, contract negotiation, and strategic legal counsel.
          </p>
        </div>

        <Column title="Services" links={services} />
        <Column title="More" links={more} />

        <div className="flex min-w-[180px] flex-col gap-[11px]">
          <span className="mb-[3px] text-[10.5px] font-semibold uppercase leading-none tracking-[0.16em] text-white/[0.42]">
            Contact
          </span>
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
          © {new Date().getFullYear()} Jesse Foreman. All rights reserved.
        </span>
        <span className="text-xs leading-none text-white/[0.42]">
          NFLPA Certified Contract Advisor since 2014
        </span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
