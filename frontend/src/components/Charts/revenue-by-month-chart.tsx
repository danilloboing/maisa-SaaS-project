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
            <YAxis />
            {/* Tooltip for details */}
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(value)
              }
            />
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
