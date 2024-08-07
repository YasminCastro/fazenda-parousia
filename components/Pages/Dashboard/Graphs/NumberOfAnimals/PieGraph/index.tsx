import PieChartTooltip from "@/components/Global/CustomTooltip/PieChartTooltip";
import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import LegendPieChart from "./Legend";
import { INumberAnimals } from "@/interfaces/Graphs/animalsCount";

interface IProps {
  data: INumberAnimals[];
}

export default function PieGraph({ data }: IProps) {
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
    <div className="flex h-full w-full flex-row">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
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
          </Pie>
          <Tooltip content={<PieChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <LegendPieChart data={data} />
    </div>
  );
}
