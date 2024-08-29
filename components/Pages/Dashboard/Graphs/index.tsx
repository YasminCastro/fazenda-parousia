import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import NumberOfAnimalsGraph from "./NumberOfAnimals";
import CostGraph from "./Cost";
import MarginGraph from "./Margin";
import { useDataContext } from "@/providers/DataContext";
import BarChart from "./BarChart";

export default function Graphs() {
  const { selectedCardIndex } = useFilterContext();
  const { chartData } = useDataContext();

  useEffect(() => {}, [selectedCardIndex]);

  return (
    <>
      {selectedCardIndex === 0 && <BarChart data={chartData} />}
      {selectedCardIndex === 1 && <CostGraph />}
      {selectedCardIndex === 2 && <MarginGraph />}
      {selectedCardIndex === 3 && <BarChart data={chartData} />}
      {selectedCardIndex === 4 && <BarChart data={chartData} />}
      {selectedCardIndex === 5 && <NumberOfAnimalsGraph />}
      {selectedCardIndex === 6 && <BarChart data={chartData} />}
      {selectedCardIndex === 7 && <MastiteGraph />}
    </>
  );
}
