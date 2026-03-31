import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import inheritedLifestyleImg from "@/assets/inherited-review-lifestyle.jpg";
import traditionalSaleBg from "@/assets/traditional-sale-bg.jpg";
import sellingAsIsImg from "@/assets/selling-as-is.jpg";
import sellingPrepareImg from "@/assets/selling-prepare.jpg";
import sellingStrategicImg from "@/assets/selling-strategic.jpg";
import { Home, ClipboardList, Hammer, Signpost, PackageOpen, Paintbrush, Search } from "lucide-react";
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
import ShareButtons from "@/components/ShareButtons";
import CaseStudyHighlights from "@/components/CaseStudyHighlights";
import type { CaseStudyConfig } from "@/components/CaseStudyHighlights";
import { toast } from "sonner";
import { scrollToSection } from "@/lib/scroll";
import { reviewFormSchema, type ReviewFormValues } from "@/schemas/forms";
import { reviewSituations as situations } from "@/data/situations";
import { serviceAreas } from "@/data/serviceAreas";

/* ------------------------------------------------------------------ */
/*  How We Help — icon strip with CSS fade-in animation                */
/* ------------------------------------------------------------------ */
const howWeHelpItems = [
  { icon: Home, label: "Value" },
  { icon: ClipboardList, label: "Condition" },
  { icon: Hammer, label: "Repair Scope" },
  { icon: Signpost, label: "Best Next Step" },
] as const;

const HowWeHelpSection = ({ lifestyleImg }: { lifestyleImg: string }) => (
  <section className="py-16 lg:py-24 bg-card">
    <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
      {/* Icon strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {howWeHelpItems.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-3 animate-fade-in"
            style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-body text-sm font-semibold text-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Body + lifestyle image */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-14">
        <div className="lg:flex-1 mb-8 lg:mb-0">
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            We review the property, explain the realistic options, and help you understand the smartest next move based on condition, market demand, timeline, and estate context.
          </p>
        </div>
        <div className="lg:flex-shrink-0 lg:w-[380px]">
          <img
            src={lifestyleImg}
            alt="Heir reviewing property paperwork at home"
            className="w-full rounded-xl aspect-[4/3] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

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
    a: "Not always. Some properties sell best as-is, while others benefit from cleanup, repairs, or targeted updates before listing. The right answer depends on the condition of the property, your timeline, and what the market is likely to reward.",
  },
  {
    q: "Can a property held in a trust be sold?",
    a: "Yes, in many cases a trust-owned property can be sold, but the process depends on how the trust is structured and who has authority to act. It is important to coordinate with the right legal and financial professionals before making decisions.",
  },
  {
    q: "Can I sell a property with code violations or unpermitted work?",
    a: "Yes, but those issues can affect buyer demand, financing, and your overall selling strategy. In some cases the best move is to resolve the issue first, and in other cases it may make more sense to sell with full disclosure.",
  },
  {
    q: "How do I know what my property is worth?",
    a: "Value depends on more than square footage. Condition, location, repair needs, buyer demand, and the property's upside all play a role in what the market may pay.",
  },
  {
    q: "Can inherited or probate properties be sold?",
    a: "Yes, but the timing and process depend on the estate structure, legal steps, and who is authorized to act. Getting clarity early helps families avoid delays, confusion, and expensive mistakes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Config — Real Estate Moves                                    */
/* ------------------------------------------------------------------ */
const realEstateMovesQuizConfig: QuizConfig = {
  path: "real_estate_moves",
  headline: "What kind of real estate move are you considering?",
  subheadline: "Answer a few quick questions and we'll outline your likely Real Estate Moves path.",
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
      options: ["0–3 months", "3–12 months", "12+ months", "Just exploring"],
    },
    {
      question: "How many properties are involved?",
      options: ["1 property", "2–3 properties", "4+ properties"],
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
      bullets.push("Connect with our team to map out your specific Real Estate Moves path.");
    }

    return { title: "Your likely Real Estate Moves path", bullets };
  },
  optionsSectionId: "inherited-probate",
  optionsLabel: "View Real Estate Moves options",
};

/* ------------------------------------------------------------------ */
/*  Case Study Config — Real Estate Moves                              */
/* ------------------------------------------------------------------ */
const realEstateMovesCaseStudyConfig: CaseStudyConfig = {
  path: "real_estate_moves",
  intro: "Here's how owners in similar situations moved forward with a clear plan.",
  quizSectionId: "property-quiz",
  strategySectionId: "strategy-call",
  studies: [
    {
      title: "Tenant Trouble to Multi-Unit Reinvestment",
      summary: "Landlord sold a problem triplex as-is and used a 1031 exchange to acquire a better-performing 6-unit property with professional management.",
      tags: ["Problem Rental", "1031 Exchange", "Portfolio Upgrade"],
    },
    {
      title: "Inherited Home — From Confusion to Clean Sale",
      summary: "Family inherited a home with deferred maintenance and disagreements. We provided a condition review, pricing strategy, and coordinated the sale.",
      tags: ["Inherited Property", "Probate", "Selling Strategy"],
    },
    {
      title: "Vacant Property — Sell As-Is vs. Prepare",
      summary: "Owner compared selling immediately vs. doing $15k in targeted updates. The prepared approach netted an extra $42k after costs.",
      tags: ["Selling Strategy", "ROI Analysis", "Property Prep"],
    },
    {
      title: "Relocating Owner — Coordinated Buy-Sell",
      summary: "Out-of-state owner needed to sell their rental and purchase a personal residence. We coordinated both transactions with a clear timeline.",
      tags: ["Relocation", "Buy-Sell", "Timeline Planning"],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Reusable inline form (light bg)                                    */
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
                    <Textarea placeholder="Tell us a bit about your property and what you're looking to accomplish…" className="min-h-[100px] bg-white/90 text-foreground border-white/30" {...field} />
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
  const [inheritedSubmitted, setInheritedSubmitted] = useState(false);
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

  const inheritedForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", situation: "inherited-probate", description: "" },
  });

  const propertyReviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", situation: "", description: "" },
  });

  const onInheritedSubmit = async (data: ReviewFormValues) => {
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_STRATEGY_ENDPOINT as string | undefined;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      }
      setInheritedSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

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
        <title>Real Estate Moves — Selling Strategy | Unlock Your Property</title>
      </Helmet>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section
        id="top"
        className="relative overflow-hidden bg-[hsl(var(--hero-navy))]"
      >
        {/* VIDEO PLACEHOLDER — replace src when hero video is ready */}
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
              Southern California Property Selling Guidance
            </p>

            <h1 className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5">
              Selling a Property and Not Sure What to Do Next?
            </h1>

            <p className="animate-hero-fade-up-delay-2 font-body text-hero-sub leading-relaxed text-white/75 mb-3 max-w-[560px]">
              Some properties are ready for the market. Others need strategy first. We help homeowners, trustees, landlords, and inherited-property owners understand whether to sell as-is, prepare the property for sale, or make targeted improvements to maximize value.
            </p>

            <p className="animate-hero-fade-up-delay-2 font-body text-sm text-white/60 mb-6 md:mb-8 max-w-[560px]">
              Guidance for inherited homes, trust-owned properties, homes needing repairs, code issues, unpermitted work, and more.
            </p>

            <div className="animate-hero-fade-up-delay-3 flex flex-col md:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="hero" className="w-full md:w-auto" onClick={() => scrollToSection("inherited-probate")}>
                Inherited or Probate Property
              </Button>
              <Button
                variant="heroOutline"
                size="hero"
                className="w-full md:w-auto border-white/30 text-white hover:border-white hover:text-white hover:bg-white/10 animate-gentle-bounce"
                onClick={() => scrollToSection("traditional-sale")}
              >
                Traditional Sale &amp; Exit Strategy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  QUIZ — What kind of real estate move?                        */}
      {/* ============================================================ */}
      {showQuiz && (
        <div id="property-quiz-container">
          <PropertyQuiz config={realEstateMovesQuizConfig} />
        </div>
      )}

      {/* ============================================================ */}
      {/*  INHERITED / PROBATE FUNNEL                                   */}
      {/* ============================================================ */}

      {/* IP-1 — Emotional Hook */}
      <section id="inherited-probate" className="scroll-mt-20 py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Inherited or Probate Property
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground mb-4 max-w-3xl">
              Not sure whether to keep it, fix it, rent it, or sell it? We help heirs, beneficiaries, and trustees get a clear plan before they waste time, money, or create family conflict.
            </p>
            <p className="font-body text-sm sm:text-base leading-relaxed text-foreground/80">
              Get clarity on value, condition, repair needs, selling potential, and next steps — so you can move forward with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* IP-2 — How We Help strip */}
      <HowWeHelpSection lifestyleImg={inheritedLifestyleImg} />

      {/* IP-3 — Inherited Property Review Form */}
      <section className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <InlineReviewForm
            formInstance={inheritedForm}
            submitted={inheritedSubmitted}
            onSubmit={onInheritedSubmit}
            heading="Request Your Inherited Property Review"
            intro="Tell us about the property and your situation, and we'll help you understand the most practical path forward."
            buttonLabel="Get My Property Review"
            disclaimer="Property reviews evaluate general market conditions and property characteristics; final legal, tax, and financial decisions should be made with qualified professionals."
          />
        </div>
      </section>

      {/* IP-4 — Why Families and Trustees Reach Out */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Why Families and Trustees Reach Out
            </h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
              Most people reach out because they do not want to make an expensive decision too early. They want to know whether the property should be sold as-is, cleaned up and listed, improved first, or held longer based on its true potential. We help you see the tradeoffs clearly, reduce uncertainty, and move forward with a plan that fits your situation.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRADITIONAL SALE & EXIT STRATEGY FUNNEL                      */}
      {/* ============================================================ */}

      {/* TS-1 — Intro */}
      <section id="traditional-sale" className="scroll-mt-20 py-24 lg:py-32 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={traditionalSaleBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-card/70 lg:bg-card/85 backdrop-blur-[1px] lg:backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl lg:max-w-none lg:flex-1">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Traditional Sale &amp; Exit Strategy
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground mb-8 max-w-3xl">
              Some properties are ready for the market. Others need strategy first. We help homeowners and landlords understand whether to sell as-is, prepare the property, or make targeted improvements before listing.
            </p>

            {/* Who This Is For */}
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Who This Is For
            </p>
            <ul className="space-y-3">
              {[
                "Homes needing repairs, cleanup, or updates before listing.",
                "Landlords ready to exit and move on from tenants and maintenance.",
                "Owners relocating, downsizing, or unlocking equity.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TS-2 — Your Selling Options */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Your Selling Options
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
              There is no one-size-fits-all answer. The right strategy depends on your timeline, the property condition, and what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
            {sellingOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.title}
                  className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={opt.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    {/* Floating label */}
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

      {/* TS-3 — Property Review Form */}
      <section id="property-review" className="scroll-mt-20 py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <InlineReviewForm
            formInstance={propertyReviewForm}
            submitted={propertyReviewSubmitted}
            onSubmit={onPropertyReviewSubmit}
            heading="Request a Property Review Before You Sell"
            intro="Before making a recommendation, we look at the factors that most often shape your options and your outcome. That includes current market value, property condition, repair needs, improvement opportunities, neighborhood buyer demand, and, where relevant, zoning or lot potential. The goal is to help you understand what path makes the most sense before you invest time or money in the wrong move."
            buttonLabel="Review My Property"
          />
        </div>
      </section>

      {/* TS-4 — Why Property Owners Reach Out */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Why Property Owners Reach Out
            </h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
              Most people call because they want clarity before making a major decision. They want to know whether the property should be sold as-is, cleaned up and listed, improved first, or evaluated more strategically based on its condition and potential. Our role is to help you see the real options clearly so you can make the best call for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SHARED FAQ                                                    */}
      {/* ============================================================ */}
      <section id="faqs" className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 lg:mb-14 max-w-xl">
            Common Questions
          </h2>
          <div className="max-w-2xl">
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
                  <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                     */}
      {/* ============================================================ */}
      <section id="strategy-call" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.12] tracking-display text-white mb-5">
              Get Clear on the Best Way to Sell Your Property
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-white/75 mb-10">
              Before you decide to list, sell as-is, or invest money into repairs, get a clear view of your options. We'll help you evaluate the property, the market, and the smartest path forward based on your goals.
            </p>
            <Button variant="hero" size="hero" onClick={() => scrollToSection("property-review")}>
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  AREAS WE SERVE                                                */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Areas We Serve
            </h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              We work with property owners throughout Southern California, including:
            </p>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="font-body text-sm sm:text-base px-4 py-2 rounded-full border border-border bg-card text-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DIVIDER — Also Exploring a Purchase?                         */}
      {/* ============================================================ */}
      <div className="border-t border-border bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-12 text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Also Exploring a Purchase?
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  BUYER GUIDANCE (visually secondary)                          */}
      {/* ============================================================ */}
      <section id="buying" className="scroll-mt-20 py-20 lg:py-24 bg-muted/50">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Southern California Buyer Guidance
            </p>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-semibold leading-[1.15] tracking-display text-foreground mb-3">
              Buy the Right Property Without Guessing
            </h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Whether you're buying your first home, moving up, or looking for an investment property, Unlock Your Property helps you make smart real estate decisions with a clear strategy.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              We help you understand your options, evaluate properties, and move forward with confidence.
            </p>
            <Button variant="hero" size="lg" onClick={() => scrollToSection("strategy-call")}>
              Schedule a Buyer Consultation
            </Button>
            <p className="font-body text-xs text-muted-foreground mt-4">
              Serving buyers across Southern California.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SHARE BUTTONS                                                */}
      {/* ============================================================ */}
      <ShareButtons config={{ path: "real_estate_moves", pageUrl: window.location.origin + "/solutions/real-estate-moves" }} />

      {/* ============================================================ */}
      {/*  CASE STUDY HIGHLIGHTS                                        */}
      {/* ============================================================ */}
      <CaseStudyHighlights config={realEstateMovesCaseStudyConfig} />

      {/* ============================================================ */}
      {/*  DISCLAIMER                                                    */}
      {/* ============================================================ */}
      <div className="py-8 bg-muted">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
            Unlock Your Property provides real estate consulting, development guidance, and permit documentation services through employed or contracted designers. We do not provide legal, tax, architectural, or engineering services. Brokerage services, when applicable, are handled separately through the licensed brokerage entity Coast 2 Coast Realty, DRE #02193707.
          </p>
        </div>
      </div>
    </main>
  );
};

export default RealEstateMoves;
