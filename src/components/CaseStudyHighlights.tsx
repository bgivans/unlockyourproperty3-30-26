import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { ArrowRight, MessageSquare, Mail, Link2, Check, Share2, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface CaseStudy {
  title: string;
  summary: string;
  tags: string[];
  /** Optional image path */
  image?: string;
}

export interface CaseStudyConfig {
  /** "fix_develop" | "real_estate_moves" */
  path: string;
  intro: string;
  studies: CaseStudy[];
  quizSectionId: string;
  strategySectionId: string;
}

/* ------------------------------------------------------------------ */
/*  Share Popup (per-tile)                                             */
/* ------------------------------------------------------------------ */
function TileShareMenu({
  study,
  path,
  onClose,
}: {
  study: CaseStudy;
  path: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin + window.location.pathname;
  const makeUrl = (medium: string) => {
    const params = new URLSearchParams({
      quiz: "true",
      utm_source: medium,
      utm_medium: "share",
      utm_campaign: `${path}_case_study`,
      utm_content: study.title.toLowerCase().replace(/\s+/g, "_").slice(0, 40),
    });
    return `${baseUrl}?${params.toString()}#case-studies`;
  };

  const shareText = `Check this out — "${study.title}" — ${study.summary}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(makeUrl("copy_link"));
    } catch {
      const ta = document.createElement("textarea");
      ta.value = makeUrl("copy_link");
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="absolute inset-0 z-20 rounded-2xl bg-[hsl(215,28%,12%)]/95 backdrop-blur-sm flex flex-col items-center justify-center p-5 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="font-body text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
        Share this story
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={`sms:?body=${encodeURIComponent(shareText + " " + makeUrl("sms"))}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" /> Text
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + makeUrl("whatsapp"))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white transition-all"
        >
          <Share2 className="w-3.5 h-3.5" /> WhatsApp
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(study.title)}&body=${encodeURIComponent(shareText + "\n\n" + makeUrl("email"))}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white transition-all"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
            copied
              ? "border-green-500/40 bg-green-500/15 text-green-400"
              : "border-white/15 bg-white/[0.06] text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white"
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-in hook (IntersectionObserver)                              */
/* ------------------------------------------------------------------ */
function useScrollIn(maxCards = 8) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".case-card-observe");
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    // Only observe the first N cards
    cards.forEach((card, i) => {
      if (i < maxCards) {
        // Stagger delay
        (card as HTMLElement).style.animationDelay = `${i * 60}ms`;
        observer.observe(card);
      } else {
        // For remaining cards, just make them visible without animation
        card.classList.add("is-visible");
        card.style.animationDelay = "0ms";
      }
    });

    return () => observer.disconnect();
  }, [maxCards]);

  return containerRef;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function CaseStudyHighlights({ config }: { config: CaseStudyConfig }) {
  const [shareIdx, setShareIdx] = useState<number | null>(null);
  const gridRef = useScrollIn(8);

  const toggleShare = useCallback((i: number) => {
    setShareIdx((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section id="case-studies" className="scroll-mt-20 py-20 lg:py-28 bg-[hsl(215,28%,8%)]">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Intro */}
        <div className="max-w-2xl mb-12">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Property Strategy Wins
          </p>
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-white mb-4">
            Real Situations. Real Outcomes.
          </h2>
          <p className="font-body text-base sm:text-lg text-white/55 leading-relaxed">
            {config.intro}
          </p>
        </div>

        {/* Tiles grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12">
          {config.studies.map((study, i) => (
            <div
              key={study.title}
              className="case-card-observe group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06]"
            >
              {/* Share overlay */}
              {shareIdx === i && (
                <TileShareMenu
                  study={study}
                  path={config.path}
                  onClose={() => setShareIdx(null)}
                />
              )}

              <div className="p-5 sm:p-6 flex flex-col min-h-[240px]">
                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-semibold text-white mb-2.5 leading-snug">
                  {study.title}
                </h3>

                {/* Summary */}
                <p className="font-body text-sm text-white/55 leading-relaxed mb-4 flex-1">
                  {study.summary}
                </p>

                {/* Tags — revealed on hover */}
                <div className="case-card-tags flex flex-wrap gap-1.5 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share this story button */}
                <button
                  onClick={() => toggleShare(i)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-primary transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share this story
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Button
            variant="hero"
            size="hero"
            onClick={() => scrollToSection(config.strategySectionId)}
          >
            <span className="flex items-center gap-2">
              Talk through your own situation
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
