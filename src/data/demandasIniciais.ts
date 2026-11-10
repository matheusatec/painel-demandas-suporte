import type { Demanda, Prioridade, Sistema, Setor, Status } from '@/types/demanda';
import { deslocarDias } from '@/lib/datas';

type DemandaSemDatas = [
  solicitante: string,
  setor: Setor,
  sistema: Sistema,
  descricao: string,
  prioridade: Prioridade,
  status: Status,
  aberturaHaDias: number,
  duracaoDias: number | null,
];

const DEMANDAS_FICTICIAS: DemandaSemDatas[] = [
  ['Helena Duarte', 'Financeiro', 'Protocolo', 'Protocolo não gera número de recibo para anexos em PDF', 'Alta', 'Aberta', 12, null],
  ['Rafael Cordeiro', 'Recursos Humanos', 'Folha de Pagamento', 'Cálculo de horas extras divergente no fechamento de outubro', 'Alta', 'Em andamento', 9, null],
  ['Beatriz Nogueira', 'Operações', 'Compras', 'Pedido de compra fica preso na etapa de aprovação', 'Média', 'Resolvida', 20, 4],
  ['Tiago Albuquerque', 'Comercial', 'Contabilidade', 'Relatório de conciliação não exporta para Excel', 'Baixa', 'Resolvida', 15, 6],
  ['Larissa Vieira', 'Jurídico', 'Tributos', 'Guia de imposto com código de barras inválido', 'Alta', 'Aberta', 3, null],
  ['Marcos Pinheiro', 'Atendimento', 'Protocolo', 'Busca de processos não retorna resultados com CPF formatado', 'Média', 'Resolvida', 8, 2],
  ['Camila Teixeira', 'Financeiro', 'Folha de Pagamento', 'Holerite não disponível para download no portal', 'Média', 'Em andamento', 5, null],
  ['Eduardo Macedo', 'Operações', 'Protocolo', 'Histórico de tramitação exibe movimentações duplicadas', 'Baixa', 'Aberta', 18, null],
  ['Patrícia Lacerda', 'Recursos Humanos', 'Contabilidade', 'Lançamento de provisão com centro de custo incorreto', 'Alta', 'Resolvida', 25, 10],
  ['Gustavo Ramalho', 'Comercial', 'Tributos', 'Alíquota de ISS não aplicada em notas de serviço', 'Alta', 'Em andamento', 14, null],
  ['Juliana Prado', 'Atendimento', 'Protocolo', 'Lentidão ao abrir a lista de protocolos da filial', 'Média', 'Aberta', 2, null],
  ['Henrique Batista', 'Financeiro', 'Contabilidade', 'Plano de contas sem permissão de edição para a equipe', 'Baixa', 'Resolvida', 30, 12],
  ['Fernanda Lopes', 'Operações', 'Folha de Pagamento', 'Descontos de vale-transporte não aparecem na simulação', 'Alta', 'Aberta', 10, null],
  ['Diego Carvalho', 'Jurídico', 'Protocolo', 'Processo anexado com versão antiga do modelo de documento', 'Baixa', 'Resolvida', 7, 3],
  ['Renata Moura', 'Comercial', 'Protocolo', 'Protocolo de entrada sem campo para unidade remetente', 'Média', 'Aberta', 6, null],
  ['Lucas Fontana', 'Recursos Humanos', 'Folha de Pagamento', 'Retenção de INSS calculada sobre o valor bruto para RPA', 'Alta', 'Em andamento', 17, null],
  ['Vanessa Brito', 'Atendimento', 'Contabilidade', 'Exportação do balancete sem linha de totalizadores', 'Média', 'Resolvida', 11, 5],
  ['Otávio Sampaio', 'Financeiro', 'Compras', 'Limite de aprovação não respeita a alçada do gestor', 'Alta', 'Resolvida', 22, 8],
  ['Carla Mendes', 'Operações', 'Protocolo', 'Relatório de protocolos não agrupa por competência', 'Média', 'Em andamento', 4, null],
  ['Bruno Serra', 'Comercial', 'Folha de Pagamento', 'Reajuste salarial não replica no cenário simulado', 'Baixa', 'Resolvida', 13, 1],
  ['Simone Araújo', 'Jurídico', 'Protocolo', 'Tramitação sem registro da data de ciência', 'Alta', 'Aberta', 8, null],
  ['Leandro Viana', 'Atendimento', 'Compras', 'Ordem de compra sem campo de centro de custo', 'Média', 'Aberta', 1, null],
  ['Priscila Campos', 'Recursos Humanos', 'Folha de Pagamento', 'Rubrica de adicional noturno com percentual fixo', 'Alta', 'Resolvida', 19, 7],
  ['Rodrigo Esteves', 'Financeiro', 'Tributos', 'DARF gerada com competência do mês anterior', 'Alta', 'Aberta', 40, null],
  ['Melissa Tavares', 'Operações', 'Contabilidade', 'Integração de notas fiscais atrasada desde ontem', 'Média', 'Em andamento', 1, null],
];

export function gerarDemandasIniciais(hoje: string): Demanda[] {
  return DEMANDAS_FICTICIAS.map(
    ([solicitante, setor, sistema, descricao, prioridade, status, aberturaHaDias, duracaoDias], indice) => {
      const dataAbertura = deslocarDias(hoje, -aberturaHaDias);
      return {
        id: `DEM-${String(indice + 1).padStart(3, '0')}`,
        solicitante,
        setor,
        sistema,
        descricao,
        prioridade,
        status,
        dataAbertura,
        dataResolucao: duracaoDias === null ? null : deslocarDias(dataAbertura, duracaoDias),
      };
    },
  );
}
