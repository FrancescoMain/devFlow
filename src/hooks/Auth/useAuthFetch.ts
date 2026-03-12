import { useAuthState } from "./useAuth";
import { fetchApi } from "@/lib/fetchApi";

export const useAuthFetch = () => {
  const { token } = useAuthState();

  const authFetch = <T>(url: string, options?: RequestInit) =>
    fetchApi<T>(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });

  return { authFetch, isAuthenticated: !!token };
};
