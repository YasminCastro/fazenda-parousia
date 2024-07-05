import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";
import MilkRevenueGraph from "./MilkRevenue";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {}, [selectedCard]);

  if (selectedCard === "mastite") {
    return <MastiteGraph />;
  }

  if (selectedCard === "milkRevenue") {
    return <MilkRevenueGraph />;
  }
  return <div className="h-1/2"></div>;
}
