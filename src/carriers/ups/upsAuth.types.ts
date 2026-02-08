export type UpsOAuthResponse = {
  access_token: string;
  expires_in: number; // seconds
  token_type: "Bearer";
};
