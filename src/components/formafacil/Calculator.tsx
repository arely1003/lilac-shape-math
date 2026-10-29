import { useId } from "react";
import { AlertCircle, Calculator as CalcIcon, Eraser, WandSparkles } from "lucide-react";
import { SHAPES, formatNumber, type CalcResult, type ShapeId, type Unit, type Values } from "@/lib/geometry";
import { ShapeIllustration } from "./ShapeIllustration";

interface Props {
  shape: ShapeId;
  values: Values;
  unit: Unit;
  result: CalcResult | null;
  onShape: (s: ShapeId) => void;
  onValue: (k: string, v: string) => void;
  onUnit: (u: Unit) => void;
  onCalculate: () => void;
  onClear: () => void;
  onOpenPicker: () => void;
}

const inputCls =
  "focus-ring min-h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground hover:border-primary/60";

export function Calculator(p: Props) {
  const id = useId();
  const errors = result_errors(p.result);
  const general = p.result && !p.result.ok ? p.result.general : undefined;

  return (
    <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.3fr_1fr]">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          p.onCalculate();
        }}
        className="card-soft min-w-0 p-5 sm:p-8"
        aria-label="Calculadora de áreas y perímetros"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-shape`} className="mb-2 block font-medium text-foreground">Figura geométrica</label>
            <select id={`${id}-shape`} value={p.shape} onChange={(e) => p.onShape(e.target.value as ShapeId)} className={inputCls}>
              {(Object.keys(SHAPES) as ShapeId[]).map((s) => (
                <option key={s} value={s}>{SHAPES[s].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-unit`} className="mb-2 block font-medium text-foreground">Unidad de longitud</label>
            <select id={`${id}-unit`} value={p.unit} onChange={(e) => p.onUnit(e.target.value as Unit)} className={inputCls}>
              <option value="cm">Centímetros (cm)</option>
              <option value="m">Metros (m)</option>
              <option value="km">Kilómetros (km)</option>
            </select>
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Medidas del {SHAPES[p.shape].name.toLowerCase()}
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {SHAPES[p.shape].fields.map((f) => {
              const fid = `${id}-${p.shape}-${f.key}`;
              const err = errors[f.key];
              return (
                <div key={fid}>
                  <label htmlFor={fid} className="block font-medium text-foreground">
                    {f.label} <span className="font-normal text-muted-foreground">({p.unit})</span>
                  </label>
                  <p id={`${fid}-hint`} className="mb-2 text-sm text-muted-foreground">{f.hint}</p>
                  <input
                    id={fid}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="Ej. 5"
                    value={p.values[f.key] ?? ""}
                    onChange={(e) => p.onValue(f.key, e.target.value)}
                    aria-invalid={!!err}
                    aria-describedby={`${fid}-hint${err ? ` ${fid}-err` : ""}`}
                    className={`${inputCls} ${err ? "border-destructive" : ""}`}
                  />
                  {err && (
                    <p id={`${fid}-err`} className="mt-1.5 text-sm font-medium text-destructive">{err}</p>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>

        {general && (
          <div role="alert" className="mt-5 flex gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p className="font-medium">{general}</p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
          <button type="submit" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lift">
            <CalcIcon className="size-5" aria-hidden="true" /> Calcular
          </button>
          <button type="button" onClick={p.onClear} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:border-primary/50">
            <Eraser className="size-5" aria-hidden="true" /> Limpiar
          </button>
        </div>
      </form>

      <section aria-labelledby={`${id}-res`} aria-live="polite" className="card-soft flex min-w-0 flex-col p-5 sm:p-8">
        <h3 id={`${id}-res`} className="text-xl font-semibold text-foreground">Resultados</h3>
        <div className="my-6 flex justify-center">
          <ShapeIllustration shape={p.shape} className="size-28" />
        </div>
        {p.result?.ok ? (
          <dl key={`${p.result.area}-${p.unit}`} className="animate-fade-up grid gap-4">
            <div className="rounded-2xl bg-secondary p-5">
              <dt className="text-sm font-medium text-muted-foreground">Área</dt>
              <dd className="mt-1 break-words text-2xl font-bold text-foreground sm:text-3xl">
                {formatNumber(p.result.area)} {p.unit}²
              </dd>
            </div>
            <div className="rounded-2xl bg-secondary p-5">
              <dt className="text-sm font-medium text-muted-foreground">Perímetro</dt>
              <dd className="mt-1 break-words text-2xl font-bold text-foreground sm:text-3xl">
                {formatNumber(p.result.perimeter)} {p.unit}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-center text-muted-foreground">
            {p.result ? "Corrige las medidas marcadas para ver los resultados." : "Ingresa las medidas y presiona «Calcular»."}
          </p>
        )}
      </section>
    </div>
  );
}

function result_errors(r: CalcResult | null): Record<string, string> {
  return r && !r.ok ? r.errors : {};
}
