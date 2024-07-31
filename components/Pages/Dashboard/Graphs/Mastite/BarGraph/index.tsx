import BarChartTooltip from "@/components/Global/CustomTooltip/BarChartTooltip";
import { IMastite } from "@/interfaces/Graphs/mastite";
import { useFilterContext } from "@/providers/FilterContext";
import { formatXAxis } from "@/utils/formatXAxis";
import { getBarColor, getBarColorByName } from "@/utils/getGraphColors";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface IProps {
  data: IMastite[];
  isStackedChart: boolean;
}

export default function BarGraph({ data, isStackedChart }: IProps) {
  const { batches, selectedBatch } = useFilterContext();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <YAxis>
          <Label value="quantidade" position="insideBottomLeft" angle={-90} />
        </YAxis>
        <Tooltip content={<BarChartTooltip />} />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush
          dataKey="date"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
        />
        <Bar
          dataKey="mastite"
          stackId="a"
          name="Mastite"
          fill={getBarColor(4)}
        />
        <Bar
          dataKey="carenciaMastite"
          stackId={isStackedChart ? "a" : undefined}
          name="Carência Mastite"
          fill={getBarColor(0)}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
