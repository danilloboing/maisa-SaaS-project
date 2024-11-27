import {
    Area,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    ChartContainer,
    ChartTooltipContent,
  } from '@/components/ui/chart';
  import { ChartProps } from '@/types/components';
  
  interface AreaChartProps extends ChartProps {
    // Customiza o título da tooltip
    tooltipFormatter?: (value: any) => string;
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
    return (
      <Card className='h-full w-full'>
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
          <ChartContainer config={dataConfig}>
            <ResponsiveContainer width='99%' height={300}>
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
                  content={<ChartTooltipContent indicator='dot' />}
                  cursor={false}
                  formatter={tooltipFormatter || ((value) => value)}
                />
                {Object.keys(dataConfig).map((key) => (
                  <Area
                    key={key}
                    dataKey={key}
                    type='natural'
                    fill={dataConfig[key].color}
                    fillOpacity={0.4}
                    stroke={dataConfig[key].color}
                    stackId='a'
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