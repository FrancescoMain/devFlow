import type { LayoutContextType } from "@/types/Layout/LayoutContextType";
import { createContext } from "react";

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
);
