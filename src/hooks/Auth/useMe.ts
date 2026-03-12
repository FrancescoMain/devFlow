import { userKeys } from "@/lib/queryKeys";
import { useAuthState } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";
import { type LoginResponse } from "@/types/Api/LoginResponse";

export const useMe = () => {
  const { token } = useAuthState();
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => {
      return fetchApi<LoginResponse>("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!token,
  });
};
