import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceStatusData } from "@/types/components";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ServicesByStatusChart({ data }: { data: ServiceStatusData[] }) {
  // Tooltip personalizado
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((sum, entry) => sum + entry.total, 0);
      const { name, value } = payload[0];
      const percentage = ((value / total) * 100).toFixed(2);

      return (
        <div className="bg-white p-3 rounded shadow-md">
          <p className="text-sm font-bold text-gray-800">{name}</p>
          <p className="text-sm text-gray-700">
            Total: <span className="font-semibold text-gray-900">{value}</span>
          </p>
          <p className="text-sm text-gray-700">
            Porcentagem:{" "}
            <span className="font-semibold text-gray-900">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Serviços por Status</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            {/* Pie definition */}
            <Pie
              data={data}
              dataKey="total"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            {/* Tooltip with custom implementation */}
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
