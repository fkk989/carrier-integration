export type UpsRateRequest = {
  Shipment: {
    Shipper: {
      Address: {
        PostalCode: string;
        CountryCode: string;
      };
    };
    ShipTo: {
      Address: {
        PostalCode: string;
        CountryCode: string;
      };
    };
    Package: Array<{
      PackageWeight: {
        Weight: string;
      };
      Dimensions: {
        Length: string;
        Width: string;
        Height: string;
      };
    }>;
  };
};

export type UpsRateResponse = {
  RateResponse: {
    RatedShipment: Array<{
      Service: { Code: string };
      TotalCharges: {
        MonetaryValue: string;
        CurrencyCode: string;
      };
    }>;
  };
};
