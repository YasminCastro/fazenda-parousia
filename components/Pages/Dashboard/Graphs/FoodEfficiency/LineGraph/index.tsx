import LineChartTooltip from "@/components/Global/CustomTooltip/LineChartTooltip";
import { useFilterContext } from "@/providers/FilterContext";
import formatBatchName from "@/utils/formatBatchName";
import { formatXAxis } from "@/utils/formatXAxis";
import { getBarColor, getBarColorByName } from "@/utils/getGraphColors";
import {
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LineChart,
  Line,
} from "recharts";

interface IProps {
  data: any[];
}

export default function LineGraph({ data }: IProps) {
  const { batches, selectedBatch } = useFilterContext();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis domain={["auto", "auto"]}>
          <Label
            value="eficiência alimentar"
            position="insideBottomLeft"
            angle={-90}
          />
        </YAxis>
        <Tooltip content={<LineChartTooltip />} />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <Brush
          dataKey="date"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
        />
        {selectedBatch !== "all" && (
          <Line
            type="monotone"
            dataKey="value"
            name={formatBatchName(selectedBatch, true)}
            stroke={getBarColorByName(batches, selectedBatch)}
            activeDot={{ r: 8 }}
          />
        )}

        {selectedBatch === "all" &&
          batches.map((item, index) => {
            let dataKey = formatBatchName(item.value, false, true);

            if (item.value === "all") {
              dataKey = "fazenda";
            }
            return (
              <Line
                type="monotone"
                dataKey={dataKey}
                name={item.label}
                fill={getBarColor(index)}
                key={item.label}
                activeDot={{ r: 8 }}
                stroke={getBarColor(index)}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainer>
  );
}
