import { AreaChart } from "./services-chart";

export function AtendimentosChart({ data }: any) {
  const config = {
    total: {
      label: "Atendimentos",
      color: "hsl(var(--chart-1))",
    },
    month: {
      label: "Mês",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <AreaChart
      data={data}
      dataConfig={config}
      xAxisKey="month"
      title="Atendimentos"
      description="Total de atendimentos por mês"
    />
  );
}
