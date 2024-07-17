import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import MilkRevenueGraph from "./MilkRevenue";
import MilkProductionGraph from "./MilkProduction";
import { Card } from "@/components/ui/card";
import NumberOfAnimalsGraph from "./NumberOfAnimals";
import FoodCostGraph from "./FoodCost";
import FoodMarginGraph from "./FoodMargin";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {}, [selectedCard]);

  return (
    <Card className="mt-4 flex h-full w-full flex-col rounded-3xl p-3">
      <h2 className="ml-6 mt-2 text-2xl font-bold">
        {getGraphTitle(selectedCard)}
      </h2>
      <div className="flex-1">
        {selectedCard === "milkRevenue" && <MilkRevenueGraph />}
        {selectedCard === "foodCost" && <FoodCostGraph />}
        {selectedCard === "foodMargin" && <FoodMarginGraph />}
        {/* {selectedCard === "investmentReturn" && <FoodCostGraph />} */}
        {selectedCard === "milkProduction" && <MilkProductionGraph />}
        {selectedCard === "numberOfAnimals" && <NumberOfAnimalsGraph />}
        {/* {selectedCard === "foodEfficiency" && <FoodCostGraph />} */}
        {selectedCard === "mastite" && <MastiteGraph />}
      </div>
    </Card>
  );
}

const getGraphTitle = (key: string) => {
  switch (key) {
    case "mastite":
      return "Mastite";
    case "milkRevenue":
      return "Receita do leite (R$)";
    case "milkProduction":
      return "Produção do leite (kg)";
    case "numberOfAnimals":
      return "Quantidade de animais";
    default:
      return "";
  }
};
