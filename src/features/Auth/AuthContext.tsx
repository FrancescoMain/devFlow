import type { AuthAction } from "@/types/Auth/AuthAction";
import type { AuthState } from "@/types/Auth/AuthState";
import { createContext, useReducer } from "react";

//Reducer
function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isAuthenticated: true, loading: false };
    case "LOGOUT":
      return { user: null, isAuthenticated: false, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
  }
}

//Contexts
export const AuthStateContext = createContext<AuthState | undefined>(undefined);
export const AuthDispatchContext = createContext<
  React.Dispatch<AuthAction> | undefined
>(undefined);

//Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

//Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
