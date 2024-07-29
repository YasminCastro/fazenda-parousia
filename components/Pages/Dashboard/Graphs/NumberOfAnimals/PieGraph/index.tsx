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
    let label = entry.value;
    if (data.length !== 1) {
      label = `${((entry.value / totalValue) * 100).toFixed(1)}%`;
    }
    return label;
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
