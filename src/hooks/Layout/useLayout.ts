import { LayoutContext } from "@/features/Layout/LayoutContext";
import { useContextSafe } from "@/lib/useContextSafe";

export const useLayout = () => useContextSafe(LayoutContext, "useLayout");
