import { describe, it, expect } from "vitest";
import { calculate, formatNumber } from "./geometry";

describe("geometry", () => {
  it("cuadrado lado 5", () => {
    expect(calculate("cuadrado", { lado: "5" })).toEqual({ ok: true, area: 25, perimeter: 20 });
  });
  it("rectángulo", () => {
    expect(calculate("rectangulo", { base: "4", altura: "3" })).toEqual({ ok: true, area: 12, perimeter: 14 });
  });
  it("triángulo válido", () => {
    expect(calculate("triangulo", { base: "4", altura: "3", a: "3", b: "4", c: "5" })).toEqual({ ok: true, area: 6, perimeter: 12 });
  });
  it("triángulo inválido por desigualdad", () => {
    expect(calculate("triangulo", { base: "4", altura: "3", a: "1", b: "2", c: "5" }).ok).toBe(false);
  });
  it("círculo redondeado a 4 decimales", () => {
    const r = calculate("circulo", { radio: "1" });
    expect(r.ok && formatNumber(r.area)).toBe("3.1416");
  });
  it("rechaza vacío, cero y negativos", () => {
    expect(calculate("cuadrado", { lado: "" }).ok).toBe(false);
    expect(calculate("cuadrado", { lado: "0" }).ok).toBe(false);
    expect(calculate("cuadrado", { lado: "-2" }).ok).toBe(false);
  });
});
