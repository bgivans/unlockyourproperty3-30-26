import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Lightbulb, MapPin, Shield, ClipboardCheck, Home, TrendingUp, Search, Compass, Hammer, ArrowRight } from "lucide-react";
import heroImg from "@/assets/about-hero.jpg";
import servicesImg from "@/assets/about-services.jpg";
import founderImg from "@/assets/about-founder.jpg";
import { scrollToSection } from "@/lib/scroll";
import { ANCHOR_STRATEGY_CALL } from "@/constants";

const differentiators = [
  {
    icon: Lightbulb,
    title: "Strategy Before Action",
    copy: "We help you understand the best options before you make a major property decision. That means looking beyond the obvious sale and evaluating what creates the most value.",
  },
  {
    icon: Shield,
    title: "Complex Situations Welcome",
    copy: "We work with properties that need more than a standard transaction approach. From inherited homes to permit issues to ADU opportunities, we help bring structure to messy situations.",
  },
  {
    icon: MapPin,
    title: "Local, Practical Guidance",
    copy: "We focus on real-world solutions that fit your property, your timeline, and your goals. The advice should be usable, not theoretical.",
  },
];

const services = [
  {
    icon: Home,
    title: "ADU Planning and Development Guidance",
    copy: "We help property owners explore whether adding an ADU could create more flexibility, more value, or more income. The goal is to understand the opportunity before making a costly decision.",
  },
  {
    icon: ClipboardCheck,
    title: "Code Violation and Compliance Navigation",
    copy: "When a property has unpermitted work or code issues, the right next step is not always obvious. We help evaluate practical paths forward so you can reduce risk and move ahead strategically.",
  },
  {
    icon: Search,
    title: "Inherited and Probate Property Situations",
    copy: "We help heirs, trustees, and families understand their options when a property becomes part of an estate. That can include evaluating the condition, the market, the timing, and the best overall path.",
  },
  {
    icon: TrendingUp,
    title: "Buying and Selling with a Strategy",
    copy: "Some properties should be sold as-is, some should be improved first, and some need a bigger plan before going to market. We help you make that decision with the full picture in mind.",
  },
];

const steps = [
  { num: 1, icon: Eye, title: "Understand the Property", copy: "We start by looking at the facts, the condition, the issues, and the opportunities." },
  { num: 2, icon: Compass, title: "Clarify the Options", copy: "We help you see the realistic paths forward based on value, timing, and risk." },
  { num: 3, icon: Hammer, title: "Build the Right Strategy", copy: "We identify what makes the most sense for your goals, whether that means keeping, improving, developing, or selling." },
  { num: 4, icon: ArrowRight, title: "Move Forward with Confidence", copy: "Once the path is clear, you can make decisions with less guesswork and more control." },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Unlock Your Property</title>
      </Helmet>

      {/* ── Section 1: Hero ── */}
      <section className="bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Image first on mobile */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImg}
                alt="Coast 2 Coast Real Estate Investments team at a company event"
                className="w-full h-64 sm:h-80 lg:h-[480px] object-cover"
                loading="eager"
              />
            </div>
            {/* Text */}
            <div className="lg:w-1/2">
              <h1 className="font-display text-[clamp(30px,5vw,48px)] font-bold leading-[1.12] tracking-tight text-foreground mb-3">
                About Unlock Your Property
              </h1>
              <p className="font-display text-[clamp(16px,2.2vw,22px)] font-semibold text-primary mb-3">
                Real estate strategy for complex property situations.
              </p>
              <p className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                Unlock Your Property is a strategy-first service powered by Coast 2 Coast Real Estate Investments.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl">
                Unlock Your Property helps homeowners, families, buyers, and trustees make smart real estate decisions when the situation is not simple. Whether you are dealing with an inherited home, permit issues, code violations, ADU potential, or the decision to keep, improve, or sell — we help you understand your options and move forward with a clear strategy.
              </p>
              <Button variant="hero" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection(ANCHOR_STRATEGY_CALL)}>
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: What We Do ── */}
      <section className="bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-foreground mb-6">
              We Help You See the Full Picture
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-4">
              Real estate decisions are not always straightforward. Some properties come with development potential, unpermitted improvements, inherited ownership, compliance issues, or timing decisions that can affect value in a big way.
            </p>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground">
              Instead of offering one-size-fits-all advice, we look at the property, the risks, the upside, the market, and your goals — so you can make the right move with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: What Makes Us Different ── */}
      <section className="bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-foreground mb-10 lg:mb-14 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {differentiators.map((d) => (
              <Card key={d.title} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <d.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{d.title}</h3>
                  <p className="font-body text-base leading-relaxed text-muted-foreground">{d.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: What We Help With ── */}
      <section className="bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            <div className="lg:w-5/12 mb-8 lg:mb-0">
              <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-foreground mb-4">
                What We Help With
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                We support property owners and families across several types of real estate and development-related decisions.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-md hidden lg:block">
                <img
                  src={servicesImg}
                  alt="Property plans and ADU design documents on a table"
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:w-7/12 space-y-5">
              {/* Mobile image */}
              <div className="rounded-2xl overflow-hidden shadow-md lg:hidden mb-6">
                <img
                  src={servicesImg}
                  alt="Property plans and ADU design documents on a table"
                  className="w-full h-48 sm:h-56 object-cover"
                  loading="lazy"
                />
              </div>

              {services.map((s) => (
                <Card key={s.title} className="border-border/60 shadow-sm">
                  <CardContent className="p-5 sm:p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                      <p className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground">{s.copy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: How We Help ── */}
      <section className="bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-foreground mb-10 lg:mb-14 text-center">
            How We Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <Card key={s.num} className="border-border/60 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-bold mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="font-body text-sm sm:text-base leading-relaxed text-muted-foreground">{s.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Founder ── */}
      <section className="bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* Portrait first on mobile */}
            <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
              <div className="rounded-2xl overflow-hidden shadow-lg max-w-sm mx-auto lg:max-w-none">
                <img
                  src={founderImg}
                  alt="Javier Feria, Founder of Unlock Your Property"
                  className="w-full h-80 sm:h-96 lg:h-[520px] object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
            {/* Bio */}
            <div className="lg:w-7/12">
              <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-foreground mb-2">
                Meet Javier Feria
              </h2>
              <p className="font-display text-[clamp(15px,2vw,20px)] font-semibold text-primary mb-6">
                Founder and Real Estate Strategist
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-4">
                Javier Feria is the Founder and Chief Executive Officer of Unlock Your Property. He helps homeowners, investors, trustees, and families navigate complex property decisions involving development opportunities, inherited properties, permit challenges, property repositioning, and strategic sales.
              </p>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                His approach goes beyond the traditional transaction by helping clients evaluate multiple paths forward before making a major move. Depending on the situation, that may include coordinating with contractors, designers, attorneys, engineers, or city officials so property owners can better understand their options and choose the best next step.
              </p>
              <div className="space-y-1.5 border-t border-border pt-6 mt-6">
                <p className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Unlock Your Property is a strategy-first service powered by Coast 2 Coast Real Estate Investments.
                </p>
                <p className="font-body text-sm font-medium text-foreground">CA DRE #02125445</p>
                <p className="font-body text-sm text-muted-foreground">Licensed under Coast 2 Coast Real Estate Investments, DRE #02193707</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: CTA ── */}
      <section className="bg-primary">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20 text-center">
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-primary-foreground mb-4">
            Ready to Talk Through Your Property?
          </h2>
          <p className="font-body text-base sm:text-lg leading-relaxed text-primary-foreground/85 mb-8 max-w-2xl mx-auto">
            If you are facing an important property decision, we are here to help you understand your options and build the right strategy. Schedule a consultation to discuss your property and explore what makes the most sense.
          </p>
          <Button
            variant="hero"
            size="hero"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection(ANCHOR_STRATEGY_CALL)}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

    </>
  );
};

export default About;
