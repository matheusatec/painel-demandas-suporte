import { diasEntre } from '@/lib/datas';
import {
  SISTEMAS,
  STATUS,
  type Demanda,
  type FiltrosDemanda,
  type ResumoDemandas,
  type Sistema,
  type Status,
} from '@/types/demanda';

export function proximoId(demandas: Demanda[]): string {
  const maior = demandas.reduce((max, demanda) => {
    const numero = Number(demanda.id.replace('DEM-', ''));
    return Number.isNaN(numero) ? max : Math.max(max, numero);
  }, 0);
  return `DEM-${String(maior + 1).padStart(3, '0')}`;
}

export function estaAtrasada(demanda: Demanda, hoje: string): boolean {
  return (
    demanda.prioridade === 'Alta' &&
    demanda.status !== 'Resolvida' &&
    diasEntre(demanda.dataAbertura, hoje) > 7
  );
}

export function diasEmAberto(demanda: Demanda, hoje: string): number {
  return diasEntre(demanda.dataAbertura, hoje);
}

export function calcularResumo(demandas: Demanda[]): ResumoDemandas {
  const resolvidas = demandas.filter((d) => d.status === 'Resolvida' && d.dataResolucao);
  const somaDias = resolvidas.reduce(
    (soma, d) => soma + diasEntre(d.dataAbertura, d.dataResolucao as string),
    0,
  );

  return {
    abertas: demandas.filter((d) => d.status === 'Aberta').length,
    emAndamento: demandas.filter((d) => d.status === 'Em andamento').length,
    resolvidas: resolvidas.length,
    tempoMedioResolucao:
      resolvidas.length === 0 ? null : Math.round((somaDias / resolvidas.length) * 10) / 10,
  };
}

export function contarPorSistema(demandas: Demanda[]): { sistema: Sistema; total: number }[] {
  return SISTEMAS.map((sistema) => ({
    sistema,
    total: demandas.filter((d) => d.sistema === sistema).length,
  }));
}

export function contarPorStatus(demandas: Demanda[]): { status: Status; total: number }[] {
  return STATUS.map((status) => ({
    status,
    total: demandas.filter((d) => d.status === status).length,
  }));
}

export function filtrarDemandas(demandas: Demanda[], filtros: FiltrosDemanda): Demanda[] {
  const termo = filtros.texto.trim().toLowerCase();

  return demandas.filter((d) => {
    if (filtros.status !== 'Todos' && d.status !== filtros.status) return false;
    if (filtros.sistema !== 'Todos' && d.sistema !== filtros.sistema) return false;
    if (filtros.prioridade !== 'Todos' && d.prioridade !== filtros.prioridade) return false;
    if (!termo) return true;

    return [d.id, d.solicitante, d.setor, d.sistema, d.descricao]
      .some((campo) => campo.toLowerCase().includes(termo));
  });
}
