import { SHAPES, type ShapeId } from "@/lib/geometry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShapeIllustration } from "./ShapeIllustration";

const ORDER: ShapeId[] = ["cuadrado", "rectangulo", "triangulo", "circulo"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (shape: ShapeId) => void;
}

export function FigurePicker({ open, onOpenChange, onPick }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="card-soft max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-5 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground sm:text-2xl">
            ¿Qué figura quieres calcular?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Elige una figura y la calculadora mostrará las medidas que necesitas ingresar.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 sm:gap-4" role="listbox" aria-label="Figuras disponibles">
          {ORDER.map((s) => (
            <button
              key={s}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => {
                onPick(s);
                onOpenChange(false);
              }}
              className="focus-ring group flex min-h-11 items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
            >
              <ShapeIllustration shape={s} className="size-16 shrink-0 transition-transform group-hover:scale-105" />
              <span className="min-w-0">
                <span className="block text-lg font-semibold text-foreground">{SHAPES[s].name}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{SHAPES[s].description}</span>
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
