import { RateRequest, RateQuote } from "./domain/rate";
import { Carrier } from "./carriers/carrier.interface";
import { UpsCarrier } from "./carriers/ups/upsCarrier";

export class ShippingService {
  private carriers: Record<string, Carrier>;

  constructor() {
    this.carriers = {
      UPS: new UpsCarrier(),
    };
  }

  async getRates(
    carrierName: string,
    request: RateRequest,
  ): Promise<RateQuote[]> {
    const carrier = this.carriers[carrierName];

    if (!carrier) {
      throw new Error(`Unsupported carrier: ${carrierName}`);
    }

    return carrier.getRates(request);
  }
}
