import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import MilkRevenueGraph from "./MilkRevenue";
import MilkProductionGraph from "./MilkProduction";
import NumberOfAnimalsGraph from "./NumberOfAnimals";
import FoodCostGraph from "./FoodCost";
import FoodMarginGraph from "./FoodMargin";
import FoodEfficencyGraph from "./FoodEfficiency";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {}, [selectedCard]);

  return (
    <>
      {selectedCard === "milkRevenue" && <MilkRevenueGraph />}
      {selectedCard === "foodCost" && <FoodCostGraph />}
      {selectedCard === "foodMargin" && <FoodMarginGraph />}
      {/* {selectedCard === "investmentReturn" && <FoodCostGraph />} */}
      {selectedCard === "milkProduction" && <MilkProductionGraph />}
      {selectedCard === "numberOfAnimals" && <NumberOfAnimalsGraph />}
      {selectedCard === "foodEfficiency" && <FoodEfficencyGraph />}
      {selectedCard === "mastite" && <MastiteGraph />}
    </>
  );
}
