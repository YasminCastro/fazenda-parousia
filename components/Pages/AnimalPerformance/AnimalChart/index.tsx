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
  {
    daysInMilk: 0,
    firstLactationLine: 30,
    secondLactationLine: 40,
    thirdLactationLine: 50,
  },
  {
    daysInMilk: 25, //dias (obrigatório)
    firstLactationScatter: 34, //ponto no gráfico scatter para 1° lactação (opcional)
    secondLactationScatter: 50, //ponto no gráfico scatter para 2° lactação (opcional)
    thirdLactationScatter: 60, //ponto no gráfico scatter para 3° lactação (opcional)
    firstLactationLine: 30, // ponto no gráfico linha para 1° lactação (obrigatório)
    secondLactationLine: 40, // ponto no gráfico linha para 2° lactação (obrigatório)
    thirdLactationLine: 50, // ponto no gráfico linha para 2° lactação (obrigatório)
  },
  {
    daysInMilk: 50,
    firstLactationScatter: 42,
    secondLactationScatter: 48,
    firstLactationLine: 45,
    secondLactationLine: 50,
    thirdLactationLine: 55,
  },
  {
    daysInMilk: 100,
    thirdLactationScatter: 58,
    firstLactationLine: 50,
    secondLactationLine: 55,
    thirdLactationLine: 58,
  },
  {
    daysInMilk: 150,
    firstLactationScatter: 46,
    secondLactationScatter: 50,
    thirdLactationScatter: 55,
    firstLactationLine: 48,
    secondLactationLine: 52,
    thirdLactationLine: 55,
  },
  {
    daysInMilk: 200,
    firstLactationScatter: 40,
    secondLactationScatter: 45,
    thirdLactationScatter: 50,
    firstLactationLine: 42,
    secondLactationLine: 48,
    thirdLactationLine: 50,
  },
  {
    daysInMilk: 250,
    firstLactationScatter: 35,
    secondLactationScatter: 40,
    thirdLactationScatter: 45,
    firstLactationLine: 35,
    secondLactationLine: 42,
    thirdLactationLine: 45,
  },
  {
    daysInMilk: 300,
    firstLactationScatter: 28,
    secondLactationScatter: 35,
    thirdLactationScatter: 40,
    firstLactationLine: 30,
    secondLactationLine: 38,
    thirdLactationLine: 40,
  },
];

const chartConfig = {
  firstLactationScatter: {
    label: "1º lactation",
  },
  secondLactationScatter: {
    label: "2º lactation",
  },
  thirdLactationScatter: {
    label: ">= 3º lactation",
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
              dataKey="daysInMilk"
              type="number"
              label={{
                value: "Days in milk",
                position: "insideBottomRight",
                offset: 0,
              }}
            />
            <YAxis
              type="number"
              label={{
                value: "Milk production (kg)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["auto", "auto"]}
            />
            <Legend />

            <Scatter
              name="1º lactation"
              dataKey="firstLactationScatter"
              fill="blue"
            />
            <Scatter
              name="2º lactation"
              dataKey="secondLactationScatter"
              fill="red"
            />
            <Scatter
              name=">= 3º lactation"
              dataKey="thirdLactationScatter"
              fill="brown"
            />
            <Line
              dataKey="firstLactationLine"
              stroke="blue"
              dot={false}
              activeDot={false}
              legendType="none"
              type="monotone"
            />
            <Line
              dataKey="secondLactationLine"
              stroke="red"
              dot={false}
              activeDot={false}
              legendType="none"
              type="monotone"
            />
            <Line
              dataKey="thirdLactationLine"
              stroke="brown"
              dot={false}
              activeDot={false}
              legendType="none"
              type="monotone"
            />
          </ComposedChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
}
