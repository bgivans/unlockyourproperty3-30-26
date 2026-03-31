const services = [
  "ADU planning and development guidance",
  "Building design and permit documentation coordination",
  "Code violation navigation",
  "Real estate consulting and property sales",
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-24 lg:py-32 bg-card">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Left column */}
          <div className="max-w-xl mb-10 lg:mb-0 lg:flex-shrink-0 lg:w-1/2">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-3">
              How We Help
            </h2>
            <p className="font-display text-[clamp(18px,2.5vw,24px)] font-semibold text-primary mb-6">
              Strategic Guidance for Property Decisions
            </p>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
              Unlock Your Property helps homeowners evaluate opportunities involving development potential, permitting challenges, inherited property situations, and real estate strategy.
            </p>
          </div>

          {/* Right column */}
          <div className="lg:w-1/2 lg:pt-2">
            <p className="font-body text-sm font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-5">
              Services include:
            </p>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="font-body text-base sm:text-lg text-foreground leading-relaxed">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
