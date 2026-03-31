import { useState, useCallback } from "react";
import { MessageSquare, Mail, Link2, Check, Share2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface ShareConfig {
  /** "fix_develop" | "real_estate_moves" */
  path: string;
  /** Full page URL without params */
  pageUrl: string;
  /** Additional utm_content hint, e.g. "code_violation" */
  utmContent?: string;
  /** Override the prewritten copy */
  overrideCopy?: { sms?: string; whatsapp?: string; email?: { subject: string; body: string } };
}

/* ------------------------------------------------------------------ */
/*  Pre-written copy                                                   */
/* ------------------------------------------------------------------ */
const defaultCopy: Record<
  string,
  { sms: string; whatsapp: string; email: { subject: string; body: string } }
> = {
  fix_develop: {
    sms: "This looks exactly like your situation with the property. They break down options for fixing, legalizing, or developing it in a clear way:",
    whatsapp: "This looks exactly like your situation with the property. They break down options for fixing, legalizing, or developing it in a clear way:",
    email: {
      subject: "Resource for fixing or developing your property",
      body: "I thought of you — this lays out options for dealing with code violations, ADUs, or property repairs in a clear way.\n\nCheck it out:",
    },
  },
  real_estate_moves: {
    sms: "Thought of you — this explains options for selling, 1031, or dealing with inherited/rental properties really clearly:",
    whatsapp: "Thought of you — this explains options for selling, 1031, or dealing with inherited/rental properties really clearly:",
    email: {
      subject: "Options for your property — selling, 1031, inherited",
      body: "I came across this page that walks through different real estate move options. It felt really relevant to what you're dealing with.\n\nTake a look:",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function buildShareUrl(config: ShareConfig, medium: string): string {
  const base = config.pageUrl || window.location.origin + window.location.pathname;
  const params = new URLSearchParams({
    quiz: "true",
    utm_source: medium,
    utm_medium: "share",
    utm_campaign: `${config.path}_share`,
    ...(config.utmContent ? { utm_content: config.utmContent } : {}),
  });
  return `${base}?${params.toString()}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ShareButtons({ config }: { config: ShareConfig }) {
  const [copied, setCopied] = useState(false);
  const copy = defaultCopy[config.path] ?? defaultCopy.fix_develop;

  const smsText = config.overrideCopy?.sms ?? copy.sms;
  const whatsappText = config.overrideCopy?.whatsapp ?? copy.whatsapp;
  const emailData = config.overrideCopy?.email ?? copy.email;

  const shareUrl = useCallback(
    (medium: string) => buildShareUrl(config, medium),
    [config]
  );

  const handleCopy = async () => {
    const url = shareUrl("copy_link");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const channels = [
    {
      label: "Text this",
      icon: MessageSquare,
      href: `sms:?body=${encodeURIComponent(smsText + " " + shareUrl("sms"))}`,
    },
    {
      label: "Send on WhatsApp",
      icon: Share2,
      href: `https://wa.me/?text=${encodeURIComponent(whatsappText + " " + shareUrl("whatsapp"))}`,
    },
    {
      label: "Email this",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(
        emailData.body + "\n\n" + shareUrl("email")
      )}`,
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[hsl(215,28%,10%)]">
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Know someone dealing with this?
        </h3>
        <p className="font-body text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
          Share this page with a friend, family member, or client who's stuck with a similar property situation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.label}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
                {ch.label}
              </a>
            );
          })}

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              copied
                ? "border-green-500/40 bg-green-500/15 text-green-400"
                : "border-white/15 bg-white/[0.06] text-white/80 hover:border-primary/50 hover:bg-primary/15 hover:text-white"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}
