import type { User } from "../Auth/User";

export interface LoginResponse {
  token: string;
  user: User;
}
