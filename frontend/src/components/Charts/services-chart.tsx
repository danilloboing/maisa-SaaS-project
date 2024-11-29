import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ChartProps } from "@/types/components";

interface AreaChartProps extends ChartProps {
  // Customiza o título da tooltip
  tooltipFormatter?: (value: any, name: string, entry?: any) => string;
  // Customiza o eixo X
  xAxisTickFormatter?: (value: any) => string;
  // Adiciona a legenda ao gráfico
  showLegend?: boolean;
}

export function AreaChart({
  title,
  description,
  data,
  dataConfig,
  xAxisKey,
  tooltipFormatter,
  xAxisTickFormatter,
  showLegend = false,
}: AreaChartProps) {
  // Tooltip personalizado
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-md">
          <p className="text-sm font-bold mb-2 text-gray-800">
            {label || "Detalhes"}
          </p>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center mb-1">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              <p className="text-sm text-gray-700">
                {dataConfig[item.dataKey]?.label || item.name}:{" "}
                <span className="font-semibold text-gray-900">
                  {tooltipFormatter
                    ? tooltipFormatter(item.value, item.name, item)
                    : item.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer config={dataConfig}>
          <ResponsiveContainer width="99%" height={300}>
            <RechartsAreaChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={xAxisTickFormatter || ((value) => value)}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              />
              {Object.keys(dataConfig).map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={dataConfig[key].color}
                  fillOpacity={0.4}
                  stroke={dataConfig[key].color}
                  stackId="a"
                />
              ))}
              {showLegend && <Legend />}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
