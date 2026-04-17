import { useState, useEffect } from "react";
import { submitForm } from "@/lib/submitForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { strategyCallSchema, type StrategyCallValues } from "@/schemas/forms";
import { strategySituations } from "@/data/situations";
import { ClipboardCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  URL → Situation mapping                                            */
/* ------------------------------------------------------------------ */
const PARAM_MAP: Record<string, string> = {
  code: "code-violations",
  inherited: "inherited-probate",
  adu: "adu-development",
  selling: "selling-buying",
};

function getSituationFromUrl(): string {
  const param = new URLSearchParams(window.location.search).get("situation");
  if (!param) return "";
  return PARAM_MAP[param] ?? "";
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */
interface StrategyCallFormProps {
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  context?: string;
}

const StrategyCallForm = ({
  heading = "Not Sure What Your Best Option Is?",
  subheading = "Schedule a strategy consultation to understand your property's potential and explore the best path forward.",
  buttonLabel = "Schedule Strategy Call",
  context = "homepage",
}: StrategyCallFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const prefilledSituation = getSituationFromUrl();

  const form = useForm<StrategyCallValues>({
    resolver: zodResolver(strategyCallSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      situation: prefilledSituation,
      description: "",
    },
  });

  // Also listen for hash changes if user clicks a situation card (custom event)
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      form.setValue("situation", e.detail);
    };
    window.addEventListener("situation-selected" as any, handler as any);
    return () =>
      window.removeEventListener("situation-selected" as any, handler as any);
  }, [form]);

  const onSubmit = async (data: StrategyCallValues) => {
    setSubmitting(true);
    try {
      await submitForm({ ...data, _context: context }, "Strategy Call");
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="strategy-call" className="relative py-24 lg:py-32" style={{ background: "var(--hero-gradient)" }}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">
          {/* Left copy */}
          <div className="max-w-md mb-10 lg:mb-0 lg:flex-shrink-0 lg:sticky lg:top-28">
            <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-[1.15] tracking-display text-white mb-5">
              {heading}
            </h2>
            <p className="font-body text-hero-sub leading-relaxed text-white/75 mb-8">
              {subheading}
            </p>

            {/* "What happens next" box */}
            <div className="next-steps-card">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-display text-sm font-semibold text-white mb-1.5">
                    What happens next
                  </p>
                  <p className="font-body text-xs text-white/60 leading-relaxed">
                    We'll review your details, reach out within 1 business day,
                    and outline 2–3 options on a 30–45 minute call.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 w-full max-w-lg">
            {submitted ? (
              <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center btn-success-pop">
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
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            className="min-h-[48px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="min-h-[48px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            className="min-h-[48px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Property Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main St, City, CA"
                            className="min-h-[48px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="situation" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">What situation are you dealing with?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="min-h-[48px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary">
                              <SelectValue placeholder="Select a situation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {strategySituations.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body text-white">Briefly describe your situation</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a bit about your property and what you're looking to accomplish…"
                            className="min-h-[100px] bg-white/90 text-foreground border-white/30 transition-[border-color] duration-150 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button
                      type="submit"
                      variant="hero"
                      size="hero"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="btn-spinner" />
                          Sending…
                        </span>
                      ) : (
                        buttonLabel
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategyCallForm;
