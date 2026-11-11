import type { Demanda } from '@/types/demanda';

const CABECALHO = [
  'numero',
  'solicitante',
  'setor',
  'sistema',
  'descricao',
  'prioridade',
  'status',
  'data_abertura',
  'data_resolucao',
];

const escaparCsv = (valor: string): string => {
  if (/[",\n\r]/.test(valor)) {
    return `"${valor.replace(/"/g, '""')}"`;
  }
  return valor;
};

export function exportarDemandasCsv(demandas: Demanda[], nomeArquivo = 'demandas.csv'): void {
  const linhas = demandas.map((d) =>
    [
      d.id,
      d.solicitante,
      d.setor,
      d.sistema,
      d.descricao,
      d.prioridade,
      d.status,
      d.dataAbertura,
      d.dataResolucao ?? '',
    ]
      .map(escaparCsv)
      .join(','),
  );

  const csv = [CABECALHO.join(','), ...linhas].join('\r\n');
  const conteudo = `\uFEFF${csv}`;
  const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
