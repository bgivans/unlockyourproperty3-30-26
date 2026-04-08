import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logoBlack from "@/assets/logo-black.png";
import aduGuideMockup from "@/assets/adu-guide-mockup.png";
import aduExteriorImg from "@/assets/adu-exterior.jpg";
import aduConstructionImg from "@/assets/adu-construction-aerial.jpg";
import aduFinishedImg from "@/assets/adu-finished.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { leadSchema, type LeadValues } from "@/schemas/forms";
import { scrollToSection } from "@/lib/scroll";
import { CheckCircle, ArrowDown, MapPin, Ruler, Zap, Home, FileCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Inside the Guide data                                              */
/* ------------------------------------------------------------------ */
const insideGuide = [
  { icon: MapPin, text: "How zoning, setbacks, and lot size affect what you can build" },
  { icon: FileCheck, text: "The most common issues that delay or block ADU permits" },
  { icon: Ruler, text: "How to evaluate whether your property qualifies before spending on plans" },
  { icon: Home, text: "The difference between detached, attached, garage conversion, and JADU" },
  { icon: Zap, text: "What to know about utility access, parking, and city requirements" },
];

/* ------------------------------------------------------------------ */
/*  Sticky CTA Hook                                                    */
/* ------------------------------------------------------------------ */
function useStickyCtaVisible() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { visible, sentinelRef };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const AduFeasibility = () => {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { visible: stickyVisible, sentinelRef } = useStickyCtaVisible();

  const form = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", address: "" },
  });

  const onSubmit = async (_d: LeadValues) => {
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_STRATEGY_ENDPOINT as string | undefined;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(_d),
        });
      }
      setSubmitted(true);
      toast.success("Your ADU guide is on the way!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const scrollToForm = () => {
    scrollToSection("lp-hero");
    setTimeout(() => nameRef.current?.focus(), 400);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--hero-gradient)" }}>
        <div className="max-w-lg w-full text-center py-20">
          <h1 className="font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.1] tracking-display text-white mb-6">
            Your Free Guide Is On the Way
          </h1>
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-md mx-auto">
            Check your inbox for the ADU Feasibility Guide. If you want help understanding what may apply to your specific property, book a no-pressure feasibility call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild>
              <Link to="/solutions/fix-develop#adu-guide">Book My Feasibility Call</Link>
            </Button>
            <Button variant="heroOutline" size="hero" asChild>
              <Link to="/">Return to Site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free ADU Feasibility Guide | Unlock Your Property</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section id="lp-hero" className="relative min-h-[85vh] flex flex-col justify-center py-14 md:py-20 lg:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-8">
            <img src={logoBlack} alt="Unlock Your Property" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert" />
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            <div className="flex-1 max-w-xl mb-10 lg:mb-0">
              <p className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-white/60 mb-4">
                Free Guide for Southern California Homeowners
              </p>
              <h1 className="font-display text-[clamp(2rem,5vw+0.75rem,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
                Before You Spend $10K+ on ADU Plans, Find Out What Your Property Can Actually Support
              </h1>
              <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-[65ch] mb-8">
                Uncover the zoning, setback, utility, and permit issues that can slow down, shrink, or kill your ADU project — before you waste time and money.
              </p>

              {/* Guide mockup — visual proof of the deliverable */}
              <div className="hidden lg:block">
                <img
                  src={aduGuideMockup}
                  alt="ADU Feasibility Guide preview"
                  className="w-64 rounded-lg shadow-2xl shadow-black/30 border border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
              <div ref={sentinelRef} />
              {/* Mobile guide mockup */}
              <div className="lg:hidden flex justify-center mb-6">
                <img src={aduGuideMockup} alt="ADU Feasibility Guide preview" className="w-48 rounded-lg shadow-xl border border-white/10" />
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field}
                            ref={(el) => { field.ref(el); (nameRef as React.MutableRefObject<HTMLInputElement | null>).current = el; }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Property Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" variant="hero" size="hero" className="w-full">
                      Get My Free Guide
                    </Button>
                    <p className="font-body text-xs text-white/40 text-center leading-relaxed">
                      Takes 10 seconds. No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white/30" />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PAIN + PHOTO STRIP                                           */}
      {/* ============================================================ */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="w-full max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-14 lg:items-center">
            <div className="flex-1 mb-8 lg:mb-0">
              <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-6">
                Most ADU Projects Don't Go Sideways During Construction — They Go Sideways Before It Starts
              </h2>
              <p className="font-body text-[1.0625rem] leading-[1.6] text-muted-foreground">
                A lot can look perfect for an ADU and still run into problems once zoning, setbacks, utility access, lot layout, parking, or city rules get involved. The cost of finding that out late is wasted design fees, permit delays, and months of frustration.
              </p>
              <p className="font-body text-sm font-semibold text-primary mt-8">
                Here's exactly what's inside the guide &darr;
              </p>
            </div>

            {/* Photo collage */}
            <div className="lg:w-[340px] shrink-0 grid grid-cols-2 gap-3">
              <img src={aduConstructionImg} alt="ADU framing in progress" className="rounded-xl object-cover aspect-square shadow-md" />
              <img src={aduExteriorImg} alt="Completed ADU exterior" className="rounded-xl object-cover aspect-square shadow-md" />
              <img src={aduFinishedImg} alt="Finished ADU interior" className="rounded-xl object-cover aspect-square shadow-md col-span-2 aspect-[2/1]" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INSIDE THE GUIDE — icon cards                                */}
      {/* ============================================================ */}
      <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-10 text-center">
            Inside the ADU Feasibility Guide
          </h2>
          <div className="space-y-4">
            {insideGuide.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-body text-[1.0625rem] leading-[1.6] text-foreground">{item.text}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button variant="hero" size="hero" onClick={scrollToForm}>
              Get My Free Guide
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CREDIBILITY                                                  */}
      {/* ============================================================ */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="w-full max-w-prose mx-auto px-5 sm:px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-6">
            Built for Southern California Homeowners Who Want Clarity Before They Commit
          </h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-muted-foreground">
            This guide was made to help homeowners ask better questions, spot red flags earlier, and make smarter decisions — before paying for plans, permits, or construction.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                    */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 lg:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="w-full max-w-prose mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-white mb-6">
            Don't Pay for Plans Until You Know What Your Property Can Support
          </h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-white/70 mb-8">
            Get the free guide, pressure-test your property, then move forward with confidence.
          </p>
          <Button variant="hero" size="hero" onClick={scrollToForm}>
            Get My Free Guide
          </Button>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${stickyVisible ? "translate-y-0" : "translate-y-full"}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="bg-background/95 backdrop-blur-md border-t border-border px-5 py-3 flex items-center justify-between max-w-6xl mx-auto gap-4">
          <p className="font-body text-sm font-semibold text-foreground hidden sm:block">Free ADU Feasibility Guide</p>
          <Button variant="hero" size="default" onClick={scrollToForm} className="w-full sm:w-auto">Get My Free Guide</Button>
        </div>
      </div>
    </div>
  );
};

export default AduFeasibility;
