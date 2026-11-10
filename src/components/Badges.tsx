import type { Prioridade, Status } from '@/types/demanda';

const ESTILO_STATUS: Record<Status, string> = {
  Aberta: 'bg-amber-50 text-amber-800 ring-amber-200',
  'Em andamento': 'bg-sky-50 text-sky-800 ring-sky-200',
  Resolvida: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
};

const ESTILO_PRIORIDADE: Record<Prioridade, string> = {
  Baixa: 'bg-slate-100 text-slate-700 ring-slate-200',
  Média: 'bg-orange-50 text-orange-800 ring-orange-200',
  Alta: 'bg-red-50 text-red-700 ring-red-200',
};

const BASE = 'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset';

export function BadgeStatus({ status }: { status: Status }) {
  return <span className={`${BASE} ${ESTILO_STATUS[status]}`}>{status}</span>;
}

export function BadgePrioridade({ prioridade }: { prioridade: Prioridade }) {
  return <span className={`${BASE} ${ESTILO_PRIORIDADE[prioridade]}`}>{prioridade}</span>;
}
