import PieChartTooltip from "@/components/Global/CustomTooltip/PieChartTooltip";
import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface IProps {
  data: any[];
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
      <div className="w-1/12">
        {data.map((entry: any, index) => (
          <div key={index} className="mb-2 flex items-center">
            <span
              className="mr-2 inline-block h-4 w-4"
              style={{
                backgroundColor: getBarColorByName(batches, entry.key),
              }}
            ></span>
            <p style={{ margin: 0 }}>{entry.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
