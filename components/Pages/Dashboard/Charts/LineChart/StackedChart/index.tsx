import kpiMapping from "@/constants/kpiMapping";
import { IMilkRevenue } from "@/interfaces/Graphs/milkRevenue";
import { useFilterContext } from "@/providers/FilterContext";
import { formatTickDate } from "@/utils/formatXAxis";
import { getBarColorByName } from "@/utils/getGraphColors";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import { chartConfig } from "@/constants/chartConfig";

interface IProps {
  data: IMilkRevenue[];
  isStackedChart: boolean;
}

export default function StackedChart({ data, isStackedChart }: IProps) {
  const { batches, selectedBatch, selectedCardIndex } = useFilterContext();
  const label = kpiMapping[selectedCardIndex].labelY;

  const batchInfo = batches.find((batch) => batch.value === selectedBatch);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={data}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Brush dataKey="date" height={20} />
          <XAxis dataKey="date" tickFormatter={formatTickDate} />
          <YAxis>
            <Label value={label} position="insideBottomLeft" angle={-90} />
          </YAxis>
          {selectedBatch === "all" && (
            <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
          )}

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />

          {selectedBatch === "all" ? (
            batches.map((item) => {
              if (item.value === "all") {
                return;
              }
              return (
                <Bar
                  dataKey={item.key}
                  name={item.label}
                  fill={item.color}
                  key={item.label}
                  stackId={isStackedChart ? "a" : undefined}
                />
              );
            })
          ) : (
            <Bar
              dataKey="value"
              fill={
                (batchInfo && batchInfo.color) ||
                getBarColorByName(batches, selectedBatch)
              }
              stackId={isStackedChart ? "a" : undefined}
            />
          )}
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
