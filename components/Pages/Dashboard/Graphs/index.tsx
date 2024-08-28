import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import MilkRevenueGraph from "./MilkRevenue";
import MilkProductionGraph from "./MilkProduction";
import NumberOfAnimalsGraph from "./NumberOfAnimals";
import CostGraph from "./Cost";
import FoodEfficencyGraph from "./FoodEfficiency";
import InvestmentReturnGraph from "./InvestmentReturn";
import MarginGraph from "./Margin";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {}, [selectedCard]);

  return (
    <>
      {selectedCard === 0 && <MilkRevenueGraph />}
      {selectedCard === 1 && <CostGraph />}
      {selectedCard === 2 && <MarginGraph />}
      {selectedCard === 3 && <InvestmentReturnGraph />}
      {selectedCard === 4 && <MilkProductionGraph />}
      {selectedCard === 5 && <NumberOfAnimalsGraph />}
      {selectedCard === 6 && <FoodEfficencyGraph />}
      {selectedCard === 7 && <MastiteGraph />}
    </>
  );
}
