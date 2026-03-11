import type { AuthAction } from "@/types/Auth/AuthAction";
import type { AuthState } from "@/types/Auth/AuthState";
import { createContext, useReducer } from "react";

interface AuthContextForProvider extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

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
//Context
export const AuthContext = createContext<AuthContextForProvider | undefined>(
  undefined,
);

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
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
