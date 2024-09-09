import { useFilterContext } from "@/providers/FilterContext";
import { useEffect } from "react";
import { useDataContext } from "@/providers/DataContext";
import PieChart from "./PieChart";
import BarChartMastite from "./BarChartMastite";
import ComposedChart from "./ComposedChart";
import LineChart from "./LineChart";

export default function Charts() {
  const { selectedCardIndex } = useFilterContext();
  const { chartData } = useDataContext();

  useEffect(() => {}, [selectedCardIndex]);

  return (
    <>
      {selectedCardIndex === 0 && <LineChart data={chartData} />}
      {selectedCardIndex === 1 && <ComposedChart data={chartData} />}
      {selectedCardIndex === 2 && <ComposedChart data={chartData} />}
      {selectedCardIndex === 3 && <LineChart data={chartData} />}
      {selectedCardIndex === 4 && <LineChart data={chartData} />}
      {selectedCardIndex === 5 && <PieChart data={chartData} />}
      {selectedCardIndex === 6 && <LineChart data={chartData} />}
      {selectedCardIndex === 7 && <BarChartMastite data={chartData} />}
    </>
  );
}
