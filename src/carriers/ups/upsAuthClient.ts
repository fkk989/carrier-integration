import { HttpClient } from "../../http/httpClient";
import { UpsOAuthResponse } from "./upsAuth.types";

export class UpsAuthClient {
  private token?: string;
  private tokenExpiry?: number; // timestamp in ms

  constructor(
    private readonly httpClient: HttpClient,
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly authUrl: string,
  ) {}

  async getAccessToken(): Promise<string> {
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    const authHeader = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString("base64");

    const response = await this.httpClient.post<UpsOAuthResponse>(
      this.authUrl,
      "grant_type=client_credentials",
      {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    );

    this.token = response.access_token;
    this.tokenExpiry = Date.now() + response.expires_in * 1000;

    return this.token;
  }
}
