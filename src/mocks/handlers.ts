import type { LoginResponse } from "@/types/Api/LoginResponse";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "test@test.com" && body.password === "passwod") {
      return HttpResponse.json<LoginResponse>({
        token: "mock-jwt-token",
        user: { name: "Francesco", surname: "Cesarano", gender: "M" },
      });
    }
    return HttpResponse.json(
      { message: "Invalid credentials", status: 401 },
      { status: 401 },
    );
  }),

  http.get("/api/me", () => {
    return HttpResponse.json<LoginResponse>({
      token: "mock-jwt-token",
      user: { name: "Francesco", surname: "Cesarano", gender: "M" },
    });
  }),
];
