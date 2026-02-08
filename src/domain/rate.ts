import { z } from "zod";
import { AddressSchema } from "./address";
import { PackageSchema } from "./package";

export const RateRequestSchema = z.object({
  origin: AddressSchema,
  destination: AddressSchema,
  packages: z.array(PackageSchema).min(1),
  serviceLevel: z.string().optional(),
});

export const RateQuoteSchema = z.object({
  carrier: z.string().min(1),
  serviceCode: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
});

export type RateRequest = z.infer<typeof RateRequestSchema>;
export type RateQuote = z.infer<typeof RateQuoteSchema>;
