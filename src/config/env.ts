import "dotenv/config";

export const config = {
  ups: {
    clientId: process.env.UPS_CLIENT_ID!,
    clientSecret: process.env.UPS_CLIENT_SECRET!,
    authUrl: process.env.UPS_AUTH_URL!,
    rateUrl: process.env.UPS_RATE_URL!,
  },
};
