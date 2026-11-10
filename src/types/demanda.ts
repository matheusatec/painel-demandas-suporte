export const SISTEMAS = [
  'Protocolo',
  'Folha de Pagamento',
  'Contabilidade',
  'Compras',
  'Tributos',
] as const;

export const SETORES = [
  'Financeiro',
  'Recursos Humanos',
  'Operações',
  'Comercial',
  'Jurídico',
  'Atendimento',
] as const;

export const PRIORIDADES = ['Baixa', 'Média', 'Alta'] as const;

export const STATUS = ['Aberta', 'Em andamento', 'Resolvida'] as const;

export type Sistema = (typeof SISTEMAS)[number];
export type Setor = (typeof SETORES)[number];
export type Prioridade = (typeof PRIORIDADES)[number];
export type Status = (typeof STATUS)[number];

export interface Demanda {
  id: string;
  solicitante: string;
  setor: Setor;
  sistema: Sistema;
  descricao: string;
  prioridade: Prioridade;
  status: Status;
  dataAbertura: string;
  dataResolucao: string | null;
}

export interface FiltrosDemanda {
  texto: string;
  status: Status | 'Todos';
  sistema: Sistema | 'Todos';
  prioridade: Prioridade | 'Todos';
}

export interface ResumoDemandas {
  abertas: number;
  emAndamento: number;
  resolvidas: number;
  tempoMedioResolucao: number | null;
}
