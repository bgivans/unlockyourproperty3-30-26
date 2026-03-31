import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { ANCHOR_PROPERTY_OPTIONS, ANCHOR_STRATEGY_CALL } from "@/constants";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-black">
    {/* Video background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      src="/media/hero_background.mp4"
    />

    {/* Dark overlay for text legibility */}
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50" />

    {/* Content */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 md:pt-24 md:pb-20">
      <div className="max-w-[580px] w-full">
        {/* Eyebrow */}
        <p className="animate-hero-fade-up font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-accent-soft mb-3 md:mb-4">
          Real Estate Strategy for Complex Properties
        </p>

        {/* Headline */}
        <h1
          className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          Solve Complex Property Situations With a Clear Plan
        </h1>

        {/* Subheadline */}
        <p
          className="animate-hero-fade-up-delay-2 font-body text-hero-sub leading-relaxed text-white/85 mb-3 max-w-[520px]"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
        >
          Helping Southern California homeowners navigate ADUs, code violations, inherited property, and selling decisions so you can unlock the full potential of your property.
        </p>

        {/* CTAs */}
        <div className="animate-hero-fade-up-delay-3 flex flex-col md:flex-row gap-3 md:gap-4">
          <Button
            variant="hero"
            size="hero"
            className="w-full md:w-auto"
            onClick={() => scrollToSection(ANCHOR_PROPERTY_OPTIONS)}
          >
            See Your Property Options
          </Button>
          <Button
            variant="heroOutline"
            size="hero"
            className="w-full md:w-auto border-white/30 text-white hover:border-white hover:text-white hover:bg-white/10"
            onClick={() => scrollToSection(ANCHOR_STRATEGY_CALL)}
          >
            Schedule a Strategy Call
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
