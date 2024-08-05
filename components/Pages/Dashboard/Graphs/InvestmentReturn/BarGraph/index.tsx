import BarChartTooltip from "@/components/Global/CustomTooltip/BarChartTooltip";
import { IInvestmentReturn } from "@/interfaces/Graphs/investmentReturn";
import { useFilterContext } from "@/providers/FilterContext";
import formatBatchName from "@/utils/formatBatchName";
import { formatTickDate } from "@/utils/formatXAxis";
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
import { min } from "lodash";
import { AxisDomain } from "recharts/types/util/types";

interface IProps {
  data: IInvestmentReturn[];
  isStackedChart: boolean;
}

export default function BarGraph({ data, isStackedChart }: IProps) {
  const { batches, selectedBatch } = useFilterContext();

  const getMinValueFromLotes = (data: any[]): number => {
    const lotValues = data.flatMap((item) =>
      Object.keys(item)
        .filter((key: any) => key !== "date")
        .map((key) => item[key]),
    );
    return Math.floor(min(lotValues));
  };

  const minValue = getMinValueFromLotes(data);
  const yAxisDomain: AxisDomain = [Math.max(0, minValue - 20), "dataMax"];

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
        <XAxis dataKey="date" tickFormatter={formatTickDate} />
        <YAxis domain={yAxisDomain}>
          <Label value="%" position="insideLeft" angle={-90} />
        </YAxis>
        <Tooltip content={<BarChartTooltip />} />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush
          dataKey="date"
          height={30}
          stroke={getBarColorByName(batches, selectedBatch)}
          tickFormatter={formatTickDate}
        />
        {selectedBatch !== "all" && (
          <Bar
            dataKey="value"
            name={formatBatchName(selectedBatch, true)}
            fill={getBarColorByName(batches, selectedBatch)}
            stackId={isStackedChart ? "a" : undefined}
          />
        )}
        {selectedBatch === "all" &&
          batches.map((item, index) => {
            if (item.value === "all") {
              return;
            }
            return (
              <Bar
                dataKey={formatBatchName(item.value, false, true)}
                name={item.label}
                fill={getBarColor(index)}
                key={item.label}
                stackId={isStackedChart ? "a" : undefined}
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
}
