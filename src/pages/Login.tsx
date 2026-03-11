import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "@/hooks/Auth/useAuth";
import { fetchApi } from "@/lib/fetchApi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { LoginResponse } from "@/types/Api/LoginResponse";

export default function Login() {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await fetchApi<LoginResponse>("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      dispatch({ type: "LOGIN", payload: { user: data.user, token: data.token } });
      navigate("/");
    } catch {
      setError("Credenziali non valide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-surface p-8"
      >
        <h1 className="text-2xl font-bold text-foreground">
          dev<span className="text-primary">Flow</span>
        </h1>
        <p className="text-sm text-muted">Accedi al tuo account</p>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {error}
          </p>
        )}

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          state={error ? "error" : "default"}
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          state={error ? "error" : "default"}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Accesso..." : "Accedi"}
        </Button>

        <p className="text-xs text-muted">
          Test: test@test.com / password
        </p>
      </form>
    </div>
  );
}