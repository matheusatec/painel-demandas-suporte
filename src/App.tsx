import { useCallback, useMemo, useState } from 'react';
import { CheckCircle2, CircleDot, Clock, Download, LifeBuoy, Plus, Timer } from 'lucide-react';
import { CartaoMetrica } from '@/components/CartaoMetrica';
import { FiltrosDemandas } from '@/components/FiltrosDemandas';
import { FormularioDemanda } from '@/components/FormularioDemanda';
import { GraficoBarras } from '@/components/GraficoBarras';
import { GraficoPizza } from '@/components/GraficoPizza';
import { TabelaDemandas } from '@/components/TabelaDemandas';
import { gerarDemandasIniciais } from '@/data/demandasIniciais';
import { exportarDemandasCsv } from '@/lib/exportarCsv';
import { hojeISO } from '@/lib/datas';
import {
  calcularResumo,
  contarPorSistema,
  contarPorStatus,
  filtrarDemandas,
  proximoId,
} from '@/lib/demandas';
import type { Demanda, FiltrosDemanda, Status } from '@/types/demanda';

const COR_STATUS: Record<Status, string> = {
  Aberta: '#f59e0b',
  'Em andamento': '#0ea5e9',
  Resolvida: '#10b981',
};

const FILTROS_INICIAIS: FiltrosDemanda = {
  texto: '',
  status: 'Todos',
  sistema: 'Todos',
  prioridade: 'Todos',
};

const formatarTempoMedio = (dias: number | null) =>
  dias === null
    ? '—'
    : dias.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function App() {
  const [hoje] = useState(() => hojeISO());
  const [demandas, setDemandas] = useState<Demanda[]>(() => gerarDemandasIniciais(hoje));
  const [filtros, setFiltros] = useState<FiltrosDemanda>(FILTROS_INICIAIS);
  const [formularioAberto, setFormularioAberto] = useState(false);

  const fecharFormulario = useCallback(() => setFormularioAberto(false), []);

  const resumo = useMemo(() => calcularResumo(demandas), [demandas]);
  const dadosSistema = useMemo(
    () =>
      contarPorSistema(demandas)
        .map((item) => ({ rotulo: item.sistema, total: item.total }))
        .sort((a, b) => b.total - a.total),
    [demandas],
  );
  const dadosStatus = useMemo(
    () =>
      contarPorStatus(demandas).map((item) => ({
        rotulo: item.status,
        total: item.total,
        cor: COR_STATUS[item.status],
      })),
    [demandas],
  );
  const demandasVisiveis = useMemo(
    () =>
      filtrarDemandas(demandas, filtros).sort(
        (a, b) => b.dataAbertura.localeCompare(a.dataAbertura) || b.id.localeCompare(a.id),
      ),
    [demandas, filtros],
  );

  const adicionarDemanda = (nova: Omit<Demanda, 'id'>) => {
    setDemandas((atuais) => [{ id: proximoId(atuais), ...nova }, ...atuais]);
    setFormularioAberto(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <LifeBuoy className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-slate-900">
                Painel de Suporte
              </h1>
              <p className="text-sm text-slate-600">Acompanhamento de demandas dos sistemas internos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportarDemandasCsv(demandas)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Exportar CSV
            </button>
            <button
              type="button"
              onClick={() => setFormularioAberto(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nova demanda
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8 lg:px-8">
        <section aria-label="Resumo" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <CartaoMetrica
            titulo="Abertas"
            valor={String(resumo.abertas)}
            descricao="Aguardando início do atendimento"
            icone={CircleDot}
            tom="amber"
          />
          <CartaoMetrica
            titulo="Em andamento"
            valor={String(resumo.emAndamento)}
            descricao="Sendo tratadas pela equipe"
            icone={Clock}
            tom="sky"
          />
          <CartaoMetrica
            titulo="Resolvidas"
            valor={String(resumo.resolvidas)}
            descricao="Concluídas até hoje"
            icone={CheckCircle2}
            tom="emerald"
          />
          <CartaoMetrica
            titulo="Tempo médio de resolução"
            valor={formatarTempoMedio(resumo.tempoMedioResolucao)}
            descricao="Dias entre abertura e resolução"
            icone={Timer}
            tom="slate"
          />
        </section>

        <section aria-label="Gráficos" className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
            <h2 className="text-base font-semibold text-slate-900">Demandas por sistema</h2>
            <p className="mb-6 text-sm text-slate-500">Quantidade total de demandas em cada sistema</p>
            <GraficoBarras dados={dadosSistema} />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <h2 className="text-base font-semibold text-slate-900">Demandas por status</h2>
            <p className="mb-6 text-sm text-slate-500">Distribuição atual das demandas</p>
            <GraficoPizza dados={dadosStatus} />
          </div>
        </section>

        <section aria-label="Lista de demandas" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Demandas</h2>
              <p className="text-sm text-slate-500">
                Mostrando {demandasVisiveis.length} de {demandas.length} demandas
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Linhas em vermelho: prioridade Alta, ainda não resolvida, aberta há mais de 7 dias
            </p>
          </div>
          <div className="mb-5">
            <FiltrosDemandas filtros={filtros} onAlterar={(parcial) => setFiltros((atuais) => ({ ...atuais, ...parcial }))} />
          </div>
          <TabelaDemandas demandas={demandasVisiveis} hoje={hoje} />
        </section>
      </main>

      {formularioAberto && (
        <FormularioDemanda hoje={hoje} onSalvar={adicionarDemanda} onFechar={fecharFormulario} />
      )}
    </div>
  );
}

export default App;
