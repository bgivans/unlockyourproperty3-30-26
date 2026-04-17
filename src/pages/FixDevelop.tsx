import { useState, useId, useEffect, useCallback } from "react";
import { submitForm } from "@/lib/submitForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { scrollToSection } from "@/lib/scroll";
import { leadSchema, type LeadValues as GuideValues, violationGuideSchema, type ViolationGuideValues, leadWithOptionalPhoneSchema, type LeadWithOptionalPhoneValues as PropertyReviewValues } from "@/schemas/forms";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import PropertyQuiz from "@/components/PropertyQuiz";
import type { QuizConfig } from "@/components/PropertyQuiz";
import ShareButtons from "@/components/ShareButtons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Home, PlusSquare, Warehouse, DoorOpen, Search, Pencil, FileText, ClipboardCheck, Hammer, AlertTriangle, ShieldCheck, DollarSign, ChevronLeft, ChevronRight, X, CheckCircle } from "lucide-react";
import { aduCaseStudies, caseStudies, type CaseStudy } from "@/data/caseStudies";
import codeViolationGuideImg from "@/assets/code-violation-guide-mockup.png";
import aduDetachedImg from "@/assets/adu-detached.png";
import aduAttachedImg from "@/assets/adu-attached.png";
import aduGarageImg from "@/assets/adu-garage.png";
import aduJaduImg from "@/assets/adu-jadu.png";
import aduExteriorImg from "@/assets/adu-exterior.jpg";
import adu3dModelImg from "@/assets/adu-3d-model.jpg";
import aduConstructionAerialImg from "@/assets/adu-construction-aerial.jpg";
import aduElevationsImg from "@/assets/adu-elevations.png";
import aduFoundationImg from "@/assets/adu-foundation.jpg";
import aduRoofCraneImg from "@/assets/adu-roof-crane.jpg";
import aduLumberImg from "@/assets/adu-lumber.jpg";
import raulGarciaImg from "@/assets/raul-garcia.jpg";
import cvGarageImg from "@/assets/cv-garage-conversion.jpg";
import cvAduImg from "@/assets/cv-unpermitted-adu.jpg";
import cvRoomImg from "@/assets/cv-room-addition.jpg";
import cvPermitsImg from "@/assets/cv-permits-inspections.jpg";
import cvZoningImg from "@/assets/cv-zoning-setback.jpg";
import cvUnitImg from "@/assets/cv-unit-conversion.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const aduTypes = [
  {
    title: "Detached ADU",
    shortTitle: "Detached",
    description:
      "A standalone unit built separately from the main house — offers maximum privacy and flexibility for rental income or family use.",
    icon: Home,
    image: aduDetachedImg,
    bullets: [
      "You want maximum privacy between units",
      "You plan to generate rental income",
      "Your lot has room for a separate structure",
    ],
  },
  {
    title: "Attached ADU",
    shortTitle: "Attached",
    description:
      "An addition connected to the existing home, sharing one or more walls. Often the most cost-effective new-build option.",
    icon: PlusSquare,
    image: aduAttachedImg,
    bullets: [
      "You want to minimize construction costs",
      "Your lot has limited setback space",
      "You prefer a connected living arrangement",
    ],
  },
  {
    title: "Garage Conversion",
    shortTitle: "Garage",
    description:
      "Converting an existing garage into a living space. A popular path that reuses existing structure and footprint.",
    icon: Warehouse,
    image: aduGarageImg,
    bullets: [
      "You have an underused garage",
      "You want to reuse an existing structure",
      "You're looking for a faster build timeline",
    ],
  },
];

const designServices = [
  "Feasibility and site evaluation",
  "Permit-ready design",
  "Engineer coordination",
  "Permit documentation",
  "City submittal and plan-check coordination",
  "Guidance through approval",
];

const devSteps = [
  { number: "01", title: "Feasibility Review", description: "We assess your property's zoning, lot size, setbacks, and utility access to determine what's buildable.", icon: Search },
  { number: "02", title: "Concept Planning", description: "Develop a site plan and preliminary design that fits your goals, budget, and local requirements.", icon: Pencil },
  { number: "03", title: "Permit Documentation", description: "Prepare construction drawings, engineering reports, and all documents needed for city submittal.", icon: FileText },
  { number: "04", title: "City Plan Check & Approval", description: "Navigate the plan-check process, respond to corrections, and secure your building permit.", icon: ClipboardCheck },
  { number: "05", title: "Construction Phase", description: "Coordinate with licensed contractors to bring your approved ADU plan to life.", icon: Hammer },
];

/* ------------------------------------------------------------------ */
/*  Guide form schema                                                  */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  ADU Types tabbed section                                           */
/* ------------------------------------------------------------------ */
const AduTypesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabId = useId();
  const active = aduTypes[activeIdx];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-3 max-w-xl">
          Types of ADUs
        </h2>
        <p className="font-body text-hero-sub leading-relaxed text-muted-foreground mb-8 lg:mb-10 max-w-lg">
          Explore different ADU formats to match your property and goals.
        </p>

        {/* Tab buttons — 2×2 grid on mobile, row on desktop */}
        <div
          role="tablist"
          aria-label="ADU types"
          className="grid grid-cols-2 gap-2 lg:flex lg:gap-2 mb-8 lg:mb-10"
        >
          {aduTypes.map((t, i) => {
            const isActive = i === activeIdx;
            const Icon = t.icon;
            return (
              <button
                key={t.title}
                role="tab"
                id={`${tabId}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${tabId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") { e.preventDefault(); setActiveIdx((i + 1) % aduTypes.length); }
                  if (e.key === "ArrowLeft") { e.preventDefault(); setActiveIdx((i - 1 + aduTypes.length) % aduTypes.length); }
                }}
                className={`flex items-center justify-center gap-2 min-h-[48px] px-3 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="lg:hidden">{t.shortTitle}</span>
                <span className="hidden lg:inline">{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={activeIdx}
          role="tabpanel"
          id={`${tabId}-panel`}
          aria-labelledby={`${tabId}-tab-${activeIdx}`}
          className="rounded-xl border border-border bg-background overflow-hidden animate-fade-in"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-3">
                {active.title}
              </h3>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                {active.description}
              </p>

              <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Good fit when…
              </p>
              <ul className="space-y-2.5">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ------------------------------------------------------------------ */
/*  Quiz Config                                                        */
/* ------------------------------------------------------------------ */
const fixDevelopQuizConfig: QuizConfig = {
  path: "fix_develop",
  headline: "What's going on with your property?",
  subheadline: "Answer a few quick questions and we'll map out your likely Fix & Develop path.",
  steps: [
    {
      question: "What best describes your situation?",
      options: [
        "Code violations or unpermitted work",
        "ADU or additional unit potential",
        "Distressed or outdated property",
        "Other repairs or upgrades",
      ],
    },
    {
      question: "What is your main priority?",
      options: [
        "Fix and keep the property",
        "Fix and sell for more",
        "Do the minimum to sell as-is",
        "Not sure yet — just need clarity",
      ],
    },
    {
      question: "Timeline to take action?",
      options: ["0–3 months", "3–12 months", "12+ months", "Not sure"],
    },
    {
      question: "Where is the property?",
      options: [
        "Inland Empire",
        "North County San Diego",
        "Elsewhere in Southern California",
        "Outside Southern California",
      ],
    },
  ],
  getResult: (answers: string[]) => {
    const situation = answers[0] ?? "";
    const bullets: string[] = [];

    if (situation.includes("Code")) {
      bullets.push("Legalize or correct unpermitted work and close out code issues");
    }
    if (situation.includes("ADU")) {
      bullets.push("Plan an ADU or strategic renovation that adds value");
    }
    if (situation.includes("Distressed")) {
      bullets.push("Evaluate repair scope vs. selling as-is to find the best ROI");
    }
    if (situation.includes("Other")) {
      bullets.push("Identify targeted repairs or upgrades that maximize property value");
    }

    const priority = answers[1] ?? "";
    if (priority.includes("keep")) {
      bullets.push("Develop a plan to improve and hold the property long-term");
    } else if (priority.includes("sell for more")) {
      bullets.push("Decide whether to keep as a rental or prepare for sale / 1031");
    } else if (priority.includes("as-is")) {
      bullets.push("Determine the fastest path to sell without over-investing in repairs");
    } else {
      bullets.push("Get a clear breakdown of all your options before committing");
    }

    if (bullets.length < 3) {
      bullets.push("Connect with our team to map out your specific Fix & Develop path");
    }

    return { title: "Your likely Fix & Develop path", bullets };
  },
  optionsSectionId: "why-build-adus",
  optionsLabel: "View your Fix & Develop options",
};

/* ------------------------------------------------------------------ */
/*  Fix & Develop Case Studies (filtered from master list)             */
/* ------------------------------------------------------------------ */
const fixDevStudyTitles = [
  "Illegal Garage Conversion — Code Violation Resolved",
  "Del Mar ADU — Equity to Passive Income",
  "Escondido ADU — Owner Builder Construction",
  "El Cajon Full Renovation — Complete Transformation",
];
const fixDevCaseStudies = fixDevStudyTitles
  .map((t) => caseStudies.find((s) => s.title === t)!)
  .filter(Boolean);

/* ------------------------------------------------------------------ */
/*  Fix & Develop Case Card (matches homepage design)                  */
/* ------------------------------------------------------------------ */
const FixDevCaseCard = ({ study, index, onClick }: { study: CaseStudy; index: number; onClick: () => void }) => {
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
/*  Fix & Develop Lightbox (matches homepage design)                   */
/* ------------------------------------------------------------------ */
const FixDevLightbox = ({
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

/* ------------------------------------------------------------------ */
/*  ADU Case Studies — Card                                            */
/* ------------------------------------------------------------------ */
const AduCaseCard = ({ study, index, onClick }: { study: CaseStudy; index: number; onClick: () => void }) => {
  const images = study.images && study.images.length > 1 ? study.images : [study.image];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => setActiveIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div onClick={onClick} className="group rounded-xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        {images.map((src, i) => (
          <img key={i} src={src} alt={study.imageAlt} draggable={false} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none" style={{ opacity: i === activeIdx ? 1 : 0 }} />
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIdx ? "bg-white" : "bg-white/40"}`} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 py-3.5 flex flex-col flex-1 gap-2">
        <div>
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60 block">Case Study {index + 1}</span>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground leading-tight mt-0.5">{study.title}</h3>
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
            <span key={badge} className="font-body text-[10px] font-medium tracking-wide text-primary bg-primary/8 rounded-full px-2 py-0.5">{badge}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  ADU Case Studies — Lightbox                                        */
/* ------------------------------------------------------------------ */
const AduLightbox = ({ studies, currentIndex, onClose, onNav }: { studies: CaseStudy[]; currentIndex: number; onClose: () => void; onNav: (i: number) => void }) => {
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
      <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close"><X className="w-5 h-5" /></button>
      {currentIndex > 0 && (
        <button onClick={() => onNav(currentIndex - 1)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous"><ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" /></button>
      )}
      {currentIndex < studies.length - 1 && (
        <button onClick={() => onNav(currentIndex + 1)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next"><ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" /></button>
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
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">{currentIndex + 1} / {studies.length}</div>
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

/* ------------------------------------------------------------------ */
/*  ADU Case Studies — Section                                         */
/* ------------------------------------------------------------------ */
const AduCaseStudiesSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(aduCaseStudies.length / perPage);
  const startIdx = page * perPage;
  const visible = aduCaseStudies.slice(startIdx, startIdx + perPage);

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-xl mb-8">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
            ADU Projects. Real Results.
          </h2>
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            See how we've helped homeowners plan, permit, and build ADUs across Southern California.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {totalPages > 1 && (
            <>
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="absolute -left-2 sm:-left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-md flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="absolute -right-2 sm:-right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-md flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {visible.map((study, i) => (
              <AduCaseCard
                key={startIdx + i}
                study={study}
                index={startIdx + i}
                onClick={() => setLightboxIndex(startIdx + i)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <span className="font-body text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <AduLightbox
          studies={aduCaseStudies}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(i) => setLightboxIndex(i)}
        />
      )}
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const FixDevelop = () => {
  const [guideSubmitted, setGuideSubmitted] = useState(false);
  const [violationGuideSubmitted, setViolationGuideSubmitted] = useState(false);
  const [propertyReviewSubmitted, setPropertyReviewSubmitted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [fixDevLightboxIdx, setFixDevLightboxIdx] = useState<number | null>(null);

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

  const guideForm = useForm<GuideValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", address: "" },
  });

  const violationGuideForm = useForm<ViolationGuideValues>({
    resolver: zodResolver(violationGuideSchema),
    defaultValues: { name: "", email: "", address: "", phone: "" },
  });

  const propertyReviewForm = useForm<PropertyReviewValues>({
    resolver: zodResolver(leadWithOptionalPhoneSchema),
    defaultValues: { name: "", email: "", address: "", phone: "" },
  });

  const onGuideSubmit = async (_data: GuideValues) => {
    try {
      await submitForm(_data, "ADU Feasibility Assessment");
      setGuideSubmitted(true);
      toast.success("Your ADU guide is on the way!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onPropertyReviewSubmit = async (data: PropertyReviewValues) => {
    try {
      await submitForm(data, "Code Violation Property Review");
      setPropertyReviewSubmitted(true);
      toast.success("Property review request submitted!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main>
      <Helmet>
        <title>Fix &amp; Develop — ADUs, Code Violations &amp; Permits | Unlock Your Property</title>
      </Helmet>

      {/* ============================================================ */}
      {/*  SECTION 1 — Hero                                            */}
      {/* ============================================================ */}
      <section
        id="top"
        className="relative overflow-hidden bg-[hsl(var(--hero-navy))] min-h-[100dvh] flex flex-col justify-center"
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/fix-develop-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-14 md:pt-24 md:pb-20">
          <div className="max-w-[620px]">
            <p className="animate-hero-fade-up font-body text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-accent-soft mb-3 md:mb-4">
              Fix &amp; Develop &nbsp;|&nbsp; Code Violations, ADUs, and Permits
            </p>

            <h1 className="animate-hero-fade-up-delay-1 font-display font-bold text-hero leading-[1.12] tracking-display text-white mb-4 md:mb-5">
              Fix Code Violations and Plan ADUs With Confidence
            </h1>

            <p className="animate-hero-fade-up-delay-2 font-body text-hero-sub leading-relaxed text-white/75 mb-3 max-w-[560px]">
              ADU planning, design, and permit strategy to help Southern California homeowners resolve violations, legalize improvements, and unlock new value from their property.
            </p>

            <div className="animate-hero-fade-up-delay-3 flex flex-col md:flex-row gap-3 md:gap-4">
              <Button variant="hero" size="hero" className="w-full md:w-auto" onClick={() => scrollToSection("adu-guide")}>
                Check My Property for ADU Potential
              </Button>
              <Button
                variant="heroOutline"
                size="hero"
                className="w-full md:w-auto border-white/30 text-white hover:border-white hover:text-white hover:bg-white/10 animate-gentle-bounce"
                onClick={() => scrollToSection("code-violations")}
              >
                Clear My Code Violation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  QUIZ — What's going on with your property?                   */}
      {/* ============================================================ */}
      {showQuiz && (
        <div id="property-quiz-container">
          <PropertyQuiz config={fixDevelopQuizConfig} />
        </div>
      )}

      {/* ============================================================ */}
      {/*  SECTION 2 — Why Homeowners Build ADUs                       */}
      {/* ============================================================ */}
      <section id="why-build-adus" className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="max-w-2xl lg:max-w-none lg:flex-1">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Why Homeowners Build ADUs
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-muted-foreground mb-8">
                Accessory Dwelling Units have become one of the most impactful ways Southern California homeowners can increase the value and utility of their property.
              </p>
              <ul className="space-y-3">
                {[
                  "Generate rental income from an existing property",
                  "Increase overall property value",
                  "Create housing for family members or aging parents",
                  "Support multi-generational living arrangements",
                  "Add flexible space — home office, studio, or guest suite",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video block */}
            <div className="mt-12 lg:mt-0 flex flex-col items-center lg:items-end lg:w-[45%] lg:flex-shrink-0">
              <div className="w-full max-w-[320px] sm:max-w-[360px] mx-auto lg:mx-0">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-border bg-card" style={{ aspectRatio: '9/16' }}>
                  <video
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    src="/media/why-build-adu.mp4#t=0"
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) video.play();
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="font-body text-xs sm:text-sm text-muted-foreground mt-3 text-center lg:text-left">
                  Short video: Why Southern California homeowners build ADUs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ADU Feasibility                                              */}
      {/* ============================================================ */}
      <section id="adu-feasibility" className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Can Your Property Support an ADU?
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                Several factors determine whether your property is eligible for an ADU — including zoning, lot size, setback requirements, existing structures, utility access, and parking. A feasibility review helps identify what's possible before you invest time or money.
              </p>
              <Button variant="hero" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection("adu-guide")}>
                Book My Appointment
              </Button>
            </div>
            <div className="lg:w-1/2">
              <img
                src={aduConstructionAerialImg}
                alt="Aerial view of ADU construction framing next to main house"
                className="w-full rounded-2xl object-cover aspect-[16/10] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRE-APPROVED ADU PLANS                                       */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Faster Path to Permits
              </p>
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                Pre-Approved ADU Plans
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                In some cases, cities offer pre-approved ADU plans that can reduce design time, lower costs, and speed up approvals.
              </p>
              <p className="font-body text-sm font-semibold text-foreground mb-4">We help determine:</p>
              <ul className="space-y-3 mb-8">
                {[
                  "If your property qualifies for pre-approved plans",
                  "Whether custom or pre-approved makes sense based on your goals",
                  "How to move through permits efficiently",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-body text-sm sm:text-base text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="hero" className="w-full sm:w-auto" onClick={() => scrollToSection("adu-guide")}>
                See If My Property Qualifies for a Pre-Approved ADU
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Participating Cities
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "San Diego County",
                    "City of San Diego",
                    "Encinitas",
                    "Chula Vista",
                    "Del Mar",
                    "Escondido",
                    "San Marcos",
                    "La Mesa",
                    "El Cajon",
                    "Carlsbad",
                    "Imperial Beach",
                    "& More",
                  ].map((city) => (
                    <div
                      key={city}
                      className="rounded-xl border border-border bg-card px-4 py-3 text-center hover:shadow-sm transition-shadow duration-200"
                    >
                      <p className="font-body text-sm font-medium text-foreground">{city}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body text-xs text-muted-foreground mt-4 leading-relaxed">
                  Pre-approved plans can reduce design time and lower costs by offering blueprints that are up to 85% complete and already meet city requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Types of ADUs                                                */}
      {/* ============================================================ */}
      <AduTypesSection />

      {/* ============================================================ */}
      {/*  SECTION 6 — ADU Development Path                            */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header — centered */}
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              From Planning to Move-In
            </p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
              The ADU Development Path
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
              We handle every stage of the ADU process so you can move forward with confidence.
            </p>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="flex flex-col gap-0 lg:hidden">
            {devSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    {i < devSteps.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                  </div>
                  <div className={i === devSteps.length - 1 ? "" : "pb-10"}>
                    <span className="font-body text-xs font-bold text-primary tracking-widest uppercase">Step {step.number}</span>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: card-based stepper */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-5">
            {devSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative group">
                  {/* Connecting line between cards */}
                  {i < devSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-2.5 w-5 h-[2px] bg-primary/20 z-0" />
                  )}
                  <div className="relative rounded-2xl border border-border bg-background p-6 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full flex flex-col items-center">
                    {/* Step badge */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xs font-bold shadow-md">
                      {step.number}
                    </span>
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mt-3 mb-4 transition-transform duration-200 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-foreground leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ADU Financing                                                */}
      {/* ============================================================ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Education, Not Lenders
              </p>
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
                ADU Financing
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
                Many homeowners use financing to help make their ADU project possible, with common options including a <strong className="text-foreground">HELOC</strong>, <strong className="text-foreground">cash-out refinance</strong>, <strong className="text-foreground">construction loan</strong>, or <strong className="text-foreground">personal savings</strong>. The right path depends on your available equity, financial goals, and lender qualifications.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "HELOC", desc: "Borrow against your existing home equity", icon: Home },
                  { label: "Cash-Out Refi", desc: "Replace your mortgage and pull out equity", icon: DollarSign },
                  { label: "Construction Loan", desc: "Short-term financing for the build", icon: Hammer },
                  { label: "Personal Savings", desc: "Fund the project without debt", icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow duration-200">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <p className="font-body text-sm font-semibold text-foreground leading-tight mb-1">{item.label}</p>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="rounded-2xl border border-border bg-card p-7 sm:p-9 shadow-sm">
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-6">
                  Free financing guidance
                </p>
                <div className="flex items-center gap-5 rounded-xl border border-border bg-background p-5 mb-6">
                  <img
                    src={raulGarciaImg}
                    alt="Raul Garcia, partnered lender"
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-border shadow-md"
                  />
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">Raul Garcia</p>
                    <p className="font-body text-sm text-muted-foreground">Partnered Lender &middot; NMLS #1205424</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Budget clarity before building", "Financing options matched to your situation", "Stronger position with contractors"].map((item) => (
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
      {/*  ADU Case Studies Carousel                                    */}
      {/* ============================================================ */}
      <AduCaseStudiesSection />

      {/* ============================================================ */}
      {/*  SECTION 7 — Free ADU Development Guide                      */}
      {/* ============================================================ */}
      <section id="adu-guide" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0">
              <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-white mb-5">
                Book a 1-on-1 ADU Feasibility Assessment
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-white/75">
                Meet with our team to evaluate your property, review zoning and site constraints, and determine whether an ADU is possible for your Southern California lot. Get clear next steps, expected costs, and a realistic path forward before you invest time or money.
              </p>
            </div>

            <div className="flex-1 w-full max-w-lg">
              {guideSubmitted ? (
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center">
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">
                    Check Your Inbox
                  </h3>
                  <p className="font-body text-white/75">
                    We've sent the ADU Development Guide to your email.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8">
                  <Form {...guideForm}>
                    <form onSubmit={guideForm.handleSubmit(onGuideSubmit)} className="space-y-5">
                      <FormField
                        control={guideForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-white">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={guideForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-white">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={guideForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-body text-white">Property Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" variant="hero" size="hero" className="w-full">
                        Book a 1-on-1
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
      {/*  CODE VIOLATION FUNNEL                                        */}
      {/* ============================================================ */}

      {/* CV-1 — Hero with form */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/fix-develop-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-center">
            {/* Left — copy */}
            <div id="code-violations" className="max-w-lg mb-10 lg:mb-0 lg:flex-1">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <p className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-accent">
                  Received a Code Violation Notice?
                </p>
              </div>

              <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.12] tracking-display text-white mb-5">
                Don't Let City Fines Turn Into Property Liens, Deal Delays, or Forced Repairs.
              </h2>
              <p className="font-body text-base sm:text-lg leading-relaxed text-white/70 mb-8 lg:mb-0">
                If you received a Notice of Violation, Code Enforcement Letter, Red Tag, or Stop Work Order, you still have options. Many homeowners feel overwhelmed, but most violations can be resolved, permitted, or strategically addressed with the right plan. Unlock Your Property helps homeowners understand what the city may require and what path makes the most sense before the situation gets more expensive.
              </p>
            </div>

            {/* Video walkthrough */}
            <div className="mt-6 lg:mt-0 flex flex-col items-center lg:items-end lg:w-[45%] lg:flex-shrink-0">
              <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto lg:mx-0">
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black" style={{ aspectRatio: '9/16' }}>
                  <video className="w-full h-full object-cover" controls preload="metadata" playsInline src="/media/code-violation-walkthrough.mp4#t=1">
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="font-body text-xs text-white/50 mt-3 text-center lg:text-left">
                  Short walkthrough: Javier explains a real code violation situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV-2 — What Happens If You Ignore It */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="animate-warning-pulse inline-flex items-center gap-3 mb-4 rounded-full bg-destructive/10 pl-2 pr-5 py-2">
              <div className="w-10 h-10 rounded-full bg-destructive/15 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-destructive">Warning</p>
            </div>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              What Happens If You Ignore It
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Code violations rarely get easier by waiting. Depending on the city and the issue, unresolved violations can lead to:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Daily fines that accumulate quickly",
                "Recorded liens against the property",
                "Escrow delays during a sale",
                "Loan denial or refinance problems",
                "Forced corrections by the city",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-destructive shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              The sooner you evaluate the situation, the more options you usually have.
            </p>
          </div>
        </div>
      </section>

      {/* CV-3 — Common Residential Code Violations */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">You're Not Alone</p>
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Common Residential Code Violations
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground">
              Most violations come from improvements made without permits or inspections — often years ago, sometimes by a previous owner. These are some of the situations we see most often.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-14">
            {([
              { img: cvGarageImg, title: "Garage Conversions", desc: "Living space, bedrooms, or rental units built inside an existing garage without permits." },
              { img: cvAduImg, title: "Unpermitted ADUs", desc: "Backyard units or guest houses constructed without city approval or proper inspections." },
              { img: cvRoomImg, title: "Room Additions", desc: "Extra bedrooms, bathrooms, or extended living areas added without building permits." },
              { img: cvPermitsImg, title: "Electrical & Plumbing Work", desc: "Upgrades or new installations completed without required inspections or sign-offs." },
              { img: cvZoningImg, title: "Setback & Zoning Issues", desc: "Structures built too close to property lines or in areas not zoned for the intended use." },
              { img: cvUnitImg, title: "Illegal Unit Conversions", desc: "Spaces converted into separate rental units without meeting code or safety requirements." },
            ] as const).map((item) => (
              <div key={item.title} className="group rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center rounded-xl border border-primary/10 bg-primary/[0.03] p-6 sm:p-8">
            <p className="font-body text-base sm:text-lg leading-relaxed text-foreground">
              Many homeowners never intended to create a problem. They just didn't realize permits were required — or they bought a property with existing issues. <span className="font-medium text-primary">The good news is that many of these situations can still be resolved.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CV-4 — Can Your Property Be Brought Into Compliance? + Property Review Form */}
      <section id="cv-property-review" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
            <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0 lg:sticky lg:top-28">
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold leading-[1.15] tracking-display text-white mb-5">
                Can Your Property Be Brought Into Compliance?
              </h2>
              <p className="font-body text-hero-sub leading-relaxed text-white/75">
                Every property situation is different. Before deciding whether to fix a violation or sell the property, several factors should be reviewed. Looking at these factors helps determine the most practical path forward.
              </p>
            </div>

            {/* Property Review form */}
            <div className="flex-1 w-full max-w-lg">
              {propertyReviewSubmitted ? (
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center">
                  <h3 className="font-display text-2xl font-semibold text-white mb-3">We'll Be in Touch</h3>
                  <p className="font-body text-white/75">We're reviewing your property details and will reach out with possible next steps.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-8">
                  <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Property Review</p>
                  <p className="font-body text-sm text-white/60 mb-6">
                    If you are unsure how serious the violation may be, send us the property details and we will help identify possible next steps.
                  </p>
                  <Form {...propertyReviewForm}>
                    <form
                      onSubmit={propertyReviewForm.handleSubmit(onPropertyReviewSubmit)}
                      className="space-y-4"
                    >
                      <FormField control={propertyReviewForm.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Name</FormLabel>
                          <FormControl><Input placeholder="Your full name" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={propertyReviewForm.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Email</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={propertyReviewForm.control} name="address" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Property Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St, City, CA" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={propertyReviewForm.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body text-white">Phone <span className="text-white/50 font-normal">(optional)</span></FormLabel>
                          <FormControl><Input type="tel" placeholder="(555) 123-4567" className="min-h-[48px] bg-white/90 text-foreground border-white/30" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" variant="hero" size="hero" className="w-full">
                        Review My Property
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CV-5 — Two Paths Forward */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 lg:mb-14 text-center">
            Two Paths Forward
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 — Fix */}
            <div className="rounded-xl border border-border bg-card p-8 sm:p-10 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Fix the Violation and Protect the Property
              </h3>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                If your goal is to keep the property, refinance, rent it, or sell later for the best possible value, we help manage the compliance process. Our services can include:
              </p>
              <ul className="space-y-2.5 mt-auto">
                {[
                  "Review of the violation notice",
                  "Permit history research",
                  "Compliance strategy development",
                  "Permit-ready drawings prepared by building designers",
                  "Coordination with city inspectors",
                  "Plan-check responses through approval",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-muted-foreground mt-4">
                Licensed engineers provide required stamps when needed.
              </p>
            </div>

            {/* Card 2 — Sell */}
            <div className="rounded-xl border border-border bg-card p-8 sm:p-10 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">
                Sell the Property As-Is
              </h3>
              <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                Sometimes fixing the issue does not make financial sense. In those cases, we help owners explore the as-is sale option. We help evaluate:
              </p>
              <ul className="space-y-2.5 mt-auto">
                {[
                  "Realistic property value",
                  "Buyer demand for properties with violations",
                  "Disclosure requirements",
                  "Possible selling strategies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-muted-foreground mt-4">
                If licensed representation is required, brokerage services are handled separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CV-6 — Why Homeowners Call UYP */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-5">
              Why Homeowners Call UYP
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-muted-foreground mb-8">
              Most people reach out when they feel stuck, pressured, or unsure what to do next. We bring clarity before you spend money in the wrong direction. You get:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Permit and compliance guidance",
                "Real estate strategy informed by market experience",
                "Honest advice when repairs do not make financial sense",
                "Coordination with cities, designers, and inspectors when needed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              The goal is to help you understand your options before the problem gets worse.
            </p>
          </div>
        </div>
      </section>

      {/* (Share buttons removed) */}

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
              Here's how owners in similar situations moved forward with a clear plan.
            </p>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {fixDevCaseStudies.map((study, i) => (
              <FixDevCaseCard
                key={study.title}
                study={study}
                index={i}
                onClick={() => setFixDevLightboxIdx(i)}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-16 text-center">
          <h3 className="font-display text-[clamp(20px,3vw,30px)] font-bold text-foreground mb-5">
            Need a clear plan for your property?
          </h3>
          <Button
            variant="default"
            size="hero"
            onClick={() => scrollToSection("cv-property-review")}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Talk Through Your Situation
          </Button>
        </div>

        {fixDevLightboxIdx !== null && (
          <FixDevLightbox
            studies={fixDevCaseStudies}
            currentIndex={fixDevLightboxIdx}
            onClose={() => setFixDevLightboxIdx(null)}
            onNav={(i) => setFixDevLightboxIdx(i)}
          />
        )}
      </section>

      {/* CV-7 — FAQ */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-10 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Can you sell a house with code violations?", a: "Yes. In many cases you can still sell a property with code violations. However, the buyer pool may be smaller, and some lenders may not approve financing depending on the issue." },
                { q: "Will code violations become liens?", a: "In many cities, unpaid fines can eventually become recorded liens against the property." },
                { q: "Can unpermitted work be legalized?", a: "Often yes. The process usually involves permits, inspections, and sometimes corrections to the work before approval." },
                { q: "How long does it take to fix a code violation?", a: "It depends on the scope of the issue and the city's plan-check timeline. Some situations move quickly. Others take longer if corrections or redesign are required." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 overflow-hidden">
                  <AccordionTrigger className="font-display text-base sm:text-lg font-semibold text-foreground py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CV-8 — Strategy Call CTA */}
      <section id="cv-strategy-call" className="py-24 lg:py-32 relative" style={{ background: "var(--hero-gradient)" }}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.12] tracking-display text-white mb-5">
              Start With a Code Violation Strategy Call
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed text-white/75 mb-10">
              Understand what the city may require, what it could cost to fix, and whether fixing or selling makes more sense — before you make an expensive mistake.
            </p>
            <Button
              variant="hero"
              size="hero"
              onClick={() => scrollToSection("cv-property-review")}
            >
              Schedule a Strategy Call
            </Button>
            <p className="font-body text-sm text-white/50 mt-5">
              Get clarity on the next step before fines, delays, or bad decisions cost you more time and money.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FixDevelop;
