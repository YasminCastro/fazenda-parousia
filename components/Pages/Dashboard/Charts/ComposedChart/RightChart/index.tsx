import kpiMapping from "@/constants/kpiMapping";
import { useFilterContext } from "@/providers/FilterContext";
import { formatTickDate } from "@/utils/formatXAxis";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  ComposedChart,
  Line,
} from "recharts";

import stylesGraph from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

interface IProps {
  data: any;
}

export default function RightChart({ data }: IProps) {
  console.log(data);
  const { selectedBatch, selectedCardIndex } = useFilterContext();
  const label = kpiMapping[selectedCardIndex].secundaryLabelY;

  const [isStackedChart, setIsStackedChart] = useState(false);

  const handleDownloadChart = () => {
    setIsStackedChart(!isStackedChart);
  };

  const percentColor = data.key === "IoFC / vaca" ? "#4ad991" : "#fec53d";
  const percentByMilkColor = data.key === "IoFC / vaca" ? "#d9f7e7" : "#fef2d6";

  const chartConfig = {
    percent: {
      label: "% sobre alimentação",
      color: percentColor,
    },
    percentByMilkPrice: {
      label: "% sobre alimentação pelo valor do leite",
      color: percentByMilkColor,
    },
  } satisfies ChartConfig;

  return (
    <div className="h-80 w-full">
      <div className="mx-6 mt-1 flex justify-between">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <div className="space-x-3">
          <Button
            className={`${stylesGraph.changeGraphButton}`}
            onClick={handleDownloadChart}
          >
            <Download size={18} />
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig} className="w-full">
          <ComposedChart
            accessibilityLayer
            data={data.data}
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
            <XAxis dataKey="date" tickFormatter={formatTickDate} scale="band" />
            <YAxis>
              <Label value={label} position="insideLeft" angle={-90} />
            </YAxis>
            {selectedBatch === "all" && (
              <ChartLegend
                verticalAlign="top"
                content={<ChartLegendContent />}
              />
            )}

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar
              dataKey="percent"
              name="% sobre alimentação"
              barSize={20}
              fill={percentColor}
            />
            <Line
              type="monotone"
              dataKey="percentByMilkPrice"
              name="% sobre alimentação pelo valor do leite"
              stroke={percentByMilkColor}
            />
          </ComposedChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
