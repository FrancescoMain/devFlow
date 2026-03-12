import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "./useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetchApi";
import { type LoginResponse } from "@/types/Api/LoginResponse";
import { userKeys } from "@/lib/queryKeys";

export const useLogin = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return fetchApi<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: "LOGIN",
        payload: { user: data.user, token: data.token },
      });
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
      navigate("/");
    },
  });
};
