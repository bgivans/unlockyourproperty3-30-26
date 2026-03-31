const steps = [
  "Assess the property and situation",
  "Map realistic options and tradeoffs",
  "Help you choose the path that fits your goals",
];

const DecideSection = () => {
  return (
    <section id="how-we-decide" className="relative py-24 lg:py-32 bg-background">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* Left column */}
          <div className="max-w-xl mb-10 lg:mb-0 lg:flex-shrink-0 lg:w-1/2">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
              How We Help You Decide
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
              We start by understanding your property, your goals, and your timeline. Then we map the real options in front of you and help you choose whether to sell, improve, exchange, legalize, or reposition — so you're not guessing alone.
            </p>
          </div>

          {/* Right column */}
          <div className="lg:w-1/2 lg:pt-2 flex items-center">
            <ul className="space-y-4 w-full">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="font-body text-base sm:text-lg text-foreground leading-relaxed">
                    {step}
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

export default DecideSection;
