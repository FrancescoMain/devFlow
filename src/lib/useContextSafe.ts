import { useContext, type Context } from "react";

export function useContextSafe<T>(
  context: Context<T | undefined>,
  name: string,
): T {
  const value = useContext(context);
  if (!value) throw new Error(`${name} must be used within its Provider`);
  return value;
}
