import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import probateGuideMockup from "@/assets/probate-guide-mockup.png";
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
    q: "Can a home be sold while still in probate?",
    a: "In many cases, yes, depending on authority, documentation, and any required approvals.",
  },
  {
    q: "What if multiple heirs disagree?",
    a: "Disagreements are common, and a clear evaluation and structured plan often helps families align.",
  },
  {
    q: "Do we need to fix the house before selling?",
    a: "Not always, because many inherited homes sell as-is.",
  },
  {
    q: "What if there are code violations or unpermitted work?",
    a: "That's common, and we can help evaluate the available paths.",
  },
  {
    q: "Do all heirs need to agree before selling?",
    a: "In many cases, yes, but the estate documents and legal authority control that decision.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const ProbateGuide = () => {
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
      toast.success("Your Inherited & Probate Property Guide is on the way!");
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
            Check your inbox for the Inherited & Probate Property Guide. If you want help understanding your options, schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild>
              <Link to="/#strategy-call">Schedule a Consultation</Link>
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
        <title>Free Inherited & Probate Property Guide | Unlock Your Property</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero image */}
      <div className="w-full overflow-hidden max-h-[70vh]">
        <img
          src={probateGuideMockup}
          alt="Free Inherited & Probate Property Guide"
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
                Free Guide for Southern California Families
              </p>
              <h1 className="font-display text-[clamp(26px,4.5vw,48px)] font-bold leading-[1.1] tracking-display text-foreground mb-6">
                Inherited a Property or Going Through Probate?
              </h1>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                Get the Free Guide That Helps You Understand Your Options Before You Make a Decision
              </p>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether probate is still in process or the property has already transferred through a trust or estate, this guide helps heirs, beneficiaries, and trustees understand what to do next with the property.
              </p>
            </div>

            {/* Form */}
            <div className="w-full lg:w-[400px] shrink-0">
              <LeadForm form={form} onSubmit={onSubmit} nameRef={nameRef} />
            </div>
          </div>
        </div>
      </section>

      {/* Pain section */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Families Often Get Stuck Before They Even Start
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            Families often get stuck dealing with maintenance costs, paperwork, timelines, disagreements between heirs, and the decision to keep, rent, renovate, or sell.
          </p>
        </div>
      </section>

      {/* What this guide helps you do */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            What This Guide Helps You Do
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            This guide helps you understand what's happening with the property, what your options are, and what to think through before you keep, rent, renovate, or sell.
          </p>
        </div>
      </section>

      {/* Still Going Through Probate? */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Still Going Through Probate?
          </h2>
          <div className="space-y-5 font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              If the property is still in probate, the executor or administrator may need specific authority or court approval before the home can be sold, and because probate timelines vary based on the estate and court process, families often need clarity before taking the next step.
            </p>
            <p>
              Unlock Your Property helps families understand their real estate options and coordinate next steps while working alongside their attorney when needed.
            </p>
          </div>
        </div>
      </section>

      {/* How Inherited and Probate Properties Transfer */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            How Inherited and Probate Properties Transfer
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
            Most inherited properties transfer in one of three ways:
          </p>
          <ul className="space-y-3 mb-6">
            {["Through probate", "Through a living trust", "Directly to beneficiaries depending on how title was held and the estate planning documents in place"].map((item) => (
              <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground leading-relaxed">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            Understanding how the property is being transferred helps determine what decisions can be made now and what steps come next.
          </p>
        </div>
      </section>

      {/* Common Challenges Families Face */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Common Challenges Families Face
          </h2>
          <div className="space-y-5 font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              Inherited and probate properties often come with deferred maintenance, multiple-heir decision making, title questions, tenant issues, vacancies, code violations, unpermitted improvements, or the stress of managing a property from out of town.
            </p>
            <p>
              That's why the best next step is usually a clear property evaluation before anyone commits to keeping, fixing, or selling.
            </p>
          </div>
        </div>
      </section>

      {/* Two Common Paths Forward */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-3 text-center">
            Two Common Paths Forward
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed text-center mb-10 max-w-xl mx-auto">
            Depending on the property's condition and the family's goals.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
                Keep the Property
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Some families keep the property and move in, rent it out, renovate and refinance, or hold it as a long-term asset.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
                Sell the Property
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Others choose to sell and distribute proceeds among beneficiaries. The home may be sold as-is, sold after clean-out or light preparation, or strategically improved when it makes sense to maximize value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Call Unlock Your Property */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Why Families Call Unlock Your Property
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            Families usually reach out because they want clarity, not pressure, and we help by giving calm guidance on property options, evaluating value versus repair investment, helping think through complex situations like permits, violations, or ADU potential, and supporting the cleanest next step for the property and the family.
          </p>
        </div>
      </section>

      {/* For Attorneys, Trustees, and Fiduciaries */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            For Attorneys, Trustees, and Fiduciaries
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            We regularly work alongside estate attorneys, probate professionals, and trustees to help evaluate property condition, market value, preparation needs, and next-step options while respecting the legal process and coordinating with the family's advisors when appropriate.
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
            Not Sure What to Do Next?
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            Schedule a consultation to understand your options and choose the cleanest path forward, whether probate is ongoing or the property has already transferred.
          </p>
          <Button variant="hero" size="hero" onClick={scrollToForm}>
            Download the Free Guide
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
          Download the Guide
        </Button>
        <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
          We'll email the guide and keep your information private.
        </p>
      </form>
    </Form>
  </div>
);

export default ProbateGuide;
