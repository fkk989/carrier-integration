import { RateRequest, RateQuote } from "../domain/rate";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}

export const CARRIERS = {
  UPS: "UPS",
  // FEDEX: "FEDEX",
  // USPS: "USPS",
} as const;

export type CarrierName = keyof typeof CARRIERS;
