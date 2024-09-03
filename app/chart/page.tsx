"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import html2canvas from "html2canvas";
import { useFilterContext } from "@/providers/FilterContext";
import axios from "axios";
import { format } from "date-fns";
import { formatTickDateDay } from "@/utils/formatXAxis";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Valor",
  },
} satisfies ChartConfig;

export default function Page() {
  const chartRef = useRef(null);
  const { date } = useFilterContext();
  const [production, setProduction] = useState<any[]>();
  const [average, setAverage] = useState<any[]>();

  useEffect(() => {
    const fetchDataAndDownloadChart = async () => {
      try {
        const params = new URLSearchParams({
          date: date && date.from ? format(date?.from, "yyyy-MM-01") : "",
        });

        const response = await axios.get(
          `/api/production-chart?${params.toString()}`,
        );
        setProduction(response.data.production);
        setAverage(response.data.average);

        setTimeout(async () => {
          if (chartRef && chartRef.current) {
            const canvas = await html2canvas(chartRef.current);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = `producao-${date && date.from ? format(date?.from, "MM-yyyy") : ""}.png`;
            link.click();
          }
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndDownloadChart();
  }, []);

  const uniqueTypes = Array.from(
    new Map(production?.map((item) => [item.type, item.color])).entries(),
  );

  const renderLegend = () => {
    return (
      <ul className="m-0 mt-3 flex list-none justify-center gap-3 p-0">
        {uniqueTypes.map(([type, color]) => (
          <li key={type} className="mb-2 flex items-center">
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: color,
                marginRight: 8,
              }}
            />
            <span>{type}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div ref={chartRef} className="h-full w-full p-2">
      <h1 className="text-center text-2xl font-bold">
        Produção média e diária
      </h1>
      <ResponsiveContainer width="98.5%" height="60px">
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            width={500}
            height={300}
            data={average}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis
              domain={[
                (dataMin: number) => Math.floor(dataMin),
                (dataMax: number) => Math.ceil(dataMax),
              ]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line type="monotone" dataKey="value" stroke="black">
              <LabelList
                dataKey="value"
                position="insideBottomLeft"
                fill="black"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="85%">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            width={500}
            height={300}
            data={production}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatTickDateDay} />
            <YAxis>
              <Label
                value="Produção total (lt)"
                position="insideLeft"
                angle={-90}
              />
            </YAxis>
            <Legend content={renderLegend} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value">
              {production?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                fill="black"
                formatter={(value: any) =>
                  value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
