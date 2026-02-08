import axios from "axios";
import { HttpClient } from "./httpClient";

export class AxiosHttpClient implements HttpClient {
  async post<T>(
    url: string,
    body: unknown,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const response = await axios.post(url, body, { headers });
    return response.data;
  }
}
