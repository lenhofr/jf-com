import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { metaForPath } from "@/data/seo";
import { applyPageMeta } from "@/lib/page-meta";

const SiteLayout = () => {
  const { pathname } = useLocation();

  // Each nav item is a full page in this design, so start every one at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
    applyPageMeta(metaForPath(pathname), pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
