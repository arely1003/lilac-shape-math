import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Logo } from "./ShapeIllustration";

const KEY = "formafacil-theme";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY) === "dark";
    setDark(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    sessionStorage.setItem(KEY, next ? "dark" : "light");
  };

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#calculadora", label: "Calculadora" },
    { href: "#ayuda", label: "Ayuda" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:flex sm:justify-between sm:px-6 lg:px-8">
        <a href="#inicio" className="focus-ring flex min-h-11 min-w-0 items-center gap-2 rounded-lg text-lg font-semibold text-foreground sm:text-xl">
          <span className="shrink-0"><Logo /></span>
          <span className="truncate">FormaFácil</span>
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
          aria-pressed={dark}
          className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-primary transition-colors hover:bg-secondary sm:order-last"
        >
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          <span className="text-sm font-medium" aria-hidden="true">{dark ? "Claro" : "Oscuro"}</span>
        </button>
        <nav aria-label="Principal" className="col-span-2 grid grid-cols-3 gap-1 sm:ml-auto sm:flex sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-lg px-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
