export interface HttpClient {
  post<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<T>;
}
