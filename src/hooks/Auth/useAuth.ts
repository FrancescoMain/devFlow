import {
  AuthStateContext,
  AuthDispatchContext,
} from "@/features/Auth/AuthContext";
import { useContextSafe } from "@/lib/useContextSafe";

export const useAuthState = () =>
  useContextSafe(AuthStateContext, "useAuthState");

export const useAuthDispatch = () =>
  useContextSafe(AuthDispatchContext, "useAuthDispatch");
