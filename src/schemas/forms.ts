import { z } from "zod";
import { NAME_MAX, EMAIL_MAX, ADDRESS_MAX, PHONE_MAX, DESCRIPTION_MAX } from "@/constants";

// ── Reusable field builders ──────────────────────────────────────────
const nameField = z.string().trim().min(1, "Name is required").max(NAME_MAX);
const emailField = z.string().trim().email("Please enter a valid email").max(EMAIL_MAX);
const addressField = z.string().trim().min(1, "Property address is required").max(ADDRESS_MAX);
const phoneRequired = z.string().trim().min(1, "Phone number is required").max(PHONE_MAX);
const phoneOptional = z.string().trim().max(PHONE_MAX).optional().or(z.literal(""));

// ── Lead (3-field): AduFeasibility ──────────────────────────────────
export const leadSchema = z.object({
  name: nameField,
  email: emailField,
  address: addressField,
});
export type LeadValues = z.infer<typeof leadSchema>;

// ── Lead + optional phone: CodeViolationGuide, ProbateGuide, FixDevelop property review
export const leadWithOptionalPhoneSchema = leadSchema.extend({
  phone: phoneOptional,
});
export type LeadWithOptionalPhoneValues = z.infer<typeof leadWithOptionalPhoneSchema>;

// ── Lead + required phone: FixDevelop violation guide ───────────────
export const violationGuideSchema = leadSchema.extend({
  phone: phoneRequired,
});
export type ViolationGuideValues = z.infer<typeof violationGuideSchema>;

// ── Strategy call (full 6-field): StrategyCallForm, RealEstateMoves ─
export const strategyCallSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneRequired,
  address: addressField,
  situation: z.string().min(1, "Please select a situation"),
  description: z.string().trim().max(DESCRIPTION_MAX).optional(),
});
export type StrategyCallValues = z.infer<typeof strategyCallSchema>;

// Alias used in RealEstateMoves inline review form
export const reviewFormSchema = strategyCallSchema;
export type ReviewFormValues = StrategyCallValues;

// ── Probate page form ─────────────────────────────────────────────
export const probateFormSchema = z.object({
  name: nameField,
  phone: phoneRequired,
  email: emailField,
  address: addressField,
  probateStage: z.string().min(1, "Please select a probate stage"),
  notes: z.string().trim().max(DESCRIPTION_MAX).optional().or(z.literal("")),
});
export type ProbateFormValues = z.infer<typeof probateFormSchema>;
