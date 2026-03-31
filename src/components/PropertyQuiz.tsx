import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface QuizStep {
  question: string;
  options: string[];
}

export interface QuizResult {
  title: string;
  bullets: string[];
}

export interface QuizConfig {
  /** "fix_develop" | "real_estate_moves" */
  path: string;
  headline: string;
  subheadline: string;
  steps: QuizStep[];
  /** Function to produce result bullets from user answers */
  getResult: (answers: string[]) => QuizResult;
  /** id of the section the "View options" secondary link scrolls to */
  optionsSectionId: string;
  optionsLabel: string;
}

/* ------------------------------------------------------------------ */
/*  UTM helpers                                                        */
/* ------------------------------------------------------------------ */
function getUtmParam(key: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PropertyQuiz({ config }: { config: QuizConfig }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  // Detect shared-link pre-selection via UTM
  const [sharedBanner, setSharedBanner] = useState<string | null>(null);

  useEffect(() => {
    const intent = getUtmParam("utm_content");
    if (!intent) return;

    // Map known utm_content values to step-0 option indices
    const intentMap: Record<string, string> = {
      code_violation: config.steps[0]?.options[0] ?? "",
      adu_potential: config.steps[0]?.options[1] ?? "",
      distressed: config.steps[0]?.options[2] ?? "",
      inherited: config.steps[0]?.options[3] ?? "",
      problem_rental: config.steps[0]?.options[0] ?? "",
      sell: config.steps[0]?.options[1] ?? "",
      "1031": config.steps[0]?.options[2] ?? "",
      probate: config.steps[0]?.options[3] ?? "",
    };

    const preselect = intentMap[intent];
    if (preselect) {
      setSharedBanner(preselect);
    }
  }, [config.steps]);

  const select = useCallback(
    (option: string) => {
      const next = [...answers];
      next[current] = option;
      setAnswers(next);

      if (current < config.steps.length - 1) {
        setCurrent((c) => c + 1);
        quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setDone(true);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    },
    [current, answers, config.steps.length]
  );

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setDone(false);
    setSharedBanner(null);
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const result = done ? config.getResult(answers) : null;
  const totalSteps = config.steps.length;
  const progress = done ? 100 : ((current) / totalSteps) * 100;

  return (
    <section
      ref={quizRef}
      id="property-quiz"
      className="scroll-mt-20 py-20 lg:py-28 bg-[hsl(215,28%,10%)]"
    >
      <div className="w-full max-w-3xl mx-auto px-5 sm:px-8">
        {/* Shared-link banner */}
        {sharedBanner && !done && (
          <div className="mb-6 rounded-xl bg-primary/10 border border-primary/20 px-5 py-3 text-center">
            <p className="font-body text-sm text-primary">
              You're here from a shared link — we've pre-selected{" "}
              <strong className="font-semibold">"{sharedBanner}"</strong> for you.
            </p>
          </div>
        )}

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="font-display text-[clamp(24px,4vw,40px)] font-bold leading-[1.15] tracking-tight text-white mb-3">
            {config.headline}
          </h2>
          <p className="font-body text-base sm:text-lg text-white/60 max-w-xl mx-auto">
            {config.subheadline}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-white/40">
              {done ? "Complete" : `Step ${current + 1} of ${totalSteps}`}
            </span>
            {current > 0 && !done && (
              <button
                onClick={() => setCurrent((c) => c - 1)}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz steps */}
        {!done && (
          <div className="animate-fade-in">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-5">
              {config.steps[current].question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.steps[current].options.map((opt) => {
                const isPreselected = current === 0 && sharedBanner === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => select(opt)}
                    className={`group relative text-left rounded-xl border px-5 py-4 transition-all duration-200 min-h-[56px] flex items-center gap-3 
                      ${
                        isPreselected
                          ? "border-primary bg-primary/15 text-white ring-1 ring-primary/40"
                          : "border-white/10 bg-white/[0.04] text-white/80 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                      }`}
                  >
                    <span className="w-5 h-5 rounded-full border-2 border-current shrink-0 flex items-center justify-center group-hover:border-primary transition-colors">
                      {isPreselected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="font-body text-sm sm:text-base font-medium leading-snug">
                      {opt}
                    </span>
                    {isPreselected && (
                      <span className="absolute -top-2 right-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Pre-selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Result */}
        {done && result && (
          <div
            ref={resultRef}
            className="animate-fade-in rounded-2xl border border-primary/20 bg-white/[0.04] backdrop-blur-sm p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                {result.title}
              </h3>
            </div>
            <ul className="space-y-3 mb-8">
              {result.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-sm sm:text-base text-white/80 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="hero"
                size="hero"
                onClick={() => scrollToSection("strategy-call")}
              >
                Schedule Strategy Call
              </Button>
              <Button
                variant="heroOutline"
                size="hero"
                className="border-white/30 text-white hover:border-white hover:bg-white/10"
                onClick={() => scrollToSection(config.optionsSectionId)}
              >
                {config.optionsLabel}
              </Button>
            </div>
            <button
              onClick={restart}
              className="mt-5 flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Retake quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
