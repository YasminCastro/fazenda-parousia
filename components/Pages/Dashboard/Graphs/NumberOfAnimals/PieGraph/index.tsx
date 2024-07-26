import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface IProps {
  data: any[];
}

export default function PieGraph({ data }: IProps) {
  const { batches } = useFilterContext();

  return (
    <div className="flex h-full w-full flex-row">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            label
            animationDuration={700}
          >
            {data.map((entry: any, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColorByName(batches, entry.key)}
              />
            ))}
          </Pie>
          <Tooltip />
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
