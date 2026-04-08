import { useState, useEffect } from "react";
import logoBlack from "@/assets/logo-black.png";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const PHONE_NUMBER = "760-405-8488";
const PHONE_TEL = "tel:+17604058488";

const links = [
  { label: "Home", to: "/" },
  { label: "Fix & Develop", to: "/solutions/fix-develop" },
  { label: "Real Estate Moves", to: "/solutions/real-estate-moves" },
  { label: "Buy", to: "/buy" },
  { label: "About", to: "/about" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to.includes("#")) return false;
    return pathname === to;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "bg-card/98 backdrop-blur-md border-border shadow-sm"
          : "bg-card/60 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12 h-14 sm:h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col items-start justify-center gap-[2px]"
          onClick={() => setOpen(false)}
        >
          <img src={logoBlack} alt="Unlock Your Property" className="h-7 sm:h-9 w-auto object-contain" />
          <span className="font-body text-[8px] sm:text-[9px] uppercase tracking-[0.1em] text-muted-foreground ml-1">Powered by Coast 2 Coast Real Estate Investments</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`nav-link-underline font-body text-sm font-medium px-3 py-2 rounded-md transition-colors min-h-[48px] flex items-center ${
                isActive(link.to)
                  ? "text-primary is-active"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-1.5 font-body text-sm font-semibold text-accent px-3 py-2 rounded-md transition-colors hover:bg-accent/10 min-h-[48px]"
          >
            <Phone className="w-3.5 h-3.5" />
            {PHONE_NUMBER}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-12 h-12 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="md:hidden border-t border-border bg-card/98 backdrop-blur-md">
          <div className="flex flex-col px-5 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`font-body text-base font-medium px-3 py-3 rounded-md min-h-[48px] flex items-center transition-colors ${
                  isActive(link.to)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 font-body text-base font-semibold text-accent px-3 py-3 rounded-md min-h-[48px] transition-colors hover:bg-accent/10"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
