import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { PRIORIDADES, SETORES, SISTEMAS, STATUS, type Demanda } from '@/types/demanda';

type NovaDemanda = Omit<Demanda, 'id'>;

interface FormularioDemandaProps {
  hoje: string;
  onSalvar: (demanda: NovaDemanda) => void;
  onFechar: () => void;
}

const CAMPO =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20';
const ROTULO = 'mb-1.5 block text-sm font-medium text-slate-700';

export function FormularioDemanda({ hoje, onSalvar, onFechar }: FormularioDemandaProps) {
  const [solicitante, setSolicitante] = useState('');
  const [setor, setSetor] = useState<NovaDemanda['setor']>(SETORES[0]);
  const [sistema, setSistema] = useState<NovaDemanda['sistema']>(SISTEMAS[0]);
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState<NovaDemanda['prioridade']>('Média');
  const [status, setStatus] = useState<NovaDemanda['status']>('Aberta');
  const [dataAbertura, setDataAbertura] = useState(hoje);
  const [dataResolucao, setDataResolucao] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const aoPressionarTecla = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onFechar();
    };
    window.addEventListener('keydown', aoPressionarTecla);
    return () => window.removeEventListener('keydown', aoPressionarTecla);
  }, [onFechar]);

  const aoEnviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!solicitante.trim() || !descricao.trim()) {
      setErro('Preencha o solicitante e a descrição da demanda.');
      return;
    }
    if (dataAbertura > hoje) {
      setErro('A data de abertura não pode ser no futuro.');
      return;
    }
    if (status === 'Resolvida') {
      if (!dataResolucao) {
        setErro('Informe a data de resolução para demandas resolvidas.');
        return;
      }
      if (dataResolucao < dataAbertura || dataResolucao > hoje) {
        setErro('A data de resolução deve estar entre a abertura e hoje.');
        return;
      }
    }

    onSalvar({
      solicitante: solicitante.trim(),
      setor,
      sistema,
      descricao: descricao.trim(),
      prioridade,
      status,
      dataAbertura,
      dataResolucao: status === 'Resolvida' ? dataResolucao : null,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-formulario"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 id="titulo-formulario" className="text-lg font-semibold text-slate-900">Nova demanda</h2>
          <button
            type="button"
            onClick={onFechar}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Fechar formulário"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={aoEnviar} className="space-y-5 px-6 py-6" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="solicitante" className={ROTULO}>Solicitante</label>
              <input
                id="solicitante"
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
                placeholder="Nome de quem pediu"
                className={CAMPO}
              />
            </div>
            <div>
              <label htmlFor="setor" className={ROTULO}>Setor</label>
              <select id="setor" value={setor} onChange={(e) => setSetor(e.target.value as NovaDemanda['setor'])} className={CAMPO}>
                {SETORES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="sistema" className={ROTULO}>Sistema</label>
              <select id="sistema" value={sistema} onChange={(e) => setSistema(e.target.value as NovaDemanda['sistema'])} className={CAMPO}>
                {SISTEMAS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="prioridade" className={ROTULO}>Prioridade</label>
              <select id="prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value as NovaDemanda['prioridade'])} className={CAMPO}>
                {PRIORIDADES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="status" className={ROTULO}>Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as NovaDemanda['status']);
                  setErro(null);
                }}
                className={CAMPO}
              >
                {STATUS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="data-abertura" className={ROTULO}>Data de abertura</label>
              <input
                id="data-abertura"
                type="date"
                value={dataAbertura}
                max={hoje}
                onChange={(e) => setDataAbertura(e.target.value)}
                className={CAMPO}
              />
            </div>
            {status === 'Resolvida' && (
              <div className="sm:col-span-2 sm:max-w-xs">
                <label htmlFor="data-resolucao" className={ROTULO}>Data de resolução</label>
                <input
                  id="data-resolucao"
                  type="date"
                  value={dataResolucao}
                  min={dataAbertura}
                  max={hoje}
                  onChange={(e) => setDataResolucao(e.target.value)}
                  className={CAMPO}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="descricao" className={ROTULO}>Descrição</label>
            <textarea
              id="descricao"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o problema ou a solicitação"
              className={`${CAMPO} resize-none`}
            />
          </div>

          {erro && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-200">
              {erro}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onFechar}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-[0.98]"
            >
              Adicionar demanda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
