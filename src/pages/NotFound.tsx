import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-[8rem] font-bold leading-none tracking-tight text-primary">
        404
      </h1>
      <p className="mt-4 text-xl text-foreground/60">
        La pagina che cerchi non esiste.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        Torna alla home
      </Link>
    </div>
  );
}
