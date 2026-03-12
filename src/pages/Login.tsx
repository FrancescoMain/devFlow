import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLogin } from "@/hooks/Auth/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
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

        {isError && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            Credenziali non valide
          </p>
        )}

        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          state={isError ? "error" : "default"}
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          state={isError ? "error" : "default"}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Accesso..." : "Accedi"}
        </Button>

        <p className="text-xs text-muted">Test: test@test.com / password</p>
      </form>
    </div>
  );
}
