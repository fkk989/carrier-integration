import { Address } from "./address";
import { Package } from "./package";

export type RateRequest = {
  origin: Address;
  destination: Address;
  packages: Package[];
  serviceLevel?: string;
};

export type RateQuote = {
  carrier: string;
  serviceCode: string;
  amount: number;
  currency: string;
};
