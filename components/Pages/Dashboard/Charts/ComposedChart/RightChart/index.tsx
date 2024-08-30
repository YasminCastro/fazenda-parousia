import kpiMapping from "@/constants/kpiMapping";
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

import stylesGraph from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw } from "lucide-react";
import { useState } from "react";

interface IProps {
  data: any;
}

export default function RightChart({ data }: IProps) {
  const { batches, selectedBatch, selectedCardIndex } = useFilterContext();
  const label = kpiMapping[selectedCardIndex].labelY;

  const batchInfo = batches.find((batch) => batch.value === selectedBatch);

  const [isStackedChart, setIsStackedChart] = useState(false);

  const handleGraphChange = () => {
    setIsStackedChart(!isStackedChart);
  };

  return (
    <div className="h-80 w-full">
      <div className="mx-6 mt-1 flex justify-between">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <div className="space-x-3">
          <Button
            className={`${stylesGraph.changeGraphButton}`}
            onClick={handleGraphChange}
          >
            <Download size={18} />
          </Button>
          <Button
            className={`${stylesGraph.changeGraphButton}`}
            onClick={handleGraphChange}
          >
            <RefreshCcw size={18} />
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
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
            <XAxis dataKey="date" tickFormatter={formatTickDate} />
            <YAxis>
              <Label value={label} position="insideBottomLeft" angle={-90} />
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
    </div>
  );
}
