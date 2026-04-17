import { useRef, useState, useEffect } from "react";
import { submitForm } from "@/lib/submitForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logoBlack from "@/assets/logo-black.png";
import probateMockup from "@/assets/probate-guide-mockup.png";
import inheritedImg from "@/assets/situation-inherited.jpg";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { leadWithOptionalPhoneSchema, type LeadWithOptionalPhoneValues } from "@/schemas/forms";
import { scrollToSection } from "@/lib/scroll";
import { CheckCircle, Home, DollarSign, ArrowDown, Users, FileText, Wrench, Scale, Clock, Shield } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const insideGuide = [
  { icon: FileText, text: "How inherited and probate properties transfer — through probate, trusts, or direct beneficiary" },
  { icon: Wrench, text: "Common challenges: deferred maintenance, heir disagreements, title questions, code violations" },
  { icon: Scale, text: "How to evaluate whether to keep, rent, renovate, or sell" },
  { icon: Clock, text: "What to think through before committing time or money to repairs" },
  { icon: Users, text: "How to coordinate with attorneys, trustees, and family members" },
  { icon: Shield, text: "When selling as-is makes more sense than fixing up the property" },
];

const faqItems = [
  { q: "Can a home be sold while still in probate?", a: "In many cases, yes, depending on authority, documentation, and any required approvals." },
  { q: "What if multiple heirs disagree?", a: "Disagreements are common. A clear evaluation and structured plan often helps families align." },
  { q: "Do we need to fix the house before selling?", a: "Not always — many inherited homes sell as-is. The guide helps you evaluate when that makes sense." },
  { q: "What if there are code violations or unpermitted work?", a: "That's common with inherited properties, and we can help evaluate the available paths." },
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
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { visible, sentinelRef };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const ProbateGuide = () => {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { visible: stickyVisible, sentinelRef } = useStickyCtaVisible();

  const form = useForm<LeadWithOptionalPhoneValues>({
    resolver: zodResolver(leadWithOptionalPhoneSchema),
    defaultValues: { name: "", email: "", address: "", phone: "" },
  });

  const onSubmit = async (_d: LeadWithOptionalPhoneValues) => {
    try {
      await submitForm(_d, "Probate Guide Download");
      setSubmitted(true);
      toast.success("Your Inherited & Probate Property Guide is on the way!");
    } catch { toast.error("Something went wrong. Please try again."); }
  };

  const scrollToForm = () => {
    scrollToSection("lp-hero");
    setTimeout(() => nameRef.current?.focus(), 400);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: "var(--hero-gradient)" }}>
        <div className="max-w-lg w-full text-center py-20">
          <h1 className="font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.1] tracking-display text-white mb-6">Your Free Guide Is On the Way</h1>
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-md mx-auto">Check your inbox for the Inherited & Probate Property Guide. If you want help understanding your options, schedule a consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild><Link to="/#strategy-call">Schedule My Consultation</Link></Button>
            <Button variant="heroOutline" size="hero" asChild><Link to="/">Return to Site</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free Inherited & Probate Property Guide | Unlock Your Property</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* HERO */}
      <section id="lp-hero" className="relative min-h-[85vh] flex flex-col justify-center py-14 md:py-20 lg:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-8">
            <img src={logoBlack} alt="Unlock Your Property" className="h-8 sm:h-10 w-auto object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            <div className="flex-1 max-w-xl mb-10 lg:mb-0">
              <p className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-white/60 mb-4">Free Guide for Southern California Families</p>
              <h1 className="font-display text-[clamp(2rem,5vw+0.75rem,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
                Inherited a Property? Know Your Options Before You Make a Decision You Can't Undo
              </h1>
              <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-[65ch] mb-8">
                Whether probate is still in process or the property has already transferred, this guide helps heirs, beneficiaries, and trustees understand what to do next.
              </p>
              <div className="hidden lg:block">
                <img src={probateMockup} alt="Inherited & Probate Property Guide preview" className="w-64 rounded-lg shadow-2xl shadow-black/30 border border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
              <div ref={sentinelRef} />
              <div className="lg:hidden flex justify-center mb-6">
                <img src={probateMockup} alt="Inherited & Probate Property Guide preview" className="w-48 rounded-lg shadow-xl border border-white/10" />
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel className="font-body text-white">Name</FormLabel><FormControl><Input placeholder="Your name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} ref={(el) => { field.ref(el); (nameRef as React.MutableRefObject<HTMLInputElement | null>).current = el; }} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel className="font-body text-white">Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel className="font-body text-white">Property Address</FormLabel><FormControl><Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel className="font-body text-white">Phone <span className="text-white/50 font-normal">(optional)</span></FormLabel><FormControl><Input type="tel" placeholder="(555) 555-5555" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" variant="hero" size="hero" className="w-full">Get My Free Guide</Button>
                    <p className="font-body text-xs text-white/40 text-center leading-relaxed">Takes 10 seconds. No spam. Unsubscribe anytime.</p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"><ArrowDown className="w-5 h-5 text-white/30" /></div>
      </section>

      {/* PAIN + PHOTO */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="w-full max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-14 lg:items-center">
            <div className="flex-1 mb-8 lg:mb-0">
              <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-6">
                Families Often Get Stuck Before They Even Start
              </h2>
              <div className="space-y-5 font-body text-[1.0625rem] leading-[1.6] text-muted-foreground">
                <p>Inherited and probate properties often come with deferred maintenance, multiple-heir decision making, title questions, tenant issues, vacancies, code violations, or the stress of managing a property from out of town.</p>
                <p>The best next step is usually a clear property evaluation before anyone commits time or money — and that's exactly what this guide walks you through.</p>
              </div>
              <p className="font-body text-sm font-semibold text-primary mt-8">Here's what you'll learn inside &darr;</p>
            </div>

            {/* Inherited property image */}
            <div className="lg:w-[380px] shrink-0">
              <img src={inheritedImg} alt="Inherited property in Southern California" className="w-full rounded-2xl object-cover aspect-[4/3] shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* INSIDE THE GUIDE — icon rows */}
      <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-10 text-center">
            What You'll Learn Inside the Guide
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
            <Button variant="hero" size="hero" onClick={scrollToForm}>Get My Free Guide</Button>
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-3 text-center">Two Common Paths Forward</h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-muted-foreground text-center mb-10 max-w-xl mx-auto">Depending on the property's condition and the family's goals</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5"><Home className="w-5 h-5 text-primary" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">Keep the Property</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">Some families keep the property and move in, rent it out, renovate and refinance, or hold it as a long-term asset. The guide helps you evaluate if that path makes financial sense.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><DollarSign className="w-5 h-5 text-accent" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">Sell the Property</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">Others sell and distribute proceeds among beneficiaries. The home may be sold as-is, after light preparation, or strategically improved to maximize value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
        <div className="w-full max-w-prose mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-8 text-center">Common Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 py-1 data-[state=open]:pb-4">
                <AccordionTrigger className="font-display text-base sm:text-lg font-semibold text-foreground text-left min-h-[48px] hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 md:py-20 lg:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="w-full max-w-prose mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-white mb-6">Not Sure What to Do With the Property?</h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-white/70 mb-8">Get clarity on your options before making a decision you can't undo. The guide is free and takes 5 minutes to read.</p>
          <Button variant="hero" size="hero" onClick={scrollToForm}>Get My Free Guide</Button>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${stickyVisible ? "translate-y-0" : "translate-y-full"}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="bg-background/95 backdrop-blur-md border-t border-border px-5 py-3 flex items-center justify-between max-w-6xl mx-auto gap-4">
          <p className="font-body text-sm font-semibold text-foreground hidden sm:block">Free Inherited Property Guide</p>
          <Button variant="hero" size="default" onClick={scrollToForm} className="w-full sm:w-auto">Get My Free Guide</Button>
        </div>
      </div>
    </div>
  );
};

export default ProbateGuide;
