import { useState } from "react";
import { Link } from "react-router-dom";
import situationCodeImg from "@/assets/situation-code-violations.jpg";
import situationInheritedImg from "@/assets/situation-inherited.jpg";
import situationAduImg from "@/assets/situation-adu.jpg";
import situationSellingImg from "@/assets/situation-selling.jpg";
import { FileWarning, Home, Building2, TrendingUp } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Situation value → form dropdown value mapping                      */
/* ------------------------------------------------------------------ */
const cards = [
  {
    title: "Code Violations",
    text: "Received a notice from the city or dealing with unpermitted work? Learn how to resolve enforcement issues, legalize improvements, or evaluate selling options.",
    cta: "View Code Violation Options",
    href: "/solutions/fix-develop#code-violations",
    image: situationCodeImg,
    icon: FileWarning,
    situationValue: "code-violations",
  },
  {
    title: "Inherited or Probate Property",
    text: "Inherited a home or acting as a trustee? Explore strategies for preparing, repositioning, or selling inherited property.",
    cta: "View Inherited Property Options",
    href: "/solutions/real-estate-moves",
    image: situationInheritedImg,
    icon: Home,
    situationValue: "inherited-probate",
  },
  {
    title: "ADU Development",
    text: "Many properties have hidden potential for additional housing or rental income. Learn how ADU planning can unlock value on your property.",
    cta: "View ADU Options",
    href: "/solutions/fix-develop",
    image: situationAduImg,
    icon: Building2,
    situationValue: "adu-development",
  },
  {
    title: "Selling Your Property",
    text: "Whether your home is turnkey or needs improvements, understanding your selling options can make a major difference.",
    cta: "Explore Selling Options",
    href: "/solutions/real-estate-moves#traditional-sale",
    image: situationSellingImg,
    icon: TrendingUp,
    situationValue: "selling-buying",
  },
];

const PropertyOptionsSection = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleCardClick = (situationValue: string) => {
    setSelected(situationValue);
    // Dispatch custom event to sync with StrategyCallForm dropdown
    window.dispatchEvent(
      new CustomEvent("situation-selected", { detail: situationValue })
    );
  };

  return (
    <section id="property-options" className="relative py-24 lg:py-32 bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
            What Situation Are You Dealing With?
          </h2>
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            Choose the path that best fits your property. Each option provides guidance and next steps.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const isSelected = selected === card.situationValue;
            return (
              <div
                key={card.title}
                onClick={() => handleCardClick(card.situationValue)}
                className={`situation-card group relative rounded-2xl border bg-card overflow-hidden shadow-sm cursor-pointer ${
                  isSelected
                    ? "is-selected border-accent"
                    : "border-border hover:shadow-lg hover:shadow-primary/8"
                }`}
              >
                {/* Image band */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                  {/* Icon badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm border border-border/60 shadow-sm">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>

                  {/* Selected badge */}
                  {isSelected && (
                    <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-body text-[15px] sm:text-base leading-relaxed text-muted-foreground mb-6">
                    {card.text}
                  </p>
                  <Link
                    to={card.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent min-h-[48px] px-5 py-3 rounded-full border border-accent/30 bg-accent/5 transition-all duration-200 hover:bg-accent/10 hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {card.cta}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertyOptionsSection;
