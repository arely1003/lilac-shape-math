import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { calculate, SHAPES, type CalcResult, type ShapeId, type Unit, type Values } from "@/lib/geometry";
import { Header } from "@/components/formafacil/Header";
import { Calculator } from "@/components/formafacil/Calculator";
import { FigurePicker } from "@/components/formafacil/FigurePicker";
import { Logo, ShapeIllustration } from "@/components/formafacil/ShapeIllustration";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FormaFácil: Calculadora de Áreas y Perímetros" },
      { name: "description", content: "Calcula el área y el perímetro de cuadrados, rectángulos, triángulos y círculos de forma rápida, visual y sencilla." },
      { property: "og:title", content: "FormaFácil: Calculadora de Áreas y Perímetros" },
      { property: "og:description", content: "Herramienta educativa para calcular áreas y perímetros de figuras geométricas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ORDER: ShapeId[] = ["cuadrado", "rectangulo", "triangulo", "circulo", "rombo", "romboide", "trapecio", "pentagono", "hexagono", "elipse"];

const FORMULAS: Record<ShapeId, { area: string; perimeter: string; note: string }> = {
  cuadrado: { area: "A = l × l = l²", perimeter: "P = 4 × l", note: "l es la longitud de un lado." },
  rectangulo: { area: "A = b × h", perimeter: "P = 2 × (b + h)", note: "b es la base y h la altura." },
  triangulo: { area: "A = (b × h) ÷ 2", perimeter: "P = a + b + c", note: "h es perpendicular a la base; a, b y c son sus lados." },
  circulo: { area: "A = π × r²", perimeter: "P = 2 × π × r", note: "r es el radio y π ≈ 3.1416." },
  rombo: { area: "A = (D × d) ÷ 2", perimeter: "P = 4 × l", note: "D y d son las diagonales y l es un lado." },
  romboide: { area: "A = b × h", perimeter: "P = 2 × (b + l)", note: "b es la base, h la altura y l el lado inclinado." },
  trapecio: { area: "A = ((B + b) ÷ 2) × h", perimeter: "P = B + b + l₁ + l₂", note: "B y b son las bases, h la altura y l₁, l₂ los lados." },
  pentagono: { area: "A ≈ 1.7205 × l²", perimeter: "P = 5 × l", note: "l es la longitud de un lado." },
  hexagono: { area: "A ≈ 2.5981 × l²", perimeter: "P = 6 × l", note: "l es la longitud de un lado." },
  elipse: { area: "A = π × a × b", perimeter: "P ≈ π × (3(a + b) − √((3a + b)(a + 3b)))", note: "a y b son los semiejes; el perímetro es una aproximación." },
};

const STEPS = ["Selecciona una figura.", "Ingresa las medidas.", "Selecciona la unidad.", "Presiona Calcular.", "Consulta los resultados."];

function Index() {
  const [shape, setShape] = useState<ShapeId>("cuadrado");
  const [values, setValues] = useState<Values>({});
  const [unit, setUnit] = useState<Unit>("cm");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const changeShape = (s: ShapeId) => {
    setShape(s);
    setValues({});
    setResult(null);
  };
  const goCalc = () => document.getElementById("calculadora")?.scrollIntoView();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <a href="#contenido" className="focus-ring sr-only rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        {/* Hero */}
        <section id="inicio" className="bg-hero scroll-mt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="size-4" aria-hidden="true" /> Geometría para estudiantes
              </p>
              <h1 className="text-[2.25rem] font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Las matemáticas, <span className="text-primary">más sencillas.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-muted-foreground">
                Calcula áreas y perímetros de tus figuras geométricas favoritas de forma rápida, visual y sencilla.
              </p>
              <a href="#calculadora" className="focus-ring mt-8 flex min-h-14 w-full items-center justify-center gap-2 sm:inline-flex sm:w-auto rounded-xl bg-primary px-7 py-4 text-lg font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lift">
                Comenzar a calcular <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </div>
            <div className="relative mx-auto grid w-full max-w-[18rem] grid-cols-2 gap-3 sm:max-w-sm sm:gap-4" aria-hidden="true">
              {ORDER.map((s, i) => (
                <div key={s} className="card-soft animate-float flex aspect-square items-center justify-center" style={{ animationDelay: `${i * 0.8}s` }}>
                  <ShapeIllustration shape={s} className="size-3/5" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selector */}
        <section aria-labelledby="sel-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 id="sel-title" className="text-2xl font-bold text-foreground sm:text-3xl">Elige una figura</h2>
          <p className="mt-2 text-muted-foreground">Selecciona una tarjeta para preparar la calculadora.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {ORDER.map((s) => {
              const active = s === shape;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => { changeShape(s); goCalc(); }}
                  className={`focus-ring card-soft group flex min-h-11 flex-col items-center p-5 text-center sm:p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${active ? "border-primary ring-2 ring-primary" : ""}`}
                >
                  <ShapeIllustration shape={s} className="size-24 transition-transform group-hover:scale-105" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{SHAPES[s].name}</h3>
                  <p className="mt-1 text-muted-foreground">{SHAPES[s].description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Calculadora */}
        <section id="calculadora" aria-labelledby="calc-title" className="scroll-mt-20 bg-secondary/50 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="calc-title" className="text-2xl font-bold text-foreground sm:text-3xl">Calculadora</h2>
            <p className="mb-8 mt-2 text-muted-foreground">Todas las medidas deben ser números mayores que cero.</p>
            <Calculator
              shape={shape}
              values={values}
              unit={unit}
              result={result}
              onShape={changeShape}
              onValue={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
              onUnit={setUnit}
              onCalculate={() => setResult(calculate(shape, values))}
              onClear={() => { setValues({}); setResult(null); }}
              onOpenPicker={() => setPickerOpen(true)}
            />
            <FigurePicker
              open={pickerOpen}
              onOpenChange={setPickerOpen}
              onPick={changeShape}
            />

            {/* Ejemplo */}
            <div className="card-soft mt-8 flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
              <ShapeIllustration shape="cuadrado" className="size-24 shrink-0" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-foreground">Ejemplo práctico: cuadrado de lado 5 cm</h3>
                <p className="mt-2 text-muted-foreground">
                  Área: 5 × 5 = <strong className="text-foreground">25 cm²</strong> · Perímetro: 4 × 5 = <strong className="text-foreground">20 cm</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const v = { lado: "5" };
                  setShape("cuadrado"); setUnit("cm"); setValues(v);
                  setResult(calculate("cuadrado", v));
                }}
                className="focus-ring min-h-12 w-full rounded-xl bg-primary px-6 py-3 font-semibold sm:w-auto text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lift"
              >
                Probar ejemplo
              </button>
            </div>
          </div>
        </section>

        {/* Fórmulas */}
        <section aria-labelledby="form-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 id="form-title" className="text-2xl font-bold text-foreground sm:text-3xl">Fórmulas</h2>
          <p className="mt-2 text-muted-foreground">Así se calcula cada figura.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ORDER.map((s) => (
              <article key={s} className="card-soft flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:items-start sm:gap-5 sm:p-6 sm:text-left">
                <ShapeIllustration shape={s} className="size-20 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-foreground">{SHAPES[s].name}</h3>
                  <p className="mt-2 break-words font-mono text-base text-primary sm:text-lg">{FORMULAS[s].area}</p>
                  <p className="break-words font-mono text-base text-primary sm:text-lg">{FORMULAS[s].perimeter}</p>
                  <p className="mt-2 text-muted-foreground">{FORMULAS[s].note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ayuda */}
        <section id="ayuda" aria-labelledby="help-title" className="scroll-mt-20 bg-secondary/50 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="help-title" className="text-2xl font-bold text-foreground sm:text-3xl">Ayuda</h2>
            <p className="mt-2 text-muted-foreground">Usar FormaFácil es muy sencillo:</p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
              {STEPS.map((t, i) => (
                <li key={t} className="card-soft flex items-center gap-4 p-5 lg:flex-col lg:text-center">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground" aria-hidden="true">{i + 1}</span>
                  <span className="font-medium text-foreground">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-semibold text-foreground">FormaFácil</p>
              <p className="text-sm text-muted-foreground">Herramienta educativa de geometría</p>
            </div>
          </div>
          <a href="#inicio" className="focus-ring inline-flex min-h-11 items-center rounded-lg px-4 font-medium text-primary hover:bg-secondary">Volver al inicio ↑</a>
        </div>
      </footer>
    </div>
  );
}
