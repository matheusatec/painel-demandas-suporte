interface GraficoPizzaProps {
  dados: { rotulo: string; total: number; cor: string }[];
}

export function GraficoPizza({ dados }: GraficoPizzaProps) {
  const total = dados.reduce((soma, item) => soma + item.total, 0);

  if (total === 0) {
    return <p className="py-16 text-center text-sm text-slate-500">Nenhuma demanda cadastrada.</p>;
  }

  let acumulado = 0;
  const fatias = dados
    .filter((item) => item.total > 0)
    .map((item) => {
      const inicio = (acumulado / total) * 360;
      acumulado += item.total;
      return `${item.cor} ${inicio}deg ${(acumulado / total) * 360}deg`;
    });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
      <div
        className="relative h-48 w-48 shrink-0 rounded-full shadow-inner transition-transform duration-300 hover:scale-105"
        style={{ background: `conic-gradient(${fatias.join(', ')})` }}
        role="img"
        aria-label={dados.map((d) => `${d.rotulo}: ${d.total}`).join(', ')}
      >
        <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-white shadow-sm">
          <span className="text-2xl font-semibold text-slate-900">{total}</span>
          <span className="text-xs text-slate-500">demandas</span>
        </div>
      </div>

      <ul className="w-full max-w-xs space-y-3">
        {dados.map((item) => (
          <li key={item.rotulo} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-700">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.cor }} aria-hidden="true" />
              {item.rotulo}
            </span>
            <span className="font-medium text-slate-900">
              {item.total}
              <span className="ml-1 text-xs font-normal text-slate-500">
                ({Math.round((item.total / total) * 100)}%)
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
