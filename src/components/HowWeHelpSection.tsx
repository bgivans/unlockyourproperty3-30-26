import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { ANCHOR_STRATEGY_CALL } from "@/constants";
import { generalCaseStudies, type CaseStudy } from "@/data/caseStudies";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ── Card (used in carousel, clickable to open lightbox) ──────────────────────

const CaseCard = ({ study, index, onClick }: { study: CaseStudy; index: number; onClick: () => void }) => {
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
    <div
      onClick={onClick}
      className="group rounded-xl border border-border bg-background overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      {/* Crossfade image */}
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

      {/* Content */}
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
              {study.address && (
                <span className="font-body text-[11px] text-muted-foreground">{study.address}</span>
              )}
              {study.price && (
                <span className="font-body text-[11px] font-semibold text-primary">{study.price}</span>
              )}
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

// ── Lightbox ─────────────────────────────────────────────────────────────────

const Lightbox = ({
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

  useEffect(() => {
    setActiveImgIdx(0);
  }, [currentIndex]);

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

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {currentIndex > 0 && (
        <button
          onClick={() => onNav(currentIndex - 1)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous case study"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
      {currentIndex < studies.length - 1 && (
        <button
          onClick={() => onNav(currentIndex + 1)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next case study"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      <div className="relative z-40 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl mx-4">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={study.imageAlt}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === activeImgIdx ? 1 : 0 }}
            />
          ))}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === activeImgIdx ? "bg-white" : "bg-white/40"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {studies.length}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-primary/60 block">
            Case Study {currentIndex + 1}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight mt-1 mb-1">
            {study.title}
          </h3>
          {(study.address || study.price) && (
            <div className="flex flex-wrap gap-x-3 mb-4">
              {study.address && (
                <span className="font-body text-sm text-muted-foreground">{study.address}</span>
              )}
              {study.price && (
                <span className="font-body text-sm font-semibold text-primary">{study.price}</span>
              )}
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
              <span
                key={badge}
                className="font-body text-xs font-medium tracking-wide text-primary bg-primary/8 rounded-full px-3 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Section with Carousel ───────────────────────────────────────────────

const CARDS_PER_PAGE = 3;

const HowWeHelpSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(generalCaseStudies.length / CARDS_PER_PAGE);
  const startIdx = page * CARDS_PER_PAGE;
  const visibleStudies = generalCaseStudies.slice(startIdx, startIdx + CARDS_PER_PAGE);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(0, p - 1));
  }, []);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(totalPages - 1, p + 1));
  }, [totalPages]);

  const openLightbox = useCallback((globalIndex: number) => {
    setLightboxIndex(globalIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <section id="how-we-help" className="bg-card">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-8">
        <div className="max-w-xl">
          <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-foreground mb-4">
            Real Properties. Real Outcomes.
          </h2>
          <p className="font-body text-hero-sub leading-relaxed text-muted-foreground">
            See how different property situations were evaluated and turned into clear, profitable solutions.
          </p>
        </div>
      </div>

      {/* Cards with side arrows */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-12">
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="absolute -left-2 sm:-left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-md flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous case studies"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className="absolute -right-2 sm:-right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-background shadow-md flex items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next case studies"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {visibleStudies.map((study, i) => (
              <CaseCard
                key={startIdx + i}
                study={study}
                index={startIdx + i}
                onClick={() => openLightbox(startIdx + i)}
              />
            ))}
          </div>

          {/* Page indicator */}
          <div className="flex justify-center mt-6">
            <span className="font-body text-sm text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          studies={generalCaseStudies}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
    </section>
  );
};

export default HowWeHelpSection;
