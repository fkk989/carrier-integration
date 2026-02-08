import { describe, it, expect, vi } from "vitest";
import { UpsCarrier } from "../src/carriers/ups/upsCarrier";
import { UpsAuthClient } from "../src/carriers/ups/upsAuthClient";
import { HttpClient } from "../src/http/httpClient";

describe("UPS rate integration", () => {
  it("returns normalized rate quotes", async () => {
    const fakeHttpClient: HttpClient = {
      post: vi
        .fn()
        // OAuth call
        .mockResolvedValueOnce({
          access_token: "test-token",
          expires_in: 3600,
          token_type: "Bearer",
        })
        // Rate call
        .mockResolvedValueOnce({
          RateResponse: {
            RatedShipment: [
              {
                Service: { Code: "03" },
                TotalCharges: {
                  MonetaryValue: "10.00",
                  CurrencyCode: "USD",
                },
              },
            ],
          },
        }),
    };

    // first post call will call - OAuth to get token
    const auth = new UpsAuthClient(fakeHttpClient, "id", "secret", "auth-url");

    // seconds post call will call - Rate to get Rates Qoute
    const carrier = new UpsCarrier(fakeHttpClient, auth, "rate-url");

    const rates = await carrier.getRates({
      origin: { postalCode: "10001", countryCode: "US" },
      destination: { postalCode: "90001", countryCode: "US" },
      packages: [{ weightKg: 1, lengthCm: 10, widthCm: 10, heightCm: 10 }],
    });

    expect(rates).toEqual([
      {
        carrier: "UPS",
        serviceCode: "03",
        amount: 10,
        currency: "USD",
      },
    ]);
  });
});
