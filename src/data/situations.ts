import type { SituationOption } from "@/types";

// Used in StrategyCallForm (homepage)
export const strategySituations: SituationOption[] = [
  { value: "code-violations",   label: "Code Violations" },
  { value: "inherited-probate", label: "Inherited / Probate" },
  { value: "adu-development",   label: "ADU Development" },
  { value: "selling-buying",    label: "Selling / Buying" },
  { value: "other",             label: "Other" },
];

// Used in RealEstateMoves inline review form
export const reviewSituations: SituationOption[] = [
  { value: "inherited-probate",     label: "Inherited / Probate" },
  { value: "trust-owned",           label: "Trust-Owned Property" },
  { value: "deferred-maintenance",  label: "Deferred Maintenance / Repairs" },
  { value: "code-violations",       label: "Code Violations / Unpermitted Work" },
  { value: "landlord-exit",         label: "Landlord Ready to Exit" },
  { value: "relocating-downsizing", label: "Relocating / Downsizing" },
  { value: "other",                 label: "Other" },
];
