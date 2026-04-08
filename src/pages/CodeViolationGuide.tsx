import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logoBlack from "@/assets/logo-black.png";
import guideMockup from "@/assets/code-violation-guide-mockup.png";
import cvGarageImg from "@/assets/cv-garage-conversion.jpg";
import cvAduImg from "@/assets/cv-unpermitted-adu.jpg";
import cvRoomImg from "@/assets/cv-room-addition.jpg";
import cvPermitsImg from "@/assets/cv-permits-inspections.jpg";
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
import { CheckCircle, ShieldCheck, DollarSign, ArrowDown, AlertTriangle, FileWarning, Scale, Clock } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const insideGuide = [
  { icon: AlertTriangle, text: "What different notices usually mean and how serious they may be" },
  { icon: DollarSign, text: "How violations can turn into fines, liens, permit problems, and buyer objections" },
  { icon: FileWarning, text: "The most common issues with garage conversions, unpermitted ADUs, additions, and unsafe work" },
  { icon: Scale, text: "How to evaluate whether a property is realistically fixable" },
  { icon: Clock, text: "How to think about cost, timeline, risk, and resale before choosing a path" },
  { icon: ShieldCheck, text: "What to know before talking to the city, a contractor, or a buyer" },
];

const violationTypes = [
  { image: cvGarageImg, label: "Garage Conversion" },
  { image: cvAduImg, label: "Unpermitted ADU" },
  { image: cvRoomImg, label: "Room Addition" },
  { image: cvPermitsImg, label: "Permit Issues" },
];

const faqItems = [
  { q: "Will this tell me exactly what my city will require?", a: "Every city and property is different, but this guide helps you understand the issue, the likely paths, and the questions to ask before you commit time or money." },
  { q: "Is this only for people who want to sell?", a: "No — it's for owners who need clarity first, whether they want to fix, keep, refinance, rent, or sell." },
  { q: "What if I inherited the property and don't know what work was done?", a: "That's exactly the kind of situation this guide is meant to help you think through." },
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
const CodeViolationGuide = () => {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { visible: stickyVisible, sentinelRef } = useStickyCtaVisible();

  const form = useForm<LeadWithOptionalPhoneValues>({
    resolver: zodResolver(leadWithOptionalPhoneSchema),
    defaultValues: { name: "", email: "", address: "", phone: "" },
  });

  const onSubmit = async (_d: LeadWithOptionalPhoneValues) => {
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_STRATEGY_ENDPOINT as string | undefined;
      if (endpoint) {
        await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(_d) });
      }
      setSubmitted(true);
      toast.success("Your Code Violation Guide is on the way!");
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
          <p className="font-body text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-md mx-auto">Check your inbox for the Code Violation Guide. If you want help understanding what applies to your property, book a no-pressure strategy call.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild><Link to="/solutions/fix-develop#cv-property-review">Book My Strategy Call</Link></Button>
            <Button variant="heroOutline" size="hero" asChild><Link to="/">Return to Site</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Free Code Violation Guide | Unlock Your Property</title>
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
              <p className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-white/60 mb-4">Free Guide for Southern California Property Owners</p>
              <h1 className="font-display text-[clamp(2rem,5vw+0.75rem,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
                Code Violation on Your Property? Don't Guess Your Next Move
              </h1>
              <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-[65ch] mb-8">
                Get the guide that helps you figure out what the notice really means, what it could cost you, and whether you should fix the issue or sell as-is — before fines, liens, or delays get worse.
              </p>
              <div className="hidden lg:block">
                <img src={guideMockup} alt="Code Violation Guide preview" className="w-64 rounded-lg shadow-2xl shadow-black/30 border border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
              <div ref={sentinelRef} />
              <div className="lg:hidden flex justify-center mb-6">
                <img src={guideMockup} alt="Code Violation Guide preview" className="w-48 rounded-lg shadow-xl border border-white/10" />
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
                    <Button type="submit" variant="hero" size="hero" className="w-full">Send Me My Free Guide</Button>
                    <p className="font-body text-xs text-white/40 text-center leading-relaxed">Takes 10 seconds. No spam. Unsubscribe anytime.</p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"><ArrowDown className="w-5 h-5 text-white/30" /></div>
      </section>

      {/* VIOLATION TYPE PHOTO STRIP */}
      <section className="py-12 md:py-16 lg:py-24 bg-background">
        <div className="w-full max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-4">
            A Code Violation Gets More Expensive When You Wait
          </h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-muted-foreground mb-10">
            Most owners don't have a violation problem — they have a decision problem. This guide helps you understand the notice and make the next move with a real plan.
          </p>

          {/* Photo strip — common violation types */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {violationTypes.map((v) => (
              <div key={v.label} className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                <img src={v.image} alt={v.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-body text-xs font-semibold text-white uppercase tracking-wider">{v.label}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-sm font-semibold text-primary mt-8">Here's what you'll learn inside &darr;</p>
        </div>
      </section>

      {/* INSIDE THE GUIDE — icon rows */}
      <section className="py-12 md:py-16 lg:py-24 bg-muted/50">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-10 text-center">
            Inside the Code Violation Guide
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
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-foreground mb-3 text-center">There Are Usually Only Two Smart Paths</h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-muted-foreground text-center mb-10 max-w-xl mx-auto">Fix it with a plan — or sell it with a plan</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5"><ShieldCheck className="w-5 h-5 text-primary" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">Fix and Bring Into Compliance</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">If the property is worth keeping, renting, or selling later for more — understand what it takes to clean the issue up, including permits, inspections, and signoff.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5"><DollarSign className="w-5 h-5 text-accent" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">Sell the Property As-Is</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">If the violation is too expensive or risky to fix, selling as-is may be smarter. Understand how it affects value, disclosures, and buyer interest.</p>
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
          <h2 className="font-display text-[clamp(1.5rem,3.5vw+0.5rem,2.25rem)] font-bold leading-[1.25] tracking-[-0.02em] text-white mb-6">Get Clear Before the Violation Gets More Expensive</h2>
          <p className="font-body text-[1.0625rem] leading-[1.6] text-white/70 mb-8">Read the guide, understand your options, then choose the smartest path.</p>
          <Button variant="hero" size="hero" onClick={scrollToForm}>Get My Free Guide</Button>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${stickyVisible ? "translate-y-0" : "translate-y-full"}`} style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="bg-background/95 backdrop-blur-md border-t border-border px-5 py-3 flex items-center justify-between max-w-6xl mx-auto gap-4">
          <p className="font-body text-sm font-semibold text-foreground hidden sm:block">Free Code Violation Guide</p>
          <Button variant="hero" size="default" onClick={scrollToForm} className="w-full sm:w-auto">Get My Free Guide</Button>
        </div>
      </div>
    </div>
  );
};

export default CodeViolationGuide;
