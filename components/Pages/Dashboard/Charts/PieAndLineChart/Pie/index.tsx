import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";
import {
  ResponsiveContainer,
  PieChart,
  Pie as PieRecharts,
  Cell,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/constants/chartConfig";

interface IProps {
  data: any[];
}

export default function Pie({ data }: IProps) {
  const { batches } = useFilterContext();

  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  const renderCustomLabel = (entry: any) => {
    const percentage = `${((entry.value / totalValue) * 100).toFixed(1)}%`;
    const RADIAN = Math.PI / 180;
    const radius =
      entry.innerRadius + (entry.outerRadius - entry.innerRadius) * 0.5;
    const x = entry.cx + radius * Math.cos(-entry.midAngle * RADIAN);
    const y = entry.cy + radius * Math.sin(-entry.midAngle * RADIAN);

    const outerRadius = entry.outerRadius * 1.2;
    const xPercent =
      entry.cx + outerRadius * Math.cos(-entry.midAngle * RADIAN);
    const yPercent =
      entry.cy + outerRadius * Math.sin(-entry.midAngle * RADIAN);

    const fillColor = getBarColorByName(batches, entry.key);

    return (
      <>
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000"
        >
          {entry.value}
        </text>
        <text
          x={xPercent}
          y={yPercent}
          textAnchor="middle"
          dominantBaseline="central"
          fill={fillColor} // Usando a cor correspondente
        >
          {percentage}
        </text>
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <PieRecharts
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            label={renderCustomLabel}
            labelLine={false}
            animationDuration={700}
          >
            {data.map((entry: any, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColorByName(batches, entry.key)}
              />
            ))}
          </PieRecharts>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <ChartLegend
            verticalAlign="bottom"
            content={<ChartLegendContent />}
          />
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
