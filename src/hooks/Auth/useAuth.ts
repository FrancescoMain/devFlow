import { AuthContext } from "@/features/Auth/AuthContext";
import { useContextSafe } from "@/lib/useContextSafe";

export const useAuth = () => useContextSafe(AuthContext, "useAuth");
