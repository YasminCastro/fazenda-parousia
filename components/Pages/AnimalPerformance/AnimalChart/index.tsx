import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { index: 10000, red: 1643, blue: 790 },
  { index: 1666, red: 182, blue: 42 },
  { index: 625, red: 56, blue: 11 },
  // Calculation of line of best fit is not included in this demo
  { index: 300, redLine: 0 },
  { index: 10000, redLine: 1522 },
  { index: 600, blueLine: 0 },
  { index: 10000, blueLine: 678 },
];

const chartConfig = {
  red: {
    label: "red",
  },
  blue: {
    label: "blue",
  },
} satisfies ChartConfig;

export default function AnimalChart() {
  return (
    <Card className="h-full w-full rounded-3xl p-3">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ComposedChart
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
            <XAxis
              dataKey="index"
              type="number"
              label={{
                value: "Index",
                position: "insideBottomRight",
                offset: 0,
              }}
            />
            <YAxis
              unit="ms"
              type="number"
              label={{ value: "Time", angle: -90, position: "insideLeft" }}
            />
            <Legend />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Scatter name="red" dataKey="red" fill="red" />
            <Scatter name="blue" dataKey="blue" fill="blue" />
            <Line
              dataKey="blueLine"
              stroke="blue"
              dot={false}
              activeDot={false}
              legendType="none"
            />
            <Line
              dataKey="redLine"
              stroke="red"
              dot={false}
              activeDot={false}
              legendType="none"
            />
          </ComposedChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
}
