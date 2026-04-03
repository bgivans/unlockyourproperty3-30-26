import logoBlack from "@/assets/logo-black.png";
import { Info } from "lucide-react";
import { serviceAreas } from "@/data/serviceAreas";

const SiteFooter = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-10 lg:py-12">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
        <img src={logoBlack} alt="Unlock Your Property" className="h-8 sm:h-12 w-auto mb-4 object-contain" />

        {/* Areas We Serve */}
        <p className="font-body text-xs sm:text-sm font-semibold text-foreground mb-2">
          Areas We Serve
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="font-body text-[11px] sm:text-xs px-3 py-1 rounded-full border border-border bg-background text-muted-foreground"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Coast 2 Coast line with tooltip */}
        <p className="font-body text-xs sm:text-sm text-foreground mb-4 flex items-center gap-1.5 justify-center flex-wrap">
          <span>Real estate services provided by Coast 2 Coast Realty, DRE #02193707</span>
          <span className="c2c-tooltip-wrap" tabIndex={0}>
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="c2c-tooltip">
              Unlock Your Property provides strategy and consulting. Licensed brokerage services are provided by Coast 2 Coast Realty, DRE #02193707.
            </span>
          </span>
        </p>

        <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          Unlock Your Property provides real estate consulting, development guidance, and permit documentation services through employed or contracted designers. We do not provide legal, tax, architectural, or engineering services. Brokerage services, when applicable, are handled separately through the licensed brokerage entity Coast 2 Coast Realty, DRE #02193707.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
