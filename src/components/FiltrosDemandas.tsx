import { Search } from 'lucide-react';
import { PRIORIDADES, STATUS, SISTEMAS, type FiltrosDemanda } from '@/types/demanda';

interface FiltrosDemandasProps {
  filtros: FiltrosDemanda;
  onAlterar: (parcial: Partial<FiltrosDemanda>) => void;
}

const CAMPO =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20';

export function FiltrosDemandas({ filtros, onAlterar }: FiltrosDemandasProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <label className="relative xl:col-span-1">
        <span className="sr-only">Buscar demandas</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={filtros.texto}
          onChange={(e) => onAlterar({ texto: e.target.value })}
          placeholder="Buscar por número, solicitante, descrição..."
          className={`${CAMPO} pl-9`}
        />
      </label>

      <label>
        <span className="sr-only">Filtrar por status</span>
        <select
          value={filtros.status}
          onChange={(e) => onAlterar({ status: e.target.value as FiltrosDemanda['status'] })}
          className={CAMPO}
        >
          <option value="Todos">Todos os status</option>
          {STATUS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Filtrar por sistema</span>
        <select
          value={filtros.sistema}
          onChange={(e) => onAlterar({ sistema: e.target.value as FiltrosDemanda['sistema'] })}
          className={CAMPO}
        >
          <option value="Todos">Todos os sistemas</option>
          {SISTEMAS.map((sistema) => (
            <option key={sistema} value={sistema}>{sistema}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="sr-only">Filtrar por prioridade</span>
        <select
          value={filtros.prioridade}
          onChange={(e) => onAlterar({ prioridade: e.target.value as FiltrosDemanda['prioridade'] })}
          className={CAMPO}
        >
          <option value="Todos">Todas as prioridades</option>
          {PRIORIDADES.map((prioridade) => (
            <option key={prioridade} value={prioridade}>{prioridade}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
