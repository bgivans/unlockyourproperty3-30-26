import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { submitForm } from "@/lib/submitForm";
import probateInventoryImg from "@/assets/probate-inventory-appraisal.png";
import probateCourtImg from "@/assets/probate-court-hearing.png";
import probatePetitionImg from "@/assets/probate-petition.png";
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
import { toast } from "sonner";
import { scrollToSection } from "@/lib/scroll";
import { probateFormSchema, type ProbateFormValues } from "@/schemas/forms";
import {
  FileText,
  Clock,
  ShieldCheck,
  Home,
  Hammer,
  Building,
  DollarSign,
  Users,
  MapPin,
  Scale,
  Phone,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const qualifiers = [
  {
    icon: FileText,
    title: "Recently Filed Probate",
    body: "You've filed the petition and are navigating the court timeline — publication period, hearing dates, and waiting for authority to act on the property.",
  },
  {
    icon: Clock,
    title: "Waiting on Court Approval",
    body: "The court process is underway but you don't have Letters yet. You're unsure what you can and can't do with the property while you wait.",
  },
  {
    icon: Home,
    title: "Inherited Property, Unsure What to Do",
    body: "The property transferred through a trust or estate and now you're responsible for it — but you haven't decided whether to keep, fix, rent, or sell.",
  },
  {
    icon: Hammer,
    title: "Vacant or Distressed Home",
    body: "The property is sitting empty, accumulating costs, or needs significant repairs. Every month of inaction increases carrying costs and risk.",
  },
  {
    icon: MapPin,
    title: "Out-of-State Owner Needing Local Help",
    body: "You live in another state and need someone on the ground in Southern California to evaluate the property, coordinate vendors, and manage next steps.",
  },
];

const stages = [
  {
    icon: FileText,
    title: "Just Filed (Phase 2)",
    body: "You've filed the probate petition and are waiting on court approval, the publication period, and creditor notification deadlines. During this phase, your ability to make decisions about the property is limited — but it's the best time to start evaluating your options so you're ready to move when authority is granted.",
  },
  {
    icon: Clock,
    title: "Authority Pending / Unclear",
    body: "You may have partial authority or be unsure what actions require court approval. This is common — especially with properties that have tenants, deferred maintenance, or pending code issues. Understanding your authority level now prevents costly missteps later.",
  },
  {
    icon: ShieldCheck,
    title: "Authority Granted (Phase 3)",
    body: "You've received Letters Testamentary or Letters of Administration and can now make binding decisions about the property — including selling, listing, renovating, or transferring. This is when having a clear strategy matters most, because the decisions you make here directly affect estate value and beneficiary proceeds.",
  },
];

const propertyOptions = [
  { icon: DollarSign, title: "Sell As-Is", body: "Skip repairs and sell quickly. Best when the property needs extensive work, the estate needs to close fast, or repair costs don't justify the return." },
  { icon: Home, title: "Prepare & List", body: "Light preparation — clean-out, cosmetic updates, professional staging — to attract more buyers and higher offers on the open market." },
  { icon: Hammer, title: "Renovate First", body: "Strategic improvements to significantly increase value. Best when the property has strong bones, good location, and the estate can absorb the timeline." },
  { icon: Building, title: "Hold as Rental", body: "Keep the property as a long-term income asset. Works when the property is in decent condition and the family agrees on a hold strategy." },
];

const decisionFactors = [
  "Type of authority granted by the court",
  "Current property condition and repair costs",
  "Estate debts, obligations, and timeline",
  "Family goals and beneficiary alignment",
];

const howWeHelp = [
  {
    icon: Scale,
    title: "Clarify Where You Are",
    body: "We help you understand your probate stage, what authority you have, and what decisions you can make right now.",
  },
  {
    icon: Home,
    title: "Evaluate the Property",
    body: "We assess the property's current condition against its date-of-death value to help you understand the real opportunity.",
  },
  {
    icon: ArrowRight,
    title: "Coordinate Next Steps",
    body: "From clean-outs to contractor bids to listing preparation — we manage the moving pieces so you don't have to.",
  },
  {
    icon: Users,
    title: "Work With Your Team",
    body: "We coordinate alongside your attorney, trustee, or financial advisor — never replacing legal counsel, always complementing it.",
  },
  {
    icon: ShieldCheck,
    title: "Legal Consultation Access",
    body: "If you need probate legal support, we connect you with experienced attorneys in our network who handle SoCal estates.",
  },
  {
    icon: Zap,
    title: "Avoid Costly Delays",
    body: "Every month a property sits costs money in maintenance, insurance, taxes, and lost value. We help you move with purpose.",
  },
];

const trustPoints = [
  { icon: MapPin, title: "Local Southern California Focus", body: "We work exclusively in SoCal — San Diego, Riverside, San Bernardino, and Orange counties. We know the local market, city processes, and regional challenges." },
  { icon: Home, title: "Inherited & Distressed Property Experience", body: "We specialize in properties that come with complications — deferred maintenance, code violations, unpermitted work, tenant issues, and multi-heir situations." },
  { icon: Users, title: "Families, Heirs & Trustees", body: "We work with families navigating loss, disagreement, and uncertainty. Our approach is calm, structured, and focused on the cleanest path forward for everyone involved." },
  { icon: Scale, title: "Legal Support Network", body: "We work alongside probate attorneys, estate planners, and fiduciaries. If you need legal counsel, we can connect you with experienced professionals." },
];

const faqs = [
  { q: "Can I sell before court approval?", a: "It depends on the type of authority granted. In some cases, sales can proceed under Independent Administration. We help you understand where you stand." },
  { q: "Do I need an attorney?", a: "We recommend working with a probate attorney for legal decisions. We handle the real estate strategy side and coordinate with your attorney when needed." },
  { q: "What happens if the home is vacant?", a: "Vacant properties can accumulate maintenance costs, insurance issues, and security risks. We help you evaluate the best next step quickly." },
  { q: "What if there are multiple heirs?", a: "Disagreements are common. A clear property evaluation and structured plan often helps families align on the best path forward." },
  { q: "What if I live out of state?", a: "Many of the families we work with are out of state. We handle local coordination so you don't have to be here for every step." },
  { q: "What if the property needs repairs?", a: "Not every property needs to be fixed before selling. We help you evaluate whether repairs make financial sense or if selling as-is is the smarter move." },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const Probate = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ProbateFormValues>({
    resolver: zodResolver(probateFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      probateStage: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ProbateFormValues) => {
    try {
      await submitForm({ ...data, formType: "probate-review" }, "Probate Property Review");
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <Helmet>
        <title>Probate Property Help — Southern California | Unlock Your Property</title>
      </Helmet>

      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[hsl(var(--hero-navy))] min-h-[100dvh] flex flex-col justify-center">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/media/hero_background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-[620px]">
            <p className="animate-hero-fade-up font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-accent-soft mb-3 md:mb-4">
              Probate & Inherited Property
            </p>
            <h1 className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5">
              Probate Property Help for Southern California Families
            </h1>
            <p className="animate-hero-fade-up-delay-2 font-body text-hero-sub leading-relaxed text-white/75 mb-6 max-w-[560px]">
              If you've recently filed probate or are handling an inherited property, we help you understand your options clearly — whether you plan to sell, fix, or hold.
            </p>
            <div className="animate-hero-fade-up-delay-3 flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection("probate-form")}>
                Review My Property Options
              </Button>
              <Button variant="heroOutline" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection("faster-probate")}>
                See If My Property Qualifies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. THIS IS FOR YOU IF...                                     */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            <p className="font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-primary/70 mb-3">
              We've Helped Families Like Yours
            </p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              This Is for You If...
            </h2>
            <p className="font-body text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Probate and inherited property situations come in many forms. Whether your path is straightforward or complicated, we've handled it before — and we can help you navigate it.
            </p>
          </div>

          {/* Cards — top row of 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
            {qualifiers.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group rounded-2xl border border-border bg-card p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">{item.title}</h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>

          {/* Cards — bottom row of 2, centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
            {qualifiers.slice(3).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group rounded-2xl border border-border bg-card p-7 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">{item.title}</h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 lg:mt-20 text-center">
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              No matter how simple or complex your situation is, we'll help you find the clearest path forward.
            </p>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("probate-form")}>
              Not sure where you are? Let's review it together
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. WHERE YOU ARE IN THE PROCESS — Timeline layout            */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            {/* Left — image + intro */}
            <div className="lg:w-5/12 mb-10 lg:mb-0">
              <p className="font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-primary/70 mb-3">
                Know Your Stage
              </p>
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Probate Looks Different Depending on Where You Are
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                The decisions available to you — and the urgency of making them — depend entirely on your current stage in the probate or estate process.
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src={probateCourtImg} alt="Probate court hearing documents" className="w-full h-56 sm:h-72 object-cover" />
              </div>
            </div>

            {/* Right — vertical timeline */}
            <div className="lg:w-7/12">
              <div className="flex flex-col gap-0">
                {stages.map((stage, i) => {
                  const Icon = stage.icon;
                  return (
                    <div key={stage.title} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        {i < stages.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                      </div>
                      <div className={i === stages.length - 1 ? "pb-0" : "pb-10"}>
                        <span className="font-body text-xs font-bold text-primary tracking-widest uppercase">Stage {i + 1}</span>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mt-1 mb-2">
                          {stage.title}
                        </h3>
                        <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {stage.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 pl-[4.25rem]">
                <Button variant="outline" size="lg" onClick={() => scrollToSection("probate-form")}>
                  Get clarity on your stage
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. REAL ESTATE DECISIONS — Split layout                      */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            {/* Left — copy + factors */}
            <div className="lg:w-5/12 mb-10 lg:mb-0">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Real Estate Decisions After Court Approval
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                Once authority is granted, you'll have the ability to make decisions regarding the property. The right path depends on your specific situation.
              </p>
              <p className="font-body text-sm font-semibold text-foreground mb-4">Each option depends on:</p>
              <div className="space-y-3 mb-8">
                {decisionFactors.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-body text-sm sm:text-base text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button variant="hero" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection("probate-form")}>
                Review My Property Options
              </Button>
            </div>

            {/* Right — stacked option rows */}
            <div className="lg:w-7/12 space-y-4">
              {propertyOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div key={opt.title} className="flex gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-1 leading-snug">{opt.title}</h3>
                      <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">{opt.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. FASTER PROBATE HOOK                                       */}
      {/* ============================================================ */}
      <section id="faster-probate" className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent">Faster Path</p>
              </div>
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Could Your Property Qualify for a Faster Process?
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-4">
                Some properties may qualify for a simplified or faster probate path depending on title, residence status, and estate details.
              </p>
              <p className="font-body text-sm text-muted-foreground italic">
                Not all properties qualify — but it's worth reviewing early.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm">
                <img src={probatePetitionImg} alt="Probate petition preparation checklist" className="w-full h-48 sm:h-56 object-cover" />
                <div className="p-8 sm:p-10 text-center">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">Check Eligibility</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Tell us about your situation and we'll help determine if a faster path is available.
                  </p>
                  <Button variant="hero" size="hero" className="w-full" onClick={() => scrollToSection("probate-form")}>
                    Check Eligibility
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. FAQ                                                       */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 lg:mb-14 text-center">
            Common Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 py-1 data-[state=open]:pb-4">
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
      {/*  7. HOW WE HELP — Numbered steps                              */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-14 lg:mb-20">
            <p className="font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-primary/70 mb-3">
              Your Property, Our Process
            </p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              How We Help You Navigate Probate Property Decisions
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground">
              We don't replace your attorney — we complement them. Our role is the real estate strategy side: evaluating the property, coordinating logistics, and helping you make smart decisions about what to do next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-5xl">
            {howWeHelp.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-bold shadow-md shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 leading-snug">{item.title}</h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. TRUST — Horizontal rows                                   */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-14 lg:mb-20">
            <p className="font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-primary/70 mb-3">
              Why Families Trust Us
            </p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground">
              Built for Complex Property Situations
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-border max-w-4xl">
            {trustPoints.map((tp) => {
              const Icon = tp.icon;
              return (
                <div key={tp.title} className="flex gap-5 sm:gap-8 py-8 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 leading-snug">{tp.title}</h3>
                    <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">{tp.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. FINAL CTA + 10. EMBEDDED FORM                            */}
      {/* ============================================================ */}
      <section id="probate-form" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            {/* Left copy */}
            <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0 lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold leading-[1.15] tracking-display text-white mb-5">
                Get a Clear Plan for the Property
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-white/75 mb-6">
                You don't need to figure this out alone. Tell us about your situation and we'll help you understand your options.
              </p>
              <p className="font-body text-sm text-white/60 mb-2">
                Call or text for a quicker response:
              </p>
              <a href="tel:+17604058488" className="inline-flex items-center gap-2 font-body text-base font-semibold text-white hover:text-white/90 transition-colors">
                <Phone className="w-4 h-4" />
                (760) 405-8488
              </a>
              <p className="font-body text-xs text-white/40 mt-6">
                Free Probate Property Strategy Review Available
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
                    A member of our team will reach out within one business day to discuss your property.
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
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Phone</FormLabel>
                          <FormControl><Input type="tel" placeholder="(555) 123-4567" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
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
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Property Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="probateStage" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Probate Stage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30"><SelectValue placeholder="Select your stage" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="just-filed">Just Filed (Phase 2)</SelectItem>
                              <SelectItem value="authority-pending">Authority Pending / Unclear</SelectItem>
                              <SelectItem value="authority-granted">Authority Granted (Phase 3)</SelectItem>
                              <SelectItem value="trust-transfer">Trust / Direct Transfer</SelectItem>
                              <SelectItem value="not-sure">Not Sure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="notes" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">
                            Notes <span className="text-white/50 font-normal">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea placeholder="Anything else we should know about the property or situation..." className="min-h-[80px] bg-white/90 text-foreground border-white/30 resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" variant="hero" size="hero" className="w-full">
                        Book My Probate Property Review
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Probate;
