interface GraficoBarrasProps {
  dados: { rotulo: string; total: number }[];
}

export function GraficoBarras({ dados }: GraficoBarrasProps) {
  const maximo = Math.max(1, ...dados.map((d) => d.total));

  return (
    <div className="flex h-64 items-end gap-3 sm:gap-4">
      {dados.map((item) => {
        const altura = (item.total / maximo) * 100;
        return (
          <div key={item.rotulo} className="flex h-full min-w-0 flex-1 flex-col justify-end">
            <span className="mb-1.5 text-center text-sm font-semibold text-slate-800">{item.total}</span>
            <div className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-teal-600 transition-all duration-500 ease-out hover:bg-teal-500"
                style={{ height: `${altura}%`, minHeight: item.total > 0 ? '4px' : '0' }}
                title={`${item.rotulo}: ${item.total}`}
              />
            </div>
            <span className="mt-2 truncate text-center text-xs text-slate-600" title={item.rotulo}>
              {item.rotulo}
            </span>
          </div>
        );
      })}
    </div>
  );
}
