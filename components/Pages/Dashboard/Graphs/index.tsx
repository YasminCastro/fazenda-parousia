import { useFilterContext } from "@/providers/FilterContext";
import MastiteGraph from "./Mastite";
import { useEffect } from "react";

export default function Graphs() {
  const { selectedCard } = useFilterContext();

  useEffect(() => {
    console.log("Selected Card in useEffect:", selectedCard);
  }, [selectedCard]);

  if (selectedCard === "mastite") {
    return (
      <div className="h-1/2">
        <MastiteGraph />
      </div>
    );
  }
  return <div className="h-1/2"></div>;
}
