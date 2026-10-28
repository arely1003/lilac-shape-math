export type ShapeId = "cuadrado" | "rectangulo" | "triangulo" | "circulo";
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

  switch (shape) {
    case "cuadrado":
      return { ok: true, area: n.lado * n.lado, perimeter: 4 * n.lado };
    case "rectangulo":
      return { ok: true, area: n.base * n.altura, perimeter: 2 * (n.base + n.altura) };
    case "circulo":
      return { ok: true, area: Math.PI * n.radio ** 2, perimeter: 2 * Math.PI * n.radio };
    case "triangulo": {
      const { a, b, c } = n;
      if (a + b <= c || a + c <= b || b + c <= a) {
        return {
          ok: false,
          errors: {},
          general:
            "Estos lados no forman un triángulo: la suma de dos lados siempre debe ser mayor que el tercero.",
        };
      }
      return { ok: true, area: (n.base * n.altura) / 2, perimeter: a + b + c };
    }
  }
}

export function formatNumber(x: number): string {
  return Number(x.toFixed(4)).toLocaleString("es-MX", { maximumFractionDigits: 4 });
}
