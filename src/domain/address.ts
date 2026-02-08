import { z } from "zod";

export const AddressSchema = z.object({
  postalCode: z.string().min(1),
  countryCode: z.string(),
});

export type TAddress = z.infer<typeof AddressSchema>;
