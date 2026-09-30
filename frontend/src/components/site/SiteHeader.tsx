import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/legal", label: "Legal" },
  { to: "/nfl-agent", label: "The NFL Agent" },
  { to: "/entrepreneur", label: "Entrepreneur" },
  { to: "/speaking", label: "Speaking" },
  { to: "/insights", label: "Insights" },
];

/**
 * The brand mark: a brushed-metal lion shield. The PNG is transparent, so it
 * sits on the white header and the charcoal footer alike. Never recolour it.
 */
export function Logo({ className }: { className?: string }) {
  return <img src={logo} alt="Jesse Foreman" className={cn("block w-auto", className)} />;
}

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever navigation happens.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.09] bg-white">
      <div className="site-container flex items-center gap-8 py-[14px]">
        <Link to="/" aria-label="Jesse Foreman — home" className="flex">
          <Logo className="h-[44px]" />
        </Link>

        <nav className="ml-auto hidden items-center gap-[26px] lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "text-[13px] font-medium leading-none transition-colors hover:text-gold-dark",
                  isActive ? "text-gold-dark" : "text-grey-dark",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="ml-auto hidden rounded-[3px] bg-gold px-[18px] py-[10px] text-[12.5px] font-semibold leading-none text-ink transition-colors hover:bg-gold-dark lg:ml-2 lg:block"
        >
          Work With Me
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto text-charcoal-900 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/[0.09] bg-white lg:hidden">
          <nav className="site-container flex flex-col py-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "border-b border-black/[0.08] py-[14px] text-[15px] font-medium",
                    isActive ? "text-gold-dark" : "text-grey-dark",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="my-4 rounded-[3px] bg-gold px-[18px] py-3 text-center text-[13.5px] font-semibold text-ink transition-colors hover:bg-gold-dark"
            >
              Work With Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
