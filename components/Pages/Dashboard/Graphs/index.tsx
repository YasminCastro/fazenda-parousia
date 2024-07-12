import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import MilkRevenueGraph from "./MilkRevenue";
import MilkProductionGraph from "./MilkProduction";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  if (selectedCard === "mastite") {
    return <MastiteGraph />;
  }

  if (selectedCard === "milkRevenue") {
    return <MilkRevenueGraph />;
  }

  if (selectedCard === "milkProduction") {
    return <MilkProductionGraph />;
  }
  return <div className="h-1/2"></div>;
}
