import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import aduGuideMockup from "@/assets/adu-guide-mockup.png";
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
import { ANCHOR_HERO_FORM, SCROLL_FOCUS_DELAY_MS } from "@/constants";

/* ------------------------------------------------------------------ */
/*  Email Sequence (for future integration)                            */
/* ------------------------------------------------------------------ */
// EMAIL 1 — Subject: "Your ADU Feasibility Guide Is Here"
//   Body: Here's your guide — use it to spot the zoning, setback, utility,
//   and approval issues that can cost homeowners time and money before a
//   project even starts. If you want help figuring out what may apply to
//   your lot, book a feasibility call here.
//
// EMAIL 2 — Subject: "The Most Expensive ADU Mistake Happens Before Construction"
//   Body: Most people assume the big risk is building, but the real waste
//   usually happens when they pay for plans before knowing what the property
//   can actually support. Use the guide and reply if you want help
//   pressure-testing your lot.
//
// EMAIL 3 — Subject: "What Can Block an ADU Project?"
//   Body: The biggest issues are usually zoning, setbacks, access, utilities,
//   and layout constraints. The sooner you know what you're dealing with, the
//   faster you can move with confidence instead of guessing.

/* ------------------------------------------------------------------ */
/*  Value-stack data                                                   */
/* ------------------------------------------------------------------ */
const valueCards = [
  {
    title: "Avoid Expensive Design Mistakes",
    description: "Before they happen.",
  },
  {
    title: "See What Can Delay or Block Approval",
    description: "Know the risks upfront.",
  },
  {
    title: "Understand Which ADU Paths May Fit Your Lot Best",
    description: "Garage conversion, detached, attached, or JADU.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const AduFeasibility = () => {
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

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
            Check your inbox for the ADU Feasibility Guide. If you want help understanding what may apply to your specific property, book a no-pressure feasibility call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="hero" asChild>
              <Link to="/#strategy-call">Book My Feasibility Call</Link>
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
        <title>Free ADU Feasibility Guide | Unlock Your Property</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Hero image */}
      <div className="w-full overflow-hidden max-h-[70vh]">
        <img
          src={aduGuideMockup}
          alt="Free ADU Feasibility Guide — Avoid Costly ADU Permit and Zoning Mistakes"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero content + inline form */}
      <section id="hero-form" className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Copy */}
            <div className="flex-1 max-w-xl mb-10 lg:mb-0">
              <p className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-accent mb-4">
                Free Guide for Southern California Homeowners
              </p>
              <h1 className="font-display text-[clamp(26px,4.5vw,48px)] font-bold leading-[1.1] tracking-display text-foreground mb-6">
                Before You Spend $10,000+ on ADU Plans, Find Out What Your Property Can Actually Support
              </h1>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
                Download the free guide to uncover zoning, setback, utility, access, and permit issues that can slow down, shrink, or kill your ADU project — before you waste time and money.
              </p>
            </div>

            {/* Inline form */}
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
            Most ADU Projects Don't Go Sideways During Construction — They Go Sideways Before It Starts
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
            A lot can look perfect for an ADU and still run into problems once zoning, setbacks, utility access, lot layout, parking, or city rules get involved. The cost of finding that out late is wasted design fees, permit delays, and months of frustration.
          </p>
        </div>
      </section>

      {/* Value stack */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-3 text-center">
            What You'll Learn Inside the Guide
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed text-center mb-10 max-w-xl mx-auto">
            This guide helps you pressure-test your property before you commit time, money, or momentum.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-card p-6 sm:p-8 text-center"
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="py-16 sm:py-20 pb-20 sm:pb-28 border-t border-border">
        <div className="w-full max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-display text-foreground mb-6">
            Built for Southern California Homeowners Who Want Clarity Before They Commit
          </h2>
          <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            This guide was made to help homeowners ask better questions, spot red flags earlier, and make smarter decisions — before paying for plans, permits, or construction.
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
  form: ReturnType<typeof useForm<LeadValues>>;
  onSubmit: (d: LeadValues) => void;
  nameRef: React.RefObject<HTMLInputElement>;
}

const LeadForm = ({ form, onSubmit, nameRef }: LeadFormProps) => (
  <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-foreground">First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your first name"
                  className="min-h-[48px]"
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    (nameRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-foreground">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" className="min-h-[48px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-foreground">Property Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, CA" className="min-h-[48px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="hero" size="hero" className="w-full">
          Download My Free Guide
        </Button>
        <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
          You'll also receive information about scheduling an ADU feasibility consultation.
        </p>
      </form>
    </Form>
  </div>
);

export default AduFeasibility;
