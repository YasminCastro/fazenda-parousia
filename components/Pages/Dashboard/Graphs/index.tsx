import { useFilterContext } from "@/providers/FilterContext";
import { useEffect } from "react";
import MarginGraph from "./Margin";
import { useDataContext } from "@/providers/DataContext";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import BarChartMastite from "./BarChartMastite";
import ComposedChart from "./ComposedChart";

export default function Graphs() {
  const { selectedCardIndex } = useFilterContext();
  const { chartData } = useDataContext();

  useEffect(() => {}, [selectedCardIndex]);

  return (
    <>
      {selectedCardIndex === 0 && <BarChart data={chartData} />}
      {selectedCardIndex === 1 && <ComposedChart data={chartData} />}
      {selectedCardIndex === 2 && <MarginGraph />}
      {selectedCardIndex === 3 && <BarChart data={chartData} />}
      {selectedCardIndex === 4 && <BarChart data={chartData} />}
      {selectedCardIndex === 5 && <PieChart data={chartData} />}
      {selectedCardIndex === 6 && <BarChart data={chartData} />}
      {selectedCardIndex === 7 && <BarChartMastite data={chartData} />}
    </>
  );
}
