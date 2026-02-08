import { RateRequest, RateQuote, RateRequestSchema } from "./domain/rate";
import { Carrier, CarrierName } from "./carriers/carrier.types";
import { UpsCarrier } from "./carriers/ups/upsCarrier";
import { AxiosHttpClient } from "./http/axiosHttpClient";
import { UpsAuthClient } from "./carriers/ups/upsAuthClient";
import { config } from "./config/env";

export class ShippingService {
  private carriers: Record<string, Carrier>;

  constructor() {
    const httpClient = new AxiosHttpClient();

    const upsAuth = new UpsAuthClient(
      httpClient,
      config.ups.clientId,
      config.ups.clientSecret,
      config.ups.authUrl,
    );

    this.carriers = {
      UPS: new UpsCarrier(httpClient, upsAuth, config.ups.rateUrl),
    };
  }

  async getRates(
    carrierName: CarrierName,
    request: RateRequest,
  ): Promise<RateQuote[]> {
    // validation request body
    const validatedInput = RateRequestSchema.safeParse(request);

    if (!validatedInput.success) {
      throw new Error(
        `Invalid rate request: ${validatedInput?.error?.message}`,
      );
    }

    const carrier = this.carriers[carrierName];

    if (!carrier) {
      throw new Error(`Unsupported carrier: ${carrierName}`);
    }

    return carrier.getRates(validatedInput.data);
  }
}
