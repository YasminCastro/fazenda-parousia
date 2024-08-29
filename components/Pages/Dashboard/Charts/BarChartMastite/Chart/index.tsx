import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IMastite } from "@/interfaces/Graphs/mastite";
import { formatTickDate } from "@/utils/formatXAxis";
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

interface IProps {
  data: IMastite[];
  isStackedChart: boolean;
}

export const chartConfig = {
  mastite: {
    label: "Mastite",
    color: "#ff9871",
  },
  carenciaMastite: {
    label: "Carência Mastite",
    color: "#ff9871",
  },
} satisfies ChartConfig;

export default function Chart({ data, isStackedChart }: IProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
          <YAxis>
            <Label value="quantidade" position="insideLeft" angle={-90} />
          </YAxis>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <ChartLegend
            verticalAlign="top"
            wrapperStyle={{ lineHeight: "40px" }}
            content={<ChartLegendContent />}
          />
          <Brush dataKey="date" height={20} tickFormatter={formatTickDate} />
          <Bar dataKey="mastite" stackId="a" fill="#ff9871" />
          <Bar
            dataKey="carenciaMastite"
            stackId={isStackedChart ? "a" : undefined}
            fill="#ff9871"
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
