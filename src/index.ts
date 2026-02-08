import { ShippingService } from "./shippingService";

const service = new ShippingService();

(async () => {
  const rates = await service.getRates("UPS", {
    origin: { postalCode: "10001", countryCode: "US" },
    destination: { postalCode: "90001", countryCode: "US" },
    packages: [
      {
        weightKg: 2,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
      },
    ],
  });

  console.log(rates);
})();
