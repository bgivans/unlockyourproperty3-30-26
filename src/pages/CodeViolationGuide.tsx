import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import guideMockup from "@/assets/code-violation-guide-mockup.png";
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
import { ANCHOR_HERO_FORM, SCROLL_FOCUS_DELAY_MS } from "@/constants";

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqItems = [
  {
    q: "Will this tell me exactly what my city will require",
    a: "No, every city and property is different, but this guide will help you understand the issue, the likely paths, and the questions to ask before you commit time or money",
  },
  {
    q: "Is this only for people who want to sell",
    a: "No, it's for owners who need clarity first, whether they want to fix, keep, refinance, rent, or sell",
  },
  {
    q: "What if I inherited the property and don't know what work was done",
    a: "That's exactly the kind of situation this guide is meant to help you think through",
  },
];

/* ------------------------------------------------------------------ */
/*  Bullet list data                                                   */
/* ------------------------------------------------------------------ */
const insideGuide = [
  "What different notices usually mean and how serious they may be",
  "How code violations can turn into fines, liens, permit problems, and buyer objections",
  "The most common issues we see with garage conversions, unpermitted ADUs, additions, and unsafe work",
  "How to evaluate whether a property is realistically fixable",
  "How to think about cost, timeline, risk, and resale before choosing a path",
  "What to know before talking to the city, a contractor, or a buyer",
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const CodeViolationGuide = () => {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const form = useForm<LeadWithOptionalPhoneValues>({
    resolver: zodResolver(leadWithOptionalPhoneSchema),
    defaultValues: { name: "", email: "", address: "", phone: "" },
  });

  const onSubmit = async (_d: LeadWithOptionalPhoneValues) => {
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
      toast.success("Your Code Violation Guide is on the way!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const scrollToForm = () => {
    scrollToSection(ANCHOR_HERO_FORM);
    setTimeout(() => nameRef.current?.focus(), SCROLL_FOCUS_DELAY_MS);
  };

  /* ================================================================ */
  /*  THANK YOU STATE                                                  */
  /* ================================================================ */
  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center px-5">
        <div className="max-w-lg w-full text-center py-20">
          <h1 className="font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.1] tracking-display text-foreground mb-6">
            Your Free Guide Is On the Way
          </h1>
          <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
            Check your inbox for the Code Violation Guide. If you want help understanding what applies to your property, book a no-pressure strategy call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild>
              <Link to="/#strategy-call">Book My Strategy Call</Link>
            </Button>
            <Button variant="heroOutline" size="hero" asChild>
              <Link to="/">Return to Site</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  MAIN PAGE                                                        */
  /* ================================================================ */
  return (
    <>
      <Helmet>
        <title>Free Code Violation Guide | Unlock Your Property</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero image */}
      <div className="w-full overflow-hidden max-h-[70vh]">
        <img
          src={guideMockup}
          alt="Free Code Violation Guide — Understand Your Options Before Fines Get Worse"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content + form */}
      <section id="hero-form" className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Copy */}
            <div className="flex-1 max-w-xl mb-10 lg:mb-0">
              <p className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-accent mb-4">
                Free Code Violation Guide for Southern California Property Owners
              </p>
              <h1 className="font-display text-[clamp(26px,4.5vw,48px)] font-bold leading-[1.1] tracking-display text-foreground mb-6">
                Code Violation on Your Property? Don't Guess Your Next Move
              </h1>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                Get the guide that helps you figure out what the notice really means, what it could cost you, and whether you should fix the issue or sell the property as-is before fines, liens, or delays get worse.
              </p>
            </div>

            {/* Form */}
            <div className="w-full lg:w-[400px] shrink-0">
              <LeadForm form={form} onSubmit={onSubmit} nameRef={nameRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem agitation */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            A Code Violation Gets More Expensive When You Wait
          </h2>
          <div className="space-y-5 font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              Most owners don't have a violation problem, they have a decision problem. They got a notice, they don't know how serious it is, they don't know what the city wants, and every week they wait increases the chance of more fines, more stress, and fewer good options.
            </p>
            <p>
              Some properties can be fixed and legalized. Some are too messy, too expensive, or too time-consuming to make that path worth it. The mistake is burning time and money before you know which situation you're actually in.
            </p>
            <p>
              This guide helps you slow the panic down, understand the notice, and make the next move with a real plan.
            </p>
          </div>
        </div>
      </section>

      {/* What this guide helps you figure out */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Know What You're Dealing With Before You Spend a Dollar
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            You'll learn how to read the situation clearly, how violations affect your property value and sale options, and how to think through the two real paths in front of you: bring the property into compliance or sell it as-is.
          </p>
        </div>
      </section>

      {/* Inside the guide */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-8">
            Inside the Code Violation Guide
          </h2>
          <ul className="space-y-4">
            {insideGuide.map((item) => (
              <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground leading-relaxed">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two paths forward */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-3 text-center">
            There Are Usually Only Two Smart Paths
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed text-center mb-10 max-w-xl mx-auto">
            Fix it with a plan or sell it with a plan
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
                Keep the Property and Work Toward Compliance
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                If the property is worth keeping, renting, refinancing, or selling later for more, the goal is to understand what it would actually take to clean the issue up. That can include reviewing the notice, checking permit history, identifying missing approvals, and mapping out the likely path for plans, inspections, and signoff.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
                Sell the Property As-Is
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                If the violation is too expensive, too risky, or too time-consuming to fix, selling as-is may be the better move. The goal there is to understand how the violation affects value, disclosures, timeline, and buyer interest so you can move forward without pretending the problem doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local credibility */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Built for Southern California Properties
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            Unlock Your Property helps owners across Southern California evaluate code violations, unpermitted work, damaged properties, and messy real estate situations. We help people understand what they're facing, what it may take to fix, and when selling as-is may be the cleaner move.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-8">
            Common Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-body text-sm sm:text-base text-foreground text-left min-h-[48px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 pb-20 sm:pb-28 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Get Clear Before the Violation Gets More Expensive
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            Read the guide, understand your options, then choose the smartest path.
          </p>
          <Button variant="hero" size="hero" onClick={scrollToForm}>
            Download the Code Violation Guide
          </Button>
        </div>
      </section>
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  Lead Form                                                          */
/* ------------------------------------------------------------------ */
interface LeadFormProps {
  form: ReturnType<typeof useForm<LeadWithOptionalPhoneValues>>;
  onSubmit: (d: LeadWithOptionalPhoneValues) => void;
  nameRef: React.RefObject<HTMLInputElement>;
}

const LeadForm = ({ form, onSubmit, nameRef }: LeadFormProps) => (
  <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-body text-foreground">Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" className="min-h-[48px]" {...field}
                ref={(el) => { field.ref(el); (nameRef as React.MutableRefObject<HTMLInputElement | null>).current = el; }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-body text-foreground">Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" className="min-h-[48px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="address" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-body text-foreground">Property Address</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, City, CA" className="min-h-[48px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-body text-foreground">
              Phone <span className="text-muted-foreground font-normal">(optional)</span>
            </FormLabel>
            <FormControl>
              <Input type="tel" placeholder="(555) 555-5555" className="min-h-[48px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" variant="hero" size="hero" className="w-full">
          Send Me the Guide
        </Button>
        <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
          You may also receive follow-up information about booking a code violation strategy call.
        </p>
      </form>
    </Form>
  </div>
);

export default CodeViolationGuide;
