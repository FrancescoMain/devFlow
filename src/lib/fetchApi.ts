import type { ErrorResponse } from "@/types/Api/ErrorResponse";

export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }

  return response.json() as Promise<T>;
}