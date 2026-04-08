import logoBlack from "@/assets/logo-black.png";
import { Info } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-10 lg:py-12">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        <img src={logoBlack} alt="Unlock Your Property" className="h-8 sm:h-12 w-auto mb-4 object-contain" />

        {/* Coast 2 Coast line with tooltip */}
        <p className="font-body text-xs sm:text-sm text-foreground mb-4 flex items-center gap-1.5 justify-center flex-wrap">
          <span>Real estate services provided by Coast 2 Coast Real Estate Investments, DRE #02193707</span>
          <span className="c2c-tooltip-wrap" tabIndex={0}>
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="c2c-tooltip">
              Unlock Your Property provides strategy and consulting. Licensed brokerage services are provided by Coast 2 Coast Real Estate Investments, DRE #02193707.
            </span>
          </span>
        </p>

        <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Unlock Your Property provides real estate consulting, development guidance, and permit documentation services through employed and contracted professionals. We work with a network of trusted partners to support a range of property-related needs. We do not provide legal, tax, architectural, or engineering services. Javier Feria is a licensed real estate advisor (CA DRE #02125445). Brokerage services, when applicable, are provided through Coast 2 Coast Real Estate Investments (DRE #02193707).
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
