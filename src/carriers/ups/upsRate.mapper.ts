import { RateRequest, RateQuote } from "../../domain/rate";
import { CARRIERS } from "../carrier.types";
import { UpsRateRequest, UpsRateResponse } from "./upsRate.types";

// converts our standard request body to Ups format request body
export function mapRateRequestToUps(request: RateRequest): UpsRateRequest {
  return {
    Shipment: {
      Shipper: {
        Address: {
          PostalCode: request.origin.postalCode,
          CountryCode: request.origin.countryCode,
        },
      },
      ShipTo: {
        Address: {
          PostalCode: request.destination.postalCode,
          CountryCode: request.destination.countryCode,
        },
      },
      Package: request.packages.map((pkg) => ({
        PackageWeight: {
          Weight: pkg.weightKg.toString(),
        },
        Dimensions: {
          Length: pkg.lengthCm.toString(),
          Width: pkg.widthCm.toString(),
          Height: pkg.heightCm.toString(),
        },
      })),
    },
  };
}

// converts Ups response to our standard response
export function mapUpsResponseToRateQuotes(
  response: UpsRateResponse,
): RateQuote[] {
  return response.RateResponse.RatedShipment.map((shipment) => ({
    carrier: CARRIERS.UPS,
    serviceCode: shipment.Service.Code,
    amount: Number(shipment.TotalCharges.MonetaryValue),
    currency: shipment.TotalCharges.CurrencyCode,
  }));
}
