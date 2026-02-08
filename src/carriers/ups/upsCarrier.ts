import { Carrier } from "../carrier.types";
import { RateRequest, RateQuote } from "../../domain/rate";
import { HttpClient } from "../../http/httpClient";
import { UpsAuthClient } from "./upsAuthClient";
import {
  mapRateRequestToUps,
  mapUpsResponseToRateQuotes,
} from "./upsRate.mapper";

import { UpsRateResponse } from "./upsRate.types";

export class UpsCarrier implements Carrier {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authClient: UpsAuthClient,
    private readonly rateUrl: string,
  ) {}

  async getRates(request: RateRequest): Promise<RateQuote[]> {
    // converting standard request body to ups format
    const upsPayload = mapRateRequestToUps(request);
    const token = await this.authClient.getAccessToken();

    const response = await this.httpClient.post<UpsRateResponse>(
      this.rateUrl,
      upsPayload,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    );

    // converting ups response to  standard response.
    return mapUpsResponseToRateQuotes(response);
  }
}
