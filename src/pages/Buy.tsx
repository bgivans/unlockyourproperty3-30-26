import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { submitForm } from "@/lib/submitForm";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import buyingTurnkeyImg from "@/assets/buying-turnkey.jpg";
import raulGarciaImg from "@/assets/raul-garcia.jpg";
import buyingFixerImg from "@/assets/buying-fixer.jpg";
import buyingNewbuildImg from "@/assets/buying-newbuild.jpg";
import buyingMultifamilyImg from "@/assets/buying-multifamily.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { scrollToSection } from "@/lib/scroll";
import {
  Home,
  TrendingUp,
  Building2,
  Landmark,
  DollarSign,
  Target,
  Search,
  FileCheck,
  ArrowRight,
  CheckCircle,
  Hammer,
  HardHat,
  Building,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NAME_MAX, EMAIL_MAX, PHONE_MAX } from "@/constants";

/* ------------------------------------------------------------------ */
/*  Form schema                                                        */
/* ------------------------------------------------------------------ */
const buyerFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(NAME_MAX),
  email: z.string().trim().email("Please enter a valid email").max(EMAIL_MAX),
  phone: z.string().trim().min(1, "Phone number is required").max(PHONE_MAX),
  priceRange: z.string().min(1, "Please select a price range"),
  timeline: z.string().min(1, "Please select a timeline"),
  propertyType: z.string().min(1, "Please select a property type"),
  preApproved: z.string().min(1, "Please select an option"),
});
type BuyerFormValues = z.infer<typeof buyerFormSchema>;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const whoThisIsFor = [
  {
    icon: Home,
    title: "First-Time Buyers",
    body: "Navigating your first purchase and want a clear, guided process from pre-approval to closing.",
  },
  {
    icon: TrendingUp,
    title: "Move-Up or Repeat Buyers",
    body: "You\u2019ve bought before and are ready to upgrade, downsize, or relocate to your next home.",
  },
  {
    icon: Building2,
    title: "New Construction Buyers",
    body: "Exploring newly built homes or developments and want help evaluating builders, timelines, and value.",
  },
  {
    icon: Landmark,
    title: "Investment Property Buyers",
    body: "Looking to acquire rental properties or investment assets that align with your financial goals.",
  },
];

const buyingOptions = [
  {
    title: "Turnkey Property",
    body: "Move-in ready homes that require little to no work. Ideal if you want to settle in quickly or start generating rental income right away.",
    icon: Home,
    label: "Move-In Ready",
    image: buyingTurnkeyImg,
  },
  {
    title: "Fixer-Upper",
    body: "Properties with upside potential that need cosmetic or structural work. A great fit if you want to build equity through improvements.",
    icon: Hammer,
    label: "Value-Add",
    image: buyingFixerImg,
  },
  {
    title: "New Construction",
    body: "Newly built homes or developments with modern layouts, warranties, and energy efficiency. We help you evaluate builders, incentives, and timelines.",
    icon: HardHat,
    label: "New Build",
    image: buyingNewbuildImg,
  },
  {
    title: "Multifamily Property",
    body: "Duplexes, triplexes, and small apartment buildings that generate rental income. A strong option for house-hacking or growing a portfolio.",
    icon: Building,
    label: "Income Property",
    image: buyingMultifamilyImg,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Define Your Goals",
    description: "Budget, timeline, and property type",
    icon: Target,
  },
  {
    step: 2,
    title: "Get Pre-Approved",
    description: "Understand your buying power",
    icon: DollarSign,
  },
  {
    step: 3,
    title: "Find the Right Property",
    description: "Tour and evaluate opportunities",
    icon: Search,
  },
  {
    step: 4,
    title: "Close the Deal",
    description: "Offer, escrow, and ownership transfer",
    icon: FileCheck,
  },
];

/* ------------------------------------------------------------------ */
/*  Buy Page Case Studies (filtered from master list)                   */
/* ------------------------------------------------------------------ */
const buyStudyTitles = [
  "Triplex Investment — Inland Empire",
  "4-Unit Portfolio Builder — Passive Income",
  "Family Upsize — $60K Negotiated Savings",
  "Out-of-State Relocation — New Construction",
];
const buyCaseStudies = buyStudyTitles
  .map((t) => caseStudies.find((s) => s.title === t)!)
  .filter(Boolean);

/* ------------------------------------------------------------------ */
/*  Case Card (matches homepage design)                                */
/* ------------------------------------------------------------------ */
const BuyCaseCard = ({ study, index, onClick }: { study: CaseStudy; index: number; onClick: () => void }) => {
  const images = study.images && study.images.length > 1 ? study.images : [study.image];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => setActiveIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      onClick={onClick}
      className="group rounded-xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={study.imageAlt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          />
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIdx ? "bg-white" : "bg-white/40"}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-3.5 flex flex-col flex-1 gap-2">
        <div>
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60 block">
            Case Study {index + 1}
          </span>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground leading-tight mt-0.5">
            {study.title}
          </h3>
          {(study.address || study.price) && (
            <div className="flex flex-wrap gap-x-2 mt-0.5">
              {study.address && <span className="font-body text-[11px] text-muted-foreground">{study.address}</span>}
              {study.price && <span className="font-body text-[11px] font-semibold text-primary">{study.price}</span>}
            </div>
          )}
        </div>

        <div className="space-y-2 flex-1 text-[13px] leading-snug">
          <div>
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-accent block">Problem</span>
            <p className="font-body text-muted-foreground">{study.problem}</p>
          </div>
          <div>
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-primary block">What We Did</span>
            <p className="font-body text-muted-foreground">{study.whatWeDid}</p>
          </div>
          <div className="bg-primary/5 border-l-2 border-primary rounded-r px-2 py-1.5">
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-primary block">Outcome</span>
            <p className="font-body font-medium text-foreground">{study.outcome}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-2 border-t border-border">
          {study.badges.map((badge) => (
            <span key={badge} className="font-body text-[10px] font-medium tracking-wide text-primary bg-primary/8 rounded-full px-2 py-0.5">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Lightbox (matches homepage design)                                 */
/* ------------------------------------------------------------------ */
const BuyLightbox = ({
  studies,
  currentIndex,
  onClose,
  onNav,
}: {
  studies: CaseStudy[];
  currentIndex: number;
  onClose: () => void;
  onNav: (index: number) => void;
}) => {
  const study = studies[currentIndex];
  const images = study.images && study.images.length > 1 ? study.images : [study.image];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => { setActiveImgIdx(0); }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNav(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < studies.length - 1) onNav(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, studies.length, onClose, onNav]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
        <X className="w-5 h-5" />
      </button>
      {currentIndex > 0 && (
        <button onClick={() => onNav(currentIndex - 1)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
      {currentIndex < studies.length - 1 && (
        <button onClick={() => onNav(currentIndex + 1)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      <div className="relative z-40 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl mx-4">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          {images.map((src, i) => (
            <img key={i} src={src} alt={study.imageAlt} draggable={false} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: i === activeImgIdx ? 1 : 0 }} />
          ))}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActiveImgIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === activeImgIdx ? "bg-white" : "bg-white/40"}`} aria-label={`Image ${i + 1}`} />
              ))}
            </div>
          )}
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {studies.length}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60 block">Case Study {currentIndex + 1}</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight mt-1 mb-1">{study.title}</h3>
          {(study.address || study.price) && (
            <div className="flex flex-wrap gap-x-3 mb-4">
              {study.address && <span className="font-body text-sm text-muted-foreground">{study.address}</span>}
              {study.price && <span className="font-body text-sm font-semibold text-primary">{study.price}</span>}
            </div>
          )}
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-accent block mb-1">Problem</span>
              <p className="font-body text-muted-foreground leading-relaxed">{study.problem}</p>
            </div>
            <div>
              <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-primary block mb-1">What We Did</span>
              <p className="font-body text-muted-foreground leading-relaxed">{study.whatWeDid}</p>
            </div>
            <div className="bg-primary/5 border-l-2 border-primary rounded-r px-4 py-3">
              <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-primary block mb-1">Outcome</span>
              <p className="font-body font-medium text-foreground leading-relaxed">{study.outcome}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border">
            {study.badges.map((badge) => (
              <span key={badge} className="font-body text-xs font-medium tracking-wide text-primary bg-primary/8 rounded-full px-3 py-1">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const faqs = [
  {
    q: "Do I need to be pre-approved before looking at homes?",
    a: "Most sellers require pre-approval before accepting offers.",
  },
  {
    q: "How long does the buying process take?",
    a: "Most transactions close within 30\u201345 days once under contract.",
  },
  {
    q: "Can I buy and sell at the same time?",
    a: "Yes. Many buyers coordinate both transactions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const Buy = () => {
  const [submitted, setSubmitted] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const form = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      priceRange: "",
      timeline: "",
      propertyType: "",
      preApproved: "",
    },
  });

  const onSubmit = async (data: BuyerFormValues) => {
    try {
      await submitForm({ ...data, formType: "buyer-search" }, "Buyer Search");
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <Helmet>
        <title>Buy a Property — Buyer Strategy | Unlock Your Property</title>
      </Helmet>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[hsl(var(--hero-navy))] min-h-[100dvh] flex flex-col justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/hero_background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-[620px]">
            <p className="animate-hero-fade-up font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-accent-soft mb-3 md:mb-4">
              Southern California Buyer Strategy
            </p>

            <h1 className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5">
              Buy the Right Property With a Clear Strategy
            </h1>

            <p className="animate-hero-fade-up-delay-2 font-body text-hero-sub leading-relaxed text-white/75 mb-6 max-w-[560px]">
              Whether you're buying your first home, upgrading, or investing, we help you move forward with clarity and access to the right opportunities.
            </p>

            <div className="animate-hero-fade-up-delay-3">
              <Button
                variant="hero"
                size="hero"
                className="w-full md:w-auto"
                onClick={() => scrollToSection("buyer-form")}
              >
                Start Your Property Search
              </Button>
            </div>

            <p className="animate-hero-fade-up-delay-3 font-body text-sm text-white/60 mt-4 max-w-[560px]">
              Get connected with the right properties, financing, and a clear plan to move forward.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  START YOUR PROPERTY SEARCH — FORM                            */}
      {/* ============================================================ */}
      <section id="buyer-form" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Left copy */}
            <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0 lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold leading-[1.15] tracking-display text-white mb-5">
                Start Your Property Search
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-white/75">
                Tell us what you're looking for and we'll help you identify the right opportunities.
              </p>
              <p className="font-body text-sm text-white/60 mt-4">
                Call or text for a quicker response: <a href="tel:+17604058488" className="underline text-white/80 hover:text-white">760-405-8488</a>
              </p>
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Name</FormLabel>
                          <FormControl><Input placeholder="Your full name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Phone</FormLabel>
                          <FormControl><Input type="tel" placeholder="(555) 123-4567" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="priceRange" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Price Range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select a price range" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-300k">Under $300,000</SelectItem>
                              <SelectItem value="300k-500k">$300,000 – $500,000</SelectItem>
                              <SelectItem value="500k-750k">$500,000 – $750,000</SelectItem>
                              <SelectItem value="750k-1m">$750,000 – $1,000,000</SelectItem>
                              <SelectItem value="1m-plus">$1,000,000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="timeline" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Timeline</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select a timeline" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-3-months">1–3 months</SelectItem>
                              <SelectItem value="3-6-months">3–6 months</SelectItem>
                              <SelectItem value="exploring">Just exploring</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="propertyType" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select a property type" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="primary-residence">Primary residence</SelectItem>
                              <SelectItem value="investment">Investment</SelectItem>
                              <SelectItem value="new-construction">New construction</SelectItem>
                              <SelectItem value="not-sure">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="preApproved" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Are you pre-approved?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select an option" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="not-yet">Not yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" variant="hero" size="hero" className="w-full">
                        Start Your Property Search
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHO THIS IS FOR                                              */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Who This Is For
            </h2>
            <p className="font-body text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Whether you&rsquo;re buying your first home or adding to your portfolio, we help you find the right property and navigate the process with confidence.
            </p>
          </div>

          {/* Cards — 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
            {whoThisIsFor.map((item) => {
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
            <Button variant="outline" size="lg" onClick={() => scrollToSection("buyer-form")}>
              Start Your Search
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  UNDERSTANDING YOUR BUYING POWER                              */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Understanding Your Buying Power
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
                We connect buyers with trusted lenders to determine budget and financing options before starting the search.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-border bg-background p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={raulGarciaImg}
                    alt="Raul Garcia, partnered lender"
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">Raul Garcia</p>
                    <p className="font-body text-sm text-muted-foreground">Partnered Lender &middot; NMLS #1205424</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Budget clarity before touring", "Financing options matched to your situation", "Stronger negotiating position"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 lg:mb-14 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative rounded-2xl border border-border bg-card p-7 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-bold shadow-md">
                    {item.step}
                  </span>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mt-2 mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
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
              Every buyer&rsquo;s situation is different, but most are considering one of these paths:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {buyingOptions.map((opt) => {
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
      {/*  REAL PROPERTIES. REAL OUTCOMES.                               */}
      {/* ============================================================ */}
      <section id="case-studies" className="bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-8">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
              Real Properties. Real Outcomes.
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
              See how we helped buyers find the right property and close with confidence.
            </p>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {buyCaseStudies.map((study, i) => (
              <BuyCaseCard
                key={study.title}
                study={study}
                index={i}
                onClick={() => setLightboxIdx(i)}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-16 text-center">
          <h3 className="font-display text-[clamp(20px,3vw,30px)] font-bold text-foreground mb-5">
            Ready to find the right property?
          </h3>
          <Button
            variant="default"
            size="hero"
            onClick={() => scrollToSection("buyer-form")}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Start Your Property Search
          </Button>
        </div>

        {lightboxIdx !== null && (
          <BuyLightbox
            studies={buyCaseStudies}
            currentIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNav={(i) => setLightboxIdx(i)}
          />
        )}
      </section>

      {/* ============================================================ */}
      {/*  COMMON QUESTIONS                                              */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
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
      <section className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.12] tracking-display text-white mb-5">
              Ready to Get Started?
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-white/75 mb-10">
              Schedule a strategy call and we'll help you build a clear plan to move forward.
            </p>
            <Button variant="hero" size="hero" onClick={() => scrollToSection("buyer-form")}>
              <span className="flex items-center gap-2">
                Schedule a Buyer Strategy Call
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Buy;
