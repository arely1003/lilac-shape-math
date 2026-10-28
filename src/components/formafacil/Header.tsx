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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#inicio" className="focus-ring flex items-center gap-2 rounded-lg text-lg font-semibold text-foreground">
          <Logo />
          FormaFácil
        </a>
        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-3 sm:text-base"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={dark}
            className="focus-ring ml-1 inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card text-primary transition-colors hover:bg-secondary"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
