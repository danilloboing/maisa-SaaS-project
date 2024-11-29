"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RevenueByMonthData } from "@/types/components";

export function RevenueByMonthChart({ data }: { data: RevenueByMonthData[] }) {
  // Tooltip personalizado
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      const { month, totalRevenue } = payload[0].payload;
      const formattedRevenue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalRevenue);

      return (
        <div className="bg-white p-3 rounded shadow-md">
          <p className="text-sm font-bold text-gray-800">{month}</p>
          <p className="text-sm text-gray-700">
            Faturamento:{" "}
            <span className="font-semibold text-gray-900">
              {formattedRevenue}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Faturamento no Mês</CardTitle>
        <CardDescription>Total de faturamento por mês</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="99%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Grid for better readability */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* X-Axis for Months */}
            <XAxis
              dataKey="month"
              tickFormatter={(month) =>
                new Date(`${month}-01`).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }
            />
            {/* Y-Axis for Revenue */}
            <YAxis tickFormatter={(value) => `$${value}`} />
            {/* Tooltip for details */}
            <Tooltip content={<CustomTooltip />} />
            {/* Area definition */}
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
