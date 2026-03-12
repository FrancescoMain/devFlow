import { userKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { type LoginResponse } from "@/types/Api/LoginResponse";
import { useAuthFetch } from "./useAuthFetch";

export const useMe = () => {
  const { authFetch, isAuthenticated } = useAuthFetch();
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => authFetch<LoginResponse>("/api/me"),
    enabled: isAuthenticated,
  });
};
