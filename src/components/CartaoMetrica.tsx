import type { LucideIcon } from 'lucide-react';

interface CartaoMetricaProps {
  titulo: string;
  valor: string;
  descricao: string;
  icone: LucideIcon;
  tom: 'slate' | 'amber' | 'sky' | 'emerald';
}

const TONS: Record<CartaoMetricaProps['tom'], string> = {
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-700',
  sky: 'bg-sky-100 text-sky-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export function CartaoMetrica({ titulo, valor, descricao, icone: Icone, tom }: CartaoMetricaProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-600">{titulo}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${TONS[tom]}`}>
          <Icone className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{valor}</p>
      <p className="mt-1 text-xs text-slate-500">{descricao}</p>
    </div>
  );
}
