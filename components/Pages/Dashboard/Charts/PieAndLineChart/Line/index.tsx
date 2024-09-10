import { useFilterContext } from "@/providers/FilterContext";
import { getBarColorByName } from "@/utils/getGraphColors";
import {
  LineChart,
  Line as LineRecharts,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/constants/chartConfig";
import kpiMapping from "@/constants/kpiMapping";
import { formatTickDate } from "@/utils/formatXAxis";

interface IProps {
  data: any[];
}

export default function Line({ data }: IProps) {
  const { batches, selectedBatch, selectedCardIndex } = useFilterContext();
  const label = kpiMapping[selectedCardIndex].labelY;

  const batchInfo = batches.find((batch) => batch.value === selectedBatch);

  const minValue = Math.min(...data.map((item) => item.value));

  const minDomain = minValue - minValue * 0.2;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
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
          <YAxis domain={[minDomain, "auto"]}>
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
                <LineRecharts
                  dataKey={item.key}
                  name={item.label}
                  fill={item.color}
                  key={item.label}
                  stroke={item.color}
                />
              );
            })
          ) : (
            <LineRecharts
              dataKey="value"
              fill={
                (batchInfo && batchInfo.color) ||
                getBarColorByName(batches, selectedBatch)
              }
              stroke={
                (batchInfo && batchInfo.color) ||
                getBarColorByName(batches, selectedBatch)
              }
            >
              <LabelList dataKey="value" position="bottom" fill="black" />
            </LineRecharts>
          )}
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
