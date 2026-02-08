import { RateRequest, RateQuote } from "../domain/rate";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}
