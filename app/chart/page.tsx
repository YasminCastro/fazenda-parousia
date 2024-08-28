"use client";

import { useEffect, useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import html2canvas from "html2canvas";
import { useFilterContext } from "@/providers/FilterContext";
import { useDataContext } from "@/providers/DataContext";

const data = [
  { name: "Janeiro", Produção: 50, Média: 60 },
  { name: "Fevereiro", Produção: 100, Média: 110 },
  { name: "Março", Produção: 75, Média: 80 },
  { name: "Abril", Produção: 125, Média: 130 },
];

export default function Page() {
  const chartRef = useRef(null);
  const { date } = useFilterContext();
  const {} = useDataContext();

  useEffect(() => {
    const downloadChart = async () => {
      setTimeout(async () => {
        if (chartRef && chartRef.current) {
          const canvas = await html2canvas(chartRef.current);
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "grafico.png";
          link.click();
        }
      }, 2000);
    };

    downloadChart();
  }, []);
  return (
    <div ref={chartRef} className="h-fit w-fit p-14">
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Produção" fill="#8884d8" />
        <Bar dataKey="Média" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
