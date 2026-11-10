import { AlertTriangle } from 'lucide-react';
import { BadgePrioridade, BadgeStatus } from '@/components/Badges';
import { diasEmAberto, estaAtrasada } from '@/lib/demandas';
import { formatarData } from '@/lib/datas';
import type { Demanda } from '@/types/demanda';

interface TabelaDemandasProps {
  demandas: Demanda[];
  hoje: string;
}

const CABECALHOS = ['Número', 'Solicitante', 'Sistema', 'Descrição', 'Prioridade', 'Status', 'Abertura', 'Resolução'];

export function TabelaDemandas({ demandas, hoje }: TabelaDemandasProps) {
  if (demandas.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
        Nenhuma demanda encontrada com os filtros atuais.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {CABECALHOS.map((titulo) => (
              <th key={titulo} scope="col" className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {demandas.map((demanda) => {
            const atrasada = estaAtrasada(demanda, hoje);
            return (
              <tr
                key={demanda.id}
                className={`transition-colors duration-150 ${
                  atrasada ? 'bg-red-50/70 hover:bg-red-50' : 'hover:bg-slate-50'
                }`}
              >
                <td className={`whitespace-nowrap px-4 py-3 font-medium text-slate-900 ${atrasada ? 'border-l-4 border-red-500' : ''}`}>
                  {demanda.id}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{demanda.solicitante}</p>
                  <p className="text-xs text-slate-500">{demanda.setor}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">{demanda.sistema}</td>
                <td className="max-w-xs px-4 py-3 text-slate-700">
                  <p>{demanda.descricao}</p>
                  {atrasada && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-700">
                      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                      Alta prioridade aberta há {diasEmAberto(demanda, hoje)} dias
                    </p>
                  )}
                </td>
                <td className="px-4 py-3"><BadgePrioridade prioridade={demanda.prioridade} /></td>
                <td className="px-4 py-3"><BadgeStatus status={demanda.status} /></td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatarData(demanda.dataAbertura)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                  {demanda.dataResolucao ? formatarData(demanda.dataResolucao) : <span className="text-slate-400">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
