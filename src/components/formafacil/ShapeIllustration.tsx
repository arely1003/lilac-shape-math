import type { ShapeId } from "@/lib/geometry";

export function ShapeIllustration({ shape, className = "size-20" }: { shape: ShapeId; className?: string }) {
  const common = {
    className: "fill-shape-fill stroke-shape-stroke",
    strokeWidth: 3,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {shape === "cuadrado" && <rect x="20" y="20" width="60" height="60" rx="4" {...common} />}
      {shape === "rectangulo" && <rect x="10" y="30" width="80" height="44" rx="4" {...common} />}
      {shape === "triangulo" && (
        <>
          <polygon points="50,16 88,82 12,82" {...common} />
          <line x1="50" y1="16" x2="50" y2="82" className="stroke-shape-stroke" strokeWidth="2" strokeDasharray="4 4" />
        </>
      )}
      {shape === "circulo" && (
        <>
          <circle cx="50" cy="50" r="34" {...common} />
          <line x1="50" y1="50" x2="84" y2="50" className="stroke-shape-stroke" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="3" className="fill-shape-stroke" />
        </>
      )}
      {shape === "rombo" && (
        <>
          <polygon points="50,12 82,50 50,88 18,50" {...common} />
          <line x1="50" y1="12" x2="50" y2="88" className="stroke-shape-stroke" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="18" y1="50" x2="82" y2="50" className="stroke-shape-stroke" strokeWidth="2" strokeDasharray="4 4" />
        </>
      )}
      {shape === "romboide" && (
        <polygon points="28,24 90,24 72,76 10,76" {...common} />
      )}
      {shape === "trapecio" && (
        <polygon points="32,26 68,26 88,76 12,76" {...common} />
      )}
      {shape === "pentagono" && (
        <polygon points="50,14 88,42 73,84 27,84 12,42" {...common} />
      )}
      {shape === "hexagono" && (
        <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" {...common} />
      )}
      {shape === "elipse" && (
        <>
          <ellipse cx="50" cy="50" rx="40" ry="26" {...common} />
          <line x1="50" y1="50" x2="90" y2="50" className="stroke-shape-stroke" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="3" className="fill-shape-stroke" />
        </>
      )}
    </svg>
  );
}

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="9" className="fill-primary" />
      <polygon points="16,8 24,22 8,22" className="fill-primary-foreground" />
    </svg>
  );
}
