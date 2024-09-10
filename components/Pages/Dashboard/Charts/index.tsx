import { useFilterContext } from "@/providers/FilterContext";
import { useEffect } from "react";
import { useDataContext } from "@/providers/DataContext";
import PieAndLineChart from "./PieAndLineChart";
import BarChartMastite from "./BarChartMastite";
import ComposedChart from "./ComposedChart";
import LineChart from "./LineChart";

export default function Charts() {
  const { selectedCardIndex } = useFilterContext();
  const { chartData } = useDataContext();

  useEffect(() => {}, [selectedCardIndex]);

  if (chartData) {
    return (
      <>
        {selectedCardIndex === 0 && chartData.data && (
          <LineChart data={chartData} />
        )}
        {selectedCardIndex === 1 && <ComposedChart data={chartData} />}
        {selectedCardIndex === 2 && <ComposedChart data={chartData} />}
        {selectedCardIndex === 3 && chartData.data && (
          <LineChart data={chartData} />
        )}
        {selectedCardIndex === 4 && chartData.data && (
          <LineChart data={chartData} />
        )}
        {selectedCardIndex === 5 && <PieAndLineChart data={chartData} />}
        {selectedCardIndex === 6 && chartData.data && (
          <LineChart data={chartData} />
        )}
        {selectedCardIndex === 7 && <BarChartMastite data={chartData} />}
      </>
    );
  }

  return <></>;
}
