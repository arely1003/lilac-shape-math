export type ShapeId =
  | "cuadrado"
  | "rectangulo"
  | "triangulo"
  | "circulo"
  | "rombo"
  | "romboide"
  | "trapecio"
  | "pentagono"
  | "hexagono"
  | "elipse";
export type Unit = "cm" | "m" | "km";

export interface Field {
  key: string;
  label: string;
  hint: string;
}

export const SHAPES: Record<ShapeId, { name: string; description: string; fields: Field[] }> = {
  cuadrado: {
    name: "Cuadrado",
    description: "Cuatro lados iguales y cuatro ángulos rectos.",
    fields: [{ key: "lado", label: "Lado", hint: "Longitud de cualquiera de sus lados" }],
  },
  rectangulo: {
    name: "Rectángulo",
    description: "Lados opuestos iguales y cuatro ángulos rectos.",
    fields: [
      { key: "base", label: "Base", hint: "Lado horizontal" },
      { key: "altura", label: "Altura", hint: "Lado vertical" },
    ],
  },
  triangulo: {
    name: "Triángulo",
    description: "Tres lados y tres ángulos que suman 180°.",
    fields: [
      { key: "base", label: "Base", hint: "Lado sobre el que se mide la altura" },
      { key: "altura", label: "Altura", hint: "Distancia perpendicular desde la base al vértice opuesto" },
      { key: "a", label: "Lado A", hint: "Longitud del primer lado" },
      { key: "b", label: "Lado B", hint: "Longitud del segundo lado" },
      { key: "c", label: "Lado C", hint: "Longitud del tercer lado" },
    ],
  },
  circulo: {
    name: "Círculo",
    description: "Todos sus puntos están a la misma distancia del centro.",
    fields: [{ key: "radio", label: "Radio", hint: "Distancia del centro al borde" }],
  },
  rombo: {
    name: "Rombo",
    description: "Cuatro lados iguales con diagonales que se cruzan en el centro.",
    fields: [
      { key: "diagonalMayor", label: "Diagonal mayor", hint: "La diagonal más larga" },
      { key: "diagonalMenor", label: "Diagonal menor", hint: "La diagonal más corta" },
      { key: "lado", label: "Lado", hint: "Longitud de cualquiera de sus lados" },
    ],
  },
  romboide: {
    name: "Romboide",
    description: "Lados opuestos paralelos e iguales, como un rectángulo inclinado.",
    fields: [
      { key: "base", label: "Base", hint: "Lado horizontal" },
      { key: "altura", label: "Altura", hint: "Distancia perpendicular entre las bases" },
      { key: "lado", label: "Lado inclinado", hint: "Longitud de un lado lateral" },
    ],
  },
  trapecio: {
    name: "Trapecio",
    description: "Cuatro lados con dos bases paralelas de distinto tamaño.",
    fields: [
      { key: "baseMayor", label: "Base mayor", hint: "La base paralela más larga" },
      { key: "baseMenor", label: "Base menor", hint: "La base paralela más corta" },
      { key: "altura", label: "Altura", hint: "Distancia perpendicular entre las bases" },
      { key: "lado1", label: "Lado 1", hint: "Primer lado no paralelo" },
      { key: "lado2", label: "Lado 2", hint: "Segundo lado no paralelo" },
    ],
  },
  pentagono: {
    name: "Pentágono regular",
    description: "Cinco lados iguales y cinco ángulos iguales.",
    fields: [{ key: "lado", label: "Lado", hint: "Longitud de cualquiera de sus lados" }],
  },
  hexagono: {
    name: "Hexágono regular",
    description: "Seis lados iguales y seis ángulos iguales.",
    fields: [{ key: "lado", label: "Lado", hint: "Longitud de cualquiera de sus lados" }],
  },
  elipse: {
    name: "Elipse",
    description: "Como un círculo estirado, con un eje mayor y uno menor.",
    fields: [
      { key: "ejeMayor", label: "Semieje mayor", hint: "Mitad del eje más largo" },
      { key: "ejeMenor", label: "Semieje menor", hint: "Mitad del eje más corto" },
    ],
  },
};

export type Values = Record<string, string>;
export type CalcResult =
  | { ok: true; area: number; perimeter: number }
  | { ok: false; errors: Record<string, string>; general?: string };

export function calculate(shape: ShapeId, values: Values): CalcResult {
  const errors: Record<string, string> = {};
  const n: Record<string, number> = {};
  for (const f of SHAPES[shape].fields) {
    const raw = (values[f.key] ?? "").trim().replace(",", ".");
    if (raw === "") {
      errors[f.key] = `Ingresa un valor para ${f.label.toLowerCase()}.`;
      continue;
    }
    const v = Number(raw);
    if (!Number.isFinite(v)) errors[f.key] = `${f.label} debe ser un número válido.`;
    else if (v <= 0) errors[f.key] = `${f.label} debe ser mayor que cero.`;
    else n[f.key] = v;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  const g = (k: string): number => n[k] ?? 0;

  switch (shape) {
    case "cuadrado":
      return { ok: true, area: g("lado") * g("lado"), perimeter: 4 * g("lado") };
    case "rectangulo":
      return { ok: true, area: g("base") * g("altura"), perimeter: 2 * (g("base") + g("altura")) };
    case "circulo":
      return { ok: true, area: Math.PI * g("radio") ** 2, perimeter: 2 * Math.PI * g("radio") };
    case "triangulo": {
      const a = g("a"), b = g("b"), c = g("c");
      if (a + b <= c || a + c <= b || b + c <= a) {
        return {
          ok: false,
          errors: {},
          general:
            "Estos lados no forman un triángulo: la suma de dos lados siempre debe ser mayor que el tercero.",
        };
      }
      return { ok: true, area: (g("base") * g("altura")) / 2, perimeter: a + b + c };
    }
    case "rombo":
      return { ok: true, area: (g("diagonalMayor") * g("diagonalMenor")) / 2, perimeter: 4 * g("lado") };
    case "romboide":
      return { ok: true, area: g("base") * g("altura"), perimeter: 2 * (g("base") + g("lado")) };
    case "trapecio":
      return {
        ok: true,
        area: ((g("baseMayor") + g("baseMenor")) / 2) * g("altura"),
        perimeter: g("baseMayor") + g("baseMenor") + g("lado1") + g("lado2"),
      };
    case "pentagono": {
      const l = g("lado");
      return { ok: true, area: (5 * l * l) / (4 * Math.tan(Math.PI / 5)), perimeter: 5 * l };
    }
    case "hexagono": {
      const l = g("lado");
      return { ok: true, area: (3 * Math.sqrt(3) / 2) * l * l, perimeter: 6 * l };
    }
    case "elipse": {
      const a = g("ejeMayor"), b = g("ejeMenor");
      // Aproximación de Ramanujan para el perímetro de la elipse
      const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      return { ok: true, area: Math.PI * a * b, perimeter };
    }
  }
}

export function formatNumber(x: number): string {
  return Number(x.toFixed(4)).toLocaleString("es-MX", { maximumFractionDigits: 4 });
}
