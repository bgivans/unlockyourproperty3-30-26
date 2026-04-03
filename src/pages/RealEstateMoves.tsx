import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import sellingAsIsImg from "@/assets/selling-as-is.jpg";
import sellingPrepareImg from "@/assets/selling-prepare.jpg";
import sellingStrategicImg from "@/assets/selling-strategic.jpg";
import { PackageOpen, Paintbrush, Search, Hammer, CheckCircle, Users, AlertTriangle, ScrollText, Building2, MoveRight, ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyQuiz from "@/components/PropertyQuiz";
import type { QuizConfig } from "@/components/PropertyQuiz";
import { toast } from "sonner";
import { scrollToSection } from "@/lib/scroll";
import { reviewFormSchema, type ReviewFormValues } from "@/schemas/forms";
import { reviewSituations as situations } from "@/data/situations";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const sellingOptions = [
  {
    title: "Sell As-Is",
    body: "For some owners, the best move is to sell the property in its current condition without making repairs or updates. This can reduce time, cost, and decision fatigue.",
    image: sellingAsIsImg,
    icon: PackageOpen,
    label: "Simplify",
  },
  {
    title: "Prepare the Property Before Listing",
    body: "In some situations, cleaning, repairs, paint, landscaping, or minor upgrades can create stronger buyer demand and improve the final sale price.",
    image: sellingPrepareImg,
    icon: Paintbrush,
    label: "Maximize",
  },
  {
    title: "Take a More Strategic Approach",
    body: "Some properties have added value tied to lot potential, layout changes, permits, or development opportunities. A deeper review can help identify what the market may pay more for.",
    image: sellingStrategicImg,
    icon: Search,
    label: "Unlock Value",
  },
];

const faqs = [
  {
    q: "Do I need to fix my home before selling?",
    a: "Not always. Some properties sell as-is depending on condition and buyer demand. In other cases, targeted improvements can increase value\u2014we help you evaluate what makes the most sense.",
  },
  {
    q: "Can I sell a property with code violations or unpermitted work?",
    a: "Yes. Many properties with issues can still be sold. The best approach depends on the severity of the situation, buyer demand, and whether it makes sense to fix or sell as-is.",
  },
  {
    q: "Can I sell a home held in a trust?",
    a: "Yes. In many cases, a trustee has the authority to sell the property based on the trust terms. While the process is often more streamlined than probate, it still requires proper documentation and coordination.\n\nWe regularly work alongside trustees and estate attorneys to help navigate these situations.",
  },
  {
    q: "How do I know what my property is worth?",
    a: "Property value depends on condition, location, and potential\u2014not just comparable sales. We help evaluate your property based on market demand and possible strategies so you can understand its true value.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Config                                                        */
/* ------------------------------------------------------------------ */
const realEstateMovesQuizConfig: QuizConfig = {
  path: "real_estate_moves",
  headline: "What kind of real estate move are you considering?",
  subheadline: "Answer a few quick questions and we'll outline your likely path forward.",
  steps: [
    {
      question: "What are you thinking about doing?",
      options: [
        "Sell a problem or underperforming rental",
        "Sell my current home to buy another",
        "1031 exchange into better assets",
        "Inherited / probate property decisions",
      ],
    },
    {
      question: "What matters most right now?",
      options: [
        "Maximize sale price",
        "Exit quickly and cleanly",
        "Reduce headaches and management stress",
        "Optimize long-term cash flow and growth",
      ],
    },
    {
      question: "How urgent is this move?",
      options: ["0\u20133 months", "3\u201312 months", "12+ months", "Just exploring"],
    },
    {
      question: "How many properties are involved?",
      options: ["1 property", "2\u20133 properties", "4+ properties"],
    },
  ],
  getResult: (answers: string[]) => {
    const situation = answers[0] ?? "";
    const bullets: string[] = [];

    if (situation.includes("problem") || situation.includes("rental")) {
      bullets.push("Explore selling your current property as-is versus with targeted improvements.");
    }
    if (situation.includes("home to buy")) {
      bullets.push("Coordinate selling your current home and buying your next one with a clear timeline.");
    }
    if (situation.includes("1031")) {
      bullets.push("Model a 1031 exchange into stronger cash-flow assets.");
    }
    if (situation.includes("Inherited") || situation.includes("probate")) {
      bullets.push("Clarify options for inherited or probate property, including selling versus repositioning.");
    }

    const priority = answers[1] ?? "";
    if (priority.includes("Maximize")) {
      bullets.push("Identify improvements or staging that could increase your sale price.");
    } else if (priority.includes("Exit")) {
      bullets.push("Map the fastest path to close with minimal hassle.");
    } else if (priority.includes("headaches")) {
      bullets.push("Evaluate whether to sell, reposition, or bring in property management.");
    } else {
      bullets.push("Build a long-term strategy that balances cash flow, appreciation, and tax efficiency.");
    }

    if (bullets.length < 3) {
      bullets.push("Connect with our team to map out your specific path forward.");
    }

    return { title: "Your likely path forward", bullets };
  },
  optionsSectionId: "property-options",
  optionsLabel: "View Property Options",
};

/* ------------------------------------------------------------------ */
/*  Reusable inline form (dark bg)                                     */
/* ------------------------------------------------------------------ */
const InlineReviewForm = ({
  formInstance,
  submitted,
  onSubmit,
  heading,
  intro,
  buttonLabel,
  disclaimer,
}: {
  formInstance: ReturnType<typeof useForm<ReviewFormValues>>;
  submitted: boolean;
  onSubmit: (data: ReviewFormValues) => void;
  heading: string;
  intro: string;
  buttonLabel: string;
  disclaimer?: string;
}) => (
  <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
    {/* Left copy */}
    <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0 lg:sticky lg:top-28">
      <h3 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold leading-[1.15] tracking-display text-white mb-5">
        {heading}
      </h3>
      <p className="font-body text-hero-sub leading-relaxed text-white/75">
        {intro}
      </p>
      {disclaimer && (
        <p className="font-body text-xs text-white/40 mt-6 leading-relaxed">
          {disclaimer}
        </p>
      )}
    </div>

    {/* Form */}
    <div className="flex-1 w-full max-w-lg">
      {submitted ? (
        <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-white mb-3">
            We've Received Your Request
          </h3>
          <p className="font-body text-white/75">
            A member of our team will reach out within one business day.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8">
          <Form {...formInstance}>
            <form onSubmit={formInstance.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={formInstance.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">Name</FormLabel>
                  <FormControl><Input placeholder="Your full name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={formInstance.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">Email</FormLabel>
                  <FormControl><Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={formInstance.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">Phone</FormLabel>
                  <FormControl><Input type="tel" placeholder="(555) 123-4567" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={formInstance.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">Property Address</FormLabel>
                  <FormControl><Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={formInstance.control} name="situation" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">What situation are you dealing with?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select a situation" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {situations.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={formInstance.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-white">Briefly describe your situation</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a bit about your property and what you\u2019re looking to accomplish\u2026" className="min-h-[100px] bg-white/90 text-foreground border-white/30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" variant="hero" size="hero" className="w-full">
                {buttonLabel}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const RealEstateMoves = () => {
  const [propertyReviewSubmitted, setPropertyReviewSubmitted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("quiz") === "true") {
      setShowQuiz(true);
      setTimeout(() => {
        const el = document.getElementById("property-quiz-container");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const propertyReviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", situation: "", description: "" },
  });

  const onPropertyReviewSubmit = async (data: ReviewFormValues) => {
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_STRATEGY_ENDPOINT as string | undefined;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      }
      setPropertyReviewSubmitted(true);
      toast.success("Property review request submitted!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <Helmet>
        <title>Property Strategy — Selling Options | Unlock Your Property</title>
      </Helmet>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section
        id="top"
        className="relative overflow-hidden bg-[hsl(var(--hero-navy))] min-h-[100dvh] flex flex-col justify-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/real-estate-moves-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-[620px]">
            <p className="animate-hero-fade-up font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-accent-soft mb-3 md:mb-4">
              Southern California Property Strategy
            </p>

            <h1 className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5">
              Not Sure What to Do With Your Property?
            </h1>

            <p className="animate-hero-fade-up-delay-2 font-body text-xl sm:text-2xl font-semibold leading-snug text-white/90 mb-4 md:mb-5 max-w-[560px]">
              Sell, improve, develop, or hold&mdash;we help you choose the right path.
            </p>

            <p className="animate-hero-fade-up-delay-2 font-body text-base sm:text-lg leading-relaxed text-white/60 mb-6 md:mb-8 max-w-[540px]">
              We help homeowners, trustees, and landlords determine whether to sell as-is, prepare the property, or make targeted improvements to maximize value&mdash;especially in situations involving inherited property, repairs, or unpermitted work.
            </p>

            <div className="animate-hero-fade-up-delay-3 flex flex-col md:flex-row gap-3 md:gap-4 mb-4">
              <Button variant="hero" size="hero" className="w-full md:w-auto" onClick={() => scrollToSection("property-review")}>
                Get My Property Options
              </Button>
            </div>

            <p className="animate-hero-fade-up-delay-3 font-body text-sm text-white/45 max-w-[560px]">
              Get clarity on your property within 24&ndash;48 hours so you can move forward with the right decision.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  QUIZ                                                         */}
      {/* ============================================================ */}
      {showQuiz && (
        <div id="property-quiz-container">
          <PropertyQuiz config={realEstateMovesQuizConfig} />
        </div>
      )}

      {/* ============================================================ */}
      {/*  COMMON REASONS HOMEOWNERS SELL                               */}
      {/* ============================================================ */}
      <section id="selling-reasons" className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            <p className="font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-primary/70 mb-3">
              We&rsquo;ve Seen It All
            </p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Who Is This For?
            </h2>
            <p className="font-body text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Homeowners come to us from all kinds of situations. Whether your path is straightforward or complicated, we&rsquo;ve handled it before&mdash;and we can help you navigate it.
            </p>
          </div>

          {/* Cards — top row of 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
            {([
              {
                icon: ScrollText,
                title: "Inherited Property",
                body: "You've inherited a home through probate or trust and need to figure out whether to keep it, fix it up, or sell.",
              },
              {
                icon: Building2,
                title: "Underperforming Rental",
                body: "The property isn't cash-flowing like it used to, tenants are difficult, or you're just tired of being a landlord.",
              },
              {
                icon: MoveRight,
                title: "Relocating, Downsizing, or Upsizing",
                body: "Whether it\u2019s a job move, divorce, retirement, or your home just no longer fits your life\u2014you\u2019re ready to make a change and unlock the equity you\u2019ve built.",
              },
            ] as const).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cards — bottom row of 2, centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
            {([
              {
                icon: Hammer,
                title: "Deferred Maintenance or Repairs",
                body: "The property needs work you can't afford or don't want to manage. You're unsure if it's worth fixing before selling.",
              },
              {
                icon: ShieldAlert,
                title: "Code Violations or Unpermitted Work",
                body: "There's unpermitted construction, open violations, or city issues making you unsure how to proceed.",
              },
            ] as const).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 lg:mt-20 text-center">
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              No matter how simple or complex your situation is, we&rsquo;ll help you find the clearest path forward.
            </p>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("property-review")}>
              Tell Us About Your Situation
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  YOUR PROPERTY OPTIONS                                        */}
      {/* ============================================================ */}
      <section id="property-options" className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Your Property Options
            </h2>
            <p className="font-body text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Every situation is different, but most property owners consider:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {sellingOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.title}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img
                      src={opt.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-border/60">
                      <Icon className="h-3.5 w-3.5" />
                      {opt.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">
                      {opt.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {opt.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY PROPERTY OWNERS REACH OUT                                */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Left — heading + intro */}
            <div className="lg:w-2/5 mb-10 lg:mb-0 lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Why Property Owners Reach Out
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
                Most people reach out because they want clarity before making a major decision&mdash;whether to sell as-is, prepare the property, or take a more strategic approach.
              </p>
            </div>

            {/* Right — stacked info cards */}
            <div className="lg:w-3/5 space-y-4">
              <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We help you understand your options so you can move forward with the right decision.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                    We regularly work alongside attorneys, trustees, contractors, and city departments to help navigate complex property situations.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-body text-sm sm:text-base font-semibold text-foreground leading-relaxed">
                    Waiting too long or choosing the wrong path can cost time, money, and missed opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COMMON QUESTIONS                                              */}
      {/* ============================================================ */}
      <section id="faqs" className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 lg:mb-14 text-center">
            Common Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border bg-card px-6 py-1 data-[state=open]:pb-4"
                >
                  <AccordionTrigger className="font-display text-base sm:text-lg font-semibold text-foreground text-left min-h-[48px] hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed pt-1 whitespace-pre-line">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROPERTY REVIEW FORM                                         */}
      {/* ============================================================ */}
      <section id="property-review" className="scroll-mt-20 py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <InlineReviewForm
            formInstance={propertyReviewForm}
            submitted={propertyReviewSubmitted}
            onSubmit={onPropertyReviewSubmit}
            heading="Get My Property Options"
            intro="Tell us about your property and situation. We'll review it and get back to you within 24–48 hours with a clear look at your options."
            buttonLabel="Get My Property Options"
            disclaimer="Property reviews evaluate general market conditions and property characteristics; final legal, tax, and financial decisions should be made with qualified professionals."
          />
        </div>
      </section>

    </main>
  );
};

export default RealEstateMoves;
