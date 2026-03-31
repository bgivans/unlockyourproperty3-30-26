const badges = [
  "Southern California Focus",
  "ADUs & Code Violations",
  "Inherited Property & Probate",
];

const TrustSection = () => {
  return (
    <section id="trust" className="relative py-24 lg:py-32 bg-background">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-10 lg:mb-14">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
            Trusted by Homeowners, Trustees, and Investors
          </h2>
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            Unlock Your Property works with homeowners, trustees, attorneys, contractors, and development professionals to help navigate complex real estate situations.
          </p>
        </div>

        {/* Badge row */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 font-body text-sm font-medium text-primary min-h-[48px] shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
