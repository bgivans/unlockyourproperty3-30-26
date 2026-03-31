import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { ANCHOR_STRATEGY_CALL } from "@/constants";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Case Card ─────────────────────────────────────────────────────────────────

const CaseCard = ({ study, index, observe }: { study: CaseStudy; index: number; observe?: boolean }) => {
  const images = study.images && study.images.length > 1 ? study.images : [study.image];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`group rounded-xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col ${observe ? 'case-card-observe' : ''}`} style={observe ? { animationDelay: `${index * 60}ms` } : undefined}>
      {/* Crossfade image — compact 2:1 aspect */}
      <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted">
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

      {/* Content — compact spacing */}
      <div className="px-3.5 py-3 flex flex-col flex-1 gap-1.5">
        {/* Title row */}
        <div>
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60 block">
            Case Study {index + 1}
          </span>
          <h3 className="font-display text-sm font-bold text-foreground leading-tight mt-0.5">
            {study.title}
          </h3>
          {(study.address || study.price) && (
            <div className="flex flex-wrap gap-x-2 mt-0.5">
              {study.address && (
                <span className="font-body text-[11px] text-muted-foreground">{study.address}</span>
              )}
              {study.price && (
                <span className="font-body text-[11px] font-semibold text-primary">{study.price}</span>
              )}
            </div>
          )}
        </div>

        {/* Problem / What We Did / Outcome — compact */}
        <div className="space-y-1.5 flex-1 text-[12px] leading-snug">
          <div>
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-accent block">
              Problem
            </span>
            <p className="font-body text-muted-foreground line-clamp-2">{study.problem}</p>
          </div>
          <div>
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-primary block">
              What We Did
            </span>
            <p className="font-body text-muted-foreground line-clamp-2">{study.whatWeDid}</p>
          </div>
          <div className="bg-primary/5 border-l-2 border-primary rounded-r px-2 py-1.5">
            <span className="font-body text-[10px] font-semibold tracking-[0.12em] uppercase text-primary block">
              Outcome
            </span>
            <p className="font-body font-medium text-foreground line-clamp-2">{study.outcome}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="case-card-tags flex flex-wrap gap-1 pt-1.5 border-t border-border">
          {study.badges.map((badge) => (
            <span
              key={badge}
              className="font-body text-[10px] font-medium tracking-wide text-primary bg-primary/8 rounded-full px-2 py-0.5"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

/** Number of case-study cards to scroll through before the section unpins */
const VISIBLE_CARDS = 5;

const HowWeHelpSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // IntersectionObserver for card scroll-in
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.case-card-observe');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    cards.forEach((card, i) => {
      if (i < 8) {
        observer.observe(card);
      } else {
        card.classList.add('is-visible');
      }
    });

    return () => observer.disconnect();
  }, []);

  // Measure the actual pixel distance to scroll through VISIBLE_CARDS cards
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      if (cards.length === 0) return;

      const lastVisibleIndex = Math.min(VISIBLE_CARDS, cards.length - 1);
      const targetCard = cards[lastVisibleIndex];
      const distance = targetCard.offsetLeft - cards[0].offsetLeft;
      setMaxTranslate(distance);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // framer-motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section id="how-we-help" className="bg-card">
      {/* Normal-flow header */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-6">
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
            Real Situations. Clear Plans.
          </h2>
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            Here's how we help property owners move from stuck situations to clear, profitable next steps.
            <span className="hidden md:inline text-muted-foreground/60"> Scroll down to explore.</span>
          </p>
        </div>
      </div>

      {/* Scroll-driven area */}
      <div ref={sectionRef} style={{ height: `${VISIBLE_CARDS * 100}vh` }} className="relative">
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden py-4">
          {/* Horizontal scroll track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-4 lg:gap-5 px-5 sm:px-8 lg:px-12 will-change-transform items-stretch"
          >
            {caseStudies.map((study, i) => (
              <div
                key={i}
                data-card
                className={[
                  "shrink-0",
                  "w-[280px]",
                  "sm:w-[300px]",
                  "lg:w-[320px]",
                  "xl:w-[340px]",
                ].join(" ")}
              >
                <CaseCard study={study} index={i} observe />
              </div>
            ))}
            <div className="shrink-0 w-1 lg:w-5" aria-hidden />
          </motion.div>

          {/* Progress bar */}
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-4">
            <div className="h-[3px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary/60 rounded-full origin-left"
                style={{ scaleX: progressScale }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-body text-[11px] text-muted-foreground/50">
                {caseStudies.length} case studies
              </span>
              <span className="font-body text-[11px] text-muted-foreground/50">
                Keep scrolling to explore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA — normal flow, appears after scroll section unpins */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 lg:py-16 text-center">
        <h3 className="font-display text-[clamp(20px,3vw,30px)] font-bold text-foreground mb-5">
          Need a clear plan for your property?
        </h3>
        <Button
          variant="default"
          size="hero"
          onClick={() => scrollToSection(ANCHOR_STRATEGY_CALL)}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Talk Through Your Situation
        </Button>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
