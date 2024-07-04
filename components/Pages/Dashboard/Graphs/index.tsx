import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {}, [selectedCard]);

  if (selectedCard === "mastite") {
    return <MastiteGraph />;
  }
  return <div className="h-1/2"></div>;
}
