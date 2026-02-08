import { Carrier } from "../carrier.interface";
import { RateRequest, RateQuote } from "../../domain/rate";

export class UpsCarrier implements Carrier {
  async getRates(_: RateRequest): Promise<RateQuote[]> {
    // Fake response for Task 1
    return [
      {
        carrier: "UPS",
        serviceCode: "03",
        amount: 12.45,
        currency: "USD",
      },
      {
        carrier: "UPS",
        serviceCode: "02",
        amount: 24.99,
        currency: "USD",
      },
    ];
  }
}
