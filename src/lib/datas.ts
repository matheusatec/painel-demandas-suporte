const pad = (valor: number) => String(valor).padStart(2, '0');

export function hojeISO(): string {
  const agora = new Date();
  return `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
}

export function deslocarDias(dataIso: string, dias: number): string {
  const [ano, mes, dia] = dataIso.split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia + dias));
  return `${data.getUTCFullYear()}-${pad(data.getUTCMonth() + 1)}-${pad(data.getUTCDate())}`;
}

export function diasEntre(inicioIso: string, fimIso: string): number {
  return Math.round((Date.parse(fimIso) - Date.parse(inicioIso)) / 86_400_000);
}

export function formatarData(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
}
